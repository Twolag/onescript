import { Resend } from 'resend';
import { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      to,
      subject,
      html,
      template,
      props,
    } = req.body;

    console.log('[send-email] Requête reçue:', { to, subject, template, hasHtml: !!html });
    console.log('[send-email] RESEND_API_KEY défini:', !!process.env.RESEND_API_KEY);
    console.log('[send-email] Envoi d\'e-mail à:', to);

    // Si c'est un template, utiliser la méthode template
    if (template) {
      const result = await resend.emails.send({
        from: 'onescript <noreply@olunoonexa.resend.app>',
        to,
        template,
        props,
      });

      if (result.error) {
        console.error('[send-email] Erreur:', result.error);
        return res.status(400).json({ error: result.error });
      }

      console.log('[send-email] E-mail envoyé avec succès');
      return res.status(200).json({ success: true, id: result.data?.id });
    }

    // Sinon, utiliser HTML
    const result = await resend.emails.send({
      from: 'onescript <noreply@olunoonexa.resend.app>',
      to,
      subject,
      html,
    });

    if (result.error) {
      console.error('[send-email] Erreur Resend:', JSON.stringify(result.error));
      return res.status(400).json({ error: result.error, message: 'Erreur lors de l\'envoi de l\'e-mail' });
    }

    console.log('[send-email] E-mail envoyé avec succès');
    return res.status(200).json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error('[send-email] Erreur serveur:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ error: errorMessage, message: 'Erreur serveur' });
  }
}
