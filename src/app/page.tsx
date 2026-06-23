'use client';

import { useState } from 'react';

import Header from '@/components/layout/Header';
import ArtisanRecruitmentBanner from '@/components/ui/ArtisanRecruitmentBanner';
import BlogCard from '@/components/ui/BlogCard';
import EmergencyBanner from '@/components/ui/EmergencyBanner';
import FAQAccordion from '@/components/ui/FAQAccordion';
import FloatingCTA from '@/components/ui/FloatingCTA';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/ui/HeroSection';
import HowItWorks from '@/components/ui/HowItWorks';
import MobileNav from '@/components/ui/MobileNav';
import ParticleBackground from '@/components/ui/ParticleBackground';
import QuestionnaireModal from '@/components/ui/QuestionnaireModal';
import ServiceCategoryGrid from '@/components/ui/ServiceCategoryGrid';
import StatsCounter from '@/components/ui/StatsCounter';
import TestimonialCards from '@/components/ui/TestimonialCards';
import TrustBar from '@/components/ui/TrustBar';
import { BLOG_POSTS } from '@/lib/constants';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <ParticleBackground />
      <EmergencyBanner />
      <Header onMenuOpen={() => setMobileNavOpen(true)} />
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <main>
        <HeroSection onCTAClick={() => setModalOpen(true)} />
        <StatsCounter />
        <div id="how-it-works" className="scroll-mt-24">
          <HowItWorks />
        </div>
        <div id="services" className="scroll-mt-24">
          <ServiceCategoryGrid />
        </div>
        <TrustBar />
        <TestimonialCards />
        <ArtisanRecruitmentBanner />
        <section id="blog" className="scroll-mt-24 bg-surface-2 py-24 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
                Le blog
              </span>
              <h2 className="font-display font-black text-4xl tracking-tight text-ink md:text-5xl">
                CONSEILS &amp; GUIDES
              </h2>
              <p className="max-w-2xl text-base text-muted md:text-lg">
                Tout ce qu&apos;il faut savoir avant d&apos;appeler un artisan, pour ne plus jamais
                subir une mauvaise surprise.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
        <div id="faq" className="scroll-mt-24">
          <FAQAccordion />
        </div>
        <Footer />
      </main>
      <FloatingCTA onClick={() => setModalOpen(true)} />
      <QuestionnaireModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
