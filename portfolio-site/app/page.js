'use client'
import { useEffect, useRef } from 'react'

const projects = [
  {
    id: 'career',
    title: 'Career Suite',
    tag: 'Multi-provider LLM writing suite — Next.js 16',
    img: '/screenshots/career.png',
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'Supabase', 'OpenAI', 'Docker', 'Tailwind v4'],
    highlights: [
      'One provider interface across OpenAI, Groq, DeepSeek, Qwen, OpenRouter, and Ollama',
      'Automatic fallback switching — a failed provider call promotes the next in the chain',
      'Cover letters grounded in parsed resume context (PDF/DOCX upload)',
    ],
    repo: 'https://github.com/bhadmusolaide/career-suite',
    demo: 'https://career-suite-flax.vercel.app',
    stat: '6 AI\nproviders',
    caseStudy: true,
  },
  {
    id: 'ai-tools',
    title: 'AI Image Tools',
    tag: 'AI-powered image processing with admin panel',
    img: '/screenshots/aitools.png',
    tech: ['React 18', 'TypeScript', 'Firebase', 'TensorFlow.js', 'AWS S3', 'Replicate API', 'Vite'],
    highlights: ['Background removal, image upscaling, object removal via AI', 'Photo editor and image animation tools', 'Full admin panel: users, roles, features, settings, S3 integration'],
    repo: 'https://github.com/bhadmusolaide/my-ai-tools',
    demo: 'https://my-ai-tools.vercel.app',
    stat: 'TensorFlow.js\n+ Replicate',
  },
  {
    id: 'estate',
    title: 'Achievers Estate Management',
    tag: 'Landlord & payment system — 60+ residents',
    img: '/screenshots/estate.png',
    tech: ['React 19', 'Supabase', 'React-PDF', 'EmailJS', 'TanStack Query', 'Vite'],
    highlights: ['Payment processing with auto-generated PDF receipts', 'Multi-channel notifications via EmailJS + WhatsApp API', 'Active development through Sept 2026 with real-user feedback'],
    repo: 'https://github.com/bhadmusolaide/achievers_estate_mgt_zoneD',
    demo: 'https://zone-dachievers.netlify.app',
    stat: '60+\nactive users',
  },
  {
    id: 'feedmate',
    title: 'FeedMate',
    tag: 'Poultry feed calculator — cross-platform PWA',
    img: '/screenshots/feedmate.png',
    tech: ['Next.js 14', 'React Native', 'Expo', 'Zustand', 'Jest', 'PWA'],
    highlights: ['Monorepo sharing business logic between web and mobile', 'Feed optimization algorithms for broiler/layer phases', 'PWA with offline support, service worker, production at own farm'],
    repo: 'https://github.com/bhadmusolaide/farm-feed-calc',
    demo: 'https://omzofeedmate.vercel.app',
    stat: 'In production\nat own farm',
  },
  {
    id: 'stock',
    title: 'Omzo Farmz Stock',
    tag: 'Business ops — inventory, orders, audit',
    img: '/screenshots/stock.png',
    tech: ['React 18', 'Supabase', 'PostgreSQL', 'Recharts', 'MUI'],
    highlights: ['Role-based access with full audit trail and RLS', 'Real-time dashboard with KPI charts and stock alerts', 'Automated feed consumption with low-stock notifications'],
    repo: 'https://github.com/bhadmusolaide/my-farm-stock-management',
    demo: 'https://omzostock.netlify.app',
    stat: 'Full audit\ntrail',
  },
  {
    id: 'ecom',
    title: 'Yours E-Commerce',
    tag: 'Full store with admin panel',
    img: '/screenshots/ecom.png',
    tech: ['Next.js 14', 'TypeScript', 'Firebase', 'Stripe', 'PayPal'],
    highlights: ['Admin panel for products, categories, images', 'Firestore rules, CSRF, CSP, rate limiting', 'Cypress E2E + k6 load testing across 5 scenarios'],
    repo: 'https://github.com/bhadmusolaide/modern-ecom-with-admin-panel',
    demo: 'https://omj-ecom.vercel.app',
    stat: 'Stripe +\nPayPal',
  },
]

const experience = [
  { role: 'Founder & AI Operations Lead', at: 'Omzo Farmz', period: 'Apr 2025 – Present', bullets: ['Building AI-powered poultry management platform from the ground up', 'FeedMate in production at own 500-bird farm facility', 'Zero-to-one: market research → MVP → deployment'] },
  { role: 'Operations Manager', at: 'VideoRemix (SaaS)', period: 'Apr 2021 – Aug 2024', bullets: ['Built 3 OpenAI-powered agents running in production — content moderation, documentation generation, meeting transcription', 'AI support triage: classified and routed inbound tickets automatically — Tier-1 resolution cut from 4 hours to 45 minutes, 90% fewer complaints', 'AI recruitment screening pipeline with automated screening and fit scoring — 40% faster time-to-hire', 'AI-assisted delivery tracking — project risk detection and standup summaries lifted on-schedule sprint delivery from 45% to 70%'] },
  { role: 'Development Teams Manager', at: 'LTV Fund (Fintech)', period: 'Nov 2021 – Jun 2022 · concurrent with VideoRemix', bullets: ['Ran delivery for 7 distributed dev teams across fintech and social-impact products — 95% on-time releases, code review and release discipline', 'Automated metrics pipeline (Zapier + Python) with anomaly-detection alerts — 15% less admin overhead', 'AI analysis pipeline for 10,000+ monthly user-feedback entries'] },
  { role: 'Operations Manager', at: 'Txt2Give (Fintech)', period: 'Mar 2021 – Nov 2021 · concurrent with VideoRemix', bullets: ['Piloted AI response recommendations in support — 25% CSAT improvement', 'Intelligent ticket routing for 50+ weekly tickets — 30% faster resolution'] },
]

const skills = [
  { cat: 'AI Engineering', items: ['OpenAI', 'Claude', 'Gemini', 'Groq', 'DeepSeek', 'Qwen', 'Ollama', 'AI Agents', 'Prompt Design', 'Fallback & Rate-Limit Handling'] },
  { cat: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native', 'Zustand', 'Vite'] },
  { cat: 'Backend & Data', items: ['Node.js', 'Express', 'Supabase', 'Firebase', 'PostgreSQL', 'REST APIs'] },
  { cat: 'DevOps & Tools', items: ['Vercel', 'Git', 'Docker', 'Python', 'Zapier', 'Cursor', 'KiloCode'] },
  { cat: 'Testing & Evals', items: ['Jest', 'Cypress', 'k6', 'Vitest'] },
  { cat: 'Operations', items: ['Agile/Scrum', 'Process Automation', 'Remote Leadership'] },
]

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Reveal({ children, className = '' }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  useReveal()

  return (
    <div className="min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 w-full bg-[#0a0a0b]/90 backdrop-blur-xl border-b border-[#1f1f23] z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-medium tracking-widest text-[#e4e4e7] uppercase">OB</span>
          <div className="flex items-center gap-6 text-sm text-[#71717a]">
            <a href="#work" className="hover:text-[#e4e4e7] transition-colors">Work</a>
            <a href="#projects" className="hover:text-[#e4e4e7] transition-colors">Projects</a>
            <a href="/case-studies/career-suite" className="hover:text-[#e4e4e7] transition-colors">Case Study</a>
            <a href="#skills" className="hover:text-[#e4e4e7] transition-colors">Skills</a>
            <a href="/master-resume.html" target="_blank" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Resume →</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-6 animate-in">Olaide Bhadmus — AI Engineer</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 animate-in-d1">
              <span className="text-white">LLM-powered applications,</span>
              <br />
              <span className="text-[#52525b]">from provider integration to production.</span>
            </h1>
            <p className="text-lg text-[#71717a] leading-relaxed max-w-2xl mb-12 animate-in-d2">
              Six AI providers behind one interface with automatic fallback. Production apps serving 60+ real users.
              Previously led operations at US SaaS companies, deploying OpenAI-powered agents against real business problems.
              Claude Certified Developer (Anthropic).
            </p>
            <div className="flex flex-wrap items-center gap-10 animate-in-d3">
              <a href="#projects" className="inline-flex items-center gap-2 bg-white text-[#0a0a0b] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#e4e4e7] transition-colors">
                See projects
                <span className="text-lg">→</span>
              </a>
              <a href="mailto:bhadmusolaide@gmail.com" className="text-[#71717a] hover:text-[#e4e4e7] transition-colors text-sm font-medium">
                bhadmusolaide@gmail.com
              </a>
            </div>
            <div className="flex flex-wrap gap-10 mt-16 animate-in-d4">
              <div><div className="text-3xl font-bold text-white">6</div><div className="text-sm text-[#71717a] mt-1">applications shipped</div></div>
              <div><div className="text-3xl font-bold text-white">3</div><div className="text-sm text-[#71717a] mt-1">in production</div></div>
              <div><div className="text-3xl font-bold text-white">60+</div><div className="text-sm text-[#71717a] mt-1">active users</div></div>
              <div><div className="text-3xl font-bold text-white">6</div><div className="text-sm text-[#71717a] mt-1">AI providers integrated</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="work" className="py-28 px-6 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-3 reveal">Experience</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 reveal">Applied AI in production<br />at US SaaS companies.</h2>
          <p className="text-[#71717a] mb-20 max-w-xl reveal">These roles ran operations on the surface — underneath, I built and deployed the AI systems the metrics came from.</p>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <Reveal key={i}>
                <div className="group border border-[#1f1f23] rounded-xl p-6 md:p-8 hover:border-[#2a2a2e] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm text-[#71717a]">{exp.at}</p>
                    </div>
                    <span className="text-sm text-[#52525b] whitespace-nowrap">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                        <span className="text-amber-500/60 mt-1">—</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 px-6 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-3 reveal">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 reveal">Selected projects.</h2>
          <p className="text-[#71717a] mb-20 max-w-xl reveal">AI applications lead — the rest are proof I ship and maintain systems with real users.</p>
          <div className="space-y-5">
            {projects.map((p, i) => (
              <Reveal key={p.id}>
                <div className="group border border-[#1f1f23] rounded-xl hover:border-[#2a2a2e] transition-colors overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/3 p-6 md:p-8">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-amber-500 transition-colors">{p.title}</h3>
                          <p className="text-sm text-[#71717a] mt-0.5">{p.tag}</p>
                        </div>
                      </div>
                      <ul className="space-y-1.5 mb-5">
                        {p.highlights.map((h, j) => (
                          <li key={j} className="text-sm text-[#a1a1aa] flex items-start gap-2">
                            <span className="text-amber-500/60 mt-1">—</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tech.map((t) => (
                          <span key={t} className="text-xs text-[#52525b] bg-[#141416] px-2.5 py-1 rounded-md">{t}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-[#71717a] hover:text-white transition-colors font-medium">Source →</a>
                        {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors font-medium">Live →</a>}
                        {p.caseStudy && <a href="/case-studies/career-suite" className="text-[#a1a1aa] hover:text-white transition-colors font-medium">Case study →</a>}
                      </div>
                    </div>
                    <div className="lg:w-1/3 relative min-h-[180px] lg:min-h-[240px] bg-[#0d0d0e] overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-[#27272a] font-medium">
                        {p.stat ? (
                          <span className="text-center leading-tight whitespace-pre-line">{p.stat}</span>
                        ) : (
                          <span>Preview</span>
                        )}
                      </div>
                      {p.img && (
                        <img
                          src={p.img}
                          alt={`${p.title} screenshot`}
                          className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 px-6 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-3 reveal">Skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 reveal">Stack & capabilities.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((group, i) => (
              <Reveal key={group.cat}>
                <div className="border border-[#1f1f23] rounded-xl p-5 hover:border-[#2a2a2e] transition-colors">
                  <p className="text-xs font-medium text-amber-500/80 tracking-wider uppercase mb-3">{group.cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-sm text-[#a1a1aa] bg-[#141416] px-3 py-1.5 rounded-md">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / CONTACT */}
      <section id="about" className="py-28 px-6 border-t border-[#1f1f23]">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500/80 text-sm font-medium tracking-widest uppercase mb-3 reveal">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 reveal">How I work.</h2>
          <div className="grid md:grid-cols-2 gap-8 reveal">
            <div className="border border-[#1f1f23] rounded-xl p-8">
              <p className="text-[#a1a1aa] leading-relaxed mb-5">
                AI engineer and Claude Certified Developer (Anthropic) who builds production LLM
                applications solo, from multi-provider model integration to deployment. Previously led
                operations at US SaaS companies, where I built OpenAI-powered agents for content moderation,
                support triage, and recruitment screening. I care about systems that work reliably for real
                users, not just demos.
              </p>
              <p className="text-[#71717a] leading-relaxed text-sm mb-5">
                I use AI coding tools (Cursor, KiloCode) to ship faster — the difference is what gets shipped:
                systems with fallback handling, tested calculation engines, and real users to answer to.
              </p>
              <p className="text-[#71717a] leading-relaxed text-sm">
                My solo projects ship end-to-end, but not in isolation — I've managed 7 distributed dev teams
                (code review, release discipline, sprint delivery), so I know how team codebases run.
              </p>
            </div>
            <div className="border border-[#1f1f23] rounded-xl p-8">
              <p className="text-xs font-medium text-amber-500/80 tracking-wider uppercase mb-3">Education</p>
              <p className="text-white font-medium mb-1">B.Tech, Computer Science</p>
              <p className="text-sm text-[#71717a] mb-6">OSISATECH, 2010</p>
              <p className="text-xs font-medium text-amber-500/80 tracking-wider uppercase mb-3">Certifications</p>
              <div className="space-y-1 text-sm text-[#71717a] mb-6">
                <p><a href="https://www.credly.com/badges/b86c225b-5c83-428d-9c56-8224dcbe3209/public_url" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 transition-colors">Claude Certified Developer — Foundations (2026) →</a></p>
                <p>Asana Workflow Specialist (2025)</p>
                <p>LinkedIn Learning PM (2025)</p>
                <p>Coursera PM & Data Analytics (2024)</p>
              </div>
              <a href="mailto:bhadmusolaide@gmail.com" className="inline-block text-amber-500 hover:text-amber-400 transition-colors font-medium">bhadmusolaide@gmail.com →</a>
              <div className="flex gap-4 mt-3 text-sm text-[#71717a]">
                <a href="https://linkedin.com/in/bhadmus-olaide/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="https://github.com/bhadmusolaide" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
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
