'use client'
import { useEffect } from 'react'

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const providers = ['OpenAI', 'Groq', 'DeepSeek', 'Qwen', 'OpenRouter', 'Ollama']

const evals = [
  { area: 'Grammar correction', check: 'Corrections fix the flagged error only', pass: 'Minimal-diff: wording the user chose survives unless it was the error' },
  { area: 'Grammar correction', check: 'No style drift on clean input', pass: 'Already-correct text comes back essentially unchanged' },
  { area: 'Humanizer', check: 'Tone shifts, meaning does not', pass: 'Same claims and facts before/after — no invented detail' },
  { area: 'Summarizer', check: 'Fidelity under compression', pass: 'Every summary sentence traceable to the source; length within target' },
  { area: 'Cover letter', check: 'Grounded in the resume', pass: 'No employer, degree, or date that is not in the uploaded resume' },
  { area: 'Provider parity', check: 'Same prompt set across all 6 providers', pass: 'A new provider joins the fallback chain only after its outputs pass the set' },
  { area: 'Failure path', check: 'Rate-limit / timeout behavior', pass: 'Fallback engages, user gets an answer or a clear error — never a hang' },
]

const broke = [
  'Providers format the same instruction differently — markdown, verbosity, and even language habits drift between models, so output post-processing had to be provider-aware.',
  'Rate limits cluster: when the primary provider throttles during a burst, every request falls to the second provider at once. The fallback chain needs its own backoff, or you just move the outage downstream.',
  'DOCX is messier than PDF — tracked changes, comments, and legacy formats produce garbage text that silently becomes prompt context.',
  'Long resumes plus a detailed instruction can push past smaller models\' context windows — the failure looks like an ignored instruction, not an error.',
]

const nextTime = [
  'Structured outputs / JSON mode where a provider supports it, instead of parsing free-form text and hoping.',
  'Run the eval set automatically in CI against every provider in the chain, not just when I remember before a swap.',
  'Per-task model routing from the start: cheap fast models for short rewrites, stronger models for cover-letter generation — with response caching for repeated requests.',
]

export default function CaseStudy() {
  useReveal()

  return (
    <div className="min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 w-full bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[#1f1f23] z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="text-sm text-[#71717a] hover:text-[#e4e4e7] transition-colors">← Back to portfolio</a>
          <div className="flex items-center gap-6 text-sm text-[#71717a]">
            <a href="https://career-suite-flax.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#e4e4e7] transition-colors">Live app</a>
            <a href="https://github.com/bhadmusolaide/career-suite" target="_blank" rel="noopener noreferrer" className="hover:text-[#e4e4e7] transition-colors">Source</a>
            <a href="/master-resume.html" target="_blank" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Resume →</a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-6 animate-in">Case Study</p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-6 animate-in-d1">
            <span className="text-white">Career Suite</span>
          </h1>
          <p className="text-lg text-[#71717a] leading-relaxed mb-10 animate-in-d2">
            A multi-provider LLM writing suite — grammar checking, humanizing, summarization,
            and resume-grounded cover letters. Built solo, in production, and used daily by
            the person who built it.
          </p>
          <div className="flex flex-wrap gap-1.5 animate-in-d3">
            {['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'Supabase', 'Node.js/Express', 'Docker', ...providers].map(t => (
              <span key={t} className="text-xs text-[#52525b] bg-[#141416] px-2.5 py-1 rounded-md">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="pb-28 px-6">
        <div className="max-w-3xl mx-auto space-y-20">

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">The problem</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Job-application writing is repetitive and high-stakes: every cover letter re-explains
              the same resume, every application needs clean prose, and AI-drafted text reads like
              AI-drafted text. I built the tool I use daily for that work — then kept building it
              out because the failure modes turned out to be the interesting part.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              Four features carry the product: grammar checking, a text humanizer, summarization,
              and a cover letter generator that works from an uploaded resume (PDF/DOCX). A chat
              interface ties them together for interactive editing.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Architecture</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Next.js 16 / React 19 frontend, with Prisma over Supabase for data and Supabase for
              auth and file storage. An earlier iteration ran as a React/TypeScript SPA against a
              Node.js/Express backend; that backend logic became the provider layer the current
              version uses. The whole app ships with a Dockerfile for containerized deployment.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              The load-bearing piece is the provider layer: every AI feature calls one unified
              interface, and the interface is backed by six providers — OpenAI, Groq, DeepSeek,
              Qwen, OpenRouter, and Ollama. Features never talk to a vendor SDK directly.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Why six providers</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              One provider is a single point of failure, and LLM APIs fail in ordinary ways:
              rate limits, outages, expired keys, regional latency. A single-provider app is down
              when that provider is down. A multi-provider app degrades instead of dying.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              There is a second benefit: model diversity. Different providers are strong at
              different tasks and price tiers, and OpenRouter plus local Ollama mean the app
              keeps working even when every cloud key is unavailable. Switching providers is
              configuration, not a code change — that is what the unified interface buys.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">How fallback works</h2>
            <ul className="space-y-3">
              {[
                'Providers are ordered per task in configuration — not hardcoded — so the chain can be tuned without touching feature code.',
                'A failed call (rate limit, timeout, 5xx) promotes the next provider in the chain automatically; the user sees the answer, not the retry.',
                'Fallback has backoff, because a throttling primary will otherwise flood the second provider with the same burst.',
                'Ollama sits at the end of the chain as a local escape hatch: if every cloud provider fails, the app still answers.',
              ].map((item, i) => (
                <li key={i} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Grounding cover letters in the resume</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              The cover letter generator parses an uploaded PDF or DOCX, turns the resume into
              structured context, and injects that context into the generation prompt. The design
              choice worth defending: I use whole-document context injection rather than
              retrieval-over-chunks.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              A resume is one or two pages — it fits in context whole. Chunking and embedding
              retrieval add a vector store, chunk-boundary bugs, and missed-context failures to a
              problem that does not have those failure modes. Retrieval earns its complexity when
              the corpus is bigger than the context window; here it would only add ways to lose
              the one document the output must be faithful to.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Evals: how I know it works</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-6">
              &ldquo;It looks right&rdquo; is not a test, especially when any of six models can answer a
              prompt. When I add or swap a provider, the same prompt set runs against it before it
              joins the fallback chain. The set checks behavior, not vibes:
            </p>
            <div className="border border-[#1f1f23] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#141416] text-left">
                    <th className="px-4 py-3 text-[#71717a] font-medium">Area</th>
                    <th className="px-4 py-3 text-[#71717a] font-medium">Check</th>
                    <th className="px-4 py-3 text-[#71717a] font-medium">Pass criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {evals.map((e, i) => (
                    <tr key={i} className="border-t border-[#1f1f23]">
                      <td className="px-4 py-3 text-white align-top whitespace-nowrap">{e.area}</td>
                      <td className="px-4 py-3 text-[#a1a1aa] align-top">{e.check}</td>
                      <td className="px-4 py-3 text-[#71717a] align-top">{e.pass}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#71717a] leading-relaxed text-sm mt-4">
              The two highest-value checks are grounding (a cover letter may not invent anything
              the resume does not contain — that is a hallucination with legal consequences) and
              minimal-diff (a grammar checker that rewrites your voice is worse than one with the
              typo left in).
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">What broke</h2>
            <ul className="space-y-3">
              {broke.map((item, i) => (
                <li key={i} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">What I&rsquo;d change</h2>
            <ul className="space-y-3">
              {nextTime.map((item, i) => (
                <li key={i} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal border-t border-[#1f1f23] pt-10">
            <a href="/" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">← Back to all projects</a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-[#52525b]">
          <p>© {new Date().getFullYear()} Olaide Bhadmus</p>
          <p>AI Engineer</p>
        </div>
      </footer>

    </div>
  )
}
