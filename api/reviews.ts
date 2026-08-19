import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readReviewsManifest } from "./_reviewStore.js";
import { syncApprovedDiscordReviews } from "./_syncReviews.js";

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

/**
 * Consolidated reviews API (1 Hobby serverless function):
 * - GET (public) → reviews manifest
 * - GET/POST (authorized) → sync Discord ✅ reviews (Vercel Cron uses GET + Bearer CRON_SECRET)
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
  const wantsSync =
    req.method === "POST" ||
    (req.method === "GET" &&
      (authorized || req.query.sync === "1" || req.query.sync === "true"));

  // Authorized GET/POST → sync (cron + manual). Public GET → manifest.
  if (wantsSync && authorized) {
    try {
      const result = await syncApprovedDiscordReviews();
      res.status(200).json({ success: true, ...result });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      res.status(500).json({ error: message });
    }
    return;
  }

  if (req.method === "POST" || (req.method === "GET" && (req.query.sync === "1" || req.query.sync === "true"))) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const manifest = await readReviewsManifest();
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(manifest);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
}

export const config = {
  maxDuration: 60,
};
