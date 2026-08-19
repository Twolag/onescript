import { ExternalLink } from "lucide-react";
import type { DiscordReview } from "@shared/reviews";

function formatDiscordDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Avatar({ name, src }: { name: string; src: string | null }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-white/10"
        loading="lazy"
        decoding="async"
      />
    );
  }

  const initial = (name.trim()[0] ?? "?").toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-[#5865f2] flex items-center justify-center flex-shrink-0 text-sm font-bold text-white ring-1 ring-white/10">
      {initial}
    </div>
  );
}

function DiscordHeader({
  review,
  verifiedLabel,
}: {
  review: DiscordReview;
  verifiedLabel: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Avatar name={review.authorName} src={review.authorAvatar} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="font-semibold text-[15px] text-white leading-tight">
            {review.authorName}
          </span>
          <span className="text-[11px] text-[#949ba4]">{formatDiscordDate(review.createdAt)}</span>
        </div>
        <div className="mt-1 inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 bg-[#5865f2]/20 border border-[#5865f2]/30">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#5865f2]" aria-hidden>
            <path
              fill="currentColor"
              d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 12.3 12.3 0 0 0-.608 1.25 18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
            />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#949ba4]">
            {verifiedLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DiscordReviewCard({
  review,
  verifiedLabel,
  viewOnDiscordLabel,
}: {
  review: DiscordReview;
  verifiedLabel: string;
  viewOnDiscordLabel: string;
}) {
  return (
    <article className="rounded-xl overflow-hidden border border-[#1e1f22] bg-[#313338] shadow-lg shadow-black/30 hover:border-[#5865f2]/40 transition-colors">
      <div className="px-4 py-3 bg-[#2b2d31] border-b border-[#1e1f22] flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#949ba4]">
          Discord
        </span>
        <a
          href={review.discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-[#00a8fc] hover:underline"
        >
          {viewOnDiscordLabel}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="p-4">
        <DiscordHeader review={review} verifiedLabel={verifiedLabel} />

        {review.display === "attachment" && review.imageUrl ? (
          <div className="mt-3 ml-[52px]">
            {review.content ? (
              <p className="text-[15px] leading-relaxed text-[#dbdee1] whitespace-pre-wrap break-words mb-2">
                {review.content}
              </p>
            ) : null}
            <a
              href={review.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden border border-[#1e1f22] bg-[#2b2d31] max-h-[520px]"
            >
              <img
                src={review.imageUrl}
                alt={`${review.authorName} — avis Discord`}
                className="w-full h-auto object-contain max-h-[520px]"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        ) : (
          <div className="mt-1 ml-[52px]">
            <p className="text-[15px] leading-relaxed text-[#dbdee1] whitespace-pre-wrap break-words">
              {review.content || "—"}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
