import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-gold-700 mb-6">
          Error 404
        </p>
        <h1 className="font-serif text-5xl md:text-6xl tracking-tightest leading-[1.02] mb-6">
          Página no encontrada.
        </h1>
        <p className="text-ink-muted mb-10">
          La URL que buscás no existe o fue movida. Volvé al inicio o contactanos.
        </p>
        <Link
          href="/"
          className="inline-flex tap-min items-center justify-center bg-gold-700 text-white px-8 py-4 font-sans text-sm uppercase tracking-widest hover:bg-gold-800 transition-colors duration-500"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
