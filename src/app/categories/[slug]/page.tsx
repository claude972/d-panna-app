import { notFound } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import Header from '@/components/layout/Header';
import FAQAccordion from '@/components/ui/FAQAccordion';
import Footer from '@/components/ui/Footer';
import { CATEGORIES } from '@/lib/constants';

import CategoryCTA from './CategoryCTA';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const iconMap = LucideIcons as unknown as Record<string, LucideIcon>;
  const Icon = iconMap[category.icon] ?? LucideIcons.Wrench;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-950 pt-20">
        {/* Hero spécifique catégorie */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(245,158,11,0.15) 40%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
            <Icon
              className="text-orange-400"
              style={{ width: 200, height: 200 }}
              strokeWidth={1.2}
              aria-hidden="true"
            />
            <h1 className="text-5xl font-black tracking-tight text-white/90 md:text-7xl">
              {category.label}
            </h1>
            <p className="max-w-2xl text-base text-stone-400 md:text-xl">
              Un artisan certifié et assuré en {category.label.toLowerCase()}, chez vous en moins de
              30 minutes. Devis gratuit, tarif transparent.
            </p>
          </div>
        </section>

        {/* Sous-catégories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <section className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <div className="mb-16 flex flex-col items-center gap-4 text-center">
                <span className="glass-card inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-widest text-orange-400">
                  Nos interventions
                </span>
                <h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
                  Tous nos services en {category.label.toLowerCase()}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub}
                    className="glass-card group flex items-center gap-4 p-6 transition-all duration-300 hover:border-orange-500/40"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20">
                      <LucideIcons.Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-base font-medium text-white/90">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA questionnaire */}
        <section className="px-6 py-24">
          <CategoryCTA categorySlug={category.slug} label={category.label} />
        </section>

        <FAQAccordion />
        <Footer />
      </main>
    </>
  );
}
