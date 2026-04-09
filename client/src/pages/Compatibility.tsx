/**
 * Compatibility — Neon Circuit Design
 * Content: Supported GPUs, Recommended CPUs, Supported OS, Gaming Platforms
 */
import { motion } from "framer-motion";
import {
  Cpu,
  Monitor,
  HardDrive,
  Gamepad2,
  Check,
  X,
  Minus,
} from "lucide-react";

const COMPAT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/compatibility-9tPSGgesBF5S5hA6Qermho.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const gpuData = [
  { name: "RTX 3060", tier: "Mid Range", status: "compatible", note: "Stable operation, solid CPU required" },
  { name: "RTX 3070", tier: "Mid Range", status: "compatible", note: "Stable operation, solid CPU required" },
  { name: "RTX 4060", tier: "Mid Range", status: "compatible", note: "Stable operation" },
  { name: "RTX 4070", tier: "High End", status: "recommended", note: "Recommended — maximum performance" },
  { name: "RTX 4080 / 4090", tier: "High End", status: "recommended", note: "Optimal performance" },
  { name: "RTX 5060+", tier: "High End", status: "recommended", note: "Latest generation — optimal" },
  { name: "GTX 1660 and below", tier: "Low End", status: "incompatible", note: "Not compatible — GPU too old" },
  { name: "AMD Radeon", tier: "Various", status: "incompatible", note: "Not compatible — NVIDIA only" },
];

const cpuData = [
  { name: "Intel i5 13600K", tier: "Recommended", status: "recommended" },
  { name: "Intel i7 13700K+", tier: "Optimal", status: "recommended" },
  { name: "AMD Ryzen 5 5600X", tier: "Compatible", status: "compatible" },
  { name: "AMD Ryzen 7 5800X+", tier: "Recommended", status: "recommended" },
  { name: "Intel i5 12400", tier: "Compatible", status: "compatible" },
  { name: "Intel i3 / Ryzen 3", tier: "Not compatible", status: "incompatible" },
];

const osData = [
  { name: "Windows 10 (22H2)", status: "recommended", note: "Recommended — full support" },
  { name: "Windows 11 (23H2+)", status: "compatible", note: "Compatible — full support" },
  { name: "Windows 10 (older versions)", status: "limited", note: "Update recommended" },
  { name: "macOS / Linux", status: "incompatible", note: "Not supported" },
];

const gamingPlatformsData = [
  { name: "Steam", status: "recommended", note: "Available now — full support" },
  { name: "Apex Legends", status: "recommended", note: "Available now — full support" },
  { name: "Call of Duty", status: "recommended", note: "Available now — full support" },
  { name: "Other platforms", status: "limited", note: "Under development — coming soon" },
];

const aiAimbotNote = "Gaming platform compatibility is directly linked to FUSION AI's AI Aimbot. The games listed above are currently supported. Others will be added regularly.";

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "recommended":
      return <Check className="w-4 h-4 text-green-400" />;
    case "compatible":
      return <Check className="w-4 h-4 text-violet-tech" />;
    case "limited":
      return <Minus className="w-4 h-4 text-yellow-400" />;
    case "incompatible":
      return <X className="w-4 h-4 text-red-400" />;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    recommended: "bg-green-400/10 text-green-400 border-green-400/20",
    compatible: "bg-violet-tech/10 text-violet-tech border-violet-tech/20",
    limited: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    incompatible: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  const labels: Record<string, string> = {
    recommended: "Recommended",
    compatible: "Compatible",
    limited: "Limited",
    incompatible: "Not supported",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status] || ""}`}
    >
      <StatusIcon status={status} />
      {labels[status]}
    </span>
  );
}

export default function Compatibility() {
  return (
    <div>
      {/* Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
                Compatibility
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
                Is your PC{" "}
                <span className="text-violet-tech neon-text">ready</span>?
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Check your hardware compatibility with our tools.
                NVIDIA RTX recommended for optimal performance.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="hidden lg:block"
            >
              <div className="relative rounded-lg overflow-hidden neon-glow">
                <img src={COMPAT_IMG} alt="Hardware Compatibility" className="w-full h-auto rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* GPU Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
              <HardDrive className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Supported GPUs (AI Aimbot only)
              </h2>
              <p className="text-sm text-muted-foreground">NVIDIA RTX required for AI. Other tools work on all GPUs.</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="glass-card rounded-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent">
                      GPU
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent">
                      Category
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent hidden sm:table-cell">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gpuData.map((gpu) => (
                    <tr
                      key={gpu.name}
                      className="border-b border-border/10 hover:bg-dark-elevated/30 transition-colors"
                    >
                      <td className="px-6 py-3.5 font-medium text-foreground">
                        {gpu.name}
                      </td>
                      <td className="px-6 py-3.5 text-muted-foreground">
                        {gpu.tier}
                      </td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={gpu.status} />
                      </td>
                      <td className="px-6 py-3.5 text-muted-foreground hidden sm:table-cell">
                        {gpu.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CPU Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-dark-surface/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/15 to-transparent" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
              <Cpu className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Recommended CPUs (AI Aimbot only)
              </h2>
              <p className="text-sm text-muted-foreground">Recommendations for AI processing. Other tools work on all CPUs.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cpuData.map((cpu, i) => (
              <motion.div
                key={cpu.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-5 hover:border-violet-tech/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{cpu.name}</h4>
                  <StatusBadge status={cpu.status} />
                </div>
                <p className="text-xs text-muted-foreground">{cpu.tier}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gaming Platforms Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/15 to-transparent" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
              <Gamepad2 className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Game Compatibility (AI Aimbot)
              </h2>
              <p className="text-sm text-muted-foreground">Platforms supported by FUSION AI</p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="glass-card rounded-lg p-5 mb-6 border-l-2 border-violet-tech"
          >
            <p className="text-sm text-muted-foreground">{aiAimbotNote}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gamingPlatformsData.map((platform, i) => (
              <motion.div
                key={platform.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-5 hover:border-violet-tech/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{platform.name}</h4>
                  <StatusBadge status={platform.status} />
                </div>
                <p className="text-xs text-muted-foreground">{platform.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Console Compatibility Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-dark-surface/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/15 to-transparent" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-green-500/15 border border-green-500/20">
              <Gamepad2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Console Compatibility
              </h2>
              <p className="text-sm text-muted-foreground">FUSION AI now supports Xbox and PlayStation 5</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "Xbox Series X/S", status: "recommended", note: "Full support — optimized for console" },
              { name: "PlayStation 5", status: "recommended", note: "Full support — optimized for console" },
            ].map((console, i) => (
              <motion.div
                key={console.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-5 hover:border-green-500/30 transition-colors duration-300 border-l-2 border-green-500"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{console.name}</h4>
                  <StatusBadge status={console.status} />
                </div>
                <p className="text-xs text-muted-foreground">{console.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="glass-card rounded-lg p-5 mt-6 border-l-2 border-green-500 bg-green-900/10"
          >
            <p className="text-sm text-green-200/90"><strong className="text-green-400">Installation Note:</strong> Console setup is handled entirely by our support team during the installation process. Simply select your platform during checkout, and we will ensure everything is configured perfectly for your Xbox or PlayStation 5.</p>
          </motion.div>
        </div>
      </section>

      {/* OS Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
              <Monitor className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Operating Systems
              </h2>
              <p className="text-sm text-muted-foreground">Windows only</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {osData.map((os, i) => (
              <motion.div
                key={os.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-5 hover:border-violet-tech/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{os.name}</h4>
                  <StatusBadge status={os.status} />
                </div>
                <p className="text-xs text-muted-foreground">{os.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
