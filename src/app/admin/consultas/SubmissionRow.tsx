'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { AdminDialog } from '@/components/admin/AdminDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { FormSubmission, FormStatus, FormType } from '@/lib/api/types'

const STATUS_OPTS: { value: FormStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'ANSWERED', label: 'Respondido' },
  { value: 'ARCHIVED', label: 'Archivado' },
]

const STATUS_CLASS: Record<FormStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  ANSWERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ARCHIVED: 'bg-beige text-ink-muted border-line',
}

const STATUS_LABEL: Record<FormStatus, string> = {
  PENDING: 'Pendiente',
  ANSWERED: 'Respondido',
  ARCHIVED: 'Archivado',
}

const TYPE_LABEL: Record<FormType, string> = {
  CONTACT_GENERAL: 'Contacto',
  SERVICE_INQUIRY: 'Consulta de servicio',
  CONSENT: 'Consentimiento',
  CUSTOM: 'Personalizado',
  CLINICAL: 'Clínica humana',
  UROCULTURE: 'Urocultivo',
  VAGINAL_EXUDATE: 'Exudado vaginal',
  VETERINARY: 'Veterinaria',
  AGRO_FOOD: 'Agro-alimentos',
  ENVIRONMENTAL: 'Ambiental',
  GENETIC: 'Genética',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Argentina/Buenos_Aires',
  })
}

interface Props {
  submission: FormSubmission
}

export function SubmissionRow({ submission: c }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<FormStatus>(c.status)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await api.admin.updateSubmission(c.id, { status })
      setOpen(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Error al guardar. Intentá de nuevo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-serif text-base text-ink leading-tight">{c.name}</p>
            <span
              className={`border px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest ${STATUS_CLASS[c.status]}`}
            >
              {STATUS_LABEL[c.status]}
            </span>
          </div>
          <p className="font-sans text-xs text-ink-muted">
            {c.email}
            {c.phone ? ` · ${c.phone}` : ''}
          </p>
          {c.subject && <p className="font-sans text-sm text-ink mt-1">{c.subject}</p>}
          {c.message && (
            <p className="font-sans text-xs text-ink-muted leading-relaxed mt-1 line-clamp-2">
              {c.message}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <p className="font-sans text-xs text-ink-muted">{formatDate(c.createdAt)}</p>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
              {TYPE_LABEL[c.type]}
            </span>
            <button
              onClick={() => setOpen(true)}
              className="tap-min inline-flex items-center justify-center h-7 w-7 border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors"
              aria-label={`Editar consulta de ${c.name}`}
            >
              <Pencil width={12} height={12} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <AdminDialog
        open={open}
        onOpenChange={setOpen}
        title="Editar consulta"
        description={`${c.name} · ${TYPE_LABEL[c.type]} · ${formatDate(c.createdAt)}`}
      >
        <div className="space-y-5">
          {/* Detalle completo de la consulta */}
          {c.message && (
            <div className="bg-beige/40 border border-line px-4 py-3">
              <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-2">
                Mensaje
              </p>
              <p className="text-sm text-ink leading-relaxed">{c.message}</p>
            </div>
          )}

          {c.extraData && Object.keys(c.extraData).length > 0 && (
            <div className="bg-beige/40 border border-line px-4 py-3">
              <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-2">
                Datos adicionales
              </p>
              <dl className="space-y-1">
                {Object.entries(c.extraData).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-xs">
                    <dt className="text-ink-muted shrink-0 capitalize">{k}:</dt>
                    <dd className="text-ink">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div>
            <Label htmlFor={`status-${c.id}`}>Estado</Label>
            <select
              id={`status-${c.id}`}
              value={status}
              onChange={(e) => setStatus(e.target.value as FormStatus)}
              className="mt-1.5 w-full h-12 border border-line bg-white px-3 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-1"
            >
              {STATUS_OPTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="border border-danger/40 bg-danger/5 text-danger px-4 py-3 text-xs">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar cambios'}
            </Button>
          </div>
        </div>
      </AdminDialog>
    </>
  )
}
