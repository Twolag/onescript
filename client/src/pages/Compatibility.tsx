/**
 * Compatibility — Neon Circuit Design
 * Contenu : GPU supportés, CPU recommandés, OS supportés, plateformes gaming
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
  { name: "RTX 3060", tier: "Mid Range", status: "compatible", note: "Fonctionnement stable, CPU solide requis" },
  { name: "RTX 3070", tier: "Mid Range", status: "compatible", note: "Fonctionnement stable, CPU solide requis" },
  { name: "RTX 4060", tier: "Mid Range", status: "compatible", note: "Fonctionnement stable" },
  { name: "RTX 4070", tier: "High End", status: "recommended", note: "Recommandé — performances maximales" },
  { name: "RTX 4080 / 4090", tier: "High End", status: "recommended", note: "Performances optimales" },
  { name: "RTX 5060+", tier: "High End", status: "recommended", note: "Dernière génération — optimal" },
  { name: "GTX 1660 et inf.", tier: "Low End", status: "incompatible", note: "Non compatible — GPU trop ancien" },
  { name: "AMD Radeon", tier: "Varié", status: "incompatible", note: "Non compatible — NVIDIA uniquement" },
];

const cpuData = [
  { name: "Intel i5 13600K", tier: "Recommandé", status: "recommended" },
  { name: "Intel i7 13700K+", tier: "Optimal", status: "recommended" },
  { name: "AMD Ryzen 5 5600X", tier: "Compatible", status: "compatible" },
  { name: "AMD Ryzen 7 5800X+", tier: "Recommandé", status: "recommended" },
  { name: "Intel i5 12400", tier: "Compatible", status: "compatible" },
  { name: "Intel i3 / Ryzen 3", tier: "Non compatible", status: "incompatible" },
];

const osData = [
  { name: "Windows 10 (22H2)", status: "recommended", note: "Recommandé — support complet" },
  { name: "Windows 11 (23H2+)", status: "compatible", note: "Compatible — support complet" },
  { name: "Windows 10 (anciennes versions)", status: "limited", note: "Mise à jour recommandée" },
  { name: "macOS / Linux", status: "incompatible", note: "Non supporté" },
];

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
    recommended: "Recommandé",
    compatible: "Compatible",
    limited: "Limité",
    incompatible: "Non supporté",
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
                Compatibilité
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
                Votre PC est-il{" "}
                <span className="text-violet-tech neon-text">prêt</span> ?
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Vérifiez la compatibilité de votre matériel avec nos outils.
                NVIDIA RTX recommandé pour des performances optimales.
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
                <img src={COMPAT_IMG} alt="Compatibilité matérielle" className="w-full h-auto rounded-lg" />
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
                GPU supportés
              </h2>
              <p className="text-sm text-muted-foreground">NVIDIA recommandé</p>
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
                      Catégorie
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent">
                      Statut
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
                CPU recommandés
              </h2>
              <p className="text-sm text-muted-foreground">Intel & AMD</p>
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
                Systèmes d'exploitation
              </h2>
              <p className="text-sm text-muted-foreground">Windows uniquement</p>
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

      {/* Platforms */}
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
              <Gamepad2 className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Plateformes gaming
              </h2>
              <p className="text-sm text-muted-foreground">Jeux compatibles</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Steam",
              "Epic Games",
              "Valorant",
              "Fortnite",
              "Call of Duty",
              "Apex Legends",
              "CS2",
              "League of Legends",
            ].map((platform, i) => (
              <motion.div
                key={platform}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-4 text-center hover:border-violet-tech/30 transition-colors duration-300"
              >
                <Check className="w-4 h-4 text-violet-tech mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">{platform}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
