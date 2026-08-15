import express from "express";
import Stripe from "stripe";

const router = express.Router();

async function fulfillPaidSession(session: Stripe.Checkout.Session) {
  const meta = session.metadata || {};
  const orderNumber = meta.orderNumber || session.id;
  const customerName = meta.customerName || "Client";
  const customerEmail = meta.customerEmail || session.customer_email || "";
  const productName = meta.productName || "OneScript";
  const optionLabel = meta.optionLabel || "";
  const priceCents = Number(meta.priceCents || session.amount_total || 0);
  const price = (priceCents / 100).toFixed(2);

  // Customer email (best-effort)
  if (customerEmail) {
    try {
      await fetch(`${process.env.BASE_URL || "https://onescript.fr"}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: customerEmail,
          props: {
            orderNumber,
            customerName,
            customerEmail,
            productName,
            productOption: optionLabel,
            discordPseudo: meta.discordPseudo || "",
            price: Number(price),
            cpu: meta.cpu || "",
            gpu: meta.gpu || "",
            os: meta.os || "",
            inputMethod: meta.inputMethod || "N/A",
          },
        }),
      });
    } catch (e) {
      console.error("[Stripe webhook] email failed:", e);
    }
  }

  // Discord notification
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (webhook && !webhook.includes("YOUR_WEBHOOK")) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: null,
          embeds: [
            {
              title: "✅ Paiement Stripe confirmé",
              color: 0x7b2eff,
              fields: [
                { name: "Commande", value: orderNumber, inline: true },
                { name: "Montant", value: `${price} €`, inline: true },
                { name: "Client", value: customerName, inline: true },
                { name: "Email", value: customerEmail || "—", inline: true },
                { name: "Discord", value: meta.discordPseudo || "—", inline: true },
                { name: "Produit", value: `${productName} — ${optionLabel}` },
                { name: "Session", value: session.id },
              ],
            },
          ],
        }),
      });
    } catch (e) {
      console.error("[Stripe webhook] discord failed:", e);
    }
  }

  console.log("[Stripe webhook] fulfilled", orderNumber, session.id);
}

/**
 * POST /api/checkout/webhook
 * Requires express.raw body — mounted separately in server/index.ts
 */
router.post("/", async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || stripeKey.includes("COLLE_")) {
    return res.status(500).json({ error: "Stripe non configuré" });
  }

  const stripe = new Stripe(stripeKey);
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;
  try {
    if (webhookSecret && !webhookSecret.includes("COLLE_") && typeof sig === "string") {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } else {
      // Dev fallback without webhook secret (not for production)
      event = typeof req.body === "string" || Buffer.isBuffer(req.body)
        ? JSON.parse(req.body.toString())
        : req.body;
      console.warn("[Stripe webhook] signature non vérifiée (STRIPE_WEBHOOK_SECRET manquant)");
    }
  } catch (err) {
    console.error("[Stripe webhook] signature invalid:", err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : "invalid"}`);
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "unpaid") {
        await fulfillPaidSession(session);
      }
    }
    res.json({ received: true });
  } catch (e) {
    console.error("[Stripe webhook] handler error:", e);
    res.status(500).json({ error: "handler failed" });
  }
});

export default router;
