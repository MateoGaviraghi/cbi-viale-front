import { cookies } from 'next/headers'
import { ScrollText } from 'lucide-react'
import { api, ApiError } from '@/lib/api'
import type { AuditLogEntry } from '@/lib/api/types'
import { GoldRule } from '@/components/shared/GoldRule'

export const dynamic = 'force-dynamic'

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

export default async function AuditoriaPage() {
  let logs: AuditLogEntry[] | null = null
  let unavailable = false

  try {
    const res = await api.admin.listAuditLogs({ pageSize: 100 }, cookies().toString())
    logs = res.data
  } catch (err) {
    // Si el endpoint de lectura aún no existe en el back, mostramos un estado
    // claro en vez de romper la página. El resto de errores se propagan.
    if (err instanceof ApiError && (err.statusCode === 404 || err.statusCode === 501)) {
      unavailable = true
    } else {
      throw err
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Registro de actividad
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
          <span className="italic text-gold-800">Auditoría</span>.
        </h1>
        <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-xl">
          Trazabilidad de las acciones del equipo sobre turnos, usuarios y disponibilidad.
        </p>
      </div>

      {unavailable ? (
        <div className="border border-line bg-beige/30 p-8 text-center">
          <ScrollText
            width={24}
            height={24}
            strokeWidth={1.25}
            className="text-gold-700 mx-auto mb-4"
            aria-hidden
          />
          <p className="font-serif text-xl text-ink mb-2">Endpoint pendiente en el back</p>
          <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
            El registro de auditoría ya se escribe en la base. Esta vista se activa automáticamente
            cuando el back exponga <code className="font-mono text-xs">GET /admin/audit-logs</code>.
          </p>
        </div>
      ) : logs && logs.length === 0 ? (
        <p className="text-sm text-ink-muted py-6">Todavía no hay registros de auditoría.</p>
      ) : (
        <div className="border border-line divide-y divide-line">
          {logs?.map((l) => (
            <div key={l.id} className="flex items-start justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="font-mono text-xs text-ink">
                  <span className="text-gold-800">{l.action}</span> · {l.entity}
                  {l.entityId && <span className="text-ink-muted"> #{l.entityId.slice(0, 8)}</span>}
                </p>
                <p className="mt-1 font-sans text-xs text-ink-muted truncate">
                  {l.user?.name ?? l.userId}
                </p>
              </div>
              <p className="shrink-0 font-sans text-xs text-ink-muted">{formatDate(l.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
