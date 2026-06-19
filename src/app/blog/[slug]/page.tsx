import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-950 pt-20">
        {/* Hero article */}
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-stone-400 transition-colors hover:text-orange-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>
            <span className="glass-card mb-6 inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-widest text-orange-400">
              {post.category}
            </span>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white/90 md:text-6xl">
              {post.title}
            </h1>
            <time
              dateTime={post.date}
              className="text-sm uppercase tracking-widest text-stone-500"
            >
              {formatDate(post.date)}
            </time>
          </div>
        </section>

        {/* Article + Sidebar TOC */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <div className="space-y-6 text-base leading-relaxed text-stone-300 md:text-lg">
                <p className="text-xl text-white/90 md:text-2xl">{post.excerpt}</p>
                {FILLER_PARAGRAPHS.map((paragraph, i) => (
                  <div key={i} id={`section-${i}`}>
                    {i < 4 && (
                      <h2 className="mb-3 mt-10 text-2xl font-bold text-white/90 md:text-3xl">
                        {paragraph.split('.')[0]}
                      </h2>
                    )}
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="glass-card p-6">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-orange-400">
                    Sommaire
                  </h3>
                  <ul className="space-y-3">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block text-sm text-stone-400 transition-colors hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Articles liés */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                À lire ensuite
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white/90 md:text-4xl">
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
