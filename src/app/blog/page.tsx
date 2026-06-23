import Header from '@/components/layout/Header';
import BlogCard from '@/components/ui/BlogCard';
import Footer from '@/components/ui/Footer';
import { BLOG_POSTS } from '@/lib/constants';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Blog D-Panna — conseils & guides pour votre maison',
  description:
    'Tous nos guides, conseils d&apos;experts et astuces pour ne plus jamais subir une mauvaise surprise avec votre artisan.',
};

const FILTER_CATEGORIES = ['Tous', 'Plomberie', 'Électricité', 'Serrurerie', 'Chauffage', 'Nuisibles', 'Travaux'];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-ink px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-yellow">
              Le blog
            </span>
            <h1 className="font-display font-black text-4xl text-white md:text-6xl leading-tight">
              CONSEILS &amp; GUIDES<br className="hidden md:block" /> POUR VOTRE MAISON
            </h1>
            {/* Barre de recherche */}
            <div className="relative w-full max-w-xl mt-2">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                placeholder="Rechercher un article…"
                className="w-full rounded-xl bg-white py-3.5 pl-12 pr-4 text-ink text-base outline-none placeholder:text-muted focus:ring-2 focus:ring-yellow"
              />
            </div>
          </div>
        </section>

        {/* Filtres + grille */}
        <section className="px-6 py-12 pb-24">
          <div className="mx-auto max-w-7xl">
            {/* Chips catégories */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              {FILTER_CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  type="button"
                  className={
                    i === 0
                      ? 'rounded-full px-4 py-1.5 font-display font-extrabold text-sm bg-ink text-white'
                      : 'rounded-full px-4 py-1.5 font-display font-extrabold text-sm border border-line text-muted hover:border-ink hover:text-ink transition-colors'
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grille articles */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-14 flex items-center justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    page === 1
                      ? 'h-9 w-9 rounded-full font-display font-extrabold text-sm bg-ink text-white'
                      : 'h-9 w-9 rounded-full font-display font-extrabold text-sm border border-line text-muted hover:border-ink hover:text-ink transition-colors'
                  }
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
