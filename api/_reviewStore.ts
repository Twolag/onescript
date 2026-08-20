import fs from "node:fs/promises";
import path from "node:path";
import type { DiscordReview, ReviewsManifest } from "../shared/reviews.js";
import { REVIEWS_MANIFEST_PATH } from "../shared/reviews.js";

const PROJECT_ROOT = path.resolve(process.cwd());
const LOCAL_MANIFEST = path.join(PROJECT_ROOT, "client", "public", REVIEWS_MANIFEST_PATH);
const LOCAL_REVIEWS_DIR = path.join(PROJECT_ROOT, "client", "public", "reviews");

export function emptyManifest(): ReviewsManifest {
  return { updatedAt: new Date().toISOString(), reviews: [] };
}

export async function readReviewsManifest(): Promise<ReviewsManifest> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: "reviews/manifest.json", limit: 1 });
      const blob = blobs[0];
      if (blob?.url) {
        const res = await fetch(blob.url);
        if (res.ok) return (await res.json()) as ReviewsManifest;
      }
    } catch {
      /* fall through to local file */
    }
  }

  try {
    const raw = await fs.readFile(LOCAL_MANIFEST, "utf8");
    return JSON.parse(raw) as ReviewsManifest;
  } catch {
    return emptyManifest();
  }
}

export async function writeReviewsManifest(manifest: ReviewsManifest): Promise<void> {
  manifest.updatedAt = new Date().toISOString();
  const json = JSON.stringify(manifest, null, 2);

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put("reviews/manifest.json", json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return;
  }

  // Skip disk writes on Vercel (read-only) — caller still returns in-memory reviews
  if (process.env.VERCEL) {
    console.warn("[reviews] no BLOB_READ_WRITE_TOKEN — manifest not persisted on Vercel FS");
    return;
  }

  await fs.mkdir(path.dirname(LOCAL_MANIFEST), { recursive: true });
  await fs.writeFile(LOCAL_MANIFEST, json, "utf8");
}

export async function saveReviewImage(
  messageId: string,
  buffer: Buffer,
  contentType: string,
): Promise<string> {
  const ext = contentType.includes("png")
    ? "png"
    : contentType.includes("jpeg") || contentType.includes("jpg")
      ? "jpg"
      : contentType.includes("webp")
        ? "webp"
        : contentType.includes("gif")
          ? "gif"
          : "png";

  const filename = `discord-${messageId}.${ext}`;
  const publicPath = `/reviews/${filename}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`reviews/${filename}`, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  // Local/dev only — Vercel production FS is read-only
  if (process.env.VERCEL) {
    throw new Error("BLOB_READ_WRITE_TOKEN required to store review images on Vercel");
  }

  await fs.mkdir(LOCAL_REVIEWS_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_REVIEWS_DIR, filename), buffer);
  return publicPath;
}

export function mergeReviews(existing: DiscordReview[], incoming: DiscordReview[]): DiscordReview[] {
  const map = new Map<string, DiscordReview>();
  for (const review of existing) map.set(review.id, review);
  for (const review of incoming) map.set(review.id, review);
  return [...map.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
