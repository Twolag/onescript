import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sessionId = (req.query.session_id || req.query.id) as string | undefined;
  if (!sessionId) {
    return res.status(400).json({ error: "session_id requis" });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return res.status(500).json({ error: "Stripe non configuré" });
  }

  try {
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.status(200).json({
      status: session.payment_status,
      customer_email: session.customer_email,
      total: session.amount_total,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Impossible de récupérer la session" });
  }
}
