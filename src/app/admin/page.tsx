import { cookies } from 'next/headers'
import Link from 'next/link'
import { Calendar, TrendingUp, MessageSquare, FileCheck, ArrowUpRight } from 'lucide-react'
import { api } from '@/lib/api'
import { GoldRule } from '@/components/shared/GoldRule'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const cookieHeader = cookies().toString()
  const [{ data: user }, { data: stats }] = await Promise.all([
    api.auth.me(cookieHeader),
    api.admin.getStats(cookieHeader),
  ])

  const metrics = [
    { label: 'Turnos totales', value: stats.totalAppointments, icon: Calendar },
    { label: 'Turnos este mes', value: stats.appointmentsThisMonth, icon: TrendingUp },
    { label: 'Consultas', value: stats.totalSubmissions, icon: MessageSquare },
    { label: 'Consentimientos', value: stats.totalConsents, icon: FileCheck },
  ]

  const shortcuts = [
    { href: '/admin/turnos', label: 'Turnos' },
    { href: '/admin/consultas', label: 'Consultas' },
    { href: '/admin/consentimientos', label: 'Consentimientos' },
    { href: '/admin/disponibilidad', label: 'Disponibilidad' },
  ]

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Panel de gestión
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
          Hola, <span className="italic text-gold-800">{user.name.split(' ')[0]}</span>.
        </h1>
        <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-xl">
          Resumen de la actividad del laboratorio.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.label} className="bg-white p-7">
              <Icon
                width={20}
                height={20}
                strokeWidth={1.5}
                className="text-gold-700 mb-4"
                aria-hidden
              />
              <p className="font-serif text-4xl text-ink tracking-tight">{m.value}</p>
              <p className="mt-2 font-sans text-[11px] uppercase tracking-widest text-ink-muted">
                {m.label}
              </p>
            </div>
          )
        })}
      </div>

      <div>
        <p className="font-sans text-[11px] uppercase tracking-widest text-ink-muted mb-4">
          Accesos rápidos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-between bg-white p-5 transition-colors hover:bg-beige/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-700 focus-visible:ring-inset"
            >
              <span className="font-serif text-lg text-ink transition-colors group-hover:text-gold-800">
                {s.label}
              </span>
              <ArrowUpRight
                width={16}
                height={16}
                strokeWidth={1.5}
                className="text-ink-muted transition-colors group-hover:text-gold-700"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
