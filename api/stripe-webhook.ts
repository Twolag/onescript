import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { fulfillStripeSession } from "./_stripePaid.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Stripe webhook — Hobby-friendly (1 function).
 * URL: https://onescript.fr/api/stripe-webhook
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Stripe non configuré" });
  }

  const stripe = new Stripe(secret);
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;
  try {
    const buf = await readRawBody(req);
    if (
      webhookSecret &&
      typeof sig === "string" &&
      !webhookSecret.includes("YOUR_") &&
      !webhookSecret.includes("COLLE_")
    ) {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } else {
      event = JSON.parse(buf.toString());
      console.warn("[stripe-webhook] signature not verified");
    }
  } catch (err) {
    console.error("[stripe-webhook] invalid signature", err);
    return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : "invalid"}`);
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "unpaid") {
        await fulfillStripeSession(session.id);
      }
    }
    return res.status(200).json({ received: true });
  } catch (e) {
    console.error("[stripe-webhook] handler", e);
    return res.status(500).json({ error: "handler failed" });
  }
}
