'use client'

import { useState } from 'react'
import { AlertTriangle, Phone, X } from 'lucide-react'
import { PHONE_URGENCY } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface EmergencyBannerProps {
  dismissible?: boolean
}

export default function EmergencyBanner({ dismissible = false }: EmergencyBannerProps) {
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  const telHref = `tel:${PHONE_URGENCY.replace(/\s+/g, '')}`

  return (
    <div
      className={cn(
        'relative w-full z-40 h-10',
        'bg-coral',
        'flex items-center justify-center gap-3',
        'px-4'
      )}
      role="region"
      aria-label="Bandeau d'urgence"
    >
      <AlertTriangle className="h-3.5 w-3.5 text-white shrink-0" aria-hidden="true" />

      <span className="font-display font-extrabold text-[11px] uppercase text-white tracking-wide hidden md:inline">
        Urgence 24/7 — un dépanneur joignable maintenant
      </span>
      <span className="font-display font-extrabold text-[11px] uppercase text-white tracking-wide md:hidden">
        Urgence 24/7
      </span>

      <span className="text-white/60" aria-hidden="true">·</span>

      <a
        href={telHref}
        className="inline-flex items-center gap-1.5 font-display font-extrabold text-[11px] uppercase text-white underline underline-offset-2 hover:no-underline"
        aria-label={`Appeler le ${PHONE_URGENCY}`}
      >
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{PHONE_URGENCY}</span>
      </a>

      {dismissible && (
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="absolute right-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
          aria-label="Fermer le bandeau d'urgence"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
