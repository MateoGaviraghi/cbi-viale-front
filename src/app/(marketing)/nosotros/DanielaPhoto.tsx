'use client'

import { useState } from 'react'
import Image from 'next/image'

export function DanielaPhoto() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative aspect-[4/5] w-full bg-beige">
      {!failed && (
        <Image
          src="/nosotros/daniela.jpg"
          alt="Daniela Barboza — Técnica en Análisis Clínicos, CBI Viale"
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 33vw"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none pointer-events-none">
          <span className="font-serif text-6xl text-gold-700/30 leading-none">DB</span>
          <span className="font-sans text-[10px] uppercase tracking-widest text-gold-700/40">
            Foto pendiente
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent" />
    </div>
  )
}
