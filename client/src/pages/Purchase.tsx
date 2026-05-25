/*
 * Purchase — Neon Circuit Design
 * Product selection, summary, PayPal + SumUp + Bunq
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cpu, Monitor, Gamepad2, Check, Shield, Lock, AlertCircle,
  MessageCircle, CreditCard, Clock, Zap
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
    name: "FUSION IA V7.0",
    icon: Cpu,
    options: [
      { label: "License Only (Monthly) - V7.0", price: 50, description: "1 month license. Includes a PDF setup guide. NO remote installation support. You must set it up yourself.", duration: "N/A (Self-setup)" },
      { label: "License + Installation (Monthly) - V7.0", price: 80, description: "First month + AI Aimbot installation included. We do everything for you. Renewal: 30 EUR/month", duration: "~1 hour" },
      { label: "Annual Subscription - V7.0", price: 250, description: "Full access to FUSION IA V7.0 for 12 months. Includes all updates and priority support.", duration: "~1 hour" },
      { label: "Lifetime License - V7.0", price: 450, description: "Permanent access to FUSION IA V7.0 with all future updates included. One-time payment.", duration: "~1 hour" },
      { label: "Monthly Renewal - V7.0", price: 30, note: "/ month", description: "This price is only for those who already own the AI Aimbot and want to renew their license.", duration: "~30 min" },
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

  const selectedItem = selectedOptionIndex !== null ? product.options[selectedOptionIndex] : null;
  const total = selectedItem?.price ?? 0;
  const isSelfSetupOption = productId === "ai-engine" && (selectedOptionIndex === 0);

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
    const sumupKey = `${productId}-${orderCreated.optionIndex}`;
    const sumupLink = SUMUP_LINKS[sumupKey] || "https://pay.sumup.com/b2c/QLA8WDDD";
    sendDiscordAndEmail(orderCreated, "sumup");
    window.location.href = sumupLink;
  };

  const handleBankTransfer = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "bank_transfer" as "sumup");
    setShowBankTransfer(true);
  };

  const handlePayPalPayment = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "paypal");
    const paypalLink = `${PAYPAL_BASE}/${orderCreated.price}`;
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
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="max-w-2xl">
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">Order</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Complete your <span className="text-violet-tech">Purchase</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Secure checkout for your gaming performance tools.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      <section className="relative py-12 lg:py-20">
        <div className="container">
          {orderCreated ? (
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-xl p-8 lg:p-12 border-violet-tech/30">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-violet-tech/15 border border-violet-tech/20 mx-auto mb-8">
                  <Lock className="w-8 h-8 text-violet-tech" />
                </div>
                <div className="text-center mb-10">
                  <h2 className="font-display font-bold text-2xl mb-2">Select Payment Method</h2>
                  <p className="text-muted-foreground">Order: <span className="text-foreground font-mono">{orderCreated.orderNumber}</span></p>
                </div>

                <div className="grid gap-6">
                  <button onClick={handleSumUpPayment} className="flex items-center justify-between p-6 rounded-lg bg-dark-elevated/50 border border-border/50 hover:border-violet-tech/50 hover:bg-violet-tech/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/5">
                        <CreditCard className="w-6 h-6 text-violet-tech" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-lg">Credit Card (SumUp)</h4>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, AMEX, Apple Pay, Google Pay</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-violet-tech transition-colors" />
                  </button>

                  <button onClick={handlePayPalPayment} className="flex items-center justify-between p-6 rounded-lg bg-dark-elevated/50 border border-border/50 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/5">
                        <MessageCircle className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-lg">PayPal (Friends & Family)</h4>
                        <p className="text-sm text-muted-foreground">Fast and secure payment via PayPal</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-blue-400 transition-colors" />
                  </button>

                  <button onClick={handleBankTransfer} className="flex items-center justify-between p-6 rounded-lg bg-dark-elevated/50 border border-border/50 hover:border-violet-tech/50 hover:bg-violet-tech/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-white/5">
                        <Zap className="w-6 h-6 text-violet-tech" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-display font-bold text-lg">Bank Transfer (SEPA)</h4>
                        <p className="text-sm text-muted-foreground">Direct transfer from your bank account</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-violet-tech transition-colors" />
                  </button>
                </div>

                <div className="mt-10 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    <strong>After payment:</strong> Join our Discord and create a support ticket with your order number. Our team will verify the payment and deliver your product immediately.
                  </p>
                </div>

                {showBankTransfer && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-6 rounded-lg bg-dark-base border border-violet-tech/30">
                    <h4 className="font-display font-bold text-lg mb-4 text-violet-tech">SEPA Transfer Details</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Account Holder", value: BANK_TRANSFER.holder },
                        { label: "Bank", value: BANK_TRANSFER.bank },
                        { label: "IBAN", value: BANK_TRANSFER.iban },
                        { label: "BIC/SWIFT", value: BANK_TRANSFER.bic },
                        { label: "Amount", value: `${orderCreated.price} €` },
                        { label: "Reference", value: orderCreated.orderNumber },
                      ].map((field) => (
                        <div key={field.label} className="flex justify-between items-center gap-4 py-2 border-b border-border/20 last:border-0">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">{field.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono text-foreground">{field.value}</span>
                            <button onClick={() => copyToClipboard(field.value, field.label)} className="p-1.5 hover:bg-white/5 rounded transition-colors">
                              {copiedField === field.label ? <Check className="w-3 h-3 text-green-500" /> : <Clock className="w-3 h-3 text-muted-foreground" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="glass-card rounded-xl p-8 border-border/40">
                  <h2 className="font-display font-bold text-2xl mb-8">Customer Information</h2>

                  {/* Red Alert Box for Steam Only */}
                  {(productId === "ai-engine" || productId === "jitter-script") && (
                    <div className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-red-400 tracking-wide uppercase mb-1">
                          Important: Steam Required
                        </p>
                        <p className="text-xs text-red-300/80 leading-relaxed">
                          Apex Legends must be installed on **STEAM ONLY**. The EA App/Origin version is NOT compatible with our tools. Please ensure you have the correct version before purchasing.
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">First Name</label>
                        <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">Last Name</label>
                        <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">Discord Username</label>
                        <input type="text" name="discordPseudo" required placeholder="username#0000" value={formData.discordPseudo} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-border/20">
                      <h3 className="font-display font-bold text-lg">System Specifications</h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">CPU (Processor)</label>
                          <input type="text" name="cpu" required placeholder="e.g. Intel i7-13700K" value={formData.cpu} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">GPU (Graphics Card)</label>
                          <input type="text" name="gpu" required placeholder="e.g. NVIDIA RTX 3080" value={formData.gpu} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">Operating System</label>
                          <select name="os" value={formData.os} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all">
                            <option value="Windows 10">Windows 10</option>
                            <option value="Windows 11">Windows 11</option>
                          </select>
                        </div>
                        {(productId === "jitter-script" || productId === "ai-engine") && (
                          <div className="space-y-2">
                            <label className="text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">Controller Type</label>
                            <select name="controller" required value={formData.controller} onChange={handleInputChange} className="w-full bg-dark-base border border-border/50 rounded-md px-4 py-2.5 text-sm focus:border-violet-tech focus:ring-1 focus:ring-violet-tech outline-none transition-all">
                              <option value="">Select your controller...</option>
                              <option value="PS5 DualSense">PS5 DualSense</option>
                              <option value="PS5 Edge">PS5 Edge</option>
                              <option value="PS4 DualShock">PS4 DualShock</option>
                              <option value="Xbox Series X/S">Xbox Series X/S</option>
                              <option value="Xbox One">Xbox One</option>
                              <option value="Xbox Elite">Xbox Elite</option>
                              <option value="Gamesir Controller">Gamesir Controller</option>
                              <option value="Other Controller">Other Controller</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 pt-6">
                      {isSelfSetupOption && (
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center mt-1">
                            <input type="checkbox" checked={selfSetupConfirmed} onChange={(e) => setSelfSetupConfirmed(e.target.checked)} className="sr-only" />
                            <div className={`w-5 h-5 border rounded transition-all ${selfSetupConfirmed ? "bg-violet-tech border-violet-tech" : "border-border group-hover:border-violet-tech"}`} />
                            {selfSetupConfirmed && <Check className="absolute w-3.5 h-3.5 text-white left-0.75" />}
                          </div>
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            I understand that I will receive a PDF guide and that I must perform the installation myself. I confirm that OneScript staff will not intervene in the installation process for this specific plan.
                          </span>
                        </label>
                      )}

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center mt-1">
                          <input type="checkbox" checked={hardwareConfirmed} onChange={(e) => setHardwareConfirmed(e.target.checked)} className="sr-only" />
                          <div className={`w-5 h-5 border rounded transition-all ${hardwareConfirmed ? "bg-violet-tech border-violet-tech" : "border-border group-hover:border-violet-tech"}`} />
                          {hardwareConfirmed && <Check className="absolute w-3.5 h-3.5 text-white left-0.75" />}
                        </div>
                        <span className="text-xs text-muted-foreground leading-relaxed">
                          I confirm that my PC meets the hardware requirements (NVIDIA RTX / AMD Native Support) and that I have installed Apex Legends on **STEAM**. I understand that no refunds will be issued for hardware incompatibility.
                        </span>
                      </label>
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full h-12 bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-bold tracking-widest neon-glow">
                      {isLoading ? "PROCESSING..." : "VALIDATE MY INFORMATION"}
                    </Button>
                  </form>
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="glass-card rounded-xl p-6 border-violet-tech/30 sticky top-24">
                  <h3 className="font-display font-bold text-lg mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-border/20">
                      <div className="w-10 h-10 flex items-center justify-center rounded bg-violet-tech/15">
                        <product.icon className="w-5 h-5 text-violet-tech" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Product</p>
                        <p className="text-sm font-bold">{product.name}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-violet-accent">Select Plan</label>
                      <div className="grid gap-2">
                        {product.options.map((option, i) => (
                          <button key={option.label} onClick={() => setSelectedOptionIndex(i)} className={`text-left p-3 rounded-md border transition-all ${selectedOptionIndex === i ? "bg-violet-tech/10 border-violet-tech ring-1 ring-violet-tech/30" : "bg-dark-base border-border/40 hover:border-violet-tech/30"}`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold">{option.label}</span>
                              <span className="text-sm font-display font-extrabold text-violet-tech">{option.price}€</span>
                            </div>
                            {option.description && <p className="text-[10px] text-muted-foreground leading-tight">{option.description}</p>}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-border/20">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Subtotal</span>
                      <span className="text-sm font-medium">{total} €</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Fees</span>
                      <span className="text-sm font-medium">0.00 €</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border/20">
                      <span className="font-display font-bold">Total</span>
                      <span className="font-display font-extrabold text-2xl text-violet-tech">{total} €</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Shield className="w-3 h-3 text-violet-tech" /> Secure encrypted checkout
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Clock className="w-3 h-3 text-violet-tech" /> Instant delivery after verification
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
