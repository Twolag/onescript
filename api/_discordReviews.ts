const DISCORD_API = "https://discord.com/api/v10";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function discordFetch(url: string, init?: RequestInit): Promise<Response> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, init);
    if (res.status !== 429) return res;

    let retryAfterMs = 1000;
    try {
      const body = (await res.json()) as { retry_after?: number };
      if (body.retry_after) retryAfterMs = Math.ceil(body.retry_after * 1000) + 200;
    } catch {
      /* use default */
    }
    await sleep(retryAfterMs);
  }

  return fetch(url, init);
}

export interface DiscordMessage {
  id: string;
  content: string;
  timestamp: string;
  author: {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
    bot?: boolean;
  };
  attachments: {
    id: string;
    url: string;
    proxy_url: string;
    content_type?: string;
    filename: string;
    width?: number;
    height?: number;
  }[];
  reactions?: {
    emoji: { name: string; id: string | null };
    count: number;
  }[];
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function botHeaders(): HeadersInit {
  return {
    Authorization: `Bot ${requireEnv("DISCORD_BOT_TOKEN")}`,
    "Content-Type": "application/json",
  };
}

export function discordAuthorName(author: DiscordMessage["author"]): string {
  return author.global_name?.trim() || author.username;
}

export function discordAvatarUrl(author: DiscordMessage["author"]): string | null {
  if (!author.avatar) return null;
  const ext = author.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.${ext}?size=128`;
}

export function discordMessageUrl(guildId: string, channelId: string, messageId: string): string {
  return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

export async function fetchChannelMessages(
  channelId: string,
  before?: string,
): Promise<DiscordMessage[]> {
  const url = new URL(`${DISCORD_API}/channels/${channelId}/messages`);
  url.searchParams.set("limit", "100");
  if (before) url.searchParams.set("before", before);

  const res = await discordFetch(url.toString(), { headers: botHeaders() });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Discord messages fetch failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<DiscordMessage[]>;
}

export async function fetchAllChannelMessages(
  channelId: string,
  options?: { maxPages?: number },
): Promise<DiscordMessage[]> {
  const all: DiscordMessage[] = [];
  let before: string | undefined;
  const maxPages = options?.maxPages ?? 20;

  for (let page = 0; page < maxPages; page++) {
    const batch = await fetchChannelMessages(channelId, before);
    if (batch.length === 0) break;
    all.push(...batch);
    before = batch[batch.length - 1]?.id;
    if (batch.length < 100) break;
    await sleep(300);
  }

  return all;
}

export interface DiscordUser {
  id: string;
  username: string;
}

/** Users who reacted with ✅ on this message */
export async function fetchCheckmarkReactors(
  channelId: string,
  messageId: string,
): Promise<DiscordUser[]> {
  const emoji = encodeURIComponent("✅");
  const url = `${DISCORD_API}/channels/${channelId}/messages/${messageId}/reactions/${emoji}`;

  const res = await discordFetch(url, { headers: botHeaders() });
  if (res.status === 404) return [];
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Discord reactions fetch failed (${res.status}): ${body}`);
  }
  return res.json() as Promise<DiscordUser[]>;
}

export function getApproverIds(): string[] {
  return (process.env.DISCORD_REVIEW_APPROVER_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id && !/^your_/i.test(id) && !/^(123456789|987654321)/.test(id));
}

export function messageHasCheckmark(message: DiscordMessage): boolean {
  return (
    message.reactions?.some((r) => {
      const name = r.emoji.name || "";
      return (
        (name === "✅" ||
          name === "✔️" ||
          name === "☑️" ||
          name === "white_check_mark" ||
          name === "heavy_check_mark" ||
          name === "ballot_box_with_check") &&
        r.count > 0
      );
    }) ?? false
  );
}

export async function isMessageApproved(channelId: string, message: DiscordMessage): Promise<boolean> {
  if (!messageHasCheckmark(message)) return false;

  const approvers = getApproverIds();
  // No valid approver IDs configured → any ✅ counts
  if (approvers.length === 0) return true;

  await sleep(350);
  const reactors = await fetchCheckmarkReactors(channelId, message.id);
  if (reactors.some((user) => approvers.includes(user.id))) return true;

  // Fallback: if allowlist is misconfigured, still accept a ✅ so reviews are not silently dropped.
  // Set DISCORD_REVIEW_REQUIRE_APPROVER=1 to enforce the allowlist strictly.
  if (process.env.DISCORD_REVIEW_REQUIRE_APPROVER === "1") return false;
  return reactors.length > 0;
}

export function pickImageAttachment(message: DiscordMessage) {
  return (
    message.attachments.find((a) => a.content_type?.startsWith("image/")) ??
    message.attachments.find((a) => /\.(png|jpe?g|webp|gif)$/i.test(a.filename)) ??
    null
  );
}

export async function downloadBinary(url: string): Promise<{ buffer: Buffer; contentType: string }> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}): ${url}`);
  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  const arrayBuffer = await res.arrayBuffer();
  return { buffer: Buffer.from(arrayBuffer), contentType };
}

export function extensionFromContentType(contentType: string): string {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("gif")) return "gif";
  return "png";
}
