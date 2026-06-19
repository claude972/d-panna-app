import Header from '@/components/layout/Header';
import BlogCard from '@/components/ui/BlogCard';
import Footer from '@/components/ui/Footer';
import { BLOG_POSTS } from '@/lib/constants';

export const metadata = {
  title: 'Blog D-Panna — conseils & guides pour votre maison',
  description:
    'Tous nos guides, conseils d&apos;experts et astuces pour ne plus jamais subir une mauvaise surprise avec votre artisan.',
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-950 pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(245,158,11,0.15) 40%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <span className="glass-card inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-widest text-orange-400">
              Le blog
            </span>
            <h1 className="text-5xl font-black tracking-tight text-white/90 md:text-7xl">
              Le blog D-Panna{' '}
              <span className="text-gradient">conseils &amp; guides</span>
            </h1>
            <p className="max-w-2xl text-base text-stone-400 md:text-xl">
              Plomberie, électricité, serrurerie, chauffage : nos artisans partagent leurs astuces
              pour vous éviter les mauvaises surprises.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
