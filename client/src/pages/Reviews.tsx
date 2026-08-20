/*
 * Reviews — Discord-verified customer reviews (screenshots / message cards)
 */
import { motion } from "framer-motion";
import { MessageCircle, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import DiscordReviewCard from "@/components/DiscordReviewCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import type { DiscordReview, ReviewsManifest } from "@shared/reviews";
import { REVIEWS_MANIFEST_PATH } from "@shared/reviews";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: Math.min(i * 0.02, 0.25), duration: 0.35 },
  }),
};

/** Soft background re-sync while the page stays open. */
const POLL_MS = 120_000;

async function fetchReviews(url: string): Promise<DiscordReview[] | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as ReviewsManifest;
    return Array.isArray(data.reviews) ? data.reviews : null;
  } catch {
    return null;
  }
}

async function loadCachedReviews(): Promise<DiscordReview[]> {
  const bust = `t=${Date.now()}`;
  const sources = [`/api/reviews?${bust}`, `/${REVIEWS_MANIFEST_PATH}?${bust}`];
  for (const url of sources) {
    const items = await fetchReviews(url);
    if (items) return items;
  }
  return [];
}

async function syncReviewsFromDiscord(): Promise<DiscordReview[] | null> {
  return fetchReviews(`/api/reviews?refresh=1&t=${Date.now()}`);
}

export default function Reviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<DiscordReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const applySync = useCallback(async (showSpinner: boolean) => {
    if (showSpinner) setSyncing(true);
    try {
      const items = await syncReviewsFromDiscord();
      if (items) setReviews(items);
    } finally {
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    // 1) Show cached reviews immediately (no Discord wait → no infinite spinner)
    loadCachedReviews().then((items) => {
      if (cancelled) return;
      setReviews(items);
      setLoading(false);
      // 2) Sync in background; update list when Discord answers
      void syncReviewsFromDiscord().then((fresh) => {
        if (!cancelled && fresh) setReviews(fresh);
      });
    });

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void applySync(false);
    }, POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [applySync]);

  const discordInvite = import.meta.env.VITE_DISCORD_LINK || "https://discord.gg/5btq6znUvN";

  return (
    <div>
      <section className="relative pt-10 pb-10 lg:pt-14 lg:pb-12">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-2 block">
                  {t("reviews.eyebrow")}
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
                  {t("reviews.title")}{" "}
                  <span className="text-violet-tech neon-text">{t("reviews.titleAccent")}</span>
                  {t("reviews.titleEnd") ? ` ${t("reviews.titleEnd")}` : ""}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
                  {t("reviews.subtitle")}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={syncing}
                onClick={() => void applySync(true)}
                className="border-violet-tech/40 gap-2 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                {t("reviews.refresh")}
              </Button>
            </div>
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground/85 leading-relaxed border-l-2 border-violet-tech/35 pl-3">
              {t("reviews.discordNote")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-14 lg:pb-20">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-16">
              <RefreshCw className="w-5 h-5 animate-spin" />
              {t("reviews.loading")}
            </div>
          ) : reviews.length === 0 ? (
            <div className="rounded-lg border border-border/40 p-8 text-center max-w-lg mx-auto">
              <MessageCircle className="w-8 h-8 text-violet-tech mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-4">{t("reviews.empty")}</p>
              <Button asChild variant="outline" size="sm" className="border-violet-tech/40">
                <a href={discordInvite} target="_blank" rel="noopener noreferrer">
                  {t("reviews.joinDiscord")}
                </a>
              </Button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-5">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  className="break-inside-avoid"
                >
                  <DiscordReviewCard
                    review={review}
                    verifiedLabel={t("reviews.verifiedDiscord")}
                    viewOnDiscordLabel={t("reviews.viewOnDiscord")}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
