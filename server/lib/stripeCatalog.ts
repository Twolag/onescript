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
        label: "1 Week",
        priceCents: 1999,
        description: "7 days AI Aimbot access. RP2350A required. PC only.",
      },
      {
        label: "1 Month",
        priceCents: 3999,
        description: "30 days AI Aimbot access. RP2350A required. PC only.",
      },
      {
        label: "Lifetime License",
        priceCents: 7999,
        description: "Permanent FUSION AI V8 access. RP2350A required. PC only.",
      },
      {
        label: "Ultimate License",
        priceCents: 12499,
        description:
          "Lifetime AI Aimbot + all future updates + all Advanced Weights for all games + custom personal hash. RP2350A required. PC only.",
      },
      {
        label: "Advanced AI Weight — Apex Legends",
        priceCents: 1000,
        description: "Additional paid AI Weight for Apex. License holders only.",
      },
      {
        label: "Advanced AI Weight — Fortnite",
        priceCents: 1000,
        description: "Additional paid AI Weight for Fortnite. License holders only.",
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
    name: "No Recoil",
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
    name: "Onestate RP",
    options: [
      {
        label: "Onestate RP",
        priceCents: 1000,
        description:
          "This payment is only a donation to the OneScript server — thank you!",
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
