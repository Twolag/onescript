import { Resend } from 'resend';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[send-email] Méthode:', req.method);

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
      console.error('[send-email] RESEND_API_KEY non défini');
      return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
    }

    if (!to) {
      return res.status(400).json({ error: 'Email destinataire manquant' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let finalSubject = subject;
    let finalHtml = html;

    // Email client avec props (template order-confirmation)
    if (props && !html) {
      const { orderNumber, customerName, productName, productOption, discordPseudo, price } = props;
      const firstName = customerName ? customerName.split(' ')[0] : 'là';

      finalSubject = `✓ Commande confirmée – ${productName} | OneScript`;
      finalHtml = `<!DOCTYPE html>
<html lang="fr">
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
            <h1 style="margin:0 0 8px 0;color:#fff;font-size:28px;font-weight:700;">Commande confirmée ✓</h1>
            <p style="margin:0;color:#888;font-size:15px;">Merci ${firstName}, ton paiement est en cours de traitement.</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#111;border-left:1px solid #222;border-right:1px solid #222;padding:40px;">
            <p style="color:#ccc;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
              Hey ${firstName} 👋<br><br>On a bien reçu ta commande. Voici le récapitulatif :
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border:1px solid #222;border-radius:8px;">
              <tr style="background:#1a1a1a;">
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Détail</td>
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:right;">Info</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">N° commande</td>
                <td style="padding:14px 20px;color:#c8ff00;font-size:14px;font-weight:700;text-align:right;font-family:monospace;">${orderNumber}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Produit</td>
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
              <tr style="border-top:1px solid #222;background:#1a1a1a;">
                <td style="padding:16px 20px;color:#fff;font-size:16px;font-weight:700;">Total</td>
                <td style="padding:16px 20px;color:#c8ff00;font-size:20px;font-weight:800;text-align:right;">${price}€</td>
              </tr>
            </table>
            <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:3px solid #c8ff00;border-radius:8px;padding:24px;margin-bottom:32px;">
              <p style="margin:0 0 12px 0;color:#c8ff00;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">🚀 Prochaines étapes</p>
              <ol style="margin:0;padding-left:20px;color:#ccc;font-size:14px;line-height:2.2;">
                <li>Finalise ton paiement via PayPal si ce n'est pas encore fait</li>
                <li>Rejoins notre Discord et ouvre un ticket</li>
                <li>Communique ton numéro : <strong style="color:#c8ff00;font-family:monospace;">${orderNumber}</strong></li>
                <li>On t'envoie tes accès rapidement ✓</li>
              </ol>
            </div>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://discord.gg/cU2kNQxxHu" style="display:inline-block;background-color:#5865F2;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;">Rejoindre le Discord →</a>
            </div>
            <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">Des questions ? Réponds à cet email.<br>— L'équipe OneScript</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;border:1px solid #222;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#444;font-size:12px;">
              © ${new Date().getFullYear()} OneScript · <a href="https://onescript.fr" style="color:#444;text-decoration:none;">onescript.fr</a><br>
              <span style="font-family:monospace;color:#333;">Réf. : ${orderNumber}</span>
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
      return res.status(400).json({ error: 'Paramètres manquants' });
    }

    const result = await resend.emails.send({
      from: 'OneScript <noreply@onescript.fr>',
      to,
      subject: finalSubject,
      html: finalHtml,
    });

    console.log('[send-email] Résultat:', result);

    if (result.error) {
      console.error('[send-email] Erreur Resend:', result.error);
      return res.status(400).json({ error: result.error });
    }

    console.log('[send-email] ✅ Email envoyé à', to);
    return res.status(200).json({ success: true, id: result.data?.id });

  } catch (error) {
    console.error('[send-email] Exception:', error);
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
