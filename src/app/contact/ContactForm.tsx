'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ArrowRight, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.email('Email invalide'),
  subject: z.enum(['general', 'urgence', 'devis', 'partenariat', 'autre']),
  message: z.string().min(10, 'Message trop court (10 caractères min)'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: 'general' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Merci ${data.name}, on revient vers vous sous 24h.`);
    reset({ subject: 'general' });
  };

  const inputClass =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-muted outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20';
  const labelClass =
    'mb-2 block font-display text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted';
  const errorClass = 'mt-1 text-xs text-coral';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="contact-name">
          Nom
        </label>
        <input
          id="contact-name"
          {...register('name')}
          className={inputClass}
          placeholder="Jean Dupont"
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          {...register('email')}
          className={inputClass}
          placeholder="vous@email.fr"
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-subject">
          Sujet
        </label>
        <select id="contact-subject" {...register('subject')} className={inputClass}>
          <option value="general">Question générale</option>
          <option value="urgence">Urgence en cours</option>
          <option value="devis">Demande de devis</option>
          <option value="partenariat">Partenariat / Presse</option>
          <option value="autre">Autre</option>
        </select>
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          {...register('message')}
          className={`${inputClass} resize-none`}
          placeholder="Dites-nous tout..."
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
            <span>Envoyer le message</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
