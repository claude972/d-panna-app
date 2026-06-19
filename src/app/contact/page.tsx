import { Mail, MapPin, Phone } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/ui/Footer';
import { PHONE_URGENCY } from '@/lib/constants';

import ContactForm from './ContactForm';

const phoneHref = `tel:${PHONE_URGENCY.replace(/\s+/g, '')}`;

const CONTACT_INFOS = [
  {
    icon: Phone,
    label: 'Téléphone urgence',
    value: PHONE_URGENCY,
    href: phoneHref,
    helper: '7j/7 — 8h30 à 19h30',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@d-panna.fr',
    href: 'mailto:contact@d-panna.fr',
    helper: 'Réponse sous 24h ouvrées',
  },
  {
    icon: MapPin,
    label: 'Adresse',
    value: '12 rue de la Paix, 75002 Paris',
    href: 'https://maps.google.com/?q=12+rue+de+la+Paix+Paris',
    helper: 'Siège social',
  },
];

export const metadata = {
  title: 'Contact — D-Panna',
  description:
    "Une question, un projet, une urgence ? Notre équipe vous répond 7j/7.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-950 pt-20">
        {/* Hero court */}
        <section className="relative overflow-hidden px-6 py-20 md:py-28">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
            <span className="glass-card inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-widest text-orange-400">
              Contact
            </span>
            <h1 className="text-5xl font-black tracking-tight text-white/90 md:text-7xl">
              On vous{' '}
              <span className="text-gradient">écoute</span>
            </h1>
          </div>
        </section>

        {/* 2 cols */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Col gauche */}
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl font-black tracking-tight text-white/90 md:text-5xl">
                Parlons de votre projet
              </h2>
              <p className="text-base text-stone-400 md:text-lg">
                Que ce soit pour une urgence, un devis ou simplement une question, notre équipe
                vous répond rapidement.
              </p>
              <div className="flex flex-col gap-4">
                {CONTACT_INFOS.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.label === 'Adresse' ? '_blank' : undefined}
                      rel={info.label === 'Adresse' ? 'noopener noreferrer' : undefined}
                      className="glass-card group flex items-center gap-5 p-5 transition-all duration-300 hover:border-orange-500/40"
                    >
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400 group-hover:bg-orange-500/25">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
                          {info.label}
                        </span>
                        <span className="text-base font-semibold text-white/90">{info.value}</span>
                        <span className="text-xs text-stone-500">{info.helper}</span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Fake map */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-stone-800"
                aria-label="Carte de localisation"
              >
                {/* Grille fake */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Point central */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex h-6 w-6 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-60" />
                    <span className="relative inline-flex h-6 w-6 rounded-full bg-orange-500 ring-4 ring-orange-500/30" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 glass-card px-3 py-2 text-xs uppercase tracking-widest text-orange-400">
                  Paris — 75002
                </div>
              </div>
            </div>

            {/* Col droite : formulaire */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
