'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowRight, Loader2 } from 'lucide-react';

const phoneRegex = /^(?:(?:\+|00)33[\s.-]?(?:\(0\)[\s.-]?)?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

const artisanSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  job: z.string().min(2, 'Métier requis'),
  city: z.string().min(2, 'Ville requise'),
  phone: z.string().regex(phoneRegex, 'Numéro français invalide'),
  email: z.email('Email invalide'),
  message: z.string().min(10, 'Message trop court (10 caractères min)'),
});

type ArtisanFormValues = z.infer<typeof artisanSchema>;

export default function ArtisanForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArtisanFormValues>({
    resolver: zodResolver(artisanSchema),
  });

  const onSubmit = async (data: ArtisanFormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Merci ${data.name}, on vous recontacte sous 24h.`);
    reset();
  };

  const inputClass =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20';
  const labelClass =
    'mb-2 block font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted';
  const errorClass = 'mt-1 text-xs text-coral';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Nom complet
          </label>
          <input id="name" {...register('name')} className={inputClass} placeholder="Jean Dupont" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="job">
            Métier
          </label>
          <input
            id="job"
            {...register('job')}
            className={inputClass}
            placeholder="Plombier, électricien..."
          />
          {errors.job && <p className={errorClass}>{errors.job.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="city">
            Ville
          </label>
          <input id="city" {...register('city')} className={inputClass} placeholder="Paris" />
          {errors.city && <p className={errorClass}>{errors.city.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Téléphone
          </label>
          <input
            id="phone"
            {...register('phone')}
            className={inputClass}
            placeholder="06 12 34 56 78"
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={inputClass}
          placeholder="jean@artisan.fr"
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="message">
          Votre message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={`${inputClass} resize-none`}
          placeholder="Parlez-nous de votre expérience..."
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow px-8 py-4 text-base font-display font-extrabold text-ink transition hover:brightness-95 disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <span>Rejoindre le réseau</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
