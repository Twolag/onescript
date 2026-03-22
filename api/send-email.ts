import { Resend } from 'resend';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[send-email] Method:', req.method);

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, props } = req.body;
    console.log('[send-email] Params:', { to, subject, hasHtml: !!html, hasProps: !!props });

    if (!process.env.RESEND_API_KEY) {
      console.error('[send-email] RESEND_API_KEY not defined');
      return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
    }

    if (!to) {
      return res.status(400).json({ error: 'Missing recipient email' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let finalSubject = subject;
    let finalHtml = html;

    // Customer Email with props
    if (props && !html) {
      const { orderNumber, customerName, productName, productOption, discordPseudo, price, cpu, gpu, os } = props;
      const firstName = customerName ? customerName.split(' ')[0] : 'there';

      finalSubject = `⏳ Order Pending Payment – ${productName} | OneScript`;
      finalHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background-color:#111111;border:1px solid #222;border-radius:12px 12px 0 0;padding:40px;text-align:center;">
            <div style="display:inline-block;background-color:#c8ff00;border-radius:8px;padding:8px 20px;margin-bottom:24px;">
              <span style="color:#0a0a0a;font-weight:800;font-size:18px;letter-spacing:2px;text-transform:uppercase;">OneScript</span>
            </div>
            <h1 style="margin:0 0 8px 0;color:#fff;font-size:28px;font-weight:700;">Order Received ⏳</h1>
            <p style="margin:0;color:#888;font-size:15px;">Your order is registered, pending payment.</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#111;border-left:1px solid #222;border-right:1px solid #222;padding:40px;">
            <p style="color:#ccc;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
              Hey ${firstName} 👋<br><br>Your order has been successfully registered. Finalize your payment to receive your access:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border:1px solid #222;border-radius:8px;">
              <tr style="background:#1a1a1a;">
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Detail</td>
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:right;">Info</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Order N°</td>
                <td style="padding:14px 20px;color:#c8ff00;font-size:14px;font-weight:700;text-align:right;font-family:monospace;">${orderNumber}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Product</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;font-weight:600;text-align:right;">${productName}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Option</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;text-align:right;">${productOption}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Discord</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;text-align:right;">${discordPseudo}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Hardware</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;text-align:right;">${cpu} / ${gpu} / ${os}</td>
              </tr>
              <tr style="border-top:1px solid #222;background:#1a1a1a;">
                <td style="padding:16px 20px;color:#fff;font-size:16px;font-weight:700;">Total to pay</td>
                <td style="padding:16px 20px;color:#c8ff00;font-size:20px;font-weight:800;text-align:right;">${price}€</td>
              </tr>
            </table>
            <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:3px solid #c8ff00;border-radius:8px;padding:24px;margin-bottom:32px;">
              <p style="margin:0 0 12px 0;color:#c8ff00;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">💳 How to finalize your order</p>
              <ol style="margin:0;padding-left:20px;color:#ccc;font-size:14px;line-height:2.2;">
                <li>Go back to the site and complete your payment (SumUp or PayPal)</li>
                <li>Join our Discord and open a ticket</li>
                <li>Provide your order number: <strong style="color:#c8ff00;font-family:monospace;">${orderNumber}</strong></li>
                <li>We will send your access as soon as payment is received ✓</li>
              </ol>
            </div>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://discord.gg/XV9PhqbA4r" style="display:inline-block;background-color:#5865F2;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;">Join Discord →</a>
            </div>
            <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">Questions? Reply to this email.<br>— The OneScript Team</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;border:1px solid #222;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#444;font-size:12px;">
              © ${new Date().getFullYear()} OneScript · <a href="https://onescript.fr" style="color:#444;text-decoration:none;">onescript.fr</a><br>
              <span style="font-family:monospace;color:#333;">Ref: ${orderNumber}</span>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
    }

    if (!finalHtml || !finalSubject) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const result = await resend.emails.send({
      from: 'OneScript <noreply@onescript.fr>',
      to,
      subject: finalSubject,
      html: finalHtml,
    });

    console.log('[send-email] Result:', result);

    if (result.error) {
      console.error('[send-email] Resend Error:', result.error);
      return res.status(400).json({ error: result.error });
    }

    console.log('[send-email] ✅ Email sent to', to);
    return res.status(200).json({ success: true, id: result.data?.id });

  } catch (error) {
    console.error('[send-email] Exception:', error);
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
