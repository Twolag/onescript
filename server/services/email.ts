import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.error("[Email] RESEND_API_KEY n'est pas défini");
}

const resend = new Resend(resendApiKey);

export interface OrderData {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  discordPseudo: string;
  productName: string;
  productOption: string;
  price: number;
}

/**
 * Envoie un e-mail de confirmation de commande au client
 */
export async function sendOrderConfirmationEmail(order: OrderData): Promise<boolean> {
  try {
    const result = await resend.emails.send({
      from: "onescript <noreply@olunoonexa.resend.app>",
      to: order.customerEmail,
      template: "order-confirmation",
      props: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        productName: order.productName,
        productOption: order.productOption,
        discordPseudo: order.discordPseudo,
        price: order.price,
      },
    });

    if (result.error) {
      console.error("[Email] Erreur lors de l'envoi de l'e-mail client:", result.error);
      return false;
    }

    console.log(`[Email] ✅ E-mail de confirmation envoyé à ${order.customerEmail}`);
    return true;
  } catch (error) {
    console.error("[Email] Erreur lors de l'envoi de l'e-mail client:", error);
    return false;
  }
}

/**
 * Envoie une notification de commande à l'administrateur
 */
export async function sendAdminOrderNotification(order: OrderData): Promise<boolean> {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      console.error("[Email] ADMIN_EMAIL non défini");
      return false;
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #ff6b6b; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
        .order-details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ff6b6b; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { font-weight: bold; color: #ff6b6b; }
        .price { font-size: 20px; color: #ff6b6b; font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 Nouvelle Commande Reçue</h1>
        </div>
        <div class="content">
            <p><strong>Une nouvelle commande a été créée !</strong></p>
            
            <div class="order-details">
                <div class="detail-row">
                    <span class="label">Numéro de commande :</span>
                    <span><strong>${order.orderNumber}</strong></span>
                </div>
                <div class="detail-row">
                    <span class="label">Client :</span>
                    <span>${order.customerName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">E-mail :</span>
                    <span>${order.customerEmail}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Discord :</span>
                    <span>${order.discordPseudo}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Produit :</span>
                    <span>${order.productName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Option :</span>
                    <span>${order.productOption}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Montant :</span>
                    <span class="price">${order.price}€</span>
                </div>
            </div>

            <p><strong>Action requise :</strong></p>
            <p>Veuillez vérifier que le client a bien effectué le paiement via PayPal et lui fournir ses accès une fois le paiement confirmé.</p>

            <p>Référence de commande : <strong>${order.orderNumber}</strong></p>
        </div>
        <div class="footer">
            <p>© 2026 OneScript Suite. Tous droits réservés.</p>
        </div>
    </div>
</body>
</html>
    `;

    const result = await resend.emails.send({
      from: "onescript <noreply@olunoonexa.resend.app>",
      to: adminEmail,
      subject: `[NOUVELLE COMMANDE] ${order.orderNumber} - ${order.customerName}`,
      html: htmlContent,
    });

    if (result.error) {
      console.error("[Email] Erreur lors de l'envoi de l'e-mail admin:", result.error);
      return false;
    }

    console.log(`[Email] Notification d'admin envoyée à ${adminEmail}`);
    return true;
  } catch (error) {
    console.error("[Email] Erreur lors de l'envoi de l'e-mail admin:", error);
    return false;
  }
}

/**
 * Envoie les deux e-mails (client + admin) en parallèle
 */
export async function sendOrderEmails(order: OrderData): Promise<{ client: boolean; admin: boolean }> {
  const [clientResult, adminResult] = await Promise.all([
    sendOrderConfirmationEmail(order),
    sendAdminOrderNotification(order),
  ]);

  return { client: clientResult, admin: adminResult };
}
