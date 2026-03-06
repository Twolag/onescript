/**
 * Layout — Neon Circuit Design
 * Wrapper principal : Navbar fixe + contenu scrollable + Footer
 */
import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
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
