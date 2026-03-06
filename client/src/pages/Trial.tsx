import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const EMAILJS_SERVICE_ID = "service_onescript";
const EMAILJS_TEMPLATE_ID = "template_trial_request";
const EMAILJS_PUBLIC_KEY = "vPqKJQJh_sCqN1Kv2";

export default function Trial() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    discordPseudo: "",
    email: "",
    gpu: "",
    games: [] as string[],
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const gpuOptions = [
    // Série 5000 (Blackwell)
    "NVIDIA RTX 5090",
    "NVIDIA RTX 5080",
    "NVIDIA RTX 5070 Ti",
    "NVIDIA RTX 5070",
    "NVIDIA RTX 5060 Ti",
    "NVIDIA RTX 5060",
    "NVIDIA RTX 5050",
    // Série 4000 (Ada Lovelace)
    "NVIDIA RTX 4090 SUPER",
    "NVIDIA RTX 4090",
    "NVIDIA RTX 4080 SUPER",
    "NVIDIA RTX 4080",
    "NVIDIA RTX 4070 Ti SUPER",
    "NVIDIA RTX 4070 Ti",
    "NVIDIA RTX 4070 SUPER",
    "NVIDIA RTX 4070",
    "NVIDIA RTX 4060 Ti",
    "NVIDIA RTX 4060",
    "NVIDIA RTX 4050",
    // Série 3000 (Ampere)
    "NVIDIA RTX 3090 Ti",
    "NVIDIA RTX 3090",
    "NVIDIA RTX 3080 Ti",
    "NVIDIA RTX 3080",
    "NVIDIA RTX 3070 Ti",
    "NVIDIA RTX 3070",
    "NVIDIA RTX 3060 Ti",
    "NVIDIA RTX 3060",
    "NVIDIA RTX 3050 Ti",
    "NVIDIA RTX 3050",
    "Autre GPU NVIDIA",
  ];

  const gameOptions = [
    "Apex Legends",
    "Call of Duty",
    "Steam (Autres jeux)",
    "Tous les jeux supportés",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGameToggle = (game: string) => {
    setFormData((prev) => ({
      ...prev,
      games: prev.games.includes(game)
        ? prev.games.filter((g) => g !== game)
        : [...prev.games, game],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.discordPseudo || !formData.email || !formData.gpu) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    if (formData.games.length === 0) {
      toast.error("Veuillez sélectionner au moins un jeu");
      return;
    }

    setIsLoading(true);

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: formData.email,
        discord_pseudo: formData.discordPseudo,
        gpu: formData.gpu,
        games: formData.games.join(", "),
        message: formData.message || "Aucun message supplémentaire",
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          discordPseudo: "",
          email: "",
          gpu: "",
          games: [],
          message: "",
        });
      }, 3000);

      toast.success("Essai gratuit réservé ! Vérifiez votre email et Discord.");
    } catch (error) {
      console.error("Erreur:", error);
      setShowError(true);
      toast.error("Erreur lors de la réservation", {
        description: "Veuillez réessayer plus tard",
      });
      setTimeout(() => setShowError(false), 3000);
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-violet-tech" />
              <span className="text-sm font-display tracking-widest text-violet-tech">ESSAI GRATUIT</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-4">
              Testez l'<span className="text-violet-tech">AI Aimbot</span> gratuitement
            </h1>
            <p className="text-lg text-muted-foreground">
              Testez l'AI Aimbot gratuitement pendant 24 heures. Remplissez le formulaire ci-dessous et nous vous contacterons sur Discord sous 24h.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-12 lg:py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-tech/5 to-transparent" />
        <div className="relative container max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Discord Pseudo */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pseudo Discord <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="discordPseudo"
                placeholder="Votre pseudo Discord (ex: Player#1234)"
                value={formData.discordPseudo}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all"
              />
            </div>

            {/* GPU Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Votre GPU <span className="text-red-500">*</span>
              </label>
              <select
                name="gpu"
                value={formData.gpu}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all"
              >
                <option value="">-- Sélectionnez votre GPU --</option>
                {gpuOptions.map((gpu) => (
                  <option key={gpu} value={gpu}>
                    {gpu}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-2">
                ⚠️ L'AI Aimbot nécessite une GPU NVIDIA RTX
              </p>
            </div>

            {/* Games Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Jeux souhaités <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {gameOptions.map((game) => (
                  <label key={game} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.games.includes(game)}
                      onChange={() => handleGameToggle(game)}
                      className="w-4 h-4 rounded border-violet-tech/50 bg-dark-surface text-violet-tech focus:ring-violet-tech"
                    />
                    <span className="text-sm">{game}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Message supplémentaire (optionnel)
              </label>
              <textarea
                name="message"
                placeholder="Dites-nous pourquoi vous aimeriez tester l'AI Aimbot..."
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-gradient-to-r from-violet-tech to-violet-secondary rounded-lg font-display font-semibold tracking-wider text-primary-foreground hover:from-violet-secondary hover:to-violet-tech transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-glow flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {isLoading ? "Réservation en cours..." : "RÉSERVER MON ESSAI GRATUIT"}
            </button>
          </motion.form>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-500">Essai réservé avec succès !</p>
                <p className="text-sm text-muted-foreground mt-1">
                  En soutenant ce formulaire, vous acceptez que nous vous contactions sur Discord pour configurer votre essai.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-500">Erreur lors de la réservation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Veuillez vérifier vos informations et réessayer.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-12 lg:py-16 bg-dark-surface/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "24 heures", description: "Essai gratuit complet" },
              { label: "24h", description: "Réponse maximum" },
              { label: "100%", description: "Sans engagement" },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="p-6 border border-violet-tech/20 rounded-lg text-center"
              >
                <p className="text-2xl font-display font-bold text-violet-tech mb-2">
                  {benefit.label}
                </p>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
