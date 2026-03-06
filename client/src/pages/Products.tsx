/**
 * Products — Neon Circuit Design
 * Présentation détaillée : FUSION AI, Windows Optimization, Script Tools
 * Chaque produit : description, compatibilité, prix, bouton achat
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
                {subtitle}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
              {title}
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Features */}
            <div className="space-y-2.5 mb-8">
              {features.slice(0, expanded ? features.length : 4).map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-violet-tech flex-shrink-0" />
                  <span className="text-foreground/80">{f}</span>
                </div>
              ))}
              {features.length > 4 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1.5 text-xs text-violet-tech hover:text-violet-accent transition-colors mt-2"
                >
                  {expanded ? "Voir moins" : `+${features.length - 4} fonctionnalités`}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            {/* Compatibility */}
            <div className="glass-card rounded-lg p-5 mb-6">
              <h4 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-3">
                Compatibilité
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {compatibility.map((c) => (
                  <div key={c.label}>
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-medium text-foreground">{c.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex flex-wrap items-end gap-4 mb-6">
              {pricing.map((p) => (
                <div key={p.label} className="flex-shrink-0">
                  <p className="text-xs text-muted-foreground mb-0.5">{p.label}</p>
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
              <Link href="/purchase">
                <Button
                  size="lg"
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                >
                  <Zap className="w-4 h-4" />
                  ACHETER MAINTENANT
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
                    RÉSERVER UN ESSAI
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
              Nos Produits
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Outils de{" "}
              <span className="text-violet-tech neon-text">performance</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Découvrez nos trois solutions conçues pour transformer votre
              expérience gaming et optimiser votre PC Windows.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Product 1: FUSION AI */}
      <ProductSection
        id="fusion-ai"
        title="FUSION AI"
        subtitle="Traitement Visuel IA"
        description="FUSION AI est une solution 100% logicielle basée sur la vision par ordinateur et le traitement IA en temps réel. Les performances ne sont pas plafonnées — elles évoluent directement avec votre matériel. Plus votre PC est puissant, plus le moteur IA est rapide, fluide et précis. Aucun périphérique externe requis (PAS DE ZEN, PAS DE XIM, PAS DE TITAN, PAS DE DMA)."
        image={AI_ENGINE}
        icon={Cpu}
        features={[
          "Traitement visuel IA en temps réel",
          "100% logiciel — aucun périphérique externe",
          "Performances qui évoluent avec votre matériel",
          "Vision par ordinateur avancée",
          "Fluidité et réactivité adaptatives",
          "Compatible NVIDIA RTX uniquement",
          "Mises à jour régulières incluses",
        ]}
        compatibility={[
          { label: "GPU Mid Range", value: "RTX 3060 / 3070 / 4060" },
          { label: "GPU High End", value: "RTX 4070 / 5060+" },
          { label: "CPU recommandé", value: "i5 13600K / Ryzen 5 5600X" },
          { label: "OS", value: "Windows 10 / 11" },
        ]}
        pricing={[
          { label: "Licence + installation", price: "80 €", note: "1er mois inclus" },
          { label: "Renouvellement", price: "30 €", note: "/ mois" },
        ]}
        index={0}
      />

      {/* Product 2: Windows Optimization */}
      <ProductSection
        id="windows-opt"
        title="Windows Optimization"
        subtitle="Optimisation Système"
        description="Optimisation avancée de Windows pour améliorer les performances gaming. Notre outil nettoie votre système, supprime les services inutiles et optimise la gestion de la RAM et du CPU pour un gain minimum de 40 à 60 FPS."
        image={WINDOWS_OPT}
        icon={Monitor}
        features={[
          "Nettoyage système complet",
          "Suppression des services inutiles",
          "Optimisation RAM",
          "Optimisation CPU",
          "Réduction de l'input lag",
          "Configuration réseau optimisée",
        ]}
        compatibility={[
          { label: "OS", value: "Windows 10 / 11" },
          { label: "GPU / CPU", value: "Tous modèles" },
          { label: "Gain minimum", value: "40-60 FPS" },
          { label: "Plateforme", value: "PC uniquement" },
        ]}
        pricing={[
          { label: "Optimisation simple", price: "10 €" },
          { label: "Optim. + réinstall. Windows", price: "20 €" },
        ]}
        reverse
        index={1}
      />

      {/* Product 3: Jitter Script */}
      <ProductSection
        id="jitter-script"
        title="Jitter Script"
        subtitle="Anti-Recul"
        description="Le meilleur script jitter du marché. Conçu pour être indétectable par l'anti-cheat, il simule un mouvement de jitter aim pour contrer le recul de vos armes. Pas ou très peu de tremblements selon l'optique pour paraître légitime au possible, mais néanmoins très puissant pour vous permettre de détruire vos adversaires à plus de 150 mètres. Tirs précis à 600 mètres selon réglage (fortement déconseillé). Contrairement aux autres jitter aim du marché, il ne coupe pas l'aim assist."
        image={SCRIPT_TOOLS}
        icon={Gamepad2}
        features={[
          "Indétectable par l'anti-cheat",
          "Ne coupe pas l'aim assist",
          "Fonction Humanizer intégrée",
          "Réglable depuis l'interface du script",
          "Manette uniquement (Xbox / PS)",
          "Très peu de tremblements selon l'optique",
          "Tirs précis jusqu'à 150m+ (600m selon réglage)",
        ]}
        compatibility={[
          { label: "OS", value: "Windows 10 / 11" },
          { label: "GPU / CPU", value: "Tous modèles" },
          { label: "Type", value: "Abonnement" },
          { label: "Plateforme", value: "PC — manette uniquement" },
        ]}
        pricing={[
          { label: "Essai 24h", price: "2,50 €" },
          { label: "1 semaine", price: "5 €" },
          { label: "1 mois", price: "15 €" },
          { label: "3 mois", price: "20 €" },
          { label: "6 mois", price: "25 €" },
          { label: "1 an", price: "30 €" },
          { label: "À vie", price: "40 €" },
        ]}
        index={2}
      />
    </div>
  );
}
