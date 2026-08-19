import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readReviewsManifest } from "./_reviewStore.js";
import {
  canSyncDiscordReviews,
  syncApprovedDiscordReviews,
} from "./_syncReviews.js";

/** Warm-instance debounce so page polls don't hammer Discord. */
let lastAutoSyncAt = 0;
let lastSyncPayload: { updatedAt: string; reviews: Awaited<ReturnType<typeof syncApprovedDiscordReviews>>["reviews"] } | null =
  null;
let inflightSync: Promise<Awaited<ReturnType<typeof syncApprovedDiscordReviews>>> | null = null;

const AUTO_SYNC_COOLDOWN_MS = 20_000;

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

async function runSync(fullHistory: boolean) {
  if (inflightSync) return inflightSync;
  inflightSync = syncApprovedDiscordReviews({
    maxPages: fullHistory ? 20 : 5,
  }).finally(() => {
    inflightSync = null;
  });
  return inflightSync;
}

/**
 * - GET public → auto-sync from Discord (debounced) then return reviews
 * - GET/POST + Bearer secret → full sync (cron / manual)
 * Opening /reviews after ✅ is enough; the page also polls every ~45s.
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

  // Cron / manual secret sync
  if (req.method === "POST" || (req.method === "GET" && authorized)) {
    if (!authorized) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    try {
      const result = await runSync(true);
      lastAutoSyncAt = Date.now();
      lastSyncPayload = { updatedAt: result.updatedAt, reviews: result.reviews };
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({
        success: true,
        scanned: result.scanned,
        approvedFound: result.approvedFound,
        added: result.added,
        total: result.total,
        updatedAt: result.updatedAt,
        reviews: result.reviews,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
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

    if (shouldAutoSync) {
      try {
        const result = await runSync(false);
        lastAutoSyncAt = Date.now();
        lastSyncPayload = { updatedAt: result.updatedAt, reviews: result.reviews };
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json({
          updatedAt: result.updatedAt,
          reviews: result.reviews,
        });
        return;
      } catch (syncError) {
        console.error("[reviews] auto-sync failed:", syncError);
      }
    }

    if (lastSyncPayload) {
      res.setHeader("Cache-Control", "public, s-maxage=15, stale-while-revalidate=60");
      res.status(200).json(lastSyncPayload);
      return;
    }

    const manifest = await readReviewsManifest();
    res.setHeader(
      "Cache-Control",
      force ? "no-store" : "public, s-maxage=15, stale-while-revalidate=60",
    );
    res.status(200).json(manifest);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
}

export const config = {
  maxDuration: 60,
};
