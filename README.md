# FaborMe

An AI-powered communication coaching platform for UK professionals — speech, CV,
LinkedIn, interview practice, and human coach review, all in one suite.

> **Implementation status.** This repository is a working scaffold of the
> Sprint 1 + Sprint 2 deliverables from the [FaborMe Technical Design](./docs/),
> with skeletons in place for every other sprint. The auth, billing, segmentation,
> and speech pipeline are wired end-to-end. CV, LinkedIn, interview, and coach
> modules are functional but minimal — extend per the spec.

## Stack

- **Framework** — Next.js 14 (App Router) + TypeScript strict
- **Database & auth** — Supabase (Postgres 15, magic-link auth, storage)
- **Hosting** — Railway (Frankfurt region recommended for GDPR)
- **Background jobs** — Inngest (speech pipeline, coach SLA)
- **Billing** — Stripe (UK entity, GBP)
- **AI services** — Claude (semantic scoring, CV review, LinkedIn rewrite,
  interview scoring), Deepgram Nova-3 (en-GB STT), ElevenLabs (target-accent
  playback)
- **Email** — Resend
- **Rate limiting / credit reservations** — Upstash Redis

## Architecture principles

Every choice in this codebase maps to a principle in the technical design doc:

| # | Principle | Where it lives |
|---|-----------|----------------|
| 01 | Single hero product, modular suite | One Next.js app, modules in `app/(dashboard)/{speech,cv,linkedin,interview,coach}` |
| 02 | Speech is the moat | `inngest/functions/speech-pipeline.ts` — full 5-stage chain |
| 03 | UK-native everywhere | `lib/fmt.ts` enforces en-GB; no `toLocaleString()` elsewhere |
| 04 | Sharp segmentation from first touch | `app/(dashboard)/onboarding/page.tsx` + `lib/segments.ts` |
| 05 | Transparent billing as code | `components/billing/cancel-button.tsx` — 3 clicks to cancel |
| 06 | Coaching frame, not copilot | Practice loops in every module; no real-time overlay |
| 07 | HITL as a premium tier | `coaches` + `coach_reviews` tables from day one |
| 08 | Multi-tenant from day one | `organisations` table; every user has a personal org |

---

## First-time setup

### 1. Prerequisites

You'll need accounts for:

| Service | Used for |
|---|---|
| GitHub | Version control |
| Railway | App hosting |
| Supabase | Database, auth, file storage |
| Stripe | Subscription billing (UK entity, GBP) |
| Anthropic | Claude API |
| Deepgram | Speech-to-text (en-GB) |
| ElevenLabs | Target-accent audio playback |
| Inngest | Background job orchestration |
| Upstash | Redis (credit reservations) |
| Resend | Transactional email |

### 2. Push to GitHub

```bash
cd faborme
git init
git add .
git commit -m "Initial FaborMe scaffold"
git branch -M main
git remote add origin https://github.com/<your-handle>/faborme.git
git push -u origin main
```

Protect the `main` branch in Settings → Branches once pushed.

### 3. Create the Supabase project

1. Go to [supabase.com](https://supabase.com), create a project in the EU
   region (Frankfurt or Ireland — GDPR alignment).
2. Project Settings → API — copy the **URL**, **anon key**, and **service
   role key**.
3. SQL Editor → paste the contents of
   `supabase/migrations/0001_initial_schema.sql` and run.
4. Storage → New bucket → create three private buckets:
   - `audio` (speech recordings + ElevenLabs playback)
   - `uploads` (CV uploads)
   - `coach-videos` (premium-tier video responses)
5. Authentication → URL Configuration → set Site URL to your Railway URL
   once deployed (placeholder for now).

### 4. Create the Stripe products

In Stripe Dashboard → Products, create three recurring GBP products:

| Product | Monthly price |
|---|---|
| Starter | £15 |
| Practitioner | £29 |
| Premium | £49 |

Copy each Price ID — they go into env vars below.

Then Developers → Webhooks → Add endpoint:
- URL: `https://<your-railway-url>/api/stripe/webhook` (set after first deploy)
- Events: `customer.subscription.created`, `customer.subscription.updated`,
  `customer.subscription.deleted`, `invoice.paid`

Copy the **signing secret**.

### 5. Get your other API keys

| Where | What |
|---|---|
| [console.anthropic.com](https://console.anthropic.com) → API Keys | `ANTHROPIC_API_KEY` |
| [console.deepgram.com](https://console.deepgram.com) | `DEEPGRAM_API_KEY` |
| [elevenlabs.io](https://elevenlabs.io) → Profile → API Key | `ELEVENLABS_API_KEY` |
| ElevenLabs → Voices | One voice ID each for RP / Estuary / neutral UK |
| [app.inngest.com](https://app.inngest.com) → Settings | `INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY` |
| [console.upstash.com](https://console.upstash.com) → Redis | `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` |
| [resend.com](https://resend.com) → API Keys | `RESEND_API_KEY` |

### 6. Deploy to Railway

1. [railway.app](https://railway.app) → New Project → Deploy from GitHub repo.
2. Select your `faborme` repo. Railway auto-detects Next.js via Nixpacks
   (config in `nixpacks.toml`).
3. Variables → paste in every key from `.env.example`. Set
   `NEXT_PUBLIC_APP_URL` to the Railway-provided URL initially.
4. Settings → Networking → Generate Domain (or attach `faborme.com` via DNS).
5. Once the first deploy succeeds, go back to Stripe and Supabase and
   update the webhook URL / Site URL with the real Railway domain.

### 7. Seed the speech curriculum

Run locally with your service role key set:

```bash
cp .env.example .env.local   # fill in values
npm install --legacy-peer-deps
npx tsx scripts/seed-exercises.ts
```

This populates ~20 starter exercises across the 8 modules from
[Section 3.5 of the technical design](./docs/FaborMe-Technical-Design.docx).
Add more as content is written.

### 8. Local development

```bash
npm install --legacy-peer-deps
npm run dev              # http://localhost:3000
npm run inngest:dev      # in a second terminal, for background jobs
```

---

## Repository layout

```
faborme/
├── app/                      Next.js App Router
│   ├── (auth)/               Login, signup, callback
│   ├── (dashboard)/          Protected app shell + modules
│   │   ├── dashboard/        Overview
│   │   ├── onboarding/       3-question wedge classifier
│   │   ├── speech/           Hero module — curriculum + sessions
│   │   ├── cv/               CV ATS scan + Claude review
│   │   ├── linkedin/         Profile rewrite
│   │   ├── interview/        Behavioural / technical / speech-led
│   │   ├── coach/            Premium-tier human review
│   │   └── account/billing/  3-click cancel flow
│   ├── api/                  Route handlers
│   └── globals.css           Brand design tokens
├── components/               React components by domain
├── lib/
│   ├── supabase/             Client / server / service / middleware
│   ├── integrations/         Stripe, Claude, Deepgram, ElevenLabs
│   ├── fmt.ts                en-GB locale enforcement
│   └── segments.ts           Wedge classifier source of truth
├── inngest/
│   ├── client.ts             Inngest setup + typed event registry
│   └── functions/            Background workers
├── supabase/migrations/      SQL migrations
├── scripts/                  Seeds and one-shots
├── docs/                     The technical design + build documents
├── middleware.ts             Auth gate
├── railway.json              Railway deploy config
└── nixpacks.toml             Build config
```

## What's implemented, in detail

### Foundation (Sprint 1 — complete)

- Magic-link auth via Supabase
- Stripe subscriptions (checkout, webhook, 3-click cancel)
- Multi-tenant organisations from day one
- Brand design system (Cormorant Garamond + Outfit, navy/gold/cream palette)
- en-GB locale enforcement
- Auth-gated dashboard shell

### Segmentation (Sprint 3 — complete)

- 3-question wedge classifier on onboarding
- Segment fields denormalised onto `users` for hot-path reads
- Sector → CV template, accent target, and content recommendation mapping

### Speech engine (Sprint 2 — pipeline complete, content seeded)

- Browser audio capture via MediaRecorder + Web Audio API
- Signed upload to Supabase Storage
- Inngest 5-stage pipeline: Deepgram transcription → acoustic analysis →
  Claude semantic scoring → ElevenLabs target playback → persist
- Session detail page with metrics and feedback
- 20 starter exercises across 8 modules

### CV (Sprint 5 — functional skeleton)

- File upload (PDF/DOCX) to Supabase Storage
- Claude review against UK ATS + recruiter conventions
- ATS score persisted on the document

> ⚠️ PDF/DOCX text extraction is stubbed. Add `pdf-parse` and `mammoth` to
> `lib/integrations/extractor.ts` before launching.

### LinkedIn (Sprint 5 — functional skeleton)

- Three-field rewrite (headline, About, experience bullet)
- Side-by-side before/after display
- Drafts persisted to `linkedin_drafts`

### Interview practice (Sprint 6 — functional skeleton)

- Three modes (behavioural, technical, speech-led)
- Claude generates sector-tuned questions
- Claude scores answers on structure / evidence / clarity / STAR

### Coach review (Sprint 7 — functional skeleton)

- Premium-tier gate (verifies active `premium` subscription)
- Monthly quota enforcement (one review per calendar month)
- 48-hour SLA monitor (Inngest cron, every 15 min)
- Queue tables in place; coach-facing UI to be built

---

## Known stubs to finish before launch

- [ ] PDF and DOCX text extraction in `app/api/cv/upload/route.ts`
- [ ] Praat micro-service (separate Railway service) for pitch variance and
      articulation scoring — see Section 3.2 of the tech design
- [ ] Coach-facing UI (review queue, video recording, claim flow)
- [ ] B2B admin dashboard for organisations (Sprint 8)
- [ ] SEO content pages (`articles` table is in the schema; build the
      rendering route at `app/articles/[slug]/page.tsx`)
- [ ] Email templates via Resend + React Email (transactional flows)
- [ ] Credit ledger UI (table is in place, no surface yet)

## Licence

Proprietary. © FaborMe Ltd, 2026.
