import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, orderNumber, customerEmail, productName } = req.body;
  const SUMUP_SECRET_KEY = process.env.SUMUP_API_KEY;

  if (!SUMUP_SECRET_KEY) {
    console.error('[SumUp] Clé API manquante! SUMUP_API_KEY n\'est pas défini.');
    return res.status(500).json({ 
      error: 'Configuration manquante',
      message: 'La clé API SumUp n\'est pas configurée sur le serveur',
      details: { missingVar: 'SUMUP_API_KEY' }
    });
  }

  try {
    // 1. Créer un Checkout SumUp
    const response = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        amount: parseFloat(amount),
        currency: 'EUR',
        pay_to_email: 'onescript@outlook.fr', // Ton email SumUp
        description: `${productName} - ${orderNumber}`,
        checkout_reference: orderNumber,
        return_url: `${process.env.BASE_URL || 'https://' + req.headers.host}/purchase?success=true&order=${orderNumber}`,
      },
      {
        headers: {
          'Authorization': `Bearer ${SUMUP_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 2. Retourner l'ID du checkout pour le frontend
    return res.status(200).json({ 
      checkoutId: response.data.id,
      checkoutUrl: `https://me.sumup.com/checkout/${response.data.id}`
    });

  } catch (error: any) {
    const errorData = error.response?.data || { message: error.message };
    console.error('[SumUp API] Erreur détaillée:', JSON.stringify(errorData, null, 2));
    
    // On renvoie l'erreur détaillée au frontend pour que l'utilisateur puisse la voir
    return res.status(500).json({ 
      error: 'Erreur lors de la création du paiement SumUp',
      message: errorData.message || 'Erreur inconnue',
      details: errorData
    });
  }
}
