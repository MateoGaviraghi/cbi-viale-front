'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { api } from '@/lib/api'
import { ENV_ANALYSIS_TYPES, ENV_SAMPLE_TYPES } from '@/lib/api/types'
import {
  cuitSchema,
  emailSchema,
  isoDateSchema,
  longNameSchema,
  phoneSchema,
  text,
  timeSchema,
} from '@/lib/forms-schemas'
import { getFormErrorMessage } from '@/lib/forms-errors'

import {
  DateField,
  Field,
  FormSection,
  Select,
  SubmitButton,
  SuccessScreen,
  TextArea,
  TextInput,
  TimeField,
} from '@/components/forms'

const schema = z.object({
  companyName: longNameSchema,
  cuit: cuitSchema,
  phone: phoneSchema,
  email: emailSchema,
  sampleType: z.enum(ENV_SAMPLE_TYPES, {
    errorMap: () => ({ message: 'Elegí un tipo de muestra' }),
  }),
  samplingPoint: text(200),
  location: text(300),
  collectionDate: isoDateSchema,
  collectionTime: z.union([timeSchema, z.literal('')]).optional(),
  analysisType: z.enum(ENV_ANALYSIS_TYPES, {
    errorMap: () => ({ message: 'Elegí un tipo de análisis' }),
  }),
  samplingResponsible: text(200, { required: false }).optional().or(z.literal('')),
  observations: text(2000, { required: false }).optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

export function EnvironmentalForm() {
  const [submitted, setSubmitted] = useState<{ email: string } | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      await api.publicSubmissions.createEnvironmental({
        companyName: data.companyName,
        cuit: data.cuit,
        phone: data.phone,
        email: data.email,
        sampleType: data.sampleType,
        samplingPoint: data.samplingPoint,
        location: data.location,
        collectionDate: data.collectionDate,
        collectionTime: data.collectionTime || undefined,
        analysisType: data.analysisType,
        samplingResponsible: data.samplingResponsible || undefined,
        observations: data.observations || undefined,
      })
      setSubmitted({ email: data.email })
    } catch (err) {
      setServerError(getFormErrorMessage(err))
    }
  }

  if (submitted) {
    return (
      <SuccessScreen
        email={submitted.email}
        serviceSlug="ambiental"
        message="Recibimos tu solicitud de análisis ambiental. Te contactaremos en breve para coordinar la recepción de la muestra."
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
      <FormSection
        title="Datos de la empresa"
        description="A nombre de quién se emite el informe."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Empresa o razón social"
            required
            error={errors.companyName?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('companyName')}
              type="text"
              autoComplete="organization"
              placeholder="Cooperativa Agua Pura"
              hasError={!!errors.companyName}
            />
          </Field>

          <Field label="CUIT" required error={errors.cuit?.message}>
            <TextInput
              {...register('cuit')}
              type="text"
              placeholder="30-71234567-8"
              hasError={!!errors.cuit}
            />
          </Field>

          <Field label="Teléfono" required error={errors.phone?.message}>
            <TextInput
              {...register('phone')}
              type="tel"
              autoComplete="tel"
              placeholder="+5493434567890"
              hasError={!!errors.phone}
            />
          </Field>

          <Field
            label="Email"
            required
            error={errors.email?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('email')}
              type="email"
              autoComplete="email"
              placeholder="contacto@empresa.com"
              hasError={!!errors.email}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Datos de la muestra">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Tipo de muestra" required error={errors.sampleType?.message}>
            <Select
              {...register('sampleType')}
              options={ENV_SAMPLE_TYPES}
              placeholder="Seleccionar…"
              hasError={!!errors.sampleType}
              defaultValue=""
            />
          </Field>

          <Field
            label="Punto de muestreo"
            required
            error={errors.samplingPoint?.message}
          >
            <TextInput
              {...register('samplingPoint')}
              type="text"
              placeholder="Pozo norte, descarga 3, perímetro este…"
              hasError={!!errors.samplingPoint}
            />
          </Field>

          <Field
            label="Ubicación"
            required
            error={errors.location?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('location')}
              type="text"
              placeholder="Ruta 12 km 45, Paraná, Entre Ríos"
              hasError={!!errors.location}
            />
          </Field>

          <DateField
            name="collectionDate"
            control={control}
            label="Fecha de toma"
            required
            error={errors.collectionDate?.message}
          />

          <TimeField
            name="collectionTime"
            control={control}
            label="Hora de toma (opcional)"
            error={errors.collectionTime?.message}
          />
        </div>
      </FormSection>

      <FormSection title="Datos del análisis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Tipo de análisis" required error={errors.analysisType?.message}>
            <Select
              {...register('analysisType')}
              options={ENV_ANALYSIS_TYPES}
              placeholder="Seleccionar…"
              hasError={!!errors.analysisType}
              defaultValue=""
            />
          </Field>

          <Field
            label="Responsable del muestreo (opcional)"
            error={errors.samplingResponsible?.message}
          >
            <TextInput
              {...register('samplingResponsible')}
              type="text"
              placeholder="Ing. Mario Pérez"
              hasError={!!errors.samplingResponsible}
            />
          </Field>
        </div>

        <Field label="Observaciones" error={errors.observations?.message}>
          <TextArea
            {...register('observations')}
            rows={4}
            placeholder="Motivo del análisis, condiciones del muestreo, requisitos del informe…"
            hasError={!!errors.observations}
          />
        </Field>
      </FormSection>

      {serverError && (
        <div
          role="alert"
          className="border border-danger bg-danger/5 px-4 py-3 text-sm text-danger"
        >
          {serverError}
        </div>
      )}

      <SubmitButton loading={isSubmitting} label="Enviar solicitud" />

      <p className="text-xs text-ink-muted text-center">
        Al enviar este formulario, aceptás que CBI Viale procese estos datos para responder tu
        solicitud.
      </p>
    </form>
  )
}
