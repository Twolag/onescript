/*
 * Purchase — Neon Circuit Design
 * Sélection produit, récapitulatif, formulaire de paiement avec PayPal
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
  Lock,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PAYPAL_EMAIL = "OneLagTT@paypal.me";
const DISCORD_LINK = "https://discord.gg/cU2kNQxxHu";

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
  options: { label: string; price: number; note?: string; description?: string }[];
}

const products: Product[] = [
  {
    id: "ai-engine",
    name: "FUSION AI",
    icon: Cpu,
    options: [
      {
        label: "Licence + Installation",
        price: 80,
        description: "Premier mois + installation de l'AI Aimbot inclus",
      },
      {
        label: "Abonnement mensuel",
        price: 30,
        note: "/ mois",
        description: "Renouvellement mensuel uniquement",
      },
    ],
  },
  {
    id: "windows-opt",
    name: "Windows Optimization",
    icon: Monitor,
    options: [
      { label: "Optimisation simple", price: 20 },
      { label: "Optimisation + réinstall. Windows", price: 40 },
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

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export default function Purchase() {
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get("product") || "ai-engine";
  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedItems, setSelectedItems] = useState<Array<{ label: string; price: number; note?: string; description?: string }>>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    discordPseudo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState<{
    orderNumber: string;
    productName: string;
    price: number;
  } | null>(null);

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const selectOption = (option: typeof product.options[0]) => {
    setSelectedItems([option]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.discordPseudo) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (selectedItems.length !== 1) {
      toast.error("Veuillez sélectionner une option");
      return;
    }

    setIsLoading(true);

    try {
      const selectedItem = selectedItems[0];
      const orderNumber = generateOrderNumber();
      const customerName = `${formData.firstName} ${formData.lastName}`;

      // ✉️ Email de confirmation au client
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          props: {
            orderNumber,
            customerName,
            customerEmail: formData.email,
            productName: product.name,
            productOption: selectedItem.label,
            discordPseudo: formData.discordPseudo,
            price: selectedItem.price,
          },
        }),
      })
        .then(() => console.log('[Purchase] ✅ Email client envoyé'))
        .catch((err) => console.error('[Purchase] Erreur email client:', err));

      // 📬 Email de notification admin
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'onescript@outlook.fr',
          subject: `[NOUVELLE COMMANDE] ${orderNumber} — ${customerName}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;padding:30px;border-radius:10px;">
              <h2 style="color:#c8ff00;margin-top:0;">🛒 Nouvelle Commande</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#888;">N° commande</td><td style="color:#c8ff00;font-family:monospace;font-weight:700;">${orderNumber}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Client</td><td style="color:#fff;">${customerName}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Email</td><td style="color:#fff;">${formData.email}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Discord</td><td style="color:#fff;">${formData.discordPseudo}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Produit</td><td style="color:#fff;">${product.name}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Option</td><td style="color:#fff;">${selectedItem.label}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Montant</td><td style="color:#c8ff00;font-size:20px;font-weight:800;">${selectedItem.price}€</td></tr>
              </table>
            </div>
          `,
        }),
      })
        .then(() => console.log('[Purchase] ✅ Email admin envoyé'))
        .catch((err) => console.error('[Purchase] Erreur email admin:', err));

      // 💳 Redirection PayPal
      const paypalLink = `https://www.paypal.me/OneLagTT/${selectedItem.price}`;
      setTimeout(() => { window.open(paypalLink, '_blank'); }, 100);

      setOrderCreated({
        orderNumber,
        productName: `${product.name} — ${selectedItem.label}`,
        price: selectedItem.price,
      });

      toast.success("Redirection vers PayPal...");
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue, veuillez réessayer.");
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
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
              Finaliser votre <span className="text-violet-tech">achat</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Sélectionnez votre produit et complétez le formulaire pour accéder à votre achat.
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
                      onClick={() => selectOption(option)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedItems.includes(option)
                          ? "border-violet-tech bg-violet-tech/10"
                          : "border-border/50 hover:border-violet-tech/50 bg-dark-elevated/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${selectedItems.includes(option) ? "border-violet-tech bg-violet-tech" : "border-border/50"}`}>
                            {selectedItems.includes(option) && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{option.label}</p>
                            {option.description && <p className="text-xs text-muted-foreground mt-1">{option.description}</p>}
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

              {/* Form */}
              <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="glass-card rounded-lg p-6">
                <h2 className="text-2xl font-display font-bold mb-6">Vos informations</h2>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Prénom</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="Jean" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Nom</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="Dupont" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="jean@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Pseudo Discord</label>
                    <input type="text" name="discordPseudo" value={formData.discordPseudo} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-md bg-dark-elevated border border-border/50 text-foreground text-sm placeholder:text-muted-foreground focus:border-violet-tech/50 focus:ring-1 focus:ring-violet-tech/30 transition-colors outline-none" placeholder="VotreNom#1234" />
                  </div>

                  <div className="glass-card rounded-lg p-4 bg-blue-500/5 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-display font-semibold text-sm text-foreground mb-1">Paiement sécurisé via PayPal</h4>
                        <p className="text-xs text-muted-foreground">Vous serez redirigé vers PayPal pour finaliser le paiement. Un email de confirmation vous sera envoyé automatiquement.</p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={total === 0 || isLoading} className="w-full bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow gap-2">
                    {isLoading ? (
                      <><span className="animate-spin">⏳</span> Redirection vers PayPal...</>
                    ) : (
                      <><Lock className="w-4 h-4" /> PAYER {total} € VIA PAYPAL</>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Paiement sécurisé</span>
                    <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL chiffré</span>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right: Summary / Confirmation */}
            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="lg:col-span-1">
              {orderCreated ? (
                <div className="sticky top-24 glass-card rounded-lg p-6 border-2 border-green-500/50 bg-green-500/5">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <Check className="w-12 h-12 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-green-400">Commande créée !</h3>
                    <p className="text-sm text-muted-foreground">Ton numéro de commande :</p>
                    <div className="bg-dark-elevated/80 border border-green-500/30 rounded-lg p-4 font-mono text-lg font-bold text-green-400 break-all">
                      {orderCreated.orderNumber}
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Produit : <span className="text-foreground font-semibold">{orderCreated.productName}</span></p>
                      <p className="text-muted-foreground">Montant : <span className="text-foreground font-semibold">{orderCreated.price}€</span></p>
                    </div>

                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-left">
                      <p className="text-sm font-semibold text-green-300 mb-2">✅ Email envoyé !</p>
                      <p className="text-xs text-muted-foreground">Un email de confirmation a été envoyé avec toutes les instructions.</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
                      <p className="text-sm font-semibold text-blue-300">Instructions :</p>
                      <ol className="text-xs text-muted-foreground space-y-2 text-left">
                        <li>1. Une fenêtre PayPal vient de s'ouvrir</li>
                        <li>2. Effectue le paiement de <span className="font-semibold text-foreground">{orderCreated.price}€</span></li>
                        <li>3. Rejoins notre Discord avec ton numéro de commande</li>
                      </ol>
                    </div>

                    <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
                      <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Nous contacter sur Discord
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="sticky top-24 glass-card rounded-lg p-6">
                  <h3 className="text-xl font-display font-bold mb-6">Récapitulatif</h3>
                  {selectedItems.length > 0 ? (
                    <div className="space-y-4">
                      {selectedItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start pb-4 border-b border-border/30">
                          <div>
                            <p className="font-semibold text-foreground">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{item.label}</p>
                          </div>
                          <p className="font-display font-bold text-violet-tech">{item.price}€</p>
                        </div>
                      ))}
                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Sous-total</span>
                          <span className="font-semibold">{total}€</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Frais</span>
                          <span className="font-semibold">0€</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-border/30">
                          <span className="font-display font-bold">Total</span>
                          <span className="font-display font-bold text-violet-tech text-lg">{total}€</span>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-violet-tech/5 border border-violet-tech/20 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-2">
                          💡 Après paiement, vous recevrez un email de confirmation avec les instructions d'accès.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Besoin d'aide ? Rejoignez notre{" "}
                          <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className="text-violet-tech hover:underline">Discord</a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">Sélectionnez une option pour voir le récapitulatif</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
