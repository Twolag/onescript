/**
 * Showcase — Product Demo Videos
 * Neon Circuit Design with video grid and product demonstrations
 */
import { motion } from "framer-motion";
import { Play, Cpu, Zap, Gamepad2, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    id: "apex-weight-apex",
    title: "Advanced AI Weight in Action",
    game: "Apex Legends",
    product: "Advanced AI Weight",
    description: "Experience surgical precision targeting with our Advanced AI Weight add-on. Watch how the AI tracks enemies with incredible accuracy.",
    thumbnail: "https://images.unsplash.com/photo-1538481143235-5d630e50c6da?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    icon: Zap,
    badge: "ADD-ON",
  },
  {
    id: "fusion-ai-fortnite",
    title: "FUSION AI V8.1 on Fortnite",
    game: "Fortnite",
    product: "FUSION AI V8.1",
    description: "Zero FPS drops, ultra-low latency. See how FUSION AI V8.1 dominates in Fortnite with native NVIDIA & AMD support.",
    thumbnail: "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    icon: Cpu,
    badge: "V8.1",
  },
  {
    id: "fusion-ai-apex",
    title: "FUSION AI V8.1 on Apex Legends",
    game: "Apex Legends",
    product: "FUSION AI V8.1",
    description: "Revolutionary architecture with 10x more processing power. Watch the AI adapt in real-time during intense Apex matches.",
    thumbnail: "https://images.unsplash.com/photo-1538481143235-5d630e50c6da?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    icon: Cpu,
    badge: "V8.1",
  },
  {
    id: "jitter-script-controller",
    title: "Jitter Script — Controller Recoil Control",
    game: "Multiple Games",
    product: "Jitter Script",
    description: "Undetectable anti-recoil for controller players. Perfect for Apex, Fortnite, Warzone, and more. No aim assist cuts.",
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    icon: Gamepad2,
    badge: "CONTROLLER",
  },
  {
    id: "windows-optimization",
    title: "Windows Optimization — FPS Boost",
    game: "System-Wide",
    product: "Windows Optimization",
    description: "Gain 40-60 FPS with our advanced Windows optimization. Complete cleanup and system tuning for gaming performance.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    icon: Monitor,
    badge: "PERFORMANCE",
  },
  {
    id: "fusion-ai-warzone",
    title: "FUSION AI V8.1 on Warzone",
    game: "Call of Duty: Warzone",
    product: "FUSION AI V8.1",
    description: "Instant responsiveness in fast-paced Warzone matches. The AI engine adapts to every playstyle seamlessly.",
    thumbnail: "https://images.unsplash.com/photo-1538481143235-5d630e50c6da?w=600&h=400&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    icon: Cpu,
    badge: "V8.1",
  },
];

export default function Showcase() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-dark-base" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-tech/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-tech/5 rounded-full blur-3xl" />

        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-tech/10 border border-violet-tech/30 text-xs font-semibold tracking-widest uppercase text-violet-tech mb-4">
              Product Demonstrations
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              See <span className="text-violet-tech">OneScript</span> in Action
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Watch our products dominate across multiple games. From Apex Legends to Fortnite, experience the power of FUSION AI V8.1 and our premium tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />

        <div className="relative container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videoDemos.map((demo, i) => (
              <motion.div
                key={demo.id}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="group relative rounded-lg overflow-hidden border border-border/50 hover:border-violet-tech/30 transition-all duration-300 flex flex-col h-full"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated/40 to-dark-base/40" />

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-tech/0 via-transparent to-violet-tech/0 group-hover:from-violet-tech/5 group-hover:via-violet-tech/2 group-hover:to-violet-tech/5 transition-all duration-300" />

                {/* Content */}
                <div className="relative flex flex-col h-full">
                  {/* Thumbnail with play button */}
                  <div className="relative w-full h-48 overflow-hidden bg-dark-elevated">
                    <img
                      src={demo.thumbnail}
                      alt={demo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-violet-tech/20 border-2 border-violet-tech flex items-center justify-center group-hover:bg-violet-tech/30 transition-all duration-300">
                        <Play className="w-6 h-6 text-violet-tech fill-violet-tech" />
                      </div>
                    </div>
                  </div>

                  {/* Info section */}
                  <div className="relative p-6 flex flex-col flex-grow">
                    {/* Badge + Icon */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-tech/15 border border-violet-tech/20 flex-shrink-0">
                        <demo.icon className="w-5 h-5 text-violet-tech" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-violet-tech/30 bg-violet-tech/10 text-violet-tech whitespace-nowrap">
                        {demo.badge}
                      </span>
                    </div>

                    {/* Title & Game */}
                    <div className="mb-2">
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-0.5">
                        {demo.game}
                      </p>
                      <h3 className="font-display font-extrabold text-lg text-foreground">
                        {demo.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {demo.description}
                    </p>

                    {/* CTA Button */}
                    <a
                      href={demo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="w-full bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-2">
                        <Play className="w-4 h-4" />
                        Watch Demo
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Games Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />

        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Supported <span className="text-violet-tech">Games</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              FUSION AI V8.1 and our premium tools work seamlessly across the most popular competitive titles.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {[
              { name: "Apex Legends", icon: "🎮" },
              { name: "Fortnite", icon: "🎯" },
              { name: "Warzone", icon: "🔫" },
              { name: "Valorant", icon: "⚔️" },
              { name: "CS:GO", icon: "🎪" },
            ].map((game, i) => (
              <motion.div
                key={game.name}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="glass-card rounded-lg p-6 text-center hover:border-violet-tech/30 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>
                <p className="font-semibold text-foreground">{game.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />

        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">
              Ready to Dominate?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Start your journey with FUSION AI V8.1 today. Choose from weekly, monthly, or lifetime plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/purchase?product=ai-engine">
                <Button size="lg" className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow">
                  Get Started Now
                </Button>
              </a>
              <a href="/products">
                <Button size="lg" variant="outline" className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider">
                  View All Products
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
