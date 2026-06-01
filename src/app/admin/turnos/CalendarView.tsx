'use client'

import { useState, useEffect, useRef } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns'
import { es } from 'date-fns/locale'
import { toZonedTime } from 'date-fns-tz'
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CalendarDays,
  ArrowRight,
  X,
} from 'lucide-react'
import { apiFetch, ApiError } from '@/lib/api'
import { AdminDialog } from '@/components/admin/AdminDialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Appointment, AppointmentStatus } from '@/lib/api/types'

const TZ = 'America/Argentina/Buenos_Aires'

const STATUS_CHIP: Record<AppointmentStatus, string> = {
  PENDING:   'bg-amber-50   text-amber-800  border border-amber-200',
  CONFIRMED: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  COMPLETED: 'bg-beige      text-ink-muted  border border-line',
  CANCELLED: 'bg-danger/5   text-danger     border border-danger/30',
  NO_SHOW:   'bg-zinc-100   text-zinc-500   border border-zinc-200',
}

const STATUS_BADGE: Record<AppointmentStatus, string> = {
  PENDING:   'bg-amber-50   text-amber-700  border border-amber-200',
  CONFIRMED: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  COMPLETED: 'bg-beige      text-ink-muted  border border-line',
  CANCELLED: 'bg-danger/5   text-danger     border border-danger/30',
  NO_SHOW:   'bg-zinc-100   text-zinc-500   border border-zinc-200',
}

const STATUS_OPTS: { value: AppointmentStatus; label: string }[] = [
  { value: 'PENDING',   label: 'Pendiente' },
  { value: 'CONFIRMED', label: 'Confirmado' },
  { value: 'COMPLETED', label: 'Completado' },
  { value: 'CANCELLED', label: 'Cancelado' },
  { value: 'NO_SHOW',   label: 'Ausente' },
]

const DOW = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MAX_CHIPS = 3

function localDate(iso: string) {
  return toZonedTime(new Date(iso), TZ)
}

export function CalendarView() {
  const [month, setMonth] = useState(() => startOfMonth(new Date()))
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  // Search / filter state
  const [searchText, setSearchText]         = useState('')
  const [searchResults, setSearchResults]   = useState<Appointment[] | null>(null)
  const [searchLoading, setSearchLoading]   = useState(false)
  const [statusFilter, setStatusFilter]     = useState<AppointmentStatus | ''>('')
  const [dateSearch, setDateSearch]         = useState('')
  const [jumpLoading, setJumpLoading]       = useState(false)
  const [dayDetail, setDayDetail]           = useState<{ key: string; date: Date; apts: Appointment[] } | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Edit modal state
  const [selected, setSelected]     = useState<Appointment | null>(null)
  const [editStatus, setEditStatus] = useState<AppointmentStatus>('PENDING')
  const [editNotes, setEditNotes]   = useState('')
  const [saving, setSaving]         = useState(false)
  const [saveError, setSaveError]   = useState<string | null>(null)

  // ── Fetch month appointments ─────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const query: Record<string, string | number> = { pageSize: 100 }
    if (statusFilter) query.status = statusFilter
    apiFetch<Appointment[]>('/admin/appointments', { query })
      .then(({ data }) => { if (!cancelled) { setAppointments(data); setLoading(false) } })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [month, statusFilter])

  // ── Debounced text search (name / DNI) ───────────────────────────────────
  useEffect(() => {
    const trimmed = searchText.trim()
    if (!trimmed) { setSearchResults(null); return }

    const timer = setTimeout(async () => {
      setSearchLoading(true)
      try {
        const { data } = await apiFetch<Appointment[]>('/admin/appointments', {
          query: { search: trimmed, pageSize: 30 },
        })
        // Sort by date ascending
        data.sort((a, b) => a.date.localeCompare(b.date))
        setSearchResults(data)
      } catch {
        setSearchResults([])
      } finally {
        setSearchLoading(false)
      }
    }, 350)
    return () => clearTimeout(timer)
  }, [searchText])

  // ── Date search → jump to month ──────────────────────────────────────────
  useEffect(() => {
    if (!dateSearch) return
    // dateSearch is YYYY-MM-DD; add noon to avoid timezone drift
    const date = new Date(dateSearch + 'T12:00:00')
    setMonth(startOfMonth(date))
  }, [dateSearch])

  // ── Calendar grid ────────────────────────────────────────────────────────
  const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 1 })
  const gridEnd   = endOfWeek(endOfMonth(month),     { weekStartsOn: 1 })
  const days      = eachDayOfInterval({ start: gridStart, end: gridEnd })

  // Client-side filter (also applied when server-side filter may not be supported)
  const displayed = statusFilter
    ? appointments.filter((a) => a.status === statusFilter)
    : appointments

  const byDate = displayed.reduce<Record<string, Appointment[]>>((acc, apt) => {
    const key = format(localDate(apt.date), 'yyyy-MM-dd')
    ;(acc[key] ??= []).push(apt)
    return acc
  }, {})

  // ── Jump to first appointment by status ──────────────────────────────────
  async function goToFirst() {
    if (!statusFilter) return
    setJumpLoading(true)
    try {
      const { data } = await apiFetch<Appointment[]>('/admin/appointments', {
        query: { status: statusFilter, pageSize: 100 },
      })
      data.sort((a, b) => a.date.localeCompare(b.date))
      const now = new Date()
      const target = data.find((a) => new Date(a.date) >= now) ?? data[0]
      if (target) {
        setMonth(startOfMonth(localDate(target.date)))
        openEdit(target)
      }
    } catch { /* silent */ }
    finally { setJumpLoading(false) }
  }

  // ── Click search result → jump to month + open modal ────────────────────
  function selectSearchResult(apt: Appointment) {
    setMonth(startOfMonth(localDate(apt.date)))
    setSearchText('')
    setSearchResults(null)
    openEdit(apt)
  }

  // ── Edit modal helpers ───────────────────────────────────────────────────
  function openEdit(apt: Appointment) {
    setSelected(apt)
    setEditStatus(apt.status)
    setEditNotes(apt.notes ?? '')
    setSaveError(null)
  }

  async function handleSave() {
    if (!selected) return
    setSaving(true)
    setSaveError(null)
    try {
      await apiFetch<Appointment>(`/admin/appointments/${selected.id}`, {
        method: 'PATCH',
        body: { status: editStatus, notes: editNotes || undefined },
      })
      setAppointments((prev) =>
        prev.map((a) =>
          a.id === selected.id
            ? { ...a, status: editStatus, notes: editNotes || null }
            : a,
        ),
      )
      setSelected(null)
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : 'Error al guardar.')
    } finally {
      setSaving(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Search / filter panel ──────────────────────────────────── */}
      <div className="bg-white border border-line p-4 space-y-3 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          {/* Text search */}
          <div className="relative sm:col-span-2 lg:col-span-2">
            <Search
              width={14}
              height={14}
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
              aria-hidden
            />
            <input
              ref={searchRef}
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar por nombre o DNI…"
              className="w-full h-11 border border-line bg-white pl-9 pr-8 font-sans text-sm text-ink placeholder:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
            />
            {searchText && (
              <button
                onClick={() => { setSearchText(''); setSearchResults(null) }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                aria-label="Limpiar búsqueda"
              >
                <X width={13} height={13} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {/* Date search */}
          <div className="relative">
            <CalendarDays
              width={14}
              height={14}
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none z-10"
              aria-hidden
            />
            <input
              type="date"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
              className="w-full h-11 border border-line bg-white pl-9 pr-3 font-sans text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1 appearance-none"
            />
          </div>

          {/* Status filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | '')}
              className="w-full h-11 border border-line bg-white px-3 font-sans text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
            >
              <option value="">Todos los estados</option>
              {STATUS_OPTS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Jump to first by status */}
        {statusFilter && (
          <div className="flex items-center gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={goToFirst}
              disabled={jumpLoading}
              className="gap-2"
            >
              <ArrowRight width={13} height={13} strokeWidth={1.5} aria-hidden />
              {jumpLoading ? 'Buscando…' : `Ir al primer turno ${STATUS_OPTS.find(o => o.value === statusFilter)?.label.toLowerCase()}`}
            </Button>
            <button
              onClick={() => setStatusFilter('')}
              className="font-sans text-xs text-ink-muted hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
            >
              Quitar filtro
            </button>
          </div>
        )}

        {/* Search results dropdown */}
        {searchText.trim() && (
          <div className="border-t border-line pt-3">
            {searchLoading && (
              <p className="font-sans text-xs text-ink-muted">Buscando…</p>
            )}
            {!searchLoading && searchResults !== null && searchResults.length === 0 && (
              <p className="font-sans text-xs text-ink-muted">
                Sin resultados para &ldquo;{searchText}&rdquo;.
              </p>
            )}
            {!searchLoading && searchResults && searchResults.length > 0 && (
              <div className="space-y-1">
                <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-2">
                  {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                </p>
                {searchResults.map((apt) => (
                  <button
                    key={apt.id}
                    onClick={() => selectSearchResult(apt)}
                    className="w-full text-left flex items-center justify-between gap-4 px-3 py-2 hover:bg-beige/40 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                  >
                    <div className="min-w-0">
                      <p className="font-serif text-sm text-ink truncate">{apt.patientName}</p>
                      <p className="font-sans text-xs text-ink-muted">
                        DNI {apt.patientDni} · {format(localDate(apt.date), "d MMM yyyy, HH:mm", { locale: es })}
                      </p>
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest ${STATUS_BADGE[apt.status]}`}>
                      {STATUS_OPTS.find(o => o.value === apt.status)?.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Month navigation ───────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMonth((m) => subMonths(m, 1))}
          className="tap-min inline-flex items-center justify-center h-10 w-10 border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
          aria-label="Mes anterior"
        >
          <ChevronLeft width={16} height={16} strokeWidth={1.5} />
        </button>

        <div className="text-center">
          <h2 className="font-serif text-2xl tracking-tight text-ink capitalize">
            {format(month, 'MMMM', { locale: es })}{' '}
            <span className="italic text-gold-800">{format(month, 'yyyy')}</span>
          </h2>
          <p className="font-sans text-[11px] uppercase tracking-widest text-ink-muted mt-0.5">
            {loading ? 'Cargando…' : `${displayed.length} ${displayed.length === 1 ? 'turno' : 'turnos'}${statusFilter ? ' · filtrado' : ''}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMonth(startOfMonth(new Date()))}
            className="hidden sm:block tap-min px-3 h-10 border border-line font-sans text-xs text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
          >
            Hoy
          </button>
          <button
            onClick={() => setMonth((m) => addMonths(m, 1))}
            className="tap-min inline-flex items-center justify-center h-10 w-10 border border-line text-ink-muted hover:border-gold-700/40 hover:text-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
            aria-label="Mes siguiente"
          >
            <ChevronRight width={16} height={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ── Calendar grid ──────────────────────────────────────────── */}
      <div className="border border-line">
        {/* Day-of-week header */}
        <div className="grid grid-cols-7 bg-beige/40 border-b border-line">
          {DOW.map((d) => (
            <div
              key={d}
              className="py-2.5 text-center font-sans text-[10px] uppercase tracking-widest text-gold-700"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-px bg-line">
          {days.map((day) => {
            const key   = format(day, 'yyyy-MM-dd')
            const apts  = (byDate[key] ?? []).sort((a, b) => a.date.localeCompare(b.date))
            const inMo  = isSameMonth(day, month)
            const today = isToday(day)

            // Highlight if dateSearch matches this day
            const searchedDay = dateSearch === key

            const visibleApts = apts.slice(0, MAX_CHIPS)
            const extraCount  = Math.max(0, apts.length - MAX_CHIPS)

            return (
              <div
                key={key}
                className={`min-h-[90px] p-1.5 ${
                  searchedDay
                    ? 'bg-gold-50/60 ring-2 ring-inset ring-gold-700/30'
                    : inMo
                    ? 'bg-white'
                    : 'bg-beige/30'
                }`}
              >
                {apts.length > 0 ? (
                  <button
                    onClick={() => setDayDetail({ key, date: day, apts })}
                    className={`inline-flex items-center justify-center w-6 h-6 font-sans text-xs mb-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1 ${
                      today
                        ? 'bg-gold-700 text-white hover:bg-gold-800'
                        : inMo
                        ? 'text-ink hover:text-gold-700'
                        : 'text-ink-soft hover:text-gold-700'
                    }`}
                    title="Ver todos los turnos del día"
                  >
                    {format(day, 'd')}
                  </button>
                ) : (
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 font-sans text-xs mb-1 ${
                      today
                        ? 'bg-gold-700 text-white'
                        : inMo
                        ? 'text-ink'
                        : 'text-ink-soft'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                )}

                <div className="space-y-0.5">
                  {visibleApts.map((apt) => (
                    <button
                      key={apt.id}
                      onClick={() => openEdit(apt)}
                      title={`${apt.patientName} — ${format(localDate(apt.date), 'HH:mm')}`}
                      className={`w-full text-left px-1.5 py-0.5 text-[10px] leading-snug truncate transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1 ${STATUS_CHIP[apt.status]}`}
                    >
                      <span className="font-medium tabular-nums">
                        {format(localDate(apt.date), 'HH:mm')}
                      </span>{' '}
                      <span className="opacity-80">
                        {apt.patientName.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                  {extraCount > 0 && (
                    <button
                      onClick={() => setDayDetail({ key, date: day, apts })}
                      className="w-full text-left px-1.5 py-0.5 font-sans text-[10px] text-gold-700 hover:text-gold-800 hover:bg-gold-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
                    >
                      +{extraCount} más
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {STATUS_OPTS.map((o) => (
          <button
            key={o.value}
            onClick={() => setStatusFilter(statusFilter === o.value ? '' : o.value)}
            className={`px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1 ${STATUS_BADGE[o.value]} ${statusFilter === o.value ? 'opacity-100 ring-2 ring-offset-1 ring-gold-700/40' : 'opacity-70 hover:opacity-100'}`}
          >
            {o.label}
          </button>
        ))}
        {statusFilter && (
          <button
            onClick={() => setStatusFilter('')}
            className="font-sans text-[10px] text-ink-muted hover:text-gold-700 transition-colors ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
          >
            × limpiar filtro
          </button>
        )}
      </div>

      {/* ── Day detail modal ───────────────────────────────────────── */}
      <AdminDialog
        open={!!dayDetail}
        onOpenChange={(open) => !open && setDayDetail(null)}
        title={dayDetail ? format(dayDetail.date, "EEEE d 'de' MMMM", { locale: es }) : ''}
        description={
          dayDetail
            ? `${dayDetail.apts.length} ${dayDetail.apts.length === 1 ? 'turno' : 'turnos'}`
            : undefined
        }
      >
        {dayDetail && (
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {dayDetail.apts.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between gap-3 px-3 py-2.5 border border-line hover:bg-beige/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-sans text-xs font-medium tabular-nums text-ink">
                      {format(localDate(apt.date), 'HH:mm')}
                    </span>
                    <span className={`px-1.5 py-0.5 font-sans text-[10px] uppercase tracking-widest ${STATUS_BADGE[apt.status]}`}>
                      {STATUS_OPTS.find((o) => o.value === apt.status)?.label}
                    </span>
                  </div>
                  <p className="font-serif text-sm text-ink truncate">{apt.patientName}</p>
                  <p className="font-sans text-xs text-ink-muted">DNI {apt.patientDni}</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => { setDayDetail(null); openEdit(apt) }}
                >
                  Editar
                </Button>
              </div>
            ))}
          </div>
        )}
      </AdminDialog>

      {/* ── Edit modal ─────────────────────────────────────────────── */}
      <AdminDialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Editar turno"
        description={
          selected
            ? `${selected.patientName} · ${format(localDate(selected.date), "EEEE d 'de' MMMM, HH:mm", { locale: es })}`
            : undefined
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="bg-beige/40 border border-line px-4 py-3 space-y-1">
              <p className="font-sans text-[10px] uppercase tracking-widest text-gold-700 mb-2">
                Datos del paciente
              </p>
              <p className="font-serif text-sm text-ink">{selected.patientName}</p>
              <p className="font-sans text-xs text-ink-muted">DNI {selected.patientDni}</p>
              <p className="font-sans text-xs text-ink-muted">
                {selected.patientEmail} · {selected.patientPhone}
              </p>
              {selected.notes && (
                <p className="font-sans text-xs text-ink-soft italic mt-1">{selected.notes}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cal-status">Estado</Label>
              <select
                id="cal-status"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as AppointmentStatus)}
                className="mt-1.5 w-full h-12 border border-line bg-white px-3 font-sans text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-offset-1"
              >
                {STATUS_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="cal-notes">Notas internas</Label>
              <Textarea
                id="cal-notes"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
                placeholder="Observaciones, indicaciones, aclaraciones…"
                className="mt-1.5"
              />
            </div>

            {saveError && (
              <p className="border border-danger/40 bg-danger/5 text-danger px-4 py-3 text-xs">
                {saveError}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)} disabled={saving}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </Button>
            </div>
          </div>
        )}
      </AdminDialog>
    </>
  )
}
