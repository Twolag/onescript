import { Resend } from 'resend';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Si c'est une requête GET (clic sur le lien Discord), on affiche une page de confirmation
  if (req.method === 'GET') {
    const { order, customer, email, product, option, price, discord } = req.query;

    if (!email || !order) {
      return res.status(400).send(`<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#0a0a0a;color:#fff;">
        <h1 style="color:red">❌ Paramètres manquants</h1>
      </body></html>`);
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const firstName = (customer as string)?.split(' ')[0] || 'là';

      await resend.emails.send({
        from: 'OneScript <noreply@onescript.fr>',
        to: email as string,
        subject: `✅ Paiement confirmé – ${product} | OneScript`,
        html: `<!DOCTYPE html>
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
            <h1 style="margin:0 0 8px 0;color:#fff;font-size:28px;font-weight:700;">Paiement confirmé ✅</h1>
            <p style="margin:0;color:#888;font-size:15px;">Merci ${firstName}, ton paiement a bien été reçu !</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#111;border-left:1px solid #222;border-right:1px solid #222;padding:40px;">
            <p style="color:#ccc;font-size:16px;line-height:1.7;margin:0 0 32px 0;">
              Hey ${firstName} 👋<br><br>Ton paiement a été confirmé par notre équipe. Tes accès vont être envoyés très rapidement !
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;border:1px solid #222;border-radius:8px;">
              <tr style="background:#1a1a1a;">
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Détail</td>
                <td style="padding:12px 20px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;text-align:right;">Info</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">N° commande</td>
                <td style="padding:14px 20px;color:#c8ff00;font-size:14px;font-weight:700;text-align:right;font-family:monospace;">${order}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Produit</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;font-weight:600;text-align:right;">${product}</td>
              </tr>
              <tr style="border-top:1px solid #222;">
                <td style="padding:14px 20px;color:#888;font-size:14px;">Option</td>
                <td style="padding:14px 20px;color:#fff;font-size:14px;text-align:right;">${option}</td>
              </tr>
              <tr style="border-top:1px solid #222;background:#1a1a1a;">
                <td style="padding:16px 20px;color:#fff;font-size:16px;font-weight:700;">Montant payé</td>
                <td style="padding:16px 20px;color:#c8ff00;font-size:20px;font-weight:800;text-align:right;">${price}€</td>
              </tr>
            </table>
            <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:3px solid #c8ff00;border-radius:8px;padding:24px;margin-bottom:32px;">
              <p style="margin:0 0 12px 0;color:#c8ff00;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">🚀 Prochaine étape</p>
              <p style="margin:0;color:#ccc;font-size:14px;line-height:1.8;">
                Notre équipe va te contacter sur Discord (<strong style="color:#fff;">${discord}</strong>) pour t'envoyer tes accès sous peu.
              </p>
            </div>
            <div style="text-align:center;margin-bottom:32px;">
              <a href="https://discord.gg/XV9PhqbA4r" style="display:inline-block;background-color:#5865F2;color:#fff;font-weight:800;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;">Rejoindre le Discord →</a>
            </div>
            <p style="margin:0;color:#666;font-size:14px;line-height:1.6;">Des questions ? Réponds à cet email.<br>— L'équipe OneScript</p>
          </td>
        </tr>
        <tr>
          <td style="background:#0d0d0d;border:1px solid #222;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
            <p style="margin:0;color:#444;font-size:12px;">
              © ${new Date().getFullYear()} OneScript · <a href="https://onescript.fr" style="color:#444;text-decoration:none;">onescript.fr</a><br>
              <span style="font-family:monospace;color:#333;">Réf. : ${order}</span>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });

      // Notifier Discord que la commande est confirmée
      if (process.env.DISCORD_WEBHOOK_URL) {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: '✅ Commande confirmée',
              color: 0x00ff00,
              fields: [
                { name: 'N° commande', value: `\`${order}\``, inline: false },
                { name: '👤 Client', value: customer as string, inline: true },
                { name: '💬 Discord', value: discord as string, inline: true },
                { name: '💰 Montant', value: `**${price}€**`, inline: true },
              ],
              footer: { text: 'OneScript — Paiement confirmé ✅' },
              timestamp: new Date().toISOString(),
            }],
          }),
        });
      }

      return res.status(200).send(`<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Commande confirmée</title></head>
<body style="font-family:sans-serif;text-align:center;padding:80px 20px;background:#0a0a0a;color:#fff;">
  <div style="max-width:500px;margin:0 auto;background:#111;border:1px solid #222;border-radius:16px;padding:48px;">
    <div style="font-size:64px;margin-bottom:24px;">✅</div>
    <h1 style="color:#c8ff00;margin:0 0 16px 0;">Email envoyé !</h1>
    <p style="color:#888;margin:0 0 32px 0;">L'email de confirmation a bien été envoyé à <strong style="color:#fff;">${email}</strong></p>
    <p style="color:#666;font-size:14px;">Tu peux fermer cette page.</p>
  </div>
</body>
</html>`);

    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).send(`<html><body style="font-family:sans-serif;text-align:center;padding:50px;background:#0a0a0a;color:#fff;">
        <h1 style="color:red">❌ Erreur : ${message}</h1>
      </body></html>`);
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
