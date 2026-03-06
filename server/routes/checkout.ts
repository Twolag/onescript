import express from "express";
import Stripe from "stripe";

const router = express.Router();

// Initialiser Stripe avec la clé secrète depuis les variables d'environnement
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY n'est pas définie");
}
const stripe = new Stripe(stripeSecretKey);

// URL de base (à adapter selon votre environnement)
const BASE_URL = process.env.BASE_URL || "https://onescript-five.vercel.app";

// Créer une session de paiement Stripe
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, customerEmail, customerName } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Pas d'articles dans la commande" });
    }

    // Préparer les line items pour Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price, // en cents
      },
      quantity: 1,
    }));

    // Créer la session de paiement
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/purchase`,
      metadata: {
        customerName: customerName,
        customerEmail: customerEmail,
      },
    });

    res.json({ sessionId: session.id, clientSecret: session.client_secret });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    res.status(500).json({ error: "Erreur lors de la création de la session de paiement" });
  }
});

// Récupérer les détails d'une session
router.get("/checkout-session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.payment_status,
      customer_email: session.customer_email,
      total: session.amount_total,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error("Erreur Stripe:", error);
    res.status(500).json({ error: "Erreur lors de la récupération de la session" });
  }
});

export default router;
