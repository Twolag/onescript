import Stripe from "stripe";
import { registerOrderOnOneSupport } from "./_notify-onesupport.js";

/**
 * Shared helper (file starts with _ → not a Vercel Serverless Function).
 * Verifies payment and notifies Discord once (card or PayPal via Stripe).
 */
async function resolveStripePaymentLabel(stripe: Stripe, session: Stripe.Checkout.Session) {
  try {
    const expanded = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["payment_intent.payment_method"],
    });
    const pi = expanded.payment_intent;
    if (pi && typeof pi !== "string") {
      const pm = pi.payment_method;
      if (pm && typeof pm !== "string" && pm.type) {
        if (pm.type === "paypal") return { label: "🅿️ Stripe — PayPal — PAID", kind: "paypal" as const };
        if (pm.type === "card") return { label: "💳 Stripe — Card — PAID", kind: "card" as const };
        return { label: `💳 Stripe — ${pm.type} — PAID`, kind: pm.type };
      }
    }
  } catch (e) {
    console.error("[stripe] payment method resolve failed", e);
  }
  return { label: "💳 Stripe — PAID", kind: "stripe" as const };
}

export async function fulfillStripeSession(sessionId: string) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("Configuration Stripe manquante");
  }

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "unpaid") {
    return { paid: false as const, status: session.payment_status };
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
  const payment = await resolveStripePaymentLabel(stripe, session);

  if (
    !alreadyNotified &&
    process.env.DISCORD_WEBHOOK_URL &&
    !process.env.DISCORD_WEBHOOK_URL.includes("YOUR_WEBHOOK")
  ) {
    const BASE_URL = process.env.BASE_URL || "https://onescript.fr";
    const confirmUrl = `${BASE_URL}/api/confirm-order?order=${encodeURIComponent(orderNumber)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(productName)}&option=${encodeURIComponent(optionLabel)}&price=${price}&discord=${encodeURIComponent(meta.discordPseudo || "")}&cpu=${encodeURIComponent(meta.cpu || "")}&gpu=${encodeURIComponent(meta.gpu || "")}&os=${encodeURIComponent(meta.os || "")}`;
    const cancelUrl = `${BASE_URL}/api/cancel-order?order=${encodeURIComponent(orderNumber)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(productName)}&option=${encodeURIComponent(optionLabel)}&price=${price}&discord=${encodeURIComponent(meta.discordPseudo || "")}`;

    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: payment.kind === "paypal" ? "✅ Paiement PayPal confirmé (Stripe)" : "✅ Paiement Stripe confirmé",
            color: payment.kind === "paypal" ? 0x0070ba : 0x635bff,
            fields: [
              { name: "Order N°", value: `\`${orderNumber}\``, inline: false },
              { name: "👤 Customer", value: customerName, inline: true },
              { name: "📧 Email", value: email || "—", inline: true },
              { name: "💬 Discord", value: meta.discordPseudo || "—", inline: true },
              { name: "🎮 Product", value: productName, inline: true },
              { name: "📦 Option", value: optionLabel || "—", inline: true },
              { name: "💳 Payment", value: payment.label, inline: true },
              { name: "💰 Amount", value: `**${price.toFixed(2)}€**`, inline: true },
              {
                name: "🖥️ Hardware",
                value: `**CPU:** ${meta.cpu || "—"}\n**GPU:** ${meta.gpu || "—"}\n**OS:** ${meta.os || "—"}`,
                inline: false,
              },
              { name: "✅ Confirm / deliver", value: `[Send confirmation email](${confirmUrl})`, inline: false },
              { name: "❌ Cancel", value: `[Cancel order](${cancelUrl})`, inline: false },
            ],
            footer: { text: "OneScript — Stripe paid (verified)" },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    await registerOrderOnOneSupport({
      ref: orderNumber,
      customer: customerName,
      email,
      discord: meta.discordPseudo || "",
      product: productName,
      option: optionLabel,
      price,
      payment: payment.kind === "paypal" ? "stripe_paypal" : "stripe",
      confirmUrl,
      cancelUrl,
    });

    try {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: { ...meta, discordNotified: "true", paymentKind: payment.kind },
      });
    } catch (e) {
      console.error("[stripe] metadata update failed", e);
    }
  }

  return {
    paid: true as const,
    status: session.payment_status,
    orderNumber,
    total: session.amount_total,
    metadata: meta,
    paymentKind: payment.kind,
    notified: !alreadyNotified,
  };
}
