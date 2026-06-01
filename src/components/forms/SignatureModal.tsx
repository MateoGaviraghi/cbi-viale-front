'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import SignaturePad from 'signature_pad'
import { X, Eraser, Loader2, PenLine } from 'lucide-react'
import { cn } from '@/lib/utils'
import { uploadSignature, SignatureUploadError } from '@/lib/signature-upload'

/** Texto legal — el mismo que va embebido en el PDF del back. */
const CONSENT_LEGAL_TEXT =
  'Declaro que la información brindada es correcta y autorizo al Centro Bioquímico Integral a utilizar los datos y muestras proporcionadas para fines analíticos, diagnósticos y de control de calidad, conforme a las condiciones e indicaciones del laboratorio.'

const CONSENT_FINE_PRINT =
  'Al continuar, usted acepta las condiciones generales del laboratorio.'

/**
 * Alto del recuadro de firma en px (CSS). Generoso para firmar cómodo con el
 * dedo o el mouse; el buffer del canvas se escala por DPR en resizeCanvas.
 * Una sola fuente de verdad: el style del canvas y resizeCanvas la comparten,
 * así no se desincronizan (alto CSS ≠ alto del buffer deforma el trazo).
 */
const CANVAS_HEIGHT = 360

type Status = 'idle' | 'uploading' | 'error'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Se llama con el secure_url de Cloudinary cuando la firma se subió OK. */
  onConfirmed: (url: string) => void
  /** Título del modal — opcional, default genérico. */
  title?: string
}

export function SignatureModal({
  open,
  onOpenChange,
  onConfirmed,
  title = 'Firma del consentimiento',
}: Props) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)
  const padRef = React.useRef<SignaturePad | null>(null)
  const [status, setStatus] = React.useState<Status>('idle')
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const [hasStrokes, setHasStrokes] = React.useState(false)

  // ── Inicializar / destruir el pad cuando el modal abre/cierra ──
  React.useEffect(() => {
    if (!open) return
    // Esperar un tick para que el canvas esté montado y con tamaño real.
    const id = requestAnimationFrame(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      resizeCanvas(canvas)
      const pad = new SignaturePad(canvas, {
        penColor: '#1A1A1A', // ink
        backgroundColor: 'rgba(255,255,255,1)', // fondo blanco => PNG no transparente
        minWidth: 0.8,
        maxWidth: 2.2,
      })
      pad.addEventListener('endStroke', () => setHasStrokes(!pad.isEmpty()))
      padRef.current = pad
    })

    const onResize = () => {
      const canvas = canvasRef.current
      const pad = padRef.current
      if (!canvas || !pad) return
      const data = pad.toData()
      resizeCanvas(canvas)
      pad.clear()
      pad.fromData(data)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', onResize)
      padRef.current?.off()
      padRef.current = null
      setStatus('idle')
      setErrorMsg(null)
      setHasStrokes(false)
    }
  }, [open])

  function clear() {
    padRef.current?.clear()
    setHasStrokes(false)
    setStatus('idle')
    setErrorMsg(null)
  }

  async function confirm() {
    const pad = padRef.current
    if (!pad || pad.isEmpty()) {
      setStatus('error')
      setErrorMsg('Firmá en el recuadro antes de confirmar.')
      return
    }

    setStatus('uploading')
    setErrorMsg(null)

    // Canvas → Blob PNG
    const canvas = canvasRef.current
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas ? canvas.toBlob((b) => resolve(b), 'image/png') : resolve(null),
    )
    if (!blob) {
      setStatus('error')
      setErrorMsg('No pudimos generar la imagen de la firma. Probá de nuevo.')
      return
    }

    try {
      const url = await uploadSignature(blob)
      onConfirmed(url)
      onOpenChange(false)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof SignatureUploadError
          ? err.message
          : 'No pudimos subir la firma. Revisá tu conexión e intentá otra vez.',
      )
    }
  }

  const isUploading = status === 'uploading'

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        // Bloquear cierre durante el upload.
        if (isUploading) return
        onOpenChange(next)
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] animate-in fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white border border-line shadow-2xl focus:outline-none animate-in fade-in-0 zoom-in-95"
          onEscapeKeyDown={(e) => {
            if (isUploading) e.preventDefault()
          }}
          onPointerDownOutside={(e) => {
            if (isUploading) e.preventDefault()
          }}
          onInteractOutside={(e) => {
            if (isUploading) e.preventDefault()
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-line px-7 py-6">
            <div className="flex items-center gap-3">
              <PenLine size={18} className="text-gold-700 shrink-0" strokeWidth={1.5} />
              <Dialog.Title className="font-serif text-xl tracking-tight text-ink">
                {title}
              </Dialog.Title>
            </div>
            <Dialog.Close
              disabled={isUploading}
              className="ml-4 shrink-0 text-ink-muted hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
            >
              <X width={18} height={18} strokeWidth={1.5} aria-hidden />
              <span className="sr-only">Cerrar</span>
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="px-7 py-6 space-y-5">
            {/* Texto legal */}
            <div className="border-l-2 border-gold-700/40 pl-4">
              <Dialog.Description className="font-sans text-base leading-relaxed text-ink">
                {CONSENT_LEGAL_TEXT}
              </Dialog.Description>
              <p className="mt-2 font-sans text-sm text-ink-muted">{CONSENT_FINE_PRINT}</p>
            </div>

            {/* Canvas */}
            <div>
              <span className="block text-[11px] uppercase tracking-widest text-ink-muted mb-2">
                Firmá en el recuadro
              </span>
              <div
                className={cn(
                  'relative w-full border bg-white',
                  status === 'error' ? 'border-danger' : 'border-line',
                )}
              >
                <canvas
                  ref={canvasRef}
                  className="block w-full touch-none"
                  style={{ height: CANVAS_HEIGHT }}
                  aria-label="Recuadro de firma"
                />
                {!hasStrokes && status !== 'uploading' && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-ink-muted/50"
                  >
                    Firmá acá con el dedo o el mouse
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={clear}
                  disabled={isUploading}
                  className="inline-flex min-h-[44px] items-center gap-2 text-xs uppercase tracking-widest text-ink-muted hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
                >
                  <Eraser size={14} strokeWidth={1.5} />
                  Borrar
                </button>
              </div>
            </div>

            {errorMsg && (
              <p role="alert" className="text-xs text-danger">
                {errorMsg}
              </p>
            )}

            {/* Acciones */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={isUploading}
                className="tap-min inline-flex h-12 items-center justify-center border border-ink px-7 font-sans text-xs uppercase tracking-wide text-ink hover:bg-ink hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={isUploading || !hasStrokes}
                className="tap-min inline-flex h-12 items-center justify-center gap-2 bg-gold-700 px-7 font-sans text-xs uppercase tracking-wide text-white hover:bg-gold-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Subiendo firma…
                  </>
                ) : (
                  'Confirmar firma'
                )}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** Ajusta el canvas al DPR del dispositivo para trazos nítidos. */
function resizeCanvas(canvas: HTMLCanvasElement) {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  const rect = canvas.getBoundingClientRect()
  const width = rect.width || canvas.offsetWidth || 480
  canvas.width = width * ratio
  canvas.height = CANVAS_HEIGHT * ratio
  const ctx = canvas.getContext('2d')
  ctx?.scale(ratio, ratio)
}
