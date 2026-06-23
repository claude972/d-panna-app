'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { FAQ } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-white py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
            FAQ
          </span>
          <h2 className="mt-3 font-display font-black text-ink text-3xl md:text-5xl uppercase tracking-tight">
            VOS QUESTIONS
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={cn(
                  'card-bold overflow-hidden rounded-xl transition-colors duration-300',
                  isOpen && 'bg-surface-2',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="font-display font-extrabold text-ink text-lg">
                    {item.question}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-blue">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
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
                      <div className="px-6 pb-6 text-base leading-relaxed text-muted">
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
