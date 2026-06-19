'use client'

import { TRUST_LOGOS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function TrustBar() {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS]

  return (
    <section className="py-12 px-6 border-y border-white/5 overflow-hidden bg-stone-950">
      <p className="text-xs uppercase tracking-widest text-stone-500 text-center mb-8">
        Ils nous font confiance
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max animate-trustbar-marquee gap-16">
          {logos.map((logo, index) => (
            <span
              key={`${logo}-${index}`}
              className={cn(
                'font-serif italic text-2xl md:text-3xl text-stone-500',
                'transition-colors duration-300 ease-out hover:text-white/70',
                'whitespace-nowrap shrink-0'
              )}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes trustbar-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-trustbar-marquee {
          animation: trustbar-marquee 50s linear infinite;
        }
      `}</style>
    </section>
  )
}
