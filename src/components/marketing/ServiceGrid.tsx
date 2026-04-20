'use client'

import { SERVICE_SLUGS } from '@/lib/constants'
import { Container } from '@/components/shared/Container'
import { GoldRule } from '@/components/shared/GoldRule'
import { SplitText } from '@/components/shared/SplitText'
import { Reveal } from '@/components/shared/Reveal'
import { StaggerGroup, StaggerItem } from '@/components/shared/StaggerGroup'
import { ServiceCard } from './ServiceCard'

interface Props {
  showHeading?: boolean
}

export function ServiceGrid({ showHeading = true }: Props) {
  return (
    <section className="relative bg-white py-16 md:py-20 lg:py-24">
      <Container>
        {showHeading && (
          <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-3xl">
              <Reveal direction="up" duration={0.6}>
                <div className="flex items-center gap-4 mb-8">
                  <GoldRule />
                  <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-700">
                    Nuestros servicios
                  </span>
                </div>
              </Reveal>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.02] text-ink">
                <SplitText inView staggerChildren={0.07} duration={0.8}>
                  Seis áreas.
                </SplitText>
                <br />
                <span className="italic text-gold-800">
                  <SplitText inView delay={0.3} staggerChildren={0.07} duration={0.8}>
                    Un mismo estándar.
                  </SplitText>
                </span>
              </h2>
            </div>

            <Reveal direction="up" delay={0.4} duration={0.7}>
              <p className="max-w-md text-ink-muted text-[15px] leading-relaxed md:text-right">
                Desde clínica humana hasta controles ambientales. Cada área con profesionales
                dedicados y protocolo de laboratorio certificado.
              </p>
            </Reveal>
          </div>
        )}

        <StaggerGroup stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {SERVICE_SLUGS.map((slug, idx) => (
            <StaggerItem key={slug}>
              <ServiceCard slug={slug} index={idx} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  )
}
