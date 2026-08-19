import type { VercelRequest, VercelResponse } from "@vercel/node";
import { syncApprovedDiscordReviews } from "./_syncReviews.js";

function isAuthorized(req: VercelRequest): boolean {
  const secret = process.env.REVIEWS_SYNC_SECRET || process.env.CRON_SECRET;
  if (!secret) return false;

  const auth = req.headers.authorization;
  if (auth === `Bearer ${secret}`) return true;

  const header = req.headers["x-reviews-sync-secret"];
  if (header === secret) return true;

  // Vercel Cron sends this header
  if (req.headers["authorization"] === `Bearer ${process.env.CRON_SECRET}`) return true;

  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!isAuthorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const result = await syncApprovedDiscordReviews();
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
}

export const config = {
  maxDuration: 60,
};
