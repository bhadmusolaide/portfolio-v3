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

const providers = ['OpenRouter', 'Anthropic', 'OpenAI', 'xAI (Grok)', 'Groq']

const retrieval = [
  { mode: 'Keyword', what: 'Term overlap against vault items', why: 'Default: predictable, explainable, no setup' },
  { mode: 'TF-IDF', what: 'Weighted terms across the vault', why: 'Better when questions share vocabulary with a note but not exact words' },
  { mode: 'Feature-hashed vectors', what: 'Dependency-free 512-dimension local embeddings', why: 'Experimental: semantic-ish recall without downloading a model or calling a network' },
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
            <a href="https://github.com/bhadmusolaide/pageside" target="_blank" rel="noopener noreferrer" className="hover:text-[#e4e4e7] transition-colors">Source</a>
            <a href="/master-resume.html" target="_blank" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Resume →</a>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-6 animate-in">Case Study</p>
          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-6 animate-in-d1">
            <span className="text-white">Pageside</span>
          </h1>
          <p className="text-lg text-[#71717a] leading-relaxed mb-10 animate-in-d2">
            A Manifest V3 Chrome extension that drafts job-application answers from a personal
            vault, with local retrieval, source attribution, and an approval gate. No backend,
            bring your own API key, and never an automatic submission.
          </p>
          <div className="flex flex-wrap gap-1.5 animate-in-d3">
            {['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Chrome MV3', 'IndexedDB', ...providers].map(t => (
              <span key={t} className="text-xs text-[#52525b] bg-[#141416] px-2.5 py-1 rounded-md">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <DemoVideo
        title="Pageside"
        mp4="/showcase/pageside.mp4"
        webm="/showcase/pageside.webm"
        poster="/screenshots/pageside.png"
      />

      {/* BODY */}
      <section className="pb-28 px-6">
        <div className="max-w-3xl mx-auto space-y-20">

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">The problem</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Application forms ask the same things in different words: why this company, describe
              a conflict, walk me through a project. Rewriting those answers is slow, and pasting
              generic AI text into them is obvious to anyone who reads applications for a living.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              I wanted the answer grounded in my own material: the resume, project notes, and tone
              samples that already describe what I did. That makes the tool a retrieval and
              grounding problem more than a generation problem, and it made privacy a design
              constraint rather than a footnote.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Constraints that shaped it</h2>
            <ul className="space-y-3">
              {[
                'No backend. The extension runs entirely in the browser and calls the model provider directly with the user\'s own key, so there is no server holding resumes or API credentials.',
                'No automatic submission. Drafts are proposals. A bulk insert requires explicit approval, and the last insert can be undone.',
                'Per-site permissions. The content script is not injected until the user enables a site, and the manifest keeps all-URL access as an optional permission only.',
                'Local retrieval. Vault content, history, and embeddings stay in IndexedDB. Retrieval runs on device rather than sending the whole vault to a provider.',
              ].map((item, i) => (
                <li key={i} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Architecture</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              The service worker is the only place that talks to a provider. It exposes one
              interface over OpenRouter, Anthropic, OpenAI, xAI, and Groq, and streams responses
              back to the side panel over a runtime port instead of buffering a full answer.
              Features never import a vendor SDK.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Around that core: a content script scans frames, detects fields, and fills them; a
              side panel lists every detected question with a lifecycle status; an options page
              manages vault profiles, site profiles, history, and settings. Field detection and
              filling are pure modules, which is what makes them unit-testable without a browser.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              The vault lives in IndexedDB, with multiple profiles (for example, product roles and
              operations roles) and local import from PDF, DOCX, TXT, and Markdown. PDF parsing uses
              a bundled pdfjs worker; DOCX is parsed natively. No file leaves the browser.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Retrieval without a vector service</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              The obvious implementation is embeddings plus a hosted vector store. That adds a
              network dependency, a data-egress path, and a service to keep alive for a corpus that
              is often a few dozen notes. Instead, retrieval runs locally in three selectable modes:
            </p>
            <div className="border border-[#1f1f23] rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#141416] text-left">
                    <th className="px-4 py-3 text-[#71717a] font-medium">Mode</th>
                    <th className="px-4 py-3 text-[#71717a] font-medium">How it ranks</th>
                    <th className="px-4 py-3 text-[#71717a] font-medium">When it helps</th>
                  </tr>
                </thead>
                <tbody>
                  {retrieval.map((r, i) => (
                    <tr key={i} className="border-t border-[#1f1f23]">
                      <td className="px-4 py-3 text-white align-top whitespace-nowrap">{r.mode}</td>
                      <td className="px-4 py-3 text-[#a1a1aa] align-top">{r.what}</td>
                      <td className="px-4 py-3 text-[#71717a] align-top">{r.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[#a1a1aa] leading-relaxed">
              Retrieval is cached per page and question, and the context it produces is bounded by
              a configurable token budget. The extension also reuses accepted answers: a
              near-identical past question is served from history, and a vault note whose title
              matches the question is offered directly without an LLM call.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Grounding and NEEDS INPUT</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              Generated text is only useful if the reader can trust it. Every draft lists the vault
              items it drew from. Any missing fact the model cannot source is flagged in red as
              NEEDS INPUT and stripped from the text on insert, so an unsupported claim does not
              quietly become part of an application.
            </p>
            <p className="text-[#a1a1aa] leading-relaxed">
              That flag is the part I would defend hardest. A confident paragraph with an invented
              metric is worse than a visible gap, because the gap is cheap to fix and the invented
              metric is not.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Approval, failure, and cost</h2>
            <ul className="space-y-3">
              {[
                'Every question carries a status: no draft, drafting, draft, inserted, skipped, cancelled, or error, plus a provenance chip for vault, history, or LLM.',
                'Bulk insert writes only approved drafts, shows a confirmation count, and supports undo of the last insert. Drafts can be edited inline before insertion.',
                'Failures distinguish bad keys, rate limits, missing vault content, timeouts, network errors, and API errors, and offer a recovery action instead of a dead end.',
                'A vault context budget (1,000 to 12,000 tokens), a past-answer limit, and an output length derived from the word limit keep requests predictable; token usage and an estimated cost are shown per answer and per session.',
              ].map((item, i) => (
                <li key={i} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#a1a1aa] leading-relaxed mt-4">
              The panel also starts with a setup checklist (API key, vault contents, site access)
              instead of an empty state, and the interface targets accessible defaults: 12px
              minimum text, 44px primary targets, visible focus, focus trapping in dialogs, and
              live status announcements.
            </p>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">What broke</h2>
            <ul className="space-y-3">
              {[
                'Runtime-granted host permissions are not forever: reloading an unpacked extension can drop them, so the extension has to remember enabled origins and restore content scripts once permission is available again.',
                'Cross-origin iframes still need their own host permission. Aggregating fields across frames works, but the permission model cannot be smoothed over.',
                'Scanned image-only PDFs have no text layer. The parser handles compressed streams and font encoding, but OCR is a separate problem and the UI says so instead of importing garbage.',
                'Provider usage is not always reported. When it is missing, the token and cost numbers are estimates, and the UI labels them as such rather than pretending to precision.',
                'Application forms are not a schema. Field detection across varied DOMs, shadow roots, and multi-step wizards needed pure, testable detection rules instead of selector lists scattered through the UI.',
              ].map((item, i) => (
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
              {[
                'Add local OCR for scanned PDFs, since that is the one import path that still dead-ends.',
                'Run an automated eval set over retrieval and answer faithfulness in CI. The project has unit tests for pure modules, but retrieval quality and grounding deserve automated checks, not just unit tests.',
                'Replace feature hashing with a small local embedding model once it can ship without a network call or a large download.',
                'Publish to the Chrome Web Store with an update path, instead of relying on load-unpacked installs.',
              ].map((item, i) => (
                <li key={i} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                  <span className="text-amber-500/60 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h2 className="text-2xl font-bold text-white mb-4">Try it</h2>
            <p className="text-[#a1a1aa] leading-relaxed mb-4">
              The extension is MIT licensed. Build with <code className="text-[#e4e4e7]">npm run build</code>,
              load <code className="text-[#e4e4e7]">dist/</code> as an unpacked extension, add a provider
              key and vault items, then enable it on a site and scan a form.
            </p>
            <a href="https://github.com/bhadmusolaide/pageside" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Source on GitHub →</a>
          </div>

          <div className="reveal border-t border-[#1f1f23] pt-10 flex flex-wrap gap-6">
            <a href="/" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">← Back to all projects</a>
            <a href="/case-studies/career-suite" className="text-[#a1a1aa] hover:text-white transition-colors font-medium">Career Suite case study →</a>
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
