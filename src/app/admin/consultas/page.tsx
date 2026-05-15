import { cookies } from 'next/headers'
import { api, ApiError } from '@/lib/api'
import { GoldRule } from '@/components/shared/GoldRule'
import { SubmissionRow } from './SubmissionRow'
import type { FormSubmission, ApiMeta } from '@/lib/api/types'

export const dynamic = 'force-dynamic'

export default async function ConsultasPage() {
  const cookieHeader = cookies().toString()

  let consultas: FormSubmission[] = []
  let meta: ApiMeta | undefined
  let fetchError: string | null = null

  try {
    const result = await api.admin.listSubmissions(cookieHeader)
    consultas = result.data
    meta = result.meta
  } catch (err) {
    if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 403)) {
      throw err
    }
    fetchError =
      err instanceof ApiError
        ? err.message
        : 'No se pudieron cargar las consultas. Verificá que el servidor esté activo.'
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Formularios recibidos
          </span>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
            <span className="italic text-gold-800">Consultas</span>.
          </h1>
          {meta?.total !== undefined && (
            <span className="font-sans text-sm text-ink-muted">
              {meta.total} {meta.total === 1 ? 'consulta' : 'consultas'}
            </span>
          )}
        </div>
      </div>

      {fetchError && (
        <div className="border border-danger/30 bg-danger/5 px-5 py-4">
          <p className="font-sans text-sm text-danger leading-relaxed">{fetchError}</p>
        </div>
      )}

      {!fetchError && consultas.length === 0 && (
        <div className="border border-line bg-white p-12 text-center">
          <p className="text-ink-muted text-sm">No hay consultas registradas todavía.</p>
        </div>
      )}

      {consultas.length > 0 && (
        <div className="border border-line bg-white divide-y divide-line">
          {consultas.map((c) => (
            <SubmissionRow key={c.id} submission={c} />
          ))}
        </div>
      )}
    </div>
  )
}
