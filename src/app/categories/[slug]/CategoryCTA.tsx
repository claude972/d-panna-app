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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 bg-yellow text-ink font-display font-extrabold rounded-xl px-5 py-3 hover:brightness-95 cursor-pointer"
      >
        <span>Démarrer mon diagnostic</span>
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <QuestionnaireModal
        isOpen={open}
        onClose={() => setOpen(false)}
        defaultCategory={categorySlug}
      />
    </>
  );
}
