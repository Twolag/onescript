/**
 * Footer — Neon Circuit Design
 * Style: Minimaliste sombre avec accents violet, lignes de circuit
 */
import { Link } from "wouter";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/onescript-logo-full_647bb391.png";

const footerLinks = {
  products: [
    { label: "FUSION AI", href: "/products" },
    { label: "Windows Optimization", href: "/products" },
    { label: "Jitter Script", href: "/products" },
  ],
  resources: [
    { label: "Compatibility", href: "/compatibility" },
    { label: "Support", href: "/support" },
    { label: "Documentation", href: "/documentation" },
  ],
  legal: [
    { label: "Documentation", href: "/documentation" },
    { label: "Legal Notice", href: "/legal" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Top circuit line */}
      <div className="h-px bg-gradient-to-r from-transparent via-violet-tech/40 to-transparent" />

      <div className="bg-dark-base/60 backdrop-blur-sm">
        <div className="container py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <img
                  src={LOGO_URL}
                  alt="OneScript"
                  className="w-9 h-9 rounded-full object-cover"
                  style={{ filter: "drop-shadow(0 0 4px rgba(123,46,255,0.3))" }}
                />
                <span className="font-display font-bold text-base tracking-wider">
                  ONE<span className="text-violet-tech">SCRIPT</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                PC optimization and gaming performance solutions.
                Unleash the true potential of your machine.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-accent mb-4">
                Products
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.products.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-accent mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-accent mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} OneScript. All rights reserved.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>PC only</span>
                <span className="text-violet-tech">•</span>
                <span>Windows 10 / 11</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
