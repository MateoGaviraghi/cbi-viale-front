'use client'

import * as React from 'react'
import { Upload, FileCheck, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  MEDICAL_ORDER_ACCEPT,
  MEDICAL_ORDER_ALLOWED_EXT,
  MEDICAL_ORDER_MAX_BYTES,
  MedicalOrderValidationError,
  uploadMedicalOrder,
  validateMedicalOrderFile,
} from '@/lib/cloudinary-upload'
import { Field } from './Field'

type State =
  | { status: 'idle' }
  | { status: 'uploading'; file: File }
  | { status: 'done'; file: File; url: string }
  | { status: 'error'; message: string; file?: File }

interface Props {
  /** URL ya cargada (controlled mode). Si está seteada, muestra el archivo subido. */
  value?: string
  /** Callback cuando el upload termina (URL Cloudinary lista para enviar al back). */
  onUploaded: (url: string) => void
  /** Callback cuando se borra. */
  onCleared?: () => void
  /** Error externo (validación del form parent). */
  error?: string
  /** Override label. */
  label?: string
  required?: boolean
}

/**
 * Input de archivo + upload directo a Cloudinary para el formulario Clínica Humana.
 *
 * Maneja todo el flow: validación cliente → POST sign al back → POST multipart a Cloudinary.
 * Comunica al parent solo el secure_url final vía `onUploaded`.
 */
export function MedicalOrderUpload({
  value,
  onUploaded,
  onCleared,
  error,
  label = 'Foto del pedido médico',
  required = true,
}: Props) {
  const [state, setState] = React.useState<State>(
    value ? { status: 'done', file: new File([], 'pedido-medico'), url: value } : { status: 'idle' },
  )
  const inputRef = React.useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    try {
      validateMedicalOrderFile(file)
    } catch (err) {
      const message =
        err instanceof MedicalOrderValidationError
          ? err.message
          : 'No pudimos procesar el archivo'
      setState({ status: 'error', message, file })
      return
    }

    setState({ status: 'uploading', file })

    try {
      const url = await uploadMedicalOrder(file)
      setState({ status: 'done', file, url })
      onUploaded(url)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Error subiendo el pedido médico'
      setState({ status: 'error', message, file })
    }
  }

  function clear() {
    setState({ status: 'idle' })
    if (inputRef.current) inputRef.current.value = ''
    onCleared?.()
  }

  const sizeMb = (state.status !== 'idle' && state.file ? state.file.size / 1024 / 1024 : 0).toFixed(
    2,
  )

  return (
    <Field
      label={label}
      required={required}
      error={error ?? (state.status === 'error' ? state.message : undefined)}
      hint={
        state.status === 'idle'
          ? `JPG, PNG, PDF, WEBP o HEIC · máx ${MEDICAL_ORDER_MAX_BYTES / 1024 / 1024} MB`
          : undefined
      }
    >
      <input
        ref={inputRef}
        type="file"
        accept={MEDICAL_ORDER_ACCEPT}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) void handleFile(file)
        }}
      />

      {state.status === 'idle' && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'tap-min flex w-full items-center justify-center gap-3 border border-dashed border-line',
            'bg-beige/30 px-4 py-6 text-sm text-ink-muted hover:border-gold-700 hover:text-gold-700',
            'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-gold-700 focus-visible:ring-offset-2',
          )}
        >
          <Upload size={18} />
          <span className="uppercase tracking-widest text-[11px]">
            Seleccionar archivo
          </span>
        </button>
      )}

      {state.status === 'uploading' && (
        <div className="flex items-center gap-3 border border-line bg-white px-4 py-3 text-sm text-ink-muted">
          <Loader2 size={18} className="animate-spin text-gold-700" />
          <span className="flex-1 truncate">Subiendo {state.file.name}…</span>
        </div>
      )}

      {state.status === 'done' && (
        <div className="flex items-center gap-3 border border-gold-700 bg-white px-4 py-3 text-sm text-ink">
          <FileCheck size={18} className="text-gold-700 shrink-0" />
          <span className="flex-1 truncate">
            {state.file.name === 'pedido-medico'
              ? 'Pedido médico cargado'
              : `${state.file.name} · ${sizeMb} MB`}
          </span>
          <button
            type="button"
            onClick={clear}
            aria-label="Quitar archivo"
            className="shrink-0 text-ink-muted hover:text-ink transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {state.status === 'error' && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              'tap-min flex w-full items-center justify-center gap-3 border border-dashed border-red-400',
              'bg-red-50/50 px-4 py-6 text-sm text-red-500 hover:border-red-500',
              'transition-colors duration-200',
            )}
          >
            <Upload size={18} />
            <span className="uppercase tracking-widest text-[11px]">Intentar otra vez</span>
          </button>
        </div>
      )}
    </Field>
  )
}

// Re-export para que el form parent pueda mostrar la lista de extensiones si quiere
export { MEDICAL_ORDER_ALLOWED_EXT, MEDICAL_ORDER_MAX_BYTES }
