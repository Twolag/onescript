/**
 * Products — Neon Circuit Design
 * Présentation détaillée : FUSION AI, Windows Optimization, Script Tools
 * Chaque produit : description, compatibilité, prix, bouton achat
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Cpu,
  Monitor,
  Gamepad2,
  Zap,
  Check,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const AI_ENGINE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/ai-engine-6SKTfecoMvNZP2zUzG7RJC.webp";
const WINDOWS_OPT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/windows-opt-hbtfPZHCAfaAwuw4Ngcm4n.webp";
const SCRIPT_TOOLS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/script-tools-9s4442CUnpqxX9XkT96GRA.webp";

interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  features: string[];
  compatibility: { label: string; value: string }[];
  pricing: { label: string; price: string; note?: string }[];
  reverse?: boolean;
  index: number;
}

function ProductSection({
  id,
  title,
  subtitle,
  description,
  image,
  icon: Icon,
  features,
  compatibility,
  pricing,
  reverse,
  index,
}: ProductSectionProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <section id={id} className="relative py-20 lg:py-28">
      {index > 0 && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      )}

      <div className="container">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:direction-rtl" : ""
          }`}
          style={reverse ? { direction: "rtl" } : undefined}
        >
          {/* Image */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{ direction: "ltr" }}
          >
            <div className="relative rounded-lg overflow-hidden neon-glow">
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-base/40 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            style={{ direction: "ltr" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
                <Icon className="w-5 h-5 text-violet-tech" />
              </div>
              <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-tech">
                {t(subtitle)}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
              {t(title)}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t(description)}
            </p>

            {/* Features */}
            <div className="space-y-2.5 mb-8">
              {features.slice(0, expanded ? features.length : 4).map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-violet-tech flex-shrink-0" />
                  <span className="text-foreground/80">{t(f)}</span>
                </div>
              ))}
              {features.length > 4 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1.5 text-xs text-violet-tech hover:text-violet-accent transition-colors mt-2"
                >
                  {expanded ? t("products.view_less") : t("products.view_more", { count: features.length - 4 })}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            {/* Compatibility */}
            <div className="glass-card rounded-lg p-5 mb-6">
              <h4 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-3">
                {t("products.compatibility_title")}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {compatibility.map((c) => (
                  <div key={c.label}>
                    <p className="text-xs text-muted-foreground">{t(c.label)}</p>
                    <p className="text-sm font-medium text-foreground">{c.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
              {pricing.map((p) => (
                <div key={p.label} className="flex-shrink-0">
                  <p className="text-xs text-muted-foreground mb-0.5">{t(p.label)}</p>
                  <p className="font-display font-extrabold text-2xl text-foreground">
                    {p.price}
                    {p.note && (
                      <span className="text-sm font-normal text-muted-foreground ml-1.5">
                        {p.note}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={`/purchase?product=${encodeURIComponent(id)}`}>
                <Button
                  size="lg"
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                >
                  <Zap className="w-4 h-4" />
                  {t("products.buy_now")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {title === "FUSION AI" && (
                <Link href="/trial">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    {t("products.book_trial")}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Products() {
  return (
    <div>
      {/* Page header */}
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
              {t("products_page.badge")}
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              {t("products_page.title")}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("products_page.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Product 1: FUSION AI */}
      <ProductSection
        id="fusion-ai"
        title="products.fusionai.title"
        subtitle="products.fusionai.subtitle"
        description="products.fusionai.description"
        image={AI_ENGINE}
        icon={Cpu}
        features={[
          "products.fusionai.feature1",
          "products.fusionai.feature2",
          "products.fusionai.feature3",
          "products.fusionai.feature4",
          "products.fusionai.feature5",
          "products.fusionai.feature6",
          "products.fusionai.feature7",
        ]}
        compatibility={[
          { label: "products.fusionai.compat1_label", value: "RTX 3060 / 3070 / 4060" },
          { label: "products.fusionai.compat2_label", value: "RTX 4070 / 5060+" },
          { label: "products.fusionai.compat3_label", value: "i5 13600K / Ryzen 5 5600X" },
          { label: "products.windowsopt.compat1_label", value: "Windows 10 / 11" }
        ]}
        pricing={[
          { label: "products.fusionai.price1_label", price: "80 €", note: "products.fusionai.price1_note" },
          { label: "products.fusionai.price2_label", price: "30 €", note: "products.fusionai.price2_note" },
        ]}
        index={0}
      />

      {/* Product 2: Windows Optimization */}
      <ProductSection
        id="windows-opt"
        title={t("products.windowsopt.title")}
        subtitle={t("products.windowsopt.subtitle")}
        description={t("products.windowsopt.description")}
        image={WINDOWS_OPT}
        icon={Monitor}
        features={[
          t("products.windowsopt.feature1"),
          t("products.windowsopt.feature2"),
          t("products.windowsopt.feature3"),
          t("products.windowsopt.feature4"),
          t("products.windowsopt.feature5"),
          t("products.windowsopt.feature6"),
        ]}
        compatibility={[
          { label: t("products.windowsopt.compat1_label"), value: "Windows 10 / 11" },
          { label: t("products.windowsopt.compat2_label"), value: "Tous modèles" },
          { label: t("products.windowsopt.compat3_label"), value: "40-60 FPS" },
          { label: t("products.windowsopt.compat4_label"), value: "PC uniquement" },
        ]}
        pricing={[
          { label: t("products.windowsopt.price1_label"), price: "10 €" },,
          { label: t("products.windowsopt.price2_label"), price: "20 €" }
        ]}
        reverse
        index={1}
      />

      {/* Product 3: Jitter Script */}
      <ProductSection
        id="jitter-script"
        title="products.jitter.title"
        subtitle="products.jitter.subtitle"
        description="products.jitter.description"
        image={SCRIPT_TOOLS}
        icon={Gamepad2}
        features={[
          "products.jitter.feature1",
          "products.jitter.feature2",
          "products.jitter.feature3",
          "products.jitter.feature4",
          "products.jitter.feature5",
          "products.jitter.feature6",
          "products.jitter.feature7",
        ]}
        compatibility={[
          { label: "products.windowsopt.compat1_label", value: "Windows 10 / 11" }
          { label: "products.windowsopt.compat2_label", value: "Tous modèles" }
          { label: "products.jitter.compat3_label", value: "Abonnement" },
          { label: "products.jitter.compat4_label", value: "PC — manette uniquement" },
        ]}
        pricing={[
          { label: "products.jitter.price1_label", price: "2,50 €" },
          { label: "products.jitter.price2_label", price: "5 €" },
          { label: "products.jitter.price3_label", price: "15 €" },
          { label: "products.jitter.price4_label", price: "20 €" },
          { label: "products.jitter.price5_label", price: "25 €" },
          { label: "products.jitter.price6_label", price: "30 €" },
          { label: "products.jitter.price7_label", price: "40 €" },
        ]}
        index={2}
      />
    </div>
  );
}
