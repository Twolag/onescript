/*
 * Purchase — Neon Circuit Design
 * Product selection, summary — Stripe (card) + PayPal.me
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Cpu, Monitor, Gamepad2, Check, Shield, Lock, AlertCircle,
  MessageCircle, CreditCard, Keyboard, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage, type TranslationKey } from "@/i18n/LanguageContext";

const PAYPAL_BASE = "https://www.paypal.me/OneLagTT";
const DISCORD_LINK = "https://discord.gg/5btq6znUvN";

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

interface ProductOption {
  labelKey: TranslationKey;
  descKey?: TranslationKey;
  noteKey?: TranslationKey;
  durationKey?: TranslationKey;
  price: number;
  /** Crossed-out original price (promo display) */
  compareAtPrice?: number;
}

interface Product {
  id: string;
  nameKey?: TranslationKey;
  /** Brand / untranslated fallback name */
  name: string;
  icon: React.ElementType;
  options: ProductOption[];
}

const products: Product[] = [
  {
    id: "ai-engine",
    name: "FUSION AI",
    icon: Cpu,
    options: [
      { labelKey: "plans.week", price: 19.99, descKey: "plans.weekDesc", durationKey: "plans.dur1h" },
      { labelKey: "plans.month", price: 39.99, descKey: "plans.monthDesc", durationKey: "plans.dur1h" },
      { labelKey: "plans.lifetime", price: 79.99, compareAtPrice: 100, descKey: "plans.lifetimeDesc", durationKey: "plans.dur1h" },
      { labelKey: "plans.ultimate", price: 124.99, compareAtPrice: 175.99, descKey: "plans.ultimateDesc", durationKey: "plans.dur1h" },
      { labelKey: "plans.addonApex", price: 10, descKey: "plans.addonApexDesc", durationKey: "plans.durInstant" },
      { labelKey: "plans.addonFortnite", price: 10, descKey: "plans.addonFortniteDesc", durationKey: "plans.durInstant" },
    ],
  },
  {
    id: "windows-opt",
    name: "Windows Optimization",
    nameKey: "plans.windowsOptName",
    icon: Monitor,
    options: [
      { labelKey: "plans.winSimple", price: 20, descKey: "plans.winSimpleDesc", durationKey: "plans.dur30m" },
      { labelKey: "plans.winFull", price: 40, descKey: "plans.winFullDesc", durationKey: "plans.dur2h" },
    ],
  },
  {
    id: "jitter-script",
    name: "Jitter Script",
    nameKey: "nav.jitterScript",
    icon: Gamepad2,
    options: [
      { labelKey: "plans.jitter1d", price: 2.5 },
      { labelKey: "plans.jitter1w", price: 5 },
      { labelKey: "plans.jitter1m", price: 15 },
      { labelKey: "plans.jitter3m", price: 20 },
      { labelKey: "plans.jitter6m", price: 25 },
      { labelKey: "plans.jitter1y", price: 30 },
      { labelKey: "plans.jitterLife", price: 40 },
    ],
  },
  {
    id: "onestate-rp",
    name: "Onestate RP",
    nameKey: "plans.onestate",
    icon: Smartphone,
    options: [
      {
        labelKey: "plans.onestate",
        price: 10,
        descKey: "plans.onestateDesc",
        durationKey: "plans.durInstant",
      },
    ],
  },
];

function formatEuro(amount: number) {
  return `${amount.toFixed(2).replace(/\.00$/, "")}€`;
}

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
    : rawProductId === "onestate" || rawProductId === "onestate-rp" ? "onestate-rp"
    : rawProductId;
  const isOnestate = productId === "onestate-rp";
  const product = products.find((p) => p.id === productId) || products[0];
  const rawGame = (searchParams.get("game") || "").toLowerCase();
  const selectedGame = GAME_LABELS[rawGame] || null;
  const productDisplayName = product.nameKey ? t(product.nameKey) : product.name;
  const displayProductName = selectedGame && productId === "ai-engine"
    ? `${selectedGame} — ${t("home.aiAimbot")}`
    : productDisplayName;

  const resolveOption = (option: ProductOption) => ({
    label: t(option.labelKey),
    description: option.descKey ? t(option.descKey) : undefined,
    note: option.noteKey ? t(option.noteKey) : undefined,
    duration: option.durationKey ? t(option.durationKey) : undefined,
    price: option.price,
    compareAtPrice: option.compareAtPrice,
  });

  // ── Form state ──
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    email: "", discordPseudo: "", onestatePseudo: "",
  });
  const [termsConfirmed, setTermsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{
    orderNumber: string; productName: string; price: number; optionIndex: number;
  } | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);

  // ── AI Aimbot plan selection ──
  const [aiDuration, setAiDuration] = useState<string>("week"); // week, month, lifetime, ultimate, addon
  const [aiAddonType, setAiAddonType] = useState<string>(
    rawGame === "fortnite" ? "fortnite" : "apex"
  );

  useEffect(() => {
    if (productId === "ai-engine") {
      let index = 0;
      if (aiDuration === "week") index = 0;
      else if (aiDuration === "month") index = 1;
      else if (aiDuration === "lifetime") index = 2;
      else if (aiDuration === "ultimate") index = 3;
      else if (aiDuration === "addon") index = aiAddonType === "apex" ? 4 : 5;
      setSelectedOptionIndex(index);
    } else if (isOnestate) {
      setSelectedOptionIndex(0);
    }
  }, [productId, isOnestate, aiDuration, aiAddonType]);

  const selectedOption = selectedOptionIndex !== null ? product.options[selectedOptionIndex] : null;
  const selectedItem = selectedOption ? resolveOption(selectedOption) : null;
  let total = selectedItem?.price ?? 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseOk = !!formData.email.trim() && !!formData.discordPseudo.trim();
    const onestateOk = !isOnestate || !!formData.onestatePseudo.trim();
    if (!baseOk || !onestateOk) {
      toast.error(t("purchase.fillAll"));
      return;
    }
    if (selectedOptionIndex === null) {
      toast.error(t("purchase.selectOption"));
      return;
    }
    if (!termsConfirmed) {
      toast.error(isOnestate ? t("purchase.confirmDonation") : t("purchase.confirmHardware"));
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

  const handleStripePayment = async () => {
    if (!orderCreated || selectedOptionIndex === null) return;
    setStripeLoading(true);
    try {
      const customerName = formData.discordPseudo.trim();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          optionIndex: selectedOptionIndex,
          customerEmail: formData.email,
          customerName,
          discordPseudo: formData.discordPseudo,
          onestatePseudo: isOnestate ? formData.onestatePseudo.trim() : "",
          orderNumber: orderCreated.orderNumber,
          game: selectedGame || "",
          cpu: "",
          gpu: "",
          os: "",
          inputMethod: "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || t("purchase.errorGeneric"));
      }
      // Discord only after real payment (see /success → /api/checkout action=fulfill)
      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : t("purchase.errorGeneric"));
      setStripeLoading(false);
    }
  };

  const notifyPendingOrder = (paymentMethod: string) => {
    if (!orderCreated || !selectedItem) return;
    const customerName = formData.discordPseudo.trim();

    fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: formData.email,
        props: {
          orderNumber: orderCreated.orderNumber,
          customerName,
          customerEmail: formData.email,
          productName: displayProductName,
          productOption: selectedItem.label,
          discordPseudo: formData.discordPseudo,
          onestatePseudo: isOnestate ? formData.onestatePseudo.trim() : "",
          price: orderCreated.price,
          cpu: "",
          gpu: "",
          os: "",
          inputMethod: "",
        },
      }),
    }).catch(console.error);

    fetch("/api/discord-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: orderCreated.orderNumber,
        customerName,
        email: formData.email,
        discordPseudo: formData.discordPseudo,
        onestatePseudo: isOnestate ? formData.onestatePseudo.trim() : "",
        productName: displayProductName,
        optionLabel: selectedItem.label,
        price: orderCreated.price,
        paymentMethod,
        cpu: "",
        gpu: "",
        os: "",
        inputMethod: "",
        selfSetupConfirmed: "N/A",
      }),
    }).catch(console.error);
  };

  const handlePayPalPayment = () => {
    if (!orderCreated) return;
    notifyPendingOrder("paypal");
    const paypalLink = `${PAYPAL_BASE}/${Number(total).toFixed(2)}`;
    setTimeout(() => {
      window.open(paypalLink, "_blank");
    }, 100);
    toast.success(t("purchase.payPaypalHint"));
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
                {productId === "ai-engine" && (
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
                        {" "}{t("purchase.minGpu")}
                        {" "}{t("purchase.pcOnly")}
                        {" "}{t("purchase.screen1080")}
                        {(!selectedGame || selectedGame === "Apex Legends") && (
                          <>{" "}{t("purchase.steamOnly")}</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {productId === "jitter-script" && (
                  <div className="mb-8">
                    <div className="p-5 rounded-lg bg-emerald-900/20 border border-emerald-500/35">
                      <div className="flex items-center gap-3 mb-2">
                        <Gamepad2 className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-sm font-bold text-emerald-400 tracking-wider uppercase">
                          {t("purchase.controllerOnly")}
                        </h3>
                      </div>
                      <p className="text-sm text-emerald-100/90 leading-relaxed">
                        {t("purchase.controllerOnlyDesc")}
                      </p>
                    </div>
                  </div>
                )}
                
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <product.icon className="w-6 h-6 text-violet-tech" />
                  {displayProductName} — {t("purchase.selectPlan")}
                </h2>

                {productId === "ai-engine" ? (
                  /* ASTRAL-STYLE VARIANT SELECTOR */
                  <div className="space-y-6">
                    {selectedItem && aiDuration !== "addon" && (
                      <div className="flex items-end justify-between gap-4 p-4 rounded-xl bg-dark-elevated/80 border border-border/40">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                            {selectedItem.label}
                          </p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-display font-bold text-foreground">
                              {formatEuro(selectedItem.price)}
                            </span>
                            {selectedItem.compareAtPrice != null && (
                              <span className="text-lg text-muted-foreground line-through decoration-2">
                                {formatEuro(selectedItem.compareAtPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-emerald-400 border border-emerald-500/40 bg-emerald-500/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {t("purchase.inStock")}
                        </span>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-bold text-violet-accent tracking-widest uppercase mb-3 block">
                        {t("purchase.variant")}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(
                          [
                            { id: "week", index: 0 },
                            { id: "month", index: 1 },
                            { id: "lifetime", index: 2 },
                            { id: "ultimate", index: 3 },
                          ] as const
                        ).map((d) => {
                          const opt = product.options[d.index];
                          const active = aiDuration === d.id;
                          return (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => setAiDuration(d.id)}
                              className={`flex items-center justify-between gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                                active
                                  ? "border-violet-tech bg-violet-tech/10 shadow-[0_0_20px_rgba(123,46,255,0.15)]"
                                  : "border-border/50 hover:border-violet-tech/40 bg-dark-elevated/50"
                              }`}
                            >
                              <span className={`text-sm font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>
                                {t(opt.labelKey)}
                              </span>
                              <span className="flex items-center gap-2 shrink-0">
                                {opt.compareAtPrice != null && (
                                  <span className="text-xs text-muted-foreground line-through">
                                    {formatEuro(opt.compareAtPrice)}
                                  </span>
                                )}
                                <span className={`text-base font-display font-bold ${active ? "text-violet-tech" : "text-foreground"}`}>
                                  {formatEuro(opt.price)}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => setAiDuration("addon")}
                        className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg border text-left transition-all ${
                          aiDuration === "addon"
                            ? "border-amber-500/60 bg-amber-500/10"
                            : "border-border/40 hover:border-amber-500/40 bg-dark-elevated/30"
                        }`}
                      >
                        <span className="text-xs font-semibold text-muted-foreground">
                          {t("purchase.addon")}
                        </span>
                        <span className="text-sm font-bold text-amber-400">10€</span>
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {aiDuration === "addon" && (
                        <motion.div
                          key="addon"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <label className="text-xs font-bold text-violet-accent tracking-widest uppercase mb-3 block">
                            {t("purchase.selectAddonGame")}
                          </label>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setAiAddonType("apex")}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                                aiAddonType === "apex" ? "border-violet-tech bg-violet-tech/10" : "border-border/50 bg-dark-elevated/50"
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${aiAddonType === "apex" ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                                {aiAddonType === "apex" && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className="font-bold text-foreground">Apex Legends</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setAiAddonType("fortnite")}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                                aiAddonType === "fortnite" ? "border-violet-tech bg-violet-tech/10" : "border-border/50 bg-dark-elevated/50"
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

                    {selectedItem && (
                      <motion.div
                        key={selectedOptionIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 rounded-xl bg-dark-elevated/60 border border-border/40 space-y-2 text-sm"
                      >
                        <div className="flex justify-between gap-3">
                          <span className="text-muted-foreground">{selectedItem.label}</span>
                          <span className="font-semibold text-foreground">{formatEuro(selectedItem.price)}</span>
                        </div>
                        <div className="flex justify-between gap-3 pt-2 border-t border-border/30">
                          <span className="font-bold text-foreground">{t("purchase.total")}</span>
                          <span className="font-display font-bold text-lg text-violet-tech">{formatEuro(selectedItem.price)}</span>
                        </div>
                        {selectedItem.description && (
                          <p className="text-xs text-muted-foreground leading-relaxed pt-2">{selectedItem.description}</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  /* DEFAULT SELECTOR FOR OTHER PRODUCTS */
                  <div className="space-y-3">
                    {product.options.map((option, idx) => {
                      const resolved = resolveOption(option);
                      return (
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
                              <p className="font-semibold text-foreground">{resolved.label}</p>
                              {resolved.description && <p className="text-xs text-muted-foreground mt-1">{resolved.description}</p>}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-display font-bold text-lg text-violet-tech">{formatEuro(resolved.price)}</p>
                            {resolved.note && <p className="text-xs text-muted-foreground">{resolved.note}</p>}
                          </div>
                        </div>
                      </motion.button>
                      );
                    })}
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
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.email")}</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.discordPseudo")}</label>
                      <input type="text" name="discordPseudo" value={formData.discordPseudo} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="john_doe" />
                    </div>
                  </div>

                  {isOnestate && (
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t("purchase.onestatePseudo")}</label>
                      <input
                        type="text"
                        name="onestatePseudo"
                        value={formData.onestatePseudo}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-yellow-400/40 text-foreground text-sm placeholder:text-muted-foreground focus:border-yellow-400/70 focus:ring-1 focus:ring-yellow-400/30 transition-colors outline-none"
                        placeholder="Pseudo Onestate"
                      />
                    </div>
                  )}

                  {/* One confirmation checkbox (hardware / donation + final sale) */}
                  {!isOnestate ? (
                  <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-500/30">
                    <div className="flex gap-3 mb-4">
                      <span className="text-xl flex-shrink-0">⚠️</span>
                      <div className="text-sm text-amber-200/90 leading-relaxed">
                        <strong className="text-amber-400 block mb-1">{t("purchase.importantReminder")}</strong>
                        <p>{t("purchase.importantReminderBody")}</p>
                      </div>
                    </div>

                    <label
                      htmlFor="terms-check"
                      className="flex items-start gap-4 pt-4 border-t border-amber-500/20 cursor-pointer select-none"
                    >
                      <input
                        id="terms-check"
                        type="checkbox"
                        checked={termsConfirmed}
                        onChange={(e) => setTermsConfirmed(e.target.checked)}
                        className="mt-0.5 w-7 h-7 shrink-0 rounded border-amber-500/50 bg-dark-elevated text-amber-500 focus:ring-amber-500/30 transition-all cursor-pointer"
                      />
                      <span className="text-sm text-amber-100 font-medium leading-relaxed">
                        {t("purchase.hardwareConfirm")}
                      </span>
                    </label>
                  </div>
                  ) : (
                  <label
                    htmlFor="donation-check"
                    className="flex items-start gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-400/35 cursor-pointer select-none"
                  >
                    <input
                      id="donation-check"
                      type="checkbox"
                      checked={termsConfirmed}
                      onChange={(e) => setTermsConfirmed(e.target.checked)}
                      className="mt-0.5 w-7 h-7 shrink-0 rounded border-yellow-400/50 bg-dark-elevated text-yellow-400 focus:ring-yellow-400/30 transition-all cursor-pointer"
                    />
                    <span className="text-sm text-yellow-100/95 leading-relaxed">
                      {t("products.onestateDonation")}
                    </span>
                  </label>
                  )}

                  <Button type="submit" disabled={isLoading} className="w-full bg-violet-tech hover:bg-violet-accent text-white font-bold py-6 rounded-md transition-all shadow-lg shadow-violet-tech/20">
                    {isLoading ? t("purchase.processing") : t("purchase.proceed")}
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Right: RP2350A + Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {productId === "ai-engine" && (
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
                      <span className="text-2xl font-display font-bold text-violet-tech">{formatEuro(total)}</span>
                    </div>
                  </div>

                  {orderCreated ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-violet-tech/10 border border-violet-tech/20 rounded-lg">
                        <p className="text-xs text-violet-tech font-bold uppercase tracking-wider mb-1">{t("purchase.orderNumber")}</p>
                        <p className="text-sm font-mono font-bold text-foreground">{orderCreated.orderNumber}</p>
                      </div>
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
                          <Button
                            type="button"
                            onClick={handlePayPalPayment}
                            className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-4 flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            {t("purchase.payPaypal")}
                          </Button>
                          <p className="text-[10px] text-center text-blue-400/80 font-bold uppercase tracking-widest">
                            {t("purchase.payPaypalHint")}
                          </p>
                        </div>
                      </div>

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
