/**
 * Purchase — Neon Circuit Design
 * Sélection produit, récapitulatif, formulaire de paiement (démo)
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Zap,
  Cpu,
  Monitor,
  Gamepad2,
  Check,
  Shield,
  CreditCard,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  options: { label: string; price: number; note?: string }[];
}

const products: Product[] = [
  {
    id: "ai-engine",
    name: "FUSION AI",
    icon: Cpu,
    options: [
      { label: "Licence + Installation", price: 80 },
      { label: "Abonnement mensuel", price: 30, note: "/ mois" },
    ],
  },
  {
    id: "windows-opt",
    name: "Windows Optimization",
    icon: Monitor,
    options: [
      { label: "Optimisation simple", price: 10 },
      { label: "Optimisation + réinstall. Windows", price: 20 },
    ],
  },
  {
    id: "jitter-script",
    name: "Jitter Script",
    icon: Gamepad2,
    options: [
      { label: "Essai 24h", price: 2.5 },
      { label: "1 semaine", price: 5 },
      { label: "1 mois", price: 15 },
      { label: "3 mois", price: 20 },
      { label: "6 mois", price: 25 },
      { label: "1 an", price: 30 },
      { label: "À vie", price: 40 },
    ],
  },
];

export default function Purchase() {
  const [selectedProduct, setSelectedProduct] = useState<string>("ai-engine");
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(["Licence + Installation"])
  );

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

  const total = product.options
    .filter((o) => selectedOptions.has(o.label))
    .reduce((sum, o) => sum + o.price, 0);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Commande enregistrée !", {
      description: `${product.name} — ${total} €. Vous recevrez un email de confirmation.`,
    });
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
              paiement sécurisé.
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
                        <span className="text-sm font-medium text-foreground">
                          {option.label}
                        </span>
                      </div>
                      <span className="font-display font-bold text-foreground">
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
                  Informations de paiement
                </h3>
                <form onSubmit={handlePurchase} className="glass-card rounded-lg p-6 lg:p-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Prénom
                      </label>
                      <input
                        type="text"
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
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                      placeholder="jean@email.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Numéro de carte
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none pr-10"
                        placeholder="4242 4242 4242 4242"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Expiration
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                        placeholder="MM / AA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2"
                    disabled={total === 0}
                  >
                    <Lock className="w-4 h-4" />
                    PAYER {total} €
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

                  {product.options
                    .filter((o) => selectedOptions.has(o.label))
                    .map((o) => (
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
                    "Téléchargement immédiat",
                    "Support technique inclus",
                    "Remboursement sous 14 jours",
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

                {/* Payment methods */}
                <div className="mt-6 pt-4 border-t border-border/30">
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
