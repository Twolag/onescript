import { loadStripe } from "@stripe/stripe-js";

// Clé publique Stripe (test)
const STRIPE_PUBLIC_KEY = "pk_test_51T83TKFrlYRU1NT9p1uI3nnJlJiaIdvDwdYuHrjhkKLHa1LgcpjQghNDNIYG2oPqy6x5EjQXsox6msXsX86FL5WA00DepDnP2x";

// Charger Stripe
export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

// Mapping des produits Stripe
export const STRIPE_PRODUCTS = {
  "ai-engine-install": {
    name: "FUSION AI - Licence + Installation",
    price: 8000, // en cents (80€)
    description: "Premier mois + installation de l'AI Aimbot inclus",
  },
  "ai-engine-renewal": {
    name: "FUSION AI - Renouvellement mensuel",
    price: 3000, // en cents (30€)
    description: "Renouvellement mensuel uniquement",
  },
  "windows-opt-simple": {
    name: "Windows Optimization - Optimisation simple",
    price: 1000, // en cents (10€)
    description: "Optimisation simple de votre système",
  },
  "windows-opt-full": {
    name: "Windows Optimization - Optimisation + Réinstall",
    price: 2000, // en cents (20€)
    description: "Optimisation + réinstallation de Windows",
  },
  "jitter-24h": {
    name: "Jitter Script - Essai 24h",
    price: 250, // en cents (2.50€)
    description: "Essai gratuit de 24 heures",
  },
  "jitter-1week": {
    name: "Jitter Script - 1 semaine",
    price: 500, // en cents (5€)
    description: "Accès 1 semaine",
  },
  "jitter-1month": {
    name: "Jitter Script - 1 mois",
    price: 1500, // en cents (15€)
    description: "Accès 1 mois",
  },
  "jitter-3months": {
    name: "Jitter Script - 3 mois",
    price: 2000, // en cents (20€)
    description: "Accès 3 mois",
  },
  "jitter-6months": {
    name: "Jitter Script - 6 mois",
    price: 2500, // en cents (25€)
    description: "Accès 6 mois",
  },
  "jitter-1year": {
    name: "Jitter Script - 1 an",
    price: 3000, // en cents (30€)
    description: "Accès 1 an",
  },
  "jitter-lifetime": {
    name: "Jitter Script - À vie",
    price: 4000, // en cents (40€)
    description: "Accès à vie",
  },
};
