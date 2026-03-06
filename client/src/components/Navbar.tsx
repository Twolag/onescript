/*
 * Navbar — Neon Circuit Design
 * Style: Cyberpunk industriel, fond sombre translucide, accents violet néon
 * Navigation fixe en haut avec effet glass et bordure violet pulsante
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronDown } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407047030/hMNizDQJ4xGUw2X2eKPbCw/onescript-logo-full_647bb391.png";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/compatibility", label: "Compatibilité" },
  { href: "/documentation", label: "Documentation" },
  { href: "/reviews", label: "Avis" },
  { href: "/support", label: "Support" },
];

const purchaseProducts = [
  { name: "FUSION AI", href: "/purchase?product=ai-engine" },
  { name: "Windows Optimization", href: "/purchase?product=windows-opt" },
  { name: "Jitter Script", href: "/purchase?product=jitter-script" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="absolute inset-0 bg-dark-base/80 backdrop-blur-xl" />
      {/* Bottom circuit line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech to-transparent opacity-60" />

      <div className="relative container flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
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

        {/* Desktop nav */}
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
                {link.label}
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

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop dropdown */}
          <div className="hidden sm:relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-display font-semibold tracking-wider text-primary-foreground bg-violet-tech rounded-md hover:bg-violet-secondary transition-colors duration-200 neon-glow"
            >
              <Zap className="w-3.5 h-3.5" />
              ACHETER
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
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
                    <Link
                      key={product.href}
                      href={product.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 text-sm font-body text-foreground hover:bg-violet-tech/10 hover:text-violet-tech transition-colors border-b border-border/30 last:border-b-0"
                    >
                      {product.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
                    {link.label}
                  </Link>
                );
              })}
              <div className="px-4 py-3 text-sm font-display font-semibold tracking-wider text-violet-tech">
                ACHETER
              </div>
              {purchaseProducts.map((product) => (
                <Link
                  key={product.href}
                  href={product.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-8 py-2 text-sm font-body text-muted-foreground hover:text-foreground hover:bg-dark-elevated transition-colors"
                >
                  {product.name}
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
