/**
 * Documentation — Neon Circuit Design
 * Technical guides, hardware requirements, and V7.0 update notes
 */
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Cpu, 
  Monitor, 
  ShieldCheck, 
  Settings, 
  Terminal,
  Layers,
  Zap,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Documentation() {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-violet-tech" />
            <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-tech">Technical Docs</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-6">
            Everything you need to <span className="text-violet-tech">know</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Detailed hardware requirements, installation procedures, and what's new in **FUSION IA V7.0**.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* V7.0 Update Notes */}
            <motion.section variants={fadeUp} custom={1} initial="hidden" animate="visible" className="glass-card rounded-xl p-8 border-violet-tech/20">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-violet-tech" />
                <h2 className="font-display font-bold text-2xl tracking-tight">What's New in V7.0</h2>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-violet-tech/5 border border-violet-tech/10">
                  <h3 className="font-display font-semibold text-violet-accent mb-2">🔴 Native AMD Support</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Completely redesigned architecture that automatically detects and optimizes for AMD GPUs. No more FPS drops or monitoring conflicts.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-violet-tech/5 border border-violet-tech/10">
                  <h3 className="font-display font-semibold text-violet-accent mb-2">⚡ Ultra-Low Latency</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Controller response time has been drastically reduced. Tracking and Aimbot are now instant in-game thanks to the new engine.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-violet-tech/5 border border-violet-tech/10">
                  <h3 className="font-display font-semibold text-violet-accent mb-2">🎨 Premium UI Redesign</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    New modern Dark Theme with native 1920x1080 support, sidebar navigation, and a cinematic video launch sequence.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Hardware Requirements */}
            <motion.section variants={fadeUp} custom={2} initial="hidden" animate="visible" className="space-y-6">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-violet-tech" />
                <h2 className="font-display font-bold text-2xl tracking-tight">Hardware Requirements</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-6 border-border/40">
                  <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-violet-tech" /> GPU (Graphics Card)
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> NVIDIA (GTX 10 / RTX 20 / 30 / 40 / 50+)
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> AMD (RX 5000 / 6000 / 7000+)
                    </li>
                  </ul>
                </div>

                <div className="glass-card rounded-lg p-6 border-border/40">
                  <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-tech" /> Platform & OS
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Windows 10 / 11 (64-bit)
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-2 font-bold text-violet-accent">
                      <CheckCircle2 className="w-3.5 h-3.5" /> STEAM ONLY (Apex Legends)
                    </li>
                    <li className="text-sm text-red-400 flex items-center gap-2 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" /> EA App / Origin Not Supported
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Setup Process */}
            <motion.section variants={fadeUp} custom={3} initial="hidden" animate="visible" className="space-y-6">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-violet-tech" />
                <h2 className="font-display font-bold text-2xl tracking-tight">Installation Process</h2>
              </div>
              <div className="space-y-4">
                {[
                  { step: "01", title: "Purchase & Discord", desc: "Select your plan and join our Discord for the download link and license key." },
                  { step: "02", title: "Steam Configuration", desc: "Ensure Apex Legends is installed via Steam. Verify game files before first launch." },
                  { step: "03", title: "Windows Prep", desc: "Disable unnecessary overlays (Discord, Steam) and ensure your GPU drivers are up to date." },
                  { step: "04", title: "Launch V7.0", desc: "Run the software, enjoy the cinematic intro, and configure your settings in real-time." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6 p-6 rounded-lg bg-dark-elevated/30 border border-border/30">
                    <span className="font-display font-black text-3xl text-violet-tech/20 leading-none">{item.step}</span>
                    <div>
                      <h4 className="font-display font-bold text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="glass-card rounded-xl p-6 border-violet-tech/30 bg-violet-tech/5">
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-violet-tech" /> Security First
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                FUSION IA V7.0 uses advanced external visual processing. It does not modify game memory or files, making it 100% undetectable by anti-cheat systems.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-violet-accent tracking-widest uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Undetected
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-violet-accent tracking-widest uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> External Only
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible" className="glass-card rounded-xl p-6 border-border/40">
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-tech" /> Quick Links
              </h3>
              <div className="space-y-3">
                <a href="https://discord.gg/5btq6znUvN" target="_blank" rel="noopener noreferrer" className="block text-xs text-muted-foreground hover:text-violet-tech transition-colors">→ Join Discord Support</a>
                <a href="/purchase" className="block text-xs text-muted-foreground hover:text-violet-tech transition-colors">→ View All Plans</a>
                <a href="https://discord.gg/5btq6znUvN" target="_blank" rel="noopener noreferrer" className="block text-xs text-muted-foreground hover:text-violet-tech transition-colors">→ Report a Bug</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
