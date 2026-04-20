import type { MetadataRoute } from 'next'
import { SITE, SERVICE_SLUGS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE.url}/nosotros`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${SITE.url}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/turnos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE.url}/servicios/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
