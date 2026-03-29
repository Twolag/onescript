/*
 * Booking — Neon Circuit Design
 * Service selection, slot picker, form, Discord notification
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Cpu, Monitor, Gamepad2, Calendar, Clock, ChevronLeft, ChevronRight,
  Check, User, Mail, MessageCircle, AlertCircle, ArrowRight, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "wouter";

const DISCORD_LINK = "https://discord.gg/XV9PhqbA4r";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

// ─── Services ────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  icon: React.ElementType;
  price: number;
  duration: string;
  durationMinutes: number;
  description: string;
  requiresHardware: boolean;
  color: string;
}

const SERVICES: Service[] = [
  {
    id: "fusion-ai",
    name: "FUSION AI — License + Installation",
    icon: Cpu,
    price: 80,
    duration: "~1 hour",
    durationMinutes: 60,
    description: "Remote installation of the AI Aimbot with first month license included.",
    requiresHardware: true,
    color: "#7b2eff",
  },
  {
    id: "windows-reinstall",
    name: "Windows Optimization + Reinstall",
    icon: Monitor,
    price: 40,
    duration: "~2 hours",
    durationMinutes: 120,
    description: "Full Windows reinstallation + complete system optimization. Requires a USB drive of at least 8GB.",
    requiresHardware: true,
    color: "#00c8ff",
  },
  {
    id: "windows-optim",
    name: "Windows Optimization",
    icon: Monitor,
    price: 20,
    duration: "~30 min",
    durationMinutes: 30,
    description: "Full system optimization for maximum performance without reinstalling Windows.",
    requiresHardware: true,
    color: "#00c8ff",
  },
  {
    id: "fusion-ai-renewal",
    name: "FUSION AI — Monthly Renewal",
    icon: Cpu,
    price: 30,
    duration: "~30 min",
    durationMinutes: 30,
    description: "Monthly license renewal for existing FUSION AI users.",
    requiresHardware: false,
    color: "#7b2eff",
  },
];

// ─── Time Slots ───────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateBookingId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BKG-${ts}-${rnd}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isPastDate(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(year, month, day);
  return d < today;
}

function isSunday(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 0;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// ─── Steps ────────────────────────────────────────────────────────────────────

type Step = "service" | "slot" | "info" | "confirm";

// ─── Component ────────────────────────────────────────────────────────────────

export default function Booking() {
  const today = new Date();
  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    discordPseudo: "",
    cpu: "",
    gpu: "",
    os: "Windows 10",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  // ── Calendar helpers ──
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime) return;
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.discordPseudo) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (selectedService.requiresHardware && (!formData.cpu || !formData.gpu)) {
      toast.error("Please fill in your CPU and GPU.");
      return;
    }

    setIsSubmitting(true);
    const id = generateBookingId();
    setBookingId(id);

    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: id,
          customerName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          discordPseudo: formData.discordPseudo,
          serviceName: selectedService.name,
          servicePrice: selectedService.price,
          serviceDuration: selectedService.duration,
          date: selectedDate,
          timeSlot: selectedTime,
          cpu: formData.cpu,
          gpu: formData.gpu,
          os: formData.os,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      setStep("confirm");
    } catch {
      toast.error("An error occurred. Please try again or contact us on Discord.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Format selected date ──
  const formattedDate = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      })
    : null;

  // ── Step indicator ──
  const steps: { id: Step; label: string }[] = [
    { id: "service", label: "Service" },
    { id: "slot", label: "Date & Time" },
    { id: "info", label: "Your Info" },
    { id: "confirm", label: "Confirmation" },
  ];
  const stepIndex = steps.findIndex(s => s.id === step);

  // ── Render ──
  return (
    <div>
      {/* Header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
              Book an <span className="text-violet-tech">Appointment</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose your service, pick a time slot, and we'll confirm your booking within a few hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="relative py-6 border-b border-border/20">
        <div className="relative container">
          <div className="flex items-center justify-center gap-0 max-w-xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                    i < stepIndex
                      ? "bg-violet-tech border-violet-tech text-white"
                      : i === stepIndex
                      ? "border-violet-tech text-violet-tech bg-violet-tech/10"
                      : "border-border/40 text-muted-foreground"
                  }`}>
                    {i < stepIndex ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1 font-medium hidden sm:block ${
                    i === stepIndex ? "text-violet-tech" : "text-muted-foreground"
                  }`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-px flex-1 mx-1 transition-all duration-300 ${
                    i < stepIndex ? "bg-violet-tech" : "bg-border/30"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0 bg-dark-surface/20" />
        <div className="relative container max-w-4xl">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: Service Selection ── */}
            {step === "service" && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-violet-tech" />
                  Choose your service
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {SERVICES.map((service, i) => (
                    <motion.button
                      key={service.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      onClick={() => setSelectedService(service)}
                      className={`text-left p-5 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                        selectedService?.id === service.id
                          ? "border-violet-tech bg-violet-tech/10"
                          : "border-border/40 hover:border-violet-tech/50 bg-dark-elevated/50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2.5 rounded-lg`} style={{ background: `${service.color}20` }}>
                          <service.icon className="w-5 h-5" style={{ color: service.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="font-display font-bold text-foreground text-sm leading-tight">{service.name}</p>
                            {selectedService?.id === service.id && (
                              <div className="w-5 h-5 rounded-full bg-violet-tech flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{service.description}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-violet-tech font-display font-bold text-lg">{service.price}€</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep("slot")}
                    disabled={!selectedService}
                    className="px-8 py-3 font-display font-bold tracking-wider bg-violet-tech hover:bg-violet-secondary text-white neon-glow"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Date & Time ── */}
            {step === "slot" && (
              <motion.div
                key="slot"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-violet-tech" />
                  Choose a date & time
                </h2>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Calendar */}
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={prevMonth}
                        className="p-2 rounded-lg hover:bg-dark-elevated text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="font-display font-bold text-foreground">
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>
                      <button
                        onClick={nextMonth}
                        className="p-2 rounded-lg hover:bg-dark-elevated text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-2">
                      {DAY_NAMES.map(d => (
                        <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    {/* Days grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
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
                            className={`aspect-square rounded-lg text-sm font-medium transition-all duration-150 ${
                              isSelected
                                ? "bg-violet-tech text-white font-bold"
                                : disabled
                                ? "text-muted-foreground/30 cursor-not-allowed"
                                : "hover:bg-violet-tech/20 hover:text-violet-tech text-foreground"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Sundays are unavailable. All times are CET (Paris).
                    </p>
                  </div>

                  {/* Time Slots */}
                  <div>
                    {selectedDate ? (
                      <>
                        <p className="text-sm font-semibold text-foreground mb-4">
                          Available slots for{" "}
                          <span className="text-violet-tech">{formattedDate}</span>
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`py-3 rounded-lg text-sm font-display font-bold border-2 transition-all duration-150 ${
                                selectedTime === slot
                                  ? "border-violet-tech bg-violet-tech text-white"
                                  : "border-border/40 hover:border-violet-tech/60 text-foreground hover:text-violet-tech"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          Slots are indicative. Our team will confirm availability.
                        </p>
                      </>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                        <div className="text-center">
                          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                          <p>Select a date to see available time slots.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setStep("service")}
                    className="px-6"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button
                    onClick={() => setStep("info")}
                    disabled={!selectedDate || !selectedTime}
                    className="px-8 py-3 font-display font-bold tracking-wider bg-violet-tech hover:bg-violet-secondary text-white neon-glow"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Your Info ── */}
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-violet-tech" />
                  Your Information
                </h2>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            First Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text" name="firstName" value={formData.firstName}
                            onChange={handleInputChange} required
                            placeholder="John"
                            className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-tech transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Last Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text" name="lastName" value={formData.lastName}
                            onChange={handleInputChange} required
                            placeholder="Doe"
                            className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-tech transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          <Mail className="w-3.5 h-3.5 inline mr-1" />
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email" name="email" value={formData.email}
                          onChange={handleInputChange} required
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-tech transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
                          Discord Username <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text" name="discordPseudo" value={formData.discordPseudo}
                          onChange={handleInputChange} required
                          placeholder="username#0000 or username"
                          className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-tech transition-colors"
                        />
                      </div>

                      {selectedService?.requiresHardware && (
                        <>
                          <div className="border-t border-border/20 pt-4">
                            <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4 text-violet-tech" />
                              Hardware Configuration
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                  CPU <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text" name="cpu" value={formData.cpu}
                                  onChange={handleInputChange} required
                                  placeholder="Intel i7-12700K"
                                  className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-tech transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                  GPU <span className="text-red-400">*</span>
                                </label>
                                <input
                                  type="text" name="gpu" value={formData.gpu}
                                  onChange={handleInputChange} required
                                  placeholder="RTX 3080"
                                  className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-violet-tech transition-colors"
                                />
                              </div>
                            </div>
                            <div className="mt-4">
                              <label className="block text-sm font-semibold text-foreground mb-2">
                                Operating System
                              </label>
                              <select
                                name="os" value={formData.os} onChange={handleInputChange}
                                className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground focus:outline-none focus:border-violet-tech transition-colors"
                              >
                                <option value="Windows 10">Windows 10</option>
                                <option value="Windows 11">Windows 11</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep("slot")}
                          className="px-6"
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3 font-display font-bold tracking-wider bg-violet-tech hover:bg-violet-secondary text-white neon-glow"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Send Request <ArrowRight className="w-4 h-4" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>

                  {/* Summary */}
                  <div className="space-y-4">
                    <div className="glass-card rounded-xl p-5">
                      <h3 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                        Booking Summary
                      </h3>
                      {selectedService && (
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Service</p>
                            <p className="font-semibold text-foreground text-sm">{selectedService.name}</p>
                          </div>
                          <div className="flex gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Price</p>
                              <p className="font-display font-bold text-violet-tech">{selectedService.price}€</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Duration</p>
                              <p className="font-semibold text-foreground text-sm">{selectedService.duration}</p>
                            </div>
                          </div>
                          {selectedDate && (
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="font-semibold text-foreground text-sm">{formattedDate}</p>
                            </div>
                          )}
                          {selectedTime && (
                            <div>
                              <p className="text-xs text-muted-foreground">Time</p>
                              <p className="font-display font-bold text-foreground">{selectedTime}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="glass-card rounded-xl p-5 border border-violet-tech/20">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-violet-tech" />
                        Your booking request will be reviewed by our team. You'll receive a confirmation email once approved. Payment is made after confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Confirmation ── */}
            {step === "confirm" && submitted && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl mx-auto text-center"
              >
                <div className="glass-card rounded-2xl p-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-violet-tech/20 border-2 border-violet-tech flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-violet-tech" />
                  </motion.div>

                  <h2 className="text-3xl font-display font-bold text-foreground mb-3">
                    Request Sent!
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Your booking request has been sent to our team. We'll review it and send you a confirmation email shortly.
                  </p>

                  <div className="bg-dark-elevated rounded-xl p-4 mb-6 text-left space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Booking ID</span>
                      <span className="font-mono text-violet-tech font-bold">{bookingId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service</span>
                      <span className="text-foreground font-semibold">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="text-foreground">{formattedDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Time</span>
                      <span className="text-foreground font-bold">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="text-violet-tech font-display font-bold">{selectedService?.price}€</span>
                    </div>
                  </div>

                  <div className="bg-violet-tech/10 border border-violet-tech/30 rounded-xl p-4 mb-6 text-sm text-muted-foreground leading-relaxed">
                    Check your email at <strong className="text-foreground">{formData.email}</strong> for updates. Payment will be requested after confirmation.
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={DISCORD_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5865F2] text-white font-display font-bold rounded-lg hover:bg-[#4752C4] transition-colors"
                    >
                      Join Discord
                    </a>
                    <Link href="/purchase">
                      <Button variant="outline" className="w-full sm:w-auto px-6">
                        Go to Purchase
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
