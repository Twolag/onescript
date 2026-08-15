import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { fulfillStripeSession } from "./_stripePaid.js";

const STRIPE_CATALOG: Record<
  string,
  { name: string; options: { label: string; priceCents: number; description: string }[] }
> = {
  "ai-engine": {
    name: "FUSION AI",
    options: [
      { label: "1 Week (Setup + Support + License)", priceCents: 2500, description: "Complete setup + 7 days support." },
      { label: "1 Week (License Only)", priceCents: 1500, description: "7 days license + PDF guide." },
      { label: "Weekly Renewal", priceCents: 1000, description: "Renewal for existing users." },
      { label: "License Only (Monthly)", priceCents: 4000, description: "1 month license + PDF guide." },
      { label: "1 Month (Setup + Support + License)", priceCents: 6000, description: "Complete setup + 30 days support." },
      { label: "Help Installation (PDF users)", priceCents: 3000, description: "Remote installation help." },
      { label: "Annual Subscription", priceCents: 15000, description: "12 months access." },
      { label: "Lifetime License", priceCents: 25000, description: "Permanent access." },
      { label: "Monthly Renewal", priceCents: 3000, description: "Monthly renewal." },
      { label: "Advanced AI Weight — Apex Legends", priceCents: 1000, description: "AI Weight add-on Apex." },
      { label: "Advanced AI Weight — Fortnite", priceCents: 1000, description: "AI Weight add-on Fortnite." },
    ],
  },
  "windows-opt": {
    name: "Windows Optimization",
    options: [
      { label: "Simple Optimization", priceCents: 2000, description: "Full system optimization." },
      { label: "Optimization + Windows Reinstall", priceCents: 4000, description: "Reinstall + optimization." },
    ],
  },
  "jitter-script": {
    name: "Jitter Script",
    options: [
      { label: "1 day", priceCents: 250, description: "1 day" },
      { label: "1 week", priceCents: 500, description: "1 week" },
      { label: "1 month", priceCents: 1500, description: "1 month" },
      { label: "3 months", priceCents: 2000, description: "3 months" },
      { label: "6 months", priceCents: 2500, description: "6 months" },
      { label: "1 year", priceCents: 3000, description: "1 year" },
      { label: "Lifetime", priceCents: 4000, description: "Lifetime" },
    ],
  },
};

/**
 * Consolidated Stripe API (counts as 1 Serverless Function on Hobby plan):
 * - POST { action: "fulfill", sessionId } → verify paid + Discord
 * - POST { productId, optionIndex, ... } → create Checkout session
 * - GET  ?session_id=... → retrieve session status
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: "Configuration Stripe manquante" });
  }

  try {
    // GET session status
    if (req.method === "GET") {
      const sessionId = (req.query.session_id || req.query.id) as string | undefined;
      if (!sessionId) {
        return res.status(400).json({ error: "session_id requis" });
      }
      const stripe = new Stripe(secret);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return res.status(200).json({
        status: session.payment_status,
        customer_email: session.customer_email,
        total: session.amount_total,
        metadata: session.metadata,
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const body = req.body || {};

    // Fulfill after payment (from /success)
    if (body.action === "fulfill" || (body.sessionId && !body.productId)) {
      const sessionId = body.sessionId as string;
      if (!sessionId) {
        return res.status(400).json({ error: "sessionId requis" });
      }
      const result = await fulfillStripeSession(sessionId);
      return res.status(200).json(result);
    }

    // Create Checkout session
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
    } = body;

    const product = STRIPE_CATALOG[productId];
    const option = product?.options?.[Number(optionIndex)];
    if (!product || !option) {
      return res.status(400).json({ error: "Produit / option invalide" });
    }
    if (!customerEmail || !customerName || !orderNumber) {
      return res.status(400).json({ error: "Données client manquantes" });
    }

    const stripe = new Stripe(secret);
    const displayName = game ? `${game} — ${product.name}` : product.name;
    const baseUrl = (process.env.BASE_URL || "https://onescript.fr").replace(/\/$/, "");

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
      cancel_url: `${baseUrl}/purchase?canceled=1`,
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

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    console.error("Stripe error:", error);
    const message = error instanceof Error ? error.message : "Erreur Stripe";
    return res.status(500).json({ error: message });
  }
}
