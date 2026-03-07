import express from "express";
import { sendOrderEmails } from "../services/email.js";

const router = express.Router();

/**
 * Route pour envoyer les e-mails de commande
 * POST /api/orders/send-emails
 */
router.post("/send-emails", async (req, res) => {
  try {
    console.log("[Orders API] Requête reçue:", req.body);
    
    const {
      orderNumber,
      customerEmail,
      customerName,
      discordPseudo,
      productName,
      productOption,
      price,
    } = req.body;

    // Validation basique
    if (!orderNumber || !customerEmail || !customerName) {
      console.error("[Orders API] Données manquantes");
      return res.status(400).json({ error: "Données manquantes" });
    }

    console.log("[Orders API] Envoi des e-mails pour la commande:", orderNumber);
    
    // Envoyer les e-mails
    const result = await sendOrderEmails({
      orderNumber,
      customerEmail,
      customerName,
      discordPseudo,
      productName,
      productOption,
      price,
    });

    // Retourner le résultat (même si les e-mails ont échoué, on retourne 200)
    // Car le paiement ne doit pas être bloqué
    console.log("[Orders API] Résultat:", result);
    res.json({
      success: true,
      orderNumber,
      emailsSent: {
        client: result.client,
        admin: result.admin,
      },
    });
  } catch (error) {
    console.error("[Orders API] Erreur:", error);
    // Retourner 200 même en cas d'erreur pour ne pas bloquer le paiement
    res.json({
      success: true,
      orderNumber: req.body.orderNumber,
      error: "Erreur lors de l'envoi des e-mails, mais la commande a été créée",
    });
  }
});

export default router;
