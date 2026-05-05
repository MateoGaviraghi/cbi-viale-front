'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// ---------------------------------------------------------------------------
//  Carousel editorial para AboutPreview. Auto-rotación con crossfade,
//  pausa en hover, dots clickeables. Mantiene el frame editorial del
//  placeholder original (label arriba, contador + dots abajo).
//
//  Orden narrativo: 4 fotos del espacio físico (presentación del lugar) +
//  4 fotos de las áreas de servicio (qué hacen).
// ---------------------------------------------------------------------------

type Slide = {
  src: string
  alt: string
  caption: string
}

const SLIDES: Slide[] = [
  {
    src: '/home/IMG_1328.jpg',
    alt: 'Sala de espera del Centro Bioquímico Integral en Viale',
    caption: 'Recepción',
  },
  {
    src: '/home/IMG_1334.jpg',
    alt: 'Sala de espera con vista al frente del local — CBI Viale',
    caption: 'Sala de espera',
  },
  {
    src: '/home/IMG_1330.jpg',
    alt: 'Sector de recepción y atención al paciente — CBI Viale',
    caption: 'Atención al paciente',
  },
  {
    src: '/home/IMG_1331.jpg',
    alt: 'Identidad institucional del Centro Bioquímico Integral',
    caption: 'Identidad CBI',
  },
  {
    src: '/servicios/clinica-humana/2.png',
    alt: 'Procesamiento de muestra clínica — CBI Viale',
    caption: 'Clínica humana',
  },
  {
    src: '/servicios/veterinaria/cultivos.jpg',
    alt: 'Cultivos microbiológicos veterinarios — CBI Viale',
    caption: 'Veterinaria',
  },
  {
    src: '/servicios/ambiental/IMG_0160.PNG',
    alt: 'Toma de muestra de agua para análisis ambiental — CBI Viale',
    caption: 'Ambiental',
  },
  {
    src: '/servicios/medicina-regenerativa/IMG_1321.JPG',
    alt: 'Sérum Biológico de la línea personalizada con PRP — CBI Viale',
    caption: 'Medicina regenerativa',
  },
]

const ROTATE_MS = 2400

export function AboutCarousel() {
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), ROTATE_MS)
    return () => clearInterval(t)
  }, [paused])

  return (
    <div
      className="relative aspect-[4/5] w-full bg-white overflow-hidden border border-line"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image stack — todas las imágenes renderizadas, solo cambia opacity.
          Esto evita el "blink" de AnimatePresence y da crossfade puro. */}
      {SLIDES.map((slide, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === idx ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 42vw"
            priority={i === 0}
          />
        </motion.div>
      ))}

      {/* Dots — único elemento UI, alineados abajo y centrados */}
      <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              i === idx
                ? 'w-7 bg-gold-700'
                : 'w-3 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
