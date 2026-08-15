/**
 * Layout — Neon Circuit Design
 * Wrapper principal : fond réseau animé + Navbar + contenu + Footer
 */
import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NetworkBackground from "./NetworkBackground";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      <NetworkBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-18">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
