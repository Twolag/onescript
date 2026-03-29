/*
 * Purchase — Neon Circuit Design
 * Product selection, summary, PayPal + SumUp
 * + optional slot picker for installation services (sent to Discord)
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Cpu, Monitor, Gamepad2, Check, Shield, Lock, AlertCircle,
  MessageCircle, CreditCard, Calendar, Clock, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PAYPAL_BASE = "https://www.paypal.me/OneLagTT";
const DISCORD_LINK = "https://discord.gg/XV9PhqbA4r";

// SumUp links by product/option (key = "productId-index")
const SUMUP_LINKS: { [key: string]: string } = {
  "ai-engine-0": "https://pay.sumup.com/b2c/QK3BXCMA",
  "ai-engine-1": "https://pay.sumup.com/b2c/Q8U1ZMJA",
  "windows-opt-0": "https://pay.sumup.com/b2c/QIT9A8T9",
  "windows-opt-1": "https://pay.sumup.com/b2c/QFGYTX08",
  "jitter-script-0": "https://pay.sumup.com/b2c/QFQJ73UM",
  "jitter-script-1": "https://pay.sumup.com/b2c/QIO7OGCV",
  "jitter-script-2": "https://pay.sumup.com/b2c/Q0IRNUOF",
  "jitter-script-3": "https://pay.sumup.com/b2c/QNOJ9MX7",
  "jitter-script-4": "https://pay.sumup.com/b2c/QRLCF29E",
  "jitter-script-5": "https://pay.sumup.com/b2c/QJRAZ96B",
  "jitter-script-6": "https://pay.sumup.com/b2c/QXOU9MD5",
};

// Products that show the slot picker
const BOOKING_PRODUCTS = ["ai-engine", "windows-opt"];

// Time slots: 11h → 22h, lundi–samedi
const TIME_SLOTS = [
  "11:00", "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00", "21:00", "22:00",
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isPastDate(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}
function isSunday(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 0;
}
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
      { label: "License + Installation", price: 80, description: "First month + AI Aimbot installation included", duration: "~1 hour" },
      { label: "Monthly Subscription", price: 30, note: "/ month", description: "This price is only for those who already own the AI Aimbot and want to renew their license.", duration: "~30 min" },
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
      { label: "24h Trial", price: 2.50 },
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
  const productId = searchParams.get("product") || "ai-engine";
  const product = products.find((p) => p.id === productId) || products[0];
  const showSlotPicker = BOOKING_PRODUCTS.includes(productId);

  // ── Form state ──
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", discordPseudo: "",
    cpu: "", gpu: "", os: "Windows 10",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{
    orderNumber: string; productName: string; price: number; optionIndex: number;
  } | null>(null);

  // ── Slot state (optional) ──
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectedItem = selectedOptionIndex !== null ? product.options[selectedOptionIndex] : null;
  const total = selectedItem?.price ?? 0;

  // Calendar helpers
  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  };
  const handleDayClick = (day: number) => {
    if (isPastDate(calYear, calMonth, day)) return;
    if (isSunday(calYear, calMonth, day)) return;
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  };
  const formattedDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ── Validate form → show payment buttons (same as before) ──
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

  const handlePayPalPayment = () => {
    if (!orderCreated) return;
    sendDiscordAndEmail(orderCreated, "paypal");
    const paypalLink = `${PAYPAL_BASE}/${orderCreated.price}`;
    setTimeout(() => { window.open(paypalLink, "_blank"); }, 100);
    toast.success("Redirecting to PayPal...");
  };

  const sendDiscordAndEmail = (order: typeof orderCreated, paymentMethod: "sumup" | "paypal") => {
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

    // Discord notification — includes slot if chosen
    fetch("/api/discord-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: order.orderNumber, customerName, email: formData.email,
        discordPseudo: formData.discordPseudo, productName: product.name,
        optionLabel: selectedItem!.label, price: order.price, paymentMethod,
        cpu: formData.cpu, gpu: formData.gpu, os: formData.os,
        // slot fields (empty string if not chosen)
        requestedDate: selectedDate
          ? new Date(selectedDate + "T12:00:00").toLocaleDateString("fr-FR", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })
          : "",
        requestedTime: selectedTime || "",
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

            {/* Left: Product + Slot Picker + Form */}
            <div className="lg:col-span-2 space-y-8">

              {/* Product Selection */}
              <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
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
                        setSelectedDate(null);
                        setSelectedTime(null);
                      }}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedOptionIndex === idx
                          ? "border-violet-tech bg-violet-tech/10"
                          : "border-border/50 hover:border-violet-tech/50 bg-dark-elevated/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedOptionIndex === idx ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                            {selectedOptionIndex === idx && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{option.label}</p>
                            {option.description && <p className="text-xs text-muted-foreground mt-1">{option.description}</p>}
                            {option.duration && (
                              <p className="text-xs text-violet-tech/70 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3" />{option.duration}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-violet-tech text-lg">{option.price}€</p>
                          {option.note && <p className="text-xs text-muted-foreground">{option.note}</p>}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* ── Slot Picker (optional, only for installation products) ── */}
              {showSlotPicker && selectedOptionIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card rounded-lg p-6"
                >
                  <h2 className="text-2xl font-display font-bold mb-1 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-violet-tech" />
                    Request a Time Slot
                    <span className="text-sm font-normal text-muted-foreground ml-1">(optional)</span>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    You can request a preferred date and time for your remote session. This is optional — our team will contact you on Discord to confirm.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Calendar */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-dark-elevated text-muted-foreground hover:text-foreground transition-colors">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-display font-bold text-sm text-foreground">
                          {MONTH_NAMES[calMonth]} {calYear}
                        </span>
                        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-dark-elevated text-muted-foreground hover:text-foreground transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 mb-1">
                        {DAY_NAMES.map(d => (
                          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-0.5">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const past = isPastDate(calYear, calMonth, day);
                          const sunday = isSunday(calYear, calMonth, day);
                          const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                          const isSelected = selectedDate === dateStr;
                          const disabled = past || sunday;
                          return (
                            <button
                              key={day}
                              onClick={() => handleDayClick(day)}
                              disabled={disabled}
                              className={`aspect-square rounded-md text-xs font-medium transition-all ${
                                isSelected
                                  ? "bg-violet-tech text-white font-bold"
                                  : disabled
                                  ? "text-muted-foreground/25 cursor-not-allowed"
                                  : "hover:bg-violet-tech/20 hover:text-violet-tech text-foreground"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2 text-center">
                        Mon–Sat · 11:00–22:00 CET · Sundays unavailable
                      </p>
                    </div>

                    {/* Time slots */}
                    <div>
                      {selectedDate ? (
                        <>
                          <p className="text-xs font-semibold text-foreground mb-3">
                            Slots for <span className="text-violet-tech">{formattedDate}</span>
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map(slot => (
                              <button
                                key={slot}
                                onClick={() => setSelectedTime(prev => prev === slot ? null : slot)}
                                className={`py-2.5 rounded-lg text-sm font-display font-bold border-2 transition-all ${
                                  selectedTime === slot
                                    ? "border-violet-tech bg-violet-tech text-white"
                                    : "border-border/40 hover:border-violet-tech/60 text-foreground hover:text-violet-tech"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                            <p className="text-xs">Select a date first</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
                <h2 className="text-2xl font-display font-bold mb-6">Your Information</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
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
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Product</span>
                      <span className="text-foreground font-medium">{product.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Option</span>
                      <span className="text-foreground font-medium">{selectedItem?.label || "Not selected"}</span>
                    </div>
                    {selectedDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Requested date</span>
                        <span className="text-foreground font-medium text-right max-w-[140px] leading-tight">{formattedDate}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Requested time</span>
                        <span className="text-violet-tech font-display font-bold">{selectedTime}</span>
                      </div>
                    )}
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
                      <div className="space-y-3">
                        <p className="text-xs text-muted-foreground text-center mb-2">Choose your payment method:</p>
                        <Button type="button" onClick={handleSumUpPayment} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 flex items-center justify-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          PAY BY CARD (SUMUP)
                        </Button>
                        <Button type="button" onClick={handlePayPalPayment} className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-4 flex items-center justify-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          PAY BY PAYPAL
                        </Button>
                      </div>
                      <div className="mt-4 p-3 bg-dark-elevated/50 rounded-lg border border-border/30">
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          <span className="text-violet-tech font-bold">Note:</span> After payment, your order will be processed. You will receive a confirmation email. Join our Discord to finalize the installation.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-dark-elevated/50 rounded-lg border border-dashed border-border/50 text-center">
                      <p className="text-sm text-muted-foreground italic">Please fill in your information to proceed to payment.</p>
                    </div>
                  )}
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-lg text-center">
                    <Shield className="w-6 h-6 text-violet-tech mx-auto mb-2" />
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Secure Payment</p>
                  </div>
                  <div className="glass-card p-4 rounded-lg text-center">
                    <Lock className="w-6 h-6 text-violet-tech mx-auto mb-2" />
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Encrypted Data</p>
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
