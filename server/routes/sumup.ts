import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Clé API SumUp depuis les variables d'environnement
const SUMUP_API_KEY = process.env.SUMUP_API_KEY;
if (!SUMUP_API_KEY) {
  console.warn("[SumUp] SUMUP_API_KEY n'est pas définie");
}

const SUMUP_API_URL = "https://api.sumup.com/v0.1";
const BASE_URL = process.env.BASE_URL || "https://onescript-five.vercel.app";

// Créer un checkout SumUp
router.post("/create-checkout", async (req, res) => {
  try {
    const { items, customerEmail, customerName, discordPseudo } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Pas d'articles dans la commande" });
    }

    if (!SUMUP_API_KEY) {
      return res.status(500).json({ error: "Configuration SumUp manquante" });
    }

    // Calculer le total en centimes
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.price * 100), 0);

    // Préparer la description
    const description = items.map((item: any) => `${item.name} - ${item.label}`).join(", ");

    // Créer le checkout SumUp
    const checkoutPayload = {
      checkout_reference: `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      amount: Math.round(totalAmount),
      currency: "EUR",
      pay_to_email: "onescript.fr@proton.me", // Email du compte SumUp
      description: description,
      customer_email: customerEmail,
      customer_name: customerName,
      return_url: `${BASE_URL}/purchase?success=true`,
      cancel_url: `${BASE_URL}/purchase?cancelled=true`,
      metadata: {
        discord_pseudo: discordPseudo,
        items: JSON.stringify(items),
      },
    };

    console.log("[SumUp] Création de checkout avec payload:", checkoutPayload);

    // Appeler l'API SumUp
    const response = await fetch(`${SUMUP_API_URL}/checkouts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${SUMUP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[SumUp] Erreur API:", errorData);
      return res.status(response.status).json({
        error: "Erreur lors de la création du paiement",
        details: errorData,
      });
    }

    const checkoutData = await response.json();
    console.log("[SumUp] Checkout créé avec succès:", checkoutData);

    res.json({
      success: true,
      checkoutId: checkoutData.id,
      checkoutReference: checkoutData.checkout_reference,
      paymentUrl: checkoutData.payment_url,
    });
  } catch (error) {
    console.error("[SumUp] Erreur serveur:", error);
    res.status(500).json({
      error: "Erreur lors de la création du paiement",
      message: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
});

// Récupérer les détails d'un checkout
router.get("/checkout/:checkoutId", async (req, res) => {
  try {
    const { checkoutId } = req.params;

    if (!SUMUP_API_KEY) {
      return res.status(500).json({ error: "Configuration SumUp manquante" });
    }

    const response = await fetch(`${SUMUP_API_URL}/checkouts/${checkoutId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${SUMUP_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[SumUp] Erreur API:", errorData);
      return res.status(response.status).json({ error: "Erreur lors de la récupération du checkout" });
    }

    const checkoutData = await response.json();
    res.json(checkoutData);
  } catch (error) {
    console.error("[SumUp] Erreur serveur:", error);
    res.status(500).json({ error: "Erreur lors de la récupération du checkout" });
  }
});

export default router;
