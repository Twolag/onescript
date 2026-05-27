/*
 * Purchase — Neon Circuit Design
 * Product selection, summary, PayPal + SumUp + Bunq
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cpu, Monitor, Gamepad2, Check, Shield, Lock, AlertCircle,
  MessageCircle, CreditCard, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PAYPAL_BASE = "https://www.paypal.me/OneLagTT";
const DISCORD_LINK = "https://discord.gg/5btq6znUvN";

// SumUp links by product/option (key = "productId-index")
const SUMUP_LINKS: { [key: string]: string } = {
  "ai-engine-0": "https://pay.sumup.com/b2c/Q6A0L1GO",   // 51.30€ — Monthly (License only)
  "ai-engine-1": "https://pay.sumup.com/b2c/QSVN398S",   // 82.00€ — Monthly (License + Inst.)
  "ai-engine-2": "https://pay.sumup.com/b2c/QJBMR5C5",   // Annual (250€)
  "ai-engine-3": "https://pay.sumup.com/b2c/QKRIB0L6",   // Lifetime (450€)
  "ai-engine-4": "https://pay.sumup.com/b2c/QZKAONRN",   // 30.80€ — Monthly Renewal
  "windows-opt-0": "https://pay.sumup.com/b2c/QYOO0CVP", // 20.50€
  "windows-opt-1": "https://pay.sumup.com/b2c/QEVOX3BQ", // 41.00€
  "jitter-script-0": "https://pay.sumup.com/b2c/QONAKRTU", // 2.50€  — 1 day (Approx)
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

// SumUp prices (with 2.5% fee) for display
const SUMUP_PRICES: { [key: string]: number } = {
  "ai-engine-0": 51.30,
  "ai-engine-1": 82.00,
  "ai-engine-2": 250.00,
  "ai-engine-3": 450.00,
  "ai-engine-4": 30.80,
  "windows-opt-0": 20.50,
  "windows-opt-1": 41.00,
  "jitter-script-0": 2.50,
  "jitter-script-1": 5.20,
  "jitter-script-2": 15.50,
  "jitter-script-3": 20.50,
  "jitter-script-4": 25.70,
  "jitter-script-5": 30.80,
  "jitter-script-6": 41.00,
};

// PROMO prices (Annual & Lifetime with grade discounts for PayPal/Bunq - no fees)
const PROMO_PRICES: { [key: string]: number } = {
  "ai-engine-2-not-client": 230,
  "ai-engine-2-already-client": 210,
  "ai-engine-2-vip": 190,
  "ai-engine-3-not-client": 410,
  "ai-engine-3-already-client": 370,
  "ai-engine-3-vip": 350,
};

// PROMO prices for SumUp (with 2.5% fee included)
const PROMO_PRICES_SUMUP: { [key: string]: number } = {
  "ai-engine-2-not-client": 235.75,
  "ai-engine-2-already-client": 215.25,
  "ai-engine-2-vip": 194.75,
  "ai-engine-3-not-client": 420.25,
  "ai-engine-3-already-client": 379.25,
  "ai-engine-3-vip": 358.75,
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
      { label: "License Only (Monthly)", price: 50, description: "1 month license. Includes a PDF setup guide. NO remote installation support. You must set it up yourself.", duration: "N/A (Self-setup)" },
      { label: "License + Installation (Monthly)", price: 80, description: "First month + AI Aimbot installation included. We do everything for you. Renewal: 30 EUR/month", duration: "~1 hour" },
      { label: "Annual Subscription", price: 250, description: "Full access to FUSION AI for 12 months. Includes all updates and priority support.", duration: "~1 hour" },
      { label: "Lifetime License", price: 450, description: "Permanent access to FUSION AI with all future updates included. One-time payment.", duration: "~1 hour" },
      { label: "Monthly Renewal", price: 30, note: "/ month", description: "This price is only for those who already own the AI Aimbot and want to renew their license.", duration: "~30 min" },
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

export default function Purchase() {
  const searchParams = new URLSearchParams(window.location.search);
  const rawProductId = searchParams.get("product") || "ai-engine";
  const productId = rawProductId === "fusion-ai" || rawProductId === "ai" ? "ai-engine"
    : rawProductId === "windows" || rawProductId === "windows-optimization" ? "windows-opt"
    : rawProductId === "jitter" ? "jitter-script"
    : rawProductId;
  const product = products.find((p) => p.id === productId) || products[0];

  // ── Form state ──
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", discordPseudo: "",
    cpu: "", gpu: "", os: "Windows 10", controller: "",
  });
  const [selfSetupConfirmed, setSelfSetupConfirmed] = useState(false);
  const [hardwareConfirmed, setHardwareConfirmed] = useState(false);
  const [clientGrade, setClientGrade] = useState<ClientGrade>("not-client");
  const [showPromoNotice, setShowPromoNotice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{
    orderNumber: string; productName: string; price: number; optionIndex: number;
  } | null>(null);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

type ClientGrade = "not-client" | "already-client" | "vip";

  const selectedItem = selectedOptionIndex !== null ? product.options[selectedOptionIndex] : null;
  let total = selectedItem?.price ?? 0;
  const isSelfSetupOption = productId === "ai-engine" && (selectedOptionIndex === 0);
  
  // Apply promo discount if applicable (Annual or Lifetime)
  const isPromoEligible = (productId === "ai-engine" && (selectedOptionIndex === 2 || selectedOptionIndex === 3));
  if (isPromoEligible) {
    const promoKey = `${productId}-${selectedOptionIndex}-${clientGrade}`;
    total = PROMO_PRICES[promoKey as keyof typeof PROMO_PRICES] || total;
  }
  
  // SumUp total (with 2.5% fee for promo)
  let sumupTotal = total;
  if (isPromoEligible) {
    const promoKey = `${productId}-${selectedOptionIndex}-${clientGrade}`;
    sumupTotal = PROMO_PRICES_SUMUP[promoKey as keyof typeof PROMO_PRICES_SUMUP] || total;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.discordPseudo || !formData.cpu || !formData.gpu) {
      toast.error("Please fill in all fields");
      return;
    }
    if (selectedOptionIndex === null) {
      toast.error("Please select an option");
      return;
    }
    if ((productId === "jitter-script" || productId === "ai-engine") && !formData.controller) {
      toast.error("Please select your controller type");
      return;
    }
    if (isSelfSetupOption && !selfSetupConfirmed) {
      toast.error("You must confirm that you will handle the installation yourself");
      return;
    }
    if (!hardwareConfirmed) {
      toast.error("You must confirm that your PC meets the hardware requirements");
      return;
    }

    setIsLoading(true);
    try {
      const orderNumber = generateOrderNumber();
      setOrderCreated({
        orderNumber,
        productName: `${product.name} — ${selectedItem!.label}`,
        price: selectedItem!.price,
        optionIndex: selectedOptionIndex,
      });
      toast.success("Information validated! Choose your payment method.");
    } catch {
      toast.error("An error occurred, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSumUpPayment = () => {
    if (!orderCreated) return;
    let sumupLink = SUMUP_LINKS[`${productId}-${orderCreated.optionIndex}`];
    
    // Use promo link if applicable
    if (isPromoEligible) {
      const promoKey = `${productId}-${orderCreated.optionIndex}-${clientGrade}`;
      sumupLink = PROMO_SUMUP_LINKS[promoKey as keyof typeof PROMO_SUMUP_LINKS] || sumupLink;
    }
    
    sendDiscordAndEmail(orderCreated, "sumup");
    window.location.href = sumupLink || "https://pay.sumup.com/b2c/QLA8WDDD";
  };

  const handleBankTransfer = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "bank_transfer" as "sumup");
    setShowBankTransfer(true);
  };

  const handlePayPalPayment = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "paypal");
    const paypalLink = `${PAYPAL_BASE}/${total}`;
    setTimeout(() => { window.open(paypalLink, "_blank"); }, 100);
    toast.success("Redirecting to PayPal... Please use 'Friends & Family' only.");
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
          productName: product.name, productOption: selectedItem!.label,
          discordPseudo: formData.discordPseudo, price: order.price,
          cpu: formData.cpu, gpu: formData.gpu, os: formData.os,
        },
      }),
    }).catch(console.error);

    // Discord notification
    fetch("/api/discord-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: order.orderNumber, customerName, email: formData.email,
        discordPseudo: formData.discordPseudo, productName: product.name,
        optionLabel: selectedItem!.label, price: order.price, paymentMethod,
        cpu: formData.cpu, gpu: formData.gpu, os: formData.os,
        selfSetupConfirmed: isSelfSetupOption ? "YES (Confirmed)" : "N/A",
      }),
    }).catch(console.error);
  };

  return (
    <div>
      {/* Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">

          {/* PROMO BANNER */}
          {showPromoNotice && isPromoEligible && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-green-400 mb-1">🎉 PROMO LOCASION - 1 SEMAINE!</h3>
                  <p className="text-sm text-green-300/90">Réductions spéciales sur les forfaits Annuel et Lifetime selon votre grade client!</p>
                </div>
              </div>
              <button onClick={() => setShowPromoNotice(false)} className="text-green-400 hover:text-green-300 text-xl flex-shrink-0">×</button>
            </motion.div>
          )}
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
              Finalize your <span className="text-violet-tech">purchase</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Select your product and complete the form to access your purchase.
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

              {/* Product Selection */}
              <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
                {(productId === "ai-engine" || productId === "jitter-script") && (
                  <div className="mb-8 p-5 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <h3 className="text-sm font-bold text-red-400 tracking-wider uppercase">Mandatory Requirement</h3>
                    </div>
                    <p className="text-sm text-red-200/80 leading-relaxed">
                      For Apex Legends, you <span className="text-red-400 font-bold underline">MUST</span> use the <strong>STEAM</strong> version. The EA App (Origin) version is <strong>NOT supported</strong> and will not work with our tools.
                    </p>
                  </div>
                )}
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <product.icon className="w-6 h-6 text-violet-tech" />
                  {product.name}
                </h2>
                <div className="space-y-3">
                  {product.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setSelectedOptionIndex(idx);
                        setSelfSetupConfirmed(false);
                      }}
                      whileHover={{ scale: 1.02 }}
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
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-foreground">{option.label}</p>
                              {(idx === 2 || idx === 3) && (
                                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-xs font-bold tracking-wider animate-pulse">
                                  🔥 PROMO
                                </span>
                              )}
                            </div>
                            {option.description && <p className="text-xs text-muted-foreground mt-1">{option.description}</p>}
                            {option.duration && (
                              <p className="text-xs text-violet-tech/70 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{option.duration}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {(idx === 2 || idx === 3) ? (
                            <div className="flex flex-col items-end gap-0.5">
                              <p className="text-xs text-muted-foreground line-through">{option.price}€</p>
                              <p className="font-display font-bold text-green-400 text-lg">
                                {PROMO_PRICES[`${productId}-${idx}-${clientGrade}` as keyof typeof PROMO_PRICES] || option.price}€
                              </p>
                              <p className="text-xs text-red-400 font-bold">
                                -€{(option.price - (PROMO_PRICES[`${productId}-${idx}-${clientGrade}` as keyof typeof PROMO_PRICES] || option.price)).toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <>
                              <p className="font-display font-bold text-violet-tech text-lg">{option.price}€</p>
                              {option.note && <p className="text-xs text-muted-foreground">{option.note}</p>}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Information Form */}
              <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-violet-tech" />
                  Your Information
                </h2>
                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Discord Username</label>
                      <input type="text" name="discordPseudo" value={formData.discordPseudo} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="john_doe#1234" />
                    </div>
                  </div>

                  {/* Hardware Configuration */}
                  <div className="pt-4 border-t border-border/30">
                    <h3 className="text-lg font-display font-bold mb-4 text-violet-tech">Hardware Configuration</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Processor (CPU)</label>
                        <input type="text" name="cpu" value={formData.cpu} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="e.g. i7-12700K" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Graphics Card (GPU)</label>
                        <input type="text" name="gpu" value={formData.gpu} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="e.g. RTX 3060" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Operating System (OS)</label>
                        <select name="os" value={formData.os} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none appearance-none">
                          <option value="Windows 10">Windows 10</option>
                          <option value="Windows 11">Windows 11</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Controller Selection */}
                  {(productId === "jitter-script" || productId === "ai-engine") && (
                    <div className="pt-4 border-t border-border/30">
                      <h3 className="text-lg font-display font-bold mb-4 text-violet-tech">Controller Type</h3>
                      <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 mb-4">
                        <p className="text-sm text-blue-200/90"><strong className="text-blue-400">⚠️ Important:</strong> OneScript supports <strong>controllers only</strong> (PS5, Xbox, Gamesir, etc.). Keyboard and Mouse are <strong>not supported</strong>.</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Select Your Input Method</label>
                        <select name="controller" value={formData.controller || ""} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none appearance-none">
                          <option value="">Choose your input method...</option>
                          <option value="Xbox">Xbox Controller</option>
                          <option value="PS5">PlayStation 5 Controller</option>
                          <option value="PS5 Edge">PlayStation 5 Edge Controller</option>
                          <option value="Gamesir">Gamesir Controller</option>
                          <option value="Other">Other Controller</option>
                        </select>
                      </div>
                    </div>
                  )}

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
                            I understand that I will receive a <strong>PDF guide</strong> and that I must perform the installation <strong>myself</strong>. I confirm that OneScript staff will <strong>not intervene</strong> in the installation process for this specific plan.
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
                        <strong className="text-amber-400 block mb-1">Important Reminder</strong>
                        <p>By proceeding, you confirm that you have read and understood the minimum PC configuration requirements. It is your sole responsibility to ensure your hardware meets the necessary specifications. Purchases with non-compliant configurations are considered final. <strong>Note:</strong> Malfunctions caused by the customer's PC (hardware, drivers, OS, etc.) are not eligible for refunds.</p>
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
                        I confirm that my PC meets all the <strong>hardware requirements</strong> (NVIDIA RTX GPU, etc.) and that I have <strong>Steam</strong> installed for Apex Legends. I understand that no refunds will be issued for hardware incompatibility.
                      </label>
                    </div>
                  </div>


                  {/* Client Grade Selection (for Annual & Lifetime promo) */}
                  {isPromoEligible && (
                    <div className="pt-4 border-t border-border/30">
                      <div className="mb-4 p-3 rounded-lg bg-red-900/20 border border-red-500/30">
                        <p className="text-xs text-red-200 leading-relaxed">
                          <strong className="text-red-400">⚠️ Important:</strong> The "Existing Customer" and "VIP Member" discounts are <strong>exclusively for users who already have the corresponding role on our Discord server</strong>. If you select these options without having the required role, you will be required to pay the full price difference as compensation. Please verify your Discord status before proceeding.
                        </p>
                      </div>
                      <h3 className="text-lg font-display font-bold mb-4 text-violet-tech">Client Status (for promo)</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border/30 cursor-pointer hover:bg-dark-elevated/30 transition-colors" style={{ borderColor: clientGrade === "not-client" ? "rgb(123, 46, 255)" : "" }}>
                          <input type="radio" name="grade" value="not-client" checked={clientGrade === "not-client"} onChange={(e) => setClientGrade(e.target.value as ClientGrade)} className="w-4 h-4" />
                          <div>
                            <p className="font-medium text-foreground">New Customer</p>
                            <p className="text-xs text-muted-foreground">-20€ (Annual) / -40€ (Lifetime)</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border/30 cursor-pointer hover:bg-dark-elevated/30 transition-colors" style={{ borderColor: clientGrade === "already-client" ? "rgb(123, 46, 255)" : "" }}>
                          <input type="radio" name="grade" value="already-client" checked={clientGrade === "already-client"} onChange={(e) => setClientGrade(e.target.value as ClientGrade)} className="w-4 h-4" />
                          <div>
                            <p className="font-medium text-foreground">Existing Customer</p>
                            <p className="text-xs text-muted-foreground">-40€ (Annual) / -80€ (Lifetime)</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-border/30 cursor-pointer hover:bg-dark-elevated/30 transition-colors" style={{ borderColor: clientGrade === "vip" ? "rgb(123, 46, 255)" : "" }}>
                          <input type="radio" name="grade" value="vip" checked={clientGrade === "vip"} onChange={(e) => setClientGrade(e.target.value as ClientGrade)} className="w-4 h-4" />
                          <div>
                            <p className="font-medium text-foreground">VIP Member</p>
                            <p className="text-xs text-muted-foreground">-60€ (Annual) / -100€ (Lifetime)</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  <Button type="submit" disabled={isLoading} className="w-full bg-violet-tech hover:bg-violet-accent text-white font-bold py-6 rounded-md transition-all shadow-lg shadow-violet-tech/20">
                    {isLoading ? "Processing..." : "Validate my information"}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="glass-card rounded-lg p-6 border-t-4 border-violet-tech">
                  <h2 className="text-xl font-display font-bold mb-6">Order Summary</h2>

                  {productId === "ai-engine" && (
                    <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-400 block mb-1">System Recommendation</strong>
                        <p className="mb-2">For GPUs like RTX 3050, RTX 3060, RTX 3070, RTX 4060, RTX 4070, <strong>Windows 10</strong> is strongly recommended for optimal AI performance and stability.</p>
                        <p className="text-amber-300/90 text-xs font-semibold border-t border-amber-500/20 pt-2 mt-2">Issues related to your PC (hardware, drivers, third-party software, OS, antivirus) are not valid refund reasons.</p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Product</span>
                      <span className="text-foreground font-medium">{product.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Option</span>
                      <span className="text-foreground font-medium">{selectedItem?.label || "Not selected"}</span>
                    </div>
                    <div className="h-px bg-border/30" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-2xl font-display font-bold text-violet-tech">{total}€</span>
                    </div>
                  </div>

                  {orderCreated ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-violet-tech/10 border border-violet-tech/20 rounded-lg">
                        <p className="text-xs text-violet-tech font-bold uppercase tracking-wider mb-1">Order Number</p>
                        <p className="text-sm font-mono font-bold text-foreground">{orderCreated.orderNumber}</p>
                      </div>
                      {!showBankTransfer ? (
                        <>
                          <div className="space-y-3">
                            <p className="text-xs text-muted-foreground text-center mb-2">Choose your payment method:</p>

                            <div className="space-y-1">
                              <Button type="button" onClick={handleSumUpPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                PAY BY CARD (SUMUP)
                              </Button>
                              <p className="text-[10px] text-center text-amber-400/80">
                                ⚠ 2.5% processing fee included — {sumupTotal.toFixed(2)}€ charged — EU cards only
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Button type="button" onClick={handlePayPalPayment} className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-4 flex items-center justify-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                PAY BY PAYPAL
                              </Button>
                              <p className="text-[10px] text-center text-blue-400/80 font-bold uppercase tracking-widest">
                                ⚠️ Friends & Family payment only
                              </p>
                            </div>

                            <div className="space-y-1">
                              <Button type="button" onClick={() => { sendDiscordAndEmail(orderCreated!, "bunq"); window.open(`https://bunq.me/NoamFranckGeorgesRobert/${total.toFixed(2)}/OneScript%20Order%20${orderCreated!.orderNumber}`, "_blank"); }} className="w-full bg-[#00b9e8] hover:bg-[#009dc7] text-white font-bold py-4 flex items-center justify-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                PAY BY CARD (BUNQ)
                              </Button>
                              <p className="text-[10px] text-center text-cyan-400/80">✓ Card payment, no fees — all cards accepted (incl. non-EU) — {total.toFixed(2)}€ charged</p>
                            </div>

                            <Button type="button" onClick={handleBankTransfer} variant="outline" className="w-full border-border/50 text-muted-foreground hover:text-foreground font-bold py-4">
                              BANK TRANSFER (SEPA)
                            </Button>
                          </div>
                        </>
                      ) : (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-dark-elevated rounded-lg border border-violet-tech/30 space-y-4">
                          <div className="flex items-center gap-2 text-violet-tech mb-2">
                            <Shield className="w-5 h-5" />
                            <h3 className="font-bold">Bank Transfer Details</h3>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase">Account Holder</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">{BANK_TRANSFER.holder}</p>
                                <button onClick={() => copyToClipboard(BANK_TRANSFER.holder, "holder")} className="text-violet-tech text-xs hover:underline">{copiedField === "holder" ? "Copied!" : "Copy"}</button>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase">IBAN</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-mono">{BANK_TRANSFER.iban}</p>
                                <button onClick={() => copyToClipboard(BANK_TRANSFER.iban, "iban")} className="text-violet-tech text-xs hover:underline">{copiedField === "iban" ? "Copied!" : "Copy"}</button>
                              </div>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground uppercase">BIC / SWIFT</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-mono">{BANK_TRANSFER.bic}</p>
                                <button onClick={() => copyToClipboard(BANK_TRANSFER.bic, "bic")} className="text-violet-tech text-xs hover:underline">{copiedField === "bic" ? "Copied!" : "Copy"}</button>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-border/30">
                              <p className="text-[10px] text-muted-foreground uppercase">Reference (Required)</p>
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-violet-tech">{orderCreated.orderNumber}</p>
                                <button onClick={() => copyToClipboard(orderCreated.orderNumber, "ref")} className="text-violet-tech text-xs hover:underline">{copiedField === "ref" ? "Copied!" : "Copy"}</button>
                              </div>
                            </div>
                          </div>
                          <Button onClick={() => setShowBankTransfer(false)} variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
                            Go back to payment methods
                          </Button>
                        </motion.div>
                      )}

                      <div className="p-4 bg-dark-elevated/50 rounded-lg border border-border/30">
                        <div className="flex gap-3">
                          <Lock className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Payments are secure. After payment, send your order number <strong>{orderCreated.orderNumber}</strong> on our <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="text-violet-tech hover:underline">Discord server</a> to receive your access.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 border-2 border-dashed border-border/30 rounded-lg">
                      <AlertCircle className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Complete the form to see payment options</p>
                    </div>
                  )}
                </motion.div>

                <div className="glass-card rounded-lg p-6">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-violet-tech" />
                    Secure Purchase
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500" />
                      Instant notification after validation
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500" />
                      Dedicated Discord support
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-green-500" />
                      Regular updates included
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
