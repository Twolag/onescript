/**
 * Documentation — Neon Circuit Design
 * Technical guides, hardware requirements, and V8 update notes
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
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function Documentation() {
  const { t } = useLanguage();

  const installSteps = [
    { step: "01", title: t("documentation.step1Title"), desc: t("documentation.step1Desc") },
    { step: "02", title: t("documentation.step2Title"), desc: t("documentation.step2Desc") },
    { step: "03", title: t("documentation.step3Title"), desc: t("documentation.step3Desc") },
    { step: "04", title: t("documentation.step4Title"), desc: t("documentation.step4Desc") },
  ];

  const features = [
    { title: t("documentation.feature1Title"), desc: t("documentation.feature1Desc"), icon: "🚀" },
    { title: t("documentation.feature2Title"), desc: t("documentation.feature2Desc"), icon: "🔴" },
    { title: t("documentation.feature3Title"), desc: t("documentation.feature3Desc"), icon: "⚡" },
    { title: t("documentation.feature4Title"), desc: t("documentation.feature4Desc"), icon: "🎨" },
  ];

  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-violet-tech" />
            <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-tech">
              {t("documentation.eyebrow")}
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-6">
            {t("documentation.title")}{" "}
            <span className="text-violet-tech">{t("documentation.titleAccent")}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("documentation.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <motion.section
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-xl p-8 border-violet-tech/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-violet-tech" />
                <h2 className="font-display font-bold text-2xl tracking-tight">
                  {t("documentation.whatsNew")}
                </h2>
              </div>
              <div className="space-y-6">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="p-4 rounded-lg bg-violet-tech/5 border border-violet-tech/10"
                  >
                    <h3 className="font-display font-semibold text-violet-accent mb-2">
                      {f.icon} {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-violet-tech" />
                <h2 className="font-display font-bold text-2xl tracking-tight">
                  {t("documentation.hardwareReqs")}
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass-card rounded-lg p-6 border-border/40">
                  <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-violet-tech" /> {t("documentation.gpuTitle")}
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> NVIDIA (RTX 20 / 30 / 40 / 50+)
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> AMD (RX 6600 XT / 6700+ / 7000+)
                    </li>
                  </ul>
                </div>

                <div className="glass-card rounded-lg p-6 border-border/40">
                  <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-violet-tech" /> {t("documentation.platformTitle")}
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Windows 10 / 11 (64-bit)
                    </li>
                    <li className="text-sm text-muted-foreground flex items-center gap-2 font-bold text-violet-accent">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t("documentation.steamOnlyApex")}
                    </li>
                    <li className="text-sm text-red-400 flex items-center gap-2 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" /> {t("documentation.eaNotSupported")}
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-violet-tech" />
                <h2 className="font-display font-bold text-2xl tracking-tight">
                  {t("documentation.installProcess")}
                </h2>
              </div>
              <div className="space-y-4">
                {installSteps.map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-6 p-6 rounded-lg bg-dark-elevated/30 border border-border/30"
                  >
                    <span className="font-display font-black text-3xl text-violet-tech/20 leading-none">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-base mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-xl p-6 border-violet-tech/30 bg-violet-tech/5"
            >
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-violet-tech" /> {t("documentation.securityFirst")}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {t("documentation.securityDesc")}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-violet-accent tracking-widest uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {t("documentation.undetected")}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-xl p-6 border-red-500/30 bg-red-900/10"
            >
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" /> {t("documentation.updatePolicy")}
              </h3>
              <p className="text-xs text-red-200 leading-relaxed">
                {t("documentation.updatePolicyDesc")}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={6}
              initial="hidden"
              animate="visible"
              className="glass-card rounded-xl p-6 border-border/40"
            >
              <h3 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-tech" /> {t("documentation.quickLinks")}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://discord.gg/5btq6znUvN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-muted-foreground hover:text-violet-tech transition-colors"
                >
                  → {t("documentation.joinDiscord")}
                </a>
                <a
                  href="/purchase"
                  className="block text-xs text-muted-foreground hover:text-violet-tech transition-colors"
                >
                  → {t("documentation.viewPlans")}
                </a>
                <a
                  href="https://discord.gg/5btq6znUvN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-muted-foreground hover:text-violet-tech transition-colors"
                >
                  → {t("documentation.reportBug")}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
