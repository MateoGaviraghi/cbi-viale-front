import { cookies } from 'next/headers'
import { api, ApiError } from '@/lib/api'
import { GoldRule } from '@/components/shared/GoldRule'
import { ConsentDownloadButton } from './ConsentDownloadButton'
import { NuevoConsentimientoModal } from './NuevoConsentimientoModal'
import type { FormType, AdminConsent, ApiMeta } from '@/lib/api/types'

export const dynamic = 'force-dynamic'

const TYPE_LABEL: Record<FormType, string> = {
  CONTACT_GENERAL: 'Contacto',
  SERVICE_INQUIRY: 'Consulta',
  CONSENT: 'Consentimiento general',
  CUSTOM: 'Personalizado',
  CLINICAL: 'Clínica humana',
  UROCULTURE: 'Urocultivo',
  VAGINAL_EXUDATE: 'Exudado vaginal',
  VETERINARY: 'Veterinaria',
  AGRO_FOOD: 'Agro-alimentos',
  ENVIRONMENTAL: 'Ambiental',
  GENETIC: 'Genética',
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

export default async function ConsentimientosPage() {
  const cookieHeader = cookies().toString()

  let consents: AdminConsent[] = []
  let meta: ApiMeta | undefined
  let fetchError: string | null = null

  try {
    const result = await api.admin.listConsents(cookieHeader)
    consents = result.data
    meta = result.meta
  } catch (err) {
    if (err instanceof ApiError && (err.statusCode === 401 || err.statusCode === 403)) {
      // Deja que el error.tsx del admin maneje la redirección
      throw err
    }
    fetchError =
      err instanceof ApiError
        ? err.message
        : 'No se pudieron cargar los consentimientos. Verificá que el servidor esté activo.'
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <GoldRule />
          <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
            Respaldo firmado
          </span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl tracking-tighter leading-[1.05] text-ink">
              <span className="italic text-gold-800">Consentimientos</span>.
            </h1>
            {meta?.total !== undefined && (
              <p className="mt-2 font-sans text-sm text-ink-muted">
                {meta.total} {meta.total === 1 ? 'consentimiento' : 'consentimientos'} registrados
              </p>
            )}
          </div>
          <NuevoConsentimientoModal />
        </div>
        <p className="mt-4 text-sm text-ink-muted leading-relaxed max-w-xl">
          Consentimientos informados firmados digitalmente al enviar un formulario del sitio.
          Podés descargar el PDF de respaldo en cualquier momento.
        </p>
      </div>

      {fetchError && (
        <div className="border border-danger/30 bg-danger/5 px-5 py-4">
          <p className="font-sans text-sm text-danger leading-relaxed">{fetchError}</p>
          <p className="font-sans text-xs text-danger/70 mt-1">
            Podés igualmente crear un consentimiento manual usando el botón de arriba.
          </p>
        </div>
      )}

      {!fetchError && consents.length === 0 && (
        <div className="border border-line bg-white p-12 text-center space-y-3">
          <p className="text-ink-muted text-sm">No hay consentimientos registrados todavía.</p>
          <p className="text-ink-soft text-xs">
            Usá el botón &ldquo;Nuevo consentimiento&rdquo; para crear uno de prueba y ver cómo se
            ve el PDF.
          </p>
        </div>
      )}

      {consents.length > 0 && (
        <div className="border border-line bg-white divide-y divide-line">
          {consents.map((c) => (
            <div
              key={c.id}
              className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-serif text-base text-ink leading-tight">{c.patientName}</p>
                <p className="font-sans text-xs text-ink-muted">DNI {c.patientDni}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700">
                    {TYPE_LABEL[c.formType]}
                  </span>
                  {c.serviceSlug && (
                    <span className="font-sans text-[10px] uppercase tracking-widest text-ink-soft">
                      {c.serviceSlug}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <p className="font-sans text-xs text-ink-muted">{formatDate(c.createdAt)}</p>
                <ConsentDownloadButton id={c.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
