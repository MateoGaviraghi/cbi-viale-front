/**
 * Definición de campos adicionales por servicio para el paso 4 del turnero.
 * Fuente: "Definición de campos por servicio" — doc entregado por el cliente.
 *
 * Los campos base del turno (nombre, DNI, email, teléfono) siempre se muestran.
 * Aquí se definen los extras que se agregan según el servicio.
 */
import { z } from 'zod'

// ---------------------------------------------------------------------------
//  Tipos
// ---------------------------------------------------------------------------

export type ExtraFieldType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'time'
  | 'number'
  | 'select'
  | 'checkbox'

export interface ExtraFieldConfig {
  key: string
  label: string
  type: ExtraFieldType
  required: boolean
  options?: string[]
  placeholder?: string
  helperText?: string
  /** Si este checkbox activa una sección condicional */
  triggersSection?: string
  /** Clave de la sección condicional a la que pertenece este campo */
  section?: string
}

export interface ServiceFormConfig {
  /** Override de labels de campos base del turno */
  baseLabels?: {
    patientName?: string
    patientDni?: string
  }
  /** Nota informativa al inicio de la sección extra */
  note?: string
  extraFields: ExtraFieldConfig[]
}

// ---------------------------------------------------------------------------
//  Configs por servicio
// ---------------------------------------------------------------------------

export const SERVICE_FORM_CONFIGS: Partial<Record<string, ServiceFormConfig>> = {
  'clinica-humana': {
    note: 'Traé el pedido médico físico el día del turno.',
    extraFields: [
      { key: 'fechaNacimiento', label: 'Fecha de nacimiento *', type: 'date', required: true },
      {
        key: 'obraSocial',
        label: 'Obra social',
        type: 'text',
        required: false,
        placeholder: 'OSDE, PAMI, Particular…',
      },
      {
        key: 'medicoSolicitante',
        label: 'Médico solicitante (matrícula MP o MN)',
        type: 'text',
        required: false,
        placeholder: 'Dr. García · MP 12345',
      },
      // Sub-form: Urocultivo
      {
        key: '_urocultivoToggle',
        label: '¿El pedido incluye Urocultivo?',
        type: 'checkbox',
        required: false,
        triggersSection: 'urocultivo',
      },
      {
        key: 'uro_fechaRecoleccion',
        label: 'Fecha de recolección *',
        type: 'date',
        required: true,
        section: 'urocultivo',
      },
      {
        key: 'uro_horaRecoleccion',
        label: 'Hora de recolección *',
        type: 'time',
        required: true,
        section: 'urocultivo',
      },
      {
        key: 'uro_tipoMuestra',
        label: 'Tipo de muestra',
        type: 'select',
        required: false,
        section: 'urocultivo',
        options: ['Chorro medio', 'Sonda', 'Punción suprapúbica'],
      },
      {
        key: 'uro_sintomas',
        label: 'Síntomas *',
        type: 'textarea',
        required: true,
        section: 'urocultivo',
        placeholder: 'Describirlos brevemente',
      },
      {
        key: 'uro_embarazo',
        label: 'Embarazo',
        type: 'text',
        required: false,
        section: 'urocultivo',
        placeholder: 'No / Sí, X semanas',
      },
      {
        key: 'uro_antibioticos',
        label: 'Antibióticos previos (cuál y desde cuándo) *',
        type: 'textarea',
        required: true,
        section: 'urocultivo',
        placeholder: 'Ninguno / Ciprofloxacina 500mg desde hace 3 días',
      },
      {
        key: 'uro_patologiaBase',
        label: 'Patología de base *',
        type: 'text',
        required: true,
        section: 'urocultivo',
        placeholder: 'Diabetes, HTA, ninguna…',
      },
      // Sub-form: Exudado Vaginal
      {
        key: '_exudadoToggle',
        label: '¿El pedido incluye Exudado Vaginal?',
        type: 'checkbox',
        required: false,
        triggersSection: 'exudado',
      },
      {
        key: 'exu_edad',
        label: 'Edad *',
        type: 'number',
        required: true,
        section: 'exudado',
        placeholder: '35',
      },
      {
        key: 'exu_ultimaMenstruacion',
        label: 'Fecha de última menstruación *',
        type: 'date',
        required: true,
        section: 'exudado',
      },
      {
        key: 'exu_sintomas',
        label: 'Síntomas *',
        type: 'textarea',
        required: true,
        section: 'exudado',
        placeholder: 'Picazón, ardor, flujo anormal…',
      },
      {
        key: 'exu_embarazos',
        label: 'Embarazos (cantidad) *',
        type: 'text',
        required: true,
        section: 'exudado',
        placeholder: 'Ninguno / 2',
      },
      {
        key: 'exu_caracteristicasFlujo',
        label: 'Características del flujo *',
        type: 'textarea',
        required: true,
        section: 'exudado',
        placeholder: 'Color, consistencia, olor…',
      },
      {
        key: 'exu_anticonceptivos',
        label: 'Uso de anticonceptivos *',
        type: 'text',
        required: true,
        section: 'exudado',
        placeholder: 'No / DIU, pastillas, inyectable…',
      },
      {
        key: 'exu_antecedentesInfecciones',
        label: 'Antecedentes de infecciones vaginales *',
        type: 'text',
        required: true,
        section: 'exudado',
        placeholder: 'No / Candidiasis recurrente…',
      },
      {
        key: 'exu_antecedentesAbortos',
        label: 'Antecedente de abortos (indicar cantidad) *',
        type: 'text',
        required: true,
        section: 'exudado',
        placeholder: 'Ninguno / 1',
      },
    ],
  },

  veterinaria: {
    baseLabels: {
      patientName: 'Nombre del propietario *',
      patientDni: 'DNI / CUIT del propietario *',
    },
    extraFields: [
      { key: 'nombreAnimal', label: 'Nombre del animal *', type: 'text', required: true },
      {
        key: 'especie',
        label: 'Especie *',
        type: 'text',
        required: true,
        placeholder: 'Perro, gato, bovino…',
      },
      { key: 'raza', label: 'Raza *', type: 'text', required: true },
      {
        key: 'edadAnimal',
        label: 'Edad del animal *',
        type: 'text',
        required: true,
        placeholder: '2 años / 6 meses',
      },
      {
        key: 'veterinarioSolicitante',
        label: 'Veterinario solicitante *',
        type: 'text',
        required: true,
      },
      {
        key: 'tipoMuestra',
        label: 'Tipo de muestra *',
        type: 'text',
        required: true,
        placeholder: 'Sangre, orina, materia fecal…',
      },
      { key: 'fechaToma', label: 'Fecha de toma *', type: 'date', required: true },
      { key: 'observaciones', label: 'Observaciones', type: 'textarea', required: false },
    ],
  },

  'agro-alimentos': {
    baseLabels: {
      patientName: 'Nombre / Razón social *',
      patientDni: 'CUIT *',
    },
    extraFields: [
      { key: 'tipoProducto', label: 'Tipo de producto *', type: 'text', required: true },
      { key: 'lote', label: 'Lote', type: 'text', required: false },
      { key: 'fechaElaboracion', label: 'Fecha de elaboración', type: 'date', required: false },
      {
        key: 'tipoAnalisis',
        label: 'Tipo de análisis solicitado *',
        type: 'textarea',
        required: true,
        placeholder: 'Microbiológico, fisicoquímico, composición…',
      },
      {
        key: 'cantidadMuestra',
        label: 'Cantidad de muestra *',
        type: 'text',
        required: true,
        placeholder: '500 g, 1 L…',
      },
      { key: 'fechaToma', label: 'Fecha de toma *', type: 'date', required: true },
      { key: 'lugarOrigen', label: 'Lugar de origen', type: 'text', required: false },
      { key: 'observaciones', label: 'Observaciones', type: 'textarea', required: false },
    ],
  },

  ambiental: {
    baseLabels: {
      patientName: 'Nombre / Razón social *',
      patientDni: 'CUIT *',
    },
    extraFields: [
      {
        key: 'tipoMuestra',
        label: 'Tipo de muestra *',
        type: 'text',
        required: true,
        placeholder: 'Agua potable, efluente, agua superficial…',
      },
      {
        key: 'puntoMuestreo',
        label: 'Punto de muestreo *',
        type: 'text',
        required: true,
        placeholder: 'Pozo nº 3, descarga final…',
      },
      {
        key: 'ubicacion',
        label: 'Ubicación *',
        type: 'text',
        required: true,
        placeholder: 'Establecimiento / dirección',
      },
      { key: 'fechaToma', label: 'Fecha de toma *', type: 'date', required: true },
      { key: 'horaToma', label: 'Hora de toma', type: 'time', required: false },
      {
        key: 'tipoAnalisis',
        label: 'Tipo de análisis solicitado *',
        type: 'textarea',
        required: true,
        placeholder: 'Bacteriológico, fisicoquímico, metales pesados…',
      },
      {
        key: 'responsableToma',
        label: 'Responsable de la toma',
        type: 'text',
        required: false,
      },
      { key: 'observaciones', label: 'Observaciones', type: 'textarea', required: false },
    ],
  },

  genetica: {
    extraFields: [
      {
        key: 'tipoEstudio',
        label: 'Tipo de estudio genético *',
        type: 'text',
        required: true,
        placeholder: 'Paternidad, HLA, filiación…',
      },
      {
        key: 'motivoEstudio',
        label: 'Motivo del estudio *',
        type: 'textarea',
        required: true,
        placeholder: 'Describir brevemente el motivo',
      },
      {
        key: 'detalleEstudio',
        label: 'Detalle del estudio solicitado *',
        type: 'textarea',
        required: true,
        placeholder: 'Especificar qué marcadores, panel o tipo de análisis',
      },
      { key: 'cantidadMuestras', label: 'Cantidad de muestras *', type: 'number', required: true },
      { key: 'fechaToma', label: 'Fecha de toma *', type: 'date', required: true },
      {
        key: 'razaEtnica',
        label: 'Raza / Origen étnico *',
        type: 'text',
        required: true,
        placeholder: 'Caucásico, hispano, afroamericano…',
        helperText: 'Necesario para estudios de HLA y tipificación molecular',
      },
      {
        key: 'relacionMuestras',
        label: 'Relación entre muestras (si aplica)',
        type: 'text',
        required: false,
        placeholder: 'Padre-hijo, hermanos…',
      },
      {
        key: 'profesionalSolicitante',
        label: 'Profesional solicitante',
        type: 'text',
        required: false,
      },
      {
        key: 'estadoEnfermedad',
        label: 'Estado de la enfermedad',
        type: 'text',
        required: false,
        placeholder: 'En tratamiento / remisión / no aplica',
      },
      {
        key: 'transplanteMedula',
        label: 'Trasplante de médula ósea',
        type: 'text',
        required: false,
        placeholder: 'No / Sí — fecha aprox.',
      },
      {
        key: 'estudiosPrevios',
        label: 'Estudios genéticos previos',
        type: 'text',
        required: false,
        placeholder: 'No / Sí — indicar cuáles',
      },
      { key: 'observaciones', label: 'Observaciones', type: 'textarea', required: false },
    ],
  },

  // medicina-regenerativa: formulario en blanco en el PDF → solo campos base
}

// ---------------------------------------------------------------------------
//  Builder de schema Zod para los campos extra
// ---------------------------------------------------------------------------

/**
 * Genera la extensión de schema Zod para los campos extra de un servicio.
 * Los campos de sección condicional son opcionales en el tipo base;
 * la validación condicional se hace vía superRefine.
 */
export function buildExtraSchema(serviceSlug: string) {
  const config = SERVICE_FORM_CONFIGS[serviceSlug]
  if (!config) return z.object({})

  const shape: Record<string, z.ZodTypeAny> = {}
  const requiredOutsideSection: string[] = []
  const sections: Map<string, string[]> = new Map()

  for (const field of config.extraFields) {
    if (field.type === 'checkbox') {
      shape[field.key] = z.boolean().optional()
    } else {
      // All fields optional at type level; superRefine handles required logic
      shape[field.key] = z.string().optional()
    }

    if (!field.section && field.required && field.type !== 'checkbox') {
      requiredOutsideSection.push(field.key)
    }

    if (field.section && field.required) {
      if (!sections.has(field.section)) sections.set(field.section, [])
      sections.get(field.section)!.push(field.key)
    }
  }

  // Find trigger key for each section
  const triggerKeys: Map<string, string> = new Map()
  for (const field of config.extraFields) {
    if (field.triggersSection) {
      triggerKeys.set(field.triggersSection, field.key)
    }
  }

  return z
    .object(shape)
    .superRefine((data, ctx) => {
      // Always-required extra fields
      for (const key of requiredOutsideSection) {
        const val = data[key as keyof typeof data]
        if (!val || String(val).trim() === '') {
          ctx.addIssue({ code: 'custom', path: [key], message: 'Campo requerido' })
        }
      }
      // Conditional section fields
      for (const [sectionKey, fieldKeys] of sections.entries()) {
        const triggerKey = triggerKeys.get(sectionKey)
        const isActive = triggerKey ? !!data[triggerKey as keyof typeof data] : true
        if (isActive) {
          for (const key of fieldKeys) {
            const val = data[key as keyof typeof data]
            if (!val || String(val).trim() === '') {
              ctx.addIssue({ code: 'custom', path: [key], message: 'Campo requerido' })
            }
          }
        }
      }
    })
}
