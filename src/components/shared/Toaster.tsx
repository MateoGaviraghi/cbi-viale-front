'use client'

import { useEffect, useState } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastVariant = 'success' | 'error'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

// Pub/sub simple para disparar toasts desde cualquier módulo
const subscribers = new Set<(t: ToastItem) => void>()

export function toast(message: string, variant: ToastVariant = 'success') {
  const item: ToastItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    message,
    variant,
  }
  subscribers.forEach((fn) => fn(item))
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    function add(t: ToastItem) {
      setToasts((prev) => [...prev, t])
    }
    subscribers.add(add)
    return () => {
      subscribers.delete(add)
    }
  }, [])

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={5000}>
      {toasts.map((t) => (
        <ToastPrimitive.Root
          key={t.id}
          open
          onOpenChange={(open) => {
            if (!open) dismiss(t.id)
          }}
          className={cn(
            'flex items-start gap-3 border bg-white p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full',
            'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
            t.variant === 'success' ? 'border-gold-700' : 'border-red-400',
          )}
        >
          <div className="mt-0.5 shrink-0">
            {t.variant === 'success' ? (
              <CheckCircle size={16} className="text-gold-700" />
            ) : (
              <AlertCircle size={16} className="text-red-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <ToastPrimitive.Description className="text-sm text-ink leading-relaxed">
              {t.message}
            </ToastPrimitive.Description>
          </div>
          <ToastPrimitive.Close asChild>
            <button
              aria-label="Cerrar"
              className="shrink-0 text-ink-muted hover:text-ink transition-colors"
            >
              <X size={14} />
            </button>
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="fixed bottom-6 right-6 z-[100] flex w-[360px] max-w-[calc(100vw-3rem)] flex-col gap-2 outline-none" />
    </ToastPrimitive.Provider>
  )
}
