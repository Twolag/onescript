/**
 * Products — Neon Circuit Design
 * Detailed presentation: FUSION AI, Windows Optimization, Script Tools
 * Each product: description, compatibility, price, buy button
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

            {title.includes("FUSION AI") && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-sm font-bold text-red-400 tracking-wide uppercase">
                  Important: Apex Legends must be installed on <span className="underline">STEAM</span> only (EA App/Origin not supported)
                </p>
              </div>
            )}

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
                  {expanded ? "Show less" : `+${features.length - 4} features`}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>

            {/* Compatibility */}
            <div className="glass-card rounded-lg p-5 mb-6">
              <h4 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-3">
                Compatibility
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
              <Link href={`/purchase?product=${encodeURIComponent(id)}`}>
                <Button
                  size="lg"
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                >
                  <Zap className="w-4 h-4" />
                  BUY NOW
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

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
              Our Products
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Performance{" "}
              <span className="text-violet-tech neon-text">Tools</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover our solutions designed to transform your gaming experience. Featuring the brand new **FUSION IA V8**.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Product 1: FUSION AI */}
      <ProductSection
        id="fusion-ai"
        title="FUSION IA - V8"
        subtitle="AI Visual Processing"
        description="FUSION IA V8 features an AI Aimbot 10x more powerful with exceptional AMD support (RX 6600 XT+). Completely redesigned architecture for maximum smoothness. Native NVIDIA & AMD compatibility and ultra-low controller latency. Experience a premium interface with real-time synchronization and a cinematic launch intro. Controller Only Support (PS5, Xbox, Gamesir)."       image={AI_ENGINE}
        icon={Cpu}
        features={[
          "New V8 Redesigned Architecture",
          "Native NVIDIA & AMD Compatibility",
          "Ultra-optimized Engine",
          "Ultra-Low Controller Latency ⚡",
          "Premium UI Redesign (Dark Theme)",
          "Native Fullscreen Support (1920x1080)",
          "Integrated Cinematic Video Launch",
          "New Advanced Precise Settings",
          "Real-Time Intelligent Sync",
          "Regular updates included",
        ]}
        compatibility={[
          { label: "NVIDIA GPU", value: "RTX 20 / 30 / 40 / 50+" },
          { label: "AMD GPU", value: "RX 6600 XT / 6700+ / 7000+ (Native)" },
          { label: "Recommended CPU", value: "i5 13th Gen / Ryzen 5 5000+" },
          { label: "Platform", value: "PC (Apex, Fortnite, Warzone)" },
          { label: "OS", value: "Windows 10 / 11" },
        ]}
        pricing={[
          { label: "License only (PDF Guide)", price: "50 €", note: "1 month" },
          { label: "License + installation", price: "80 €", note: "1st month included" },
          { label: "Annual Subscription", price: "250 €", note: "/ year" },
          { label: "Lifetime License", price: "450 €", note: "one-time" },
          { label: "Renewal", price: "30 €", note: "/ month" },
        ]}
        index={0}
      />

      {/* Advanced AI Weight — Apex Legends */}
      <section id="apex-weight" className="relative py-20 lg:py-28">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
        <div className="container">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
                <Zap className="w-5 h-5 text-violet-tech" />
              </div>
              <span className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-tech">
                Apex Legends — [ STABLE / READY ]
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-3">
              Advanced AI Weight
            </h2>

            {/* GPU requirement badge */}
            <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <p className="text-sm font-bold text-amber-300 tracking-wide">
                Requires high-end GPU: <span className="text-amber-200">NVIDIA RTX 4080 / 5070 minimum</span>
              </p>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Unlock the most powerful AI Weight configuration available for Apex Legends. This premium add-on supercharges the targeting precision and AI tracking performance of FUSION IA, leveraging the full computational power of high-end NVIDIA GPUs. Designed exclusively for players who demand the absolute best.
            </p>

            {/* Features */}
            <div className="space-y-2.5 mb-8">
              {[
                "Apex Legends exclusive — STABLE / READY",
                "Dramatically enhanced AI targeting precision",
                "Optimized for NVIDIA RTX 4080 / 5070+",
                "Seamlessly integrates with FUSION IA V8",
                "Instant delivery after payment",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-violet-tech flex-shrink-0" />
                  <span className="text-foreground/80">{f}</span>
                </div>
              ))}
            </div>

            {/* Compatibility */}
            <div className="glass-card rounded-lg p-5 mb-6">
              <h4 className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-3">
                Compatibility
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Game</p>
                  <p className="text-sm font-medium text-foreground">Apex Legends (Steam)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GPU Required</p>
                  <p className="text-sm font-medium text-foreground">NVIDIA RTX 4080 / 5070+</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="text-sm font-medium text-green-400">STABLE / READY</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">OS</p>
                  <p className="text-sm font-medium text-foreground">Windows 10 / 11</p>
                </div>
              </div>
            </div>

            {/* Pricing + CTA */}
            <div className="flex flex-wrap items-end gap-6 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Add-on price</p>
                <p className="font-display font-extrabold text-3xl text-foreground">
                  10 €
                  <span className="text-sm font-normal text-muted-foreground ml-1.5">one-time</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://pay.sumup.com/b2c/QSDE2C71"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow transition-colors">
                  <Zap className="w-4 h-4" />
                  BUY NOW — 10€
                  <ArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product 2: Windows Optimization */}
      <ProductSection
        id="windows-opt"
        title="Windows Optimization"
        subtitle="System Optimization"
        description="Advanced Windows optimization to improve gaming performance. Our tool cleans your system, removes unnecessary services, and optimizes RAM and CPU management for a minimum gain of 40 to 60 FPS."
        image={WINDOWS_OPT}
        icon={Monitor}
        features={[
          "Complete system cleanup",
          "Removal of unnecessary services",
          "RAM optimization",
          "CPU optimization",
          "Input lag reduction",
          "Optimized network configuration",
        ]}
        compatibility={[
          { label: "OS", value: "Windows 10 / 11" },
          { label: "GPU / CPU", value: "All models" },
          { label: "Minimum gain", value: "40-60 FPS" },
          { label: "Platform", value: "PC only" },
        ]}
        pricing={[
          { label: "Simple optimization", price: "20 €" },
          { label: "Optim. + Windows reinstall", price: "40 €" },
        ]}
        reverse
        index={1}
      />

      {/* Product 3: Jitter Script */}
      <ProductSection
        id="jitter-script"
        title="Jitter Script"
        subtitle="Apex, Fortnite & Warzone Anti-Recoil"
        description="The best anti-recoil jitter script for Apex Legends, Fortnite and Warzone on the market. Designed to be undetectable by anti-cheat, it simulates a jitter aim movement to counter your weapons' recoil. Little to no shaking depending on the optics to appear as legitimate as possible, yet very powerful to allow you to destroy your opponents at over 150 meters. Unlike other jitter aims on the market, it does not cut aim assist. Perfect for all FPS games."
        image={SCRIPT_TOOLS}
        icon={Gamepad2}
        features={[
          "Undetectable by anti-cheat",
          "Does not cut aim assist",
          "Integrated Humanizer function",
          "Adjustable from the script interface",
          "Controller only (Xbox / PS)",
          "Very little shaking depending on optics",
          "Precise shots up to 150m+ (600m depending on settings)",
        ]}
        compatibility={[
          { label: "OS", value: "Windows 10 / 11" },
          { label: "GPU / CPU", value: "All models" },
          { label: "Type", value: "Subscription" },
          { label: "Platform", value: "PC (Apex, Fortnite, Warzone)" },
        ]}
        pricing={[
          { label: "1 day", price: "2.50 €" },
          { label: "1 week", price: "5 €" },
          { label: "1 month", price: "15 €" },
          { label: "3 months", price: "20 €" },
          { label: "6 months", price: "25 €" },
          { label: "1 year", price: "30 €" },
          { label: "Lifetime", price: "40 €" },
        ]}
        index={2}
      />
    </div>
  );
}
