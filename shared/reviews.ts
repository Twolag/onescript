export interface DiscordReview {
  /** Stable id (Discord message snowflake) */
  id: string;
  messageId: string;
  authorName: string;
  /** Discord CDN avatar URL */
  authorAvatar: string | null;
  content: string;
  createdAt: string;
  approvedAt: string;
  discordUrl: string;
  /** Re-hosted attachment on our site (screenshot / image posted in Discord) */
  imageUrl: string | null;
  /** attachment = show imageUrl; message = render Discord-style bubble */
  display: "attachment" | "message";
}

export interface ReviewsManifest {
  updatedAt: string;
  reviews: DiscordReview[];
}

export const REVIEWS_MANIFEST_PATH = "data/reviews.json";
