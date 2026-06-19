'use client';

import { useRouter } from 'next/navigation';

import Header from '@/components/layout/Header';
import QuestionnaireModal from '@/components/ui/QuestionnaireModal';

export default function QuestionnairePage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20">
        <QuestionnaireModal isOpen onClose={() => router.push('/')} />
      </div>
    </>
  );
}
