'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Clock, Ban, Trash2 } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import { AdminDialog } from '@/components/admin/AdminDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { AvailabilityRule, BlockedDate, Weekday } from '@/lib/api/types'

interface ServiceLite {
  id: string
  name: string
}

const WEEKDAYS: { value: Weekday; label: string }[] = [
  { value: 'MONDAY', label: 'Lunes' },
  { value: 'TUESDAY', label: 'Martes' },
  { value: 'WEDNESDAY', label: 'Miércoles' },
  { value: 'THURSDAY', label: 'Jueves' },
  { value: 'FRIDAY', label: 'Viernes' },
  { value: 'SATURDAY', label: 'Sábado' },
  { value: 'SUNDAY', label: 'Domingo' },
]
const WEEKDAY_LABEL = Object.fromEntries(WEEKDAYS.map((w) => [w.value, w.label])) as Record<
  Weekday,
  string
>
const WEEKDAY_ORDER = Object.fromEntries(WEEKDAYS.map((w, i) => [w.value, i])) as Record<
  Weekday,
  number
>

const inputCls =
  'mt-1.5 w-full h-12 border border-line bg-white px-3 font-sans text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1'

const AR_TZ = 'America/Argentina/Buenos_Aires'

/** ISO → "YYYY-MM-DD" (en zona AR) para <input type="date">. */
function toDateInput(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: AR_TZ })
}
/** "YYYY-MM-DD" → ISO del inicio/fin de ese día en AR (-03:00). */
function dayStartISO(d: string): string {
  return new Date(`${d}T00:00:00-03:00`).toISOString()
}
function dayEndISO(d: string): string {
  return new Date(`${d}T23:59:59-03:00`).toISOString()
}
function formatRange(startIso: string, endIso: string): string {
  const opts: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: AR_TZ,
  }
  const a = new Date(startIso).toLocaleDateString('es-AR', opts)
  const b = new Date(endIso).toLocaleDateString('es-AR', opts)
  return a === b ? a : `${a} → ${b}`
}

interface Props {
  services: ServiceLite[]
  initialRules: AvailabilityRule[]
  initialBlocked: BlockedDate[]
}

export function AvailabilityManager({ services, initialRules, initialBlocked }: Props) {
  // undefined = dialog cerrado · null = crear nuevo · objeto = editar
  const [ruleDialog, setRuleDialog] = useState<AvailabilityRule | null | undefined>(undefined)
  const [blockDialog, setBlockDialog] = useState<BlockedDate | null | undefined>(undefined)

  const serviceName = (id: string | null) =>
    id ? (services.find((s) => s.id === id)?.name ?? 'Servicio') : 'Todos los servicios'

  const rules = [...initialRules].sort(
    (a, b) =>
      WEEKDAY_ORDER[a.weekday] - WEEKDAY_ORDER[b.weekday] || a.startTime.localeCompare(b.startTime),
  )
  const blocked = [...initialBlocked].sort((a, b) => a.startDate.localeCompare(b.startDate))

  return (
    <div className="space-y-14">
      {/* ── Horarios de atención ── */}
      <section>
        <header className="flex items-center justify-between border-b border-line pb-3 mb-5">
          <div className="flex items-center gap-3">
            <Clock width={18} className="text-gold-700" strokeWidth={1.5} aria-hidden />
            <h2 className="font-serif text-2xl text-ink">Horarios de atención</h2>
          </div>
          <Button type="button" variant="primary" size="sm" onClick={() => setRuleDialog(null)}>
            <Plus width={14} height={14} strokeWidth={2} aria-hidden />
            Agregar horario
          </Button>
        </header>

        {rules.length === 0 ? (
          <p className="text-sm text-ink-muted py-6">
            Todavía no hay horarios cargados. Agregá el primero para habilitar reservas.
          </p>
        ) : (
          <div className="border border-line divide-y divide-line">
            {rules.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="w-24 shrink-0 font-sans text-[11px] uppercase tracking-widest text-gold-800">
                    {WEEKDAY_LABEL[r.weekday]}
                  </span>
                  <span className="shrink-0 font-mono text-sm text-ink">
                    {r.startTime}–{r.endTime}
                  </span>
                  <span className="truncate text-sm text-ink-muted">{serviceName(r.serviceId)}</span>
                  {!r.active && (
                    <span className="shrink-0 border border-line bg-beige px-2 py-0.5 text-[10px] uppercase tracking-widest text-ink-muted">
                      Inactiva
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setRuleDialog(r)}
                  className="tap-min inline-flex h-8 w-8 shrink-0 items-center justify-center border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                  aria-label={`Editar horario de ${WEEKDAY_LABEL[r.weekday]} ${r.startTime}`}
                >
                  <Pencil width={13} height={13} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Bloqueos de fechas ── */}
      <section>
        <header className="flex items-center justify-between border-b border-line pb-3 mb-5">
          <div className="flex items-center gap-3">
            <Ban width={18} className="text-gold-700" strokeWidth={1.5} aria-hidden />
            <h2 className="font-serif text-2xl text-ink">Bloqueos de fechas</h2>
          </div>
          <Button type="button" variant="primary" size="sm" onClick={() => setBlockDialog(null)}>
            <Plus width={14} height={14} strokeWidth={2} aria-hidden />
            Agregar bloqueo
          </Button>
        </header>

        {blocked.length === 0 ? (
          <p className="text-sm text-ink-muted py-6">
            No hay fechas bloqueadas. Agregá feriados o períodos de vacaciones cuando los necesites.
          </p>
        ) : (
          <div className="border border-line divide-y divide-line">
            {blocked.map((b) => (
              <div key={b.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="shrink-0 font-mono text-sm text-ink">
                    {formatRange(b.startDate, b.endDate)}
                  </span>
                  <span className="truncate text-sm text-ink-muted">
                    {b.reason || 'Sin motivo'} · {serviceName(b.serviceId)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBlockDialog(b)}
                  className="tap-min inline-flex h-8 w-8 shrink-0 items-center justify-center border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                  aria-label="Editar bloqueo"
                >
                  <Pencil width={13} height={13} strokeWidth={1.5} aria-hidden />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {ruleDialog !== undefined && (
        <RuleDialog rule={ruleDialog} services={services} onClose={() => setRuleDialog(undefined)} />
      )}
      {blockDialog !== undefined && (
        <BlockDialog
          block={blockDialog}
          services={services}
          onClose={() => setBlockDialog(undefined)}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/*  Dialog de regla de horario                                               */
/* ------------------------------------------------------------------------- */

function RuleDialog({
  rule,
  services,
  onClose,
}: {
  rule: AvailabilityRule | null
  services: ServiceLite[]
  onClose: () => void
}) {
  const router = useRouter()
  const [weekday, setWeekday] = useState<Weekday>(rule?.weekday ?? 'MONDAY')
  const [startTime, setStartTime] = useState(rule?.startTime ?? '08:00')
  const [endTime, setEndTime] = useState(rule?.endTime ?? '12:00')
  const [serviceId, setServiceId] = useState<string>(rule?.serviceId ?? '')
  const [active, setActive] = useState(rule?.active ?? true)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (endTime <= startTime) {
      setError('La hora de fin debe ser mayor que la de inicio.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const dto = { weekday, startTime, endTime, serviceId: serviceId || null, active }
      if (rule) await api.availability.updateRule(rule.id, dto)
      else await api.availability.createRule(dto)
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos guardar. Revisá los datos.')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!rule) return
    setSaving(true)
    setError(null)
    try {
      await api.availability.deleteRule(rule.id)
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos eliminar.')
      setSaving(false)
    }
  }

  return (
    <AdminDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={rule ? 'Editar horario' : 'Nuevo horario'}
      description="Día de la semana, rango horario y servicio (o todos)."
    >
      <div className="space-y-5">
        <div>
          <Label htmlFor="rule-weekday">Día</Label>
          <select
            id="rule-weekday"
            value={weekday}
            onChange={(e) => setWeekday(e.target.value as Weekday)}
            className={inputCls}
          >
            {WEEKDAYS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rule-start">Desde</Label>
            <input
              id="rule-start"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <Label htmlFor="rule-end">Hasta</Label>
            <input
              id="rule-end"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="rule-service">Servicio</Label>
          <select
            id="rule-service"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className={inputCls}
          >
            <option value="">Todos los servicios</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            className="h-5 w-5 shrink-0 accent-gold-700 border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
          />
          <span className="text-sm text-ink">Activa (visible en el calendario de reservas)</span>
        </label>

        {error && (
          <p role="alert" className="border border-danger/40 bg-danger/5 text-danger px-4 py-3 text-xs">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          {rule ? (
            confirmDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-danger hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <Trash2 width={13} height={13} strokeWidth={1.5} aria-hidden />
                Confirmar baja
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink-muted hover:text-danger transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <Trash2 width={13} height={13} strokeWidth={1.5} aria-hidden />
                Eliminar
              </button>
            )
          ) : (
            <span />
          )}
          <div className="flex gap-3">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>
    </AdminDialog>
  )
}

/* ------------------------------------------------------------------------- */
/*  Dialog de bloqueo de fechas                                              */
/* ------------------------------------------------------------------------- */

function BlockDialog({
  block,
  services,
  onClose,
}: {
  block: BlockedDate | null
  services: ServiceLite[]
  onClose: () => void
}) {
  const router = useRouter()
  const [from, setFrom] = useState(block ? toDateInput(block.startDate) : '')
  const [to, setTo] = useState(block ? toDateInput(block.endDate) : '')
  const [reason, setReason] = useState(block?.reason ?? '')
  const [serviceId, setServiceId] = useState<string>(block?.serviceId ?? '')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (!from || !to) {
      setError('Indicá la fecha desde y hasta.')
      return
    }
    if (to < from) {
      setError('La fecha "hasta" no puede ser anterior a "desde".')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const dto = {
        startDate: dayStartISO(from),
        endDate: dayEndISO(to),
        reason: reason || null,
        serviceId: serviceId || null,
      }
      if (block) await api.availability.updateBlockedDate(block.id, dto)
      else await api.availability.createBlockedDate(dto)
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos guardar el bloqueo.')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!block) return
    setSaving(true)
    setError(null)
    try {
      await api.availability.deleteBlockedDate(block.id)
      onClose()
      router.refresh()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No pudimos eliminar.')
      setSaving(false)
    }
  }

  return (
    <AdminDialog
      open
      onOpenChange={(o) => !o && onClose()}
      title={block ? 'Editar bloqueo' : 'Nuevo bloqueo'}
      description="Rango de fechas a bloquear (feriados, vacaciones)."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="block-from">Desde</Label>
            <input
              id="block-from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <Label htmlFor="block-to">Hasta</Label>
            <input
              id="block-to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="block-reason">Motivo (opcional)</Label>
          <input
            id="block-reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            maxLength={200}
            placeholder="Feriado, vacaciones, mantenimiento…"
            className={inputCls}
          />
        </div>

        <div>
          <Label htmlFor="block-service">Servicio</Label>
          <select
            id="block-service"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className={inputCls}
          >
            <option value="">Todos los servicios</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p role="alert" className="border border-danger/40 bg-danger/5 text-danger px-4 py-3 text-xs">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 pt-2">
          {block ? (
            confirmDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-danger hover:underline disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <Trash2 width={13} height={13} strokeWidth={1.5} aria-hidden />
                Confirmar baja
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={saving}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-ink-muted hover:text-danger transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-2"
              >
                <Trash2 width={13} height={13} strokeWidth={1.5} aria-hidden />
                Eliminar
              </button>
            )
          ) : (
            <span />
          )}
          <div className="flex gap-3">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={saving}>
              Cancelar
            </Button>
            <Button type="button" variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>
    </AdminDialog>
  )
}
