/**
 * Support — Neon Circuit Design
 * Sections: FAQ, Ticket System (Widget), Documentation
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Headphones,
  MessageSquare,
  BookOpen,
  ChevronDown,
  Mail,
} from "lucide-react";

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
    a: "Once your order is placed, you will receive a unique order number by email. You will then need to join our Discord server (https://discord.gg/5btq6znUvN) and open a ticket with this number. Our team will then organize the installation with you within a maximum of 24 hours. The installation process takes about 15-30 minutes. V8 features a 10x more powerful AI Aimbot with exceptional performance on both NVIDIA and AMD platforms.",
  },
  {
    q: "Which GPUs are compatible?",
    a: "We recommend NVIDIA RTX 3060+ and AMD RX 6600 XT+ for optimal performance. RTX 4070 and RTX 5060+ offer the best NVIDIA results. AMD RX 6700 XT and RX 7000 series offer exceptional V8 performance. Check our Compatibility page for more details.",
  },
  {
    q: "Is a subscription required for FUSION AI?",
    a: "The monthly subscription of €30/month includes regular updates and technical support. The initial €80 license is a one-time payment for installation and configuration. V8 includes all the latest features with 10x more powerful AI Aimbot.",
  },
  {
    q: "What FPS gain can I expect?",
    a: "The minimum observed gain is 40 to 60 FPS, depending on your hardware configuration.",
  },
  {
    q: "Is Windows Optimization safe for my PC?",
    a: "Yes, all our optimizations are reversible and tested on hundreds of configurations. We only modify non-essential settings and create a restore point before each intervention.",
  },
  {
    q: "Can I get a refund?",
    a: "For FUSION AI, refunds are only possible if your GPU is strictly below RTX 3060 for NVIDIA (e.g., RTX 3050) or below RX 6600 XT for AMD AND the software does not function correctly after full optimization (including a Windows 10 reinstallation if necessary). No refund will be granted if recommended optimizations are refused. It is the customer's sole responsibility to ensure their hardware meets the necessary specifications before purchase. Purchases made with non-compliant configurations are considered final. ***IMPORTANT:*** No refund will be processed or accepted if the malfunction is due to the customer's PC (hardware, drivers, third-party software, OS, antivirus, etc.) or its components. Refunds are ONLY applicable if the malfunction is proven to be directly and solely caused by the OneScript software itself. For other products, a 14-day refund policy applies if the product has not been used.", },
  {
    q: "Which Windows version is recommended for FUSION AI?",
    a: "Windows 10 is strongly recommended for GPUs like RTX 3050, RTX 3060, RTX 3070, RTX 4060, RTX 4070, and AMD RX 6600 XT / 6700 XT to ensure optimal FUSION AI V8 performance and stability. This recommendation is distinct from refund conditions."  },
  {
    q: "How does technical support work?",
    a: "Our support is available via the chat widget at the bottom right of your screen. We generally respond within 24 hours. For FUSION AI subscribers, support is prioritized.",
  },
  {
    q: "Are Jitter Script and AI Aimbot compatible with keyboard and mouse?",
    a: "No, OneScript solutions are strictly controller-only (PS5, Xbox, Gamesir, etc.). Keyboard and mouse are not supported on any game.",
  },
  {
    q: "Which controllers are supported?",
    a: "We support Xbox controllers, PlayStation 5 controllers, PlayStation 5 Edge controllers, and Gamesir controllers. During checkout, you will be asked to specify which controller you are using. If you have a different controller model, please select 'Other' and contact our support team via Discord for compatibility verification.",
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
              FAQ, live chat, and full documentation. Our team
              is available to assist you via the help bubble.
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

      {/* New Support Section */}
      <section className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-dark-surface/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/15 to-transparent" />
        <div className="relative container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-tech/15 border border-violet-tech/20 mb-6">
                <Headphones className="w-8 h-8 text-violet-tech" />
              </div>
              <h2 className="font-display font-bold text-3xl tracking-tight mb-4">
                Need direct assistance?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Our support team is now available directly via the help bubble at the bottom right of your screen. 
                You can chat with us in real-time or leave a message if we are offline.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="glass-card rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="w-5 h-5 text-violet-tech" />
                    <h3 className="font-bold">Live Chat</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers for your technical questions or installation help.
                  </p>
                </div>
                
                <div className="glass-card rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-violet-tech" />
                    <h3 className="font-bold">Email Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You can also reach us at <span className="text-violet-tech">onescript.fr@proton.me</span> for any inquiries.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
