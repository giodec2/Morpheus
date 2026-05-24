# Morpheus — From Indie Project to Production & Profit
## Complete End-to-End Roadmap

> **Status:** Draft | **Last Updated:** 2026-05-22
> **Goal:** Take Morpheus from local-only experiment to monetized SaaS with zero-to-low marketing spend.

---

## Table of Contents
1. [Final Pricing Plan](#1-final-pricing-plan)
2. [Critical Fixes Before Monetization](#2-critical-fixes-before-monetization)
3. [Technical Architecture](#3-technical-architecture)
4. [Database Schema](#4-database-schema)
5. [Implementation Phases (12 Weeks)](#5-implementation-phases-12-weeks)
6. [Zero-Budget Marketing Strategy (12 Weeks)](#6-zero-budget-marketing-strategy-12-weeks)
7. [Token Economics & Cost Model](#7-token-economics--cost-model)
8. [Go/No-Go Checklist](#8-gono-go-checklist)

---

## 1. Final Pricing Plan

### Philosophy
- **BYOK (Bring Your Own Key)** = instant, login-free, unlimited for power users who manage their own API costs.
- **Hosted AI** = gated behind auth, tracked by tokens, reset weekly.
- Weekly resets feel more generous than monthly and smooth API spend.

### Tiers

| Feature | **Free** | **Scribe** $9/mo | **Novelist** $19/mo | **Architect** $49/mo |
|---|---|---|---|---|
| **Login Required** | No (BYOK only) | Yes | Yes | Yes |
| **Hosted AI Tokens** | 100k/week cheap | 1M/week cheap | 2M/week cheap + 200k/week premium | 10M/week cheap + 1M/week premium |
| **Models Available** | Cheap only | Cheap only | Cheap + Mid-range | All models (incl. premium) |
| **Books** | 1 | 3 | 10 | Unlimited |
| **Chapters** | Unlimited | Unlimited | Unlimited | Unlimited |
| **Characters** | Unlimited | Unlimited | Unlimited | Unlimited |
| **Lore Bible** | ✅ | ✅ | ✅ | ✅ |
| **Basic Prompts** | ✅ | ✅ | ✅ | ✅ |
| **Fine-tuned Prompts** | ❌ | ✅ | ✅ | ✅ |
| **Context Tuning** | ❌ | ❌ | ✅ (Advanced) | ✅ (Advanced + Custom) |
| **Export** | HTML only | HTML + JSON | HTML + JSON + DOCX + PDF | HTML + JSON + DOCX + PDF |
| **Cloud Sync** | ❌ | ✅ | ✅ | ✅ |
| **Priority Support** | ❌ | ❌ | ❌ | ✅ (Discord + Email) |
| **Community Badge** | ❌ | ❌ | ❌ | ✅ |
| **Early Access** | ❌ | ❌ | ❌ | ✅ |
| **Yearly Discount** | — | ~15% off ($92/yr) | ~20% off ($182/yr) | ~25% off ($441/yr) |

### Model Classification (OpenRouter)

| Class | Models | Est. Cost (blended) |
|---|---|---|
| **Cheap** | `deepseek/deepseek-v4-flash`, `google/gemma-4-26b-a4b-it`, `google/gemini-3.1-flash-lite`, `z-ai/glm-5.1` | ~$0.15–$0.30 / 1M tokens |
| **Mid-range** | `qwen/qwen3.6-plus`, `moonshotai/kimi-k2.5` | ~$0.50–$1.20 / 1M tokens |
| **Premium** | `x-ai/grok-4.3`, `openai/gpt-5.4-mini` | ~$2.00–$8.00 / 1M tokens |

> **Note:** Model classification is maintained in a config file. Update it when OpenRouter pricing changes.

---

## 2. Critical Fixes Before Monetization

These are non-negotiable. Ship them before any pricing page goes live.

### 2.1 Wire Up Unused Export Dependencies
- `jspdf` and `docx` are in `package.json` but unused.
- **Action:** Implement DOCX and PDF export in the export modal.
- **Paywall:** Gate DOCX/PDF behind paid tiers. HTML/JSON remains free for all.

### 2.2 Component Refactoring (Optional but Recommended)
- `src/components/AIChat/`, `Characters/`, `LoreBible/` are empty.
- **Action:** Either delete empty dirs or migrate sidebar logic into them. This is technical debt that will slow down feature gates later.

### 2.3 API Key Security Warning
- The OpenRouter key is stored in `localStorage` via Zustand persist.
- **Action:** Add a visible warning: *"Your API key is stored locally in your browser. Any browser extension or malicious script on this domain could access it. For maximum security, use a restricted OpenRouter key."*
- **Do not change the storage mechanism** — localStorage is acceptable for a client-side BYOK model. Just be transparent.

### 2.4 Rate Limiting (Client-Side)
- Prevent a single user from burning their entire weekly quota in 10 minutes.
- **Action:** Implement a sliding window rate limiter: max 10k tokens per 5-minute window. Show a cooldown message.

### 2.5 Model Validation
- Your model list uses very recent/future-facing IDs (e.g., `gpt-5.4-mini`).
- **Action:** Add a startup check that pings OpenRouter `/models` and validates each ID. If a model is unavailable, show a warning badge and fall back to a verified cheap model.

---

## 3. Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   React SPA │  │  Zustand    │  │      Dexie.js           │ │
│  │  (Morpheus) │  │   Stores    │  │   (IndexedDB - Local)   │ │
│  └──────┬──────┘  └──────┬──────┘  └─────────────────────────┘ │
│         │                │                                      │
│         └────────────────┼──────────────────┐                   │
│                          ▼                  ▼                   │
│              ┌──────────────────┐  ┌──────────────────┐         │
│              │  BYOK Path       │  │  Hosted AI Path  │         │
│              │  (No Login)      │  │  (Auth Required) │         │
│              │  localStorage    │  │  Supabase Auth   │         │
│              │  OpenRouter API  │  │  + Token Budget  │         │
│              └──────────────────┘  └──────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SUPABASE (Free Tier)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │    Auth      │  │  PostgreSQL  │  │   Edge Functions     │  │
│  │  (GoTrue)    │  │   (pg)       │  │  (Token Check,       │  │
│  └──────────────┘  └──────────────┘  │   Weekly Reset,      │  │
│                                      │   Stripe Webhooks)   │  │
│                                      └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     STRIPE / LEMON SQUEEZY                      │
│              (Subscriptions, Invoicing, Webhooks)               │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1 Supabase Setup
- **Project:** Create a new Supabase project.
- **Plan:** Start on **Free Tier**.
- **Auth:** Enable Email + Password. Optionally add Google OAuth for faster onboarding.
- **RLS (Row Level Security):** Every table must have RLS policies so users can only read/write their own data.

### 3.2 Stripe vs LemonSqueezy
| | Stripe | LemonSqueezy |
|---|---|---|
| **Pricing** | 2.9% + €0.30/transaction | 5% + €0.50/transaction |
| **EU VAT** | You handle it (Stripe Tax adds 0.5%) | **Handled automatically** |
| **Setup** | More flexible, more code | Faster, less code |
| **Recommendation** | Use if you want max control | **Use if you want to ship fast** (recommended for indie) |

**Recommended:** Start with **LemonSqueezy** because it handles EU VAT, invoicing, and dunning automatically. Switch to Stripe when you're doing >$10k/mo and want lower fees.

### 3.3 Token Proxy (Critical)
Do **not** expose your OpenRouter API key in the frontend for hosted AI.

**Solution:** Supabase Edge Function (`/functions/v1/ai-proxy`)
1. User sends chat request to Edge Function.
2. Edge Function verifies user's auth token.
3. Edge Function checks user's remaining token budget (from DB).
4. If valid, forwards request to OpenRouter with *your* API key.
5. Streams response back to user.
6. After stream completes, counts tokens and deducts from user's budget.

**Why Edge Functions:** They run close to the user (low latency), are serverless, and integrate natively with Supabase Auth + DB.

---

## 4. Database Schema

### 4.1 Auth Users
Handled by Supabase Auth (`auth.users`). Do not touch this table directly.

### 4.2 Profiles Table
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  tier text not null default 'free', -- free, scribe, novelist, architect
  stripe_customer_id text,
  stripe_subscription_id text,
  tokens_cheap_used_weekly bigint not null default 0,
  tokens_premium_used_weekly bigint not null default 0,
  week_reset_at timestamptz not null default now(),
  book_limit int not null default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: users can only read/update their own profile
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
```

### 4.3 Cloud Sync Tables (Mirror of Dexie Schema)
```sql
create table books (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  content jsonb, -- TipTap JSON
  updated_at timestamptz default now(),
  unique(user_id, id)
);

create table chapters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  book_id uuid not null,
  title text,
  order_index int,
  content jsonb,
  summary text,
  tagged_character_ids uuid[],
  updated_at timestamptz default now()
);

create table characters (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  book_id uuid not null,
  name text not null,
  appearance text,
  personality text,
  notes text,
  is_pinned boolean default false,
  relations jsonb default '[]',
  updated_at timestamptz default now()
);

create table lore_bibles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  book_id uuid not null,
  content text,
  updated_at timestamptz default now()
);

create table chat_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  book_id uuid,
  title text,
  messages jsonb default '[]',
  updated_at timestamptz default now()
);
```

### 4.4 Usage Logs Table
```sql
create table usage_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  model text not null,
  model_class text not null, -- cheap, mid, premium
  tokens_input bigint not null default 0,
  tokens_output bigint not null default 0,
  estimated_cost_usd decimal(10,6) not null default 0,
  created_at timestamptz default now()
);

-- Index for fast weekly aggregation
CREATE INDEX idx_usage_logs_user_week ON usage_logs (user_id, created_at);
```

### 4.5 Tier Config Table (Admin-Editable)
```sql
create table tier_config (
  tier text primary key,
  weekly_cheap_limit bigint not null,
  weekly_premium_limit bigint not null,
  book_limit int not null,
  features jsonb not null default '{}'
);

-- Seed values
insert into tier_config values
  ('free', 100000, 0, 1, '{"cloud_sync": false, "exports": ["html"]}'),
  ('scribe', 1000000, 0, 3, '{"cloud_sync": true, "exports": ["html", "json"]}'),
  ('novelist', 2000000, 200000, 10, '{"cloud_sync": true, "exports": ["html", "json", "docx", "pdf"]}'),
  ('architect', 10000000, 1000000, 999999, '{"cloud_sync": true, "exports": ["html", "json", "docx", "pdf"]}');
```

---

## 5. Implementation Phases (12 Weeks)

### Phase 1: Foundation (Weeks 1–3)
**Goal:** Infrastructure is live. BYOK works. Auth works. No payments yet.

| Week | Task | Deliverable |
|------|------|-------------|
| **W1** | Set up Supabase project (Free tier). Enable Auth. Create DB schema. | Live database + Auth |
| **W1** | Build Supabase Edge Function: `ai-proxy`. It verifies auth, checks token budget, proxies to OpenRouter, counts tokens. | Hosted AI works for test users |
| **W2** | Implement Zustand auth store. Add login/signup modals. Keep BYOK path untouched. | Users can auth without breaking BYOK |
| **W2** | Build token tracker UI: show "X tokens remaining this week" in sidebar. | Users see their budget |
| **W3** | Wire up DOCX + PDF export using existing dependencies. | Export modal has all formats |
| **W3** | Add weekly reset cron (Supabase Edge Function triggered by pg_cron or external cron). | Quotas reset every Monday 00:00 UTC |

### Phase 2: Monetization Logic (Weeks 4–6)
**Goal:** Feature gates are active. Payments are wired. Test transactions work.

| Week | Task | Deliverable |
|------|------|-------------|
| **W4** | Set up LemonSqueezy account. Create products/prices matching tiers. | Payment dashboard ready |
| **W4** | Build checkout flow. On successful payment, update `profiles.tier`. | Users can upgrade |
| **W5** | Implement feature gates: book limit check, model class check, export format check, prompt pack check. | UI hides/shows features by tier |
| **W5** | Build "Upgrade" prompts at friction points: hit book limit → upgrade modal. Hit token cap → upgrade modal with BYOK fallback. | Natural conversion triggers |
| **W6** | Build cloud sync engine: Dexie ↔ Supabase bi-directional sync. Conflict resolution = last-write-wins. | Data syncs across devices |
| **W6** | Add usage analytics dashboard (for you only): daily API cost, active users, conversion rate. | You can monitor burn |

### Phase 3: Polish & Pre-Launch (Weeks 7–8)
**Goal:** App feels finished. Landing page exists. Beta invites sent.

| Week | Task | Deliverable |
|------|------|-------------|
| **W7** | Create landing page (`/landing` or separate repo). Sections: Hero, Demo GIF, Pricing, Comparison vs Sudowrite, FAQ. | Live landing page |
| **W7** | Write 3 blog posts: "Why I Built a Local-First Alternative to Sudowrite", "The Real Cost of AI Writing Tools", "Weekly vs Monthly Token Resets". | SEO content live |
| **W8** | Invite 20 beta testers from your network. Give them free Novelist tier for 30 days. Collect feedback. | Beta cohort active |
| **W8** | Set up Discord server. Create channels: #general, #showcase, #bugs, #feature-requests. | Community hub ready |

### Phase 4: Public Launch (Weeks 9–10)
**Goal:** First public users. First revenue. First reviews.

| Week | Task | Deliverable |
|------|------|-------------|
| **W9** | Product Hunt launch (Tuesday 00:01 PT). Prepare maker comment, GIFs, tagline. | PH page live |
| **W9** | Post on AlternativeTo as alternative to Sudowrite, Novelcrafter, Scrivener. | Directory listings live |
| **W10** | Reddit organic campaign: reply to 5 high-intent threads per day on r/writing, r/selfpublish, r/worldbuilding, r/fantasywriters, r/WritingWithAI. | Organic traffic flowing |
| **W10** | Launch on Indie Hackers with revenue transparency post. | IH community engaged |

### Phase 5: Growth & Retention (Weeks 11–12)
**Goal:** Word of mouth starts. Conversion rate optimized.

| Week | Task | Deliverable |
|------|------|-------------|
| **W11** | Implement referral program: "Invite a friend → both get +50k premium tokens." | Viral loop active |
| **W11** | Reach out to 10 writing micro-influencers (1k–10k subs). Offer free Architect tier for honest review. | 3–5 reviews published |
| **W12** | First paid ASO/SEO experiment: $50 on Reddit self-serve ads targeting r/writing + r/selfpublish. Measure CAC. | First paid data point |
| **W12** | Monthly retrospective: review costs, revenue, churn, API burn. Adjust pricing if needed. | Data-driven iteration |

---

## 6. Zero-Budget Marketing Strategy (12 Weeks)

### Philosophy
Your budget is **time, not money**. Writers buy from people they trust. Indie developers have an authenticity advantage that corporations cannot fake.

### Channel Mix

#### 6.1 Reddit (Primary Channel — 40% of effort)
**Subreddits to monitor:**
- `r/writing` (3.5M+)
- `r/selfpublish` (300k+)
- `r/worldbuilding` (1M+)
- `r/fantasywriters` (200k+)
- `r/WritingWithAI` (50k+)
- `r/DestructiveReaders` (100k+)
- `r/LocalLLaMA` (for BYOK angle)
- `r/SaaS` (for indie founder story)

**Tactic: The "Demo Bridge"**
1. Search for keywords: "Sudowrite alternative", "AI writing tool expensive", "credit limit", "novel continuity", "AI forgets characters".
2. Reply with genuine advice first. Only mention Morpheus if it's a direct fit.
3. Example reply:
   > "I hit the same wall with Sudowrite's credits. I ended up building my own tool that uses your own API key (so costs are transparent) and focuses on keeping track of lore/characters across long chapters. It's local-first so your draft stays on your machine. Happy to share if you're curious."
4. Never drop a raw link. Say "DM me" or mention the name and let them search.
5. **Ratio:** 10 helpful comments for every 1 mention of Morpheus.

#### 6.2 Discord (Community Hub — 20% of effort)
**Servers to join (as a member, not a spammer):**
- Reedsy Writing Community (4,500+)
- Novelcrafter Discord
- NaNoWriMo Official
- Various writing sprint servers

**Tactic:**
- Spend 2 weeks just helping people with plotting and AI prompts.
- When someone complains about Sudowrite costs or AI forgetting lore, mention your project naturally.
- Create your own Discord once you have ~50 users. Gate the Architect badge role to paying users.

#### 6.3 Product Hunt (Launch Event — 10% of effort)
**Preparation:**
- Tagline: "Local-first AI co-writer that actually remembers your story."
- Thumbnail: Clean screenshot of the context engine showing character relations.
- Maker comment: Personal story — "I was spending $40/mo on Sudowrite and still hitting credit walls, so I built this..."
- Line up 15–20 upvotes from your network in the first hour.

#### 6.4 Content Marketing / SEO (20% of effort)
**Blog topics (publish 1x per week):**
1. "Why I Switched from Sudowrite to My Own Tool (And Open-Sourced the Core)"
2. "The Hidden Cost of Credit-Based AI Writing Tools"
3. "How to Maintain Continuity Across a 100k-Word Novel with AI"
4. "Local-First Writing Apps: Why Your Manuscript Shouldn't Live on Someone Else's Server"
5. "BYOK vs Hosted AI: A Cost Breakdown for Writers"
6. "Building an AI Context Engine That Doesn't Forget Your Characters"
7. "Weekly vs Monthly AI Limits: Why We Chose Weekly Resets"

**Where to publish:**
- Your own landing page blog (best for SEO)
- Medium (secondary distribution)
- Dev.to (if you write technical "how I built it" posts)

#### 6.5 Indie Hackers / Twitter (10% of effort)
- Post weekly "building in public" updates.
- Share revenue numbers once you have them (even if small — "$127 MRR" posts perform insanely well on IH).
- Share design decisions: "Why we capped free users at 1 book."

### The 6-Week Zero-Budget Calendar

| Week | Focus | Actions |
|------|-------|---------|
| 1 | ASO/SEO Foundation | Set up landing page. Write first 2 blog posts. Optimize title/meta for "AI writing tool", "Sudowrite alternative". |
| 2 | Reddit Seeding | Reply to 25 high-intent threads. No links. Build karma. |
| 3 | Beta Cohort | Invite 20 beta testers from Reddit/Discord. Give free Novelist tier. Collect testimonials. |
| 4 | Product Hunt | Launch. Cross-post to IH, Hacker News (Show HN), AlternativeTo. |
| 5 | Content Amplify | Publish comparison post. Share on Reddit. |
| 6 | Community | Launch Discord. Start weekly writing sprints using Morpheus. |

---

## 7. Token Economics & Cost Model

### Assumptions
- Cheap model blended cost: **$0.20 / 1M tokens**
- Premium model blended cost: **$3.00 / 1M tokens**
- Average user uses **60%** of their weekly quota (industry standard)
- Free tier users: 80% use BYOK only, 20% use hosted AI

### Cost Per User (Monthly, at 60% Utilization)

| Tier | Users | API Cost/User | Total API Cost | Revenue | Gross Margin |
|------|-------|---------------|----------------|---------|--------------|
| Free (hosted only) | 1,000 | $0.05 | $50 | $0 | N/A |
| Scribe ($9) | 100 | $0.48 | $48 | $900 | **~95%** |
| Novelist ($19) | 50 | $2.40 | $120 | $950 | **~87%** |
| Architect ($49) | 20 | $12.00 | $240 | $980 | **~76%** |
| **Total** | **1,170** | — | **$458** | **$2,830** | **~84%** |

### Break-Even Analysis
- Supabase Free: $0
- LemonSqueezy fees (5% + €0.50): ~$165/mo on $2,830
- API Costs: ~$458/mo
- **Total Costs: ~$623/mo**
- **Net Profit: ~$2,207/mo**
- **Break-even point: ~30 paying users** (assuming $15 average revenue per user)

> **Rule of thumb:** If your free-to-paid conversion rate is **2–3%**, you need ~1,500 total signups to hit break-even. With Product Hunt + Reddit, that's achievable within 3 months.

---

## 8. Go/No-Go Checklist

Before you flip the "live" switch, verify every item below.

### Technical
- [ ] All model IDs resolve correctly on OpenRouter
- [ ] DOCX and PDF export work and are gated behind paid tiers
- [ ] Auth flow works (signup, login, password reset)
- [ ] Token budget is enforced server-side (never trust the client)
- [ ] Weekly reset cron runs reliably
- [ ] API key never leaves the browser for BYOK users
- [ ] Cloud sync handles conflicts gracefully
- [ ] Usage dashboard shows real-time API spend

### Business
- [ ] LemonSqueezy products created for all 3 paid tiers
- [ ] Checkout flow tested with real card (then refund it)
- [ ] Pricing page is clear and honest about limits
- [ ] Refund policy defined (recommend: 7-day no-questions-asked)
- [ ] Privacy policy drafted (needed for auth + payments)
- [ ] Terms of service drafted

### Marketing
- [ ] Landing page live with pricing, demo, and signup
- [ ] 2+ blog posts published
- [ ] Discord server created with rules and channels
- [ ] Product Hunt listing prepared (images, copy, maker comment)
- [ ] AlternativeTo listing submitted
- [ ] 10 Reddit replies posted (warm-up phase)

---

## Appendix A: Recommended File Structure Additions

```
src/
  lib/
    supabase.ts          # Supabase client
    tokenBudget.ts       # Check remaining tokens, deduct usage
    tierConfig.ts        # Feature flags by tier
    exports/
      docx.ts            # DOCX export implementation
      pdf.ts             # PDF export implementation
  components/
    Auth/
      LoginModal.tsx
      SignupModal.tsx
    Billing/
      PricingCards.tsx
      UpgradePrompt.tsx
      TokenCounter.tsx
  stores/
    authStore.ts         # Zustand auth state
    billingStore.ts      # Tier, tokens, subscription status
```

## Appendix B: Emergency Protocols

**If API costs spike unexpectedly:**
1. Immediately lower free tier to 50k/week via `tier_config` table.
2. Enable stricter rate limiting (5k/5min).
3. Pause free signups temporarily if needed.

**If a user abuses the system:**
1. Flag account in usage_logs (unusual pattern: 100% quota used instantly every week).
2. Manual review. If abuse: downgrade to BYOK-only, issue pro-rated refund if paid.

**If LemonSqueezy/Stripe webhook fails:**
1. Grace period: always allow 24 hours of service if payment status is unclear.
2. Retry webhook manually from dashboard.
3. Never instantly lock a user out on payment failure.

---

*End of Roadmap. Now build it.*
