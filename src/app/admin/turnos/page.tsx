import { GoldRule } from '@/components/shared/GoldRule'
import { CalendarView } from './CalendarView'

export const dynamic = 'force-dynamic'

export default function TurnosPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Gestión de turnos
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
          <span className="italic text-gold-800">Turnos</span>.
        </h1>
      </div>

      <CalendarView />
    </div>
  )
}
