"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Image } from "lucide-react";
import { HERO } from "@/lib/constants";

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

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink"
    >
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 md:py-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
        >
          {/* Left column */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-lg bg-yellow px-2.5 py-1 font-display font-extrabold text-[11px] text-ink">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                ARTISANS VÉRIFIÉS &amp; ASSURÉS
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-black text-white text-5xl md:text-6xl tracking-tight leading-[1.05]"
            >
              UN PRO CHEZ VOUS EN{" "}
              <span className="text-yellow">30 MIN.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-[#aeb7dd] text-lg leading-relaxed max-w-md"
            >
              Une panne ? Décrivez-la en 30 secondes. On vous met en relation
              avec un artisan certifié près de chez vous, au juste prix.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onCTAClick}
                className="inline-flex items-center gap-2 bg-yellow text-ink font-display font-extrabold rounded-xl px-5 py-3 hover:brightness-95 cursor-pointer"
              >
                <span>Décrire mon problème</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="/#how-it-works"
                className="border-[1.5px] border-white/40 text-white rounded-xl px-5 py-3 hover:bg-white/10 font-display font-extrabold inline-flex items-center"
              >
                Comment ça marche
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 text-sm"
            >
              <span className="text-yellow tracking-tight">★★★★★</span>
              <span className="text-[#aeb7dd]">
                <span className="text-white font-bold">4,8/5</span>
                {" · "}12 000 avis
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[#aeb7dd]">
                <span className="text-white font-bold">+500 000</span>{" "}
                dépannages depuis 2013
              </span>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div variants={itemVariants} className="relative">
            {/* Image placeholder */}
            <div className="bg-ink-soft rounded-2xl h-[320px] flex items-center justify-center">
              <Image className="h-12 w-12 text-[#6f7cb5]" aria-hidden="true" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-yellow text-ink rounded-xl px-3.5 py-2.5 shadow-lg">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-yellow text-[11px] font-black shrink-0">
                ✓
              </span>
              <div className="leading-tight">
                <p className="font-display font-extrabold text-[13px]">Karim, plombier</p>
                <p className="text-[11px] font-semibold opacity-80">Vérifié · arrive dans 22 min</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
