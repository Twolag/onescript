import React, { useEffect, useRef, useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Éviter de charger le script plusieurs fois
    const scriptId = 'paypal-sdk-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const initPayPal = () => {
      if (window.paypal && paypalRef.current) {
        // Nettoyer le conteneur avant de rendre le bouton
        paypalRef.current.innerHTML = '';
        
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: `${orderData.productName} - ${orderData.productOption}`,
                  amount: {
                    currency_code: 'EUR',
                    value: amount.toFixed(2), // S'assurer du format 0.00
                  },
                  custom_id: orderData.orderNumber,
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            try {
              const details = await actions.order.capture();
              console.log("Paiement capturé:", details);
              
              // ✉️ Envoi des emails via l'API
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
              
              toast.success("Paiement réussi ! Vos accès vous ont été envoyés par e-mail.");
              onSuccess(details);
            } catch (err) {
              console.error("Erreur post-paiement:", err);
              toast.error("Paiement validé, mais une erreur est survenue lors de l'envoi de l'e-mail. Contactez le support.");
              onSuccess({});
            }
          },
          onError: (err: any) => {
            console.error("Erreur PayPal SDK:", err);
            setError("Une erreur est survenue avec PayPal. Veuillez réessayer.");
            toast.error("Erreur PayPal. Vérifiez vos informations de paiement.");
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

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&disable-funding=credit,card`; // On désactive temporairement le mode CB direct pour tester la stabilité PayPal
      script.async = true;
      script.onload = () => {
        setIsLoaded(true);
        initPayPal();
      };
      document.body.appendChild(script);
    } else {
      setIsLoaded(true);
      initPayPal();
    }

    return () => {
      // On ne supprime pas le script pour éviter les rechargements inutiles
      // Mais on nettoie le conteneur du bouton
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
    };
  }, [amount, orderData, clientId]);

  if (error) {
    return <div className="p-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg text-sm">{error}</div>;
  }

  return (
    <div className="w-full min-h-[150px] flex flex-col items-center justify-center">
      {!isLoaded && <div className="animate-pulse text-violet-tech text-sm">Chargement sécurisé de PayPal...</div>}
      <div ref={paypalRef} className="w-full" />
    </div>
  );
};

export default PayPalButton;
