import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck } from 'lucide-react';

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
      <main className="min-h-screen bg-surface">

        {/* Fil d'ariane */}
        <nav
          aria-label="Fil d'ariane"
          className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm text-muted"
        >
          <Link href="/" className="hover:text-ink transition-colors">
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#categories" className="hover:text-ink transition-colors">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink font-medium" aria-current="page">
            {category.label}
          </span>
        </nav>

        {/* Hero bg-ink */}
        <section className="bg-ink px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl flex flex-col items-center gap-6 text-center">
            {/* Pastille carrée bg-yellow */}
            <div
              className="flex items-center justify-center rounded-2xl bg-yellow"
              style={{ width: 88, height: 88 }}
              aria-hidden="true"
            >
              <Icon className="text-ink" style={{ width: 48, height: 48 }} strokeWidth={2} />
            </div>

            {/* Eyebrow */}
            <p className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-yellow">
              Nos interventions
            </p>

            {/* H1 */}
            <h1 className="font-display font-black text-white text-5xl md:text-7xl uppercase leading-none">
              {category.label}
            </h1>

            {/* Sous-titre */}
            <p className="max-w-2xl text-base md:text-xl" style={{ color: '#aeb7dd' }}>
              Un artisan certifié et assuré en {category.label.toLowerCase()}, chez vous en moins
              de 30 minutes. Devis gratuit, tarif transparent.
            </p>
          </div>
        </section>

        {/* Section services — fond blanc */}
        {category.subcategories && category.subcategories.length > 0 && (
          <section className="bg-surface px-6 py-20">
            <div className="mx-auto max-w-7xl">
              <h2 className="font-display font-black text-ink text-3xl md:text-4xl uppercase mb-10 text-center">
                Tous nos services en {category.label}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub}
                    className="card-bold flex items-center gap-4 px-6 py-5"
                  >
                    <CircleCheck
                      className="text-blue shrink-0"
                      style={{ width: 22, height: 22 }}
                      aria-hidden="true"
                    />
                    <span className="text-base font-medium text-ink">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bande stats bg-blue */}
        <section className="bg-blue px-6 py-16">
          <div className="mx-auto max-w-4xl grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <span className="font-display font-black text-yellow text-5xl md:text-6xl">
                24/7
              </span>
              <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Disponible en permanence
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-display font-black text-yellow text-5xl md:text-6xl">
                &lt;30 min
              </span>
              <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Délai d'intervention moyen
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="font-display font-black text-yellow text-5xl md:text-6xl">
                93%
              </span>
              <span className="text-sm font-medium text-white/80 uppercase tracking-wide">
                Clients satisfaits
              </span>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-surface px-6 py-20">
          <div className="mx-auto max-w-3xl flex flex-col items-center gap-6 text-center">
            <p className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
              Intervention rapide
            </p>
            <h2 className="font-display font-black text-ink text-3xl md:text-4xl uppercase">
              Besoin d&apos;un {category.label} ?
            </h2>
            <p className="text-base text-muted md:text-lg max-w-xl">
              Décrivez votre besoin en 30 secondes. Un artisan certifié vous rappelle en moins de
              20 minutes avec un devis clair et transparent.
            </p>
            <CategoryCTA categorySlug={category.slug} label={category.label} />
          </div>
        </section>

        <FAQAccordion />
        <Footer />
      </main>
    </>
  );
}
