import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

/**
 * Verify Checkout session is paid, notify Discord once.
 * Called from /success after Stripe redirects back.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: "Configuration Stripe manquante" });
  }

  const sessionId = req.body?.sessionId as string | undefined;
  if (!sessionId) {
    return res.status(400).json({ error: "sessionId requis" });
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "unpaid") {
      return res.status(200).json({ paid: false, status: session.payment_status });
    }

    const meta = { ...(session.metadata || {}) };
    const alreadyNotified = meta.discordNotified === "true";

    const orderNumber = meta.orderNumber || session.id;
    const customerName = meta.customerName || "Client";
    const email = meta.customerEmail || session.customer_email || "";
    const productName = meta.productName || "OneScript";
    const optionLabel = meta.optionLabel || "";
    const priceCents = Number(meta.priceCents || session.amount_total || 0);
    const price = priceCents / 100;

    if (!alreadyNotified && process.env.DISCORD_WEBHOOK_URL && !process.env.DISCORD_WEBHOOK_URL.includes("YOUR_WEBHOOK")) {
      const BASE_URL = process.env.BASE_URL || "https://onescript.fr";
      const confirmUrl = `${BASE_URL}/api/confirm-order?order=${encodeURIComponent(orderNumber)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(productName)}&option=${encodeURIComponent(optionLabel)}&price=${price}&discord=${encodeURIComponent(meta.discordPseudo || "")}&cpu=${encodeURIComponent(meta.cpu || "")}&gpu=${encodeURIComponent(meta.gpu || "")}&os=${encodeURIComponent(meta.os || "")}`;
      const cancelUrl = `${BASE_URL}/api/cancel-order?order=${encodeURIComponent(orderNumber)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(productName)}&option=${encodeURIComponent(optionLabel)}&price=${price}&discord=${encodeURIComponent(meta.discordPseudo || "")}`;

      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "✅ Paiement Stripe confirmé",
              color: 0x635bff,
              fields: [
                { name: "Order N°", value: `\`${orderNumber}\``, inline: false },
                { name: "👤 Customer", value: customerName, inline: true },
                { name: "📧 Email", value: email || "—", inline: true },
                { name: "💬 Discord", value: meta.discordPseudo || "—", inline: true },
                { name: "🎮 Product", value: productName, inline: true },
                { name: "📦 Option", value: optionLabel || "—", inline: true },
                { name: "💳 Payment", value: "💳 Stripe (Card) — PAID", inline: true },
                { name: "💰 Amount", value: `**${price.toFixed(2)}€**`, inline: true },
                {
                  name: "🖥️ Hardware",
                  value: `**CPU:** ${meta.cpu || "—"}\n**GPU:** ${meta.gpu || "—"}\n**OS:** ${meta.os || "—"}`,
                  inline: false,
                },
                { name: "✅ Confirm / deliver", value: `[Send confirmation email](${confirmUrl})`, inline: false },
                { name: "❌ Cancel", value: `[Cancel order](${cancelUrl})`, inline: false },
              ],
              footer: { text: "OneScript — Stripe paid" },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      try {
        await stripe.checkout.sessions.update(sessionId, {
          metadata: { ...meta, discordNotified: "true" },
        });
      } catch (e) {
        console.error("[stripe-fulfill] metadata update failed", e);
      }
    }

    return res.status(200).json({
      paid: true,
      status: session.payment_status,
      orderNumber,
      total: session.amount_total,
      metadata: meta,
      notified: !alreadyNotified,
    });
  } catch (error) {
    console.error("[stripe-fulfill]", error);
    const message = error instanceof Error ? error.message : "Erreur";
    return res.status(500).json({ error: message });
  }
}
