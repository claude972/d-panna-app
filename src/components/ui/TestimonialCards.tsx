"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialCards() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = TESTIMONIALS.length;

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % total) + total) % total);
    },
    [index, total],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [total]);

  const current = TESTIMONIALS[index];

  return (
    <section className="relative bg-stone-950 py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-widest text-orange-400">
            Témoignages
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
            Ils ont fait appel à nous
          </h2>
        </div>

        <div className="relative mx-auto min-h-[400px] max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-card p-10 md:p-12"
            >
              <div className="flex gap-1" aria-label={`Note ${current.rating} sur 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < current.rating
                        ? "fill-orange-400 text-orange-400"
                        : "text-white/20",
                    )}
                  />
                ))}
              </div>

              <p className="mt-8 text-xl italic leading-relaxed text-white/90 md:text-2xl">
                « {current.text} »
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="gradient-orange-amber flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-stone-950">
                  {getInitials(current.name)}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-white/90">
                    {current.name}
                  </span>
                  <span className="text-sm text-stone-500">
                    {current.city}
                    {current.service ? ` · ${current.service}` : ""}
                  </span>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <button
            type="button"
            onClick={prev}
            aria-label="Témoignage précédent"
            className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-3 text-white/80 backdrop-blur-xl transition-all duration-300 ease-out hover:border-orange-500/40 hover:text-orange-400 md:-translate-x-16"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Témoignage suivant"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 rounded-full border border-white/10 bg-white/5 p-3 text-white/80 backdrop-blur-xl transition-all duration-300 ease-out hover:border-orange-500/40 hover:text-orange-400 md:translate-x-16"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller au témoignage ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-out",
                i === index
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
