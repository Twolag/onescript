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

/** Poll while the page is open so new Discord ✅ show up without a full reload. */
const POLL_MS = 45_000;

async function loadReviews(forceRefresh: boolean): Promise<DiscordReview[]> {
  const bust = `t=${Date.now()}`;
  const apiUrl = forceRefresh ? `/api/reviews?refresh=1&${bust}` : `/api/reviews?${bust}`;
  const sources = [apiUrl, `/${REVIEWS_MANIFEST_PATH}?${bust}`];

  for (const url of sources) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;
      const data = (await res.json()) as ReviewsManifest;
      if (Array.isArray(data.reviews)) return data.reviews;
    } catch {
      /* try next source */
    }
  }

  return [];
}

export default function Reviews() {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<DiscordReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const refresh = useCallback(async (force: boolean, showSpinner: boolean) => {
    if (showSpinner) setSyncing(true);
    try {
      const items = await loadReviews(force);
      setReviews(items);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadReviews(true).then((items) => {
      if (!cancelled) {
        setReviews(items);
        setLoading(false);
      }
    });

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refresh(true, false);
      }
    }, POLL_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh(true, false);
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const discordInvite = import.meta.env.VITE_DISCORD_LINK || "https://discord.gg/5btq6znUvN";

  return (
    <div>
      <section className="relative pt-10 pb-8 lg:pt-12 lg:pb-10">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-end justify-between gap-3 gap-y-4">
              <div className="min-w-0">
                <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-2 block">
                  {t("reviews.eyebrow")}
                </span>
                <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-2">
                  {t("reviews.title")}{" "}
                  <span className="text-violet-tech neon-text">{t("reviews.titleAccent")}</span>
                  {t("reviews.titleEnd") ? ` ${t("reviews.titleEnd")}` : ""}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-snug max-w-xl">
                  {t("reviews.subtitle")}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={syncing}
                onClick={() => void refresh(true, true)}
                className="border-violet-tech/40 gap-2 shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                {t("reviews.refresh")}
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground/80 leading-snug">
              {t("reviews.discordNote")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-12 lg:pb-16">
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
            <div className="columns-1 sm:columns-2 xl:columns-3 gap-3 [column-fill:_balance]">
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
