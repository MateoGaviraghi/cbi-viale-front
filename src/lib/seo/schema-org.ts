import { CONTACT, SITE } from '@/lib/constants'

// JSON-LD — se inyecta por página con <script type="application/ld+json">.
// Schema.org types: MedicalBusiness (específico) + LocalBusiness (fallback).

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITE.url}/#org`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/logo-cbi.png`,
    image: `${SITE.url}/og-default.jpg`,
    telephone: CONTACT.phone || undefined,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.region,
      postalCode: CONTACT.address.postalCode,
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT.address.lat,
      longitude: CONTACT.address.lng,
    },
    openingHoursSpecification: CONTACT.hours
      .filter((h) => h.range !== 'Cerrado')
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.day,
        // rango parseable se arma cuando haya horarios reales
        description: h.range,
      })),
    sameAs: [CONTACT.instagram],
  }
}

export function medicalProcedureSchema(params: {
  name: string
  description: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: params.name,
    description: params.description,
    url: `${SITE.url}/servicios/${params.slug}`,
    provider: { '@id': `${SITE.url}/#org` },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
