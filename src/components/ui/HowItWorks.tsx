'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Users, Wrench, type LucideIcon } from 'lucide-react';
import { HOW_IT_WORKS } from '@/lib/constants';

const ICON_MAP: Record<string, LucideIcon> = {
  FileText,
  Users,
  Wrench,
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 px-6 bg-surface-2">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
            Comment ça marche
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-black text-ink">
            3 ÉTAPES, UN SEUL APPEL
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Du diagnostic à la résolution, on s'occupe de tout pour vous.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = ICON_MAP[step.icon] ?? Wrench;
            const isLast = index === HOW_IT_WORKS.length - 1;
            const numLabel = String(index + 1).padStart(2, '0');

            return (
              <div key={step.num} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 40 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: 'easeOut',
                  }}
                  className="card-bold p-5 rounded-2xl hover:-translate-y-0.5 transition h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-display font-black text-3xl text-blue leading-none">
                      {numLabel}
                    </span>
                    <Icon
                      className="w-7 h-7 text-blue"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display font-extrabold text-ink text-lg mb-2">
                    {step.title}
                  </h3>

                  <p className="text-muted leading-relaxed text-sm">
                    {step.description}
                  </p>
                </motion.div>

                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.4,
                      ease: 'easeOut',
                    }}
                    className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10 pointer-events-none"
                    aria-hidden="true"
                  >
                    <svg
                      width="48"
                      height="24"
                      viewBox="0 0 48 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 12 H40"
                        stroke="#2C53E6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M36 6 L44 12 L36 18"
                        stroke="#2C53E6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
