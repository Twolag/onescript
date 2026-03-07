/**
 * Home — Neon Circuit Design (Cyberpunk Industriel)
 * Sections: Hero, Produits, Performances, Prix, Support
 * Layout asymétrique, lignes de circuit, accents violet néon
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Zap,
  Cpu,
  Monitor,
  Gamepad2,
  ArrowRight,
  ChevronRight,
  Shield,
  Clock,
  TrendingUp,
  Headphones,
  Check,
  MessageCircle,
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

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/hero-bg-Bq3mdtincwx5DgcV2mHARK.webp";
const AI_ENGINE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/ai-engine-6SKTfecoMvNZP2zUzG7RJC.webp";
const WINDOWS_OPT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/windows-opt-hbtfPZHCAfaAwuw4Ngcm4n.webp";
const SCRIPT_TOOLS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/script-tools-9s4442CUnpqxX9XkT96GRA.webp";

const products = [
  {
    title: t("products.fusionai.title"),
    desc: t("products.fusionai.description"),
    icon: Cpu,
    image: AI_ENGINE,
    price: "80 €",
    priceLabel: t("pricing.aiaimbot"),
    href: "/products",
  },
  {
    title: t("products.windowsopt.title"),
    desc: t("products.windowsopt.description"),
    icon: Monitor,
    image: WINDOWS_OPT,
    price: "10 €",
    priceLabel: t("pricing.windowsopt"),
    href: "/products",
  },
  {
    title: t("products.jitterscript.title"),
    desc: t("products.jitterscript.description"),
    icon: Gamepad2,
    image: SCRIPT_TOOLS,
    price: "2,50 €",
    priceLabel: t("pricing.jitterscript"),
    href: "/products",
  },
];

const stats = [
  { value: "+60", unit: "FPS", labelKey: "stats.fps" },
  { value: "-40", unit: "%", labelKey: "stats.latency" },
  { value: "99", unit: "%", labelKey: "stats.stability" },
  { value: "24/7", unit: "", labelKey: "stats.support" },
];

const pricingPlans = [
  {
    name: t("pricing.windowsopt"),
    price: "10",
    period: "",
    desc: t("pricing.windowsopt_desc"),
    features: [
      t("pricing.windowsopt_feature1"),
      t("pricing.windowsopt_feature2"),
      t("pricing.windowsopt_feature3"),
    ],
    popular: false,
    cta: t("pricing.choose_plan"),
  },
  {
    name: t("pricing.aiaimbot"),
    price: "80",
    period: "",
    desc: t("pricing.aiaimbot_desc"),
    features: [
      t("pricing.aiaimbot_feature1"),
      t("pricing.aiaimbot_feature2"),
      t("pricing.aiaimbot_feature3"),
      t("pricing.aiaimbot_feature4"),
    ],
    popular: true,
    cta: t("pricing.choose_plan"),
  },
  {
    name: t("pricing.jitterscript"),
    price: "2,50",
    period: "à partir de",
    desc: t("pricing.jitterscript_desc"),
    features: [
      t("pricing.jitterscript_feature1"),
      t("pricing.jitterscript_feature2"),
      t("pricing.jitterscript_feature3"),
      t("pricing.jitterscript_feature4"),
      t("pricing.jitterscript_feature5"),
    ],
    popular: false,
    cta: t("pricing.choose_plan"),
  },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,46,255,0.03) 2px, rgba(123,46,255,0.03) 4px)",
            }}
          />
        </div>

        <div className="relative container">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-violet-tech/30 bg-violet-tech/10 text-xs font-body font-medium text-violet-accent tracking-wide"
            >
              <Zap className="w-3 h-3" />
              {t("hero.badge")}
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
            >
              {t('hero.title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <Link href="/purchase?product=ai-engine">
                <Button
                  size="lg"
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                >
                  <Zap className="w-4 h-4" />
                  {t('hero.start')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2"
                >
                  {t('hero.products')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="https://discord.com/invite/cU2kNQxxHu" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('hero.discord')}
                </Button>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative circuit lines */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-tech/30 to-transparent" />
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-12 border-y border-border/30">
        <div className="absolute inset-0 bg-dark-surface/50" />
        <div className="relative container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="text-center lg:text-left"
              >
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-violet-tech neon-text">
                  {stat.value}
                  <span className="text-violet-accent text-xl ml-0.5">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 font-body">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TRIAL SECTION ═══════════════ */}
      <section className="relative py-20 border-y border-violet-tech/20 bg-violet-tech/5">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-tech/20 border border-violet-tech/30 text-[10px] font-bold text-violet-accent tracking-widest uppercase mb-4">
                <Zap className="w-3 h-3" />
                {t("trial.badge")}
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
                {t("trial.title")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("trial.subtitle")}
              </p>
            </motion.div>
            
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <Link href="/trial">
                <Button
                  size="lg"
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-3 px-8 py-7 text-lg"
                >
                  <Gamepad2 className="w-6 h-6" />
                  {t("trial.cta")}
                </Button>
              </Link>
              <p className="text-center text-xs text-muted-foreground mt-4">
                {t("trial.response_time")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCTS SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="container">
          {/* Section header — asymétrique, aligné à gauche */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-16"
          >
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
              {t("solutions.badge")}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              {t("solutions.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("solutions.subtitle")}
            </p>
          </motion.div>

          {/* Product cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <Link href={product.href}>
                  <div className="group relative h-full glass-card rounded-lg overflow-hidden hover:border-violet-tech/40 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-base via-dark-base/40 to-transparent" />
                      {/* Price badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-violet-tech/90 text-xs font-display font-bold text-white">
                        {t(product.priceLabelKey)} {product.price}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
                          <product.icon className="w-4.5 h-4.5 text-violet-tech" />
                        </div>
                        <h3 className="font-display font-bold text-base tracking-wide">
                          {t(product.titleKey)}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {t(product.descKey)}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-tech group-hover:gap-2.5 transition-all duration-200">
                        {t("products.learn_more")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INTERFACE GALLERY SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32 border-t border-border/30">
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-16"
          >
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
              Galerie
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Découvrez l'interface <span className="text-violet-tech">FUSION AI</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Des captures réelles de l'interface en action. Monitoring en temps réel, réglages avancés et résultats impressionnants.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative rounded-lg overflow-hidden glass-card border border-border/30 hover:border-violet-tech/50 transition-all"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/hIzWjvHxAxYbjVmT.png"
                  alt="Dashboard FUSION AI"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-base text-foreground mb-1">Dashboard</h3>
                <p className="text-sm text-muted-foreground">Monitoring en temps réel - FPS: 262, Latence: 3.4ms</p>
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative rounded-lg overflow-hidden glass-card border border-border/30 hover:border-violet-tech/50 transition-all"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/zPMKxwVyhEEnRpVX.png"
                  alt="AI & Visuals FUSION AI"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-base text-foreground mb-1">AI & Visuals</h3>
                <p className="text-sm text-muted-foreground">Réglages avancés du modèle IA et des visuels</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PERFORMANCES SECTION ═══════════════ */}      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dark-surface/30" />
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />

        <div className="relative container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
                Performances
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">
                Chaque milliseconde{" "}
                <span className="text-violet-tech">compte</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Nos outils analysent votre configuration en profondeur et
                appliquent des optimisations ciblées pour maximiser les FPS et
                réduire l'input lag. Compatible NVIDIA RTX 3060 et supérieur.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: TrendingUp,
                    title: "Gain de 40 à 60 FPS",
                    desc: "Selon votre configuration matérielle",
                  },
                  {
                    icon: Clock,
                    title: "Latence réduite de 40%",
                    desc: "Optimisation réseau et système",
                  },
                  {
                    icon: Shield,
                    title: "Stabilité 99%",
                    desc: "Aucun crash, aucun freeze",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i + 1}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-dark-elevated/50 border border-border/30 hover:border-violet-tech/20 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
                      <item.icon className="w-5 h-5 text-violet-tech" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-sm tracking-wide mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — visual */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden neon-glow">
                <img
                  src={AI_ENGINE}
                  alt="AI Performance Engine"
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-base/60 to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-4 sm:left-auto sm:-right-6 glass-card rounded-lg p-4 neon-glow">
                <div className="font-display font-extrabold text-2xl text-violet-tech">
                  +60 FPS
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Gain minimum constaté
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
              Tarifs
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Choisissez votre{" "}
              <span className="text-violet-tech">plan</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Des solutions adaptées à chaque besoin et chaque budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={`relative glass-card rounded-lg p-8 ${
                  plan.popular
                    ? "border-violet-tech/40 ring-1 ring-violet-tech/20"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-violet-tech text-xs font-display font-bold text-white tracking-wider">
                    RECOMMANDÉ
                  </div>
                )}

                <h3 className="font-display font-bold text-base tracking-wide mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.desc}
                </p>

                <div className="mb-6">
                  <span className="font-display font-extrabold text-4xl text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-lg text-muted-foreground ml-1">€</span>
                  {plan.period && (
                    <span className="block text-sm text-muted-foreground mt-1">
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-violet-tech flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={`/purchase?product=${plan.name === 'AI Aimbot' ? 'ai-engine' : plan.name === 'Windows Optimization' ? 'windows-opt' : 'jitter-script'}`}>
                  <Button
                    className={`w-full font-display font-semibold tracking-wider ${
                      plan.popular
                        ? "bg-violet-tech hover:bg-violet-secondary text-primary-foreground neon-glow"
                        : "bg-dark-elevated hover:bg-dark-elevated/80 text-foreground border border-border/50"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SUPPORT CTA SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />

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
                Besoin d'aide ?{" "}
                <span className="text-violet-tech">On est là.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                Notre équipe de support est disponible pour vous accompagner.
                Système de tickets, FAQ complète et documentation détaillée.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/support">
                  <Button
                    size="lg"
                    className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                  >
                    <Headphones className="w-4 h-4" />
                    CONTACTER LE SUPPORT
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider"
                  >
                    VOIR LA FAQ
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
                  { icon: Headphones, label: "Support 24/7" },
                  { icon: Shield, label: "Paiement sécurisé" },
                  { icon: Zap, label: "Installation rapide" },
                  { icon: TrendingUp, label: "Mises à jour" },
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
