import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { SITE } from '@/lib/constants'
import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { FloatingActions } from '@/components/marketing/FloatingActions'
import { orgSchema } from '@/lib/seo/schema-org'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Laboratorio bioquímico en Viale`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Nodo', url: 'https://nodotech.dev' }],
  creator: 'Nodo · nodotech.dev',
  keywords: [
    'laboratorio Viale',
    'análisis clínicos Viale',
    'bioquímico Viale',
    'CBI',
    'Centro Bioquímico Integral',
    'PRP Entre Ríos',
    'análisis veterinarios',
    'Entre Ríos',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Laboratorio bioquímico en Viale`,
    description: SITE.description,
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: undefined,
}

export const viewport: Viewport = {
  themeColor: '#B8935A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh flex flex-col">
        {/* JSON-LD organization schema global */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }}
        />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  )
}
