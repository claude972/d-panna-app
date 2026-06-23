'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '@/lib/constants';

type ParsedStat = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  raw: string;
};

const ANIMATION_MS = 1200;

function parseStat(value: string): ParsedStat {
  // Cas particulier "3 - 20 min" → on anime jusqu'à la borne haute (20), suffixe " min"
  const rangeMatch = value.match(/^(\d+)\s*-\s*(\d+)\s*(.*)$/);
  if (rangeMatch) {
    const low = rangeMatch[1];
    const high = parseInt(rangeMatch[2], 10);
    const rest = rangeMatch[3] ?? '';
    return {
      prefix: `${low} - `,
      target: high,
      suffix: rest ? ` ${rest}`.replace(/\s+/g, ' ') : '',
      decimals: 0,
      raw: value,
    };
  }

  // Cas "4,2/5"
  const fractionMatch = value.match(/^([\d,\.]+)\/(\d+)$/);
  if (fractionMatch) {
    const numStr = fractionMatch[1].replace(',', '.');
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
    return {
      prefix: '',
      target,
      suffix: `/${fractionMatch[2]}`,
      decimals,
      raw: value,
    };
  }

  // Cas générique : prefix non-numérique (ex "+"), chiffres+séparateurs, suffix (ex "%", " K", " min")
  const generic = value.match(/^([^\d]*)([\d\s,\.]+)(.*)$/);
  if (generic) {
    const prefix = generic[1] ?? '';
    const numRaw = (generic[2] ?? '').trim();
    const suffix = generic[3] ?? '';
    const normalized = numRaw.replace(/\s/g, '').replace(',', '.');
    const target = parseFloat(normalized);
    const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0;
    if (!Number.isNaN(target)) {
      return { prefix, target, suffix, decimals, raw: value };
    }
  }

  return { prefix: value, target: 0, suffix: '', decimals: 0, raw: value };
}

function formatNumber(n: number, decimals: number): string {
  const rounded = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  if (decimals > 0) {
    return rounded.replace('.', ',');
  }
  const asInt = Math.round(n);
  if (asInt >= 1000) {
    return asInt.toLocaleString('fr-FR').replace(/ /g, ' ');
  }
  return rounded;
}

type CounterCellProps = {
  stat: ParsedStat;
  shouldAnimate: boolean;
};

function CounterCell({ stat, shouldAnimate }: CounterCellProps) {
  const [current, setCurrent] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldAnimate) return;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / ANIMATION_MS, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(stat.target * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
  }, [shouldAnimate, stat.target]);

  return (
    <span>
      {stat.prefix}
      {formatNumber(current, stat.decimals)}
      {stat.suffix}
    </span>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  const parsed = STATS.map((s) => parseStat(s.value));

  return (
    <section className="bg-blue py-16 px-6">
      <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-6xl mx-auto">
        {parsed.map((stat, i) => (
          <motion.div
            key={stat.raw}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center px-6 py-8 border-r border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r md:[&:nth-child(2)]:border-white/10"
          >
            <div className="font-display font-black text-yellow text-3xl leading-none">
              <CounterCell stat={stat} shouldAnimate={inView} />
            </div>
            <div className="mt-2 text-[#dbe2fb] text-xs uppercase tracking-widest leading-snug max-w-[10rem]">
              {STATS[i].label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
