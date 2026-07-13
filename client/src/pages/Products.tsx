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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

interface ProductCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: { label: string; color: string };
  features: string[];
  price: string;
  priceNote?: string;
  cta: string;
  ctaHref: string;
  warning?: string;
}

const products: ProductCard[] = [
  {
    id: "fusion-ai",
    title: "FUSION IA - V8.1",
    subtitle: "AI Visual Processing",
    description: "Revolutionary V8.1 update! AI Aimbot 10x more powerful with exceptional AMD support (RX 6600 XT+). Requires Waveshare RP2350A USB Mini Development Board for safe operation. Native NVIDIA & AMD compatibility. Zero FPS drops, ultra-low controller latency.",
    icon: Cpu,
    badge: { label: "PROMO - STABLE / READY", color: "bg-green-500/20 border-green-500/50 text-green-400" },
    features: [
      "V8.1 Redesigned Architecture",
      "Native NVIDIA & AMD Support",
      "Ultra-Low Controller Latency ⚡",
      "Zero FPS Drops Guarantee",
      "Premium UI Redesign",
    ],
    price: "30 €",
    priceNote: "PROMO from",
    cta: "VIEW OPTIONS",
    ctaHref: "/purchase?product=ai-engine",
  },
  {
    id: "apex-weight",
    title: "Advanced AI Weight",
    subtitle: "Apex Legends Add-On",
    description: "Powerful AI Weight add-on for Apex Legends only. Supercharges targeting precision and AI tracking. ⚠️ **Add-on only** — FUSION IA license required separately. NVIDIA RTX 4070/5060+ or AMD RX 7900/9060+ minimum.",
    icon: Zap,
    badge: { label: "ADD-ON ONLY", color: "bg-amber-500/20 border-amber-500/50 text-amber-400" },
    features: [
      "Apex Legends Exclusive",
      "Enhanced AI Targeting",
      "NVIDIA RTX 4070/5060+ or AMD RX 7900/9060+",
      "Instant Delivery",
      "Requires FUSION IA License",
    ],
    price: "10 €",
    priceNote: "one-time",
    cta: "BUY NOW",
    ctaHref: "https://pay.sumup.com/b2c/QSDE2C71",
    warning: "Add-on only. FUSION IA license required. GPU: NVIDIA RTX 4070/5060+ or AMD RX 7900/9060+ minimum.",
  },
  {
    id: "windows-opt",
    title: "Windows Optimization",
    subtitle: "System Optimization",
    description: "Advanced Windows optimization to improve gaming performance. Complete system cleanup, removal of unnecessary services, and optimizes RAM and CPU management for 40-60 FPS gain.",
    icon: Monitor,
    badge: { label: "PERFORMANCE", color: "bg-blue-500/20 border-blue-500/50 text-blue-400" },
    features: [
      "Complete System Cleanup",
      "Remove Unnecessary Services",
      "RAM & CPU Optimization",
      "Input Lag Reduction",
      "40-60 FPS Minimum Gain",
    ],
    price: "20 €",
    priceNote: "starting from",
    cta: "VIEW OPTIONS",
    ctaHref: "/purchase?product=windows-opt",
  },
  {
    id: "jitter-script",
    title: "Jitter Script",
    subtitle: "Anti-Recoil for FPS Games",
    description: "The best anti-recoil jitter script for Apex Legends, Fortnite and Warzone. Undetectable by anti-cheat, does not cut aim assist. Precise shots up to 150m+ with minimal shaking.",
    icon: Gamepad2,
    badge: { label: "CONTROLLER ONLY", color: "bg-violet-500/20 border-violet-500/50 text-violet-300" },
    features: [
      "Undetectable by Anti-Cheat",
      "Does Not Cut Aim Assist",
      "Integrated Humanizer",
      "Adjustable Settings",
      "Works with All FPS Games",
    ],
    price: "2.50 €",
    priceNote: "starting from",
    cta: "VIEW OPTIONS",
    ctaHref: "/purchase?product=jitter-script",
  },
];

function ProductCardComponent({
  id,
  title,
  subtitle,
  description,
  icon: Icon,
  badge,
  features,
  price,
  priceNote,
  cta,
  ctaHref,
  warning,
  index,
}: ProductCard & { index: number }) {
  const isExternal = ctaHref.startsWith("http");

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative group rounded-lg overflow-hidden border border-border/50 hover:border-violet-tech/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated/40 to-dark-base/40" />

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-tech/0 via-transparent to-violet-tech/0 group-hover:from-violet-tech/5 group-hover:via-violet-tech/2 group-hover:to-violet-tech/5 transition-all duration-300" />

      {/* Content */}
      <div className="relative p-6 h-full flex flex-col">
        {/* Header: Icon + Badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-violet-tech/15 border border-violet-tech/20 flex-shrink-0">
            <Icon className="w-6 h-6 text-violet-tech" />
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border whitespace-nowrap ${badge.color}`}>
            {badge.label}
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-3">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-1">
            {subtitle}
          </p>
          <h3 className="font-display font-extrabold text-xl text-foreground">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        {/* Warning for add-on */}
        {warning && (
          <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 flex gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200/90">{warning}</p>
          </div>
        )}

        {/* Features */}
        <div className="space-y-2 mb-6 flex-grow">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-xs text-foreground/80">
              <Check className="w-3.5 h-3.5 text-violet-tech flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Footer: Price + CTA */}
        <div className="flex items-end justify-between gap-4 pt-4 border-t border-border/20 mt-auto">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{priceNote || "Price"}</p>
            {id === "fusion-ai" && (
              <div className="mb-1">
                <span className="text-sm text-red-400 line-through font-semibold">50€</span>
                <span className="text-red-500 font-bold text-xs ml-2">PROMO</span>
              </div>
            )}
            <p className={`font-display font-extrabold text-2xl ${id === "fusion-ai" ? "text-red-500" : "text-violet-tech"}`}>
              {price}
            </p>
          </div>

          {isExternal ? (
            <a href={ctaHref} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-1.5"
              >
                {cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          ) : (
            <Link href={ctaHref}>
              <Button
                size="sm"
                className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-1.5"
              >
                {cta}
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
              Discover our solutions designed to transform your gaming experience. Featuring the brand new **FUSION IA V8** and exclusive add-ons.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Products Grid */}
      <section className="relative py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <ProductCardComponent key={product.id} {...product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to <span className="text-violet-tech">level up</span>?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Choose your product and start your journey to gaming excellence. All purchases include 24/7 support and regular updates.
            </p>
            <Link href="/purchase">
              <Button
                size="lg"
                className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
              >
                <Zap className="w-4 h-4" />
                START SHOPPING
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
