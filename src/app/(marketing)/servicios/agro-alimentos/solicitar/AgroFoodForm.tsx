'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { api } from '@/lib/api'
import { AGRO_ANALYSIS_TYPES } from '@/lib/api/types'
import {
  cuitSchema,
  emailSchema,
  isoDateSchema,
  longNameSchema,
  phoneSchema,
  text,
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
} from '@/components/forms'

const schema = z.object({
  companyName: longNameSchema,
  cuit: cuitSchema,
  phone: phoneSchema,
  email: emailSchema,
  productType: text(200),
  batch: text(80, { required: false }).optional().or(z.literal('')),
  productionDate: z.union([isoDateSchema, z.literal('')]).optional(),
  analysisType: z.enum(AGRO_ANALYSIS_TYPES, {
    errorMap: () => ({ message: 'Elegí un tipo de análisis' }),
  }),
  sampleQuantity: text(80),
  collectionDate: isoDateSchema,
  origin: text(200, { required: false }).optional().or(z.literal('')),
  observations: text(2000, { required: false }).optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

export function AgroFoodForm() {
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
      await api.publicSubmissions.createAgroFood({
        companyName: data.companyName,
        cuit: data.cuit,
        phone: data.phone,
        email: data.email,
        productType: data.productType,
        batch: data.batch || undefined,
        productionDate: data.productionDate || undefined,
        analysisType: data.analysisType,
        sampleQuantity: data.sampleQuantity,
        collectionDate: data.collectionDate,
        origin: data.origin || undefined,
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
        serviceSlug="agro-alimentos"
        message="Recibimos tu solicitud. Te contactaremos en breve para coordinar la recepción de la muestra y los próximos pasos."
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
              placeholder="Distribuidora Norte SA"
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

      <FormSection title="Datos del producto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Tipo de producto"
            required
            error={errors.productType?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('productType')}
              type="text"
              placeholder="Harina de trigo 000, leche en polvo, miel multiflora…"
              hasError={!!errors.productType}
            />
          </Field>

          <Field label="Lote (opcional)" error={errors.batch?.message}>
            <TextInput
              {...register('batch')}
              type="text"
              placeholder="L-2026-0512"
              hasError={!!errors.batch}
            />
          </Field>

          <DateField
            name="productionDate"
            control={control}
            label="Fecha de producción (opcional)"
            error={errors.productionDate?.message}
          />

          <Field
            label="Origen (opcional)"
            error={errors.origin?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('origin')}
              type="text"
              placeholder="Planta Rosario, productor local, etc."
              hasError={!!errors.origin}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Datos del análisis">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Tipo de análisis" required error={errors.analysisType?.message}>
            <Select
              {...register('analysisType')}
              options={AGRO_ANALYSIS_TYPES}
              placeholder="Seleccionar…"
              hasError={!!errors.analysisType}
              defaultValue=""
            />
          </Field>

          <Field
            label="Cantidad de muestra"
            required
            error={errors.sampleQuantity?.message}
          >
            <TextInput
              {...register('sampleQuantity')}
              type="text"
              placeholder="500g, 1L, 250ml…"
              hasError={!!errors.sampleQuantity}
            />
          </Field>

          <DateField
            name="collectionDate"
            control={control}
            label="Fecha de toma"
            required
            error={errors.collectionDate?.message}
            className="sm:col-span-2"
          />
        </div>

        <Field label="Observaciones" error={errors.observations?.message}>
          <TextArea
            {...register('observations')}
            rows={4}
            placeholder="Destino del análisis, condiciones de almacenamiento, requisitos especiales…"
            hasError={!!errors.observations}
          />
        </Field>
      </FormSection>

      {serverError && (
        <div
          role="alert"
          className="border border-red-400 bg-red-50/40 px-4 py-3 text-sm text-red-600"
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
