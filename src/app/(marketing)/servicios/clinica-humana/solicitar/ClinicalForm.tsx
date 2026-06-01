'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertTriangle } from 'lucide-react'

import { api, ApiError } from '@/lib/api'
import { UROCULTURE_SAMPLE_TYPES } from '@/lib/api/types'
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
  MedicalOrderUpload,
  Select,
  SignatureModal,
  SubmitButton,
  SuccessScreen,
  TextArea,
  TextInput,
  TimeField,
} from '@/components/forms'

/**
 * Schema con campos base + dos secciones condicionales (urocultivo, exudado vaginal).
 * Los campos del subform se validan SOLO si el toggle correspondiente está activo
 * — vía `superRefine`.
 */
const schema = z
  .object({
    // ---------- CLINICAL base ----------
    name: nameSchema,
    dni: dniSchema,
    email: emailSchema,
    birthDate: isoDateSchema,
    phone: phoneSchema,
    healthInsurance: text(120, { required: false }).optional().or(z.literal('')),
    requestingDoctor: text(200, { required: false }).optional().or(z.literal('')),
    observations: text(2000, { required: false }).optional().or(z.literal('')),
    medicalOrderUrl: z.string().url('Tenés que subir el pedido médico').min(1),
    consentGiven: mustBeTrue('Tenés que aceptar el consentimiento informado'),

    // ---------- toggles ----------
    includeUroculture: z.boolean().default(false),
    includeVaginalExudate: z.boolean().default(false),

    // ---------- UROCULTURE (opcional, validado por superRefine si toggle on) ----------
    uro_age: z.string().optional(),
    uro_collectionTime: z.string().optional(),
    uro_collectionDate: z.string().optional(),
    uro_sampleType: z.string().optional(),
    uro_symptoms: z.string().optional(),
    uro_pregnancy: z.boolean().optional(),
    uro_previousAntibiotics: z.string().optional(),
    uro_baselinePathology: z.string().optional(),

    // ---------- VAGINAL_EXUDATE (opcional) ----------
    exu_age: z.string().optional(),
    exu_lastMenstruationDate: z.string().optional(),
    exu_symptoms: z.string().optional(),
    exu_pregnancies: z.string().optional(),
    exu_flowCharacteristics: z.string().optional(),
    exu_contraceptiveUse: z.string().optional(),
    exu_vaginalInfectionHistory: z.string().optional(),
    exu_abortionCount: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.includeUroculture) {
      const requireField = (key: keyof typeof data, msg: string) => {
        const v = data[key]
        if (!v || (typeof v === 'string' && v.trim() === '')) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: msg })
        }
      }
      const ageNum = Number(data.uro_age)
      if (!data.uro_age || Number.isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['uro_age'],
          message: 'Edad inválida (0-150)',
        })
      }
      if (!data.uro_collectionTime || !/^\d{2}:\d{2}$/.test(data.uro_collectionTime)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['uro_collectionTime'],
          message: 'Hora inválida (HH:MM)',
        })
      }
      if (!data.uro_collectionDate || !/^\d{4}-\d{2}-\d{2}$/.test(data.uro_collectionDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['uro_collectionDate'],
          message: 'Fecha inválida',
        })
      }
      requireField('uro_symptoms', 'Describí los síntomas')
      requireField('uro_previousAntibiotics', 'Indicá "Ninguno" si no aplica')
      requireField('uro_baselinePathology', 'Indicá "Ninguna" si no aplica')
    }

    if (data.includeVaginalExudate) {
      const requireField = (key: keyof typeof data, msg: string) => {
        const v = data[key]
        if (!v || (typeof v === 'string' && v.trim() === '')) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: msg })
        }
      }
      const ageNum = Number(data.exu_age)
      if (!data.exu_age || Number.isNaN(ageNum) || ageNum < 0 || ageNum > 150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['exu_age'],
          message: 'Edad inválida (0-150)',
        })
      }
      const pregNum = Number(data.exu_pregnancies)
      if (
        data.exu_pregnancies === '' ||
        data.exu_pregnancies === undefined ||
        Number.isNaN(pregNum) ||
        pregNum < 0 ||
        pregNum > 30
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['exu_pregnancies'],
          message: 'Cantidad inválida (0-30)',
        })
      }
      const aboNum = Number(data.exu_abortionCount)
      if (
        data.exu_abortionCount === '' ||
        data.exu_abortionCount === undefined ||
        Number.isNaN(aboNum) ||
        aboNum < 0 ||
        aboNum > 30
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['exu_abortionCount'],
          message: 'Cantidad inválida (0-30)',
        })
      }
      if (
        !data.exu_lastMenstruationDate ||
        !/^\d{4}-\d{2}-\d{2}$/.test(data.exu_lastMenstruationDate)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['exu_lastMenstruationDate'],
          message: 'Fecha inválida',
        })
      }
      requireField('exu_symptoms', 'Describí los síntomas')
      requireField('exu_flowCharacteristics', 'Describí las características del flujo')
      requireField('exu_contraceptiveUse', 'Indicá "Ninguno" si no usa')
      requireField('exu_vaginalInfectionHistory', 'Indicá "Ninguno" si no tiene')
    }
  })

type FormData = z.infer<typeof schema>

interface SubmitResult {
  email: string
  partialFailures: string[]
}

export function ClinicalForm() {
  const [submitted, setSubmitted] = useState<SubmitResult | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null)
  const [signatureOpen, setSignatureOpen] = useState(false)
  const [signatureError, setSignatureError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      includeUroculture: false,
      includeVaginalExudate: false,
      consentGiven: false as unknown as true,
      medicalOrderUrl: '',
    },
  })

  const includeUro = watch('includeUroculture')
  const includeExu = watch('includeVaginalExudate')
  const medicalOrderUrl = watch('medicalOrderUrl')

  // Mantener visible el campo medicalOrderUrl en RHF
  register('medicalOrderUrl')

  async function onSubmit(data: FormData) {
    setServerError(null)

    // Exigir firma antes de enviar (requisito de negocio: clínica requiere consentimiento).
    if (!signatureUrl) {
      setSignatureError(true)
      setSignatureOpen(true)
      return
    }

    const partialFailures: string[] = []

    // 1. CLINICAL primero — si falla, no creamos subforms
    let parentId: string
    try {
      const { data: parent } = await api.publicSubmissions.createClinical({
        name: data.name,
        dni: data.dni,
        email: data.email,
        birthDate: data.birthDate,
        phone: data.phone,
        healthInsurance: data.healthInsurance || undefined,
        requestingDoctor: data.requestingDoctor || undefined,
        observations: data.observations || undefined,
        consentGiven: data.consentGiven,
        medicalOrderUrl: data.medicalOrderUrl,
        signatureUrl,
      })
      parentId = parent.id
    } catch (err) {
      setServerError(getFormErrorMessage(err))
      return
    }

    // 2. UROCULTURE si está activado
    if (data.includeUroculture) {
      try {
        await api.publicSubmissions.createUroculture({
          parentSubmissionId: parentId,
          name: data.name,
          dni: data.dni,
          age: Number(data.uro_age),
          collectionTime: data.uro_collectionTime!,
          collectionDate: data.uro_collectionDate!,
          sampleType:
            data.uro_sampleType && data.uro_sampleType !== ''
              ? (data.uro_sampleType as (typeof UROCULTURE_SAMPLE_TYPES)[number])
              : undefined,
          symptoms: data.uro_symptoms!,
          pregnancy: data.uro_pregnancy,
          previousAntibiotics: data.uro_previousAntibiotics!,
          baselinePathology: data.uro_baselinePathology!,
          consentGiven: data.consentGiven,
        })
      } catch (err) {
        partialFailures.push(
          `urocultivo (${err instanceof ApiError ? err.message : 'no pudimos guardarlo'})`,
        )
      }
    }

    // 3. VAGINAL_EXUDATE si está activado
    if (data.includeVaginalExudate) {
      try {
        await api.publicSubmissions.createVaginalExudate({
          parentSubmissionId: parentId,
          name: data.name,
          dni: data.dni,
          age: Number(data.exu_age),
          lastMenstruationDate: data.exu_lastMenstruationDate!,
          symptoms: data.exu_symptoms!,
          pregnancies: Number(data.exu_pregnancies),
          flowCharacteristics: data.exu_flowCharacteristics!,
          contraceptiveUse: data.exu_contraceptiveUse!,
          vaginalInfectionHistory: data.exu_vaginalInfectionHistory!,
          abortionCount: Number(data.exu_abortionCount),
          consentGiven: data.consentGiven,
        })
      } catch (err) {
        partialFailures.push(
          `exudado vaginal (${err instanceof ApiError ? err.message : 'no pudimos guardarlo'})`,
        )
      }
    }

    setSubmitted({ email: data.email, partialFailures })
  }

  if (submitted) {
    if (submitted.partialFailures.length > 0) {
      return (
        <div className="space-y-6">
          <div
            role="alert"
            className="border border-danger bg-danger/5 px-4 py-4 text-sm text-danger flex gap-3"
          >
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Tu solicitud principal fue recibida.</p>
              <p>
                No pudimos guardar el siguiente complemento: {submitted.partialFailures.join(', ')}.
                Igual lo vamos a contemplar al contactarte — escribilo en el email de respuesta.
              </p>
            </div>
          </div>
          <SuccessScreen
            email={submitted.email}
            serviceSlug="clinica-humana"
            message="Recibimos tu solicitud de análisis clínicos. Te contactaremos en breve."
          />
        </div>
      )
    }
    return (
      <SuccessScreen
        email={submitted.email}
        serviceSlug="clinica-humana"
        message="Recibimos tu solicitud de análisis clínicos. Te contactaremos en breve para coordinar la toma de muestras."
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-12">
      <FormSection title="Datos del paciente">
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

          <DateField
            name="birthDate"
            control={control}
            label="Fecha de nacimiento"
            required
            error={errors.birthDate?.message}
            defaultMonth={new Date(1990, 0)}
            toYear={new Date().getFullYear()}
          />

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

          <Field label="Obra social (opcional)" error={errors.healthInsurance?.message}>
            <TextInput
              {...register('healthInsurance')}
              type="text"
              placeholder="OSDE, PAMI, Particular…"
              hasError={!!errors.healthInsurance}
            />
          </Field>

          <Field
            label="Médico solicitante (opcional)"
            error={errors.requestingDoctor?.message}
          >
            <TextInput
              {...register('requestingDoctor')}
              type="text"
              placeholder="Dr. Pérez · MP 12345"
              hasError={!!errors.requestingDoctor}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="Pedido médico"
        description="Subí una foto o PDF del pedido. Aceptamos JPG, PNG, PDF, WEBP o HEIC hasta 10 MB."
      >
        <MedicalOrderUpload
          value={medicalOrderUrl}
          onUploaded={(url) => setValue('medicalOrderUrl', url, { shouldValidate: true })}
          onCleared={() => setValue('medicalOrderUrl', '', { shouldValidate: true })}
          error={errors.medicalOrderUrl?.message}
        />

        <Field label="Observaciones (opcional)" error={errors.observations?.message}>
          <TextArea
            {...register('observations')}
            rows={4}
            placeholder="Análisis pre-quirúrgico, ayuno previo, indicaciones del médico…"
            hasError={!!errors.observations}
          />
        </Field>
      </FormSection>

      <FormSection
        title="Estudios complementarios"
        description="Marcá si tu pedido incluye alguno de estos estudios. Vas a completar los datos específicos en el mismo formulario."
      >
        <Checkbox
          {...register('includeUroculture')}
          label="El pedido incluye urocultivo"
        />

        {includeUro && (
          <div className="border-l-2 border-gold-700 pl-6 ml-1 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="font-serif text-xl text-ink">Datos del urocultivo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Edad" required error={errors.uro_age?.message}>
                <TextInput
                  {...register('uro_age')}
                  type="number"
                  min={0}
                  max={150}
                  step={1}
                  placeholder="34"
                  hasError={!!errors.uro_age}
                />
              </Field>

              <Field
                label="Tipo de muestra"
                error={errors.uro_sampleType?.message}
              >
                <Select
                  {...register('uro_sampleType')}
                  options={UROCULTURE_SAMPLE_TYPES}
                  placeholder="Seleccionar…"
                  hasError={!!errors.uro_sampleType}
                  defaultValue=""
                />
              </Field>

              <DateField
                name="uro_collectionDate"
                control={control}
                label="Fecha de recolección"
                required
                error={errors.uro_collectionDate?.message}
              />

              <TimeField
                name="uro_collectionTime"
                control={control}
                label="Hora de recolección"
                required
                error={errors.uro_collectionTime?.message}
              />
            </div>

            <Field label="Síntomas" required error={errors.uro_symptoms?.message}>
              <TextArea
                {...register('uro_symptoms')}
                rows={3}
                placeholder="Ardor al orinar, dolor lumbar, fiebre…"
                hasError={!!errors.uro_symptoms}
              />
            </Field>

            <Checkbox
              {...register('uro_pregnancy')}
              label="¿Cursa embarazo actualmente?"
            />

            <Field
              label="Antibióticos previos"
              required
              hint='Si no toma, escribí "Ninguno".'
              error={errors.uro_previousAntibiotics?.message}
            >
              <TextArea
                {...register('uro_previousAntibiotics')}
                rows={2}
                placeholder="Amoxicilina desde el 10/05/2026"
                hasError={!!errors.uro_previousAntibiotics}
              />
            </Field>

            <Field
              label="Patología de base"
              required
              hint='Si no tiene, escribí "Ninguna".'
              error={errors.uro_baselinePathology?.message}
            >
              <TextInput
                {...register('uro_baselinePathology')}
                type="text"
                placeholder="Diabetes tipo 2, HTA, ninguna…"
                hasError={!!errors.uro_baselinePathology}
              />
            </Field>
          </div>
        )}

        <Checkbox
          {...register('includeVaginalExudate')}
          label="El pedido incluye exudado vaginal"
        />

        {includeExu && (
          <div className="border-l-2 border-gold-700 pl-6 ml-1 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <h3 className="font-serif text-xl text-ink">Datos del exudado vaginal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Edad" required error={errors.exu_age?.message}>
                <TextInput
                  {...register('exu_age')}
                  type="number"
                  min={0}
                  max={150}
                  step={1}
                  placeholder="28"
                  hasError={!!errors.exu_age}
                />
              </Field>

              <DateField
                name="exu_lastMenstruationDate"
                control={control}
                label="Última menstruación"
                required
                error={errors.exu_lastMenstruationDate?.message}
                toYear={new Date().getFullYear()}
              />

              <Field
                label="Embarazos previos"
                required
                error={errors.exu_pregnancies?.message}
              >
                <TextInput
                  {...register('exu_pregnancies')}
                  type="number"
                  min={0}
                  max={30}
                  step={1}
                  placeholder="0"
                  hasError={!!errors.exu_pregnancies}
                />
              </Field>

              <Field
                label="Abortos previos"
                required
                error={errors.exu_abortionCount?.message}
              >
                <TextInput
                  {...register('exu_abortionCount')}
                  type="number"
                  min={0}
                  max={30}
                  step={1}
                  placeholder="0"
                  hasError={!!errors.exu_abortionCount}
                />
              </Field>
            </div>

            <Field label="Síntomas" required error={errors.exu_symptoms?.message}>
              <TextArea
                {...register('exu_symptoms')}
                rows={3}
                placeholder="Picazón, secreción anormal, ardor…"
                hasError={!!errors.exu_symptoms}
              />
            </Field>

            <Field
              label="Características del flujo"
              required
              error={errors.exu_flowCharacteristics?.message}
            >
              <TextArea
                {...register('exu_flowCharacteristics')}
                rows={2}
                placeholder="Color, consistencia, olor"
                hasError={!!errors.exu_flowCharacteristics}
              />
            </Field>

            <Field
              label="Anticonceptivos"
              required
              hint='Si no usa, escribí "Ninguno".'
              error={errors.exu_contraceptiveUse?.message}
            >
              <TextInput
                {...register('exu_contraceptiveUse')}
                type="text"
                placeholder="Pastillas, DIU, ninguno…"
                hasError={!!errors.exu_contraceptiveUse}
              />
            </Field>

            <Field
              label="Antecedentes de infecciones vaginales"
              required
              hint='Si no tiene, escribí "Ninguno".'
              error={errors.exu_vaginalInfectionHistory?.message}
            >
              <TextArea
                {...register('exu_vaginalInfectionHistory')}
                rows={2}
                placeholder="Candidiasis hace 6 meses, ninguno…"
                hasError={!!errors.exu_vaginalInfectionHistory}
              />
            </Field>
          </div>
        )}
      </FormSection>

      <FormSection title="Consentimiento">
        <Checkbox
          {...register('consentGiven')}
          label="Acepto que CBI Viale procese mis datos personales y muestras biológicas con el único fin de realizar los análisis solicitados, conforme a la normativa vigente de protección de datos."
          error={errors.consentGiven?.message}
        />

        {/* Firma del paciente */}
        <div className="mt-5">
          <span className="block text-[11px] uppercase tracking-widest text-ink-muted mb-2">
            Firma del paciente <span className="text-gold-700">*</span>
          </span>
          {signatureUrl ? (
            <div className="flex items-center justify-between border border-gold-700 bg-white px-4 py-3 text-sm text-ink">
              <span>Firma registrada.</span>
              <button
                type="button"
                onClick={() => setSignatureOpen(true)}
                className="text-xs uppercase tracking-widest text-gold-700 hover:text-gold-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                Volver a firmar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSignatureOpen(true)}
              className="tap-min flex w-full items-center justify-center gap-3 border border-dashed border-line bg-beige/30 px-4 py-6 text-sm text-ink-muted hover:border-gold-700 hover:text-gold-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
            >
              <span className="uppercase tracking-widest text-[11px]">Firmar consentimiento</span>
            </button>
          )}
          {signatureError && !signatureUrl && (
            <p role="alert" className="mt-2 text-xs text-danger">
              Necesitás firmar el consentimiento para enviar la solicitud.
            </p>
          )}
        </div>
      </FormSection>

      {serverError && (
        <div
          role="alert"
          className="border border-danger bg-danger/5 px-4 py-3 text-sm text-danger"
        >
          {serverError}
        </div>
      )}

      <SubmitButton
        loading={isSubmitting}
        loadingLabel="Enviando…"
        label="Enviar solicitud"
      />

      <SignatureModal
        open={signatureOpen}
        onOpenChange={setSignatureOpen}
        onConfirmed={(url) => {
          setSignatureUrl(url)
          setSignatureError(false)
        }}
      />
    </form>
  )
}
