'use client'
import { useEffect } from 'react'
import DemoVideo from '../../components/Media'

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const providers = ['OpenAI', 'Groq', 'OpenRouter', 'Anthropic', 'Together AI']

const promptRules = [
  { rule: 'Evidence first', detail: 'Match specific resume evidence to the job description. No generic claims.' },
  { rule: 'No AI tells', detail: 'Ban "delve", "leverage", "seamless", three-item parallel lists, and "not just X, but Y".' },
  { rule: 'Human voice', detail: 'Contractions, varied sentence length, peer-to-peer tone. No placeholders.' },
  { rule: 'Fidelity', detail: 'Summaries preserve every fact and the author\'s perspective. No new claims.' },
]

const broke = [
  'Providers format the same instruction differently: markdown, verbosity, and language habits drift between models, so output post-processing has to be provider-aware.',
  'Provider keys are encrypted with a key derived from ADMIN_PASSWORD. Rotating the password without re-entering keys leaves saved keys undecryptable, which needed an explicit recovery path.',
  'pdf-parse 1.1.1 has a bug where importing its index loads a test file when there is no parent module. The extractor imports the inner parser directly to avoid it.',
  'Long resumes plus a detailed instruction can push past smaller models\' context windows. The failure looks like an ignored instruction, not an error.',
]

const nextTime = [
  'Automatic failover with health checks and exponential backoff, now that the provider layer is in place.',
  'An automated eval set in CI for grounding, fidelity, and minimal-diff, so a provider swap is validated by behavior rather than inspection.',
  'Per-task model routing: cheap fast models for short rewrites, stronger models for cover letters, with response caching.',
  'Structured outputs or JSON mode where a provider supports it, instead of parsing free-form text.',
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
            <a href="/case-studies" className="hover:text-[#e4e4e7] transition-colors">All case studies</a>
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
            A multi-provider LLM writing suite: grammar checking, humanizing, summarization,
            and resume-grounded cover letters. Built solo, in production, and used daily by
            the person who built it.
          </p>
          <div className="flex flex-wrap gap-1.5 animate-in-d3">
            {['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', ...providers].map(t => (
              <span key={t} className="text-xs text-[#52525b] bg-[#141416] px-2.5 py-1 rounded-md">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <DemoVideo
        title="Career Suite"
        mp4="/showcase/career-suite.mp4"
        webm="/showcase/career-suite.webm"
        poster="/screenshots/career.png"
      />

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
              A Next.js 16 / React 19 app, with Prisma over PostgreSQL for provider settings,
              profiles, history, and chat sessions. Server routes handle extraction, generation,
              and settings without a separate backend service.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              The load-bearing piece is the provider layer: every AI feature calls one
              OpenAI-compatible interface, and admin settings supply the base URL, model, and
              encrypted key for the active provider. Features never talk to a vendor SDK
              directly. Supported providers are OpenAI, Groq, OpenRouter, Anthropic, and
              Together AI.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Why multiple providers</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Model diversity is the point. Different providers are strong at different tasks and
              price tiers, and all five expose OpenAI-compatible endpoints, so switching providers
              is configuration rather than a code change.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              The honest tradeoff: one provider is active at a time, with no automatic failover.
              Failover needs health checks, backoff, and an eval set to decide when promotion is
              safe. I would rather ship the current behavior than a chain that silently changes
              model behavior mid-task.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Provider configuration</h2>
            <ul className="space-y-3">
              {[
                'Each provider stores a base URL, model, and API key; keys are encrypted with AES-256-GCM using a key derived from the admin password.',
                'The admin selects the active provider, and every tool then uses it through the same client.',
                'Base URLs and models are resolved per provider, so a new OpenAI-compatible endpoint is configuration.',
                'A failed call surfaces an error to the user. There is no cross-provider retry or fallback chain.',
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
              The cover letter generator parses an uploaded PDF or DOCX into plain text and injects
              that text into the generation prompt. The design choice worth defending: whole-document
              context injection rather than retrieval-over-chunks.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              A resume is one or two pages, so it fits in context whole. Chunking and embedding
              retrieval would add a vector store, chunk-boundary bugs, and missed-context failures
              to a problem that does not have those failure modes. Retrieval earns its complexity
              when the corpus is bigger than the context window; here it would only add ways to lose
              the one document the output must be faithful to.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Prompt design</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-6">
              There is no automated eval set. Quality is constrained in the prompts and reviewed
              manually. The cover-letter prompt is the strictest:
            </p>
            <div className="border border-[#1f1f23] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#141416] text-left">
                    <th className="px-4 py-3 text-[#71717a] font-medium">Rule</th>
                    <th className="px-4 py-3 text-[#71717a] font-medium">What it enforces</th>
                  </tr>
                </thead>
                <tbody>
                  {promptRules.map((r, i) => (
                    <tr key={i} className="border-t border-[#1f1f23]">
                      <td className="px-4 py-3 text-white align-top whitespace-nowrap">{r.rule}</td>
                      <td className="px-4 py-3 text-[#a1a1aa] align-top">{r.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#71717a] leading-relaxed text-sm mt-4">
              These are prompt constraints, not guarantees. The summarizer prompt adds a fidelity
              rule, and the humanizer is told to keep the original meaning, facts, and structure. An automated eval set is
              the first thing I would add.
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

          <div className="reveal border-t border-[#1f1f23] pt-10 flex flex-wrap gap-6">
            <a href="/" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">← Back to all projects</a>
            <a href="/case-studies/pageside" className="text-[#a1a1aa] hover:text-white transition-colors font-medium">Pageside case study →</a>
          </div>

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
