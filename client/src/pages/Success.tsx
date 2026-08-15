/**
 * Success — after Stripe Checkout
 * Notifies Discord only once payment is confirmed by Stripe.
 */
import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISCORD_LINK = "https://discord.gg/5btq6znUvN";

type SessionInfo = {
  paid?: boolean;
  status?: string;
  orderNumber?: string;
  total?: number | null;
  metadata?: Record<string, string>;
};

export default function Success() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("Session manquante");
      return;
    }

    (async () => {
      try {
        // Fulfill + Discord notify only if Stripe says paid
        const fulfillRes = await fetch("/api/stripe-fulfill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const fulfillData = await fulfillRes.json();
        if (!fulfillRes.ok) {
          throw new Error(fulfillData.error || "Erreur vérification paiement");
        }
        if (!fulfillData.paid) {
          setError("Paiement non confirmé");
          setInfo(fulfillData);
          return;
        }
        setInfo(fulfillData);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur");
      } finally {
        setLoading(false);
      }
    })();
  }, [sessionId]);

  const orderNumber = info?.orderNumber || info?.metadata?.orderNumber;
  const paid = info?.paid === true || info?.status === "paid";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card max-w-lg w-full rounded-xl p-8 border border-violet-tech/30 text-center"
      >
        {loading ? (
          <>
            <Loader2 className="w-10 h-10 text-violet-tech animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Vérification du paiement…</p>
          </>
        ) : error && !paid ? (
          <>
            <p className="text-amber-400 font-semibold mb-2">Paiement reçu ?</p>
            <p className="text-sm text-muted-foreground mb-6">
              {error}. Si tu as payé, rejoins Discord avec ton numéro de commande.
            </p>
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="bg-violet-tech hover:bg-violet-accent">
                <MessageCircle className="w-4 h-4 mr-2" />
                Discord
              </Button>
            </a>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
            <h1 className="font-display font-extrabold text-3xl mb-2">
              {paid ? "Paiement confirmé" : "Session créée"}
            </h1>
            <p className="text-muted-foreground mb-6">
              Merci pour ton achat. Ouvre un ticket Discord avec ton numéro de commande pour recevoir l’accès.
            </p>
            {orderNumber && (
              <div className="mb-6 p-4 rounded-lg bg-violet-tech/10 border border-violet-tech/25">
                <p className="text-[10px] uppercase tracking-widest text-violet-accent mb-1">Commande</p>
                <p className="font-mono font-bold text-foreground">{orderNumber}</p>
              </div>
            )}
            {typeof info?.total === "number" && (
              <p className="text-sm text-muted-foreground mb-6">
                Montant :{" "}
                <span className="text-violet-accent font-semibold">
                  {(info.total / 100).toFixed(2)} €
                </span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-violet-tech hover:bg-violet-accent w-full sm:w-auto">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Rejoindre Discord
                </Button>
              </a>
              <Link href="/">
                <Button variant="outline" className="border-white/20 w-full sm:w-auto">
                  Accueil
                </Button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
