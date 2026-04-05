/**
 * Conditions Générales de Vente (CGV)
 */
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Terms() {
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
            <h1 className="text-4xl font-bold text-white">Conditions Générales de Vente</h1>
          </div>
        </motion.div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-8 space-y-8 text-gray-300"
        >
          {/* Objet */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent la vente de produits et services numériques proposés par OneScript, notamment :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>FUSION AI (licence logicielle + installation)</li>
              <li>Windows Optimization (logiciel d'optimisation système)</li>
              <li>Jitter Script (script de configuration manette)</li>
              <li>Essais gratuits et services associés</li>
            </ul>
          </section>

          {/* Conditions d'accès */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Conditions d'Accès</h2>
            <p className="mb-4">
              Pour accéder et utiliser les produits OneScript, vous devez :
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Avoir au moins 18 ans ou l'autorisation d'un parent/tuteur</li>
              <li>Disposer d'un système Windows 10/11 64-bit</li>
              <li>Accepter les présentes CGV et la politique de confidentialité</li>
              <li>Fournir des informations exactes lors de votre inscription</li>
            </ul>
          </section>

          {/* Processus d'achat */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Processus d'Achat</h2>
            <p className="mb-4">
              <strong className="text-gray-200">Commande :</strong> Vous sélectionnez un produit et complétez le formulaire de paiement.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Paiement :</strong> Le paiement est traité via Stripe. Vous recevez une confirmation par email avec votre numéro de commande unique.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Livraison :</strong> Pour les produits numériques, la livraison se fait via email et Discord sous 24h maximum.
            </p>
            <p>
              <strong className="text-gray-200">Installation :</strong> Notre équipe support vous guidera via Discord pour l'installation et la configuration.
            </p>
          </section>

          {/* Tarifs et paiement */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Tarifs et Paiement</h2>
            <p className="mb-4">
              Tous les tarifs sont affichés en euros TTC. Les prix peuvent être modifiés sans préavis.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Moyens de paiement :</strong> Carte bancaire (via Stripe). Tous les paiements sont sécurisés et chiffrés.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Facture :</strong> Une facture est envoyée à votre adresse email après confirmation du paiement.
            </p>
            <p>
              <strong className="text-gray-200">Remboursement :</strong> Voir section "Droit de rétractation".
            </p>
          </section>

          {/* Droit de rétractation */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Droit de Rétractation</h2>
            <p className="mb-4">
              Conformément à la loi française, vous disposez d'un délai de 14 jours pour vous rétracter après votre achat.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Important :</strong> Comme nos produits sont des biens numériques, le droit de rétractation s'applique uniquement si vous n'avez pas commencé le téléchargement ou l'utilisation du produit.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Procédure de rétractation :</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Contactez-nous via Discord ou email dans les 14 jours</li>
              <li>Indiquez votre numéro de commande</li>
              <li>Confirmez que vous n'avez pas utilisé le produit</li>
              <li>Nous traiterons votre remboursement sous 7 jours</li>
            </ol>
          </section>

          {/* Abonnements */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Abonnements Récurrents</h2>
            <p className="mb-4">
              <strong className="text-gray-200">FUSION AI :</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Premier mois : 80 € (licence + installation)</li>
              <li>Renouvellement : 30 € par mois</li>
              <li>Facturation automatique le même jour chaque mois</li>
              <li>Annulation possible à tout moment (sans frais)</li>
            </ul>
            <p>
              Vous recevrez un email de rappel 7 jours avant chaque renouvellement.
            </p>
          </section>

          {/* Utilisation acceptable */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Utilisation Acceptable</h2>
            <p className="mb-4">
              Vous acceptez d'utiliser nos produits conformément à la loi et aux conditions d'utilisation des plateformes de jeux.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Interdictions :</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Partage ou revente de votre licence</li>
              <li>Rétro-ingénierie ou modification du code</li>
              <li>Utilisation à des fins commerciales sans autorisation</li>
              <li>Utilisation sur plusieurs comptes simultanément</li>
              <li>Contournement des mesures de sécurité</li>
            </ul>
          </section>

          {/* Garantie */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Garantie</h2>
            <p className="mb-4">
              OneScript garantit que ses produits fonctionnent conformément à la description fournie.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Limitations :</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Pas de garantie de résultats spécifiques (ex: amélioration de performance)</li>
              <li>Pas de garantie en cas de modification du système d'exploitation</li>
              <li>Pas de garantie en cas de mise à jour des jeux</li>
            </ul>
          </section>

          {/* Support */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Support Client</h2>
            <p className="mb-4">
              Un support technique est disponible via notre serveur Discord : https://discord.gg/XV9PhqbA4r
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Temps de réponse :</strong> Nous nous engageons à répondre à vos demandes sous 24h maximum.
            </p>
            <p>
              <strong className="text-gray-200">Email :</strong> onescript.fr@proton.me
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation de Responsabilité</h2>
            <p className="mb-4">
              OneScript ne peut être tenu responsable de :
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Les interdictions de compte imposées par les éditeurs de jeux</li>
              <li>Les pertes de données ou d'accès aux comptes</li>
              <li>Les dommages causés par une mauvaise utilisation</li>
              <li>Les interruptions de service ou les erreurs techniques</li>
            </ul>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Modifications des CGV</h2>
            <p>
              OneScript se réserve le droit de modifier ces CGV à tout moment. Les modifications entrent en vigueur dès leur publication. Votre utilisation continue des produits après modification constitue votre acceptation des nouvelles conditions.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Droit Applicable</h2>
            <p>
              Ces CGV sont régies par la loi française. Tout litige sera soumis à la juridiction compétente.
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
