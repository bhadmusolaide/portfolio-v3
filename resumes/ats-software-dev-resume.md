# Olaide Bhadmus
**AI Engineer | Full-Stack Developer**
Ibadan, Nigeria
bhadmusolaide@gmail.com
linkedin.com/in/bhadmus-olaide/ | github.com/bhadmusolaide

---

## PROFESSIONAL SUMMARY

AI engineer and Claude Certified Developer – Foundations (Anthropic) who builds production LLM applications solo, from private-document retrieval and multi-provider integration to deployment. Previously led operations at US SaaS companies, where I applied LLMs to support, hiring, and delivery workflows. Ships systems that work reliably for real users, not just demos.

---

## TECHNICAL SKILLS

**Frontend:** React, Next.js, TypeScript, JavaScript, React Native, Tailwind CSS, Zustand, Vite, Chrome Extensions (MV3)
**Backend:** Node.js, Express, Supabase, Firebase, PostgreSQL, IndexedDB, REST APIs
**AI Engineering:** OpenAI API, Anthropic (Claude) API, Gemini API, Groq, OpenRouter, Together AI, xAI (Grok), AI Agent Development, prompt design, retrieval over private documents (keyword/TF-IDF), streaming responses, token & cost controls, multi-provider integration
**DevOps:** Vercel, Git, Docker, Firebase Security Rules, Supabase RLS
**Testing:** Jest, Cypress, k6 Load Testing
**Tools:** Cursor, KiloCode, Augment, Zapier, Python

---

## SOFTWARE PROJECTS

### Career Suite — Multi-Provider LLM Writing Suite | Next.js 16, React 19, TypeScript, Prisma, PostgreSQL, Tailwind CSS
*Live at career-suite-flax.vercel.app*
- One provider interface across OpenAI, Groq, OpenRouter, Anthropic, and Together AI, with admin-configurable base URLs and models
- Cover letter generation grounded in parsed resume context (PDF/DOCX upload) using whole-document injection rather than chunked retrieval
- Grammar checking, text humanizer, summarizer, AI chat, and cover letters share one prompt layer; admin settings encrypt provider keys and stream chat responses
*github.com/bhadmusolaide/career-suite*

### Pageside — Job-Application Drafting Extension | TypeScript, React, Vite, Tailwind CSS, Chrome MV3, IndexedDB
*Open source (MIT) — Chrome extension*
- Drafts tailored answers to application-form questions from a personal vault (resume, notes, tone samples) instead of generic AI text; no backend, bring-your-own API key
- Five LLM providers (OpenRouter, Anthropic, OpenAI, xAI, Groq) behind one service-worker layer, with streamed responses
- Local retrieval over the vault (keyword, TF-IDF, experimental feature-hashed vectors); each draft lists its sources and flags unsupported facts as "NEEDS INPUT"
- Approval-first by design: never auto-submits, per-site permissions, undo, and token and cost controls per answer
*Case study: olaide-portfolio.netlify.app/case-studies/pageside | github.com/bhadmusolaide/pageside*

### AI Image Tools | React 18, TypeScript, TensorFlow.js, Replicate API, AWS S3
*Deployed at my-ai-tools.vercel.app*
- AI image processing: background removal, upscaling, object removal, photo editor, animation
- Full admin panel (users, roles, features, settings) with AWS S3 storage integration
*github.com/bhadmusolaide/my-ai-tools*

### Estate Management System | React 19, Supabase, EmailJS, React-PDF
*Production — serving 60+ landlords*
- Solo-built full-stack landlord management with payment processing, PDF receipt generation, and multi-channel messaging (EmailJS + WhatsApp)
- Supabase PostgreSQL with Row Level Security, TanStack Query for data fetching
- Mobile-responsive with active development through Sept 2026
*github.com/bhadmusolaide/achievers_estate_mgt_zoneD*

### FeedMate — Feed Planning Tool | Next.js 14, React Native/Expo, Zustand, Jest, PWA
*Production — used at own farm*
- Feed calculator with save and auto-progression, feeding schedule, weekly summary, daily dashboard, and breed comparison
- Jest-tested feed-optimization engine in a monorepo shared across web and mobile, with offline PWA support
*github.com/bhadmusolaide/farm-feed-calc*

### Omzo Farmz Management System | React 18, Supabase, PostgreSQL, Recharts
*Production — runs my own 500-bird farm*
- Consolidates batches, feed, inventory, orders, transactions, processing history, customers, and reports to cut manual work, loss, and leakage
- Dashboard with role-based access and audit trails so stock and cash movements are traceable; forecasting from current batch consumption
- Results: 7 → 9 batches per year (+29%); market weight in 5 weeks 2 days instead of 6 weeks
*github.com/bhadmusolaide/my-farm-stock-management*

### E-Commerce Platform | Next.js 14, TypeScript, Firebase, Stripe, PayPal
*Deployed at omj-ecom.vercel.app*
- Admin panel for product/category management, image upload, visibility control
- Security: Firestore rules, CSRF, CSP, rate limiting, Firebase Authentication
- Cypress E2E, k6 load testing, Stripe/PayPal payment integration
*github.com/bhadmusolaide/modern-ecom-with-admin-panel*

---

## PROFESSIONAL EXPERIENCE

**Co-founder & Software Engineer** | Omzo Farmz, Ibadan, Nigeria | Apr 2025 – Present
- Built the management system now running my own 500-bird farm, lifting batches per year from 7 to 9 (+29%), shortening time to market weight from 6 weeks to 5 weeks 2 days (~12% faster), and lowering feed and medication spend per batch
- Designed and built a cross-platform farm management system and FeedMate, a feed optimization tool (Next.js web + React Native mobile) for African farmers, solo: architecture, shared business logic, database design, and deployment on Vercel with Supabase PostgreSQL
- Built a companion stock management system (React + Supabase): orders, audit trails, role-based access control, feed inventory

**Operations Manager** | VideoRemix, Delaware, US (Remote) | Apr 2021 – Aug 2024
- Cut time-to-hire by 40% by rebuilding the recruitment workflow
- Raised on-schedule sprint delivery from 45% to 70% through tighter sprint planning, risk tracking, and standup summaries
- Brought Tier-1 resolution time down from 4 hours to 45 minutes and cut customer complaints 90% by restructuring support triage and routing
- Used OpenAI to classify and route inbound support tickets; built internal tools on the OpenAI API for content moderation, documentation generation, and meeting transcription, in production
- Managed the company AWS account, including S3 storage, IAM users and access policies, and domain management; produced monthly P&L reports for management

**Development Teams Manager** | LTV Fund, Delaware, US (Remote) | Nov 2021 – Jun 2022 · concurrent with VideoRemix
- Ran delivery for 7 distributed development teams across fintech and social-impact products, with 95% on-time releases
- Cut administrative overhead 15% with an automated metrics pipeline (Zapier + Python), including rule-based and statistical alerts for abnormal metrics
- Built a pipeline using an LLM to surface themes in 10,000+ monthly user-feedback entries

**Operations Manager** | Txt2Give, Delaware, US (Remote) | Mar 2021 – Nov 2021 · concurrent with VideoRemix
- Raised customer satisfaction 25% by overhauling the support process
- Managed 50+ weekly tickets with 30% faster resolution through ticket routing and escalation rules
- Piloted AI-suggested response recommendations in support

---

## EDUCATION & CERTIFICATIONS

**B.Tech, Computer Science** — Our Saviour Institute of Science, Agriculture and Technology (OSISATECH), 2010
Claude Certified Developer — Foundations — Anthropic (2026) — [Verify badge](https://www.credly.com/badges/b86c225b-5c83-428d-9c56-8224dcbe3209/public_url)
Workflow Specialist — Asana (Jan 2025)
Product Management Professional — LinkedIn Learning (Feb 2025)
Project Management & Data Analytics — Coursera (2024)
