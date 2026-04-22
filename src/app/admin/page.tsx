import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { GoldRule } from '@/components/shared/GoldRule'

// Dashboard stub — se reemplaza por un resumen con métricas reales cuando el
// back tenga AnalyticsModule (Fase 3). Hoy solo sirve como landing post-login.
export default async function AdminDashboardPage() {
  // El layout ya validó la sesión; acá re-fetcheamos al user solo para usar
  // su nombre en el saludo. Next deduplica fetches idénticos en el mismo render.
  const { data: user } = await api.auth.me(cookies().toString())

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
          Desde acá vas a gestionar turnos, consultas y la disponibilidad del laboratorio. Los
          módulos se habilitan por fases a medida que se entregan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
        <div className="bg-white p-8">
          <p className="font-sans text-[11px] uppercase tracking-widest text-gold-700 mb-3">
            Próximamente · Fase 2
          </p>
          <h2 className="font-serif text-xl tracking-tight text-ink mb-2">Turnos</h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Agenda digital, confirmaciones, reprogramaciones y cancelaciones. Se habilita cuando
            esté activo el módulo de turnos del back.
          </p>
        </div>
        <div className="bg-white p-8">
          <p className="font-sans text-[11px] uppercase tracking-widest text-gold-700 mb-3">
            Próximamente · Fase 2
          </p>
          <h2 className="font-serif text-xl tracking-tight text-ink mb-2">Consultas</h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Bandeja unificada de formularios del sitio, con filtros y estados.
          </p>
        </div>
        <div className="bg-white p-8">
          <p className="font-sans text-[11px] uppercase tracking-widest text-gold-700 mb-3">
            Disponible hoy
          </p>
          <h2 className="font-serif text-xl tracking-tight text-ink mb-2">Disponibilidad</h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Horarios de atención y bloqueos por feriados o vacaciones. El back ya expone el CRUD.
          </p>
        </div>
        <div className="bg-white p-8">
          <p className="font-sans text-[11px] uppercase tracking-widest text-gold-700 mb-3">
            Próximamente · Fase 2
          </p>
          <h2 className="font-serif text-xl tracking-tight text-ink mb-2">Usuarios</h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Gestión de empleados y permisos granulares. Exclusivo de administradores.
          </p>
        </div>
      </div>
    </div>
  )
}
