/**
 * Showcase — Product Demo Videos
 * Neon Circuit Design with integrated video player modal
 */
import { motion, AnimatePresence } from "framer-motion";
import { Play, Cpu, Zap, X, Gamepad2, Keyboard, Crosshair, Target, Trophy, Swords } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

interface VideoDemo {
  id: string;
  title: string;
  game: string;
  product: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  icon: React.ElementType;
  badge: string;
  accent: string;
  tags: string[];
}

const videoDemos: VideoDemo[] = [
  {
    id: "fusion-ai-fortnite",
    title: "FUSION IA V8.1 — Fortnite",
    game: "Fortnite",
    product: "FUSION IA V8.1",
    description: "Exclusive demonstration of FUSION IA V8.1 in Fortnite. Ultra-precise tracking and zero input lag.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/LbQIMyJSKwpOhWSA.jpg",
    videoUrl: "/videos/fortnite-clip.mp4",
    icon: Cpu,
    badge: "FORTNITE",
    accent: "from-violet-tech/40 via-transparent to-cyan-500/20",
    tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
  },
  {
    id: "fusion-ai-apex",
    title: "FUSION IA V8.1 — Apex Legends",
    game: "Apex Legends",
    product: "FUSION IA V8.1",
    description: "FUSION IA V8.1 performance showcase on Apex Legends. Adaptive AI engine for high-speed combat.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/spMRlfTuNpsOynMw.png",
    videoUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/YDnWosDYeXbWstWQ.mp4",
    icon: Cpu,
    badge: "APEX",
    accent: "from-red-500/30 via-transparent to-violet-tech/30",
    tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
  },
  {
    id: "advanced-weight-apex",
    title: "Advanced AI Weight — Apex Legends",
    game: "Apex Legends",
    product: "Advanced AI Weight",
    description: "Surgical precision targeting with the Advanced AI Weight add-on. Requires high-end GPU (NVIDIA RTX 4070/5060+ or AMD RX 7900/9000+), minimum.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/spMRlfTuNpsOynMw.png",
    videoUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/WOeraDXfilotqblM.mp4",
    icon: Zap,
    badge: "ADD-ON",
    accent: "from-amber-500/30 via-transparent to-violet-tech/25",
    tags: ["Add-on", "High-end GPU", "Undetectable", "Optimized"],
  },
  {
    id: "advanced-weight-fortnite",
    title: "Advanced AI Weight — Fortnite",
    game: "Fortnite",
    product: "Advanced AI Weight",
    description: "Advanced AI Weight performance on Fortnite. Experience next-level precision and tracking. Requires high-end GPU (NVIDIA RTX 4070/5060+ or AMD RX 7900/9000+), minimum.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/LbQIMyJSKwpOhWSA.jpg",
    videoUrl: "/videos/fortnite-clip.mp4",
    icon: Zap,
    badge: "ADD-ON",
    accent: "from-violet-tech/40 via-transparent to-cyan-500/20",
    tags: ["Add-on", "High-end GPU", "Undetectable", "Optimized"],
  },
];

function VideoModal({ demo, isOpen, onClose }: { demo: VideoDemo | null; isOpen: boolean; onClose: () => void }) {
  if (!demo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 lg:p-8"
            onClick={onClose}
          >
            <div
              className="relative w-full max-w-5xl bg-dark-base rounded-xl overflow-hidden border border-violet-tech/30 shadow-2xl shadow-violet-tech/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-violet-tech/20 border border-white/10 hover:border-violet-tech/50 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="relative w-full bg-black aspect-video">
                <video
                  src={demo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              </div>

              <div className="p-6 lg:p-8 bg-gradient-to-b from-dark-elevated to-dark-base border-t border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-violet-tech/20 text-violet-tech border border-violet-tech/30">
                    {demo.game}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {demo.product}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-foreground mb-3">
                  {demo.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {demo.description}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Showcase() {
  const [selectedVideo, setSelectedVideo] = useState<VideoDemo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (demo: VideoDemo) => {
    setSelectedVideo(demo);
    setIsModalOpen(true);
  };

  const supportedGames = [
    {
      name: "Universal",
      href: "/purchase?product=ai-engine&game=universal",
      icon: Zap,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "All Games"],
    },
    {
      name: "Fortnite",
      href: "/purchase?product=ai-engine&game=fortnite",
      icon: Target,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Apex Legends",
      href: "/purchase?product=ai-engine&game=apex",
      icon: Gamepad2,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Overwatch",
      href: "/purchase?product=ai-engine&game=overwatch",
      icon: Swords,
      tags: ["Keyboard / Mouse", "Undetectable", "Optimized"],
    },
    {
      name: "Warzone",
      href: "/purchase?product=ai-engine&game=warzone",
      icon: Crosshair,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "The Finals",
      href: "/purchase?product=ai-engine&game=the-finals",
      icon: Trophy,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Splitgate",
      href: "/purchase?product=ai-engine&game=splitgate",
      icon: Zap,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "CS:GO",
      href: "/purchase?product=ai-engine&game=csgo",
      icon: Crosshair,
      tags: ["Keyboard / Mouse", "Undetectable", "Optimized"],
    },
    {
      name: "Marvel Rivals",
      href: "/purchase?product=ai-engine&game=marvel-rivals",
      icon: Keyboard,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Rainbow Six Siege",
      href: "/purchase?product=ai-engine&game=rainbow-six",
      icon: Crosshair,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Rust",
      href: "/purchase?product=ai-engine&game=rust",
      icon: Target,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Arc Raiders",
      href: "/purchase?product=ai-engine&game=arc-raiders",
      icon: Zap,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Destiny",
      href: "/purchase?product=ai-engine&game=destiny",
      icon: Crosshair,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Delta Force",
      href: "/purchase?product=ai-engine&game=delta-force",
      icon: Gamepad2,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "PUBG",
      href: "/purchase?product=ai-engine&game=pubg",
      icon: Target,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
    {
      name: "Battlefield",
      href: "/purchase?product=ai-engine&game=battlefield",
      icon: Swords,
      tags: ["Keyboard / Mouse", "Controller", "Undetectable", "Optimized"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-6 lg:pt-28 lg:pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
        
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-2"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-tech/10 border border-violet-tech/30 text-xs font-semibold tracking-widest uppercase text-violet-tech mb-4">
              Showcase
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4">
              See <span className="text-violet-tech">OneScript</span> in Action
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Exclusive gameplay demonstrations of FUSION IA V8.1 and premium add-ons.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid Section — homepage-style cards */}
      <section className="relative py-6 lg:py-10">
        <div className="relative container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {videoDemos.map((demo, i) => (
              <motion.div
                key={demo.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <button
                  type="button"
                  onClick={() => handleVideoClick(demo)}
                  className="group relative w-full text-left rounded-xl overflow-hidden border border-violet-tech/25 hover:border-violet-tech/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(123,46,255,0.25)]"
                >
                  <div className="relative aspect-[16/10] bg-dark-base">
                    <video
                      src={demo.videoUrl}
                      poster={demo.thumbnail}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${demo.accent} opacity-40 group-hover:opacity-60 transition-opacity`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-lg border border-violet-tech/50 bg-violet-tech/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-violet-tech/50 transition-colors">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-violet-tech/70 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="relative p-5 bg-dark-elevated/90 border-t border-violet-tech/20">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-accent mb-1">
                          {demo.product}
                        </p>
                        <h3 className="font-display font-extrabold text-lg text-foreground group-hover:text-violet-accent transition-colors">
                          {demo.game}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-display font-semibold tracking-wider text-violet-tech group-hover:translate-x-0.5 transition-transform">
                        WATCH
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {demo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-display font-semibold tracking-wide text-violet-accent border border-violet-tech/45 bg-violet-tech/15 shadow-[0_0_12px_rgba(123,46,255,0.18)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Games Section */}
      <section className="relative py-20 lg:py-28 border-t border-violet-tech/15">
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            className="text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Supported <span className="text-violet-tech">Games</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Same titles as on the homepage — plans from 15 €.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto">
            {supportedGames.map((game, i) => (
              <motion.div
                key={game.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link
                  href={game.href}
                  className="glass-card rounded-xl p-6 h-full flex flex-col hover:border-violet-tech/50 transition-all duration-500 group relative overflow-hidden block"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-tech/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg border border-violet-tech/40 bg-violet-tech/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <game.icon className="w-6 h-6 text-violet-tech" />
                    </div>
                    <p className="font-display font-bold text-foreground tracking-wide text-center mb-4">
                      {game.name}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                      {game.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-display font-semibold tracking-wide text-violet-accent border border-violet-tech/45 bg-violet-tech/15"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal demo={selectedVideo} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
