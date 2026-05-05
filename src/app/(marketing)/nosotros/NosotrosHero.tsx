import { GoldRule } from '@/components/shared/GoldRule'
import { Reveal } from '@/components/shared/Reveal'

// ---------------------------------------------------------------------------
//  Hero de /nosotros — split editorial 50/50 con foto del equipo a la derecha
//  (mask gradient fade-left desktop · fade-bottom mobile). Mismo patrón que
//  los heroes de servicios.
// ---------------------------------------------------------------------------

export function NosotrosHero() {
  return (
    <section className="relative bg-white border-b border-line">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:min-h-[640px]">

        {/* Placeholder — foto del equipo (Nahir + Gonzalo) pendiente.
            Mobile: arriba 4/3 con fade-bottom. Desktop: derecha con fade-left */}
        <div
          className="relative order-first lg:order-last aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full bg-gold-800 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 88%, transparent 100%)',
          }}
        >
          {/* textura sutil para no dejarlo plano */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-gold-700/20 via-transparent to-gold-900/30 pointer-events-none"
          />

          {/* contenido del placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 select-none">
            <div className="flex items-center gap-3 mb-5">
              <span className="block h-px w-8 bg-gold-200/60" />
              <span className="font-sans text-[10px] uppercase tracking-widest text-gold-200/80">
                Pendiente
              </span>
              <span className="block h-px w-8 bg-gold-200/60" />
            </div>
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tightest leading-[1.05] text-beige italic">
              Foto del equipo
            </p>
            <p className="mt-4 max-w-xs font-sans text-xs sm:text-sm text-gold-100/70 leading-relaxed">
              Acá va una foto de Nahir y Gonzalo juntos — espacio reservado hasta recibirla.
            </p>
          </div>

          {/* Overlay desktop: fade desde la izquierda hacia el placeholder */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-0 bg-white pointer-events-none"
            style={{
              maskImage:
                'linear-gradient(to right, white 0%, white 12%, transparent 32%)',
              WebkitMaskImage:
                'linear-gradient(to right, white 0%, white 12%, transparent 32%)',
            }}
          />
        </div>

        {/* Texto */}
        <div className="relative z-10 bg-white flex flex-col justify-center px-5 sm:px-6 md:px-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:pr-12 xl:pr-16 py-10 sm:py-12 lg:py-20">
          <Reveal direction="up" duration={0.6}>
            <div className="flex items-center gap-4 mb-6 lg:mb-8">
              <GoldRule />
              <span className="font-sans text-[11px] uppercase tracking-widest text-gold-700">
                El equipo
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1} duration={0.7}>
            <h1 className="font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.98] tracking-tightest text-ink">
              Un equipo humano.
              <br />
              <span className="italic text-gold-800">Un trabajo</span> preciso.
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2} duration={0.6}>
            <p className="mt-6 lg:mt-8 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed">
              Fundado en 2025 en Viale, Entre Ríos, CBI nació de la decisión de brindar un
              servicio bioquímico de calidad en la comunidad. Ciencia, responsabilidad y
              atención personalizada en cada análisis.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3} duration={0.5}>
            <div className="mt-10 lg:mt-12 pt-8 border-t border-line grid grid-cols-2 gap-6 sm:gap-10 max-w-md">
              <Stat n="2" label="Bioquímicos matriculados" />
              <Stat n="2025" label="Año de fundación" />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-mono text-3xl md:text-4xl text-gold-800 tracking-tight leading-none">
        {n}
      </p>
      <p className="mt-2 text-xs text-ink-muted leading-relaxed">{label}</p>
    </div>
  )
}
