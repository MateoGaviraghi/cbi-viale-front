'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowLeft } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { toast } from '@/components/shared/Toaster'

interface Props {
  serviceSlug: string
  date: string  // YYYY-MM-DD
  time: string  // HH:MM
  requiresConsent: boolean
  serviceName: string
}

function buildSchema(requiresConsent: boolean) {
  return z.object({
    patientName: z.string().min(2, 'Mínimo 2 caracteres'),
    patientDni: z
      .string()
      .regex(/^\d{7,8}$/, 'DNI inválido — 7 u 8 dígitos'),
    patientEmail: z.string().email('Email inválido'),
    patientPhone: z
      .string()
      .regex(/^\+?\d{8,15}$/, 'Teléfono inválido — 8 a 15 dígitos'),
    notes: z.string().max(500).optional(),
    consentGiven: requiresConsent
      ? z.literal(true, { errorMap: () => ({ message: 'Debés aceptar el consentimiento informado' }) })
      : z.boolean().optional(),
  })
}

type FormData = z.infer<ReturnType<typeof buildSchema>>

/** Convierte YYYY-MM-DD + HH:MM a ISO 8601 con offset Argentina (-03:00). */
function toArgISO(date: string, time: string): string {
  return `${date}T${time}:00.000-03:00`
}

export function PatientForm({ serviceSlug, date, time, requiresConsent, serviceName }: Props) {
  const router = useRouter()
  const schema = buildSchema(requiresConsent)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      const { data: appointment } = await api.appointments.create({
        serviceSlug,
        date: toArgISO(date, time),
        patientName: data.patientName,
        patientDni: data.patientDni,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        notes: data.notes || undefined,
        consentGiven: requiresConsent ? true : undefined,
      })

      // Store confirmation data for step 5
      sessionStorage.setItem(
        'turnos_confirmation',
        JSON.stringify({
          appointmentId: appointment.id,
          serviceName,
          date,
          time,
          patientName: data.patientName,
          patientEmail: data.patientEmail,
        }),
      )

      // Replace history so the form can't be re-submitted via browser back
      router.replace('/turnos/confirmacion')
    } catch (err) {
      if (err instanceof ApiError && (err.statusCode === 409 || err.statusCode === 422)) {
        toast('Ese horario ya no está disponible. Elegí otro.', 'error')
        router.push(`/turnos/${serviceSlug}/horario?date=${date}`)
        return
      }
      const msg = err instanceof Error ? err.message : 'Error al crear el turno'
      toast(msg, 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-6">
      <Field label="Nombre completo *" error={errors.patientName?.message}>
        <input
          {...register('patientName')}
          type="text"
          autoComplete="name"
          placeholder="Como figura en el DNI"
          className={inputCls(!!errors.patientName)}
        />
      </Field>

      <Field label="DNI *" error={errors.patientDni?.message}>
        <input
          {...register('patientDni')}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="12345678"
          className={inputCls(!!errors.patientDni)}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Email *" error={errors.patientEmail?.message}>
          <input
            {...register('patientEmail')}
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            className={inputCls(!!errors.patientEmail)}
          />
        </Field>

        <Field label="Teléfono *" error={errors.patientPhone?.message}>
          <input
            {...register('patientPhone')}
            type="tel"
            autoComplete="tel"
            placeholder="+54 343 …"
            className={inputCls(!!errors.patientPhone)}
          />
        </Field>
      </div>

      <Field label="Notas (opcional)" error={errors.notes?.message}>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="¿Algo que debamos saber antes del turno?"
          className={inputCls(!!errors.notes)}
        />
      </Field>

      {requiresConsent && (
        <div className="border border-gold-700/30 bg-gold-50/30 p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register('consentGiven')}
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-gold-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700"
            />
            <span className="text-sm text-ink leading-relaxed">
              Acepto el{' '}
              <a
                href="/consentimiento-informado"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-700 underline underline-offset-2 hover:text-gold-800"
              >
                consentimiento informado
              </a>{' '}
              para el servicio de {serviceName}. Confirmo haber leído y comprendido los términos.
            </span>
          </label>
          {errors.consentGiven && (
            <p className="mt-2 ml-7 text-xs text-red-500">{errors.consentGiven.message as string}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="tap-min inline-flex h-14 w-full items-center justify-center gap-3 bg-gold-700 px-8 font-sans text-sm uppercase tracking-[0.25em] text-white transition-all duration-500 hover:bg-gold-800 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Confirmando turno…
          </>
        ) : (
          'Confirmar turno'
        )}
      </button>

      <div className="border-t border-line pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Volver a elegir horario
        </button>
      </div>
    </form>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full border bg-white px-4 py-3 font-sans text-base text-ink placeholder:text-ink-muted/60',
    'focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-0',
    'transition-colors duration-200 min-h-[44px]',
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
