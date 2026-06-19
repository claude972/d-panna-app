'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQ } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest text-orange-400">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-white/90">
            Vos questions, <span className="text-gradient">nos réponses</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={cn(
                  'glass-card overflow-hidden rounded-2xl transition-colors duration-300',
                  isOpen
                    ? 'border-orange-500/50'
                    : 'hover:border-orange-500/30',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="text-lg font-semibold text-white/90">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange-400"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-base leading-relaxed text-stone-300">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
