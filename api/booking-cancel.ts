import { Resend } from 'resend';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id, customer, email, service, date, time, discord } = req.query;

  if (!email || !id) {
    return res.status(400).send(errorPage('Missing required parameters'));
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const firstName = (customer as string)?.split(' ')[0] || 'there';

    // Format date for display
    const dateObj = new Date(date as string);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Send cancellation email to client
    await resend.emails.send({
      from: 'OneScript <noreply@onescript.fr>',
      to: email as string,
      subject: `❌ Booking Unavailable – ${service} | OneScript`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background-color:#111111;border:1px solid #222;border-radius:12px 12px 0 0;padding:40px;text-align:center;">
            <div style="display:inline-block;background-color:#7b2eff;border-radius:8px;padding:8px 20px;margin-bottom:24px;">
              <span style="color:#fff;font-weight:800;font-size:18px;letter-spacing:2px;text-transform:uppercase;">OneScript</span>
            </div>
            <h1 style="margin:0 0 8px 0;color:#fff;font-size:28px;font-weight:700;">Slot Unavailable ⚠️</h1>
            <p style="margin:0;color:#888;font-size:15px;">Hey ${firstName}, we're sorry but this slot is no longer available.</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#111;border-left:1px solid #222;border-right:1px solid #222;padding:40px;">
            <p style="color:#ccc;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
              Hey ${firstName} 👋<br><br>
              Unfortunately, the time slot you requested is <strong style="color:#ff4444;">no longer available</strong>. This can happen when another booking was confirmed at the same time.
            </p>

            <!-- Cancelled Slot -->
            <div style="background:#1a1a1a;border:1px solid #ff4444;border-radius:12px;padding:28px;margin-bottom:32px;text-align:center;">
              <p style="margin:0 0 8px 0;color:#ff4444;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">❌ Requested Slot</p>
              <p style="margin:0 0 4px 0;color:#fff;font-size:20px;font-weight:700;text-decoration:line-through;opacity:0.6;">${formattedDate}</p>
              <p style="margin:0;color:#ff4444;font-size:24px;font-weight:900;text-decoration:line-through;opacity:0.6;">${time}</p>
            </div>

            <!-- Next Steps -->
            <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:3px solid #7b2eff;border-radius:8px;padding:24px;margin-bottom:32px;">
              <p style="margin:0 0 12px 0;color:#7b2eff;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">💡 What to do next?</p>
              <p style="margin:0;color:#ccc;font-size:14px;line-height:1.8;">
                You can <strong style="color:#fff;">book a new slot</strong> directly on our website, or contact us on Discord (<strong style="color:#fff;">${discord}</strong>) and we'll find a time that works for you.
              </p>
            </div>

            <!-- CTA Buttons -->
            <div style="text-align:center;margin-bottom:24px;">
              <a href="https://onescript.fr/booking" style="display:inline-block;background-color:#7b2eff;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;margin-right:12px;">Book a New Slot →</a>
            </div>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://discord.gg/XV9PhqbA4r" style="display:inline-block;background-color:#5865F2;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;">Contact us on Discord →</a>
            </div>

            <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">Questions? Reply to this email.<br>— The OneScript Team</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;border:1px solid #222;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#444;font-size:12px;">
              © ${new Date().getFullYear()} OneScript · <a href="https://onescript.fr" style="color:#444;text-decoration:none;">onescript.fr</a><br>
              <span style="font-family:monospace;color:#333;">Ref: ${id}</span>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // Notify Discord that booking was declined
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '❌ Booking Declined',
            color: 0xff4444,
            fields: [
              { name: 'Booking ID', value: `\`${id}\``, inline: false },
              { name: '👤 Customer', value: customer as string, inline: true },
              { name: '💬 Discord', value: discord as string, inline: true },
              { name: '🛠️ Service', value: service as string, inline: true },
              { name: '📆 Requested Date', value: formattedDate, inline: true },
              { name: '🕐 Requested Time', value: time as string, inline: true },
            ],
            footer: { text: 'OneScript — Booking Declined ❌' },
            timestamp: new Date().toISOString(),
          }],
        }),
      });
    }

    return res.status(200).send(successPage(
      'Booking Declined',
      `Cancellation email sent to <strong style="color:#fff;">${email}</strong>`,
      '❌'
    ));

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Booking cancel error:', message);
    return res.status(500).send(errorPage(`Error: ${message}`));
  }
}

function successPage(title: string, subtitle: string, emoji: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>${title}</title></head>
<body style="font-family:sans-serif;text-align:center;padding:80px 20px;background:#0a0a0a;color:#fff;">
  <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;padding:48px;">
    <div style="font-size:64px;margin-bottom:24px;">${emoji}</div>
    <h1 style="color:#7b2eff;margin:0 0 16px 0;">${title}</h1>
    <p style="color:#888;margin:0 0 32px 0;">${subtitle}</p>
    <p style="color:#666;font-size:14px;">You can close this page.</p>
  </div>
</body>
</html>`;
}

function errorPage(message: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Error</title></head>
<body style="font-family:sans-serif;text-align:center;padding:80px 20px;background:#0a0a0a;color:#fff;">
  <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;padding:48px;">
    <div style="font-size:64px;margin-bottom:24px;">❌</div>
    <h1 style="color:red;margin:0 0 16px 0;">Error</h1>
    <p style="color:#888;margin:0;">${message}</p>
  </div>
</body>
</html>`;
}
