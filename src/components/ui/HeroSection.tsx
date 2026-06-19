"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HERO, STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  onCTAClick?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// On met "en chemin" en gradient ; sinon fallback sur le dernier mot
function splitHeroHeadline(h1: string): { lead: string; accent: string } {
  const keyword = "en chemin";
  const idx = h1.toLowerCase().lastIndexOf(keyword);
  if (idx >= 0) {
    return {
      lead: h1.slice(0, idx).trimEnd(),
      accent: h1.slice(idx, idx + keyword.length),
    };
  }
  const parts = h1.trim().split(" ");
  const accent = parts.pop() ?? "";
  return { lead: parts.join(" "), accent };
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  const { lead, accent } = splitHeroHeadline(HERO.h1);
  const heroStats = STATS.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* Background pattern + radial gradient */}
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20,18,16,0.2) 0%, rgba(12,10,9,0.85) 60%, rgba(12,10,9,1) 100%)",
        }}
      />

      {/* Halo orange diffus */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(245,158,11,0.15) 40%, transparent 70%)",
        }}
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 md:gap-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest text-stone-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-orange-400">Élu n°1 par Capital</span>
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-black tracking-tight text-white/90 md:text-7xl lg:text-8xl"
          >
            {lead}{" "}
            <span className="text-gradient">{accent}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-stone-300 md:text-2xl"
          >
            {HERO.subtitle}
          </motion.p>

          {/* Stats inline */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-gradient text-4xl font-black">
                  {stat.value}
                </span>
                <span className="max-w-[14rem] text-xs uppercase tracking-widest text-stone-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-col items-center gap-5"
          >
            <motion.button
              type="button"
              onClick={onCTAClick}
              className={cn(
                "gradient-orange-amber glow-orange group inline-flex items-center gap-2 rounded-full px-10 py-5 text-base font-semibold text-stone-950 transition-transform duration-300 ease-out hover:scale-[1.03]"
              )}
              animate={{
                boxShadow: [
                  "0 0 24px rgba(249,115,22,0.35)",
                  "0 0 48px rgba(249,115,22,0.6)",
                  "0 0 24px rgba(249,115,22,0.35)",
                ],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span>Trouver mon artisan</span>
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </motion.button>

            <a
              href="#comment-ca-marche"
              className="text-sm text-stone-400 underline-offset-4 transition-colors duration-300 ease-out hover:text-white hover:underline"
            >
              Voir comment ça marche
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
