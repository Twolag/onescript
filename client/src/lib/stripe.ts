import { loadStripe } from "@stripe/stripe-js";

// Clé publique Stripe (test) — aussi définie dans .env / VITE_STRIPE_PUBLIC_KEY
const STRIPE_PUBLIC_KEY =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
  "pk_test_51U4i9FGkS0pKo0UfYKRHfzo4dj0zNgnAnSDWriUBr6fW6qegLlhYBfg5MaBAE7zAHMfOVQ6A5kkY4Bl8sCgdmr5A00BIXuUB20";

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
