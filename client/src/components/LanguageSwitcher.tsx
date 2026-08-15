import { useState, useRef, useEffect } from "react";
import { Languages, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LOCALES, type Locale } from "@/i18n/types";
import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("nav.language")}
        title={t("nav.language")}
        className={`inline-flex items-center gap-1.5 rounded-md border border-violet-tech/35 bg-dark-elevated/80 text-violet-accent hover:border-violet-tech/70 hover:text-foreground transition-colors ${
          compact ? "px-2 py-1.5 text-[11px]" : "px-2.5 py-2 text-xs"
        } font-display font-semibold tracking-wider`}
      >
        <Languages className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
        <span>{current.native}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 min-w-[148px] rounded-lg border border-violet-tech/30 bg-dark-elevated shadow-lg overflow-hidden z-[60]"
          >
            {LOCALES.map((item) => {
              const active = item.code === locale;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLocale(item.code as Locale);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-violet-tech/15 text-violet-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-violet-tech/10"
                  }`}
                >
                  <span className="font-body">
                    <span className="font-display font-semibold mr-2">{item.native}</span>
                    {item.label}
                  </span>
                  {active && <Check className="w-3.5 h-3.5 text-violet-tech" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
