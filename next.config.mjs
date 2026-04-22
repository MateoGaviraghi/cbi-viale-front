/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', '@radix-ui/react-icons'],
  },
  // Proxy hacia el back de CBI Viale (NestJS + Fastify).
  // En el browser el front fetchea `/api/v1/*` (mismo origen → cookies fluyen sin
  // CORS cross-site). Next intercepta el path y reescribe al back via API_URL.
  // En server-side el fetch va directo a API_URL (no pasa por rewrites).
  async rewrites() {
    const API_URL = process.env.API_URL ?? 'http://localhost:3001'
    return [{ source: '/api/v1/:path*', destination: `${API_URL}/api/v1/:path*` }]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
