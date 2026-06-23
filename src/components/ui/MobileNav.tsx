'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { PHONE_URGENCY } from '@/lib/constants';
import { cn } from '@/lib/utils';

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavLink = {
  label: string;
  href: string;
};

const LINKS: NavLink[] = [
  { label: 'Services', href: '/#services' },
  { label: 'Comment ça marche', href: '/#how-it-works' },
  { label: 'Devenir artisan', href: '/artisans' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const phoneHref = `tel:${PHONE_URGENCY.replace(/\s+/g, '')}`;

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="fixed inset-0 z-[90] bg-ink"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le menu"
            className={cn(
              'absolute right-6 top-6 z-10 inline-flex h-12 w-12 items-center justify-center',
              'rounded-xl border border-white/10 bg-white/5 text-white',
              'transition-colors duration-300 ease-out hover:bg-white/10',
            )}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex h-full flex-col px-6 pt-24 pb-10">
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              {LINKS.map((link) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'block font-display font-extrabold text-2xl text-white',
                      'transition-colors duration-300 ease-out hover:text-yellow',
                    )}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mt-auto flex flex-col gap-4 pt-12"
            >
              <a
                href="/questionnaire"
                onClick={onClose}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'bg-yellow text-ink font-display font-extrabold',
                  'rounded-xl px-8 py-4 text-base',
                  'transition hover:brightness-95',
                )}
              >
                Trouver un artisan
              </a>
              <a
                href={phoneHref}
                onClick={onClose}
                className={cn(
                  'inline-flex items-center justify-center gap-3 px-6 py-4',
                  'rounded-xl border border-white/10 bg-white/5',
                  'font-display font-semibold text-base text-white',
                  'transition-colors duration-300 ease-out hover:bg-white/10',
                )}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{PHONE_URGENCY}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
