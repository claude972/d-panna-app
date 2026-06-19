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
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping"
            />
            <button
              type="button"
              onClick={onClick}
              aria-label="J'ai besoin d'un dépanneur"
              className={cn(
                'gradient-orange-amber glow-orange',
                'relative flex items-center gap-3 rounded-full',
                'px-5 py-4 md:px-6',
                'text-white font-semibold',
                'shadow-2xl transition-transform duration-300 ease-out',
                'hover:scale-105 active:scale-95'
              )}
            >
              <Phone className="w-5 h-5" strokeWidth={2.5} />
              <span className="hidden md:inline whitespace-nowrap">
                J&apos;ai besoin d&apos;un dépanneur
              </span>
              <span
                className={cn(
                  'md:hidden',
                  'rounded-full bg-white/20 backdrop-blur-sm',
                  'px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest'
                )}
              >
                24/7
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
