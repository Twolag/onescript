import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readReviewsManifest } from "./_reviewStore.js";
import {
  canSyncDiscordReviews,
  syncApprovedDiscordReviews,
} from "./_syncReviews.js";

/** Warm-instance debounce so page polls don't hammer Discord. */
let lastAutoSyncAt = 0;
let lastSyncPayload: {
  updatedAt: string;
  reviews: Awaited<ReturnType<typeof syncApprovedDiscordReviews>>["reviews"];
} | null = null;
let lastSyncMeta: {
  at: string;
  ok: boolean;
  error?: string;
  scanned?: number;
  approvedFound?: number;
  added?: number;
  total?: number;
} | null = null;
let inflightSync: Promise<Awaited<ReturnType<typeof syncApprovedDiscordReviews>>> | null = null;

const AUTO_SYNC_COOLDOWN_MS = 15_000;

function envStatus() {
  const approvers = (process.env.DISCORD_REVIEW_APPROVER_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return {
    botToken: Boolean(process.env.DISCORD_BOT_TOKEN?.trim()),
    guildId: Boolean(process.env.DISCORD_GUILD_ID?.trim()),
    channelId: Boolean(process.env.DISCORD_REVIEWS_CHANNEL_ID?.trim()),
    approverCount: approvers.length,
    blob: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()),
    canSync: canSyncDiscordReviews(),
  };
}

function isSyncAuthorized(req: VercelRequest): boolean {
  const secret = process.env.REVIEWS_SYNC_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;

  const auth = req.headers.authorization;
  if (auth === `Bearer ${secret}`) return true;
  if (process.env.CRON_SECRET && auth === `Bearer ${process.env.CRON_SECRET}`) return true;

  const header = req.headers["x-reviews-sync-secret"];
  if (header === secret) return true;

  return false;
}

function wantsForcedSync(req: VercelRequest): boolean {
  const q = req.query.refresh ?? req.query.sync;
  return q === "1" || q === "true";
}

function wantsDebug(req: VercelRequest): boolean {
  const q = req.query.debug;
  return q === "1" || q === "true";
}

async function runSync(fullHistory: boolean) {
  if (inflightSync) return inflightSync;
  inflightSync = syncApprovedDiscordReviews({
    // Force refresh / cron: full history. Auto: still scan a lot (many reviews).
    maxPages: fullHistory ? 25 : 15,
  }).finally(() => {
    inflightSync = null;
  });
  return inflightSync;
}

function withDebug<T extends Record<string, unknown>>(payload: T, debug: boolean): T {
  if (!debug) return payload;
  return {
    ...payload,
    _debug: {
      env: envStatus(),
      lastSync: lastSyncMeta,
    },
  };
}

/**
 * - GET public → auto-sync from Discord (debounced) then return reviews
 * - GET/POST + Bearer secret → full sync (cron / manual)
 * - GET ?debug=1 → includes env readiness (no secrets)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-reviews-sync-secret");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const authorized = isSyncAuthorized(req);
  const force = wantsForcedSync(req);
  const debug = wantsDebug(req);

  if (req.method === "POST" || (req.method === "GET" && authorized)) {
    if (!authorized) {
      res.status(401).json(withDebug({ error: "Unauthorized" }, debug));
      return;
    }
    try {
      const result = await runSync(true);
      lastAutoSyncAt = Date.now();
      lastSyncPayload = { updatedAt: result.updatedAt, reviews: result.reviews };
      lastSyncMeta = {
        at: result.updatedAt,
        ok: true,
        scanned: result.scanned,
        approvedFound: result.approvedFound,
        added: result.added,
        total: result.total,
      };
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json(
        withDebug(
          {
            success: true,
            scanned: result.scanned,
            approvedFound: result.approvedFound,
            added: result.added,
            total: result.total,
            updatedAt: result.updatedAt,
            reviews: result.reviews,
          },
          debug,
        ),
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      lastSyncMeta = { at: new Date().toISOString(), ok: false, error: message };
      res.status(500).json(withDebug({ error: message }, debug));
    }
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const now = Date.now();
    const shouldAutoSync =
      canSyncDiscordReviews() &&
      (force || now - lastAutoSyncAt >= AUTO_SYNC_COOLDOWN_MS);

    if (!canSyncDiscordReviews() && (force || debug)) {
      res.setHeader("Cache-Control", "no-store");
      const manifest = await readReviewsManifest();
      res.status(200).json(
        withDebug(
          {
            ...manifest,
            _syncSkipped: "Discord env vars missing on this deployment (bot/guild/channel).",
          },
          true,
        ),
      );
      return;
    }

    if (shouldAutoSync) {
      try {
        const result = await runSync(force);
        lastAutoSyncAt = Date.now();
        lastSyncPayload = { updatedAt: result.updatedAt, reviews: result.reviews };
        lastSyncMeta = {
          at: result.updatedAt,
          ok: true,
          scanned: result.scanned,
          approvedFound: result.approvedFound,
          added: result.added,
          total: result.total,
        };
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json(
          withDebug(
            {
              updatedAt: result.updatedAt,
              reviews: result.reviews,
            },
            debug,
          ),
        );
        return;
      } catch (syncError) {
        const message = syncError instanceof Error ? syncError.message : String(syncError);
        console.error("[reviews] auto-sync failed:", syncError);
        lastSyncMeta = { at: new Date().toISOString(), ok: false, error: message };
        if (force || debug) {
          const manifest = await readReviewsManifest();
          res.setHeader("Cache-Control", "no-store");
          res.status(200).json(
            withDebug(
              {
                ...manifest,
                _syncError: message,
              },
              true,
            ),
          );
          return;
        }
      }
    }

    if (lastSyncPayload) {
      res.setHeader("Cache-Control", "public, s-maxage=15, stale-while-revalidate=60");
      res.status(200).json(withDebug(lastSyncPayload, debug));
      return;
    }

    const manifest = await readReviewsManifest();
    res.setHeader(
      "Cache-Control",
      force ? "no-store" : "public, s-maxage=15, stale-while-revalidate=60",
    );
    res.status(200).json(withDebug(manifest, debug));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json(withDebug({ error: message }, debug));
  }
}

export const config = {
  maxDuration: 60,
};
