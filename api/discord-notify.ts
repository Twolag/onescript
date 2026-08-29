import type { VercelRequest, VercelResponse } from "@vercel/node";

const LAGMAN_ORDERS_URL = "https://lagmanbot-production.up.railway.app/api/orders";

function formatAmount(price: unknown): string {
  if (typeof price === "number" && Number.isFinite(price)) {
    return `${price.toFixed(2)}€`;
  }
  const raw = String(price ?? "").trim();
  if (!raw) return "0.00€";
  if (raw.includes("€")) return raw;
  const n = Number(raw);
  if (Number.isFinite(n)) return `${n.toFixed(2)}€`;
  return `${raw}€`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      orderNumber,
      customerName,
      email,
      discordPseudo,
      productName,
      optionLabel,
      price,
      paymentMethod,
    } = req.body || {};

    if (!orderNumber || !email || !productName) {
      return res.status(400).json({ error: "Missing order fields" });
    }

    const payload = {
      order_number: String(orderNumber),
      customer: String(customerName || discordPseudo || ""),
      email: String(email),
      discord: String(discordPseudo || ""),
      product: String(productName),
      option: String(optionLabel || ""),
      amount: formatAmount(price),
      currency: "EUR",
      provider: paymentMethod === "paypal" || !paymentMethod ? "paypal" : String(paymentMethod),
    };

    // PayPal pending orders → LagMan only (no DISCORD_WEBHOOK_URL / oneweb embed)
    const result = await fetch(LAGMAN_ORDERS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      const detail = await result.text().catch(() => "");
      console.error("[lagman] order notify failed", result.status, detail);
      return res.status(502).json({ error: "LagMan order notify failed", status: result.status });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[lagman] order notify error", message);
    return res.status(500).json({ error: message });
  }
}
