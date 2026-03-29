import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      bookingId,
      customerName,
      email,
      discordPseudo,
      serviceName,
      servicePrice,
      serviceDuration,
      date,
      timeSlot,
      cpu,
      gpu,
      os,
    } = req.body;

    if (!bookingId || !customerName || !email || !discordPseudo || !serviceName || !date || !timeSlot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.DISCORD_WEBHOOK_URL) {
      return res.status(500).json({ error: 'DISCORD_WEBHOOK_URL not configured' });
    }

    const BASE_URL = process.env.BASE_URL || 'https://onescript.fr';

    // Links for manual validation
    const confirmUrl = `${BASE_URL}/api/booking-confirm?id=${encodeURIComponent(bookingId)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&service=${encodeURIComponent(serviceName)}&price=${servicePrice}&discord=${encodeURIComponent(discordPseudo)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(timeSlot)}&cpu=${encodeURIComponent(cpu || '')}&gpu=${encodeURIComponent(gpu || '')}&os=${encodeURIComponent(os || '')}`;
    const cancelUrl = `${BASE_URL}/api/booking-cancel?id=${encodeURIComponent(bookingId)}&customer=${encodeURIComponent(customerName)}&email=${encodeURIComponent(email)}&service=${encodeURIComponent(serviceName)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(timeSlot)}&discord=${encodeURIComponent(discordPseudo)}`;

    // Format date for display
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Send Discord notification
    const result = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '📅 New Booking Request',
          color: 0x7b2eff,
          fields: [
            { name: 'Booking ID', value: `\`${bookingId}\``, inline: false },
            { name: '👤 Customer', value: customerName, inline: true },
            { name: '📧 Email', value: email, inline: true },
            { name: '💬 Discord', value: discordPseudo, inline: true },
            { name: '🛠️ Service', value: serviceName, inline: true },
            { name: '💰 Price', value: `**${servicePrice}€**`, inline: true },
            { name: '⏱️ Duration', value: serviceDuration || 'N/A', inline: true },
            { name: '📆 Date', value: formattedDate, inline: true },
            { name: '🕐 Time Slot', value: `**${timeSlot}**`, inline: true },
            ...(cpu || gpu || os ? [{ name: '🖥️ Hardware', value: `**CPU:** ${cpu || 'N/A'}\n**GPU:** ${gpu || 'N/A'}\n**OS:** ${os || 'N/A'}`, inline: false }] : []),
            { name: '✅ Accept Booking', value: `[Click here to confirm and notify the client](${confirmUrl})`, inline: false },
            { name: '❌ Decline Booking', value: `[Click here to decline and notify the client](${cancelUrl})`, inline: false },
          ],
          footer: { text: 'OneScript — Booking Request' },
          timestamp: new Date().toISOString(),
        }],
      }),
    });

    if (!result.ok) {
      const errorText = await result.text();
      console.error('Discord webhook error:', errorText);
      return res.status(500).json({ error: 'Discord webhook failed' });
    }

    return res.status(200).json({ success: true, bookingId });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Booking request error:', message);
    return res.status(500).json({ error: message });
  }
}
