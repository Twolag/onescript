/*
 * Navbar — Neon Circuit Design
 * Style: Cyberpunk industriel, fond sombre translucide, accents violet néon
 * Navigation fixe en haut avec effet glass et bordure violet pulsante
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import type { TranslationKey } from "@/i18n/LanguageContext";

const LOGO_URL = "/images/onescript-logo.png";
const DISCORD_INVITE = "https://discord.gg/hyT8UCHHHk";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/products", labelKey: "nav.products" },
  { href: "/showcase", labelKey: "nav.showcase" },
  { href: "/compatibility", labelKey: "nav.compatibility" },
  { href: "/documentation", labelKey: "nav.documentation" },
  { href: "/reviews", labelKey: "nav.reviews" },
  { href: "/support", labelKey: "nav.support" },
];

const purchaseProducts: { nameKey: TranslationKey; href: string }[] = [
  { nameKey: "nav.aiAimbot", href: "/purchase?product=ai-engine" },
  { nameKey: "nav.windowsOpt", href: "/purchase?product=windows-opt" },
  { nameKey: "nav.jitterScript", href: "/purchase?product=jitter-script" },
];

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-dark-base/80 backdrop-blur-xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech to-transparent opacity-60" />

      <div className="relative container flex items-center justify-between h-16 lg:h-18">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src={LOGO_URL}
            alt="OneScript"
            className="w-10 h-10 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
            style={{ filter: "drop-shadow(0 0 6px rgba(123,46,255,0.4))" }}
          />
          <span className="font-display font-bold text-lg tracking-wider text-foreground">
            ONE<span className="text-violet-tech">SCRIPT</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-body font-medium tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-violet-tech"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(link.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-violet-tech rounded-full"
                    style={{ boxShadow: "0 0 8px oklch(0.45 0.28 285 / 60%)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <motion.a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.joinDiscord")}
            title={t("nav.joinDiscord")}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#5865F2] text-white shadow-[0_0_20px_rgba(88,101,242,0.55)] hover:bg-[#4752C4] transition-colors"
            animate={{
              y: [0, -5, 0, -2, 0],
              rotate: [0, -6, 6, -3, 0],
              scale: [1, 1.06, 1, 1.03, 1],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, rotate: 0 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full bg-[#5865F2] animate-ping opacity-25" />
            <DiscordIcon className="relative w-5 h-5" />
          </motion.a>

          <div className="hidden sm:relative sm:inline-flex">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-display font-semibold tracking-wider text-primary-foreground bg-violet-tech rounded-md hover:bg-violet-secondary transition-colors duration-200 neon-glow"
            >
              <Zap className="w-3.5 h-3.5" />
              {t("nav.buyNow")}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-dark-elevated border border-violet-tech/30 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  {purchaseProducts.map((product) => (
                    <a
                      key={product.href}
                      href={product.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 text-sm font-body text-foreground hover:bg-violet-tech/10 hover:text-violet-tech transition-colors border-b border-border/30 last:border-b-0"
                    >
                      {t(product.nameKey)}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={t("nav.menu")}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-dark-base/95 backdrop-blur-xl" />
            <div className="relative container py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-body font-medium tracking-wide rounded-md transition-colors ${
                      isActive
                        ? "text-violet-tech bg-violet-tech/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-dark-elevated"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-body font-medium tracking-wide rounded-md text-[#5865F2] hover:bg-[#5865F2]/10 transition-colors"
              >
                <DiscordIcon className="w-5 h-5" />
                {t("nav.joinDiscord")}
              </a>
              <div className="px-4 py-3 text-sm font-display font-semibold tracking-wider text-violet-tech">
                {t("nav.buyNow")}
              </div>
              {purchaseProducts.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-8 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-dark-elevated transition-colors"
                >
                  {t(product.nameKey)}
                </Link>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/40 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
