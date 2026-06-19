'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import QuestionnaireModal from '@/components/ui/QuestionnaireModal';

interface CategoryCTAProps {
  categorySlug: string;
  label: string;
}

export default function CategoryCTA({ categorySlug, label }: CategoryCTAProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-black tracking-tight text-white/90 md:text-4xl">
          Besoin d&apos;un pro en {label} ?
        </h2>
        <p className="text-base text-stone-400 md:text-lg">
          Décrivez votre besoin en 30 secondes, un artisan certifié vous rappelle en moins de 20 minutes.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="gradient-orange-amber glow-orange group inline-flex items-center gap-2 rounded-full px-10 py-5 text-base font-semibold text-stone-950 transition-transform duration-300 ease-out hover:scale-[1.03]"
        >
          <span>Démarrer mon diagnostic</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </button>
      </div>
      <QuestionnaireModal
        isOpen={open}
        onClose={() => setOpen(false)}
        defaultCategory={categorySlug}
      />
    </>
  );
}
