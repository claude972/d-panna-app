'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingCTAProps {
  onClick: () => void
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            type="button"
            onClick={onClick}
            aria-label="J'ai besoin d'un dépanneur"
            className={cn(
              'inline-flex items-center gap-3 rounded-full',
              'bg-yellow text-ink font-display font-extrabold',
              'px-5 py-3 md:px-6',
              'shadow-lg transition hover:brightness-95 active:scale-95',
            )}
          >
            <Phone className="w-5 h-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <span className="hidden md:inline whitespace-nowrap">
              J&apos;ai besoin d&apos;un dépanneur
            </span>
            <span className="md:hidden font-display font-extrabold text-[11px] uppercase tracking-wide">
              24/7
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
