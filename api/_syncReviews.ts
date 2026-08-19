import type { DiscordReview } from "../shared/reviews.js";
import {
  discordAuthorName,
  discordAvatarUrl,
  discordMessageUrl,
  downloadBinary,
  extensionFromContentType,
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
      const { buffer, contentType } = await downloadBinary(sourceUrl);
      imageUrl = await saveReviewImage(message.id, buffer, contentType);
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
}

export async function syncApprovedDiscordReviews(): Promise<SyncReviewsResult> {
  const channelId = requireEnv("DISCORD_REVIEWS_CHANNEL_ID");
  const guildId = requireEnv("DISCORD_GUILD_ID");

  const [messages, manifest] = await Promise.all([
    fetchAllChannelMessages(channelId),
    readReviewsManifest(),
  ]);

  const existingById = new Map(manifest.reviews.map((r) => [r.id, r]));
  const incoming: DiscordReview[] = [];
  let approvedFound = 0;

  for (const message of messages) {
    if (message.author.bot) continue;
    if (!message.content.trim() && message.attachments.length === 0) continue;
    if (!messageHasCheckmark(message)) continue;

    const approved = await isMessageApproved(channelId, message);
    if (!approved) continue;

    approvedFound++;
    incoming.push(
      await messageToReview(
        message,
        guildId,
        channelId,
        new Date().toISOString(),
        existingById.get(message.id),
      ),
    );
  }

  const merged = mergeReviews(manifest.reviews, incoming);
  const added = merged.length - manifest.reviews.length;
  await writeReviewsManifest({ updatedAt: new Date().toISOString(), reviews: merged });

  return {
    scanned: messages.length,
    approvedFound,
    added: Math.max(0, added),
    total: merged.length,
  };
}
