#!/usr/bin/env tsx
/**
 * Sync approved Discord reviews (✅ reaction) into client/public/data/reviews.json
 *
 * Usage:
 *   pnpm sync-reviews
 *
 * Required env (see .env.example):
 *   DISCORD_BOT_TOKEN, DISCORD_GUILD_ID, DISCORD_REVIEWS_CHANNEL_ID
 * Optional:
 *   DISCORD_REVIEW_APPROVER_IDS=comma-separated Discord user IDs
 */
import "dotenv/config";
import { syncApprovedDiscordReviews } from "../api/_syncReviews.js";

async function main() {
  const result = await syncApprovedDiscordReviews();
  console.log("Discord reviews sync complete:");
  console.log(`  Messages scanned: ${result.scanned}`);
  console.log(`  Approved found:   ${result.approvedFound}`);
  console.log(`  Newly added:      ${result.added}`);
  console.log(`  Total on site:    ${result.total}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
