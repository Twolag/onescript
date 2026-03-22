/**
 * Documentation — Installation guides and tutorials
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
        title: "Hardware Requirements",
        description:
          "To use FUSION AI, your system must meet the following criteria:",
        requirements: [
          "NVIDIA RTX GPU (RTX 3060 minimum recommended)",
          "Windows 10 or Windows 11 64-bit",
          "8 GB RAM minimum (16 GB recommended)",
          "SSD with at least 10 GB free space",
          "Stable Internet connection",
        ],
      },
      {
        title: "Installation",
        description:
          "Follow these steps to install FUSION AI on your system:",
        steps: [
          "1. Complete your purchase on the OneScript website",
          "2. You will receive a confirmation email with your order number",
          "3. Join our Discord server: https://discord.gg/XV9PhqbA4r",
          "4. Create a support ticket with your order number",
          "5. Our team will send you the download link and detailed instructions",
          "6. Download and run the installer",
          "7. Follow the installation wizard",
          "8. Launch FUSION AI and log in with your credentials",
        ],
        notes: [
          "Installation takes about 15-30 minutes depending on your Internet connection",
          "Ensure your antivirus does not block the installation",
          "Restart your PC after installation for better performance",
        ],
      },

      {
        title: "Troubleshooting",
        description: "If you encounter any issues:",
        steps: [
          "Check that your NVIDIA GPU driver is up to date",
          "Ensure Windows Defender is not interfering",
          "Check your Internet connection",
          "Restart your PC and relaunch FUSION AI",
          "If the problem persists, create a Discord ticket with a detailed description",
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
        title: "About",
        description:
          "Windows Optimization is a system cleanup and optimization tool that improves gaming performance.",
        requirements: [
          "Windows 10 or Windows 11 64-bit",
          "2 GB RAM minimum",
          "Administrator access",
        ],
      },
      {
        title: "Features",
        description: "Windows Optimization performs the following optimizations:",
        steps: [
          "Complete system cleanup (temporary files, cache)",
          "Removal of unnecessary services",
          "RAM and CPU optimization",
          "Input lag reduction",
          "Improved system stability",
        ],
      },
      {
        title: "Installation",
        description: "Quick and easy installation:",
        steps: [
          "1. Purchase Windows Optimization on the site",
          "2. Download the executable from your confirmation email",
          "3. Launch the installer with administrator rights",
          "4. Follow the wizard steps",
          "5. Restart your PC to apply changes",
        ],
      },
      {
        title: "Restoration",
        description: "If you wish to restore your system:",
        steps: [
          "Windows Optimization automatically creates a restore point",
          "You can restore your system via Control Panel > Recovery",
          "Contact our Discord support for full assistance",
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
        title: "About",
        description:
          "Jitter Script is a controller anti-recoil script that improves your shooting accuracy.",
        requirements: [
          "Compatible Xbox or PlayStation controller",
          "Windows 10 or Windows 11",
          "Controller configuration software (included)",
        ],
      },
      {
        title: "Features",
        description: "Jitter Script offers:",
        steps: [
          "✅ Effective and undetectable anti-recoil",
          "✅ Compatible with all supported games",
          "✅ Does not disable aim assist",
          "✅ Integrated Humanizer function",
          "✅ Intuitive configuration interface",
          "✅ Controller only (no keyboard/mouse)",
        ],
      },
      {
        title: "Configuration",
        description: "Configure Jitter Script in a few steps:",
        steps: [
          "1. Launch the Jitter Script application",
          "2. Connect your controller",
          "3. Go to the 'Configuration' tab",
          "4. Adjust jitter intensity according to your preferences",
          "5. Test in-game to find the ideal setting",
          "6. Save your profile",
        ],
        notes: [
          "Start with low intensity and increase gradually",
          "Different games may require different settings",
          "Use the 'Humanizer' function for a more natural feel",
        ],
      },
      {
        title: "Controller Compatibility",
        description: "Jitter Script is compatible with:",
        requirements: [
          "✅ Xbox One / Xbox Series X|S",
          "✅ PlayStation 4 / PlayStation 5",
          "✅ DirectInput compatible controllers",
        ],
      },
    ],
  },
];

function DocumentationSection({ section, index }: { section: DocSection; index: number }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const Icon = section.icon;

  // Add a data attribute to allow scrolling to the section
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
        {/* Section Header */}
        <div className="p-6 border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
          </div>
        </div>

        {/* Content */}
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
                        Requirements:
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
                        Steps:
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
                      <h4 className="font-semibold mb-1">Notes:</h4>
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
  const scrollToSection = (id: string) => {
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-dark-base">
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
              Documentation
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Guides & <span className="text-violet-tech neon-text">Tutorials</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Everything you need to know to install and configure our tools.
              Follow our step-by-step guides for optimal performance.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="glass-card rounded-lg p-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Book className="w-4 h-4 text-purple-400" />
                  Navigation
                </h3>
                <nav className="space-y-1">
                  {documentation.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-purple-500/10 rounded-md transition group"
                    >
                      <span className="flex items-center gap-2">
                        <section.icon className="w-4 h-4" />
                        {section.title}
                      </span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="glass-card rounded-lg p-4 bg-purple-500/5 border-purple-500/20">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  Need Help?
                </h4>
                <p className="text-xs text-gray-400 mb-4">
                  Our support team is available on Discord to assist you with installation.
                </p>
                <a
                  href="https://discord.gg/XV9PhqbA4r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded transition"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {documentation.map((section, index) => (
              <DocumentationSection
                key={section.id}
                section={section}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
