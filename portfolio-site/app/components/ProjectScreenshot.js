'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ProjectScreenshot({ src, alt, title }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500"
      />
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View ${title} screenshot full size`}
        className="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black/70 border border-white/15 text-white/80 hover:text-white hover:bg-black/85 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M21 3l-7 7" />
          <path d="M3 21l7-7" />
        </svg>
      </button>

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshot`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close screenshot"
            className="absolute top-4 right-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/15 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5" aria-hidden="true">
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg border border-white/10"
          />
        </div>,
        document.body
      )}
    </>
  )
}
