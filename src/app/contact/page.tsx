import { Mail, MapPin, Phone } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/ui/Footer';
import { PHONE_URGENCY } from '@/lib/constants';

import ContactForm from './ContactForm';

const phoneHref = `tel:${PHONE_URGENCY.replace(/\s+/g, '')}`;

export const metadata = {
  title: 'Contact — D-Panna',
  description:
    "Une question, un projet, une urgence ? Notre équipe vous répond 7j/7.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* En-tête centré */}
        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <span className="font-display font-extrabold text-[11px] uppercase tracking-[0.14em] text-blue">
              Contact
            </span>
            <h1 className="font-display font-black text-4xl text-ink md:text-5xl lg:text-6xl">
              UNE QUESTION&nbsp;? ÉCRIVEZ-NOUS
            </h1>
            <p className="text-base text-muted md:text-lg max-w-xl">
              Notre équipe vous répond 7j/7. Pour toute urgence, appelez directement le{' '}
              <a href={phoneHref} className="font-semibold text-blue hover:underline">
                {PHONE_URGENCY}
              </a>
              .
            </p>
          </div>
        </section>

        {/* 2 colonnes */}
        <section className="px-6 pb-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Col gauche — formulaire */}
            <div className="card-bold p-8">
              <ContactForm />
            </div>

            {/* Col droite — infos contact */}
            <div className="flex flex-col gap-6">
              {/* Carte téléphone — bg-ink */}
              <a
                href={phoneHref}
                className="flex items-center gap-5 rounded-2xl bg-ink p-6 transition-opacity hover:opacity-90"
                aria-label={`Appeler D-Panna au ${PHONE_URGENCY}`}
              >
                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-5 w-5 text-yellow" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#aeb7dd]">
                    Téléphone urgence
                  </span>
                  <span className="text-base font-semibold text-white">{PHONE_URGENCY}</span>
                  <span className="text-xs text-[#aeb7dd]">7j/7 — 8h30 à 19h30</span>
                </div>
              </a>

              {/* Carte email — card-bold */}
              <a
                href="mailto:contact@d-panna.fr"
                className="card-bold flex items-center gap-5 p-6 transition-colors hover:border-blue"
              >
                <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-tint">
                  <Mail className="h-5 w-5 text-blue" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted">
                    Email
                  </span>
                  <span className="text-base font-semibold text-ink">contact@d-panna.fr</span>
                  <span className="text-xs text-muted">Réponse sous 24h ouvrées</span>
                </div>
              </a>

              {/* Emplacement carte / map */}
              <div
                className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-blue-tint"
                aria-label="Localisation — Paris 75002"
              >
                <MapPin className="h-10 w-10 text-blue" />
                <div className="flex flex-col items-center gap-0.5 text-center">
                  <span className="font-display font-extrabold text-sm text-ink">
                    12 rue de la Paix
                  </span>
                  <span className="text-xs text-muted">75002 Paris — Siège social</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
