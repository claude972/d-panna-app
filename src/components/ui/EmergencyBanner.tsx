'use client'

import { useState } from 'react'
import { Phone, X } from 'lucide-react'
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
        'fixed top-0 inset-x-0 z-50 h-10',
        'bg-gradient-to-r from-orange-500 to-amber-500',
        'flex items-center justify-center gap-3',
        'text-sm font-semibold text-stone-950',
        'px-4'
      )}
      role="region"
      aria-label="Bandeau d'urgence"
    >
      <span aria-hidden="true">⚠️</span>

      <span
        className="inline-block h-2 w-2 rounded-full bg-stone-950 animate-pulse"
        aria-hidden="true"
      />

      <span className="hidden md:inline">
        Urgence 24/7 — Dépanneur joignable immédiatement
      </span>
      <span className="md:hidden">Urgence 24/7</span>

      <span className="opacity-60" aria-hidden="true">•</span>

      <a
        href={telHref}
        className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:no-underline"
      >
        <Phone className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{PHONE_URGENCY}</span>
      </a>

      {dismissible && (
        <button
          type="button"
          onClick={() => setHidden(true)}
          className="absolute right-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-stone-950 hover:bg-stone-950/10 transition-colors"
          aria-label="Fermer le bandeau d'urgence"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
