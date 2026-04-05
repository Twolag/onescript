/**
 * Politique de Confidentialité
 */
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Privacy() {
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
            <Shield className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">Politique de Confidentialité</h1>
          </div>
        </motion.div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-8 space-y-8 text-gray-300"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p>
              OneScript respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos informations.
            </p>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Données Collectées</h2>
            <p className="mb-4">
              <strong className="text-gray-200">Lors de votre inscription/achat :</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Pseudo Discord</li>
              <li>Informations de paiement (traitées par Stripe)</li>
            </ul>
            <p className="mb-4">
              <strong className="text-gray-200">Lors de l'utilisation de nos produits :</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Données de diagnostic (performances, erreurs)</li>
              <li>Informations sur votre système (OS, GPU)</li>
              <li>Logs d'utilisation (pour le support)</li>
            </ul>
            <p>
              <strong className="text-gray-200">Données collectées automatiquement :</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Adresse IP</li>
              <li>Type de navigateur et appareil</li>
              <li>Pages visitées et durée de visite</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Utilisation des Données</h2>
            <p className="mb-4">
              Nous utilisons vos données pour :
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Traiter vos commandes et paiements</li>
              <li>Fournir et améliorer nos produits et services</li>
              <li>Vous envoyer des confirmations et des mises à jour</li>
              <li>Vous contacter pour le support technique</li>
              <li>Analyser l'utilisation du site et des produits</li>
              <li>Prévenir les fraudes et abus</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Partage des Données</h2>
            <p className="mb-4">
              Nous partageons vos données uniquement avec :
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong className="text-gray-200">Stripe</strong> : Traitement des paiements (voir politique Stripe)</li>
              <li><strong className="text-gray-200">Formspree</strong> : Gestion des formulaires de contact</li>
              <li><strong className="text-gray-200">EmailJS</strong> : Envoi d'emails de confirmation</li>
              <li><strong className="text-gray-200">Discord</strong> : Communication et support (si vous rejoignez notre serveur)</li>
            </ul>
            <p>
              <strong className="text-gray-200">Nous ne vendons jamais vos données</strong> à des tiers à des fins commerciales.
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sécurité des Données</h2>
            <p className="mb-4">
              OneScript met en place des mesures de sécurité pour protéger vos données :
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Chiffrement SSL/TLS pour tous les transferts de données</li>
              <li>Authentification sécurisée</li>
              <li>Stockage sécurisé des données sensibles</li>
              <li>Accès limité aux données personnelles</li>
              <li>Audits de sécurité réguliers</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies et Suivi</h2>
            <p className="mb-4">
              Notre site utilise des cookies pour :
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Maintenir votre session connectée</li>
              <li>Mémoriser vos préférences</li>
              <li>Analyser le trafic du site</li>
              <li>Améliorer votre expérience utilisateur</li>
            </ul>
            <p>
              Vous pouvez contrôler les cookies via les paramètres de votre navigateur. Désactiver les cookies peut affecter votre expérience sur le site.
            </p>
          </section>

          {/* Droits RGPD */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Vos Droits RGPD</h2>
            <p className="mb-4">
              Conformément au RGPD, vous avez le droit de :
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong className="text-gray-200">Accès</strong> : Demander une copie de vos données</li>
              <li><strong className="text-gray-200">Rectification</strong> : Corriger vos données inexactes</li>
              <li><strong className="text-gray-200">Suppression</strong> : Demander la suppression de vos données</li>
              <li><strong className="text-gray-200">Portabilité</strong> : Recevoir vos données dans un format portable</li>
              <li><strong className="text-gray-200">Opposition</strong> : Vous opposer au traitement de vos données</li>
              <li><strong className="text-gray-200">Limitation</strong> : Limiter le traitement de vos données</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à : onescript.fr@proton.me
            </p>
          </section>

          {/* Rétention des données */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Rétention des Données</h2>
            <p className="mb-4">
              <strong className="text-gray-200">Données de compte :</strong> Conservées tant que votre compte est actif, puis supprimées après 1 an d'inactivité.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Données de paiement :</strong> Conservées selon les exigences légales (généralement 6 ans pour les factures).
            </p>
            <p>
              <strong className="text-gray-200">Logs et données de diagnostic :</strong> Conservés pendant 90 jours maximum.
            </p>
          </section>

          {/* Tiers */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Services Tiers</h2>
            <p className="mb-4">
              Notre site utilise les services suivants :
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li><strong className="text-gray-200">Vercel</strong> : Hébergement du site (politique : vercel.com/privacy)</li>
              <li><strong className="text-gray-200">Stripe</strong> : Paiements (politique : stripe.com/privacy)</li>
              <li><strong className="text-gray-200">Discord</strong> : Communication (politique : discord.com/privacy)</li>
            </ul>
            <p>
              Consultez les politiques de confidentialité de ces services pour plus d'informations.
            </p>
          </section>

          {/* Enfants */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Protection des Enfants</h2>
            <p>
              Nos produits et services ne sont pas destinés aux enfants de moins de 18 ans. Nous ne collectons pas intentionnellement de données auprès des enfants. Si nous découvrons que nous avons collecté des données d'un enfant, nous les supprimerons immédiatement.
            </p>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Modifications de cette Politique</h2>
            <p>
              OneScript peut modifier cette politique de confidentialité à tout moment. Les modifications entrent en vigueur dès leur publication. Nous vous notifierons des changements importants par email.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contact</h2>
            <p className="mb-4">
              Pour toute question concernant cette politique de confidentialité ou vos données :
            </p>
            <p className="mb-2">
              <strong className="text-gray-200">Email :</strong>{" "}
              <a
                href="mailto:onescript.fr@proton.me"
                className="text-purple-400 hover:text-purple-300"
              >
                onescript.fr@proton.me
              </a>
            </p>
            <p>
              <strong className="text-gray-200">Discord :</strong>{" "}
              <a
                href="https://discord.gg/XV9PhqbA4r"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                Rejoindre le serveur
              </a>
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
