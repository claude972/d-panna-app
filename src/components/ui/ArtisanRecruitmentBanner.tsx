'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: '+30%', label: "Chiffre d'affaires moyen" },
  { value: '5j', label: 'Temps avant 1er chantier' },
  { value: '24/7', label: 'Support dédié' },
  { value: '0€', label: "Frais d'inscription" },
];

export default function ArtisanRecruitmentBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950/40 via-stone-900 to-stone-950 py-32 px-6">
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs uppercase tracking-widest text-emerald-400">
            Vous êtes artisan ?
          </span>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white/90 md:text-6xl">
            Rejoignez{' '}
            <span className="text-emerald-400">15 000+ artisans</span>{' '}
            qui développent leur activité avec nous
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-300 md:text-lg">
            Recevez des demandes qualifiées près de chez vous, gérez vos
            chantiers sereinement et faites grandir votre carnet de commandes.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <Link
              href="/artisans"
              className={cn(
                'group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4',
                'text-base font-semibold text-stone-950',
                'transition-all duration-300 ease-out hover:bg-emerald-400',
                'hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)]'
              )}
            >
              Devenir partenaire
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <p className="text-sm text-stone-500">
              Inscription gratuite · Premier RDV client en 7 jours
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.15 + index * 0.08,
              }}
              whileHover={{ scale: 1.04 }}
              className={cn(
                'glass-card group relative p-6 transition-all duration-300 ease-out',
                'hover:border-emerald-400/30',
                'hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.45)]'
              )}
            >
              <div className="text-4xl font-black tracking-tight text-emerald-400 md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-stone-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
