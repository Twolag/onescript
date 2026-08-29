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
import { useLanguage, type TranslationKey } from "@/i18n/LanguageContext";

const COMPAT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/compatibility-9tPSGgesBF5S5hA6Qermho.webp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const gpuData: { name: string; tierKey: TranslationKey; status: string; noteKey: TranslationKey }[] = [
  { name: "RTX 3060", tierKey: "compatibility.tierMid", status: "compatible", noteKey: "compatibility.noteStableCpu" },
  { name: "RTX 3070", tierKey: "compatibility.tierMid", status: "compatible", noteKey: "compatibility.noteStableCpu" },
  { name: "RTX 4060", tierKey: "compatibility.tierMid", status: "compatible", noteKey: "compatibility.noteStable" },
  { name: "RTX 4070", tierKey: "compatibility.tierHigh", status: "recommended", noteKey: "compatibility.noteMaxPerf" },
  { name: "RTX 4080 / 4090", tierKey: "compatibility.tierHigh", status: "recommended", noteKey: "compatibility.noteOptimal" },
  { name: "RTX 5060+", tierKey: "compatibility.tierHigh", status: "recommended", noteKey: "compatibility.noteLatest" },
  { name: "GTX 1660 and below", tierKey: "compatibility.tierLow", status: "incompatible", noteKey: "compatibility.noteTooOld" },
  { name: "AMD RX 6600 XT", tierKey: "compatibility.tierModern", status: "compatible", noteKey: "compatibility.noteAmdMin" },
  { name: "AMD RX 6700 XT", tierKey: "compatibility.tierModern", status: "recommended", noteKey: "compatibility.noteAmdExcel" },
  { name: "AMD RX 6800 XT", tierKey: "compatibility.tierHigh", status: "recommended", noteKey: "compatibility.noteAmdOut" },
  { name: "AMD RX 7600", tierKey: "compatibility.tierModern", status: "compatible", noteKey: "compatibility.noteRdna3Native" },
  { name: "AMD RX 7700 XT", tierKey: "compatibility.tierHigh", status: "recommended", noteKey: "compatibility.noteRdna3Exc" },
  { name: "AMD RX 7900 XT / XTX", tierKey: "compatibility.tierHigh", status: "recommended", noteKey: "compatibility.noteRdna3Opt" },
  { name: "AMD RX 9000+ Series", tierKey: "compatibility.tierLatest", status: "recommended", noteKey: "compatibility.noteRdna4" },
];

const cpuData: { name: string; tierKey: TranslationKey; status: string }[] = [
  { name: "Intel i5 13600K", tierKey: "compatibility.tierRecommended", status: "recommended" },
  { name: "Intel i7 13700K+", tierKey: "compatibility.tierOptimal", status: "recommended" },
  { name: "AMD Ryzen 5 5600X", tierKey: "compatibility.tierCompatible", status: "compatible" },
  { name: "AMD Ryzen 7 5800X+", tierKey: "compatibility.tierRecommended", status: "recommended" },
  { name: "Intel i5 12400", tierKey: "compatibility.tierCompatible", status: "compatible" },
  { name: "Intel i3 / Ryzen 3", tierKey: "compatibility.tierIncompatible", status: "incompatible" },
];

const osData: { name: string; status: string; noteKey: TranslationKey }[] = [
  { name: "Windows 10 (22H2)", status: "recommended", noteKey: "compatibility.noteOsRec" },
  { name: "Windows 11 (23H2+)", status: "compatible", noteKey: "compatibility.noteOsCompat" },
  { name: "Windows 10 (older versions)", status: "limited", noteKey: "compatibility.noteOsUpdate" },
  { name: "macOS / Linux", status: "incompatible", noteKey: "compatibility.noteOsNo" },
];

const gamingPlatformsData: {
  name?: string;
  nameKey?: TranslationKey;
  status: string;
  noteKey: TranslationKey;
}[] = [
  { name: "Steam", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Apex Legends", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Fortnite", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Call of Duty", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "The Finals", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Rainbow Six Siege", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Rust", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Arc Raiders", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Destiny", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Delta Force", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "PUBG", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { name: "Battlefield", status: "recommended", noteKey: "compatibility.noteGameAvail" },
  { nameKey: "compatibility.otherPlatforms", status: "limited", noteKey: "compatibility.noteGameSoon" },
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
  const { t } = useLanguage();
  const styles: Record<string, string> = {
    recommended: "bg-green-400/10 text-green-400 border-green-400/20",
    compatible: "bg-violet-tech/10 text-violet-tech border-violet-tech/20",
    limited: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    incompatible: "bg-red-400/10 text-red-400 border-red-400/20",
  };
  const labels: Record<string, TranslationKey> = {
    recommended: "compatibility.statusRecommended",
    compatible: "compatibility.statusCompatible",
    limited: "compatibility.statusLimited",
    incompatible: "compatibility.statusUnsupported",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${styles[status] || ""}`}
    >
      <StatusIcon status={status} />
      {labels[status] ? t(labels[status]) : status}
    </span>
  );
}

export default function Compatibility() {
  const { t } = useLanguage();
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
                {t("compatibility.eyebrow")}
              </span>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
                {t("compatibility.title")}{" "}
                <span className="text-violet-tech neon-text">{t("compatibility.titleAccent")}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("compatibility.subtitle")}
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="hidden lg:block"
            >
              <div className="relative rounded-xl overflow-hidden neon-glow border border-violet-tech/35 bg-dark-elevated/60 aspect-[16/10]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-tech/25 via-transparent to-cyan-500/15" />
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, rgba(123,46,255,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.2), transparent 40%)" }} />
                <div className="relative h-full flex flex-col items-center justify-center gap-5 p-8 text-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl border border-violet-tech/40 bg-violet-tech/15 flex items-center justify-center">
                      <Monitor className="w-7 h-7 text-violet-tech" />
                    </div>
                    <div className="w-14 h-14 rounded-xl border border-violet-tech/40 bg-violet-tech/15 flex items-center justify-center">
                      <Cpu className="w-7 h-7 text-violet-accent" />
                    </div>
                    <div className="w-14 h-14 rounded-xl border border-violet-tech/40 bg-violet-tech/15 flex items-center justify-center">
                      <HardDrive className="w-7 h-7 text-violet-tech" />
                    </div>
                  </div>
                  <div>
                    <p className="font-display font-bold text-xl text-foreground tracking-wide">
                      {t("compatibility.title")} {t("compatibility.titleAccent")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                      {t("compatibility.subtitle")}
                    </p>
                  </div>
                </div>
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
                {t("compatibility.gpuTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("compatibility.gpuSubtitle")}</p>
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
                      {t("compatibility.colGpu")}
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent">
                      {t("compatibility.colCategory")}
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent">
                      {t("compatibility.colStatus")}
                    </th>
                    <th className="text-left px-6 py-4 font-display text-xs font-semibold tracking-wider uppercase text-violet-accent hidden sm:table-cell">
                      {t("compatibility.colNote")}
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
                        {t(gpu.tierKey)}
                      </td>
                      <td className="px-6 py-3.5">
                        <StatusBadge status={gpu.status} />
                      </td>
                      <td className="px-6 py-3.5 text-muted-foreground hidden sm:table-cell">
                        {t(gpu.noteKey)}
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
                {t("compatibility.cpuTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("compatibility.cpuSubtitle")}</p>
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
                <p className="text-xs text-muted-foreground">{t(cpu.tierKey)}</p>
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
                {t("compatibility.gamesTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("compatibility.gamesSubtitle")}</p>
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
            <p className="text-sm text-muted-foreground">{t("compatibility.gamesNote")}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gamingPlatformsData.map((platform, i) => (
              <motion.div
                key={platform.nameKey || platform.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-5 hover:border-violet-tech/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">
                    {platform.nameKey ? t(platform.nameKey) : platform.name}
                  </h4>
                  <StatusBadge status={platform.status} />
                </div>
                <p className="text-xs text-muted-foreground">{t(platform.noteKey)}</p>
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
                {t("compatibility.osTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("compatibility.osSubtitle")}</p>
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
                <p className="text-xs text-muted-foreground">{t(os.noteKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
