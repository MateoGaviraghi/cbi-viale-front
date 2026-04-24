'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { api } from '@/lib/api'
import { toast } from '@/components/shared/Toaster'
import { GoldRule } from '@/components/shared/GoldRule'

const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  asunto: z.string().min(3, 'Mínimo 3 caracteres'),
  mensaje: z.string().min(10, 'Mínimo 10 caracteres'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      await api.submissions.create({
        type: 'CONTACT_GENERAL',
        name: data.nombre,
        email: data.email,
        phone: data.telefono || undefined,
        subject: data.asunto,
        message: data.mensaje,
      })
      toast('Mensaje enviado. Te respondemos pronto.', 'success')
      reset()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al enviar el formulario'
      toast(msg, 'error')
    }
  }

  return (
    <div className="border border-line p-8 md:p-10">
      <div className="flex items-center gap-4 mb-8">
        <GoldRule />
        <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
          Formulario de contacto
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Nombre" error={errors.nombre?.message}>
            <input
              {...register('nombre')}
              type="text"
              autoComplete="name"
              placeholder="Tu nombre completo"
              className={inputCls(!!errors.nombre)}
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              className={inputCls(!!errors.email)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Teléfono (opcional)" error={errors.telefono?.message}>
            <input
              {...register('telefono')}
              type="tel"
              autoComplete="tel"
              placeholder="+54 343 …"
              className={inputCls(!!errors.telefono)}
            />
          </Field>

          <Field label="Asunto" error={errors.asunto?.message}>
            <input
              {...register('asunto')}
              type="text"
              placeholder="¿Sobre qué nos escribís?"
              className={inputCls(!!errors.asunto)}
            />
          </Field>
        </div>

        <Field label="Mensaje" error={errors.mensaje?.message}>
          <textarea
            {...register('mensaje')}
            rows={5}
            placeholder="Contanos en qué podemos ayudarte…"
            className={inputCls(!!errors.mensaje)}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group tap-min inline-flex h-14 w-full items-center justify-center gap-3 bg-gold-700 px-8 font-sans text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-gold-800 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Enviando…
            </>
          ) : (
            'Enviar mensaje'
          )}
        </button>
      </form>
    </div>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full border bg-white px-4 py-3 font-sans text-base text-ink placeholder:text-ink-muted/60',
    'focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-0',
    'transition-colors duration-200',
    'min-h-[44px]', // iOS no-zoom requires font-size ≥ 16px (set via Tailwind base)
    hasError ? 'border-red-400' : 'border-line',
  ].join(' ')
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-ink-muted mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
