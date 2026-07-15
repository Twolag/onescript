/**
 * Showcase — Product Demo Videos
 * Neon Circuit Design with integrated video player modal
 */
import { motion, AnimatePresence } from "framer-motion";
import { Play, Cpu, Zap, X } from "lucide-react";
import { useState } from "react";

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
}

const videoDemos: VideoDemo[] = [
  {
    id: "fusion-ai-fortnite",
    title: "FUSION IA V8.1 — Fortnite",
    game: "Fortnite",
    product: "FUSION IA V8.1",
    description: "Exclusive demonstration of FUSION IA V8.1 in Fortnite. Ultra-precise tracking and zero input lag.",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/LbQIMyJSKwpOhWSA.jpg",
    videoUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/AhZMvZeQVblifwgY.mp4",
    icon: Cpu,
    badge: "FORTNITE",
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
  },
  {
    id: "advanced-weight-apex",
    title: "Advanced AI Weight — Apex Legends",
    game: "Apex Legends",
    product: "Advanced AI Weight",
    description: "Surgical precision targeting with the Advanced AI Weight add-on. Requires high-end GPU (NVIDIA RTX 4070/5060+ or AMD RX 7900/9060+).",
    thumbnail: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/spMRlfTuNpsOynMw.png",
    videoUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663779019150/WOeraDXfilotqblM.mp4",
    icon: Zap,
    badge: "ADD-ON",
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

  return (
    <div className="bg-dark-base min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-2 lg:pt-40 lg:pb-2 overflow-hidden">
        <div className="absolute inset-0 bg-dark-base" />
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

      {/* Video Grid Section */}
      <section className="relative py-2 lg:py-4">
        <div className="relative container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {videoDemos.map((demo, i) => (
              <motion.div
                key={demo.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden border border-white/5 hover:border-violet-tech/40 transition-all duration-500 flex flex-col h-full cursor-pointer bg-dark-elevated/30 backdrop-blur-sm"
                onClick={() => handleVideoClick(demo)}
              >
                <div className="relative w-full aspect-video overflow-hidden bg-dark-elevated">
                  <img
                    src={demo.thumbnail}
                    alt={demo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-violet-tech/20 backdrop-blur-md border border-violet-tech/50 flex items-center justify-center group-hover:bg-violet-tech group-hover:scale-110 transition-all duration-500 shadow-xl shadow-violet-tech/20">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white">
                      {demo.game}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 rounded bg-violet-tech text-[10px] font-bold tracking-widest uppercase text-white shadow-lg shadow-violet-tech/40">
                      {demo.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <demo.icon className="w-4 h-4 text-violet-tech" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-violet-accent">
                      {demo.product}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-foreground mb-2 group-hover:text-violet-tech transition-colors duration-300">
                    {demo.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {demo.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Games Section */}
      <section className="relative py-24 lg:py-32 border-t border-white/5">
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
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {[
              { name: "Apex Legends", icon: "🎮" },
              { name: "Fortnite", icon: "🎯" },
              { name: "Warzone", icon: "🔫" },
              { name: "Overwatch 2", icon: "⚔️" },
            ].map((game, i) => (
              <motion.div
                key={game.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                className="glass-card rounded-xl p-8 text-center hover:border-violet-tech/50 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-violet-tech/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {game.icon}
                </div>
                <p className="font-display font-bold text-foreground tracking-wide relative z-10">{game.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VideoModal demo={selectedVideo} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
