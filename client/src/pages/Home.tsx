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
    title: "FUSION AI - V7 (BETA)",
    desc: "Real-time AI visual processing. Panic Button (Streamer Mode), Profile Keybinds, 100% Customizable Triggers. Advanced interface, improved stability. 100% software, no external hardware required.",
    icon: Cpu,
    image: AI_ENGINE,
    price: "80 €",
    priceLabel: "license + installation",
    href: "/products",
  },
  {
    title: "Windows Optimization",
    desc: "System cleanup, removal of unnecessary services, RAM/CPU optimization. Minimum gain: 40-60 FPS.",
    icon: Monitor,
    image: WINDOWS_OPT,
    price: "20 €",
    priceLabel: "starting from",
    href: "/products",
  },
  {
    title: "Jitter Script",
    desc: "The best anti-recoil Apex Legends jitter script on the market. Undetectable, controller only, does not cut aim assist. Perfect for Warzone and all FPS games.",
    icon: Gamepad2,
    image: SCRIPT_TOOLS,
    price: "2.50 €",
    priceLabel: "starting from",
    href: "/products",
  },
];

const stats = [
  { value: "+60", unit: "FPS", label: "Minimum gain" },
  { value: "-40", unit: "%", label: "Reduced latency" },
  { value: "99", unit: "%", label: "Stability" },
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
    name: "AI Aimbot - V7 (BETA) - Monthly",
    price: "80",
    period: "1st month + inst.",
    desc: "Complete installation + 1st month included - New interface, Panic Button, Profile Keybinds | Controller Only",
    features: [
      "Real-time AI visual processing",
      "Panic Button (Streamer Mode) - 100% invisible",
      "Profile Keybinds - Change config mid-match",
      "100% Customizable Triggers",
      "Renewal: 30 € / month",
      "Priority support",
    ],
    popular: false,
    cta: "Choose this plan",
  },
  {
    name: "AI Aimbot - V7 (BETA) - Annual",
    price: "250",
    period: "per year",
    desc: "Annual subscription - Full access to all features for 12 months | Coming Soon - On Request Only | Controller Only",
    features: [
      "Real-time AI visual processing",
      "Panic Button (Streamer Mode) - 100% invisible",
      "Profile Keybinds - Change config mid-match",
      "100% Customizable Triggers",
      "12 months of updates & support",
      "Priority support",
    ],
    popular: true,
    cta: "Choose this plan",
  },
  {
    name: "AI Aimbot - V7 (BETA) - Lifetime",
    price: "450",
    period: "one-time",
    desc: "Lifetime access - Permanent license with all future updates included | Coming Soon - On Request Only | Controller Only",
    features: [
      "Real-time AI visual processing",
      "Panic Button (Streamer Mode) - 100% invisible",
      "Profile Keybinds - Change config mid-match",
      "100% Customizable Triggers",
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
    desc: "Anti-recoil jitter aim script — Controller Only | Keyboard & Mouse not supported",
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
          <div className="flex items-center justify-between gap-8">
            <div className="max-w-2xl flex-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-violet-tech/30 bg-violet-tech/10 text-xs font-body font-medium text-violet-accent tracking-wide"
            >
              <Zap className="w-3 h-3" />
              PC GAMING PERFORMANCE
            </motion.div>

            {/* Title */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6"
            >
              Unlock Your PC's{" "}
              <span className="text-violet-tech neon-text">
                True Performance
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              OneScript optimizes your PC for gaming. Apex Legends Jitter Script, AI Aimbot, Windows Optimization. More FPS, less latency, maximum stability. Compatible with Windows 10 & 11.
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
                  GET STARTED
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider gap-2"
                >
                  VIEW PRODUCTS
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
                  DISCORD
                </Button>
              </a>
            </motion.div>
            </div>{/* end text col */}

            {/* Robot image — right column */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex flex-shrink-0 items-center justify-center relative"
              style={{ width: '420px', height: '480px' }}
            >
              {/* Glow behind the robot */}
              <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(123,46,255,0.35) 0%, rgba(123,46,255,0.1) 50%, transparent 75%)' }} />
              <img
                src="/hero-robot.png"
                alt="FUSION AI"
                className="relative z-10 w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 0 32px rgba(123,46,255,0.6)) drop-shadow(0 0 8px rgba(255,50,50,0.4))' }}
              />
            </motion.div>

          </div>{/* end flex row */}
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
                  {stat.label}
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
                Limited Offer
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
                Test the <span className="text-violet-tech">Jitter Script</span> for 24h
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Experience the power of our anti-recoil script for only 2.50€. 
                Undetectable, easy to configure, and compatible with all your favorite FPS games.
              </p>
              <Link href="/purchase?product=jitter-script">
                <Button className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2">
                  START TRIAL
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full max-w-md"
            >
              <div className="glass-card p-8 rounded-xl border-violet-tech/30 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-violet-tech/10 text-violet-tech">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Jitter Script</h3>
                    <p className="text-sm text-muted-foreground">24h Access</p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  {[
                    "Anti-recoil Jitter Aim",
                    "Undetectable by Anti-cheat",
                    "Controller Only",
                    "Instant Activation",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-violet-tech" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-display font-extrabold text-violet-tech">2.50€</span>
                  <span className="text-sm text-muted-foreground mb-1">/ 24h</span>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-violet-tech/20 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PERFORMANCE SECTION ═══════════════ */}
      <section className="relative py-24 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
                Performance
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
                Dominate the <span className="text-violet-tech">Competition</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our solutions are designed to give you a decisive advantage. 
                Whether through AI visual processing or deep system optimization, 
                we push the limits of what your PC can do.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Clock,
                    title: "Low Latency",
                    desc: "Optimized for minimum input lag",
                  },
                  {
                    icon: TrendingUp,
                    title: "FPS Boost",
                    desc: "Gain up to 60 FPS on average",
                  },
                  {
                    icon: Shield,
                    title: "99% Stability",
                    desc: "No crashes, no freezes",
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
                  Minimum observed gain
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
              Pricing
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
              Choose your <span className="text-violet-tech">plan</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Solutions adapted to every need and every budget.
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
                    RECOMMENDED
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

                <Link href={`/purchase?product=${plan.name === 'AI Aimbot - V7 (BETA)' ? 'ai-engine' : plan.name === 'Windows Optimization' ? 'windows-opt' : 'jitter-script'}`}>
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
                Need help? <span className="text-violet-tech">We're here.</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                Our support team is available to assist you. 
                Ticket system, complete FAQ, and detailed documentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/support">
                  <Button
                    size="lg"
                    className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                  >
                    <Headphones className="w-4 h-4" />
                    CONTACT SUPPORT
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider"
                  >
                    VIEW FAQ
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
                  { icon: Headphones, label: "24/7 Support" },
                  { icon: Shield, label: "Secure Payment" },
                  { icon: Zap, label: "Fast Installation" },
                  { icon: TrendingUp, label: "Updates" },
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
