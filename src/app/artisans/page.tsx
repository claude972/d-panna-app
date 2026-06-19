import {
  Calendar,
  CheckCircle2,
  Headphones,
  Quote,
  Star,
  TrendingUp,
  UserPlus,
  Wallet,
  Wrench,
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/ui/Footer';

import ArtisanForm from './ArtisanForm';

const ADVANTAGES = [
  {
    icon: TrendingUp,
    title: 'CA en hausse',
    description: '+ 35 % de chiffre d&apos;affaires moyen la première année grâce à un flux régulier de chantiers.',
  },
  {
    icon: Calendar,
    title: 'Autonomie planning',
    description: 'Vous acceptez ou refusez chaque mission. Vous travaillez quand vous voulez, où vous voulez.',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    description: 'Une équipe dédiée vous accompagne en cas de litige client, de pièce manquante ou de question technique.',
  },
  {
    icon: Wallet,
    title: 'Paiement rapide',
    description: 'Vous êtes réglé sous 48h après chaque chantier validé. Plus de relances, plus de retards.',
  },
];

const STEPS = [
  {
    num: '01',
    icon: UserPlus,
    title: 'Inscription',
    description: 'Remplissez le formulaire en 5 minutes : métier, ville, qualifications.',
  },
  {
    num: '02',
    icon: CheckCircle2,
    title: 'Vérification',
    description: 'Notre équipe contrôle vos documents (Kbis, assurance décennale, qualifications).',
  },
  {
    num: '03',
    icon: Wrench,
    title: 'Premier chantier',
    description: 'Vous recevez votre première mission sous 7 jours en moyenne.',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Croissance',
    description: 'Plus vous interviewez bien, plus vous montez dans le classement et recevez de missions.',
  },
];

const ARTISAN_TESTIMONIALS = [
  {
    name: 'Marc Dubois',
    job: 'Plombier — Paris',
    rating: 5,
    text: "En 18 mois, j'ai doublé mon CA. Le support D-Panna est à l'écoute, les paiements arrivent à temps. Je recommande.",
  },
  {
    name: 'Sofia Hernandez',
    job: 'Électricienne — Lyon',
    rating: 5,
    text: "Je gère mon planning comme je veux. Plus besoin de chercher des clients : ils viennent à moi via la plateforme.",
  },
  {
    name: 'Antoine Roy',
    job: 'Serrurier — Bordeaux',
    rating: 5,
    text: "Excellente plateforme pour les urgences nocturnes. Les missions sont bien qualifiées et les clients respectueux.",
  },
];

export const metadata = {
  title: 'Devenir artisan partenaire D-Panna',
  description:
    'Rejoignez 15 000+ artisans et développez votre activité avec un flux régulier de missions qualifiées.',
};

export default function ArtisansPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-950 pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(52,211,153,0.4) 0%, rgba(16,185,129,0.15) 40%, transparent 70%)',
            }}
          />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
            <span className="glass-card inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-widest text-emerald-400">
              Devenez partenaire
            </span>
            <h1 className="text-5xl font-black tracking-tight text-white/90 md:text-7xl">
              Rejoignez{' '}
              <span className="bg-gradient-to-br from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
                15 000+ artisans
              </span>
            </h1>
            <p className="max-w-2xl text-base text-stone-400 md:text-xl">
              Plus de missions qualifiées, plus d&apos;autonomie, paiements rapides. Développez votre
              activité avec le réseau n°1 du dépannage à domicile.
            </p>
            <a
              href="#inscription"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-5 text-base font-semibold text-stone-950 transition-transform duration-300 hover:scale-[1.03]"
              style={{ boxShadow: '0 0 40px rgba(52,211,153,0.35)' }}
            >
              Devenir partenaire
            </a>
          </div>
        </section>

        {/* Avantages */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Vos avantages
              </span>
              <h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
                Pourquoi nous rejoindre
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {ADVANTAGES.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div
                    key={adv.title}
                    className="glass-card flex flex-col gap-4 p-6 transition-all duration-300 hover:border-emerald-400/40"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-white/90">{adv.title}</h3>
                    <p
                      className="text-sm text-stone-400 leading-relaxed"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={{ __html: adv.description }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Processus timeline */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Le processus
              </span>
              <h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
                4 étapes pour démarrer
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="glass-card relative flex flex-col gap-4 p-6 transition-all duration-300 hover:border-emerald-400/40"
                  >
                    <span className="absolute right-4 top-4 text-4xl font-black text-emerald-500/20">
                      {step.num}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-xl font-bold text-white/90">{step.title}</h3>
                    <p className="text-sm text-stone-400 leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Témoignages artisans */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Ils nous ont rejoint
              </span>
              <h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
                Témoignages d&apos;artisans
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {ARTISAN_TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="glass-card flex flex-col gap-4 p-6 transition-all duration-300 hover:border-emerald-400/40"
                >
                  <Quote className="h-8 w-8 text-emerald-400/50" />
                  <p className="text-base text-stone-300 leading-relaxed">&laquo; {t.text} &raquo;</p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <p className="font-bold text-white/90">{t.name}</p>
                      <p className="text-xs uppercase tracking-widest text-stone-500">{t.job}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulaire inscription */}
        <section id="inscription" className="px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 flex flex-col items-center gap-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Inscription
              </span>
              <h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
                Rejoignez le réseau
              </h2>
              <p className="text-base text-stone-400">
                Remplissez le formulaire, on vous recontacte sous 24h pour finaliser votre inscription.
              </p>
            </div>
            <ArtisanForm />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
