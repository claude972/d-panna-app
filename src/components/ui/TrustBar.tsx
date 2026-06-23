'use client'

import { TRUST_LOGOS } from '@/lib/constants'

export default function TrustBar() {
  const logos = [...TRUST_LOGOS, ...TRUST_LOGOS]

  return (
    <section className="py-10 px-6 border-y border-line overflow-hidden bg-white">
      <p className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-muted text-center mb-8">
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
              className="font-display font-extrabold text-2xl md:text-3xl text-muted whitespace-nowrap shrink-0 transition-colors duration-300 ease-out hover:text-ink"
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
