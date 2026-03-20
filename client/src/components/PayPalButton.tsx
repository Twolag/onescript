import React, { useEffect, useRef } from 'react';
import { toast } from "sonner";

interface PayPalButtonProps {
  amount: number;
  orderData: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    productName: string;
    productOption: string;
    discordPseudo: string;
    price: number;
  };
  onSuccess: (details: any) => void;
  clientId: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, orderData, onSuccess, clientId }) => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Charger le script PayPal SDK dynamiquement
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR`;
    script.async = true;
    
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: `${orderData.productName} - ${orderData.productOption}`,
                  amount: {
                    currency_code: 'EUR',
                    value: amount.toString(),
                  },
                  custom_id: orderData.orderNumber,
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const details = await actions.order.capture();
            
            // ✉️ Déclencher l'envoi d'e-mail UNIQUEMENT après approbation
            try {
              await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: orderData.customerEmail,
                  props: orderData,
                }),
              });
              
              // Notification Admin
              await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  to: 'onescript@outlook.fr',
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
                  `,
                }),
              });
              
              toast.success("Paiement réussi ! Un e-mail de confirmation vous a été envoyé.");
              onSuccess(details);
            } catch (error) {
              console.error("Erreur lors de l'envoi des e-mails:", error);
              toast.error("Paiement validé, mais une erreur est survenue lors de l'envoi de l'e-mail. Contactez le support.");
              onSuccess(details);
            }
          },
          onError: (err: any) => {
            console.error("Erreur PayPal:", err);
            toast.error("Une erreur est survenue avec PayPal. Veuillez réessayer.");
          },
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
          },
        }).render(paypalRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Nettoyage si nécessaire
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [amount, orderData, clientId]);

  return <div ref={paypalRef} className="w-full mt-4" />;
};

export default PayPalButton;
