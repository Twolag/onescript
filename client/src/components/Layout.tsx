/**
 * Layout — Neon Circuit Design
 * Wrapper principal : Navbar fixe + contenu scrollable + Footer
 */
import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (!document.querySelector('script[src*="onescript-chat.onrender.com"]')) {
      const script = document.createElement("script");
      script.src = "https://onescript-chat.onrender.com/widget.js";
      script.setAttribute("data-server", "https://onescript-chat.onrender.com");
      script.setAttribute("data-title", "Support OneScript");
      script.setAttribute("data-accent", "#2dd4ff");
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18">
        {children}
      </main>
      <Footer />
    </div>
  );
}
