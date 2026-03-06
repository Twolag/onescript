/**
 * Mentions Légales
 */
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function LegalNotice() {
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
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">Mentions Légales</h1>
          </div>
        </motion.div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-8 space-y-8 text-gray-300"
        >
          {/* Éditeur */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Éditeur du Site</h2>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-200">Nom :</strong> OneScript
              </p>
              <p>
                <strong className="text-gray-200">Email :</strong>{" "}
                <a
                  href="mailto:onescript@outlook.fr"
                  className="text-purple-400 hover:text-purple-300"
                >
                  onescript@outlook.fr
                </a>
              </p>
              <p>
                <strong className="text-gray-200">Statut :</strong> Entreprise individuelle / Auto-entrepreneur
              </p>
              <p>
                <strong className="text-gray-200">Secteur d'activité :</strong> Logiciels et services informatiques
              </p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Hébergement</h2>
            <div className="space-y-2">
              <p>
                <strong className="text-gray-200">Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong className="text-gray-200">Adresse :</strong> 440 N Barranca Ave, Covina, CA 91723, USA
              </p>
              <p>
                <strong className="text-gray-200">Site web :</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Propriété Intellectuelle</h2>
            <p className="mb-4">
              Tous les contenus du site OneScript (textes, images, logos, vidéos, code source, etc.) sont protégés par les droits d'auteur et la propriété intellectuelle.
            </p>
            <p className="mb-4">
              L'utilisation, la reproduction, la modification ou la distribution de ces contenus sans autorisation écrite préalable est strictement interdite.
            </p>
            <p>
              Les produits OneScript (FUSION AI, Windows Optimization, Jitter Script) sont des logiciels propriétaires protégés par copyright. Toute tentative de rétro-ingénierie, de craquage ou de partage est interdite et pourrait entraîner des poursuites légales.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation de Responsabilité</h2>
            <p className="mb-4">
              OneScript fournit les services et produits "tels quels" sans garantie d'aucune sorte. L'utilisation des produits OneScript est à vos risques et périls.
            </p>
            <p className="mb-4">
              OneScript ne peut être tenu responsable de :
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Les dommages directs ou indirects résultant de l'utilisation des produits</li>
              <li>Les pertes de données ou d'accès aux comptes de jeux</li>
              <li>Les interdictions ou suspensions de compte imposées par les éditeurs de jeux</li>
              <li>Les interruptions de service ou les erreurs techniques</li>
              <li>Les dommages causés par des tiers ou des utilisateurs malveillants</li>
            </ul>
            <p>
              <strong className="text-gray-200">Avertissement :</strong> L'utilisation de nos produits dans les jeux en ligne peut violer les conditions d'utilisation de ces jeux. Les utilisateurs acceptent les risques d'interdiction ou de suspension de compte.
            </p>
          </section>

          {/* Conformité légale */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Conformité Légale</h2>
            <p className="mb-4">
              OneScript s'engage à respecter les lois et réglementations applicables, notamment :
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Le Règlement Général sur la Protection des Données (RGPD)</li>
              <li>Les lois sur la protection des consommateurs</li>
              <li>Les conditions d'utilisation des plateformes de jeux</li>
              <li>Les lois sur le droit d'auteur et la propriété intellectuelle</li>
            </ul>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Modifications</h2>
            <p>
              OneScript se réserve le droit de modifier ces mentions légales à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement cette page.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Droit Applicable</h2>
            <p>
              Ces mentions légales sont régies par la loi française. Tout litige sera soumis à la juridiction compétente.
            </p>
          </section>

          {/* Dernière mise à jour */}
          <div className="pt-4 border-t border-purple-500/20">
            <p className="text-sm text-gray-400">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
