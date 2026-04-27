'use client'

import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowLeft, Info } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { toast } from '@/components/shared/Toaster'
import { GoldRule } from '@/components/shared/GoldRule'
import { cn } from '@/lib/utils'
import {
  SERVICE_FORM_CONFIGS,
  buildExtraSchema,
  type ExtraFieldConfig,
} from '@/lib/service-forms'

interface Props {
  serviceSlug: string
  date: string   // YYYY-MM-DD
  time: string   // HH:MM
  requiresConsent: boolean
  serviceName: string
}

function buildFullSchema(serviceSlug: string, requiresConsent: boolean) {
  const baseSchema = z.object({
    patientName: z.string().min(2, 'Mínimo 2 caracteres'),
    patientDni: z.string().regex(/^\d{7,8}$/, 'DNI inválido — 7 u 8 dígitos'),
    patientEmail: z.string().email('Email inválido'),
    patientPhone: z.string().regex(/^\+?\d{8,15}$/, 'Teléfono inválido — 8 a 15 dígitos'),
    notes: z.string().max(500).optional(),
    consentGiven: requiresConsent
      ? z.literal(true, {
          errorMap: () => ({ message: 'Debés aceptar el consentimiento informado' }),
        })
      : z.boolean().optional(),
  })

  const extraSchema = buildExtraSchema(serviceSlug)
  // merge only works on ZodObject; extraSchema may be ZodEffects (when superRefine is used).
  // We intersect them and cast to allow zodResolver to accept it.
  return z.intersection(baseSchema, extraSchema) as unknown as z.ZodType<Record<string, unknown>>
}

function toArgISO(date: string, time: string): string {
  return `${date}T${time}:00.000-03:00`
}

// ---------------------------------------------------------------------------
//  Componente principal
// ---------------------------------------------------------------------------

export function PatientForm({ serviceSlug, date, time, requiresConsent, serviceName }: Props) {
  const router = useRouter()
  const config = SERVICE_FORM_CONFIGS[serviceSlug]

  const schema = useMemo(
    () => buildFullSchema(serviceSlug, requiresConsent),
    [serviceSlug, requiresConsent],
  )

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  })

  async function onSubmit(data: Record<string, unknown>) {
    try {
      const { data: appointment } = await api.appointments.create({
        serviceSlug,
        date: toArgISO(date, time),
        patientName: data.patientName as string,
        patientDni: data.patientDni as string,
        patientEmail: data.patientEmail as string,
        patientPhone: data.patientPhone as string,
        notes: (data.notes as string) || undefined,
        consentGiven: requiresConsent ? true : undefined,
      })

      // Send extra service-specific fields as a CUSTOM submission
      const extraKeys = config?.extraFields.map((f) => f.key) ?? []
      const extraData: Record<string, unknown> = {}
      for (const key of extraKeys) {
        if (data[key] !== undefined && data[key] !== '' && data[key] !== false) {
          extraData[key] = data[key]
        }
      }
      if (Object.keys(extraData).length > 0) {
        await api.submissions.create({
          type: 'CUSTOM',
          serviceSlug,
          name: data.patientName as string,
          email: data.patientEmail as string,
          message: `Datos adicionales — turno #${appointment.id} · ${date} ${time}`,
          extraData,
        })
      }

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

  const labels = config?.baseLabels ?? {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-6">
      {/* ── Campos base del turno ── */}
      <Field label={labels.patientName ?? 'Nombre completo *'} error={fieldError(errors, 'patientName')}>
        <input
          {...register('patientName')}
          type="text"
          autoComplete="name"
          placeholder="Como figura en el DNI"
          className={inputCls(!!fieldError(errors, 'patientName'))}
        />
      </Field>

      <Field label={labels.patientDni ?? 'DNI *'} error={fieldError(errors, 'patientDni')}>
        <input
          {...register('patientDni')}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="12345678"
          className={inputCls(!!fieldError(errors, 'patientDni'))}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Email *" error={fieldError(errors, 'patientEmail')}>
          <input
            {...register('patientEmail')}
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            className={inputCls(!!fieldError(errors, 'patientEmail'))}
          />
        </Field>

        <Field label="Teléfono *" error={fieldError(errors, 'patientPhone')}>
          <input
            {...register('patientPhone')}
            type="tel"
            autoComplete="tel"
            placeholder="+54 343 …"
            className={inputCls(!!fieldError(errors, 'patientPhone'))}
          />
        </Field>
      </div>

      {/* ── Campos específicos del servicio ── */}
      {config && config.extraFields.length > 0 && (
        <div className="border-t border-line pt-8 space-y-6">
          <div className="flex items-center gap-4">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Datos del servicio
            </span>
          </div>

          {config.note && (
            <div className="flex items-start gap-3 bg-gold-50/40 border border-gold-700/20 p-4 text-sm text-ink-muted">
              <Info size={14} className="text-gold-700 shrink-0 mt-0.5" />
              <span>{config.note}</span>
            </div>
          )}

          <ServiceExtraSection
            fields={config.extraFields}
            register={register}
            watch={watch}
            errors={errors}
          />
        </div>
      )}

      {/* ── Notas libres ── */}
      <Field label="Notas adicionales (opcional)" error={fieldError(errors, 'notes')}>
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="¿Algo más que debamos saber?"
          className={inputCls(!!fieldError(errors, 'notes'))}
        />
      </Field>

      {/* ── Consentimiento ── */}
      {requiresConsent && (
        <div className="border border-gold-700/30 bg-gold-50/30 p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register('consentGiven')}
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-gold-700"
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
              para el servicio de {serviceName}.
            </span>
          </label>
          {fieldError(errors, 'consentGiven') && (
            <p className="mt-2 ml-7 text-xs text-red-500">{fieldError(errors, 'consentGiven')}</p>
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

// ---------------------------------------------------------------------------
//  Sección de campos extra (renderizado por config)
// ---------------------------------------------------------------------------

interface ServiceExtraSectionProps {
  fields: ExtraFieldConfig[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch: any
  errors: Record<string, unknown>
}

function ServiceExtraSection({ fields, register, watch, errors }: ServiceExtraSectionProps) {
  // Group fields by section
  const topLevelFields = fields.filter((f) => !f.section)
  const sectionTriggers = topLevelFields.filter((f) => f.triggersSection)

  // Build section map
  const sectionFields: Map<string, ExtraFieldConfig[]> = new Map()
  for (const f of fields) {
    if (f.section) {
      if (!sectionFields.has(f.section)) sectionFields.set(f.section, [])
      sectionFields.get(f.section)!.push(f)
    }
  }

  return (
    <div className="space-y-5">
      {topLevelFields.map((field) => {
        if (field.type === 'checkbox') {
          const isOpen = !!watch(field.key)
          const sectionKey = field.triggersSection
          const subFields = sectionKey ? (sectionFields.get(sectionKey) ?? []) : []

          return (
            <div key={field.key}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  {...register(field.key)}
                  type="checkbox"
                  className="h-4 w-4 accent-gold-700 shrink-0"
                />
                <span className="text-sm text-ink group-hover:text-gold-700 transition-colors">
                  {field.label}
                </span>
              </label>

              {/* Sub-form section */}
              {isOpen && subFields.length > 0 && (
                <div className="mt-4 ml-7 border-l-2 border-gold-700/30 pl-5 space-y-5">
                  <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                    {sectionKey?.replace(/_/g, ' ')} — datos adicionales
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {subFields.map((sf) => (
                      <div
                        key={sf.key}
                        className={
                          sf.type === 'textarea' ? 'sm:col-span-2' : ''
                        }
                      >
                        <ExtraField
                          field={sf}
                          register={register}
                          errors={errors}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        }

        return (
          <ExtraField key={field.key} field={field} register={register} errors={errors} />
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
//  Campo individual genérico
// ---------------------------------------------------------------------------

function ExtraField({
  field,
  register,
  errors,
}: {
  field: ExtraFieldConfig
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  errors: Record<string, unknown>
}) {
  const err = fieldError(errors, field.key)

  return (
    <div>
      <label className="block text-[11px] uppercase tracking-widest text-ink-muted mb-2">
        {field.label}
      </label>

      {field.type === 'textarea' ? (
        <textarea
          {...register(field.key)}
          rows={3}
          placeholder={field.placeholder}
          className={inputCls(!!err)}
        />
      ) : field.type === 'select' && field.options ? (
        <select {...register(field.key)} className={inputCls(!!err)}>
          <option value="">— Elegir —</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...register(field.key)}
          type={field.type === 'number' ? 'text' : field.type}
          inputMode={field.type === 'number' ? 'numeric' : undefined}
          placeholder={field.placeholder}
          className={inputCls(!!err)}
        />
      )}

      {field.helperText && !err && (
        <p className="mt-1.5 text-xs text-ink-muted/70">{field.helperText}</p>
      )}
      {err && <p className="mt-1.5 text-xs text-red-500">{err}</p>}
    </div>
  )
}

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

function fieldError(errors: Record<string, unknown>, key: string): string | undefined {
  const e = errors[key]
  if (!e) return undefined
  if (typeof e === 'object' && e !== null && 'message' in e) {
    return (e as { message?: string }).message
  }
  return undefined
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full border bg-white px-4 py-3 font-sans text-base text-ink placeholder:text-ink-muted/60',
    'focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-0',
    'transition-colors duration-200 min-h-[44px]',
    hasError ? 'border-red-400' : 'border-line',
  )
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
