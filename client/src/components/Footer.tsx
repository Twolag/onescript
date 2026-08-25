/**
 * Footer — Neon Circuit Design
 * Style: Minimaliste sombre avec accents violet, lignes de circuit
 */
import { Link } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/LanguageContext";

const LOGO_URL = "/images/onescript-logo.png";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    products: [
      { label: "FUSION AI", href: "/products" },
      { labelKey: "nav.windowsOpt" as TranslationKey, href: "/products" },
      { labelKey: "nav.jitterScript" as TranslationKey, href: "/products" },
    ],
    resources: [
      { labelKey: "footer.compatibility" as TranslationKey, href: "/compatibility" },
      { labelKey: "footer.support" as TranslationKey, href: "/support" },
      { labelKey: "footer.documentation" as TranslationKey, href: "/documentation" },
    ],
    legal: [
      { labelKey: "footer.documentation" as TranslationKey, href: "/documentation" },
      { labelKey: "footer.legalNotice" as TranslationKey, href: "/legal" },
      { labelKey: "footer.privacy" as TranslationKey, href: "/privacy" },
      { labelKey: "footer.terms" as TranslationKey, href: "/terms" },
    ],
  };

  return (
    <footer className="relative mt-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-violet-tech/40 to-transparent" />

      <div className="bg-dark-base/60 backdrop-blur-sm">
        <div className="container py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
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
                {t("footer.tagline")}
              </p>
            </div>

            <div>
              <h4 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-accent mb-4">
                {t("footer.products")}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.products.map((link) => (
                  <li key={"label" in link ? link.label : link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {"label" in link ? link.label : t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-accent mb-4">
                {t("footer.resources")}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-violet-accent mb-4">
                {t("footer.legal")}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} OneScript. {t("footer.rights")}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span>{t("footer.pcOnly")}</span>
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
