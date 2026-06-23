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
      className="py-24 px-6 bg-surface-2"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue"
          >
            Nos services
          </motion.span>
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
            className="mt-4 text-3xl md:text-5xl font-display font-black text-ink"
          >
            {CATEGORIES.length} SPÉCIALITÉS
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
                    'card-bold group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl p-4',
                    'cursor-pointer transition-all duration-200 ease-out',
                    'hover:-translate-y-0.5 hover:border-blue',
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="bg-blue-tint rounded-xl p-2 flex items-center justify-center">
                      <Icon
                        className="h-9 w-9 text-blue"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    <ArrowUpRight
                      className="h-5 w-5 text-blue opacity-0 translate-x-1 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0"
                      aria-hidden="true"
                    />
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-ink text-base md:text-lg leading-tight">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-xs text-muted">{subtitle}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
