/**
 * Support — Neon Circuit Design
 * Sections : FAQ, Système de tickets (Formspree), Documentation
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
    q: "Comment installer FUSION AI ?",
    a: "Une fois votre commande passée, vous recevrez un numéro de commande unique par email. Vous devrez ensuite rejoindre notre serveur Discord (https://discord.gg/cU2kNQxxHu) et ouvrir un ticket en indiquant ce numéro. Notre équipe organisera alors l'installation avec vous sous un délai maximum de 24 heures. Le processus d'installation prend environ 15-30 minutes.",
  },
  {
    q: "Quels GPU sont compatibles ?",
    a: "Nous recommandons les GPU NVIDIA RTX 3060 et supérieur pour des performances optimales. Les RTX 4070 et RTX 5060+ offrent les meilleurs résultats. Consultez notre page Compatibilité pour plus de détails.",
  },
  {
    q: "L'abonnement est-il obligatoire pour FUSION AI ?",
    a: "L'abonnement mensuel de 30 €/mois inclut les mises à jour régulières et le support technique. La licence initiale de 80 € est un paiement unique pour l'installation et la configuration.",
  },
  {
    q: "Quel gain de FPS puis-je espérer ?",
    a: "Le gain minimum constaté est de 40 à 60 FPS, selon votre configuration matérielle. Les configurations High End (RTX 4070+) obtiennent généralement les meilleurs résultats.",
  },
  {
    q: "Windows Optimization est-il sûr pour mon PC ?",
    a: "Oui, toutes nos optimisations sont réversibles et testées sur des centaines de configurations. Nous ne modifions que les paramètres non essentiels et créons un point de restauration avant chaque intervention.",
  },
  {
    q: "Puis-je obtenir un remboursement ?",
    a: "Nous offrons un remboursement sous 14 jours si vous n'êtes pas satisfait. Contactez notre support via le système de tickets pour initier la procédure.",
  },
  {
    q: "Comment fonctionne le support technique ?",
    a: "Notre support est disponible via le système de tickets ci-dessous. Nous répondons généralement sous 24h. Pour les abonnés FUSION AI, le support est prioritaire.",
  },
];

const docs = [
  {
    title: "Guide de démarrage",
    desc: "Installation et première configuration de vos outils OneScript.",
    icon: BookOpen,
    href: "/documentation#fusion-ai-installation",
  },
  {
    title: "Optimisation avancée",
    desc: "Tutoriels pour tirer le maximum de votre configuration.",
    icon: BookOpen,
    href: "/documentation#windows-opt-features",
  },
  {
    title: "Résolution de problèmes",
    desc: "Solutions aux problèmes courants et FAQ technique.",
    icon: BookOpen,
    href: "/documentation#fusion-ai-troubleshooting",
  },
  {
    title: "Changelog & mises à jour",
    desc: "Historique des versions et nouvelles fonctionnalités.",
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
        toast.success("Ticket envoyé avec succès !", {
          description: `Sujet : ${ticketForm.subject} — Nous vous répondrons sous 24h.`,
        });
        setTicketForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data?.error ?? "Erreur lors de l'envoi");
      }
    } catch (err: unknown) {
      setSubmitStatus("error");
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      toast.error("Échec de l'envoi du ticket", {
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
              Comment pouvons-nous{" "}
              <span className="text-violet-tech neon-text">vous aider</span> ?
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              FAQ, système de tickets et documentation complète. Notre équipe
              est disponible pour vous accompagner.
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
                Questions fréquentes
              </h2>
              <p className="text-sm text-muted-foreground">
                Les réponses aux questions les plus posées
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
                      Créer un ticket
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Réponse sous 24h
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Décrivez votre problème ou votre question et notre équipe
                  technique vous répondra dans les plus brefs délais.
                </p>
                <div className="glass-card rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="w-4 h-4 text-violet-tech" />
                    <span className="text-sm text-foreground">
                      onescript@outlook.fr
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Vous pouvez aussi nous contacter directement par email.
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
              {/* Bannière de succès */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-3 mb-5 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Votre ticket a bien été envoyé ! Nous vous répondrons sous 24h.
                  </p>
                </div>
              )}

              {/* Bannière d'erreur */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-3 mb-5 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
                  </p>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-lg p-6 lg:p-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Nom
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketForm.name}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketForm.email}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Sujet
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                    placeholder="Sujet de votre demande"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={ticketForm.message}
                    onChange={(e) =>
                      setTicketForm({ ...ticketForm, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none resize-none"
                    placeholder="Décrivez votre problème ou votre question..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ENVOI EN COURS...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      ENVOYER LE TICKET
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation */}
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
              <BookOpen className="w-5 h-5 text-violet-tech" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl tracking-tight">
                Documentation
              </h2>
              <p className="text-sm text-muted-foreground">
                Guides et tutoriels
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {docs.map((doc, i) => (
              <motion.div
                key={doc.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-lg p-6 hover:border-violet-tech/30 transition-colors duration-300 cursor-pointer group"
                onClick={() => window.location.href = doc.href}
              >
                <doc.icon className="w-5 h-5 text-violet-tech mb-3" />
                <h4 className="font-display font-semibold text-sm tracking-wide mb-1 group-hover:text-violet-tech transition-colors">
                  {doc.title}
                </h4>
                <p className="text-xs text-muted-foreground">{doc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
