'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { api } from '@/lib/api'
import { GENETIC_STUDY_TYPES } from '@/lib/api/types'
import {
  dniSchema,
  emailSchema,
  isoDateSchema,
  mustBeTrue,
  nameSchema,
  phoneSchema,
  text,
} from '@/lib/forms-schemas'
import { getFormErrorMessage } from '@/lib/forms-errors'

import {
  Checkbox,
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
  name: nameSchema,
  dni: dniSchema,
  phone: phoneSchema,
  email: emailSchema,
  studyType: z.enum(GENETIC_STUDY_TYPES, {
    errorMap: () => ({ message: 'Elegí un tipo de estudio' }),
  }),
  studyReason: text(1000),
  sampleRelationship: text(500, { required: false }).optional().or(z.literal('')),
  sampleCount: z.coerce
    .number({ invalid_type_error: 'Cantidad inválida' })
    .int('Debe ser un número entero')
    .min(1, 'Mínimo 1 muestra')
    .max(50, 'Máximo 50 muestras'),
  collectionDate: isoDateSchema,
  requestingProfessional: text(200, { required: false }).optional().or(z.literal('')),
  ethnicity: text(80),
  diseaseStatus: text(500, { required: false }).optional().or(z.literal('')),
  boneMarrowTransplant: z.boolean().optional(),
  studyDetail: text(1000),
  previousGeneticStudies: text(1000, { required: false }).optional().or(z.literal('')),
  observations: text(2000, { required: false }).optional().or(z.literal('')),
  consentGiven: mustBeTrue('Tenés que aceptar el consentimiento informado'),
})

type FormData = z.infer<typeof schema>

export function GeneticForm() {
  const [submitted, setSubmitted] = useState<{ email: string } | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { boneMarrowTransplant: false, consentGiven: false as unknown as true },
  })

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      await api.publicSubmissions.createGenetic({
        name: data.name,
        dni: data.dni,
        phone: data.phone,
        email: data.email,
        studyType: data.studyType,
        studyReason: data.studyReason,
        sampleRelationship: data.sampleRelationship || undefined,
        sampleCount: data.sampleCount,
        collectionDate: data.collectionDate,
        requestingProfessional: data.requestingProfessional || undefined,
        observations: data.observations || undefined,
        consentGiven: data.consentGiven,
        ethnicity: data.ethnicity,
        diseaseStatus: data.diseaseStatus || undefined,
        boneMarrowTransplant: data.boneMarrowTransplant,
        studyDetail: data.studyDetail,
        previousGeneticStudies: data.previousGeneticStudies || undefined,
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
        serviceSlug="genetica"
        message="Recibimos tu solicitud. Te contactaremos en breve para coordinar la toma de muestras y los próximos pasos del estudio."
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
      <FormSection title="Datos personales">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Nombre completo"
            required
            error={errors.name?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('name')}
              type="text"
              autoComplete="name"
              placeholder="María López"
              hasError={!!errors.name}
            />
          </Field>

          <Field label="DNI" required error={errors.dni?.message}>
            <TextInput
              {...register('dni')}
              type="text"
              placeholder="30123456"
              hasError={!!errors.dni}
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
              placeholder="tu@email.com"
              hasError={!!errors.email}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Datos del estudio">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Tipo de estudio" required error={errors.studyType?.message}>
            <Select
              {...register('studyType')}
              options={GENETIC_STUDY_TYPES}
              placeholder="Seleccionar…"
              hasError={!!errors.studyType}
              defaultValue=""
            />
          </Field>

          <Field label="Cantidad de muestras" required error={errors.sampleCount?.message}>
            <TextInput
              {...register('sampleCount')}
              type="number"
              min={1}
              max={50}
              step={1}
              placeholder="2"
              hasError={!!errors.sampleCount}
            />
          </Field>

          <Field
            label="Motivo del estudio"
            required
            error={errors.studyReason?.message}
            className="sm:col-span-2"
          >
            <TextArea
              {...register('studyReason')}
              rows={3}
              placeholder="Confirmación de paternidad, búsqueda de mutación familiar, panel oncológico…"
              hasError={!!errors.studyReason}
            />
          </Field>

          <Field
            label="Detalle del estudio solicitado"
            required
            error={errors.studyDetail?.message}
            className="sm:col-span-2"
          >
            <TextArea
              {...register('studyDetail')}
              rows={3}
              placeholder="Panel de 50 marcadores STR, gen específico, cariotipo de bandeo G…"
              hasError={!!errors.studyDetail}
            />
          </Field>

          <Field
            label="Relación entre las muestras"
            error={errors.sampleRelationship?.message}
            className="sm:col-span-2"
          >
            <TextInput
              {...register('sampleRelationship')}
              type="text"
              placeholder="Padre e hijo, madre / hijo / pareja…"
              hasError={!!errors.sampleRelationship}
            />
          </Field>

          <DateField
            name="collectionDate"
            control={control}
            label="Fecha de toma"
            required
            error={errors.collectionDate?.message}
          />

          <Field
            label="Profesional solicitante (opcional)"
            error={errors.requestingProfessional?.message}
          >
            <TextInput
              {...register('requestingProfessional')}
              type="text"
              placeholder="Dr. Genetista Ramírez · MP 4567"
              hasError={!!errors.requestingProfessional}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="Antecedentes"
        description="Información clínica relevante para interpretar el resultado."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Raza / etnia" required error={errors.ethnicity?.message}>
            <TextInput
              {...register('ethnicity')}
              type="text"
              placeholder="Caucásica, Latinoamericana, Asiática…"
              hasError={!!errors.ethnicity}
            />
          </Field>

          <Field label="Estado de enfermedad (opcional)" error={errors.diseaseStatus?.message}>
            <TextInput
              {...register('diseaseStatus')}
              type="text"
              placeholder="Sin enfermedad activa, en tratamiento por…"
              hasError={!!errors.diseaseStatus}
            />
          </Field>

          <Field
            label="Estudios genéticos previos (opcional)"
            error={errors.previousGeneticStudies?.message}
            className="sm:col-span-2"
          >
            <TextArea
              {...register('previousGeneticStudies')}
              rows={3}
              placeholder="Cariotipo en 2020 — normal. Panel oncológico en 2023…"
              hasError={!!errors.previousGeneticStudies}
            />
          </Field>
        </div>

        <Checkbox
          {...register('boneMarrowTransplant')}
          label="¿Recibió un trasplante de médula ósea?"
          hint="Importante para interpretar resultados de estudios de ADN."
        />

        <Field label="Observaciones" error={errors.observations?.message}>
          <TextArea
            {...register('observations')}
            rows={3}
            placeholder="Cualquier dato adicional que quieras que tengamos en cuenta."
            hasError={!!errors.observations}
          />
        </Field>
      </FormSection>

      <FormSection title="Consentimiento">
        <Checkbox
          {...register('consentGiven')}
          label="Acepto que CBI Viale procese mis datos personales y muestras biológicas con el único fin de realizar el estudio genético solicitado, conforme a la normativa vigente de protección de datos."
          error={errors.consentGiven?.message}
        />
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
    </form>
  )
}
