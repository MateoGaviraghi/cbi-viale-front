'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { AdminDialog } from '@/components/admin/AdminDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Appointment, AppointmentStatus } from '@/lib/api/types'

const STATUS_OPTS: { value: AppointmentStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pendiente' },
  { value: 'CONFIRMED', label: 'Confirmado' },
  { value: 'COMPLETED', label: 'Completado' },
  { value: 'CANCELLED', label: 'Cancelado' },
  { value: 'NO_SHOW', label: 'Ausente' },
]

const STATUS_CLASS: Record<AppointmentStatus, string> = {
  PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
  CONFIRMED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CANCELLED: 'bg-red-50 text-red-600 border-red-200',
  COMPLETED: 'bg-beige text-ink-muted border-line',
  NO_SHOW: 'bg-zinc-50 text-zinc-500 border-zinc-200',
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

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmado',
  CANCELLED: 'Cancelado',
  COMPLETED: 'Completado',
  NO_SHOW: 'Ausente',
}

interface Props {
  appointment: Appointment
}

export function AppointmentRow({ appointment: t }: Props) {
  const statusLabel = STATUS_LABEL
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<AppointmentStatus>(t.status)
  const [notes, setNotes] = useState(t.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await api.admin.updateAppointment(t.id, { status, notes: notes || undefined })
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
        <div className="space-y-1">
          <p className="font-serif text-base text-ink leading-tight">{t.patientName}</p>
          <p className="font-sans text-xs text-ink-muted">DNI {t.patientDni}</p>
          <p className="font-sans text-xs text-ink-muted">
            {t.patientEmail} · {t.patientPhone}
          </p>
          {t.notes && (
            <p className="font-sans text-xs text-ink-soft italic mt-1">{t.notes}</p>
          )}
        </div>
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <p className="font-sans text-sm text-ink">{formatDate(t.date)}</p>
          <div className="flex items-center gap-2">
            <span
              className={`border px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest ${STATUS_CLASS[t.status]}`}
            >
              {statusLabel[t.status]}
            </span>
            <button
              onClick={() => setOpen(true)}
              className="tap-min inline-flex items-center justify-center h-7 w-7 border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors"
              aria-label={`Editar turno de ${t.patientName}`}
            >
              <Pencil width={12} height={12} strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <p className="font-sans text-[10px] uppercase tracking-widest text-ink-soft">
            {t.serviceId}
          </p>
        </div>
      </div>

      <AdminDialog
        open={open}
        onOpenChange={setOpen}
        title="Editar turno"
        description={`${t.patientName} · ${formatDate(t.date)}`}
      >
        <div className="space-y-5">
          <div>
            <Label htmlFor={`status-${t.id}`}>Estado</Label>
            <select
              id={`status-${t.id}`}
              value={status}
              onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
              className="mt-1.5 w-full h-12 border border-line bg-white px-3 font-sans text-sm text-ink focus:outline-none focus:ring-2 focus:ring-gold-700 focus:ring-offset-1"
            >
              {STATUS_OPTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor={`notes-${t.id}`}>Notas internas</Label>
            <Textarea
              id={`notes-${t.id}`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Observaciones, indicaciones, aclaraciones…"
              className="mt-1.5"
            />
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
