import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { orderNumber, customerName, email, discordPseudo, productName, optionLabel, price } = req.body;

    if (!process.env.DISCORD_WEBHOOK_URL) {
      return res.status(500).json({ error: 'DISCORD_WEBHOOK_URL not configured' });
    }

    const BASE_URL = process.env.BASE_URL || 'https://onescript.fr';

    // Lien de confirmation (clic = envoie l'email au client)
    const confirmUrl = `${BASE_URL}/api/confirm-order?order=${encodeURIComponent(orderNumber)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(productName)}&option=${encodeURIComponent(optionLabel)}&price=${price}&discord=${encodeURIComponent(discordPseudo)}`;

    const result = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '🛒 Nouvelle commande en attente',
          color: 0xc8ff00,
          fields: [
            { name: 'N° commande', value: `\`${orderNumber}\``, inline: false },
            { name: '👤 Client', value: customerName, inline: true },
            { name: '📧 Email', value: email, inline: true },
            { name: '💬 Discord', value: discordPseudo, inline: true },
            { name: '🎮 Produit', value: productName, inline: true },
            { name: '📦 Option', value: optionLabel, inline: true },
            { name: '💰 Montant', value: `**${price}€**`, inline: true },
            { name: '✅ Confirmer le paiement', value: `[Cliquez ici pour envoyer l'email de confirmation](${confirmUrl})`, inline: false },
            { name: '❌ Annuler la commande', value: `[Cliquez ici pour annuler et notifier le client](${BASE_URL}/api/cancel-order?order=${encodeURIComponent(orderNumber)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&product=${encodeURIComponent(productName)}&option=${encodeURIComponent(optionLabel)}&price=${price}&discord=${encodeURIComponent(discordPseudo)})`, inline: false },
          ],
          footer: { text: 'OneScript — En attente de paiement' },
          timestamp: new Date().toISOString(),
        }],
      }),
    });

    if (!result.ok) {
      return res.status(500).json({ error: 'Discord webhook failed' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
