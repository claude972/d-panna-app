'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CalendarDays,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Siren,
  Wrench,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Step, Urgency } from '@/types/lead';

interface QuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

const URGENCIES: { value: Urgency; label: string; icon: typeof Siren; hint: string }[] = [
  { value: 'immediate', label: 'Immédiat', icon: Siren, hint: 'Sous 1h' },
  { value: 'today', label: "Aujourd'hui", icon: Clock, hint: 'Dans la journée' },
  { value: 'this_week', label: 'Cette semaine', icon: CalendarDays, hint: 'Sous 7 jours' },
  { value: 'planned', label: 'Planifié', icon: CalendarClock, hint: 'À planifier' },
];

const phoneRegex = /^(?:(?:\+|00)33[\s.-]?(?:\(0\)[\s.-]?)?|0)[1-9](?:[\s.-]?\d{2}){4}$/;
const postalRegex = /^\d{5}$/;

const leadSchema = z.object({
  category: z.string().min(1),
  subcategory: z.string().min(1, 'Choisis une sous-catégorie'),
  urgency: z.enum(['immediate', 'today', 'this_week', 'planned']),
  address: z.string().min(3, 'Adresse trop courte'),
  city: z.string().min(2, 'Ville requise'),
  postalCode: z.string().regex(postalRegex, 'Code postal invalide (5 chiffres)'),
  phone: z.string().regex(phoneRegex, 'Numéro français invalide'),
  email: z.string().email('Email invalide'),
  description: z.string(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

const STEP_ORDER: Step[] = ['category', 'subcategory', 'location', 'contact', 'confirmation'];

const slideVariants = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

const labelClass = 'text-xs uppercase tracking-widest text-orange-400';
const inputClass =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white/90 placeholder:text-stone-500 outline-none transition focus:border-orange-400/60 focus:bg-white/10';

export default function QuestionnaireModal({
  isOpen,
  onClose,
  defaultCategory,
}: QuestionnaireModalProps) {
  const [step, setStep] = useState<Step>('category');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    setValue,
    watch,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    mode: 'onChange',
    defaultValues: {
      category: defaultCategory ?? '',
      subcategory: '',
      urgency: 'today',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      email: '',
      description: '',
    },
  });

  const values = watch();
  const selectedCategory = useMemo(
    () => CATEGORIES.find((c) => c.slug === values.category),
    [values.category],
  );

  // Sync default category when prop changes / modal opens
  useEffect(() => {
    if (!isOpen) return;
    if (defaultCategory) {
      setValue('category', defaultCategory, { shouldValidate: true });
      setStep('subcategory');
    } else {
      setStep('category');
    }
  }, [isOpen, defaultCategory, setValue]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const currentStepIndex = STEP_ORDER.indexOf(step);
  const progressIndex = step === 'confirmation' ? STEP_ORDER.length - 1 : currentStepIndex;

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => {
      reset();
      setStep('category');
    }, 350);
  };

  const goPrev = () => {
    const order: Step[] = ['category', 'subcategory', 'location', 'contact'];
    const idx = order.indexOf(step);
    if (idx > 0) setStep(order[idx - 1]);
  };

  const goNext = async () => {
    if (step === 'category') {
      const ok = await trigger('category');
      if (ok) setStep('subcategory');
      return;
    }
    if (step === 'subcategory') {
      const ok = await trigger(['subcategory', 'urgency']);
      if (ok) setStep('location');
      else toast.error('Choisis une sous-catégorie');
      return;
    }
    if (step === 'location') {
      const ok = await trigger(['address', 'city', 'postalCode']);
      if (ok) setStep('contact');
      return;
    }
  };

  const onFinalSubmit = handleSubmit(async () => {
    setSubmitting(true);
    toast.loading('Envoi de ta demande…', { id: 'lead' });
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Demande envoyée !', { id: 'lead' });
    setSubmitting(false);
    setStep('confirmation');
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="questionnaire-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-stone-950/95 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer"
            className="fixed right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-xl transition hover:border-orange-400/40 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-20">
            {/* Progress */}
            <div className="mb-12 flex items-center gap-2">
              {STEP_ORDER.map((s, i) => {
                const completed = i <= progressIndex;
                return (
                  <div
                    key={s}
                    className={cn(
                      'h-1.5 flex-1 overflow-hidden rounded-full bg-white/10 transition',
                    )}
                  >
                    <motion.div
                      initial={false}
                      animate={{ width: completed ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={cn(
                        'h-full',
                        completed ? 'gradient-orange-amber glow-orange' : 'bg-transparent',
                      )}
                    />
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {step === 'category' && (
                  <StepCategory
                    selectedSlug={values.category}
                    onPick={(slug) => {
                      setValue('category', slug, { shouldValidate: true });
                      setValue('subcategory', '', { shouldValidate: false });
                      setStep('subcategory');
                    }}
                  />
                )}

                {step === 'subcategory' && (
                  <StepSubcategory
                    categoryLabel={selectedCategory?.label ?? ''}
                    subcategories={selectedCategory?.subcategories ?? []}
                    selectedSub={values.subcategory}
                    selectedUrgency={values.urgency}
                    onPickSub={(sub) =>
                      setValue('subcategory', sub, { shouldValidate: true })
                    }
                    onPickUrgency={(u) =>
                      setValue('urgency', u, { shouldValidate: true })
                    }
                    errorSub={errors.subcategory?.message}
                  />
                )}

                {step === 'location' && (
                  <StepLocation register={register} errors={errors} />
                )}

                {step === 'contact' && (
                  <StepContact register={register} errors={errors} />
                )}

                {step === 'confirmation' && (
                  <StepConfirmation values={values} onClose={handleClose} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer navigation */}
            {step !== 'confirmation' && (
              <div className="mt-12 flex items-center justify-between gap-4">
                {step !== 'category' ? (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Précédent
                  </button>
                ) : (
                  <span />
                )}

                {step === 'contact' ? (
                  <button
                    type="button"
                    onClick={onFinalSubmit}
                    disabled={submitting}
                    className="gradient-orange-amber glow-orange inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-stone-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Envoi…' : 'Envoyer ma demande'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={
                      (step === 'category' && !values.category) ||
                      (step === 'subcategory' && !values.subcategory)
                    }
                    className="gradient-orange-amber glow-orange inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-stone-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Suivant
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- Sub-components ---------------- */

function StepCategory({
  selectedSlug,
  onPick,
}: {
  selectedSlug: string;
  onPick: (slug: string) => void;
}) {
  return (
    <div>
      <p className={labelClass}>Étape 1 / 4</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
        Quel est ton <span className="text-gradient">besoin</span> ?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-stone-300 md:text-lg">
        Choisis la catégorie qui correspond à ton problème.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const isActive = cat.slug === selectedSlug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onPick(cat.slug)}
              className={cn(
                'glass-card group flex flex-col items-start gap-3 p-5 text-left transition hover:border-orange-400/40 hover:bg-white/[0.08]',
                isActive && 'border-orange-400/60 bg-white/[0.08] glow-orange',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-400 transition group-hover:border-orange-400/40',
                  isActive && 'border-orange-400/60',
                )}
              >
                <CategoryIcon name={cat.icon} />
              </span>
              <span className="text-sm font-semibold text-white/90">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepSubcategory({
  categoryLabel,
  subcategories,
  selectedSub,
  selectedUrgency,
  onPickSub,
  onPickUrgency,
  errorSub,
}: {
  categoryLabel: string;
  subcategories: string[];
  selectedSub: string;
  selectedUrgency: Urgency;
  onPickSub: (s: string) => void;
  onPickUrgency: (u: Urgency) => void;
  errorSub?: string;
}) {
  return (
    <div>
      <p className={labelClass}>Étape 2 / 4 — {categoryLabel}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
        Précise ton <span className="text-gradient">intervention</span>
      </h2>

      <div className="mt-10">
        <p className={labelClass}>Sous-catégorie</p>
        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2">
          {subcategories.length === 0 && (
            <p className="text-sm text-stone-500">Aucune sous-catégorie disponible.</p>
          )}
          {subcategories.map((sub) => {
            const isActive = sub === selectedSub;
            return (
              <button
                key={sub}
                type="button"
                onClick={() => onPickSub(sub)}
                className={cn(
                  'flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-white/90 transition hover:border-orange-400/40 hover:bg-white/[0.08]',
                  isActive && 'border-orange-400/60 bg-white/[0.08]',
                )}
              >
                <span>{sub}</span>
                {isActive && <CheckCircle className="h-4 w-4 text-orange-400" />}
              </button>
            );
          })}
        </div>
        {errorSub && <p className="mt-3 text-xs text-red-400">{errorSub}</p>}
      </div>

      <div className="mt-10">
        <p className={labelClass}>Quand intervenir ?</p>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {URGENCIES.map((u) => {
            const Icon = u.icon;
            const isActive = u.value === selectedUrgency;
            return (
              <button
                key={u.value}
                type="button"
                onClick={() => onPickUrgency(u.value)}
                className={cn(
                  'glass-card flex flex-col items-start gap-2 p-4 text-left transition hover:border-orange-400/40',
                  isActive && 'border-orange-400/60 bg-white/[0.08] glow-orange',
                )}
              >
                <Icon className="h-5 w-5 text-orange-400" />
                <span className="text-sm font-semibold text-white/90">{u.label}</span>
                <span className="text-xs text-stone-500">{u.hint}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type LocationFields = Pick<LeadFormValues, 'address' | 'city' | 'postalCode'>;
type ContactFields = Pick<LeadFormValues, 'phone' | 'email' | 'description'>;

function StepLocation({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<LeadFormValues>>['register'];
  errors: ReturnType<typeof useForm<LeadFormValues>>['formState']['errors'];
}) {
  return (
    <div>
      <p className={labelClass}>Étape 3 / 4</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
        Où intervenir ?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-stone-300 md:text-lg">
        L&apos;adresse exacte du chantier.
      </p>

      <div className="mt-10 space-y-5">
        <div>
          <label htmlFor="address" className={labelClass}>
            Adresse
          </label>
          <div className="relative mt-3">
            <MapPin className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
            <input
              id="address"
              type="text"
              placeholder="12 rue de la République"
              className={cn(inputClass, 'pl-12')}
              {...register('address')}
            />
          </div>
          {errors.address && (
            <p className="mt-2 text-xs text-red-400">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_180px]">
          <div>
            <label htmlFor="city" className={labelClass}>
              Ville
            </label>
            <input
              id="city"
              type="text"
              placeholder="Paris"
              className={cn(inputClass, 'mt-3')}
              {...register('city')}
            />
            {errors.city && (
              <p className="mt-2 text-xs text-red-400">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="postalCode" className={labelClass}>
              Code postal
            </label>
            <input
              id="postalCode"
              type="text"
              inputMode="numeric"
              maxLength={5}
              placeholder="75011"
              className={cn(inputClass, 'mt-3')}
              {...register('postalCode')}
            />
            {errors.postalCode && (
              <p className="mt-2 text-xs text-red-400">{errors.postalCode.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepContact({
  register,
  errors,
}: {
  register: ReturnType<typeof useForm<LeadFormValues>>['register'];
  errors: ReturnType<typeof useForm<LeadFormValues>>['formState']['errors'];
}) {
  return (
    <div>
      <p className={labelClass}>Étape 4 / 4</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
        Comment te <span className="text-gradient">rappeler</span> ?
      </h2>
      <p className="mt-3 text-base leading-relaxed text-stone-300 md:text-lg">
        Un artisan certifié te rappelle dans les minutes qui suivent.
      </p>

      <div className="mt-10 space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Téléphone
            </label>
            <div className="relative mt-3">
              <Phone className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
              <input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                className={cn(inputClass, 'pl-12')}
                {...register('phone')}
              />
            </div>
            {errors.phone && (
              <p className="mt-2 text-xs text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <div className="relative mt-3">
              <Mail className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
              <input
                id="email"
                type="email"
                placeholder="ton@email.fr"
                className={cn(inputClass, 'pl-12')}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Décris ton problème (optionnel)
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Quelques mots sur la panne, les contraintes d'accès, etc."
            className={cn(inputClass, 'mt-3 resize-none')}
            {...register('description')}
          />
        </div>
      </div>
    </div>
  );
}

function StepConfirmation({
  values,
  onClose,
}: {
  values: LeadFormValues;
  onClose: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.slug === values.category);
  const urgency = URGENCIES.find((u) => u.value === values.urgency);

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10"
      >
        <CheckCircle className="h-16 w-16 text-emerald-400" strokeWidth={1.5} />
      </motion.div>

      <h2 className="mt-8 text-3xl font-bold tracking-tight text-white/90 md:text-5xl">
        Demande envoyée !
      </h2>
      <p className="mt-3 max-w-md text-base leading-relaxed text-stone-300 md:text-lg">
        Un artisan D-Panna certifié va te recontacter dans les plus brefs délais.
      </p>

      <div className="glass-card mt-10 w-full max-w-md p-6 text-left">
        <p className={labelClass}>Récapitulatif</p>
        <dl className="mt-4 space-y-3 text-sm">
          <RecapRow label="Catégorie" value={cat?.label ?? values.category} />
          <RecapRow label="Intervention" value={values.subcategory} />
          <RecapRow label="Urgence" value={urgency?.label ?? values.urgency} />
          <RecapRow
            label="Adresse"
            value={`${values.address}, ${values.postalCode} ${values.city}`}
          />
          <RecapRow label="Téléphone" value={values.phone} />
          <RecapRow label="Email" value={values.email} />
        </dl>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white/90 transition hover:border-white/30"
      >
        Fermer
      </button>
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <dt className="text-xs uppercase tracking-widest text-stone-500">{label}</dt>
      <dd className="text-right text-sm text-white/90">{value}</dd>
    </div>
  );
}

/* Résout l'icône lucide depuis le nom stocké dans CATEGORIES (fallback: Wrench) */
function CategoryIcon({ name }: { name: string }) {
  const Lib = Icons as unknown as Record<string, LucideIcon>;
  const Icon = Lib[name] ?? Wrench;
  return <Icon className="h-5 w-5" aria-hidden />;
}

// Helper to keep TS aware of helper types used internally
export type { LocationFields, ContactFields };
