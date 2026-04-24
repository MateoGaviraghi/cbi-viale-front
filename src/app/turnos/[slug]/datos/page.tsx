import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_SLUGS, SERVICES } from '@/lib/constants'
import type { ServiceSlug } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { getServiceOperationalData } from '@/lib/api/helpers'
import { PatientForm } from './PatientForm'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ date?: string; time?: string }>
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {}
  const svc = SERVICES[slug as ServiceSlug]
  return buildMetadata({
    title: `Tus datos — ${svc.name}`,
    description: `Completá tus datos para reservar tu turno de ${svc.name}.`,
    path: `/turnos/${slug}/datos`,
  })
}

export default async function DatosPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { date, time } = await searchParams

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound()
  if (!date || !time) notFound()

  const svc = SERVICES[slug as ServiceSlug]
  const operational = await getServiceOperationalData(slug)

  return (
    <section className="section">
      <Container>
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Reserva online · Paso 4 de 5
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl tracking-tightest leading-[1.02] text-ink">
            Tus datos.
          </h1>
          <p className="mt-4 text-ink-muted">
            <span className="font-serif italic text-gold-800">{svc.name}</span>
            {' · '}
            <span className="font-mono text-sm">{date}</span>
            {' · '}
            <span className="font-mono text-sm">{time}</span>
          </p>

          <PatientForm
            serviceSlug={slug}
            date={date}
            time={time}
            requiresConsent={operational.requiresConsent}
            serviceName={svc.name}
          />
        </div>
      </Container>
    </section>
  )
}
