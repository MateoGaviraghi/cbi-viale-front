import { buildMetadata } from '@/lib/seo/metadata'
import { SERVICE_CONTENT } from '@/lib/service-content'
import { ServiceHero } from '@/components/marketing/ServiceHero'
import { ServiceDescription } from '@/components/marketing/ServiceDescription'
import { ServiceShowcase } from '@/components/marketing/ServiceShowcase'
import { AnalysisList } from '@/components/marketing/AnalysisList'
import { PreparationSteps } from '@/components/marketing/PreparationSteps'
import { RelatedServices } from '@/components/marketing/RelatedServices'
import { FinalCTA } from '@/components/marketing/FinalCTA'

const SLUG = 'medicina-regenerativa' as const
const C = SERVICE_CONTENT[SLUG]

export const metadata = buildMetadata({
  title: 'Medicina Regenerativa — PRP en Viale, Entre Ríos',
  description: C.intro,
  path: `/servicios/${SLUG}`,
})

// Variante "quote" + "tiles" — doble showcase. El PRP es nuestro servicio
// más premium y merece una narrativa más extendida.
export default function Page() {
  return (
    <>
      <ServiceHero slug={SLUG} eyebrow={C.eyebrow} intro={C.intro} />
      <ServiceDescription
        paragraphs={C.description}
        audience={C.audience}
        includes={C.includes}
      />

      <ServiceShowcase
        variant="quote"
        eyebrow="¿Qué es el PRP?"
        headline="Tu propia sangre, concentrada para regenerar tejido."
        quote={{
          text:
            'Un tratamiento que se obtiene a partir de la propia sangre del paciente — concentramos las plaquetas y liberamos factores de crecimiento naturales para acelerar la reparación.',
          author: 'Protocolo CBI',
        }}
      />

      <AnalysisList items={C.analyses} />

      <ServiceShowcase
        variant="tiles"
        eyebrow="Aplicaciones principales"
        headline="Cuatro frentes donde el PRP genera impacto."
        lead="Seleccionamos la preparación (concentración, volumen, enriquecimiento) según la indicación del médico tratante."
        highlights={[
          {
            title: 'Traumatología',
            body:
              'Lesiones musculares, articulares y tendinosas — infiltraciones de rodilla, hombro, codo y cadera.',
          },
          {
            title: 'Odontología',
            body:
              'Acelera la osteointegración en implantes y reduce tiempos de cicatrización en cirugías de encía.',
          },
          {
            title: 'Dermatología estética',
            body:
              'Tratamiento capilar para alopecia y rejuvenecimiento facial con factores de crecimiento autólogos.',
          },
          {
            title: 'Medicina del deporte',
            body:
              'Recuperación de lesiones deportivas crónicas y aceleración del regreso a la actividad.',
          },
        ]}
      />

      <PreparationSteps steps={C.preparation} />
      <RelatedServices currentSlug={SLUG} />
      <FinalCTA />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: 'Medicina Regenerativa — PRP',
            description: C.intro,
          }),
        }}
      />
    </>
  )
}
