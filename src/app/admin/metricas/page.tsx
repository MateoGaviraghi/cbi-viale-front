import { cookies } from 'next/headers'
import { Calendar, TrendingUp, MessageSquare, FileCheck } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import type { AdminStats } from '@/lib/api/types'
import { GoldRule } from '@/components/shared/GoldRule'

export const dynamic = 'force-dynamic'

export default async function MetricasPage() {
  let stats: AdminStats | null = null
  let denied = false
  try {
    const res = await api.admin.getStats(cookies().toString())
    stats = res.data
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 403) denied = true
    else throw err
  }

  const cards = stats
    ? [
        { label: 'Turnos totales', value: stats.totalAppointments, icon: Calendar },
        { label: 'Turnos este mes', value: stats.appointmentsThisMonth, icon: TrendingUp },
        { label: 'Consultas recibidas', value: stats.totalSubmissions, icon: MessageSquare },
        { label: 'Consentimientos firmados', value: stats.totalConsents, icon: FileCheck },
      ]
    : []

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Panel de métricas
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
          <span className="italic text-gold-800">Métricas</span>.
        </h1>
        <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-xl">
          Resumen de la actividad del laboratorio.
        </p>
      </div>

      {denied ? (
        <p className="border border-line bg-beige/30 p-6 text-sm text-ink-muted">
          Necesitás el permiso de métricas (<code className="font-mono text-xs">viewAnalytics</code>)
          para ver estos datos.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {cards.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.label} className="bg-white p-7">
                <Icon
                  width={20}
                  height={20}
                  strokeWidth={1.5}
                  className="text-gold-700 mb-4"
                  aria-hidden
                />
                <p className="font-serif text-4xl text-ink tracking-tight">{c.value}</p>
                <p className="mt-2 font-sans text-[11px] uppercase tracking-widest text-ink-muted">
                  {c.label}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
