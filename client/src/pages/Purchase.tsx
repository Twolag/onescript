/**
 * Purchase — Neon Circuit Design
 * Sélection produit, récapitulatif, formulaire de paiement avec Stripe
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import emailjs from "@emailjs/browser";
import {
  Zap,
  Cpu,
  Monitor,
  Gamepad2,
  Check,
  Shield,
  CreditCard,
  Lock,
  AlertCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Initialize EmailJS
emailjs.init("9IFBv8D5o7NBxRjbq");

// Stripe public key
const STRIPE_PUBLIC_KEY = "pk_test_51T83TKFrlYRU1NT9p1uI3nnJlJiaIdvDwdYuHrjhkKLHa1LgcpjQghNDNIYG2oPqy6x5EjQXsox6msXsX86FL5WA00DepDnP2x";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const DISCORD_LINK = "https://discord.gg/cU2kNQxxHu";
const EMAILJS_SERVICE_ID = "service_kiuxijv";
const EMAILJS_TEMPLATE_ID = "template_37cc9eo";

interface Product {
  id: string;
  name: string;
  icon: React.ElementType;
  options: { label: string; price: number; note?: string; description?: string; stripeId: string }[];
  isAIAimbot?: boolean;
}

const products: Product[] = [
  {
    id: "ai-engine",
    name: "FUSION AI",
    icon: Cpu,
    isAIAimbot: true,
    options: [
      { 
        label: "Licence + Installation", 
        price: 80,
        description: "Premier mois + installation de l'AI Aimbot inclus",
        stripeId: "ai-engine-install"
      },
      { 
        label: "Abonnement mensuel", 
        price: 30, 
        note: "/ mois",
        description: "Renouvellement mensuel uniquement",
        stripeId: "ai-engine-renewal"
      },
    ],
  },
  {
    id: "windows-opt",
    name: "Windows Optimization",
    icon: Monitor,
    options: [
      { label: "Optimisation simple", price: 10, stripeId: "windows-opt-simple" },
      { label: "Optimisation + réinstall. Windows", price: 20, stripeId: "windows-opt-full" },
    ],
  },
  {
    id: "jitter-script",
    name: "Jitter Script",
    icon: Gamepad2,
    options: [
      { label: "Essai 24h", price: 2.5, stripeId: "jitter-24h" },
      { label: "1 semaine", price: 5, stripeId: "jitter-1week" },
      { label: "1 mois", price: 15, stripeId: "jitter-1month" },
      { label: "3 mois", price: 20, stripeId: "jitter-3months" },
      { label: "6 mois", price: 25, stripeId: "jitter-6months" },
      { label: "1 an", price: 30, stripeId: "jitter-1year" },
      { label: "À vie", price: 40, stripeId: "jitter-lifetime" },
    ],
  },
];

// Générer un numéro de commande unique
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `OS-${timestamp}${random}`.substring(0, 15);
}

export default function Purchase() {
  const [selectedProduct, setSelectedProduct] = useState<string>("ai-engine");
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(["Licence + Installation"])
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const product = products.find((p) => p.id === selectedProduct)!;

  const toggleOption = (label: string) => {
    const next = new Set(selectedOptions);
    if (next.has(label)) {
      next.delete(label);
    } else {
      next.add(label);
    }
    setSelectedOptions(next);
  };

  const selectedItems = product.options.filter((o) => selectedOptions.has(o.label));
  const total = selectedItems.reduce((sum, o) => sum + o.price, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Veuillez sélectionner au moins une option");
      return;
    }

    setIsLoading(true);

    try {
      // Charger Stripe
      const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
      if (!stripe) {
        throw new Error("Impossible de charger Stripe");
      }

      // Préparer les articles pour Stripe
      const items = selectedItems.map((item) => ({
        name: `${product.name} - ${item.label}`,
        description: item.description || "",
        price: Math.round(item.price * 100), // Convertir en cents
      }));

      // Créer la session de paiement
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement");
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error("Pas d'URL de paiement reçue");
      }

      // Rediriger vers la page de paiement Stripe
      window.location.href = url;
    } catch (error) {
      console.error("Erreur:", error);
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      toast.error("Erreur lors du paiement", {
        description: message,
      });
    } finally {
      setIsLoading(false);
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
              Achat
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Passez à la{" "}
              <span className="text-violet-tech neon-text">vitesse supérieure</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Sélectionnez votre produit, choisissez vos options et procédez au
              paiement sécurisé. Vous recevrez votre numéro de commande par email.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Purchase flow */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Product selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Choose product */}
              <motion.div
                variants={fadeUp}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                <h3 className="font-display font-bold text-lg tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-md bg-violet-tech text-xs font-bold text-white">
                    1
                  </span>
                  Choisissez votre produit
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p.id);
                        setSelectedOptions(new Set([p.options[0].label]));
                      }}
                      className={`glass-card rounded-lg p-5 text-left transition-all duration-200 ${
                        selectedProduct === p.id
                          ? "border-violet-tech/60 ring-1 ring-violet-tech/20 bg-violet-tech/5"
                          : "hover:border-violet-tech/20"
                      }`}
                    >
                      <p.icon
                        className={`w-5 h-5 mb-3 ${
                          selectedProduct === p.id
                            ? "text-violet-tech"
                            : "text-muted-foreground"
                        }`}
                      />
                      <h4 className="font-display font-semibold text-sm tracking-wide">
                        {p.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        À partir de {p.options[0].price} €
                      </p>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 2: Choose options */}
              <motion.div
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate="visible"
              >
                <h3 className="font-display font-bold text-lg tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-md bg-violet-tech text-xs font-bold text-white">
                    2
                  </span>
                  Sélectionnez vos options
                </h3>
                <div className="space-y-3">
                  {product.options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => toggleOption(option.label)}
                      className={`w-full glass-card rounded-lg p-5 flex items-center justify-between transition-all duration-200 ${
                        selectedOptions.has(option.label)
                          ? "border-violet-tech/60 ring-1 ring-violet-tech/20 bg-violet-tech/5"
                          : "hover:border-violet-tech/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            selectedOptions.has(option.label)
                              ? "bg-violet-tech border-violet-tech"
                              : "border-border/50"
                          }`}
                        >
                          {selectedOptions.has(option.label) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="text-left">
                          <span className="text-sm font-medium text-foreground block">
                            {option.label}
                          </span>
                          {option.description && (
                            <span className="text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-display font-bold text-foreground ml-4 flex-shrink-0">
                        {option.price} €
                        {option.note && (
                          <span className="text-xs font-normal text-muted-foreground ml-1">
                            {option.note}
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* AI Aimbot Info */}
              {product.isAIAimbot && (
                <motion.div
                  variants={fadeUp}
                  custom={1.5}
                  initial="hidden"
                  animate="visible"
                  className="glass-card rounded-lg p-5 border-l-2 border-violet-tech"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-violet-tech flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-semibold text-sm text-foreground mb-2">
                        Compatibilité AI Aimbot
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        <strong>Disponible maintenant:</strong> Steam, Apex Legends, Call of Duty
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <strong>En développement:</strong> Autres plateformes seront ajoutées prochainement
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment form */}
              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate="visible"
              >
                <h3 className="font-display font-bold text-lg tracking-wide mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-md bg-violet-tech text-xs font-bold text-white">
                    3
                  </span>
                  Vos informations
                </h3>
                <form onSubmit={handleCheckout} className="glass-card rounded-lg p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                      placeholder="jean@email.com"
                    />
                  </div>

                  <div className="glass-card rounded-lg p-4 mb-6 bg-blue-500/5 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                          Paiement sécurisé via Stripe
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Vous serez redirigé vers la page de paiement sécurisée de Stripe. Vos données bancaires ne sont jamais stockées sur notre serveur.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={total === 0 || isLoading}
                    className="w-full bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Redirection vers Stripe...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        PAYER {total} € VIA STRIPE
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Paiement sécurisé
                    </span>
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3" /> SSL chiffré
                    </span>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right: Order summary */}
            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <div className="sticky top-24 glass-card rounded-lg p-6">
                <h3 className="font-display font-bold text-base tracking-wide mb-6 pb-4 border-b border-border/30">
                  Récapitulatif
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <product.icon className="w-5 h-5 text-violet-tech" />
                    <span className="font-medium text-sm text-foreground">
                      {product.name}
                    </span>
                  </div>

                  {selectedItems.map((o) => (
                    <div
                      key={o.label}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{o.label}</span>
                      <span className="font-medium text-foreground">
                        {o.price} €
                        {o.note && (
                          <span className="text-xs text-muted-foreground">
                            {o.note}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/30 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-sm tracking-wide">
                      Total
                    </span>
                    <span className="font-display font-extrabold text-2xl text-violet-tech">
                      {total} €
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Numéro de commande généré",
                    "Email de confirmation envoyé",
                    "Support Discord 24/7",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <Check className="w-3.5 h-3.5 text-violet-tech flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                {/* Instructions */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Après votre paiement :
                  </p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Recevez votre numéro de commande par email</li>
                    <li>Rejoignez notre Discord</li>
                    <li>Créez un ticket avec votre numéro</li>
                    <li>Nous vous répondrons sous 24h</li>
                  </ol>
                </div>

                {/* Discord Link */}
                <div className="mt-4">
                  <a
                    href={DISCORD_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-violet-tech/10 border border-violet-tech/30 text-violet-tech hover:bg-violet-tech/20 transition-colors text-xs font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Rejoindre Discord
                  </a>
                </div>

                {/* Payment methods */}
                <div className="mt-4 pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground mb-2">
                    Moyens de paiement acceptés
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded border border-border/30 bg-dark-elevated/50">
                      Stripe
                    </span>
                    <span className="px-2 py-1 rounded border border-border/30 bg-dark-elevated/50">
                      PayPal
                    </span>
                    <span className="px-2 py-1 rounded border border-border/30 bg-dark-elevated/50">
                      CB
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
