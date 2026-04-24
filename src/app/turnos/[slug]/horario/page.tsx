import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_SLUGS, SERVICES } from '@/lib/constants'
import type { ServiceSlug } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { SlotPicker } from './SlotPicker'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ date?: string }>
}

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) return {}
  const svc = SERVICES[slug as ServiceSlug]
  return buildMetadata({
    title: `Elegí el horario — ${svc.name}`,
    description: `Seleccioná el horario disponible para tu turno de ${svc.name}.`,
    path: `/turnos/${slug}/horario`,
  })
}

export default async function HorarioPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { date } = await searchParams

  if (!SERVICE_SLUGS.includes(slug as ServiceSlug)) notFound()
  if (!date) notFound()

  const svc = SERVICES[slug as ServiceSlug]

  return (
    <section className="section">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <GoldRule />
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
              Reserva online · Paso 3 de 5
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl tracking-tightest leading-[1.02] text-ink">
            Elegí el horario.
          </h1>
          <p className="mt-4 text-ink-muted leading-relaxed">
            <span className="font-serif italic text-gold-800">{svc.name}</span>
            {' · '}
            <span className="font-mono text-sm">{date}</span>
          </p>

          <SlotPicker serviceSlug={slug} date={date} />
        </div>
      </Container>
    </section>
  )
}
