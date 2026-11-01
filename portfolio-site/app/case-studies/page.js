'use client'

const studies = [
  {
    href: '/case-studies/pageside',
    title: 'Pageside',
    desc: 'Job-application drafting from a personal vault, with local retrieval, source attribution, and an approval gate. No backend, bring your own API key.',
    tags: ['Chrome MV3', 'TypeScript', 'React', 'IndexedDB', '5 LLM providers'],
  },
  {
    href: '/case-studies/career-suite',
    title: 'Career Suite',
    desc: 'A multi-provider LLM writing suite with automatic fallback, resume-grounded cover letters, and a shared prompt-and-eval set.',
    tags: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', '6 LLM providers'],
  },
]

export default function CaseStudies() {
  return (
    <div className="min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 w-full bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[#1f1f23] z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-sm text-[#71717a] hover:text-[#e4e4e7] transition-colors">← Back to portfolio</a>
          <div className="flex items-center gap-6 text-sm text-[#71717a]">
            <a href="/master-resume.html" target="_blank" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Resume →</a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-6 animate-in">Case Studies</p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-6 animate-in-d1">
            <span className="text-white">Two AI products,</span>
            <br />
            <span className="text-[#52525b]">and the decisions behind them.</span>
          </h1>
          <p className="text-lg text-[#71717a] leading-relaxed animate-in-d2">
            How the systems were built, what failed, and what I would change. Both were built solo
            and shipped, not prototyped.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="pb-28 px-6">
        <div className="max-w-3xl mx-auto space-y-5">
          {studies.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="group block border border-[#1f1f23] rounded-xl p-6 md:p-8 hover:border-[#2a2a2e] transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-amber-500 transition-colors">{s.title}</h2>
                  <p className="text-sm text-[#71717a] mt-1 leading-relaxed">{s.desc}</p>
                </div>
                <span className="text-amber-500/80 group-hover:text-amber-400 transition-colors text-lg">→</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs text-[#52525b] bg-[#141416] px-2.5 py-1 rounded-md">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-[#52525b]">
          <p>© {new Date().getFullYear()} Olaide Bhadmus</p>
          <p>Applied AI Engineer</p>
        </div>
      </footer>

    </div>
  )
}
