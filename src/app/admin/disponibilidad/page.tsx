import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { GoldRule } from '@/components/shared/GoldRule'
import { AvailabilityManager } from './AvailabilityManager'

// Cada request depende de las cookies del usuario (sesión admin).
export const dynamic = 'force-dynamic'

export default async function DisponibilidadPage() {
  const cookieHeader = cookies().toString()

  const [services, rules, blocked] = await Promise.all([
    api.services.list(cookieHeader),
    api.availability.listRules({ pageSize: 100 }, cookieHeader),
    api.availability.listBlockedDates({ pageSize: 100 }, cookieHeader),
  ])

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Gestión de disponibilidad
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
          <span className="italic text-gold-800">Disponibilidad</span>.
        </h1>
        <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-xl">
          Definí los horarios de atención por día y bloqueá fechas por feriados o vacaciones. Los
          cambios impactan en el calendario de reservas al instante.
        </p>
      </div>

      <AvailabilityManager
        services={services.data.map((s) => ({ id: s.id, name: s.name }))}
        initialRules={rules.data}
        initialBlocked={blocked.data}
      />
    </div>
  )
}
