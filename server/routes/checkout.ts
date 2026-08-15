import express from "express";
import Stripe from "stripe";
import { resolveCatalogOption } from "../lib/stripeCatalog.js";

const router = express.Router();

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("COLLE_") || key.includes("YOUR_")) {
    return null;
  }
  return new Stripe(key);
}

function getBaseUrl(req: express.Request) {
  return (
    process.env.BASE_URL ||
    `${req.headers["x-forwarded-proto"] || "https"}://${req.headers.host}` ||
    "https://onescript.fr"
  );
}

/** POST /api/checkout/create-checkout-session  (and POST /api/checkout) */
router.post(["/", "/create-checkout-session"], async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ error: "Stripe n'est pas configuré (STRIPE_SECRET_KEY)" });
    }

    const {
      productId,
      optionIndex,
      customerEmail,
      customerName,
      discordPseudo,
      orderNumber,
      game,
      cpu,
      gpu,
      os,
      inputMethod,
    } = req.body || {};

    if (!productId || optionIndex === undefined || optionIndex === null) {
      return res.status(400).json({ error: "productId et optionIndex requis" });
    }
    if (!customerEmail || !customerName || !orderNumber) {
      return res.status(400).json({ error: "customerEmail, customerName et orderNumber requis" });
    }

    const resolved = resolveCatalogOption(String(productId), Number(optionIndex));
    if (!resolved) {
      return res.status(400).json({ error: "Produit / option invalide" });
    }

    const { product, option } = resolved;
    const displayName = game
      ? `${game} — ${product.name}`
      : product.name;

    const baseUrl = getBaseUrl(req).replace(/\/$/, "");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: option.priceCents,
            product_data: {
              name: `${displayName} — ${option.label}`,
              description: option.description,
            },
          },
        },
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/purchase?product=${encodeURIComponent(productId)}${
        game ? `&game=${encodeURIComponent(String(game).toLowerCase().replace(/\s+/g, "-"))}` : ""
      }&canceled=1`,
      metadata: {
        orderNumber: String(orderNumber),
        productId: String(productId),
        optionIndex: String(optionIndex),
        optionLabel: option.label,
        productName: displayName,
        customerName: String(customerName),
        customerEmail: String(customerEmail),
        discordPseudo: String(discordPseudo || ""),
        game: String(game || ""),
        cpu: String(cpu || ""),
        gpu: String(gpu || ""),
        os: String(os || ""),
        inputMethod: String(inputMethod || ""),
        priceCents: String(option.priceCents),
      },
      billing_address_collection: "auto",
    });

    return res.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: unknown) {
    console.error("[Stripe] create-checkout-session:", error);
    const message = error instanceof Error ? error.message : "Erreur Stripe";
    return res.status(500).json({ error: message });
  }
});

/** GET /api/checkout/checkout-session/:sessionId */
router.get(["/checkout-session/:sessionId", "/session/:sessionId"], async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ error: "Stripe n'est pas configuré" });
    }

    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    return res.json({
      status: session.payment_status,
      customer_email: session.customer_email,
      total: session.amount_total,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error("[Stripe] retrieve session:", error);
    return res.status(500).json({ error: "Impossible de récupérer la session" });
  }
});

export default router;
