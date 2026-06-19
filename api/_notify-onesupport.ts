// Prévient le serveur OneSupport (chats/tickets/commandes) d'une commande.
// Ne bloque jamais le flux : en cas d'erreur, on log et on continue.
export async function registerOrderOnOneSupport(order: {
  ref: string; customer?: string; email?: string; discord?: string;
  product?: string; option?: string; price?: number | string; payment?: string;
  confirmUrl?: string; cancelUrl?: string;
}) {
  try {
    const base = process.env.ONESUPPORT_URL;          // ex: https://onesupport.onrender.com
    const secret = process.env.ORDERS_WEBHOOK_SECRET;
    if (!base || !secret) return;
    await fetch(`${base}/api/public/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-os-secret': secret },
      body: JSON.stringify(order),
    });
  } catch (e) {
    console.error('[OneSupport] enregistrement commande échoué:', e);
  }
}

export async function updateOrderStatusOnOneSupport(ref: string, status: 'confirmed' | 'cancelled') {
  try {
    const base = process.env.ONESUPPORT_URL;
    const secret = process.env.ORDERS_WEBHOOK_SECRET;
    if (!base || !secret) return;
    await fetch(`${base}/api/public/order/${encodeURIComponent(ref)}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-os-secret': secret },
      body: JSON.stringify({ status }),
    });
  } catch (e) {
    console.error('[OneSupport] mise à jour commande échouée:', e);
  }
}
