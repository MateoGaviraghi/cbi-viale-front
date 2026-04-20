import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'

/** Helper para armar metadata por página con defaults coherentes. */
export function buildMetadata(params: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  const url = `${SITE.url}${params.path}`
  const image = params.image ?? '/og-default.jpg'
  return {
    title: params.title,
    description: params.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: params.title,
      description: params.description,
      images: [{ url: image, width: 1200, height: 630, alt: params.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: [image],
    },
  }
}
