/**
 * Server-side Stripe catalog — prices in EUR cents.
 * Must stay in sync with client/src/pages/Purchase.tsx options.
 */
export type CatalogOption = {
  label: string;
  priceCents: number;
  description: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  options: CatalogOption[];
};

export const STRIPE_CATALOG: Record<string, CatalogProduct> = {
  "ai-engine": {
    id: "ai-engine",
    name: "FUSION AI",
    options: [
      {
        label: "1 Week (Setup + Support + License)",
        priceCents: 2500,
        description: "Complete setup + 7 days support. RP2350A required.",
      },
      {
        label: "1 Week (License Only)",
        priceCents: 1500,
        description: "7 days license + PDF guide. Self-setup.",
      },
      {
        label: "Weekly Renewal",
        priceCents: 1000,
        description: "Renewal for existing users.",
      },
      {
        label: "License Only (Monthly)",
        priceCents: 4000,
        description: "1 month license + PDF guide. Self-setup.",
      },
      {
        label: "1 Month (Setup + Support + License)",
        priceCents: 6000,
        description: "Complete setup + 30 days support. RP2350A required.",
      },
      {
        label: "Help Installation (PDF users)",
        priceCents: 3000,
        description: "Remote installation help for PDF license holders.",
      },
      {
        label: "Lifetime License",
        priceCents: 10000,
        description: "Permanent FUSION AI V8 access.",
      },
      {
        label: "Monthly Renewal",
        priceCents: 3000,
        description: "Monthly renewal for eligible users.",
      },
      {
        label: "Advanced AI Weight — Apex Legends",
        priceCents: 1000,
        description: "AI Weight add-on for Apex. High-end GPU required.",
      },
      {
        label: "Advanced AI Weight — Fortnite",
        priceCents: 1000,
        description: "AI Weight add-on for Fortnite. High-end GPU required.",
      },
    ],
  },
  "windows-opt": {
    id: "windows-opt",
    name: "Windows Optimization",
    options: [
      {
        label: "Simple Optimization",
        priceCents: 2000,
        description: "Full system optimization.",
      },
      {
        label: "Optimization + Windows Reinstall",
        priceCents: 4000,
        description: "Windows reinstall + full optimization.",
      },
    ],
  },
  "jitter-script": {
    id: "jitter-script",
    name: "Jitter Script",
    options: [
      { label: "1 day", priceCents: 250, description: "1 day access" },
      { label: "1 week", priceCents: 500, description: "1 week access" },
      { label: "1 month", priceCents: 1500, description: "1 month access" },
      { label: "3 months", priceCents: 2000, description: "3 months access" },
      { label: "6 months", priceCents: 2500, description: "6 months access" },
      { label: "1 year", priceCents: 3000, description: "1 year access" },
      { label: "Lifetime", priceCents: 4000, description: "Lifetime access" },
    ],
  },
  "onestate-rp": {
    id: "onestate-rp",
    name: "AI Aimbot Onestate RP",
    options: [
      {
        label: "Onestate RP (iOS & Android)",
        priceCents: 1000,
        description:
          "Mobile AI Aimbot for iOS & Android. Donation to the OneScript server — thank you!",
      },
    ],
  },
};

export function resolveCatalogOption(productId: string, optionIndex: number) {
  const product = STRIPE_CATALOG[productId];
  if (!product) return null;
  const option = product.options[optionIndex];
  if (!option) return null;
  return { product, option };
}
