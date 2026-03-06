/**
 * Page de réservation d'essai gratuit pour l'AI Aimbot
 * Formulaire professionnel avec validation et envoi via Formspree
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Zap, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { toast } from "sonner";

export default function Trial() {
  const [formData, setFormData] = useState({
    discordUsername: "",
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.discordUsername.trim()) {
      toast.error("Veuillez entrer votre pseudo Discord");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Veuillez entrer votre email");
      return;
    }

    if (!formData.gpu) {
      toast.error("Veuillez sélectionner votre GPU");
      return;
    }

    if (formData.games.length === 0) {
      toast.error("Veuillez sélectionner au moins un jeu");
      return;
    }

    setIsLoading(true);
    setShowError(false);

    try {
      // Préparer le message pour Formspree
      const message = `
DEMANDE D'ESSAI AI AIMBOT
========================

Pseudo Discord: ${formData.discordUsername}
Email: ${formData.email}
GPU: ${formData.gpu}
Jeux souhaités: ${formData.games.join(", ")}

Message supplémentaire:
${formData.message || "Aucun"}

---
Demande soumise le: ${new Date().toLocaleString("fr-FR")}
      `.trim();

      // Envoyer via Formspree
      const response = await fetch("https://formspree.io/f/mlgpenar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.discordUsername,
          email: formData.email,
          subject: "DEMANDE D'ESSAI AI AIMBOT",
          message: message,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          discordUsername: "",
          email: "",
          gpu: "",
          games: [],
          message: "",
        });

        toast.success("Demande d'essai envoyée avec succès !", {
          description:
            "Nous vous contacterons sur Discord sous 24h maximum.",
        });

        // Masquer le message de succès après 5 secondes
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error("Erreur lors de l'envoi");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setShowError(true);
      toast.error("Erreur lors de l'envoi de la demande", {
        description: "Veuillez réessayer plus tard.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
      {/* Fond animé */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">Essai Gratuit</h1>
            <Zap className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-gray-300 text-lg">
            Testez l'AI Aimbot gratuitement pendant 24 heures
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Remplissez le formulaire ci-dessous et nous vous contacterons sur
            Discord sous 24h
          </p>
        </motion.div>

        {/* Message de succès */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-400">
                Demande envoyée avec succès !
              </h3>
              <p className="text-green-300/80 text-sm mt-1">
                Nous vous contacterons sur Discord sous 24h maximum pour
                commencer votre essai.
              </p>
            </div>
          </motion.div>
        )}

        {/* Message d'erreur */}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400">
                Erreur lors de l'envoi
              </h3>
              <p className="text-red-300/80 text-sm mt-1">
                Veuillez réessayer plus tard ou nous contacter directement sur
                Discord.
              </p>
            </div>
          </motion.div>
        )}

        {/* Formulaire */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-slate-900/50 border border-purple-500/20 rounded-xl p-8 backdrop-blur-sm"
        >
          {/* Pseudo Discord */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Pseudo Discord <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="discordUsername"
              value={formData.discordUsername}
              onChange={handleInputChange}
              placeholder="Votre pseudo Discord (ex: Player#1234)"
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              disabled={isLoading}
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              disabled={isLoading}
            />
          </div>

          {/* GPU */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Votre GPU <span className="text-red-400">*</span>
            </label>
            <select
              name="gpu"
              value={formData.gpu}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              disabled={isLoading}
            >
              <option value="">-- Sélectionnez votre GPU --</option>
              {gpuOptions.map((gpu) => (
                <option key={gpu} value={gpu}>
                  {gpu}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">
              ⚠️ L'AI Aimbot nécessite une GPU NVIDIA RTX
            </p>
          </div>

          {/* Jeux */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-200 mb-3">
              Jeux souhaités <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {gameOptions.map((game) => (
                <label key={game} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.games.includes(game)}
                    onChange={() => handleGameToggle(game)}
                    disabled={isLoading}
                    className="w-4 h-4 rounded border-purple-500/30 bg-slate-800/50 text-purple-500 focus:ring-purple-500/20 cursor-pointer"
                  />
                  <span className="text-gray-300">{game}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message supplémentaire */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Message supplémentaire (optionnel)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Dites-nous pourquoi vous aimeriez tester l'AI Aimbot..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
              disabled={isLoading}
            />
          </div>

          {/* Bouton d'envoi */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                RÉSERVER MON ESSAI GRATUIT
              </>
            )}
          </button>

          {/* Conditions */}
          <p className="text-xs text-gray-400 text-center mt-4">
            En soumettant ce formulaire, vous acceptez que nous vous
            contactions sur Discord pour configurer votre essai.
          </p>
        </motion.form>

        {/* Informations supplémentaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">24 heures</div>
            <p className="text-gray-300 text-sm">Essai gratuit complet</p>
          </div>
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">24h</div>
            <p className="text-gray-300 text-sm">Réponse maximum</p>
          </div>
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-2">100%</div>
            <p className="text-gray-300 text-sm">Sans engagement</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
