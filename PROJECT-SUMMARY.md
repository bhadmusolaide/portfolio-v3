# Project Summary — Olaide Bhadmus Portfolio

## Profile Direction
**AI Engineer** — builds production LLM applications solo (multi-provider integration, fallback switching, eval design). Ops background at US SaaS companies framed as applied AI experience. Also has a Product Management variant.

## Repositories Audited

### Public (5)
| Repo | Status | Stack | Live URL |
|------|--------|-------|----------|
| achievers_estate_mgt_zoneD | Production (60+ landlords) | React 19, Supabase, Vite | zone-dachievers.netlify.app |
| farm-feed-calc (FeedMate) | Production (own farm) | Next.js 14, React Native, PWA | omzofeedmate.vercel.app |
| my-farm-stock-management | Production | React 18, Supabase, PostgreSQL | omzostock.netlify.app |
| modern-ecom-with-admin-panel | Deployed | Next.js 14, Firebase, Stripe | omj-ecom.vercel.app |
| grammar-checker | Personal | React/TS, Express, 6 AI providers | — |

### Private (2, accessed via token)
| Repo | Status | Stack | Live URL |
|------|--------|-------|----------|
| career-suite | Production | Next.js 16, Prisma, Supabase, OpenAI | career-suite-flax.vercel.app |
| my-ai-tools | Deployed | React 18, TensorFlow.js, Firebase, S3 | my-ai-tools.vercel.app |

## Deliverables Created

| File | Purpose |
|------|---------|
| `resumes/master-resume.html` | Master resume (printable, all evidence) |
| `resumes/ats-software-dev-resume.md` | ATS-optimized AI Engineer resume |
| `resumes/pm-variant-resume.md` | Product Management variant |
| `evidence-register/evidence-register.md` | Private — links claims to sources |
| `portfolio-site/` | Next.js portfolio site with case studies |
| `screenshots/` | 6 project screenshots |
| `CLAUDE.md` | Project context and repo inventory |
| `netlify.toml` | Netlify build config (base: portfolio-site, publish: out) |

## Deployment
- **GitHub**: github.com/bhadmusolaide/portfolio-v3 (master branch)
- **Netlify**: olaide-portfolio.netlify.app (may need manual deploy trigger)

## Security Flags
- ⚠️ achievers_estate_mgt_zoneD — committed `.env` with live credentials (rotate secrets + .gitignore)
- ⚠️ grammar-checker — potential AI API key exposure in backend config

## Remaining
- Portfolio site deploys to olaide-portfolio.netlify.app (confirm it works)
- Rotate exposed credentials in estate repo
- Employment metrics are self-reported, not externally verified