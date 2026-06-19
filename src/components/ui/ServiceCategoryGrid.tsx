'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const WIDE_INDEXES = new Set([0, 5, 10]);

function getIcon(name: string): LucideIcon {
  const Lib = Icons as unknown as Record<string, LucideIcon>;
  return Lib[name] ?? Icons.Wrench;
}

function getSubtitle(slug: string, subcount: number): string {
  if (slug === 'depannage-urgence') return 'Disponible 24/7';
  if (slug === 'projet-travaux') return 'Sur rendez-vous';
  return `${subcount} prestations`;
}

export default function ServiceCategoryGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-xs uppercase tracking-widest text-orange-400"
          >
            Nos services
          </motion.span>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white/90"
          >
            {CATEGORIES.length} spécialités, un seul réflexe
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {CATEGORIES.map((cat, index) => {
            const Icon = getIcon(cat.icon);
            const subtitle = getSubtitle(cat.slug, cat.subcategories?.length ?? 0);
            const isWide = WIDE_INDEXES.has(index);

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: index * 0.05,
                }}
                className={cn(isWide && 'md:col-span-2')}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className={cn(
                    'glass-card group relative flex h-full w-full flex-col justify-between overflow-hidden p-6',
                    'cursor-pointer transition-all duration-300 ease-out',
                    'hover:scale-[1.02] hover:glow-orange',
                  )}
                >
                  <div
                    className="gradient-orange-amber pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                    aria-hidden
                  />

                  <Icon
                    className="relative w-12 h-12 text-orange-400 transition-colors duration-300 group-hover:text-amber-300"
                    strokeWidth={1.5}
                  />

                  <div className="relative">
                    <h3 className="text-xl md:text-2xl font-bold text-white/90 leading-tight">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
                  </div>

                  <ArrowUpRight
                    className="absolute bottom-5 right-5 h-5 w-5 text-orange-400 opacity-0 translate-x-1 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
