/**
 * Products — Uniform Grid Card Design
 * All products displayed as equal-sized elegant cards in a responsive grid
 * Each card: icon, title, description, badges, features, price, CTA
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Cpu,
  Monitor,
  Gamepad2,
  Zap,
  Check,
  ArrowRight,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, type TranslationKey } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

interface ProductDef {
  id: string;
  icon: React.ElementType;
  badgeKey: TranslationKey;
  badgeColor: string;
  subtitleKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  featureKeys: TranslationKey[];
  price: string;
  priceNoteKey: TranslationKey;
  ctaHref: string;
  warningKey?: TranslationKey;
}

const productDefs: ProductDef[] = [
  {
    id: "fusion-ai",
    icon: Cpu,
    badgeKey: "products.fusionBadge",
    badgeColor: "bg-green-500/20 border-green-500/50 text-green-400",
    subtitleKey: "products.fusionSubtitle",
    titleKey: "products.fusionTitle",
    descKey: "products.fusionDesc",
    featureKeys: [
      "products.fusionF1",
      "products.fusionF2",
      "products.fusionF3",
      "products.fusionF4",
      "products.fusionF5",
    ],
    price: "15 €",
    priceNoteKey: "products.from",
    ctaHref: "/purchase?product=ai-engine",
  },
  {
    id: "ai-weight",
    icon: Zap,
    badgeKey: "products.weightBadge",
    badgeColor: "bg-amber-500/20 border-amber-500/50 text-amber-400",
    subtitleKey: "products.weightSubtitle",
    titleKey: "products.weightTitle",
    descKey: "products.weightDesc",
    featureKeys: [
      "products.weightF1",
      "products.weightF2",
      "products.weightF3",
      "products.weightF4",
      "products.weightF5",
    ],
    price: "10 €",
    priceNoteKey: "products.oneTime",
    ctaHref: "/purchase?product=ai-engine",
    warningKey: "products.weightWarning",
  },
  {
    id: "windows-opt",
    icon: Monitor,
    badgeKey: "products.winBadge",
    badgeColor: "bg-blue-500/20 border-blue-500/50 text-blue-400",
    subtitleKey: "products.winSubtitle",
    titleKey: "products.winTitle",
    descKey: "products.winDesc",
    featureKeys: [
      "products.winF1",
      "products.winF2",
      "products.winF3",
      "products.winF4",
      "products.winF5",
    ],
    price: "20 €",
    priceNoteKey: "products.startingFrom",
    ctaHref: "/purchase?product=windows-opt",
  },
  {
    id: "jitter-script",
    icon: Gamepad2,
    badgeKey: "products.jitterBadge",
    badgeColor: "bg-violet-500/20 border-violet-500/50 text-violet-300",
    subtitleKey: "products.jitterSubtitle",
    titleKey: "products.jitterTitle",
    descKey: "products.jitterDesc",
    featureKeys: [
      "products.jitterF1",
      "products.jitterF2",
      "products.jitterF3",
      "products.jitterF4",
      "products.jitterF5",
    ],
    price: "2.50 €",
    priceNoteKey: "products.startingFrom",
    ctaHref: "/purchase?product=jitter-script",
  },
];

function ProductCardComponent({
  def,
  index,
}: {
  def: ProductDef;
  index: number;
}) {
  const { t } = useLanguage();
  const Icon = def.icon;
  const isExternal = def.ctaHref.startsWith("http");
  const features = def.featureKeys.map((k) => t(k));

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative group rounded-lg overflow-hidden border border-border/50 hover:border-violet-tech/30 transition-all duration-300 flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated/40 to-dark-base/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-tech/0 via-transparent to-violet-tech/0 group-hover:from-violet-tech/5 group-hover:via-violet-tech/2 group-hover:to-violet-tech/5 transition-all duration-300" />

      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-violet-tech/15 border border-violet-tech/20 flex-shrink-0">
            <Icon className="w-6 h-6 text-violet-tech" />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border whitespace-nowrap ${def.badgeColor}`}>
            {t(def.badgeKey)}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-1">
            {t(def.subtitleKey)}
          </p>
          <h3 className="font-display font-extrabold text-xl text-foreground">
            {t(def.titleKey)}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {t(def.descKey)}
        </p>

        {def.warningKey && (
          <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90">{t(def.warningKey)}</p>
          </div>
        )}

        <div className="space-y-2 mb-6 flex-grow">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-foreground/80">
              <Check className="w-3.5 h-3.5 text-violet-tech flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between gap-4 pt-4 border-t border-border/20 mt-auto">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t(def.priceNoteKey)}</p>
            <p className="font-display font-extrabold text-2xl text-violet-tech">
              {def.price}
            </p>
          </div>

          {isExternal ? (
            <a href={def.ctaHref} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-1.5"
              >
                {t("products.viewOptions")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          ) : (
            <Link href={def.ctaHref}>
              <Button
                size="sm"
                className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-1.5"
              >
                {t("products.viewOptions")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const { t } = useLanguage();
  return (
    <div>
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
              {t("products.eyebrow")}
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              {t("products.title")}{" "}
              <span className="text-violet-tech neon-text">{t("products.titleAccent")}</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("products.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      <section className="relative py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productDefs.map((def, idx) => (
              <ProductCardComponent key={def.id} def={def} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
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
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
              {t("products.ctaTitle")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("products.ctaSubtitle")}
            </p>
            <Link href="/purchase">
              <Button
                size="lg"
                className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
              >
                <Zap className="w-4 h-4" />
                {t("products.buyNow")}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
