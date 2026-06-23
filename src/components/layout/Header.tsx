"use client";

import Link from "next/link";
import { Menu, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuOpen?: () => void;
}

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/#how-it-works", label: "Comment ça marche" },
  { href: "/artisans", label: "Devenir artisan" },
  { href: "/#faq", label: "FAQ" },
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
        "sticky top-0 z-50 w-full bg-white transition-all duration-300",
        scrolled
          ? "bg-white/95 border-b border-line shadow-sm"
          : "border-b border-line"
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
          className="inline-flex items-center gap-2.5 select-none"
          aria-label="D-Panna — accueil"
        >
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-blue shrink-0">
            <Zap className="h-4 w-4 text-white" aria-hidden="true" strokeWidth={2.5} />
          </span>
          <span className="font-display font-black text-2xl tracking-tight text-ink">
            D-PANNA
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display font-semibold text-sm text-ink hover:text-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/questionnaire"
            className="inline-flex items-center gap-2 bg-yellow text-ink font-display font-extrabold rounded-xl px-5 py-3 transition hover:brightness-95 cursor-pointer"
          >
            Trouver un artisan
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          type="button"
          onClick={onMenuOpen}
          className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl border-[1.5px] border-line hover:bg-surface-2 transition-colors"
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5 text-ink" />
        </button>
      </div>
    </header>
  );
}
