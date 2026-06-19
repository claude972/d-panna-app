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
    <section className="relative py-32 px-6 bg-stone-950 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-widest text-orange-400">
            Process
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white/90">
            3 étapes, un seul appel
          </h2>
          <p className="mt-4 text-base md:text-lg text-stone-300 leading-relaxed max-w-2xl mx-auto">
            Du diagnostic à la résolution, on s'occupe de tout pour vous.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = ICON_MAP[step.icon] ?? Wrench;
            const isLast = index === HOW_IT_WORKS.length - 1;

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
                  className="glass-card hover-lift relative p-8 h-full overflow-hidden"
                >
                  <Icon
                    className="absolute top-6 right-6 w-12 h-12 text-orange-400"
                    aria-hidden="true"
                  />

                  <div className="text-[120px] md:text-[180px] font-black text-stone-800 leading-none mb-4 select-none">
                    {step.num}
                  </div>

                  <h3 className="text-2xl font-bold text-white/90 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-stone-400 leading-relaxed">
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
                        stroke="url(#arrow-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                      />
                      <path
                        d="M36 6 L44 12 L36 18"
                        stroke="url(#arrow-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                      <defs>
                        <linearGradient
                          id="arrow-gradient"
                          x1="0"
                          y1="0"
                          x2="48"
                          y2="0"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#f97316" />
                          <stop offset="1" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
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
