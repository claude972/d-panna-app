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
    'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white/90 placeholder:text-stone-500 outline-none transition-all duration-300 focus:border-emerald-400/60 focus:bg-white/8';
  const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-widest text-stone-400';
  const errorClass = 'mt-1 text-xs text-red-400';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 p-8">
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
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-stone-950 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-400 disabled:opacity-60"
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
