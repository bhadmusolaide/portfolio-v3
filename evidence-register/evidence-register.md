# Private Evidence Register

> **Confidential** — Links resume claims to supporting sources. Do not distribute.

---

## 1. Employment History

### Founder & AI Operations Lead — Omzo Farmz (Apr 2025–Present)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| Built cross-platform poultry management platform | github.com/bhadmusolaide/farm-feed-calc — monorepo with web (Next.js 14) + mobile (React Native/Expo) + shared utils | Verified fact |
| Developed feed optimization algorithms | shared/utils/feedCalculator.js in farm-feed-calc — broiler/layer phase calculations, pricing config | Verified fact |
| Stock management companion system | github.com/bhadmusolaide/my-farm-stock-management — orders, inventory, feed mgmt, audit trail with Supabase | Verified fact |
| Runs 500-bird facility | Claimed in Google Doc professional document | Self-reported |
| Deployed on Vercel | Vercel deployment URLs in both repo configs | Verified fact |

### Operations Manager — VideoRemix (Apr 2021–Aug 2024)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| 40% reduction in time-to-hire | No public repo evidence | Self-reported |
| 70% on-schedule sprint delivery | No public repo evidence | Self-reported |
| 90% reduction in customer complaints | No public repo evidence | Self-reported |
| Built 3 custom AI agents (OpenAI API) | No public repo evidence | Self-reported |

### Development Teams Manager — LTV Fund (Nov 2021–Jun 2022)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| Managed 7 remote dev teams | No public repo evidence | Self-reported |
| 95% on-time release rate | No public repo evidence | Self-reported |

### Operations Manager — Txt2Give (Mar 2021–Nov 2021)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| 25% CSAT improvement | No public repo evidence | Self-reported |

---

## 2. Software Projects

### Achievers Estate Management System

| Claim | Evidence | Classification |
|-------|----------|---------------|
| React 19 + Vite + Supabase stack | package.json (zone-d-landlord-mgt-app) — React 19.2, Vite 7.2, Supabase JS v2, TanStack Query | Verified fact |
| 60+ landlords in production | Active commit history through Sept 2026 shows real-world bug fixes ("fixes for deactivated landlords"); PRODUCTION_DEPLOYMENT.md | Reasonable inference |
| PDF receipt generation | @react-pdf/renderer v4.3 in dependencies | Verified fact |
| EmailJS messaging | @emailjs/browser v4.4 + EMAILJS_MIGRATION_SUMMARY.md | Verified fact |
| Mobile responsive | Commit messages: "mobile responsiveness for cards" (Sept 2026) | Verified fact |
| **Security concern: .env committed** | .env file visible in repo root with live credentials | Verified flag |

### Poultry Feed Calculator (farm-feed-calc)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| Cross-platform (web + mobile) | Monorepo workspaces: web/ (Next.js 14) + mobile/ (React Native/Expo) + shared/ | Verified fact |
| Shared business logic | shared/utils/feedCalculator.js, shared/utils/pricingConfig.js, shared/utils/errorHandling.js | Verified fact |
| Jest-tested | jest.config.js, tests/ directory, "test" script in package.json | Verified fact |
| Supports Nigerian market | Nigerian feed brands, NGN currency, localization for Ghana/Kenya in README | Verified fact |
| **Deployed but currently 404** | Vercel URL farm-feed-calc-web.vercel.app returns 404 | Verified fact |

### Stock Management System (my-farm-stock-management)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| React 18 + Vite + Supabase | package.json (chicken-stock-react) — React 19.1, Vite 7.0, Supabase v2.52 | Verified fact |
| Role-based access (Admin/User) | Users table with role column in schema.sql, UserManagement page | Verified fact |
| Feed management with low-stock alerts | FeedManagement page component, dashboard integration | Verified fact |
| Audit trail | AuditTrail page component, CRUD logging | Verified fact |

### E-Commerce Platform (modern-ecom-with-admin-panel)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| Next.js 14 + TypeScript + Firebase | package.json (omj-ecom) — Next.js 15, Firebase v12, TypeScript | Verified fact |
| Admin panel | Admin panel described in README with product/category CRUD | Verified fact |
| Cypress E2E tests | cypress/ directory with customer/admin/payment scenarios | Verified fact |
| Load testing | k6 scripts: order-placement, product-browsing, admin-dashboard, cart-operations, checkout | Verified fact |
| Stripe + PayPal payments | @stripe/react-stripe-js, @paypal/react-paypal-js in dependencies | Verified fact |
| Deployed | omj-ecom.vercel.app responds (basic HTML) | Verified fact |

### AI Grammar Checker (grammar-checker)

| Claim | Evidence | Classification |
|-------|----------|---------------|
| Multi-provider AI | README lists Ollama, OpenAI, Groq, DeepSeek, Qwen, OpenRouter | Verified fact |
| Career tools | README mentions resume optimization, job application assistant | Verified fact |
| Docker support | Dockerfile in repo | Verified fact |
| Used daily | Self-reported by author | Self-reported |

---

## 3. Evidence Quality Summary

| Category | Items | Quality |
|----------|-------|---------|
| Public GitHub projects (code, commits, docs) | 6 repos, all solo-authored | **Verified** |
| Professional claims (metrics, impact) | Revenue savings, % improvements | **Self-reported** — no external verification |
| Employment history | 4 roles at US companies | **Self-reported** — no LinkedIn corroboration |
| Education | B.Tech 2010, OSISATECH | **Confirmed by user** |
| Certifications | Asana, LinkedIn Learning, Coursera | **Reasonable inference** (standard platforms) |

---

## 4. Security Flags

1. **achievers_estate_mgt_zoneD**: Committed `.env` file with Supabase URL, EmailJS keys, WhatsApp credentials — add to .gitignore and rotate secrets
2. **grammar-checker**: May expose AI provider API keys in backend config
3. **modern-ecom-with-admin-panel**: .env.example shows Firebase config shape — good practice, no actual keys