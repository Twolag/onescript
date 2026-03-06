/**
 * Documentation — Guides d'installation et tutoriels
 */
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Zap,
  ChevronDown,
  Book,
  Gamepad2,
  Monitor,
  Download,
  Shield,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: {
    title: string;
    description: string;
    steps?: string[];
    requirements?: string[];
    notes?: string[];
  }[];
}

const documentation: DocSection[] = [
  {
    id: "fusion-ai",
    title: "FUSION AI - AI Aimbot",
    icon: Zap,
    content: [
      {
        title: "Pré-requis Matériels",
        description:
          "Pour utiliser FUSION AI, votre système doit répondre aux critères suivants :",
        requirements: [
          "GPU NVIDIA RTX (RTX 3060 minimum recommandé)",
          "Windows 10 ou Windows 11 64-bit",
          "8 GB de RAM minimum (16 GB recommandé)",
          "SSD avec au moins 10 GB d'espace libre",
          "Connexion Internet stable",
        ],
      },
      {
        title: "Installation",
        description:
          "Suivez ces étapes pour installer FUSION AI sur votre système :",
        steps: [
          "1. Effectuez votre achat sur le site OneScript",
          "2. Vous recevrez un email de confirmation avec votre numéro de commande",
          "3. Rejoignez notre serveur Discord : https://discord.gg/cU2kNQxxHu",
          "4. Créez un ticket de support avec votre numéro de commande",
          "5. Notre équipe vous enverra le lien de téléchargement et les instructions détaillées",
          "6. Téléchargez et exécutez l'installateur",
          "7. Suivez l'assistant d'installation",
          "8. Lancez FUSION AI et connectez-vous avec vos identifiants",
        ],
        notes: [
          "L'installation prend environ 15-30 minutes selon votre connexion Internet",
          "Assurez-vous que votre antivirus ne bloque pas l'installation",
          "Redémarrez votre PC après l'installation pour une meilleure performance",
        ],
      },
      {
        title: "Jeux Compatibles",
        description: "FUSION AI fonctionne actuellement avec :",
        requirements: [
          "✅ Steam (tous les jeux supportés)",
          "✅ Apex Legends",
          "✅ Call of Duty (Warzone, Modern Warfare, etc.)",
          "🔄 Autres plateformes en cours de développement",
        ],
      },
      {
        title: "Dépannage",
        description: "Si vous rencontrez des problèmes :",
        steps: [
          "Vérifiez que votre GPU NVIDIA est à jour (Driver)",
          "Assurez-vous que Windows Defender n'interfère pas",
          "Vérifiez votre connexion Internet",
          "Redémarrez votre PC et relancez FUSION AI",
          "Si le problème persiste, créez un ticket Discord avec une description détaillée",
        ],
      },
    ],
  },
  {
    id: "windows-opt",
    title: "Windows Optimization",
    icon: Monitor,
    content: [
      {
        title: "À propos",
        description:
          "Windows Optimization est un outil de nettoyage et d'optimisation système qui améliore les performances gaming.",
        requirements: [
          "Windows 10 ou Windows 11 64-bit",
          "2 GB de RAM minimum",
          "Accès administrateur",
        ],
      },
      {
        title: "Fonctionnalités",
        description: "Windows Optimization effectue les optimisations suivantes :",
        steps: [
          "Nettoyage complet du système (fichiers temporaires, cache)",
          "Suppression des services inutiles",
          "Optimisation de la RAM et du CPU",
          "Réduction de l'input lag",
          "Amélioration de la stabilité du système",
        ],
      },
      {
        title: "Installation",
        description: "Installation simple et rapide :",
        steps: [
          "1. Achetez Windows Optimization sur le site",
          "2. Téléchargez l'exécutable depuis votre email de confirmation",
          "3. Lancez l'installateur avec les droits administrateur",
          "4. Suivez les étapes de l'assistant",
          "5. Redémarrez votre PC pour appliquer les modifications",
        ],
      },
      {
        title: "Restauration",
        description: "Si vous souhaitez restaurer votre système :",
        steps: [
          "Windows Optimization crée automatiquement un point de restauration",
          "Vous pouvez restaurer votre système via Panneau de Contrôle > Récupération",
          "Contactez notre support Discord pour une assistance complète",
        ],
      },
    ],
  },
  {
    id: "jitter-script",
    title: "Jitter Script",
    icon: Gamepad2,
    content: [
      {
        title: "À propos",
        description:
          "Jitter Script est un script anti-recul pour manette qui améliore votre précision de tir.",
        requirements: [
          "Manette Xbox ou PlayStation compatible",
          "Windows 10 ou Windows 11",
          "Logiciel de configuration manette (inclus)",
        ],
      },
      {
        title: "Caractéristiques",
        description: "Jitter Script offre :",
        steps: [
          "✅ Anti-recul efficace et indétectable",
          "✅ Compatible avec tous les jeux supportés",
          "✅ Ne désactive pas l'aim assist",
          "✅ Fonction Humanizer intégrée",
          "✅ Interface de configuration intuitive",
          "✅ Manette uniquement (pas de clavier/souris)",
        ],
      },
      {
        title: "Configuration",
        description: "Configurez Jitter Script en quelques étapes :",
        steps: [
          "1. Lancez l'application Jitter Script",
          "2. Connectez votre manette",
          "3. Accédez à l'onglet 'Configuration'",
          "4. Ajustez l'intensité du jitter selon vos préférences",
          "5. Testez dans un jeu pour trouver le réglage idéal",
          "6. Sauvegardez votre profil",
        ],
        notes: [
          "Commencez avec une intensité faible et augmentez progressivement",
          "Différents jeux peuvent nécessiter des réglages différents",
          "Utilisez la fonction 'Humanizer' pour plus de naturel",
        ],
      },
      {
        title: "Compatibilité Manettes",
        description: "Jitter Script est compatible avec :",
        requirements: [
          "✅ Xbox One / Xbox Series X|S",
          "✅ PlayStation 4 / PlayStation 5",
          "✅ Manettes compatibles DirectInput",
        ],
      },
    ],
  },
];

function DocumentationSection({ section, index }: { section: DocSection; index: number }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const Icon = section.icon;

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg overflow-hidden">
        {/* En-tête de section */}
        <div className="p-6 border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          </div>
        </div>

        {/* Contenu */}
        <div className="divide-y divide-purple-500/10">
          {section.content.map((item, itemIndex) => (
            <div key={itemIndex}>
              <button
                onClick={() =>
                  setExpandedIndex(
                    expandedIndex === itemIndex ? null : itemIndex
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-500/5 transition"
              >
                <h3 className="text-lg font-semibold text-gray-200 text-left">
                  {item.title}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 transition-transform ${
                    expandedIndex === itemIndex ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedIndex === itemIndex && (
                <div className="px-6 py-4 bg-purple-500/5 border-t border-purple-500/10">
                  <p className="text-gray-300 mb-4">{item.description}</p>

                  {item.requirements && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-200 mb-2">
                        Pré-requis :
                      </h4>
                      <ul className="space-y-1">
                        {item.requirements.map((req, i) => (
                          <li
                            key={i}
                            className="text-gray-300 text-sm flex items-start gap-2"
                          >
                            <span className="text-purple-400 mt-1">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {item.steps && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-200 mb-2">
                        Étapes :
                      </h4>
                      <ol className="space-y-2">
                        {item.steps.map((step, i) => (
                          <li
                            key={i}
                            className="text-gray-300 text-sm flex items-start gap-2"
                          >
                            <span className="text-purple-400 font-semibold min-w-fit">
                              {step.split(".")[0]}.
                            </span>
                            <span>{step.split(".").slice(1).join(".")}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {item.notes && (
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-sm text-blue-200">
                      <p className="font-semibold mb-1">💡 Notes :</p>
                      <ul className="space-y-1">
                        {item.notes.map((note, i) => (
                          <li key={i}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Documentation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
      {/* Fond animé */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Book className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">Documentation</h1>
            <Book className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-gray-300 text-lg">
            Guides d'installation et tutoriels pour tous nos produits
          </p>
        </motion.div>

        {/* Sections de documentation */}
        {documentation.map((section, index) => (
          <DocumentationSection key={section.id} section={section} index={index} />
        ))}

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg text-center"
        >
          <Shield className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">
            Besoin d'aide supplémentaire ?
          </h3>
          <p className="text-gray-300 mb-4">
            Rejoignez notre serveur Discord pour obtenir une assistance en temps réel.
          </p>
          <a
            href="https://discord.gg/cU2kNQxxHu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            Rejoindre Discord
          </a>
        </motion.div>
      </div>
    </div>
  );
}
