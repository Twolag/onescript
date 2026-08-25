/**
 * Home — Neon Circuit Design
 * First viewport: Dominate with Fusion IA + games grid
 */
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import {
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Shield,
  Headphones,
  TrendingUp,
  Keyboard,
  Gamepad2,
  X,
  Globe,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

/** Game card demo clips (autoplay loops) — local files only (remote CDN links expire/403) */
const GAME_VIDEOS = {
  fortnite: "/videos/fortnite-clip.mp4",
  apex: "/videos/apex-clip.mp4",
  splitgate: "/videos/splitgate-clip.mp4",
  overwatch: "/videos/overwatch-clip.mp4",
} as const;

interface GameCard {
  id: string;
  name: string;
  href: string;
  video?: string;
  logo?: string;
  accent: string;
  logoText: string;
  tags: TranslationKey[];
  featured?: boolean;
}

const FULL_INPUT_TAGS: TranslationKey[] = [
  "tags.from15",
  "tags.keyboardMouse",
  "tags.controller",
  "tags.undetectable",
  "tags.optimized",
];

const KEYBOARD_ONLY_TAGS: TranslationKey[] = [
  "tags.from15",
  "tags.keyboardMouse",
  "tags.undetectable",
  "tags.optimized",
];

/** Warzone / Splitgate: controller works without RP2350 */
const CONTROLLER_NO_RP_TAGS: TranslationKey[] = [
  "tags.from15",
  "tags.keyboardMouse",
  "tags.controllerNoRp",
  "tags.undetectable",
  "tags.optimized",
];


const games: GameCard[] = [
  {
    id: "universal",
    name: "Universal",
    href: "/purchase?product=ai-engine&game=universal",
    logo: "/images/games/universal.svg",
    accent: "from-cyan-400/30 via-violet-tech/20 to-violet-accent/30",
    logoText: "UNIVERSAL",
    tags: [...FULL_INPUT_TAGS, "tags.allGames"],
    featured: true,
  },
  {
    id: "fortnite",
    name: "Fortnite",
    href: "/purchase?product=ai-engine&game=fortnite",
    video: GAME_VIDEOS.fortnite,
    accent: "from-violet-tech/40 via-transparent to-cyan-500/20",
    logoText: "FORTNITE",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "apex",
    name: "Apex Legends",
    href: "/purchase?product=ai-engine&game=apex",
    video: GAME_VIDEOS.apex,
    accent: "from-red-500/30 via-transparent to-violet-tech/30",
    logoText: "APEX",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "splitgate",
    name: "Splitgate",
    href: "/purchase?product=ai-engine&game=splitgate",
    video: GAME_VIDEOS.splitgate,
    accent: "from-sky-400/25 via-transparent to-violet-tech/25",
    logoText: "SPLITGATE",
    tags: [...CONTROLLER_NO_RP_TAGS],
  },
  {
    id: "overwatch",
    name: "Overwatch",
    href: "/purchase?product=ai-engine&game=overwatch",
    video: GAME_VIDEOS.overwatch,
    logo: "/images/games/overwatch.svg",
    accent: "from-orange-500/25 via-transparent to-violet-tech/25",
    logoText: "OVERWATCH",
    tags: [...KEYBOARD_ONLY_TAGS],
  },
  {
    id: "warzone",
    name: "Warzone",
    href: "/purchase?product=ai-engine&game=warzone",
    logo: "/images/games/warzone.svg",
    accent: "from-amber-500/25 via-transparent to-violet-tech/25",
    logoText: "WARZONE",
    tags: [...CONTROLLER_NO_RP_TAGS],
  },
  {
    id: "the-finals",
    name: "The Finals",
    href: "/purchase?product=ai-engine&game=the-finals",
    logo: "/images/games/the-finals.svg",
    accent: "from-yellow-400/20 via-transparent to-violet-tech/25",
    logoText: "THE FINALS",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "csgo",
    name: "CS:GO",
    href: "/purchase?product=ai-engine&game=csgo",
    logo: "/images/games/csgo.svg",
    accent: "from-amber-500/30 via-transparent to-violet-tech/25",
    logoText: "CS:GO",
    tags: [...KEYBOARD_ONLY_TAGS],
  },
  {
    id: "marvel-rivals",
    name: "Marvel Rivals",
    href: "/purchase?product=ai-engine&game=marvel-rivals",
    logo: "/images/games/marvel-rivals.svg",
    accent: "from-red-500/30 via-transparent to-violet-tech/30",
    logoText: "MARVEL RIVALS",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "rainbow-six",
    name: "Rainbow Six Siege",
    href: "/purchase?product=ai-engine&game=rainbow-six",
    logo: "/images/games/rainbow-six.svg",
    accent: "from-yellow-400/25 via-transparent to-violet-tech/30",
    logoText: "R6 SIEGE",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "rust",
    name: "Rust",
    href: "/purchase?product=ai-engine&game=rust",
    logo: "/images/games/rust.svg",
    accent: "from-orange-600/30 via-transparent to-violet-tech/25",
    logoText: "RUST",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "arc-raiders",
    name: "Arc Raiders",
    href: "/purchase?product=ai-engine&game=arc-raiders",
    logo: "/images/games/arc-raiders.svg",
    accent: "from-sky-400/30 via-transparent to-violet-tech/30",
    logoText: "ARC RAIDERS",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "destiny",
    name: "Destiny",
    href: "/purchase?product=ai-engine&game=destiny",
    logo: "/images/games/destiny.svg",
    accent: "from-blue-400/30 via-transparent to-violet-tech/30",
    logoText: "DESTINY",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "delta-force",
    name: "Delta Force",
    href: "/purchase?product=ai-engine&game=delta-force",
    logo: "/images/games/delta-force.svg",
    accent: "from-emerald-400/25 via-transparent to-violet-tech/30",
    logoText: "DELTA FORCE",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "pubg",
    name: "PUBG",
    href: "/purchase?product=ai-engine&game=pubg",
    logo: "/images/games/pubg.svg",
    accent: "from-amber-400/30 via-transparent to-violet-tech/25",
    logoText: "PUBG",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "battlefield",
    name: "Battlefield",
    href: "/purchase?product=ai-engine&game=battlefield",
    logo: "/images/games/battlefield.svg",
    accent: "from-orange-500/30 via-transparent to-violet-tech/30",
    logoText: "BATTLEFIELD",
    tags: [...FULL_INPUT_TAGS],
  },
  {
    id: "onestate-rp",
    name: "Onestate RP",
    href: "/purchase?product=onestate-rp",
    accent: "from-yellow-400/30 via-amber-500/15 to-violet-tech/25",
    logoText: "ONESTATE RP",
    tags: [
      "tags.from10",
      "tags.donation",
    ],
  },
];

export default function Home() {
  const { t } = useLanguage();
  const [atBottom, setAtBottom] = useState(false);
  const [preview, setPreview] = useState<GameCard | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 180;
      setAtBottom(scrolled >= threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [preview]);

  return (
    <div className="overflow-hidden">
      {/* Fixed neon scroll hint — flips to Scroll Up near bottom */}
      <a
        href={atBottom ? "#top" : "#support"}
        onClick={(e) => {
          if (atBottom) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 px-4 py-3 rounded-xl border border-violet-tech/60 bg-dark-base/85 backdrop-blur-md shadow-[0_0_30px_rgba(123,46,255,0.45)] hover:border-violet-tech hover:shadow-[0_0_40px_rgba(123,46,255,0.7)] transition-all"
        aria-label={atBottom ? "Scroll up" : "Scroll down"}
      >
        <span className="text-[10px] font-display font-bold tracking-[0.22em] uppercase text-violet-accent">
          {atBottom ? t("home.scrollUp") : t("home.scrollDown")}
        </span>
        <span className="flex flex-col items-center -space-y-3 text-violet-tech">
          {atBottom ? (
            <>
              <ChevronUp className="w-8 h-8 animate-neon-bounce drop-shadow-[0_0_12px_rgba(123,46,255,1)]" />
              <ChevronUp className="w-8 h-8 opacity-50 animate-neon-bounce [animation-delay:160ms]" />
            </>
          ) : (
            <>
              <ChevronDown className="w-8 h-8 animate-neon-bounce drop-shadow-[0_0_12px_rgba(123,46,255,1)]" />
              <ChevronDown className="w-8 h-8 opacity-50 animate-neon-bounce [animation-delay:160ms]" />
            </>
          )}
        </span>
      </a>

      {/* ═══════════════ GAMES FIRST — Dominate with Fusion IA ═══════════════ */}
      <section id="top" className="relative pt-10 pb-16 lg:pt-14 lg:pb-20">
        <div className="relative container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-violet-tech/30 bg-violet-tech/10 text-xs font-body font-medium text-violet-accent tracking-wide">
              <Zap className="w-3 h-3" />
              {t("home.badge")}
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
              {t("home.dominate")} <span className="text-violet-tech neon-text">Fusion IA</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              {t("home.subtitle")}
            </p>

            <a
              href="#games-grid"
              className="inline-flex flex-col items-center gap-2 px-5 py-3 rounded-xl border border-violet-tech/50 bg-violet-tech/10 text-violet-accent hover:bg-violet-tech/20 hover:border-violet-tech hover:text-violet-tech transition-all shadow-[0_0_20px_rgba(123,46,255,0.25)]"
              aria-label={t("home.exploreGames")}
            >
              <span className="text-xs font-display font-bold tracking-[0.22em] uppercase">
                {t("home.exploreGames")}
              </span>
              <span className="flex flex-col items-center -space-y-3">
                <ChevronDown className="w-8 h-8 animate-neon-bounce drop-shadow-[0_0_12px_rgba(123,46,255,0.95)]" />
                <ChevronDown className="w-8 h-8 opacity-55 animate-neon-bounce [animation-delay:150ms]" />
              </span>
            </a>
          </motion.div>

          <div id="games-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 scroll-mt-24">
            {games.map((game, i) => (
              <motion.div
                key={game.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <div
                  className={`group relative block rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-[0_0_40px_rgba(123,46,255,0.25)] ${
                    game.featured
                      ? "border-cyan-400/50 hover:border-cyan-300/80 shadow-[0_0_28px_rgba(34,211,238,0.2)]"
                      : "border-violet-tech/25 hover:border-violet-tech/70"
                  }`}
                >
                  <button
                    type="button"
                    className="relative aspect-[16/10] bg-dark-base w-full text-left cursor-pointer"
                    onClick={() => {
                      if (game.video) setPreview(game);
                    }}
                    aria-label={game.video ? `Watch ${game.name} clip` : game.name}
                  >
                    {game.video ? (
                      <video
                        src={game.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-elevated to-dark-base">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${game.accent}`}
                        />
                        <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center">
                          {game.featured && (
                            <Globe className="w-8 h-8 text-cyan-300 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                          )}
                          {game.logo ? (
                            <img
                              src={game.logo}
                              alt={`${game.name} logo`}
                              className="w-full max-w-[280px] h-auto opacity-95 group-hover:opacity-100 transition-opacity"
                            />
                          ) : (
                            <p className="font-display font-extrabold text-2xl sm:text-3xl tracking-[0.15em] text-foreground neon-text">
                              {game.logoText}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.accent} opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none`}
                    />

                    {game.video && (
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-display font-bold tracking-wider text-white border border-violet-tech/60 bg-violet-tech/80 backdrop-blur-sm shadow-[0_0_16px_rgba(123,46,255,0.45)]">
                          <Maximize2 className="w-3.5 h-3.5" />
                          {t("home.fullscreen")}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>

                  <div className="relative p-5 bg-dark-elevated/90 border-t border-violet-tech/20">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-accent mb-1">
                          {game.featured
                            ? t("home.worksAlmostAll")
                            : game.id === "onestate-rp"
                              ? t("products.onestateSubtitle")
                              : t("home.aiAimbot")}
                        </p>
                        <h2 className="font-display font-extrabold text-lg text-foreground group-hover:text-violet-accent transition-colors">
                          {game.name}
                        </h2>
                      </div>
                      <Link href={game.href}>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-sm font-display font-bold tracking-wider text-white bg-cyan-500/90 border border-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.45)] hover:bg-cyan-400 hover:shadow-[0_0_28px_rgba(34,211,238,0.7)] transition-all">
                          {t("home.buy")}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-display font-semibold tracking-wide text-violet-accent border border-violet-tech/45 bg-violet-tech/15 shadow-[0_0_12px_rgba(123,46,255,0.18)]"
                        >
                          {t(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex flex-col items-center gap-6"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-violet-tech" />
                {t("home.keyboardMouse")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-violet-tech" />
                {t("home.controller")}
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="w-4 h-4 text-violet-tech" />
                Waveshare RP2350A
              </span>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/30 to-transparent" />
      </section>

      {/* ═══════════════ SUPPORT CTA ═══════════════ */}
      <section id="support" className="relative py-20 lg:py-28 scroll-mt-20">
        <div className="relative container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-3"
            >
              <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
                {t("home.supportEyebrow")}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
                {t("home.supportTitle")} <span className="text-violet-tech">{t("home.supportTitleAccent")}</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                {t("home.supportDesc")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/support">
                  <Button
                    size="lg"
                    className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                  >
                    <Headphones className="w-4 h-4" />
                    {t("home.contactSupport")}
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider"
                  >
                    {t("home.allProducts")}
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Headphones, labelKey: "home.support247" as TranslationKey },
                  { icon: Shield, labelKey: "home.securePayment" as TranslationKey },
                  { icon: Zap, labelKey: "home.fastInstall" as TranslationKey },
                  { icon: TrendingUp, labelKey: "home.updates" as TranslationKey },
                ].map((item) => (
                  <div
                    key={item.labelKey}
                    className="glass-card rounded-lg p-5 text-center hover:border-violet-tech/30 transition-colors duration-300"
                  >
                    <item.icon className="w-6 h-6 text-violet-tech mx-auto mb-2" />
                    <p className="text-xs font-body font-medium text-muted-foreground">
                      {t(item.labelKey)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fullscreen clip preview */}
      <AnimatePresence>
        {preview?.video && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
              onClick={() => setPreview(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8"
              onClick={() => setPreview(null)}
            >
              <div
                className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-violet-tech/40 bg-dark-base shadow-[0_0_50px_rgba(123,46,255,0.35)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute top-3 right-3 z-20 p-2 rounded-lg border border-violet-tech/40 bg-black/60 hover:bg-violet-tech/30 transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="relative w-full aspect-video bg-black">
                  <video
                    src={preview.video}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5 border-t border-violet-tech/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-accent mb-1">
                      AI Aimbot
                    </p>
                    <h3 className="font-display font-extrabold text-xl text-foreground">
                      {preview.name}
                    </h3>
                  </div>
                  <Link href={preview.href}>
                    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-sm font-display font-bold tracking-wider text-white bg-cyan-500/90 border border-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.45)] hover:bg-cyan-400 transition-all">
                      BUY
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
