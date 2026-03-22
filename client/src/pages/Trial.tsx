import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Trial() {
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
    "NVIDIA RTX 5090", "NVIDIA RTX 5080", "NVIDIA RTX 5070 Ti", "NVIDIA RTX 5070",
    "NVIDIA RTX 5060 Ti", "NVIDIA RTX 5060", "NVIDIA RTX 5050",
    "NVIDIA RTX 4090 SUPER", "NVIDIA RTX 4090", "NVIDIA RTX 4080 SUPER", "NVIDIA RTX 4080",
    "NVIDIA RTX 4070 Ti SUPER", "NVIDIA RTX 4070 Ti", "NVIDIA RTX 4070 SUPER", "NVIDIA RTX 4070",
    "NVIDIA RTX 4060 Ti", "NVIDIA RTX 4060", "NVIDIA RTX 4050",
    "NVIDIA RTX 3090 Ti", "NVIDIA RTX 3090", "NVIDIA RTX 3080 Ti", "NVIDIA RTX 3080",
    "NVIDIA RTX 3070 Ti", "NVIDIA RTX 3070", "NVIDIA RTX 3060 Ti", "NVIDIA RTX 3060",
    "NVIDIA RTX 3050 Ti", "NVIDIA RTX 3050", "Autre GPU NVIDIA",
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
      // ✉️ Email de confirmation au client
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: "✓ Essai gratuit FUSION AI réservé – OneScript",
          html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background-color:#111111;border:1px solid #222;border-radius:12px 12px 0 0;padding:40px;text-align:center;">
            <div style="display:inline-block;background-color:#c8ff00;border-radius:8px;padding:8px 20px;margin-bottom:24px;">
              <span style="color:#0a0a0a;font-weight:800;font-size:18px;letter-spacing:2px;text-transform:uppercase;">OneScript</span>
            </div>
            <h1 style="margin:0 0 8px 0;color:#fff;font-size:28px;font-weight:700;">Essai gratuit réservé ⚡</h1>
            <p style="margin:0;color:#888;font-size:15px;">On a bien reçu ta demande d'essai FUSION AI !</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#111;border-left:1px solid #222;border-right:1px solid #222;padding:40px;">
            <p style="color:#ccc;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
              Hey ${formData.discordPseudo} 👋<br><br>
              Ta demande d'essai gratuit 24h est bien enregistrée. On te contacte sur Discord sous 24h pour configurer ton accès.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border:1px solid #222;border-radius:8px;">
              <tr style="background:#1a1a1a;">
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Détail</td>
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:right;">Info</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Discord</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;font-weight:700;text-align:right;">${formData.discordPseudo}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">GPU</td>
                <td style="padding:14px 20px;color:#c8ff00;font-size:14px;font-weight:600;text-align:right;">${formData.gpu}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Jeux</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;text-align:right;">${formData.games.join(", ")}</td>
              </tr>
            </table>
            <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:3px solid #c8ff00;border-radius:8px;padding:24px;margin-bottom:32px;">
              <p style="margin:0 0 12px 0;color:#c8ff00;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">🚀 Prochaine étape</p>
              <p style="margin:0;color:#ccc;font-size:14px;line-height:1.8;">
                Rejoins notre Discord et attends qu'on te contacte sous 24h.<br>
                Garde un œil sur tes messages privés !
              </p>
            </div>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://discord.gg/XV9PhqbA4r" style="display:inline-block;background-color:#5865F2;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;">Rejoindre le Discord →</a>
            </div>
            <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">Des questions ? Réponds à cet email.<br>— L'équipe OneScript</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;border:1px solid #222;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#444;font-size:12px;">© ${new Date().getFullYear()} OneScript · <a href="https://onescript.fr" style="color:#444;text-decoration:none;">onescript.fr</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
        }),
      });

      // 📬 Notification admin
      fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'onescript@outlook.fr',
          subject: `[ESSAI GRATUIT] ${formData.discordPseudo} – ${formData.gpu}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;padding:30px;border-radius:10px;">
              <h2 style="color:#c8ff00;margin-top:0;">⚡ Nouvelle demande d'essai</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#888;">Discord</td><td style="color:#fff;font-weight:700;">${formData.discordPseudo}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Email</td><td style="color:#fff;">${formData.email}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">GPU</td><td style="color:#c8ff00;font-weight:700;">${formData.gpu}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Jeux</td><td style="color:#fff;">${formData.games.join(", ")}</td></tr>
                <tr><td style="padding:8px 0;color:#888;">Message</td><td style="color:#fff;">${formData.message || "—"}</td></tr>
              </table>
            </div>
          `,
        }),
      }).catch(console.error);

      setShowSuccess(true);
      toast.success("Essai gratuit réservé ! Vérifiez votre email.");
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ discordPseudo: "", email: "", gpu: "", games: [], message: "" });
      }, 4000);

    } catch (error) {
      console.error("Erreur:", error);
      setShowError(true);
      toast.error("Erreur lors de la réservation, veuillez réessayer.");
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
            <div>
              <label className="block text-sm font-medium mb-2">Pseudo Discord <span className="text-red-500">*</span></label>
              <input type="text" name="discordPseudo" placeholder="Votre pseudo Discord (ex: Player#1234)" value={formData.discordPseudo} onChange={handleInputChange} className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
              <input type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Votre GPU <span className="text-red-500">*</span></label>
              <select name="gpu" value={formData.gpu} onChange={handleInputChange} className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all">
                <option value="">-- Sélectionnez votre GPU --</option>
                {gpuOptions.map((gpu) => (<option key={gpu} value={gpu}>{gpu}</option>))}
              </select>
              <p className="text-xs text-muted-foreground mt-2">⚠️ L'AI Aimbot nécessite une GPU NVIDIA RTX</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Jeux souhaités <span className="text-red-500">*</span></label>
              <div className="space-y-2">
                {gameOptions.map((game) => (
                  <label key={game} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.games.includes(game)} onChange={() => handleGameToggle(game)} className="w-4 h-4 rounded border-violet-tech/50 bg-dark-surface text-violet-tech focus:ring-violet-tech" />
                    <span className="text-sm">{game}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message supplémentaire (optionnel)</label>
              <textarea name="message" placeholder="Dites-nous pourquoi vous aimeriez tester l'AI Aimbot..." value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 bg-dark-surface border border-violet-tech/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-violet-tech focus:ring-1 focus:ring-violet-tech/50 transition-all resize-none" />
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 px-6 bg-gradient-to-r from-violet-tech to-violet-secondary rounded-lg font-display font-semibold tracking-wider text-primary-foreground hover:from-violet-secondary hover:to-violet-tech transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed neon-glow flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              {isLoading ? "Réservation en cours..." : "RÉSERVER MON ESSAI GRATUIT"}
            </button>
          </motion.form>

          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-500">Essai réservé avec succès !</p>
                <p className="text-sm text-muted-foreground mt-1">Un email de confirmation a été envoyé. On te contacte sur Discord sous 24h.</p>
              </div>
            </motion.div>
          )}

          {showError && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-500">Erreur lors de la réservation</p>
                <p className="text-sm text-muted-foreground mt-1">Veuillez vérifier vos informations et réessayer.</p>
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
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }} className="p-6 border border-violet-tech/20 rounded-lg text-center">
                <p className="text-2xl font-display font-bold text-violet-tech mb-2">{benefit.label}</p>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
