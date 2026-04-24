import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_SLUGS, SERVICES } from '@/lib/constants'
import type { ServiceSlug } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { BookingCalendar } from './BookingCalendar'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {}
  const svc = SERVICES[slug as ServiceSlug]
  return buildMetadata({
    title: `Elegí la fecha — ${svc.name}`,
    description: `Seleccioná el día para tu turno de ${svc.name} en CBI Viale.`,
    path: `/turnos/${slug}/fecha`,
  })
}

export default async function FechaPage({ params }: Props) {
  const { slug } = await params

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound()

  const svc = SERVICES[slug as ServiceSlug]

  return (
    <section className="section">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Encabezado */}
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Reserva online · Paso 2 de 5
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl tracking-tightest leading-[1.02] text-ink">
            Elegí el día.
          </h1>
          <p className="mt-4 text-ink-muted leading-relaxed">
            <span className="font-serif italic text-gold-800">{svc.name}</span>
            {' · '}~{svc.duration} min
          </p>

          <BookingCalendar serviceSlug={slug} />
        </div>
      </Container>
    </section>
  )
}
