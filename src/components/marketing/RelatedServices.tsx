import type { ServiceSlug } from '@/lib/constants'
import { SERVICE_SLUGS } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCard } from './ServiceCard'

interface Props {
  currentSlug: ServiceSlug
  count?: number
}

// Grid de 3 servicios distintos al actual — invita a explorar.
export function RelatedServices({ currentSlug, count = 3 }: Props) {
  const others = SERVICE_SLUGS.filter((s) => s !== currentSlug).slice(0, count)

  return (
    <section className="section border-t border-line">
      <Container>
        <SectionHeading
          eyebrow="Otros servicios"
          title={
            <>
              Conocé el resto <span className="italic text-gold-800">de CBI</span>.
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {others.map((slug) => (
            <ServiceCard key={slug} slug={slug} index={SERVICE_SLUGS.indexOf(slug)} />
          ))}
        </div>
      </Container>
    </section>
  )
}
