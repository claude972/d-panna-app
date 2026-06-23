import {
  Calendar,
  Coins,
  Target,
  User,
} from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/ui/Footer';

import ArtisanForm from './ArtisanForm';

const ADVANTAGES = [
  {
    icon: Target,
    title: 'Missions qualifiées',
    description: 'Recevez des chantiers adaptés à votre métier et à votre zone géographique, sans prospection.',
  },
  {
    icon: Calendar,
    title: 'Autonomie planning',
    description: 'Vous acceptez ou refusez chaque mission. Vous travaillez quand vous voulez, où vous voulez.',
  },
  {
    icon: Coins,
    title: 'Paiement sous 48h',
    description: 'Vous êtes réglé sous 48h après chaque chantier validé. Plus de relances, plus de retards.',
  },
];

const STATS = [
  { value: '15 000+', label: 'demandes / mois' },
  { value: '0 €', label: "d'abonnement" },
  { value: '48h', label: 'délai de paiement' },
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
      <main className="min-h-screen bg-white">
        {/* Hero — plein bg-ink, 2 colonnes */}
        <section className="bg-ink px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Col gauche */}
            <div className="flex flex-col gap-6">
              <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-yellow">
                Devenir partenaire
              </span>
              <h1 className="font-display font-black text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                DÉVELOPPEZ VOTRE ACTIVITÉ AVEC D-PANNA
              </h1>
              <p className="text-base text-[#aeb7dd] md:text-lg max-w-md">
                Plus de missions qualifiées, plus d&apos;autonomie, paiements rapides. Rejoignez le
                réseau n°1 du dépannage à domicile en France.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#inscription"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow px-8 py-4 font-display font-extrabold text-base text-ink transition-opacity hover:opacity-90"
                >
                  Rejoindre le réseau
                </a>
              </div>
            </div>
            {/* Col droite — emplacement image */}
            <div
              className="flex aspect-square max-w-sm w-full items-center justify-center rounded-2xl bg-ink-soft mx-auto lg:mx-0"
              aria-label="Illustration artisan partenaire"
            >
              <User className="h-24 w-24 text-blue opacity-60" />
            </div>
          </div>
        </section>

        {/* Bande 3 chiffres clés */}
        <section className="border-b border-line px-6 py-12">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="font-display font-black text-4xl text-blue md:text-5xl">
                  {s.value}
                </span>
                <span className="text-sm text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi nous rejoindre — bg-surface-2 */}
        <section className="bg-surface-2 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
                Vos avantages
              </span>
              <h2 className="font-display font-black text-3xl text-ink md:text-4xl">
                POURQUOI NOUS REJOINDRE
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {ADVANTAGES.map((adv) => {
                const Icon = adv.icon;
                return (
                  <div key={adv.title} className="card-bold flex flex-col gap-4 p-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-tint">
                      <Icon className="h-6 w-6 text-blue" />
                    </span>
                    <h3 className="font-display font-extrabold text-lg text-ink">{adv.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{adv.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Formulaire candidature */}
        <section id="inscription" className="px-6 py-20">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 flex flex-col items-center gap-3 text-center">
              <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
                Candidature
              </span>
              <h2 className="font-display font-black text-3xl text-ink md:text-4xl">
                REJOIGNEZ LE RÉSEAU
              </h2>
              <p className="text-base text-muted">
                Remplissez le formulaire, on vous recontacte sous 24h pour finaliser votre inscription.
              </p>
            </div>
            <div className="card-bold p-8">
              <ArtisanForm />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
