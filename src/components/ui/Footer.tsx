'use client';

import { useState, type FormEvent, type ReactElement } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Lucide-react fourni avec ce projet ne contient pas les pictos de marque
// (Facebook/Instagram/X/LinkedIn). On les inline en SVG pour rester fidèle
// aux logos officiels sans ajouter de dépendance.
type BrandIconProps = {
  className?: string;
};

const FacebookGlyph = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M13.5 21v-7.5h2.55l.38-2.97H13.5V8.64c0-.86.24-1.45 1.48-1.45h1.58V4.53a21.4 21.4 0 0 0-2.3-.12c-2.28 0-3.84 1.39-3.84 3.94v2.18H7.86v2.97h2.56V21h3.08Z" />
  </svg>
);

const InstagramGlyph = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const XGlyph = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M17.53 3H20.5l-6.5 7.43L21.5 21H15.6l-4.62-6.05L5.7 21H2.73l6.96-7.95L2.5 3h6.04l4.17 5.51L17.53 3Zm-1.04 16.2h1.65L7.6 4.7H5.83L16.49 19.2Z" />
  </svg>
);

const LinkedinGlyph = ({ className }: BrandIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.6h3.3V21H3.3V8.6Zm5.8 0h3.16v1.7h.04c.44-.83 1.52-1.7 3.13-1.7 3.34 0 3.96 2.2 3.96 5.06V21H16.1v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9.1V8.6Z" />
  </svg>
);

type FooterLink = {
  label: string;
  href: string;
};

const COMPANY_LINKS: FooterLink[] = [
  { label: 'Notre histoire', href: '/a-propos' },
  { label: 'Devenir artisan', href: '/artisans' },
  { label: 'Carrières', href: '/carrieres' },
  { label: 'Blog', href: '/blog' },
];

const HELP_LINKS: FooterLink[] = [
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGU', href: '/cgu' },
  { label: 'RGPD', href: '/rgpd' },
];

const SOCIAL_LINKS: {
  label: string;
  href: string;
  Icon: (props: BrandIconProps) => ReactElement;
}[] = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookGlyph },
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramGlyph },
  { label: 'X', href: 'https://x.com', Icon: XGlyph },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinGlyph },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error('Merci de saisir un email valide.');
      return;
    }
    setSubmitting(true);
    // Faux délai pour signaler l'envoi.
    window.setTimeout(() => {
      setSubmitting(false);
      setEmail('');
      toast.success('Inscription confirmée. À très vite !');
    }, 600);
  };

  const services = CATEGORIES.slice(0, 6);

  return (
    <footer className="relative border-t border-white/5 bg-stone-950 py-20 px-6">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-white/90">
                D-PANNA
              </span>
              <span className="text-3xl font-black text-gradient">.</span>
            </Link>
            <p className="text-base md:text-lg text-stone-300 leading-relaxed max-w-md">
              Le réseau d&apos;artisans certifiés et assurés pour vos dépannages
              urgents. Un pro qualifié à votre porte, sous deux heures.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3 max-w-md">
              <label
                htmlFor="footer-newsletter"
                className="block text-xs uppercase tracking-widest text-orange-400"
              >
                Newsletter
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1 glass-card rounded-full px-5 py-3">
                  <input
                    id="footer-newsletter"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="votre@email.fr"
                    autoComplete="email"
                    required
                    className="w-full bg-transparent text-sm text-white/90 placeholder:text-stone-500 focus:outline-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'gradient-orange-amber glow-orange',
                    'inline-flex items-center justify-center',
                    'h-12 w-12 rounded-full text-stone-950',
                    'disabled:opacity-60 disabled:cursor-not-allowed',
                  )}
                  aria-label="S'inscrire à la newsletter"
                >
                  <Send className="h-4 w-4" strokeWidth={2.5} />
                </motion.button>
              </div>
              <p className="text-xs text-stone-500">
                Conseils dépannage et bons plans. Désinscription en un clic.
              </p>
            </form>
          </div>

          <FooterColumn title="Services">
            {services.map((category) => (
              <FooterColumnLink
                key={category.slug}
                href={`/categories/${category.slug}`}
                label={category.label}
              />
            ))}
          </FooterColumn>

          <FooterColumn title="Entreprise">
            {COMPANY_LINKS.map((link) => (
              <FooterColumnLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </FooterColumn>

          <FooterColumn title="Aide">
            {HELP_LINKS.map((link) => (
              <FooterColumnLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </FooterColumn>
        </div>

        <div className="border-t border-white/5 pt-8 mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-stone-500">
          <p>&copy; 2026 D-Panna SAS</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="transition-colors duration-300 ease-out hover:text-orange-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 text-xs text-stone-500">
          <span>Membre FNCC</span>
          <span className="mx-2 text-stone-700">&bull;</span>
          <span>SIRET 000 000 000 00000</span>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-widest text-orange-400">
        {title}
      </h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

type FooterColumnLinkProps = {
  href: string;
  label: string;
};

function FooterColumnLink({ href, label }: FooterColumnLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-stone-300 transition-colors duration-300 ease-out hover:text-orange-400"
      >
        {label}
      </Link>
    </li>
  );
}
