/**
 * Documentation — Guides d'installation et tutoriels
 */
import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import {
  Zap,
  ChevronDown,
  Book,
  Gamepad2,
  Monitor,
  Download,
  Shield,
  TrendingUp,
  Clock,
  ChevronRight,
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

  // Ajouter un attribut data pour permettre le scroll vers la section
  const sectionRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={sectionRef}
      data-section={section.id}
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


  const quickGuides = [
    {
      id: "getting-started",
      title: "Guide de démarrage",
      description: "Installation et première configuration de vos outils OneScript",
      icon: Download,
      section: "fusion-ai",
      subsection: "Installation",
    },
    {
      id: "advanced-opt",
      title: "Optimisation avancée",
      description: "Tutoriels pour tirer le maximum de votre configuration",
      icon: TrendingUp,
      section: "windows-opt",
      subsection: "Fonctionnalités",
    },
    {
      id: "troubleshooting",
      title: "Résolution de problèmes",
      description: "Solutions aux problèmes courants et FAQ technique",
      icon: Shield,
      section: "fusion-ai",
      subsection: "Dépannage",
    },
    {
      id: "changelog",
      title: "Changelog & Mises à jour",
      description: "Historique des versions et nouvelles fonctionnalités",
      icon: Clock,
      section: "changelog",
      subsection: "Dernières versions",
    },
  ];

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

        {/* Guides de démarrage rapide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Guides de Démarrage Rapide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickGuides.map((guide) => {
              const GuideIcon = guide.icon;
              return (
                <motion.a
                  key={guide.id}
                  href={`#${guide.section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Scroll to section
                    const element = document.querySelector(`[data-section="${guide.section}"]`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="group p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg hover:border-purple-500/50 transition cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <GuideIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{guide.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 group-hover:translate-x-1 transition" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Sections de documentation */}
        <div id="fusion-ai" />
        <div id="windows-opt" />
        <div id="jitter-script" />
        {documentation.map((section, index) => (
          <DocumentationSection key={section.id} section={section} index={index} />
        ))}

        {/* Section Changelog */}
        <motion.div
          custom={documentation.length}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-purple-500/10">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Changelog & Mises à jour</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="pb-4 border-b border-purple-500/10">
                  <h3 className="text-lg font-semibold text-white mb-2">FUSION AI V7 (BETA) - HOTFIX - Version actuelle</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>✅ Panic Button (Streamer Mode) - 100% invisible</li>
                    <li>✅ Profile Keybinds - Changez de config en plein match</li>
                    <li>✅ Triggers Aimbot 100% Customizables</li>
                    <li>✅ Nouvelle Interface (UI) moderne et fluide</li>
                    <li>✅ Rework du Profile Manager</li>
                    <li>✅ Panic Button fixé - Fonctionne sur TOUS les PC</li>
                    <li>✅ Sauvegarde Confidence fixée</li>
                    <li>✅ Fenêtre Debug IA fixée (TopMost)</li>
                  </ul>
                </div>
                <div className="pb-4 border-b border-purple-500/10">
                  <h3 className="text-lg font-semibold text-white mb-2">FUSION AI V6 - Ancienne version</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>✅ Traitement visuel IA en temps réel</li>
                    <li>✅ Support Steam, Apex Legends, Call of Duty</li>
                    <li>✅ Optimisations GPU avancées</li>
                  </ul>
                </div>
                <div className="pb-4 border-b border-purple-500/10">
                  <h3 className="text-lg font-semibold text-white mb-2">Jitter Script V14 - Mars 2026</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>✅ Critical bug fixed - Window crash issue fully resolved</li>
                    <li>✅ PlayStation Controller Support - Full gamepad support enabled</li>
                    <li>✅ Interface redesigned - Better readability and smoother navigation</li>
                    <li>✅ Performance Optimizations - Bind latency up to 9x faster</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
