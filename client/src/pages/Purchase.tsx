/*
 * Purchase — Neon Circuit Design
 * Product selection, summary, PayPal + SumUp + Bunq
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Cpu, Monitor, Gamepad2, Check, Shield, Lock, AlertCircle,
  MessageCircle, CreditCard, Clock, Zap, Layers, RefreshCw, Keyboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";

const PAYPAL_BASE = "https://www.paypal.me/OneLagTT";
const DISCORD_LINK = "https://discord.gg/5btq6znUvN";

// SumUp links by product/option (key = "productId-index")
const SUMUP_LINKS: { [key: string]: string } = {
  // Weekly options (ai-engine)
  "ai-engine-0": "https://pay.sumup.com/b2c/QIRQ5PGQ",   // 25€ — 1 Week (Setup + Support + License)
  "ai-engine-1": "https://pay.sumup.com/b2c/QGABTUR4",   // 15€ — 1 Week (License Only)
  "ai-engine-2": "https://pay.sumup.com/b2c/QE6ELXGY",   // 10€ — Weekly Renewal
  "ai-engine-3": "https://pay.sumup.com/b2c/QB47RTCH",   // 40€ — Monthly (License only)
  "ai-engine-4": "https://pay.sumup.com/b2c/QHGCYM41",   // 60€ — Monthly (License + Inst.)
  "ai-engine-5": "https://pay.sumup.com/b2c/QGLYU0B6",   // 30€ — Help Installation (PDF users)
  "ai-engine-6": "https://pay.sumup.com/b2c/QLFZP85D",   // Annual (150€)
  "ai-engine-7": "https://pay.sumup.com/b2c/QQVC1R0U",   // Lifetime (250€)
  "ai-engine-8": "https://pay.sumup.com/b2c/QZKAONRN",   // 30.80€ — Monthly Renewal
  "ai-engine-9": "https://pay.sumup.com/b2c/QSDE2C71",   // 10€ — Advanced AI Weight (Apex Legends)
  "ai-engine-10": "https://pay.sumup.com/b2c/QSDE2C71",  // 10€ — Advanced AI Weight (Fortnite)
  "windows-opt-0": "https://pay.sumup.com/b2c/QYOO0CVP", // 20.50€
  "windows-opt-1": "https://pay.sumup.com/b2c/QEVOX3BQ", // 41.00€
  "jitter-script-0": "https://pay.sumup.com/b2c/QONAKRTU", // 2.50€ — 1 day
  "jitter-script-1": "https://pay.sumup.com/b2c/QLKSKZZV", // 5.20€  — 1 week
  "jitter-script-2": "https://pay.sumup.com/b2c/Q8GDNO7G", // 15.50€ — 1 month
  "jitter-script-3": "https://pay.sumup.com/b2c/QVOOAVWS", // 20.50€ — 3 months
  "jitter-script-4": "https://pay.sumup.com/b2c/QEXQZ0WH", // 25.70€ — 6 months
  "jitter-script-5": "https://pay.sumup.com/b2c/QB46JT9F", // 30.80€ — 1 year
  "jitter-script-6": "https://pay.sumup.com/b2c/QRLHHGQ2", // 41.00€ — Lifetime
};

// PROMO SUMUP LINKS (Annual & Lifetime with grade discounts)
const PROMO_SUMUP_LINKS: { [key: string]: string } = {
  // Annual (ai-engine-2) with promo
  "ai-engine-2-not-client": "https://pay.sumup.com/b2c/QG7I32HW",      // 235.75€
  "ai-engine-2-already-client": "https://pay.sumup.com/b2c/Q8Y6HE6N",  // 215.25€
  "ai-engine-2-vip": "https://pay.sumup.com/b2c/QDBUS7W7",              // 194.75€
  // Lifetime (ai-engine-3) with promo
  "ai-engine-3-not-client": "https://pay.sumup.com/b2c/QSJHZGHR",      // 420.25€
  "ai-engine-3-already-client": "https://pay.sumup.com/b2c/Q3FCLF69",  // 379.25€
  "ai-engine-3-vip": "https://pay.sumup.com/b2c/QA8ZGSYH",              // 358.75€
};

// Bank transfer (SEPA) details
const BANK_TRANSFER = {
  holder: "Noam Huruguen",
  bank: "SumUp Limited",
  iban: "IE79SUMU99036511881898",
  bic: "SUMUIE22XXX",
};

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

interface Product {
  id: string;
  name: string;
  icon: React.ElementType;
  options: { label: string; price: number; note?: string; description?: string; duration?: string }[];
}

const products: Product[] = [
  {
    id: "ai-engine",
    name: "FUSION AI",
    icon: Cpu,
    options: [
      { label: "1 Week (Setup + Support + License)", price: 25, description: "Complete setup with AI Aimbot V8.1 installation included + 7 days of support. Requires Waveshare RP2350A USB Mini Development Board. Everything done for you.", duration: "~1 hour" },
      { label: "1 Week (License Only)", price: 15, description: "7 days license for V8.1. Includes a PDF setup guide. Requires Waveshare RP2350A USB Mini Development Board. NO remote installation support. You must set it up yourself.", duration: "N/A (Self-setup)" },
      { label: "Weekly Renewal", price: 10, note: "/ week", description: "Renewal for existing users who completed their first week.", duration: "~5 min" },
      { label: "License Only (Monthly)", price: 40, description: "1 month license for V8.1. Includes a PDF setup guide. Requires Waveshare RP2350A USB Mini Development Board. NO remote installation support. You must set it up yourself.", duration: "N/A (Self-setup)" },
      { label: "1 Month (Setup + Support + License)", price: 60, description: "Complete setup with AI Aimbot V8.1 installation included + 30 days of support. Requires Waveshare RP2350A USB Mini Development Board. Everything done for you. Renewal: 10 EUR/week or 30 EUR/month.", duration: "~1 hour" },
      { label: "Help Installation (PDF users)", price: 30, description: "For users who bought the PDF-only license but need help with installation. Remote assistance included.", duration: "~1 hour" },
      { label: "Annual Subscription", price: 150, description: "Full access to FUSION AI V8.1 for 12 months. Requires Waveshare RP2350A USB Mini Development Board. ⚠️ Locked to V8.1 - future major updates require +€30 per update. Priority support included.", duration: "~1 hour" },
      { label: "Lifetime License", price: 250, description: "Permanent access to FUSION AI V8.1. Requires Waveshare RP2350A USB Mini Development Board. ⚠️ Locked to V8.1 - future major updates require +€30 per update. One-time payment.", duration: "~1 hour" },
      { label: "Monthly Renewal", price: 30, note: "/ month", description: "Exclusive to users who have completed 4 consecutive weeks or previously purchased a full month. Renewal only.", duration: "~30 min" },
      { label: "Advanced AI Weight — Apex Legends", price: 10, description: "Powerful AI Weight add-on for Apex Legends. Requires a high-end GPU: NVIDIA RTX 4070 / 5060 minimum. ONLY available for existing AI Aimbot license holders. Requires NVIDIA RTX 4070/5060+ or AMD RX 7900/9060+. Enhances targeting precision.", duration: "Instant delivery" },
      { label: "Advanced AI Weight — Fortnite", price: 10, description: "Powerful AI Weight add-on for Fortnite. Requires a high-end GPU: NVIDIA RTX 4070 / 5060 minimum. ONLY available for existing AI Aimbot license holders. Requires NVIDIA RTX 4070/5060+ or AMD RX 7900/9060+. Enhances targeting precision.", duration: "Instant delivery" },
    ],
  },
  {
    id: "windows-opt",
    name: "Windows Optimization",
    icon: Monitor,
    options: [
      { label: "Simple Optimization", price: 20, description: "Full system optimization for maximum performance.", duration: "~30 min" },
      { label: "Optimization + Windows Reinstall", price: 40, description: "Complete Windows reinstallation + full optimization. (Requires a USB drive of at least 8GB)", duration: "~2 hours" },
    ],
  },
  {
    id: "jitter-script",
    name: "Jitter Script",
    icon: Gamepad2,
    options: [
      { label: "1 day", price: 2.5 },
      { label: "1 week", price: 5 },
      { label: "1 month", price: 15 },
      { label: "3 months", price: 20 },
      { label: "6 months", price: 25 },
      { label: "1 year", price: 30 },
      { label: "Lifetime", price: 40 },
    ],
  },
];

const GAME_LABELS: Record<string, string> = {
  fortnite: "Fortnite",
  apex: "Apex Legends",
  overwatch: "Overwatch",
  warzone: "Warzone",
  "the-finals": "The Finals",
  splitgate: "Splitgate",
  csgo: "CS:GO",
  "marvel-rivals": "Marvel Rivals",
  "rainbow-six": "Rainbow Six Siege",
  r6: "Rainbow Six Siege",
  siege: "Rainbow Six Siege",
  rust: "Rust",
  "arc-raiders": "Arc Raiders",
  "arc-raider": "Arc Raiders",
  destiny: "Destiny",
  "destiny-2": "Destiny",
  "delta-force": "Delta Force",
  pubg: "PUBG",
  battlefield: "Battlefield",
  bf: "Battlefield",
  universal: "Universal",
};

export default function Purchase() {
  const { t } = useLanguage();
  const searchParams = new URLSearchParams(window.location.search);
  const rawProductId = searchParams.get("product") || "ai-engine";
  const productId = rawProductId === "fusion-ai" || rawProductId === "ai" ? "ai-engine"
    : rawProductId === "windows" || rawProductId === "windows-optimization" ? "windows-opt"
    : rawProductId === "jitter" ? "jitter-script"
    : rawProductId;
  const product = products.find((p) => p.id === productId) || products[0];
  const rawGame = (searchParams.get("game") || "").toLowerCase();
  const selectedGame = GAME_LABELS[rawGame] || null;
  const displayProductName = selectedGame && productId === "ai-engine"
    ? `${selectedGame} — AI Aimbot`
    : product.name;

  // ── Form state ──
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", discordPseudo: "",
    cpu: "", gpu: "", os: "Windows 10", controller: "",
  });
  const [selfSetupConfirmed, setSelfSetupConfirmed] = useState(false);
  const [hardwareConfirmed, setHardwareConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{
    orderNumber: string; productName: string; price: number; optionIndex: number;
  } | null>(null);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);

  // ── New simplified AI Engine state ──
  const [aiDuration, setAiDuration] = useState<string>("week"); // week, month, year, lifetime, renewal, addon
  const [aiSupport, setAiSupport] = useState<boolean>(true); // true = with support, false = license only
  const [aiRenewalType, setAiRenewalType] = useState<string>("week"); // week, month
  const [aiAddonType, setAiAddonType] = useState<string>(
    rawGame === "fortnite" ? "fortnite" : "apex"
  ); // apex, fortnite

  // Effect to sync simplified AI selection with option index
  useEffect(() => {
    if (productId === "ai-engine") {
      let index = 0;
      if (aiDuration === "week") {
        index = aiSupport ? 0 : 1;
      } else if (aiDuration === "month") {
        index = aiSupport ? 4 : 3;
      } else if (aiDuration === "year") {
        index = 6;
      } else if (aiDuration === "lifetime") {
        index = 7;
      } else if (aiDuration === "renewal") {
        index = aiRenewalType === "week" ? 2 : 8;
      } else if (aiDuration === "addon") {
        index = aiAddonType === "apex" ? 9 : 10;
      } else if (aiDuration === "help") {
        index = 5;
      }
      setSelectedOptionIndex(index);
    }
  }, [productId, aiDuration, aiSupport, aiRenewalType, aiAddonType]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const selectedItem = selectedOptionIndex !== null ? product.options[selectedOptionIndex] : null;
  let total = selectedItem?.price ?? 0;
  const isSelfSetupOption = productId === "ai-engine" && (selectedOptionIndex === 1 || selectedOptionIndex === 3);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.discordPseudo || !formData.cpu || !formData.gpu) {
      toast.error(t("purchase.fillAll"));
      return;
    }
    if (selectedOptionIndex === null) {
      toast.error(t("purchase.selectOption"));
      return;
    }
    if (isSelfSetupOption && !selfSetupConfirmed) {
      toast.error(t("purchase.confirmSelfSetup"));
      return;
    }
    if (!hardwareConfirmed) {
      toast.error(t("purchase.confirmHardware"));
      return;
    }

    setIsLoading(true);
    try {
      const orderNumber = generateOrderNumber();
      setOrderCreated({
        orderNumber,
        productName: `${displayProductName} — ${selectedItem!.label}`,
        price: selectedItem!.price,
        optionIndex: selectedOptionIndex,
      });
      toast.success(t("purchase.validated"));
    } catch {
      toast.error(t("purchase.errorGeneric"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSumUpPayment = () => {
    if (!orderCreated) return;
    let sumupLink = SUMUP_LINKS[`${productId}-${orderCreated.optionIndex}`];
    sendDiscordAndEmail(orderCreated, "sumup");
    window.location.href = sumupLink || "https://pay.sumup.com/b2c/QLA8WDDD";
  };

  const handleBankTransfer = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "bank_transfer");
    setShowBankTransfer(true);
  };

  const handlePayPalPayment = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "paypal");
    const paypalLink = `${PAYPAL_BASE}/${total}`;
    setTimeout(() => { window.open(paypalLink, "_blank"); }, 100);
    toast.success("Redirecting to PayPal... Please use 'Friends & Family' only.");
  };

  const handleStripePayment = async () => {
    if (!orderCreated || selectedOptionIndex === null) return;
    setStripeLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          optionIndex: selectedOptionIndex,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          discordPseudo: formData.discordPseudo,
          orderNumber: orderCreated.orderNumber,
          game: selectedGame || "",
          cpu: formData.cpu,
          gpu: formData.gpu,
          os: formData.os,
          inputMethod: formData.controller || "N/A",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Impossible de créer la session Stripe");
      }
      // Discord only after real payment (see /success → /api/stripe-fulfill)
      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Erreur Stripe");
      setStripeLoading(false);
    }
  };

  const sendDiscordAndEmail = (order: typeof orderCreated, paymentMethod: string) => {
    if (!order) return;
    const customerName = `${formData.firstName} ${formData.lastName}`;

    // Customer email
    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: formData.email,
        props: {
          orderNumber: order.orderNumber, customerName, customerEmail: formData.email,
          productName: displayProductName, productOption: selectedItem!.label,
          discordPseudo: formData.discordPseudo, price: order.price,
          cpu: formData.cpu, gpu: formData.gpu, os: formData.os,
          inputMethod: formData.controller || "N/A",
        },
      }),
    }).catch(console.error);

    // Discord notification
    fetch("/api/discord-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: order.orderNumber, customerName, email: formData.email,
        discordPseudo: formData.discordPseudo, productName: displayProductName,
        optionLabel: selectedItem!.label, price: order.price, paymentMethod,
        cpu: formData.cpu, gpu: formData.gpu, os: formData.os,
        inputMethod: formData.controller || "N/A",
        selfSetupConfirmed: isSelfSetupOption ? "YES (Confirmed)" : "N/A",
      }),
    }).catch(console.error);
  };

  return (
    <div>
      {/* Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="max-w-2xl">
            {selectedGame && productId === "ai-engine" && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-violet-tech/30 bg-violet-tech/10 text-xs font-body font-medium text-violet-accent tracking-wide">
                <Gamepad2 className="w-3.5 h-3.5" />
                {selectedGame} — AI Aimbot
              </div>
            )}
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
              {selectedGame && productId === "ai-engine" ? (
                <>
                  <span className="text-violet-tech">{selectedGame}</span> — AI Aimbot
                </>
              ) : (
                <>
                  {t("purchase.finalize")} <span className="text-violet-tech">{t("purchase.purchaseWord")}</span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("purchase.headerSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0 bg-dark-surface/20" />
        <div className="relative container">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left: Product + Form */}
            <div className="lg:col-span-2 space-y-8">

              {/* AI Engine Interface Showcase */}
              {productId === "ai-engine" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-tech to-violet-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative glass-card rounded-xl overflow-hidden border border-violet-tech/20 shadow-2xl">
                    <motion.img 
                      src="/images/fusion-interface.png" 
                      alt="Fusion AI Interface" 
                      className="w-full h-auto"
                      animate={{ 
                        y: [0, -5, 0],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-base/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-6">
                      <h3 className="text-xl font-display font-bold text-white neon-text">FUSION IA</h3>
                      <p className="text-xs text-violet-accent font-semibold tracking-widest uppercase">{t("purchase.visualEngine")}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Product Selection */}
              <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
                {(productId === "ai-engine" || productId === "jitter-script") && (
                  <div className="mb-8 space-y-4">
                    <div className="p-5 rounded-lg bg-emerald-900/20 border border-emerald-500/35">
                      <div className="flex items-center gap-3 mb-2">
                        <Keyboard className="w-5 h-5 text-emerald-400" />
                        <Gamepad2 className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-sm font-bold text-emerald-400 tracking-wider uppercase">
                          {t("purchase.fullInput")}
                        </h3>
                      </div>
                      <p className="text-sm text-emerald-100/90 leading-relaxed">
                        {t("purchase.fullInputDesc")}
                      </p>
                    </div>
                    <div className="p-5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        <h3 className="text-sm font-bold text-amber-400 tracking-wider uppercase">
                          {t("purchase.hardwareNotes")}
                        </h3>
                      </div>
                      <p className="text-sm text-amber-100/85 leading-relaxed">
                        {t("purchase.hardwareRequired")}
                        {" "}{t("purchase.screen1080")}
                        {(!selectedGame || selectedGame === "Apex Legends") && (
                          <>{" "}{t("purchase.steamOnly")}</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
                
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <product.icon className="w-6 h-6 text-violet-tech" />
                  {displayProductName} — {t("purchase.selectPlan")}
                </h2>

                {productId === "ai-engine" ? (
                  /* SIMPLIFIED AI ENGINE SELECTOR */
                  <div className="space-y-8">
                    {/* 1. Duration Selection */}
                    <div>
                      <label className="text-xs font-bold text-violet-accent tracking-widest uppercase mb-4 block">{t("purchase.selectDuration")}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: "week", label: t("purchase.weekly"), icon: Clock },
                          { id: "month", label: t("purchase.monthly"), icon: Zap },
                          { id: "year", label: t("purchase.annual"), icon: Layers },
                          { id: "lifetime", label: t("purchase.lifetime"), icon: Shield },
                          { id: "renewal", label: t("purchase.renewal"), icon: RefreshCw },
                          { id: "addon", label: t("purchase.addon"), icon: Cpu },
                        ].map((d) => (
                          <button
                            key={d.id}
                            onClick={() => setAiDuration(d.id)}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                              aiDuration === d.id ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                            }`}
                          >
                            <d.icon className={`w-5 h-5 mb-2 ${aiDuration === d.id ? "text-violet-tech" : "text-muted-foreground"}`} />
                            <span className={`text-sm font-bold ${aiDuration === d.id ? "text-foreground" : "text-muted-foreground"}`}>{d.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Support / Options Selection */}
                    <AnimatePresence mode="wait">
                      {(aiDuration === "week" || aiDuration === "month") && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <label className="text-xs font-bold text-violet-accent tracking-widest uppercase mb-4 block">{t("purchase.selectSupport")}</label>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <button
                              onClick={() => setAiSupport(true)}
                              className={`flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                                aiSupport ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${aiSupport ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {aiSupport && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <div>
                                <p className="font-bold text-foreground">{t("purchase.withSupport")}</p>
                                <p className="text-xs text-muted-foreground mt-1">{t("purchase.withSupportDesc")}</p>
                              </div>
                            </button>
                            <button
                              onClick={() => setAiSupport(false)}
                              className={`flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                                !aiSupport ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${!aiSupport ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {!aiSupport && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <div>
                                <p className="font-bold text-foreground">{t("purchase.licenseOnly")}</p>
                                <p className="text-xs text-muted-foreground mt-1">{t("purchase.licenseOnlyDesc")}</p>
                              </div>
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {aiDuration === "renewal" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <label className="text-xs font-bold text-violet-accent tracking-widest uppercase mb-4 block">{t("purchase.selectRenewal")}</label>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <button
                              onClick={() => setAiRenewalType("week")}
                              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                                aiRenewalType === "week" ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${aiRenewalType === "week" ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {aiRenewalType === "week" && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-bold text-foreground">{t("purchase.weeklyRenewal")}</span>
                            </button>
                            <button
                              onClick={() => setAiRenewalType("month")}
                              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                                aiRenewalType === "month" ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${aiRenewalType === "month" ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {aiRenewalType === "month" && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-bold text-foreground">{t("purchase.monthlyRenewal")}</span>
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {aiDuration === "addon" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <label className="text-xs font-bold text-violet-accent tracking-widest uppercase mb-4 block">{t("purchase.selectAddonGame")}</label>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <button
                              onClick={() => setAiAddonType("apex")}
                              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                                aiAddonType === "apex" ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${aiAddonType === "apex" ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {aiAddonType === "apex" && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-bold text-foreground">Apex Legends</span>
                            </button>
                            <button
                              onClick={() => setAiAddonType("fortnite")}
                              className={`flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                                aiAddonType === "fortnite" ? "border-violet-tech bg-violet-tech/10" : "border-border/50 hover:border-violet-tech/30 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${aiAddonType === "fortnite" ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {aiAddonType === "fortnite" && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-bold text-foreground">Fortnite</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Display Selected Option Details */}
                    {selectedItem && (
                      <motion.div 
                        key={selectedOptionIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-5 rounded-lg bg-violet-tech/5 border border-violet-tech/20"
                      >
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="font-bold text-lg text-foreground">{selectedItem.label}</h4>
                          <div className="text-right">
                            <p className="text-2xl font-display font-bold text-violet-tech">{selectedItem.price}€</p>
                            {selectedItem.note && <p className="text-xs text-muted-foreground">{selectedItem.note}</p>}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{selectedItem.description}</p>
                        {selectedItem.duration && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-violet-accent font-semibold">
                            <Clock className="w-3.5 h-3.5" />
                            {t("purchase.delivery")}: {selectedItem.duration}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  /* DEFAULT SELECTOR FOR OTHER PRODUCTS */
                  <div className="space-y-3">
                    {product.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setSelectedOptionIndex(idx)}
                        whileHover={{ scale: 1.01 }}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedOptionIndex === idx
                            ? "border-violet-tech bg-violet-tech/10"
                            : "border-border/50 hover:border-violet-tech/50 bg-dark-elevated/50"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${selectedOptionIndex === idx ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                              {selectedOptionIndex === idx && <Check className="w-3 h-3 text-primary-foreground" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-foreground">{option.label}</p>
                              {option.description && <p className="text-xs text-muted-foreground mt-1">{option.description}</p>}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-display font-bold text-lg text-violet-tech">{option.price}€</p>
                            {option.note && <p className="text-xs text-muted-foreground">{option.note}</p>}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Information Form */}
              <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-violet-tech" />
                  {t("purchase.yourInfo")}
                </h2>
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.firstName")}</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.lastName")}</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.email")}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.discordPseudo")}</label>
                      <input type="text" name="discordPseudo" value={formData.discordPseudo} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="john_doe#1234" />
                    </div>
                  </div>

                  {/* Hardware Configuration */}
                  <div className="pt-4 border-t border-border/30">
                    <h3 className="text-lg font-display font-bold mb-4 text-violet-tech">{t("purchase.hardwareConfig")}</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.cpu")}</label>
                        <input type="text" name="cpu" value={formData.cpu} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="e.g. i7-12700K" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.gpu")}</label>
                        <input type="text" name="gpu" value={formData.gpu} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="e.g. RTX 3060" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.os")}</label>
                        <select name="os" value={formData.os} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none appearance-none">
                          <option value="Windows 10">Windows 10</option>
                          <option value="Windows 11">Windows 11</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Self-Setup Confirmation Checkbox */}
                  {isSelfSetupOption && (
                    <div className="pt-4 border-t border-border/30">
                      <div className="p-4 rounded-lg bg-violet-900/20 border border-violet-500/30">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center h-5 mt-1">
                            <input
                              id="self-setup-check"
                              type="checkbox"
                              checked={selfSetupConfirmed}
                              onChange={(e) => setSelfSetupConfirmed(e.target.checked)}
                              className="w-5 h-5 rounded border-border/50 bg-dark-elevated text-violet-tech focus:ring-violet-tech/30 transition-all cursor-pointer"
                            />
                          </div>
                          <label htmlFor="self-setup-check" className="text-sm text-foreground font-medium leading-relaxed cursor-pointer select-none">
                            {t("purchase.selfSetupConfirm")}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Configuration Requirements Reminder */}
                  <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-500/30 mb-6">
                    <div className="flex gap-3 mb-4">
                      <span className="text-xl flex-shrink-0">⚠️</span>
                      <div className="text-sm text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-400 block mb-1">{t("purchase.importantReminder")}</strong>
                        <p>{t("purchase.importantReminderBody")}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 pt-3 border-t border-amber-500/20">
                      <div className="flex items-center h-5 mt-1">
                        <input
                          id="hardware-check"
                          type="checkbox"
                          checked={hardwareConfirmed}
                          onChange={(e) => setHardwareConfirmed(e.target.checked)}
                          className="w-5 h-5 rounded border-amber-500/50 bg-dark-elevated text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer"
                        />
                      </div>
                      <label htmlFor="hardware-check" className="text-sm text-amber-100 font-medium leading-relaxed cursor-pointer select-none">
                        {t("purchase.hardwareConfirm")}
                      </label>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full bg-violet-tech hover:bg-violet-accent text-white font-bold py-6 rounded-md transition-all shadow-lg shadow-violet-tech/20">
                    {isLoading ? t("purchase.processing") : t("purchase.proceed")}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Right: RP2350A + Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {(productId === "ai-engine" || productId === "jitter-script") && (
                  <motion.div
                    variants={fadeUp}
                    custom={2.5}
                    initial="hidden"
                    animate="visible"
                    className="relative group"
                  >
                    <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-violet-tech via-cyan-400/40 to-violet-accent opacity-60 blur-[1px] group-hover:opacity-100 transition-opacity" />
                    <div className="relative rounded-xl border border-violet-tech/50 bg-dark-base shadow-[0_0_40px_rgba(123,46,255,0.25)] overflow-hidden">
                      <div className="bg-white">
                        <img
                          src="/images/rp2350a-board.webp"
                          alt="Waveshare RP2350A USB Mini Development Board — required"
                          className="w-full h-auto object-contain block"
                          width={994}
                          height={932}
                          loading="eager"
                          decoding="async"
                        />
                      </div>
                      <div className="px-5 py-4 border-t border-violet-tech/30">
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-violet-accent mb-1">
                          {t("purchase.requiredHardware")}
                        </p>
                        <p className="font-display font-bold text-sm text-foreground">
                          Waveshare RP2350A
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                          {t("purchase.rpMandatory")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="glass-card rounded-lg p-6 border-t-4 border-violet-tech">
                  <h2 className="text-xl font-display font-bold mb-6">{t("purchase.orderSummary")}</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm gap-4">
                      <span className="text-muted-foreground shrink-0">{t("purchase.product")}</span>
                      <span className="text-foreground font-medium text-right">{displayProductName}</span>
                    </div>
                    {selectedGame && productId === "ai-engine" && (
                      <div className="flex justify-between text-sm gap-4">
                        <span className="text-muted-foreground shrink-0">{t("purchase.game")}</span>
                        <span className="text-violet-accent font-medium text-right">{selectedGame}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("purchase.option")}</span>
                      <span className="text-foreground font-medium">{selectedItem?.label || t("purchase.notSelected")}</span>
                    </div>
                    <div className="h-px bg-border/30" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">{t("purchase.total")}</span>
                      <span className="text-2xl font-display font-bold text-violet-tech">{total}€</span>
                    </div>
                  </div>

                  {orderCreated ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-violet-tech/10 border border-violet-tech/20 rounded-lg">
                        <p className="text-xs text-violet-tech font-bold uppercase tracking-wider mb-1">{t("purchase.orderNumber")}</p>
                        <p className="text-sm font-mono font-bold text-foreground">{orderCreated.orderNumber}</p>
                      </div>
                      {!showBankTransfer ? (
                        <>
                          <div className="space-y-3">
                            <p className="text-xs text-muted-foreground text-center mb-2">{t("purchase.choosePayment")}</p>

                            <div className="space-y-1">
                              <Button
                                type="button"
                                onClick={handleStripePayment}
                                disabled={stripeLoading}
                                className="w-full bg-[#635BFF] hover:bg-[#5851e0] text-white font-bold py-4 flex items-center justify-center gap-2"
                              >
                                <CreditCard className="w-4 h-4" />
                                {stripeLoading ? t("purchase.redirecting") : t("purchase.payStripe")}
                              </Button>
                              <p className="text-[10px] text-center text-violet-accent/90">
                                {t("purchase.payStripeHint")}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Button type="button" onClick={handleSumUpPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                {t("purchase.paySumup")}
                              </Button>
                              <p className="text-[10px] text-center text-amber-400/80">
                                {t("purchase.paySumupHint")}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Button type="button" onClick={handlePayPalPayment} className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-4 flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                {t("purchase.payPaypal")}
                              </Button>
                              <p className="text-[10px] text-center text-blue-400/80 font-bold uppercase tracking-widest">
                                {t("purchase.payPaypalHint")}
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Button type="button" onClick={() => { sendDiscordAndEmail(orderCreated!, "bunq"); window.open(`https://bunq.me/NoamFranckGeorgesRobert/${total.toFixed(2)}/OneScript%20Order%20${orderCreated!.orderNumber}`, "_blank"); }} className="w-full bg-[#00b9e8] hover:bg-[#009dc7] text-white font-bold py-4 flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                {t("purchase.payBunq")}
                              </Button>
                              <p className="text-[10px] text-center text-cyan-400/80">{t("purchase.payBunqHint")}</p>
                            </div>

                            <Button type="button" onClick={handleBankTransfer} variant="outline" className="w-full border-border/50 text-muted-foreground hover:text-foreground font-bold py-4">
                              {t("purchase.payBank")}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-dark-elevated rounded-lg border border-violet-tech/30 space-y-4">
                          <div className="flex items-center gap-2 text-violet-tech mb-2">
                            <Shield className="w-5 h-5" />
                            <h3 className="font-bold">{t("purchase.bankDetails")}</h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase">{t("purchase.accountHolder")}</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{BANK_TRANSFER.holder}</p>
                                <button onClick={() => copyToClipboard(BANK_TRANSFER.holder, "holder")} className="text-violet-tech text-xs hover:underline">{copiedField === "holder" ? t("purchase.copied") : t("purchase.copy")}</button>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase">IBAN</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-mono">{BANK_TRANSFER.iban}</p>
                                <button onClick={() => copyToClipboard(BANK_TRANSFER.iban, "iban")} className="text-violet-tech text-xs hover:underline">{copiedField === "iban" ? t("purchase.copied") : t("purchase.copy")}</button>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase">BIC / SWIFT</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-mono">{BANK_TRANSFER.bic}</p>
                                <button onClick={() => copyToClipboard(BANK_TRANSFER.bic, "bic")} className="text-violet-tech text-xs hover:underline">{copiedField === "bic" ? t("purchase.copied") : t("purchase.copy")}</button>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-border/30">
                              <p className="text-[10px] text-muted-foreground uppercase">{t("purchase.reference")}</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-violet-tech">{orderCreated.orderNumber}</p>
                                <button onClick={() => copyToClipboard(orderCreated.orderNumber, "ref")} className="text-violet-tech text-xs hover:underline">{copiedField === "ref" ? t("purchase.copied") : t("purchase.copy")}</button>
                              </div>
                            </div>
                          </div>
                          <Button onClick={() => setShowBankTransfer(false)} variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
                            {t("purchase.goBackPayments")}
                          </Button>
                        </motion.div>
                      )}

                      <div className="p-4 bg-dark-elevated/50 rounded-lg border border-border/30">
                        <div className="flex gap-3">
                          <Lock className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {t("purchase.paymentSecureBefore")}{" "}
                            <strong>{orderCreated.orderNumber}</strong>{" "}
                            {t("purchase.paymentSecureAfter")}{" "}
                            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="text-violet-tech hover:underline">
                              Discord
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 border-2 border-dashed border-border/30 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">{t("purchase.completeForm")}</p>
                    </div>
                  )}
                </motion.div>

                <div className="glass-card rounded-lg p-6">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-violet-tech" />
                    {t("purchase.securePurchase")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500" />
                      {t("purchase.instantNotif")}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500" />
                      {t("purchase.discordSupport")}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500" />
                      {t("purchase.updatesIncluded")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
