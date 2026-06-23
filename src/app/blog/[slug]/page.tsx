import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ImageIcon, Lightbulb } from 'lucide-react';

import Header from '@/components/layout/Header';
import BlogCard from '@/components/ui/BlogCard';
import Footer from '@/components/ui/Footer';
import { BLOG_POSTS } from '@/lib/constants';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// 8-10 paragraphes "lorem-style" mais fr/réalistes
const FILLER_PARAGRAPHS = [
  "Quand un imprévu survient à la maison, la première réaction est souvent la panique. Pourtant, quelques bons réflexes permettent de limiter les dégâts avant l'arrivée d'un artisan.",
  "La majorité des sinistres domestiques sont aggravés par les minutes qui suivent leur apparition. Couper l'arrivée d'eau ou le disjoncteur principal n'est pas un réflexe naturel, mais peut éviter des milliers d'euros de réparation.",
  "Les artisans certifiés D-Panna interviennent 7j/7, mais arrivent rarement en moins de 30 minutes. Ce temps d'attente est crucial : c'est là que vous, propriétaire ou locataire, devez agir.",
  "Première règle absolue : sécuriser la zone. Éloignez les appareils électriques de toute source d'eau, coupez le courant en cas de doute, et ventilez si une odeur suspecte se dégage.",
  "Deuxième règle : documenter. Prenez des photos avant toute manipulation. Ces images serviront pour le devis de l'artisan, mais aussi pour votre assurance habitation en cas de prise en charge.",
  "Troisième règle : ne tentez pas de réparer vous-même si vous n'êtes pas certain de votre diagnostic. Une mauvaise intervention peut transformer une fuite mineure en sinistre majeur, ou un court-circuit local en panne générale.",
  "L'assurance habitation classique couvre la plupart des dégâts d'origine accidentelle, à condition que vous puissiez prouver votre bonne foi et l'absence de négligence. C'est ici que la documentation prend tout son sens.",
  "Une fois l'artisan sur place, écoutez son diagnostic mais n'hésitez pas à poser des questions. Un bon pro prend le temps d'expliquer ce qu'il fait, et n'augmente jamais le devis sans accord préalable.",
  "Enfin, gardez à l'esprit que le moins cher n'est pas toujours le meilleur. Un tarif anormalement bas cache souvent des frais cachés ou des matériaux de moindre qualité. Privilégiez la transparence.",
  "En résumé : restez calme, sécurisez, documentez, et faites confiance à un réseau certifié. Les bons réflexes sauvent du temps, de l'argent, et bien souvent votre logement.",
];

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // TOC = on prend les 4 premiers paragraphes comme titres "ancrés"
  const tocItems = FILLER_PARAGRAPHS.slice(0, 4).map((p, i) => ({
    id: `section-${i}`,
    label: p.split('.')[0]?.slice(0, 60) ?? `Section ${i + 1}`,
  }));

  // Auteur fictif cohérent
  const authorInitials = 'DP';

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* En-tête article */}
        <section className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-2xl">
            {/* Fil d'ariane */}
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-blue"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>

            {/* Badge catégorie */}
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full bg-blue-tint px-3 py-1 font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue-dark">
                {post.category}
              </span>
            </div>

            {/* Titre */}
            <h1 className="mb-6 font-display font-black text-3xl text-ink leading-tight md:text-5xl">
              {post.title}
            </h1>

            {/* Auteur + meta */}
            <div className="mb-8 flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-display font-extrabold text-sm text-white flex-shrink-0">
                {authorInitials}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-display font-extrabold text-sm text-ink">Équipe D-Panna</span>
                <time dateTime={post.date} className="text-xs text-muted">
                  {formatDate(post.date)} · 6 min de lecture
                </time>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="flex h-52 w-full items-center justify-center rounded-2xl bg-blue-tint md:h-72">
              <ImageIcon className="h-10 w-10 text-blue opacity-60" />
            </div>
          </div>
        </section>

        {/* Corps : sommaire + contenu */}
        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Sommaire sticky */}
            <aside className="lg:col-span-3">
              <div className="sticky top-28">
                <p className="mb-3 font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
                  Sommaire
                </p>
                <ul className="space-y-2.5">
                  {tocItems.map((item, i) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={
                          i === 0
                            ? 'block text-sm font-display font-extrabold text-blue leading-snug'
                            : 'block text-sm text-muted hover:text-blue leading-snug transition-colors'
                        }
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Article */}
            <article className="lg:col-span-9">
              {/* Chapeau */}
              <p className="mb-8 text-xl font-medium text-ink leading-relaxed md:text-2xl">
                {post.excerpt}
              </p>

              <div className="space-y-6 text-base leading-relaxed text-ink/80 md:text-lg">
                {FILLER_PARAGRAPHS.map((paragraph, i) => (
                  <div key={i} id={`section-${i}`}>
                    {i < 4 && (
                      <h2 className="mb-3 mt-10 font-display font-black text-2xl text-ink md:text-3xl">
                        {paragraph.split('.')[0]}
                      </h2>
                    )}
                    <p>{paragraph}</p>
                    {/* Encadré astuce après le 2e paragraphe */}
                    {i === 1 && (
                      <div className="card-bold mt-6 flex gap-4 rounded-2xl bg-blue-tint border border-blue p-5">
                        <Lightbulb className="h-6 w-6 flex-shrink-0 text-blue mt-0.5" />
                        <div>
                          <p className="font-display font-extrabold text-sm text-blue-dark mb-1">
                            Bon à savoir
                          </p>
                          <p className="text-sm text-ink/80 leading-relaxed">
                            Photographiez toujours les dégâts avant d'intervenir. Ces preuves visuelles
                            sont indispensables pour votre déclaration d'assurance et permettent
                            à l'artisan d'établir un devis précis à distance.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA bloc */}
              <div className="mt-16 rounded-2xl bg-ink p-8 text-center">
                <p className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-yellow mb-3">
                  Urgence
                </p>
                <h3 className="font-display font-black text-2xl text-white mb-4 md:text-3xl">
                  UNE FUITE CHEZ VOUS MAINTENANT ?
                </h3>
                <p className="text-white/70 text-sm mb-6 max-w-sm mx-auto">
                  Un artisan certifié vous rappelle en moins de 20 minutes, 7j/7.
                </p>
                <Link
                  href="/#urgence"
                  className="inline-block rounded-xl bg-yellow px-8 py-3.5 font-display font-extrabold text-ink text-sm uppercase tracking-[0.08em] hover:opacity-90 transition-opacity"
                >
                  Appeler un artisan
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* Articles liés */}
        <section className="bg-surface-2 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-2">
              <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
                À lire ensuite
              </span>
              <h2 className="font-display font-black text-3xl text-ink md:text-4xl">
                Articles liés
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
