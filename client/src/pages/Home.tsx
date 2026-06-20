/**
 * Home — Neon Circuit Design (Industrial Cyberpunk)
 * Sections: Hero, Products, Performance, Pricing, Support
 * Asymmetric layout, circuit lines, neon violet accents
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
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
  Layers,
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
const V7_VIDEO = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663410292855/EkUnSGkfbgRkUXzg.mp4";

const products = [
  {
    title: "FUSION IA - V8",
    desc: "Revolutionary V8 update! AI Aimbot 10x more powerful with exceptional AMD support (RX 6600 XT+). Native NVIDIA & AMD compatibility. Zero FPS drops, ultra-low controller latency, and premium interface. The ultimate AI visual processing engine.",
    icon: Cpu,
    image: AI_ENGINE,
    price: "50 €",
    priceLabel: "license only (PDF guide)",
    href: "/products",
  },
  {
    title: "Windows Optimization",
    desc: "System cleanup, removal of unnecessary services, RAM/CPU optimization. Minimum gain: 40-60 FPS. Essential for maximum smoothness with FUSION IA.",
    icon: Monitor,
    image: WINDOWS_OPT,
    price: "20 €",
    priceLabel: "starting from",
    href: "/products",
  },
  {
    title: "Jitter Script",
    desc: "The best anti-recoil Apex Legends, Fortnite and Warzone jitter script on the market. Undetectable, controller only, does not cut aim assist. Perfect for all FPS games.",
    icon: Gamepad2,
    image: SCRIPT_TOOLS,
    price: "2.50 €",
    priceLabel: "starting from",
    href: "/products",
  },
];

const stats = [
  { value: "V8", unit: "NEW", label: "Architecture" },
  { value: "NVIDIA", unit: "& AMD", label: "Native Support" },
  { value: "24/7", unit: "", label: "Support" },
];

const pricingPlans = [
  {
    name: "Windows Optimization",
    price: "20",
    period: "starting from",
    desc: "Simple Windows optimization",
    features: [
      "Complete system cleanup",
      "Removal of unnecessary services",
      "RAM & CPU optimization",
      "Input lag reduction",
    ],
    popular: false,
    cta: "CHOOSE THIS PLAN",
  },
  {
    name: "AI Aimbot - V8 - Standard",
    price: "50",
    period: "1 month license",
    desc: "PDF Installation Guide included - No remote installation support | AMD & NVIDIA Support | STEAM ONLY",
    features: [
      "New V8 Redesigned Architecture",
      "Native AMD & NVIDIA Support",
      "Apex Legends: STEAM ONLY",
      "Improved Controller Latency ⚡",
      "Zero FPS Drops Guarantee",
      "PDF Setup Guide included",
      "No installation assistance",
    ],
    popular: false,
    cta: "Choose this plan",
  },
  {
    name: "AI Aimbot - V8 - Premium",
    price: "80",
    period: "1st month + inst.",
    desc: "Complete remote installation by our team + 1st month included | AMD & NVIDIA Support | STEAM ONLY",
    features: [
      "New V8 Redesigned Architecture",
      "Native AMD & NVIDIA Support",
      "Apex Legends: STEAM ONLY",
      "Improved Controller Latency ⚡",
      "Full Remote Installation",
      "Renewal: 30 € / month",
    ],
    popular: true,
    cta: "Choose this plan",
  },
  {
    name: "AI Aimbot - V8 - Annual",
    price: "250",
    period: "per year",
    desc: "Annual subscription - Full access to all features for 12 months | AMD & NVIDIA Support",
    features: [
      "V8 Full Access",
      "Native AMD & NVIDIA Support",
      "Improved Controller Latency ⚡",
      "Zero FPS Drops Guarantee",
      "12 months of updates & support",
      "Priority support",
    ],
    popular: true,
    cta: "Choose this plan",
  },
  {
    name: "AI Aimbot - V8 - Lifetime",
    price: "450",
    period: "one-time",
    desc: "Lifetime access - Permanent license with all future updates included | AMD & NVIDIA Support",
    features: [
      "V8 Full Access",
      "Native AMD & NVIDIA Support",
      "Improved Controller Latency ⚡",
      "Zero FPS Drops Guarantee",
      "Lifetime updates & support",
      "Priority support",
    ],
    popular: false,
    cta: "Choose this plan",
  },
  {
    name: "Jitter Script",
    price: "2.50",
    period: "starting from",
    desc: "Anti-recoil jitter aim script for Apex, Fortnite & Warzone — Controller Only | Keyboard & Mouse not supported",
    features: [
      "Undetectable by anti-cheat",
      "Does not cut aim assist",
      "Integrated Humanizer function",
      "Adjustable from the interface",
      "Controller only",
    ],
    popular: false,
    cta: "CHOOSE THIS PLAN",
  },
];

export default function Home() {
  return (
    <>


      <div className="overflow-hidden">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,46,255,0.03) 2px, rgba(123,46,255,0.03) 4px)" }} />
        </div>
        <div className="relative container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl flex-1">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-violet-tech/30 bg-violet-tech/10 text-xs font-body font-medium text-violet-accent tracking-wide">
                <Zap className="w-3 h-3" />
                FUSION IA V8 IS LIVE
              </motion.div>
              <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6">
                Dominate with{" "}<span className="text-violet-tech neon-text">FUSION IA V8</span>
              </motion.h1>
              <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8">
                The most advanced AI visual engine. Now with **Native NVIDIA & AMD support** and ultra-low controller latency. Experience the future of gaming performance.
              </motion.p>
              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
                <Link href="/purchase?product=ai-engine">
                  <Button size="lg" className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2">
                    <Zap className="w-4 h-4" />GET V8 NOW<ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2">
                    VIEW PRODUCTS<ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="https://discord.gg/5btq6znUvN" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2">
                    <MessageCircle className="w-4 h-4" />DISCORD
                  </Button>
                </a>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="w-full lg:w-[700px] aspect-video relative rounded-xl overflow-hidden border border-violet-tech/30 shadow-[0_0_50px_rgba(123,46,255,0.2)]">
              <video 
                src={V7_VIDEO} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-display font-bold text-white tracking-widest uppercase bg-black/50 px-2 py-1 rounded">V8 CINEMATIC LAUNCH</span>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-px bg-gradient-to-r from-transparent via-violet-tech/30 to-transparent" />
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-12 border-y border-border/30">
        <div className="absolute inset-0 bg-dark-surface/50" />
        <div className="relative container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="text-center lg:text-left">
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-violet-tech neon-text">
                  {stat.value}<span className="text-violet-accent text-xl ml-0.5">{stat.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRODUCTS GRID SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="container">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">Our Products</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Performance <span className="text-violet-tech">Tools</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">Everything you need to dominate. From AI aimbots to system optimization.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "fusion-ai",
                title: "FUSION IA - V8",
                subtitle: "AI Visual Processing",
                description: "Revolutionary V8 update with exceptional AMD support. Native NVIDIA & AMD compatibility. Zero FPS drops.",
                icon: Cpu,
                badge: { label: "STABLE / READY", color: "bg-green-500/20 border-green-500/50 text-green-400" },
                features: ["V8 Architecture", "NVIDIA & AMD Support", "Ultra-Low Latency ⚡", "Zero FPS Drops", "Premium UI"],
                price: "50 €",
                priceNote: "starting from",
                cta: "VIEW",
                ctaHref: "/purchase?product=ai-engine",
              },
              {
                id: "apex-weight",
                title: "Advanced AI Weight",
                subtitle: "Apex Legends Add-On",
                description: "Powerful AI Weight add-on for Apex Legends. Supercharges targeting precision. ⚠️ Add-on only. NVIDIA RTX 4080/5070+ or AMD RX 9070 XT+.",
                icon: Zap,
                badge: { label: "ADD-ON ONLY", color: "bg-amber-500/20 border-amber-500/50 text-amber-400" },
                features: ["Apex Exclusive", "Enhanced Targeting", "RTX 4080/5070+ or RX 9070 XT+", "Instant Delivery", "Requires FUSION IA"],
                price: "10 €",
                priceNote: "one-time",
                cta: "BUY",
                ctaHref: "https://pay.sumup.com/b2c/QSDE2C71",
              },
              {
                id: "windows-opt",
                title: "Windows Optimization",
                subtitle: "System Optimization",
                description: "Advanced Windows optimization for gaming performance. Complete cleanup and optimization for 40-60 FPS gain.",
                icon: Monitor,
                badge: { label: "PERFORMANCE", color: "bg-blue-500/20 border-blue-500/50 text-blue-400" },
                features: ["System Cleanup", "Remove Services", "RAM & CPU Opt", "Input Lag Reduction", "40-60 FPS Gain"],
                price: "20 €",
                priceNote: "starting from",
                cta: "VIEW",
                ctaHref: "/purchase?product=windows-opt",
              },
              {
                id: "jitter-script",
                title: "Jitter Script",
                subtitle: "Anti-Recoil for FPS",
                description: "Best anti-recoil jitter script for Apex, Fortnite and Warzone. Undetectable by anti-cheat. Does not cut aim assist.",
                icon: Gamepad2,
                badge: { label: "CONTROLLER ONLY", color: "bg-violet-500/20 border-violet-500/50 text-violet-300" },
                features: ["Undetectable", "No Aim Assist Cut", "Humanizer", "Adjustable", "All FPS Games"],
                price: "2.50 €",
                priceNote: "starting from",
                cta: "VIEW",
                ctaHref: "/purchase?product=jitter-script",
              },
            ].map((product, i) => (
              <motion.div key={product.id} custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="relative group rounded-lg overflow-hidden border border-border/50 hover:border-violet-tech/30 transition-all duration-300 flex flex-col h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-elevated/40 to-dark-base/40" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-tech/0 via-transparent to-violet-tech/0 group-hover:from-violet-tech/5 group-hover:via-violet-tech/2 group-hover:to-violet-tech/5 transition-all duration-300" />
                <div className="relative p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-violet-tech/15 border border-violet-tech/20 flex-shrink-0">
                      <product.icon className="w-5 h-5 text-violet-tech" />
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border whitespace-nowrap ${product.badge.color}`}>
                      {product.badge.label}
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-violet-accent mb-0.5">{product.subtitle}</p>
                    <h3 className="font-display font-extrabold text-lg text-foreground">{product.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                  <div className="space-y-1.5 mb-4 flex-grow">
                    {product.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                        <Check className="w-3 h-3 text-violet-tech flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end justify-between gap-3 pt-3 border-t border-border/20 mt-auto">
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{product.priceNote}</p>
                      <p className="font-display font-extrabold text-xl text-violet-tech">{product.price}</p>
                    </div>
                    {product.ctaHref.startsWith("http") ? (
                      <a href={product.ctaHref} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-1">
                          {product.cta}
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </a>
                    ) : (
                      <Link href={product.ctaHref}>
                        <Button size="sm" className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider gap-1">
                          {product.cta}
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className="mt-12 text-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2">
                VIEW ALL PRODUCTS
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* ═══════════════ PRICING SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="container">
          <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">Pricing</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Choose your <span className="text-violet-tech">plan</span>
            </h2>
            <p className="text-muted-foreground text-lg">Solutions adapted to every need and every budget.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} className={`relative glass-card rounded-lg p-8 ${plan.popular ? "border-violet-tech/40 ring-1 ring-violet-tech/20" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-violet-tech text-xs font-display font-bold text-white tracking-wider">RECOMMENDED</div>
                )}
                <h3 className="font-display font-bold text-base tracking-wide mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="font-display font-extrabold text-4xl text-foreground">{plan.price}</span>
                  <span className="text-lg text-muted-foreground ml-1">€</span>
                  {plan.period && <span className="block text-sm text-muted-foreground mt-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-violet-tech flex-shrink-0" />{feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/purchase?product=${plan.name.includes('AI Aimbot') ? 'ai-engine' : plan.name === 'Windows Optimization' ? 'windows-opt' : 'jitter-script'}`}>
                  <Button className={`w-full font-display font-semibold tracking-wider ${plan.popular ? "bg-violet-tech hover:bg-violet-secondary text-primary-foreground neon-glow" : "bg-dark-elevated hover:bg-dark-elevated/80 text-foreground border border-border/50"}`}>
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
            <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="lg:col-span-3">
              <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">Support</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
                Need help? <span className="text-violet-tech">We're here.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                Our support team is available to assist you. Ticket system, complete FAQ, and detailed documentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/support">
                  <Button size="lg" className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2">
                    <Headphones className="w-4 h-4" />CONTACT SUPPORT
                  </Button>
                </Link>
                <Link href="/support">
                  <Button size="lg" variant="outline" className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider">
                    VIEW FAQ
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Headphones, label: "24/7 Support" },
                  { icon: Shield, label: "Secure Payment" },
                  { icon: Zap, label: "Fast Installation" },
                  { icon: TrendingUp, label: "Updates" },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-lg p-5 text-center hover:border-violet-tech/30 transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-violet-tech mx-auto mb-2" />
                    <p className="text-xs font-body font-medium text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
