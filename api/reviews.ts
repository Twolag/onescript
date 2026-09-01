import type { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import { readReviewsManifest } from "./_reviewStore.js";
import {
  canSyncDiscordReviews,
  syncApprovedDiscordReviews,
} from "./_syncReviews.js";

/** In-memory cache between warm invocations (no Blob required). */
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
  rejected?: number;
  added?: number;
  removed?: number;
  total?: number;
} | null = null;
let inflightSync: Promise<Awaited<ReturnType<typeof syncApprovedDiscordReviews>>> | null = null;

/** Soft TTL: after this, GET kicks a background Discord sync (non-blocking). */
const STALE_MS = 2 * 60 * 1000;

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

function isStale(updatedAt: string | undefined): boolean {
  if (!updatedAt) return true;
  const ts = Date.parse(updatedAt);
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts > STALE_MS;
}

async function runSync(mode: "incremental" | "full") {
  if (inflightSync) return inflightSync;
  // Public page refresh: recent channel pages only (fast).
  // Cron / authorized: deeper history for late ✅ / ❌.
  inflightSync = syncApprovedDiscordReviews({
    maxPages: mode === "full" ? 25 : 4,
  }).finally(() => {
    inflightSync = null;
  });
  return inflightSync;
}

async function applySyncResult(result: Awaited<ReturnType<typeof syncApprovedDiscordReviews>>) {
  lastSyncPayload = { updatedAt: result.updatedAt, reviews: result.reviews };
  lastSyncMeta = {
    at: result.updatedAt,
    ok: true,
    scanned: result.scanned,
    approvedFound: result.approvedFound,
    rejected: result.rejected,
    added: result.added,
    removed: result.removed,
    total: result.total,
  };
  return result;
}

function scheduleBackgroundSync(mode: "incremental" | "full") {
  if (!canSyncDiscordReviews()) return;
  if (inflightSync) return;

  const work = runSync(mode)
    .then(applySyncResult)
    .catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      lastSyncMeta = { at: new Date().toISOString(), ok: false, error: message };
    });

  try {
    waitUntil(work);
  } catch {
    // Local / non-Vercel: best-effort fire-and-forget
    void work;
  }
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
 * - GET → fast cached/static reviews (no Discord wait); may refresh in background
 * - GET ?refresh=1 → sync Discord then return (button / background)
 * - POST / GET + Bearer → full sync (cron)
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

  const shouldSyncNow =
    req.method === "POST" || (req.method === "GET" && (authorized || force));

  if (shouldSyncNow) {
    if (req.method === "POST" && !authorized && !force) {
      res.status(401).json(withDebug({ error: "Unauthorized" }, debug));
      return;
    }
    // Public may use ?refresh=1; cron uses Bearer
    if (req.method === "POST" && !authorized) {
      res.status(401).json(withDebug({ error: "Unauthorized" }, debug));
      return;
    }

    if (!canSyncDiscordReviews()) {
      const manifest = await readReviewsManifest();
      res.setHeader("Cache-Control", "no-store");
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

    try {
      const result = await applySyncResult(await runSync(authorized ? "full" : "incremental"));
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json(
        withDebug(
          {
            success: true,
            scanned: result.scanned,
            approvedFound: result.approvedFound,
            rejected: result.rejected,
            added: result.added,
            removed: result.removed,
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
      if (force || debug) {
        const manifest = lastSyncPayload ?? (await readReviewsManifest());
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json(withDebug({ ...manifest, _syncError: message }, true));
        return;
      }
      res.status(500).json(withDebug({ error: message }, debug));
    }
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Fast path: never wait on Discord for a normal page load
  try {
    if (lastSyncPayload) {
      if (isStale(lastSyncPayload.updatedAt)) {
        scheduleBackgroundSync("incremental");
      }
      res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
      res.status(200).json(withDebug(lastSyncPayload, debug));
      return;
    }
    const manifest = await readReviewsManifest();
    // Cold start: serve snapshot immediately, warm Discord sync in background
    scheduleBackgroundSync("incremental");
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
    res.status(200).json(withDebug(manifest, debug));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json(withDebug({ error: message }, debug));
  }
}

export const config = {
  maxDuration: 60,
};
