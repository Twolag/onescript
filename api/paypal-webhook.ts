import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body;
    console.log('[PayPal Webhook] Événement reçu:', event.event_type);

    // On ne traite que les paiements complétés
    if (event.event_type === 'PAYMENT.CAPTURE.COMPLETED' || event.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const resource = event.resource;
      
      // Récupérer les métadonnées de la commande (stockées dans custom_id ou note_to_seller)
      // Note: Lors de la création de la commande PayPal, on devra passer les infos du client
      const customData = resource.custom_id || resource.purchase_units?.[0]?.custom_id;
      
      if (customData) {
        const orderData = JSON.parse(customData);
        console.log('[PayPal Webhook] Données de commande trouvées:', orderData);

        if (process.env.RESEND_API_KEY) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          
          // 1. Envoyer l'email au client
          await fetch(`${process.env.BASE_URL || 'https://' + req.headers.host}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: orderData.customerEmail,
              props: orderData
            })
          });

          // 2. Envoyer l'email à l'admin
          await fetch(`${process.env.BASE_URL || 'https://' + req.headers.host}/api/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: 'onescript.fr@proton.me',
              subject: `[PAIEMENT CONFIRMÉ] ${orderData.orderNumber} — ${orderData.customerName}`,
              html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#111;color:#fff;padding:30px;border-radius:10px;">
                  <h2 style="color:#c8ff00;margin-top:0;">💰 Paiement Confirmé !</h2>
                  <p>Le paiement pour la commande <strong>${orderData.orderNumber}</strong> a été validé par PayPal.</p>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr><td style="padding:8px 0;color:#888;">Client</td><td style="color:#fff;">${orderData.customerName}</td></tr>
                    <tr><td style="padding:8px 0;color:#888;">Email</td><td style="color:#fff;">${orderData.customerEmail}</td></tr>
                    <tr><td style="padding:8px 0;color:#888;">Produit</td><td style="color:#fff;">${orderData.productName}</td></tr>
                    <tr><td style="padding:8px 0;color:#c8ff00;font-weight:800;">Montant</td><td style="color:#c8ff00;font-weight:800;">${orderData.price}€</td></tr>
                  </table>
                </div>
              `
            })
          });

          console.log('[PayPal Webhook] ✅ Emails envoyés après confirmation de paiement');
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('[PayPal Webhook] Erreur:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
