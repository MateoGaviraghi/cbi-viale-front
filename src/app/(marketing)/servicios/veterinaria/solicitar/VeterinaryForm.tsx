'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { api } from '@/lib/api'
import { VET_SAMPLE_TYPES, VET_SPECIES } from '@/lib/api/types'
import {
  dniOrCuitSchema,
  emailSchema,
  isoDateSchema,
  nameSchema,
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
  ownerName: nameSchema,
  dniOrCuit: dniOrCuitSchema,
  phone: phoneSchema,
  email: emailSchema,
  animalName: text(80),
  species: z.enum(VET_SPECIES, { errorMap: () => ({ message: 'Elegí una especie' }) }),
  breed: text(100),
  animalAge: z.coerce
    .number({ invalid_type_error: 'Edad inválida' })
    .int('Debe ser un número entero')
    .min(0, 'Debe ser ≥ 0')
    .max(100, 'Debe ser ≤ 100'),
  requestingVet: text(200),
  sampleType: z.enum(VET_SAMPLE_TYPES, {
    errorMap: () => ({ message: 'Elegí un tipo de muestra' }),
  }),
  collectionDate: isoDateSchema,
  observations: text(2000, { required: false }).optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

export function VeterinaryForm() {
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
      await api.publicSubmissions.createVeterinary({
        ownerName: data.ownerName,
        dniOrCuit: data.dniOrCuit,
        phone: data.phone,
        email: data.email,
        animalName: data.animalName,
        species: data.species,
        breed: data.breed,
        animalAge: data.animalAge,
        requestingVet: data.requestingVet,
        sampleType: data.sampleType,
        collectionDate: data.collectionDate,
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
        serviceSlug="veterinaria"
        message="Recibimos tu solicitud de análisis veterinario. Te contactaremos en breve para coordinar la entrega de la muestra."
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
      <FormSection
        title="Datos del responsable"
        description="Persona o establecimiento a nombre del cual emitimos el informe."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Nombre completo" required error={errors.ownerName?.message}>
            <TextInput
              {...register('ownerName')}
              type="text"
              autoComplete="name"
              placeholder="Juan García"
              hasError={!!errors.ownerName}
            />
          </Field>

          <Field label="DNI o CUIT" required error={errors.dniOrCuit?.message}>
            <TextInput
              {...register('dniOrCuit')}
              type="text"
              placeholder="30123456 o 30-71234567-8"
              hasError={!!errors.dniOrCuit}
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

          <Field label="Email" required error={errors.email?.message}>
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

      <FormSection title="Datos del animal">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Nombre del animal" required error={errors.animalName?.message}>
            <TextInput
              {...register('animalName')}
              type="text"
              placeholder="Firulais"
              hasError={!!errors.animalName}
            />
          </Field>

          <Field label="Especie" required error={errors.species?.message}>
            <Select
              {...register('species')}
              options={VET_SPECIES}
              placeholder="Seleccionar…"
              hasError={!!errors.species}
              defaultValue=""
            />
          </Field>

          <Field label="Raza" required error={errors.breed?.message}>
            <TextInput
              {...register('breed')}
              type="text"
              placeholder="Labrador, Mestizo, etc."
              hasError={!!errors.breed}
            />
          </Field>

          <Field label="Edad (años)" required error={errors.animalAge?.message}>
            <TextInput
              {...register('animalAge')}
              type="number"
              min={0}
              max={100}
              step={1}
              placeholder="5"
              hasError={!!errors.animalAge}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection title="Datos del estudio">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Veterinario solicitante"
            required
            error={errors.requestingVet?.message}
          >
            <TextInput
              {...register('requestingVet')}
              type="text"
              placeholder="Dr. Pérez · MV 12345"
              hasError={!!errors.requestingVet}
            />
          </Field>

          <Field label="Tipo de muestra" required error={errors.sampleType?.message}>
            <Select
              {...register('sampleType')}
              options={VET_SAMPLE_TYPES}
              placeholder="Seleccionar…"
              hasError={!!errors.sampleType}
              defaultValue=""
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
            placeholder="Síntomas, antecedentes relevantes, observaciones del veterinario…"
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
