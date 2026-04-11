/**
 * Support — Neon Circuit Design
 * Sections: FAQ, Ticket System (Formspree), Documentation
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Headphones,
  MessageSquare,
  BookOpen,
  ChevronDown,
  Send,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgpenar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const faqItems = [
  {
    q: "How do I install FUSION AI?",
    a: "Once your order is placed, you will receive a unique order number by email. You will then need to join our Discord server (https://discord.gg/XV9PhqbA4r) and open a ticket with this number. Our team will then organize the installation with you within a maximum of 24 hours. The installation process takes about 15-30 minutes.",
  },
  {
    q: "Which GPUs are compatible?",
    a: "We recommend NVIDIA RTX 3060 GPUs and above for optimal performance. RTX 4070 and RTX 5060+ offer the best results. Check our Compatibility page for more details.",
  },
  {
    q: "Is a subscription required for FUSION AI?",
    a: "The monthly subscription of €30/month includes regular updates and technical support. The initial €80 license is a one-time payment for installation and configuration.",
  },
  {
    q: "What FPS gain can I expect?",
    a: "The minimum observed gain is 40 to 60 FPS, depending on your hardware configuration. High-end setups (RTX 4070+) generally get the best results.",
  },
  {
    q: "Is Windows Optimization safe for my PC?",
    a: "Yes, all our optimizations are reversible and tested on hundreds of configurations. We only modify non-essential settings and create a restore point before each intervention.",
  },
  {
    q: "Can I get a refund?",
    a: "For FUSION AI, refunds are only possible if your GPU is strictly below RTX 3060 (e.g., RTX 3050 or equivalent/inferior) AND the software does not function correctly after full optimization (including a Windows 10 reinstallation if necessary). No refund will be granted if recommended optimizations are refused. For other products, a 14-day refund policy applies if the product has not been used.", },
  {
    q: "Which Windows version is recommended for FUSION AI?",
    a: "Windows 10 is strongly recommended for GPUs like RTX 3050, RTX 3060, RTX 3070, RTX 4060, RTX 4070 to ensure optimal FUSION AI performance and stability. This recommendation is distinct from refund conditions."  },
  {
    q: "How does technical support work?",
    a: "Our support is available via the ticket system below. We generally respond within 24 hours. For FUSION AI subscribers, support is prioritized.",
  },
];

const docs = [
  {
    title: "Getting Started Guide",
    desc: "Installation and first configuration of your OneScript tools.",
    icon: BookOpen,
    href: "/documentation#fusion-ai-installation",
  },
  {
    title: "Advanced Optimization",
    desc: "Tutorials to get the most out of your setup.",
    icon: BookOpen,
    href: "/documentation#windows-opt-features",
  },
  {
    title: "Troubleshooting",
    desc: "Solutions to common problems and technical FAQ.",
    icon: BookOpen,
    href: "/documentation#fusion-ai-troubleshooting",
  },
  {
    title: "Changelog & Updates",
    desc: "Version history and new features.",
    icon: BookOpen,
    href: "/documentation#changelog",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass-card rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-dark-elevated/30 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-violet-tech flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          <div className="h-px bg-border/30 mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function Support() {
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: ticketForm.name,
          email: ticketForm.email,
          subject: ticketForm.subject,
          message: ticketForm.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        toast.success("Ticket sent successfully!", {
          description: `Subject: ${ticketForm.subject} — We will respond within 24h.`,
        });
        setTicketForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data?.error ?? "Error while sending");
      }
    } catch (err: unknown) {
      setSubmitStatus("error");
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error("Failed to send ticket", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
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
              Support
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              How can we{" "}
              <span className="text-violet-tech neon-text">help you</span>?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              FAQ, ticket system, and full documentation. Our team
              is available to assist you.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
              <MessageSquare className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted-foreground">
                Answers to the most common questions
              </p>
            </div>
          </motion.div>

          <div className="max-w-3xl space-y-3">
            {faqItems.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Ticket System */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-dark-surface/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/15 to-transparent" />
        <div className="relative container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                variants={fadeUp}
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-violet-tech/15 border border-violet-tech/20">
                    <Headphones className="w-5 h-5 text-violet-tech" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl tracking-tight">
                      Create a Ticket
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Response within 24h
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Describe your issue or question and our technical team
                  will respond as soon as possible.
                </p>
                <div className="glass-card rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-4 h-4 text-violet-tech" />
                    <span className="text-sm text-foreground">
                      onescript.fr@proton.me
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can also contact us directly by email.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-3"
            >
              {/* Success Banner */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-green-400 mb-1">
                      Ticket sent successfully!
                    </h4>
                    <p className="text-xs text-green-400/80">
                      Thank you for your message. Our team will respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-400 mb-1">
                      Failed to send ticket
                    </h4>
                    <p className="text-xs text-red-400/80">
                      An error occurred. Please try again or contact us by email.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, name: e.target.value })
                      }
                      className="w-full bg-dark-elevated/50 border border-border/30 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-violet-tech/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, email: e.target.value })
                      }
                      className="w-full bg-dark-elevated/50 border border-border/30 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-violet-tech/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, subject: e.target.value })
                    }
                    className="w-full bg-dark-elevated/50 border border-border/30 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-violet-tech/50 transition-colors"
                    placeholder="Subject of your request"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={ticketForm.message}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, message: e.target.value })
                    }
                    className="w-full bg-dark-elevated/50 border border-border/30 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-violet-tech/50 transition-colors resize-none"
                    placeholder="Describe your problem in detail..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-violet-tech hover:bg-violet-accent text-white font-bold py-6 rounded-md transition-all shadow-lg shadow-violet-tech/20"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Ticket
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="font-display font-bold text-3xl tracking-tight mb-4">
              Need more info?
            </h2>
            <p className="text-muted-foreground">
              Consult our documentation for detailed guides on each tool.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {docs.map((doc, i) => (
              <motion.a
                key={i}
                href={doc.href}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-6 hover:border-violet-tech/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-md bg-violet-tech/10 flex items-center justify-center mb-4 group-hover:bg-violet-tech/20 transition-colors">
                  <doc.icon className="w-5 h-5 text-violet-tech" />
                </div>
                <h4 className="font-bold text-foreground mb-2">{doc.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {doc.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
