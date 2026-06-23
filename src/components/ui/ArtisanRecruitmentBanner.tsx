'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
    <section className="py-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="bg-yellow rounded-3xl p-10 md:p-14">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue-dark">
                Vous êtes artisan ?
              </span>

              <h2 className="mt-4 font-display font-black text-ink text-4xl md:text-5xl uppercase tracking-tight leading-none">
                RECEVEZ DES MISSIONS PRÈS DE CHEZ VOUS
              </h2>

              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70">
                Recevez des demandes qualifiées près de chez vous, gérez vos
                chantiers sereinement et faites grandir votre carnet de commandes.
              </p>

              <div className="mt-8 flex flex-col items-start gap-3">
                <Link
                  href="/artisans"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3',
                    'font-display font-extrabold text-base text-white',
                    'transition-opacity duration-300 ease-out hover:opacity-80'
                  )}
                >
                  Rejoindre le réseau
                </Link>
                <p className="text-sm text-ink/60">
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
                  className="card-bold p-6 bg-white"
                >
                  <div className="font-display font-black text-4xl md:text-5xl text-ink tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-muted">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
