import { Resend } from 'resend';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[send-email] Méthode:', req.method);
  console.log('[send-email] Body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { to, subject, html, template, props } = req.body;

    console.log('[send-email] Paramètres:', { to, subject, template, hasHtml: !!html });

    if (!process.env.RESEND_API_KEY) {
      console.error('[send-email] RESEND_API_KEY non défini');
      return res.status(500).json({ error: 'RESEND_API_KEY not configured' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    let result;

    if (template && props) {
      console.log('[send-email] Envoi avec template:', template);
      result = await resend.emails.send({
        from: 'onescript <noreply@olunoonexa.resend.app>',
        to,
        template,
        props,
      });
    } else if (html && subject) {
      console.log('[send-email] Envoi avec HTML');
      result = await resend.emails.send({
        from: 'onescript <noreply@olunoonexa.resend.app>',
        to,
        subject,
        html,
      });
    } else {
      console.error('[send-email] Paramètres manquants');
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    console.log('[send-email] Résultat Resend:', result);

    if (result.error) {
      console.error('[send-email] Erreur Resend:', result.error);
      return res.status(400).json({ error: result.error });
    }

    console.log('[send-email] ✅ E-mail envoyé avec succès');
    return res.status(200).json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error('[send-email] Exception:', error);
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ error: message });
  }
}
