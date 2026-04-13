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
          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Purpose</h2>
            <p>
              These General Terms and Conditions of Sale (GTC) govern the sale of digital products and services offered by OneScript, including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>FUSION AI (software license + installation)</li>
              <li>Windows Optimization (system optimization software)</li>
              <li>Jitter Script (controller configuration script)</li>
              <li>Free trials and associated services</li>
            </ul>
          </section>

          {/* Access Conditions */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Access Conditions</h2>
            <p className="mb-4">
              To access and use OneScript products, you must:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Be at least 18 years old or have parental/guardian authorization</li>
              <li>Have a 64-bit Windows 10/11 system</li>
              <li>Accept these GTC and the privacy policy</li>
              <li>Provide accurate information during registration</li>
            </ul>
          </section>

          {/* Purchase Process */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Purchase Process</h2>
            <p className="mb-4">
              <strong className="text-gray-200">Order:</strong> You select a product and complete the payment form.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Payment:</strong> Payment is processed via Stripe. You receive an email confirmation with your unique order number.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Delivery:</strong> For digital products, delivery is via email and Discord within a maximum of 24 hours.
            </p>
            <p>
              <strong className="text-gray-200">Installation:</strong> Our support team will guide you via Discord for installation and configuration.
            </p>
          </section>

          {/* Pricing and Payment */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Pricing and Payment</h2>
            <p className="mb-4">
              All prices are displayed in euros, including VAT. Prices may be changed without prior notice.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Payment Methods:</strong> Credit card (via Stripe). All payments are secure and encrypted.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Invoice:</strong> An invoice is sent to your email address after payment confirmation.
            </p>
            <p>
              <strong className="text-gray-200">Refund:</strong> See "Refund Policy" section.
            </p>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Refund Policy</h2>
            
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p className="text-red-300 font-bold mb-2">⚠️ FUSION AI — Conditional Refund</p>
              <p className="text-sm text-red-200/90 leading-relaxed">
                Refunds for FUSION AI are possible <strong>only and exclusively</strong> if the following two conditions are met:
              </p>
              <p className="mb-4 text-red-200/90">
                <strong>Important:</strong> No refund will be processed or accepted if you have not read and understood the minimum PC configuration requirements. It is the customer's sole responsibility to ensure their hardware meets the necessary specifications before purchase. Purchases made with non-compliant configurations are considered final.
              </p>
            </div>

            <p className="mb-4">
              <strong className="text-gray-200">1. Insufficient Hardware Configuration:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-gray-300">
              <li>Your GPU is strictly below RTX 3060 (e.g., RTX 3050 or equivalent/inferior)</li>
              <li>Despite our complete optimization advice and a full Windows 10 reinstallation, FUSION AI does not function correctly</li>
              <li>You have followed all recommendations from our support team</li>
            </ul>

            <p className="mb-4">
              <strong className="text-gray-200">2. Refusal of Optimization:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4 text-gray-300">
              <li><strong>No refund</strong> will be granted if you refuse the modifications and optimizations recommended by our team</li>
              <li><strong>No refund</strong> if you refuse Windows 10 reinstallation (strongly recommended for low-end configurations)</li>
              <li>The refund only applies if you have accepted and followed all optimization steps</li>
            </ul>

            <p className="mb-4">
              <strong className="text-gray-200">Refund Procedure:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-300">
              <li>Contact us via Discord or email with your order number and GPU specifications</li>
              <li>We will verify that your configuration is indeed below RTX 3060</li>
              <li>We will confirm that you have followed all recommended optimization steps</li>
              <li>If the conditions are met, we will process your refund within 7 days</li>
            </ol>

            <div className="mt-4 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
              <p className="text-amber-300 font-bold mb-2">💡 Recommendation</p>
              <p className="text-sm text-amber-200/90 leading-relaxed">
                <strong>Windows 10</strong> is strongly recommended for low-end GPU configurations. This significantly optimizes FUSION AI performance and reduces compatibility issues.
              </p>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              <strong className="text-gray-200">Other Products:</strong> For Windows Optimization and Jitter Script, the standard right of withdrawal applies (14 days, without product use). For FUSION AI, the above conditions apply exclusively.
            </p>
          </section>

          {/* Subscriptions */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Recurring Subscriptions</h2>
            <p className="mb-4">
              <strong className="text-gray-200">FUSION AI:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>First month: €80 (license + installation)</li>
              <li>Renewal: €30 per month</li>
              <li>Automatic billing on the same day each month</li>
              <li>Cancellation possible at any time (no fees)</li>
            </ul>
            <p>
              You will receive a reminder email 7 days before each renewal.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Acceptable Use</h2>
            <p className="mb-4">
              You agree to use our products in accordance with the law and the terms of use of gaming platforms.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Prohibitions:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Sharing or reselling your license</li>
              <li>Reverse engineering or modifying the code</li>
              <li>Commercial use without authorization</li>
              <li>Simultaneous use on multiple accounts</li>
              <li>Bypassing security measures</li>
            </ul>
          </section>

          {/* Warranty */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Warranty</h2>
            <p className="mb-4">
              OneScript guarantees that its products function in accordance with the description provided.
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Limitations:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>No guarantee of specific results (e.g., performance improvement)</li>
              <li>No guarantee in case of operating system modification</li>
              <li>No guarantee in case of game updates</li>
            </ul>
          </section>

          {/* Customer Support */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Customer Support</h2>
            <p className="mb-4">
              Technical support is available via our Discord server: https://discord.gg/XV9PhqbA4r
            </p>
            <p className="mb-4">
              <strong className="text-gray-200">Response Time:</strong> We commit to responding to your requests within a maximum of 24 hours.
            </p>
            <p>
              <strong className="text-gray-200">Email:</strong> onescript.fr@proton.me
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
            <p className="mb-4">
              OneScript cannot be held responsible for:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Account bans imposed by game publishers</li>
              <li>Loss of data or account access</li>
              <li>Damage caused by misuse</li>
              <li>Service interruptions or technical errors</li>
            </ul>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Modifications to the GTC</h2>
            <p>
              OneScript reserves the right to modify these GTC at any time. Modifications come into effect upon their publication. Your continued use of the products after modification constitutes your acceptance of the new conditions.
            </p>
          </section>

          {/* Applicable Law */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Applicable Law</h2>
            <p>
              These GTC are governed by French law. Any dispute will be submitted to the competent jurisdiction.
            </p>
          </section>

          {/* Last Update */}
          <div className="pt-4 border-t border-purple-500/20">
            <p className="text-sm text-gray-400">
              Last Update: {new Date().toLocaleDateString("en-US")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
