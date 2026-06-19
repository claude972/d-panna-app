"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuOpen?: () => void;
}

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/devenir-artisan", label: "Devenir artisan" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ onMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass-card !rounded-none border-x-0 border-t-0 backdrop-blur-2xl"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16" : "h-20"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-black text-2xl tracking-tight select-none"
          aria-label="D-Panna — accueil"
        >
          <span>D-</span>
          <span className="text-gradient">PANNA</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text)] opacity-80 hover:opacity-100 hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/devis"
            className="gradient-orange-amber glow-orange rounded-full px-6 py-3 text-sm font-semibold text-black hover:scale-105 transition-transform"
          >
            Démarrer mon diagnostic
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={onMenuOpen}
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
