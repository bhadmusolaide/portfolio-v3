'use client'
import { useEffect, useState } from 'react'

function useMediaStatus(src) {
  const [status, setStatus] = useState(src ? 'loading' : 'missing')

  useEffect(() => {
    if (!src) {
      setStatus('missing')
      return
    }

    let cancelled = false
    setStatus('loading')

    fetch(src, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? 'available' : 'missing')
      })
      .catch(() => {
        if (!cancelled) setStatus('missing')
      })

    return () => {
      cancelled = true
    }
  }, [src])

  return status
}

export function DemoLink({ href, className }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      Demo →
    </a>
  )
}

export default function DemoVideo({ id = 'demo', youtubeId, mp4, webm, gif, poster, title }) {
  const status = useMediaStatus(gif ? gif : mp4)
  const [imageFailed, setImageFailed] = useState(false)

  if (youtubeId) {
    return (
      <section id={id} className="pb-16 px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Demo</h2>
          <div className="relative w-full overflow-hidden rounded-xl border border-[#1f1f23] bg-black" style={{ aspectRatio: '16 / 9' }}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={`${title || 'Project'} demo`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    )
  }

  const showVideo = status === 'available'
  const showGif = gif && status === 'available' && !imageFailed

  return (
    <section id={id} className="pb-16 px-6 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">Demo</h2>

        {showGif ? (
          <img
            src={gif}
            alt={`${title || 'Project'} demo`}
            className="w-full rounded-xl border border-[#1f1f23] bg-black"
            onError={() => setImageFailed(true)}
          />
        ) : showVideo ? (
          <video
            controls
            muted
            playsInline
            preload="metadata"
            poster={poster}
            className="w-full rounded-xl border border-[#1f1f23] bg-black"
          >
            {webm && <source src={webm} type="video/webm" />}
            <source src={mp4} type="video/mp4" />
          </video>
        ) : (
          <div
            className="relative w-full overflow-hidden rounded-xl border border-[#1f1f23] bg-[#0d0d0e]"
            style={{ aspectRatio: '16 / 9' }}
          >
            {poster && (
              <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-500/80">Demo</span>
              <p className="text-sm text-[#71717a]">Screen recording coming soon</p>
              {process.env.NODE_ENV === 'development' && (
                <p className="text-xs text-[#52525b]">
                  Add <code className="text-[#a1a1aa]">/showcase/{title ? title.toLowerCase().replace(/\s+/g, '-') : 'project'}.mp4</code> to enable it
                </p>
              )}
            </div>
          </div>
        )}

        {showVideo && <p className="text-[#52525b] text-sm mt-3">Silent screen recording. No audio.</p>}
      </div>
    </section>
  )
}
