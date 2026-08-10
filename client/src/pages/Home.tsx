/**
 * Home — Neon Circuit Design
 * Sections: Hero (Fusion AI + RP2350A), Featured Games, Support
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Zap,
  ArrowRight,
  ChevronRight,
  Shield,
  Headphones,
  TrendingUp,
  MessageCircle,
  Keyboard,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/hero-bg-Bq3mdtincwx5DgcV2mHARK.webp";
const RP2350A_IMG = "/images/rp2350a-waveshare.png";

/** Advanced AI Weight demo clips (autoplay loops on game cards) */
const ADVANCED_WEIGHT_VIDEOS = {
  fortnite:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/vmTTDTSBoGUuraRB.mp4",
  apex:
    "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/WOeraDXfilotqblM.mp4",
} as const;

interface GameCard {
  id: string;
  name: string;
  shortName: string;
  href: string;
  video?: string;
  logo?: string;
  accent: string;
  logoText: string;
}

const games: GameCard[] = [
  {
    id: "fortnite",
    name: "Fortnite",
    shortName: "Fortnite",
    href: "/purchase?product=ai-engine&game=fortnite",
    video: ADVANCED_WEIGHT_VIDEOS.fortnite,
    accent: "from-violet-tech/40 via-transparent to-cyan-500/20",
    logoText: "FORTNITE",
  },
  {
    id: "apex",
    name: "Apex Legends",
    shortName: "Apex",
    href: "/purchase?product=ai-engine&game=apex",
    video: ADVANCED_WEIGHT_VIDEOS.apex,
    accent: "from-red-500/30 via-transparent to-violet-tech/30",
    logoText: "APEX",
  },
  {
    id: "overwatch",
    name: "Overwatch",
    shortName: "Overwatch",
    href: "/purchase?product=ai-engine&game=overwatch",
    logo: "/images/games/overwatch.svg",
    accent: "from-orange-500/25 via-transparent to-violet-tech/25",
    logoText: "OVERWATCH",
  },
  {
    id: "warzone",
    name: "Warzone",
    shortName: "Warzone",
    href: "/purchase?product=ai-engine&game=warzone",
    logo: "/images/games/warzone.svg",
    accent: "from-amber-500/25 via-transparent to-violet-tech/25",
    logoText: "WARZONE",
  },
  {
    id: "the-finals",
    name: "The Finals",
    shortName: "The Finals",
    href: "/purchase?product=ai-engine&game=the-finals",
    logo: "/images/games/the-finals.svg",
    accent: "from-yellow-400/20 via-transparent to-violet-tech/25",
    logoText: "THE FINALS",
  },
  {
    id: "splitgate",
    name: "Splitgate",
    shortName: "Splitgate",
    href: "/purchase?product=ai-engine&game=splitgate",
    logo: "/images/games/splitgate.svg",
    accent: "from-sky-400/25 via-transparent to-violet-tech/25",
    logoText: "SPLITGATE",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[88vh] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/70" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,46,255,0.03) 2px, rgba(123,46,255,0.03) 4px)",
            }}
          />
        </div>

        <div className="relative container py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="max-w-2xl flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-violet-tech/30 bg-violet-tech/10 text-xs font-body font-medium text-violet-accent tracking-wide"
              >
                <Zap className="w-3 h-3" />
                FUSION AI V8.1 — KEYBOARD, MOUSE &amp; CONTROLLER
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
              >
                Dominate Every Game with{" "}
                <span className="text-violet-tech neon-text">Fusion AI</span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8"
              >
                The most advanced AI visual engine — powered by the Waveshare RP2350A.
                Native NVIDIA &amp; AMD support. Plans from 1 €.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-4"
              >
                <a href="#games">
                  <Button
                    size="lg"
                    className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    CHOOSE YOUR GAME
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="https://discord.gg/5btq6znUvN" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    DISCORD
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* RP2350A product showcase — neon framed */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="w-full max-w-md lg:max-w-lg relative"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-tech via-violet-accent/60 to-violet-tech opacity-60 blur-sm animate-pulse" />
              <div className="relative rounded-2xl overflow-hidden border border-violet-tech/50 bg-dark-base shadow-[0_0_60px_rgba(123,46,255,0.35)]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-tech/10 via-transparent to-violet-accent/10 pointer-events-none" />
                <motion.img
                  src={RP2350A_IMG}
                  alt="Waveshare RP2350A USB Mini Development Board"
                  className="w-full aspect-square object-cover"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-display font-bold text-sm tracking-[0.2em] text-violet-accent uppercase mb-1">
                    Required Hardware
                  </p>
                  <p className="font-display font-extrabold text-lg sm:text-xl text-foreground">
                    Waveshare RP2350A
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Full Keyboard / Mouse &amp; Controller support
                  </p>
                </div>
                {/* Corner neon accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-violet-tech/80" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-violet-tech/80" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-violet-tech/80" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-violet-tech/80" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-tech/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════ FEATURED GAMES GRID ═══════════════ */}
      <section id="games" className="relative py-20 lg:py-28 scroll-mt-20">
        <div className="absolute inset-0 bg-dark-surface/40" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
              Featured Products
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Pick your <span className="text-violet-tech">game</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              AI Aimbot for every title — one checkout, plans from 1 €.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {games.map((game, i) => (
              <motion.div
                key={game.id}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                <Link
                  href={game.href}
                  className="group relative block rounded-xl overflow-hidden border border-violet-tech/25 hover:border-violet-tech/70 transition-all duration-300 shadow-[0_0_0_0_rgba(123,46,255,0)] hover:shadow-[0_0_40px_rgba(123,46,255,0.25)]"
                >
                  <div className="relative aspect-[16/10] bg-dark-base">
                    {game.video ? (
                      <video
                        src={game.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark-elevated to-dark-base">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${game.accent}`}
                        />
                        <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center">
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

                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.accent} opacity-40 group-hover:opacity-60 transition-opacity`}
                    />

                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="relative p-5 bg-dark-elevated/90 border-t border-violet-tech/20">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-accent mb-1">
                          AI Aimbot
                        </p>
                        <h3 className="font-display font-extrabold text-lg text-foreground group-hover:text-violet-accent transition-colors">
                          {game.name}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-display font-semibold tracking-wider text-violet-tech group-hover:translate-x-0.5 transition-transform">
                        BUY
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      From 1 € · Keyboard/Mouse &amp; Controller
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            custom={8}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-violet-tech" />
              Keyboard &amp; Mouse
            </span>
            <span className="inline-flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-violet-tech" />
              Controller
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="w-4 h-4 text-violet-tech" />
              Waveshare RP2350A
            </span>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* ═══════════════ SUPPORT CTA ═══════════════ */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-dark-surface/30" />
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
                Support
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
                Need help? <span className="text-violet-tech">We&apos;re here.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                Our support team is available to assist you. Ticket system, complete FAQ, and
                detailed documentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/support">
                  <Button
                    size="lg"
                    className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                  >
                    <Headphones className="w-4 h-4" />
                    CONTACT SUPPORT
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider"
                  >
                    ALL PRODUCTS
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
                  { icon: Headphones, label: "24/7 Support" },
                  { icon: Shield, label: "Secure Payment" },
                  { icon: Zap, label: "Fast Installation" },
                  { icon: TrendingUp, label: "Updates" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-card rounded-lg p-5 text-center hover:border-violet-tech/30 transition-colors duration-300"
                  >
                    <item.icon className="w-6 h-6 text-violet-tech mx-auto mb-2" />
                    <p className="text-xs font-body font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
