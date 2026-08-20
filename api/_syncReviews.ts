import type { DiscordReview } from "../shared/reviews.js";
import {
  discordAuthorName,
  discordAvatarUrl,
  discordMessageUrl,
  downloadBinary,
  fetchAllChannelMessages,
  isMessageApproved,
  messageHasCheckmark,
  pickImageAttachment,
  type DiscordMessage,
} from "./_discordReviews.js";
import { mergeReviews, readReviewsManifest, saveReviewImage, writeReviewsManifest } from "./_reviewStore.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function canSyncDiscordReviews(): boolean {
  return Boolean(
    process.env.DISCORD_BOT_TOKEN &&
      process.env.DISCORD_GUILD_ID &&
      process.env.DISCORD_REVIEWS_CHANNEL_ID,
  );
}

async function messageToReview(
  message: DiscordMessage,
  guildId: string,
  channelId: string,
  approvedAt: string,
  existing?: DiscordReview,
): Promise<DiscordReview> {
  const attachment = pickImageAttachment(message);
  const authorName = discordAuthorName(message.author);
  const authorAvatar = discordAvatarUrl(message.author);
  const discordUrl = discordMessageUrl(guildId, channelId, message.id);

  let imageUrl = existing?.imageUrl ?? null;
  let display: DiscordReview["display"] = "message";

  if (attachment) {
    display = "attachment";
    if (!imageUrl || !imageUrl.includes(message.id)) {
      const sourceUrl = attachment.proxy_url || attachment.url;
      try {
        const { buffer, contentType } = await downloadBinary(sourceUrl);
        imageUrl = await saveReviewImage(message.id, buffer, contentType);
      } catch (error) {
        // Vercel serverless FS is read-only without Blob — keep Discord CDN URL
        console.error(`[reviews] image persist failed for ${message.id}:`, error);
        imageUrl = sourceUrl;
      }
    }
  }

  return {
    id: message.id,
    messageId: message.id,
    authorName,
    authorAvatar,
    content: message.content.trim(),
    createdAt: message.timestamp,
    approvedAt,
    discordUrl,
    imageUrl,
    display,
  };
}

export interface SyncReviewsResult {
  scanned: number;
  approvedFound: number;
  added: number;
  total: number;
  updatedAt: string;
  reviews: DiscordReview[];
}

export interface SyncReviewsOptions {
  /** Limit Discord history pages (100 msgs each). Default 20; use 3–5 for live auto-sync. */
  maxPages?: number;
}

export async function syncApprovedDiscordReviews(
  options?: SyncReviewsOptions,
): Promise<SyncReviewsResult> {
  const channelId = requireEnv("DISCORD_REVIEWS_CHANNEL_ID");
  const guildId = requireEnv("DISCORD_GUILD_ID");

  const [messages, manifest] = await Promise.all([
    fetchAllChannelMessages(channelId, { maxPages: options?.maxPages }),
    readReviewsManifest(),
  ]);

  const existingById = new Map(manifest.reviews.map((r) => [r.id, r]));
  const incoming: DiscordReview[] = [];
  let approvedFound = 0;

  for (const message of messages) {
    if (message.author.bot) continue;
    if (!message.content.trim() && message.attachments.length === 0) continue;
    if (!messageHasCheckmark(message)) continue;

    const existing = existingById.get(message.id);
    // Already published → keep without re-checking every reactor (much faster live sync)
    if (existing) {
      approvedFound++;
      incoming.push(existing);
      continue;
    }

    const approved = await isMessageApproved(channelId, message);
    if (!approved) continue;

    try {
      approvedFound++;
      incoming.push(
        await messageToReview(message, guildId, channelId, new Date().toISOString(), existing),
      );
    } catch (error) {
      console.error(`[reviews] skip message ${message.id}:`, error);
      approvedFound--;
    }
  }

  const merged = mergeReviews(manifest.reviews, incoming);
  const added = merged.length - manifest.reviews.length;
  const updatedAt = new Date().toISOString();
  const next: { updatedAt: string; reviews: DiscordReview[] } = { updatedAt, reviews: merged };

  try {
    await writeReviewsManifest(next);
  } catch (error) {
    console.error("[reviews] persist failed (returning in-memory sync result):", error);
  }

  return {
    scanned: messages.length,
    approvedFound,
    added: Math.max(0, added),
    total: merged.length,
    updatedAt,
    reviews: merged,
  };
}
