'use client'

import { Download } from 'lucide-react'

interface Props {
  id: string
}

// Descarga el PDF del consentimiento directamente desde el back via el rewrite de Next.
// La cookie HttpOnly se envía automáticamente al ser same-origin.
export function ConsentDownloadButton({ id }: Props) {
  return (
    <a
      href={`/api/v1/admin/consents/${id}/pdf`}
      download={`consentimiento-${id}.pdf`}
      className="tap-min inline-flex items-center gap-2 border border-line px-4 py-2 font-sans text-xs uppercase tracking-widest text-ink-muted transition-colors duration-500 hover:border-gold-700/40 hover:text-gold-700"
    >
      <Download width={13} height={13} strokeWidth={1.5} aria-hidden />
      PDF
    </a>
  )
}
