/**
 * Support — Neon Circuit Design
 * Sections: FAQ, Ticket System (Widget), Documentation
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Headphones,
  MessageSquare,
  ChevronDown,
  Mail,
} from "lucide-react";
import { useLanguage, type TranslationKey } from "@/i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const faqKeys: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "support.faq1q", a: "support.faq1a" },
  { q: "support.faq2q", a: "support.faq2a" },
  { q: "support.faq3q", a: "support.faq3a" },
  { q: "support.faq4q", a: "support.faq4a" },
  { q: "support.faq5q", a: "support.faq5a" },
  { q: "support.faq6q", a: "support.faq6a" },
  { q: "support.faq7q", a: "support.faq7a" },
  { q: "support.faq8q", a: "support.faq8a" },
  { q: "support.faq9q", a: "support.faq9a" },
  { q: "support.faq10q", a: "support.faq10a" },
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
  const { t } = useLanguage();
  return (
    <div>
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
              {t("support.eyebrow")}
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              {t("support.title")}{" "}
              <span className="text-violet-tech neon-text">{t("support.titleAccent")}</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("support.subtitle")}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

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
                {t("support.faqTitle")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t("support.ticketDesc")}
              </p>
            </div>
          </motion.div>

          <div className="max-w-3xl space-y-3">
            {faqKeys.map((item, i) => (
              <FAQItem key={item.q} q={t(item.q)} a={t(item.a)} index={i} />
            ))}
          </div>
        </div>
      </section>

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
                {t("support.directTitle")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t("support.directDesc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                <div className="glass-card rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="w-5 h-5 text-violet-tech" />
                    <h3 className="font-bold">{t("support.liveChat")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("support.liveChatDesc")}
                  </p>
                </div>

                <div className="glass-card rounded-xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-5 h-5 text-violet-tech" />
                    <h3 className="font-bold">{t("support.emailSupport")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("support.emailSupportDesc")}
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
