# numarket — Company Overview & Website Build Brief
**Version 2.0 · September 2026 · Owner: Brandon · Status: Approved direction, ready to build**

This document has two parts:

- **Part A — The Company.** What numarket is now, what it sells, who it serves, how pricing and onboarding work. This is the source of truth for all website copy.
- **Part B — The Website.** A build-ready specification for the coding platform: sitemap, design system, 3D/interactive behavior, and page-by-page content.

---

# PART A — THE COMPANY

## A1. Review of the current site (numarket.us)

**What to keep**
- Brand: "Trust the Data." tagline, lowercase italic *nu* logo, navy/teal/green palette, DM Sans, clean Stripe-style layout.
- The six interactive demo dashboards (Utilities, Construction, HR, Financial, Operations, Healthcare). They are good and should stay, re-labeled and re-framed.
- Plain-language tone ("so leadership can act, not guess").
- The detailed contact form (company size, primary system, where data lives). Extend it, don't replace it.
- Tier names: **Insight, Operate, Command.** Keep the names, redefine what's inside.

**What changes**
| Current site says | New site says |
|---|---|
| "We connect your data and build dashboards" | "We get your business ready for AI: we collect, clean, secure, and run your data — then give you apps, dashboards, and action items built on it" |
| Dashboards are the product | A clean, hosted, living database is the product; dashboards and apps sit on top of it |
| Project-based pricing ("From $2,500 / project") | Setup fee + monthly subscription, 12-month term |
| "We use your existing data, no migrations" | "We move your data somewhere clean and secure — and you own it forever" |
| Free dashboard offer | Free AI Readiness Check (30 minutes, a score, and 3 findings) |
| One audience (mid-size, 50+ employees) | Two clear paths: **small businesses** and **larger organizations**, with a guided walkthrough for each |
| Case studies presented as real engagements | Must be real client results or clearly labeled "illustrative scenario" (see B9 Content Integrity) |

**What's missing entirely:** product pages, pricing clarity, getting-started walkthrough, security/trust page, data ownership/exit promise, documentation, support, status, partners, about, terms, privacy.

---

## A2. Who we are

**One-liner:**
> numarket gets your business ready for AI. We gather your data from everywhere it lives, clean it up, store it somewhere secure, and turn it into live apps, dashboards, and clear next steps — and you own all of it.

**Short version (hero-length):**
> Your data, cleaned up and working for you.

**What we are:** A managed data team you don't have to hire. We build and run your data foundation so your people can see what's happening, enter information easily, ask questions in plain English, and know what to do next.

**What we are not:**
- Not a staffing firm (we don't rent out people by the hour).
- Not a software vendor selling licenses.
- Not a "dashboard shop" that builds a report and disappears.

**Positioning statement (internal):** Bigger than a freelancer or consultant, far easier and cheaper than a big-firm transformation. We are the data department for companies that don't have one — and the AI-ready layer for companies whose IT team already runs the infrastructure.

**Tagline:** Trust the Data.

---

## A3. What we do — the six steps

This is the backbone of the website. Every page should reinforce it. Use these exact plain-language labels.

| # | Step | Plain-language description (website copy) | What actually happens (for docs/FAQ) |
|---|---|---|---|
| 1 | **Collect** | We find your data wherever it lives — spreadsheets, accounting software, project tools, email attachments — and bring it together. | Discovery, source inventory, connectors (Airbyte/Fivetran/APIs), SharePoint/OneDrive file sync. |
| 2 | **Clean** | We fix duplicates, errors, missing pieces, and mismatched names so your numbers finally agree with each other. | Data modeling, standardization, validation tests on every load, data dictionary. |
| 3 | **Secure** | Your data goes into a private, encrypted database built just for your company. | Dedicated Snowflake account per client, role-based access, MFA, audit logging. |
| 4 | **See** | Live dashboards and a simple app where your team views status, enters updates, and asks questions in plain English. | Streamlit apps with input forms, live dashboards, natural-language Q&A (Snowflake Cortex). |
| 5 | **Act** | Every month we tell you what changed, what's at risk, and exactly what to do next. | Monthly/bi-weekly insight review, action items with owners, automated alerts. |
| 6 | **Own** | It's yours. If you ever leave, you walk away with a clean, organized database. No lock-in. | Contractual data ownership, full export or account handover within 30 days. |

**Why this matters to the client (the "AI age" message):**
> Everyone is being told to "use AI." But AI is only as good as the data under it. If your data is scattered and messy, AI gives you confident wrong answers. We fix the foundation first — so when you use AI, it's actually right.

---

## A4. Products

Four products. Every engagement uses #1 and #2; #3 is included in all subscriptions; #4 is optional.

### 1. numarket Foundation (one-time setup)
Collect + Clean + Secure. We find, connect, clean, and organize all your data into your private database.
- Output: a clean, documented database; automated data refresh; data dictionary in plain English.
- Timeline: 2–10 weeks depending on size (see A7).

### 2. numarket Workspace (the app your team uses)
See. A private web app for your company:
- **Live dashboards** that update automatically.
- **Input screens** so your team enters updates (budgets, job status, change orders, inventory counts) directly — no more emailing spreadsheets around.
- **Ask Your Data** — type a question in plain English ("Which jobs are over budget this month?") and get an answer from your real numbers.
- **Alerts** — get notified when something crosses a line (budget overrun, late shipment, staffing gap).

### 3. numarket Insight Review (included in every subscription)
Act. A standing review with a numarket analyst:
- What changed, why, and what to do about it.
- A short list of action items with owners and due dates.
- Frequency by tier: monthly (Insight), bi-weekly (Operate), weekly or daily briefing (Command).

### 4. numarket Engineering (project work, optional)
For larger organizations and special requests:
- Data migration (moving off old systems or out of spreadsheets for good).
- Custom apps and automations.
- Working inside the client's existing platform (their Snowflake, Azure, Databricks, etc.).
- Data readiness assessment for AI initiatives.

---

## A5. Who we serve — two paths

The website must let a visitor self-identify in one click: **"I'm a small or growing business"** or **"I'm a larger organization."** Everything after that adapts.

### Path 1 — Small & growing businesses
- **Profile:** ~10–250 employees, $2M–$100M revenue, no data team, data in spreadsheets + QuickBooks + one or two industry tools.
- **Pain:** "I don't know my real numbers until month-end." "Everything lives in someone's spreadsheet." "Everyone says use AI; I don't know where to start."
- **Our model:** **We host it.** A private database in numarket's managed environment, owned by the client.
- **Their effort:** Low. A kickoff call, logins to their tools, a few hours of review.

### Path 2 — Larger organizations
- **Profile:** 250+ employees, existing IT team, may already use Power BI, Azure, Snowflake, or an ERP.
- **Pain:** "We have tools but nobody trusts the numbers." "Leadership wants an AI plan; the data isn't ready." "Every department reports differently."
- **Our model:** **Your platform or ours.** If IT already runs a platform, we build inside it. We don't fight IT — we make their investment pay off.
- **Their effort:** Medium. IT grants read access, a sponsor from the business side, security review.

### Industries (for the industry selector)
Launch with these 8, each with its own sample data sources, sample questions, and a sample dashboard:
1. Construction & Contractors
2. Manufacturing & Operations
3. Food Production & Catering
4. Healthcare & Clinics
5. Utilities & Energy
6. Finance & Professional Services
7. Logistics & Transportation
8. Real Estate & Property Management

(Other industries listed as "and more — ask us.")

---

## A6. Pricing

Published "starting at" prices build trust with small businesses. Enterprise stays custom.

| | **Insight** | **Operate** (most popular) | **Command** |
|---|---|---|---|
| **Best for** | Small businesses getting organized | Growing and mid-size companies | Larger organizations |
| **Setup (one-time)** | From **$7,500** | From **$15,000** | From **$40,000** |
| **Monthly** | From **$2,500/mo** | From **$4,000/mo** | From **$10,000/mo** |
| **Data sources connected** | Up to 3 | Up to 8 | Unlimited |
| **App users** | Up to 15 | Up to 50 | Unlimited |
| **Dashboards** | 1 core dashboard | Suite by role (exec / manager / ops) | Fully custom |
| **Input screens (replace spreadsheets)** | 1 | Up to 5 | Custom |
| **Ask Your Data (AI Q&A)** | ✓ | ✓ | ✓ |
| **Alerts & automations** | Basic | Advanced | Custom |
| **Insight Review** | Monthly | Bi-weekly | Weekly + daily exec brief |
| **Change requests included** | 4 hrs/mo | 10 hrs/mo | Dedicated analyst |
| **Where your data lives** | Our secure platform | Our secure platform | Ours **or yours** |
| **Platform usage** | Included up to $400/mo | Included up to $800/mo | Passed through at cost + 15% |
| **Term** | 12 months | 12 months | 12–36 months |

**Pricing rules (put in pricing FAQ):**
- **Free AI Readiness Check** — 30 minutes, no cost. You get a readiness score and 3 specific findings.
- **Platform usage:** the database and computing costs are included up to an allowance. If usage goes above that, the overage is billed at cost + 15% and shown clearly on the invoice. No surprise bills — we alert you before you approach the allowance.
- **No per-user license fees** within the tier's user limit.
- **After 12 months:** continue month-to-month, or leave with your data (see "Own").
- **Leaving:** full export or account handover within 30 days, included at no charge.
- **Founding client offer (time-limited, optional):** reduced setup fee in exchange for a case study.

---

## A7. Getting started — how hard, how long, how much

This is the "spoon-feed" section. The site must answer the three questions every buyer has before they call: **How hard is this for us? How long does it take? What will it cost?**

### The universal 5-step start
1. **Free Readiness Check (30 min).** We ask where your data lives and what decisions you're trying to make. You get a readiness score and 3 findings.
2. **Proposal (within 2 business days).** Fixed setup price, fixed monthly price, timeline, and exactly what you'll get.
3. **Kickoff (1 hour).** We get read-only access to your tools. You tell us who needs what.
4. **Build (2–10 weeks).** We collect, clean, and secure your data, then build your Workspace. You see progress weekly.
5. **Launch + first Insight Review.** Your team gets access, a 30-minute training, and your first list of action items.

### Effort by path

| | **Small business** | **Mid-size** | **Large organization** |
|---|---|---|---|
| **Difficulty for you** | ●○○○○ Very easy | ●●○○○ Easy | ●●●○○ Moderate |
| **Your time required** | ~3–5 hours total | ~8–15 hours total | Sponsor + IT, ~20–40 hours total |
| **Who's involved on your side** | Owner or office manager | Ops or finance lead | Executive sponsor + IT contact |
| **What we need from you** | Logins/exports for your tools, one review meeting | Access to systems, 2–3 review meetings | Security review, read access, steering meetings |
| **Time to first dashboard** | 2–3 weeks | 4–6 weeks | 6–10 weeks |
| **Typical setup** | $7,500–$12,000 | $15,000–$35,000 | $40,000–$150,000+ |
| **Typical monthly** | $2,500–$3,500 | $4,000–$7,000 | $10,000+ |
| **Disruption to daily work** | None | None | None — we work alongside existing systems |
| **Do you need to buy new software?** | No | No | No (we can use what IT already owns) |

### "How big of a problem is my data?" — Readiness levels
Used in the Readiness Check and the website quiz.

| Level | What it looks like | What it takes |
|---|---|---|
| **1 — Scattered** | Data mostly in spreadsheets, emailed around, different versions | Full Foundation build; biggest improvement |
| **2 — Siloed** | Real systems (QuickBooks, Procore, etc.) but they don't talk | Connect + clean; fastest ROI |
| **3 — Connected but messy** | Some reporting exists, numbers don't match across teams | Clean + standardize + single source of truth |
| **4 — Organized** | Clean warehouse, dashboards exist | Add Workspace apps, AI Q&A, Insight Review |
| **5 — AI-ready** | Governed, documented, trusted | Advanced automation and AI use cases |

### What the client gets vs. doing it themselves (value framing)
| Option | Annual cost | Reality |
|---|---|---|
| Hire one data analyst | ~$85K–$110K + benefits + tools | One person, one skill set, months to ramp, leaves = knowledge leaves |
| Big consulting firm | $150K–$500K+ | Long timelines, built for enterprises |
| **numarket Operate** | **~$63K first year, ~$48K after** | Full data team, hosted platform, AI Q&A, monthly action items, you own everything |

---

## A8. Security & data ownership (Trust page source)

Plain-language promises, then the detail.

**Promises**
1. **Your data is yours.** Contract says so. Always.
2. **Private by design.** Every client gets their own separate, encrypted database. Your data is never mixed with anyone else's.
3. **Least access.** We only access what we need, through named accounts with multi-factor sign-in.
4. **Everything logged.** Every change and every login is recorded.
5. **Leave anytime (after term) with everything.** Full export or handover within 30 days.

**Detail (for the page and docs)**
- Data hosted on Snowflake (enterprise-grade cloud data platform), encryption at rest and in transit.
- Role-based access control; client decides who sees what.
- Read-only connections to source systems wherever possible.
- No client data stored on laptops or personal devices.
- Healthcare clients: HIPAA-eligible configuration and Business Associate Agreement available (Command tier / on request).
- Insurance: cyber liability and professional liability (E&O) coverage. *(Confirm bound before publishing.)*
- Written Data Processing Addendum available with every contract.
- **Do not claim** SOC 2, HIPAA certification, or any certification numarket itself does not hold. Say "built on SOC 2–audited infrastructure" only if referring to the platform provider.

---

## A9. Why numarket (differentiators)

1. **We fix the foundation, not just the view.** Dashboards on messy data are a Band-Aid. We clean it first.
2. **You own it.** No lock-in. Leave with a clean database.
3. **Built for your size.** Simple and affordable for a 20-person company; flexible enough to work inside a large company's existing platform.
4. **People, not just software.** A real analyst reviews your numbers and tells you what to do.
5. **Replace the spreadsheet shuffle.** Your team enters data once, in one place, and everyone sees the same numbers.
6. **Ready for AI.** Ask questions in plain English today; plug in any AI tool tomorrow.
7. **Clear pricing.** Published starting prices, fixed setup quotes, no surprise bills.

---

## A10. Partners (Partner page source)

**Who:** IT managed service providers, CPA and fractional CFO firms, software resellers/implementers (QuickBooks, Sage, Procore), industry consultants.

**Pitch:** "Your clients are asking about AI and data. Become the firm that has an answer. We deliver, you earn."

**Programs**
| Program | How it works | Partner earns |
|---|---|---|
| **Referral** | You introduce, we sell and deliver | 15–20% of first-year revenue |
| **Co-sell** | We pitch together | 20–25% of first-year revenue |
| **White-label** (by invitation) | You sell under your brand, we deliver | Revenue share, typically 30% |

---

# PART B — THE WEBSITE BUILD SPEC

## B1. Design principles

1. **Show, don't tell.** Every major idea gets a visual or interaction, not a paragraph.
2. **No jargon.** Write for a business owner, not an engineer. Technical terms only on Platform, Data Engineering, and Documentation pages, and always explained. If a word would confuse a restaurant owner, replace it.
3. **Two audiences, one site.** Small business and large organization each feel "this is for me" within 5 seconds.
4. **Motion with meaning.** Every animation shows the story: messy → clean → secure → useful → action. No decorative spinning.
5. **Always answer: how hard, how long, how much.**
6. **Fast.** 3D must never block content. Page is readable before the 3D scene loads.

## B2. Brand & design system

**Colors**
| Token | Hex | Use |
|---|---|---|
| `--navy` | #22577A | Primary text on light, headers, primary buttons |
| `--teal` | #38A3A5 | Links, secondary accents, data streams |
| `--green` | #57CC99 | Success, "clean" state, highlights |
| `--light-green` | #80ED99 | Glow, active states in 3D |
| `--mint` | #C7F9CC | Soft backgrounds, badges |
| `--ink` | #0B1F2E | Dark sections / 3D scene background |
| `--chaos` | #E07A5F | ONLY for "messy data" state in animations (warm, not alarming red) |
| `--white` | #FFFFFF | Main background |
| `--gray-50/100/400/600` | neutral scale | Borders, muted text |

Must support dark mode (dark sections use `--ink` background with mint/green accents). Define all colors as CSS variables on `:root`.

**Typography**
- Headings: DM Sans 600–700 (large, tight tracking).
- Accent/italic words in headlines: DM Serif Display italic (matches the *nu* logo), e.g., "Your data, *cleaned up* and working for you."
- Body: DM Sans 400, 17–18px base, 1.6 line height.
- Numbers in dashboards: tabular figures.

**Logo:** Keep existing — lowercase italic "nu" in DM Serif Display with green diagonal trend-line slash and dot, "market" wordmark.

**UI style:** White, spacious, Stripe-like. Rounded corners (12–16px), soft shadows, thin borders. Dark "stage" sections for 3D scenes.

## B3. Tech stack (recommended)

- **Framework:** Next.js (App Router) + TypeScript, deployed on Vercel (existing).
- **Styling:** Tailwind CSS with CSS variables for brand tokens.
- **3D:** Three.js via `@react-three/fiber` + `@react-three/drei`. Postprocessing (bloom) sparingly.
- **Animation:** GSAP + ScrollTrigger for scroll-driven scenes; Framer Motion for UI transitions (tabs, cards).
- **Charts in demos:** Keep Chart.js 4.4 for existing demos, or migrate to Recharts/visx if rebuilding.
- **Forms:** Existing Google Apps Script → Google Sheets endpoint (keep), with honeypot spam protection.
- **Scheduling:** Calendly embed for the Readiness Check.
- **Docs:** MDX pages within the same Next.js app (`/docs`).
- **Status:** Hosted status page service (e.g., Better Stack or Instatus) linked at `status.numarket.us`, or a simple `/status` page. Never display fabricated uptime numbers.
- **Analytics:** Vercel Analytics (privacy-friendly, cookieless).

**Performance & accessibility requirements**
- Lighthouse ≥ 90 performance on desktop, ≥ 80 mobile.
- 3D scenes lazy-loaded (dynamic import, `ssr:false`) and only rendered when in viewport.
- Every 3D scene has a static fallback image/SVG for: mobile under 768px (optional lighter version), `prefers-reduced-motion`, and WebGL unavailable.
- Cap device pixel ratio at 1.5–2; target 60fps; pause render loop when off-screen.
- WCAG 2.1 AA: keyboard-navigable industry selector and tabs, visible focus states, alt text, 4.5:1 contrast.
- No horizontal scroll at 375px width.

## B4. Sitemap & navigation

**Top nav (desktop):**
`Products ▾` · `Solutions ▾` · `How It Works` · `Pricing` · `Demos` · `Resources ▾` · `[Get a Free Readiness Check]` (primary button)

**Products ▾** (mega menu)
- Foundation — Collect, clean & secure your data
- Workspace — Your team's app: dashboards, input screens, Ask Your Data
- Insight Review — Monthly action items from a real analyst
- Engineering — Migrations, custom apps, working in your platform
- Platform — What's under the hood (plain-language)

**Solutions ▾** (mega menu)
- By size: Small & Growing Businesses · Larger Organizations
- By industry: the 8 industries from A5
- By need: Replace spreadsheets · Get AI-ready · Trust your numbers · Move off old systems

**Resources ▾**
- Getting Started guide
- Documentation
- Security & Trust
- Support
- System Status
- Partners
- About Us

**Footer** (4 columns + legal row)
- Company: About Us, Partners, Contact, Careers (placeholder, hidden until needed)
- Products: Foundation, Workspace, Insight Review, Engineering, Platform, Pricing
- Solutions: Small Business, Larger Organizations, all 8 industries
- Resources: Getting Started, Documentation, Security, Support, Status, Demos
- Legal row: Terms of Service · Privacy Policy · Data Processing Addendum · © 2026 numarket LLC · Atlanta, Georgia
- Contact: hello@numarket.us · (863) 777-9264

**Route list**
```
/                         Home
/products                 Products overview
/products/foundation
/products/workspace
/products/insight-review
/products/engineering
/platform                 Plain-language "under the hood"
/solutions                Solutions overview (size + industry selector)
/solutions/small-business
/solutions/enterprise
/solutions/[industry]     8 dynamic industry pages from one template
/how-it-works             The 6 steps, full scroll story
/getting-started          Walkthrough + estimator + readiness quiz
/pricing
/demos                    Existing 6 dashboards, re-framed
/why-numarket
/security
/partners
/about
/support
/status                   (or external status.numarket.us)
/docs                     Documentation hub (MDX)
/contact                  Also used as /start
/legal/terms
/legal/privacy
/legal/dpa
```

## B5. Signature 3D & interactive experiences

These are the heart of the site. Build them as reusable components.

### 3D-1: "The Data Journey" (Home hero + How It Works)
**Story in one scene, driven by scroll.** Dark `--ink` stage.

- **Stage 1 — Chaos (Collect):** ~150–300 floating tiles representing files and apps (spreadsheet grid icons, invoice sheets, calendar squares, app logos rendered as generic shapes — never real brand logos). Tiles drift slowly, slightly rotated, tinted `--chaos`. Some duplicates overlap. Label fades in: "Your data today: everywhere."
- **Stage 2 — Pull (Collect):** On scroll, tiles are drawn toward the center along curved teal light-trails (Bezier paths, particle streams).
- **Stage 3 — Clean:** As tiles pass through a translucent "filter" ring, they shift from `--chaos` to `--green`, duplicates merge, crooked tiles snap straight. Small check-marks pop. Label: "Cleaned. Matched. Trusted."
- **Stage 4 — Secure:** Tiles settle into a glowing cylindrical database core with a subtle hex-shield shell that closes around it. Lock icon pulse. Label: "Stored privately. Yours."
- **Stage 5 — See:** From the core, 3–4 floating glass panels unfold outward — a dashboard, an input form, a chat bubble ("Which jobs are over budget?"), an alert card. Panels have live-looking animated numbers.
- **Stage 6 — Act:** One panel flips to reveal an action item card: "Bridge job: RFI backlog is your #1 schedule risk. Owner: PM team. Due Friday." Label: "Know what to do next."
- **Stage 7 — Own:** Camera pulls back; a key icon hands off to a silhouette. Label: "Leave anytime. It's all yours."

**Implementation notes:** instanced meshes for tiles; GSAP ScrollTrigger scrubs a single timeline `progress 0→1`; camera on a spline; labels are HTML overlays (not 3D text) for accessibility and crisp type. Mobile: reduce tile count to ~60, disable bloom. Reduced motion: show a 6-frame static storyboard.

### 3D-2: "Pick Your Business" industry selector (Home + /solutions)
- A row/ring of 8 industry icons (simple low-poly 3D or clean line icons on 3D cards): hard hat, factory, chef hat/tray, medical cross, lightning bolt, briefcase/coins, truck, building.
- **Size toggle** above it: `Small / Growing` ↔ `Larger Organization`.
- **On click,** the stage reconfigures to that business:
  - Left: that industry's typical messy sources float in (e.g., Construction: "Excel budgets", "QuickBooks", "Procore", "Daily logs", "Email RFIs"). Generic labels, no trademarked logos in 3D; names in text are fine.
  - Center: they flow into the database core.
  - Right: that industry's sample Workspace panel appears (reuse the matching demo dashboard data).
  - Below the stage, a content card updates with:
    - **"Questions you'll be able to answer"** (3 per industry, see B7).
    - **"What your team does differently"** (e.g., "Supers enter daily progress on a phone instead of emailing a spreadsheet").
    - **Effort / Timeline / Starting price** chips that change with the size toggle (pull from A7 table).
    - Buttons: `See the full demo` → matching demo · `Get a free Readiness Check`.
- Keyboard: arrow keys move between icons, Enter selects. Each industry state is also a URL (`/solutions/construction`) for sharing and SEO.

### 3D-3: "Change a Number" live Workspace demo
- A realistic app window (2D UI, subtle 3D tilt on hover).
- Left: an **input form** ("Update job budget": job selector, cost field, % complete slider).
- Right: **dashboard** with budget vs. actual chart, CPI gauge, status badge.
- When the visitor drags the slider or edits the cost, the chart, KPI, and status animate in real time, and an **action item** appears or clears ("Terminal Expansion is now 6% over budget → review change orders").
- Tab 2: **Ask Your Data** — a chat box with 4–6 clickable suggested questions. Clicking one plays a typed answer with a mini chart. Pre-scripted, no live AI. Label clearly: "Demo with sample data."
- Purpose: prove "we don't just show data, your team works in it."

### 3D-4: "Readiness Meter" (Getting Started quiz)
- A 3D gauge/ring filling from Level 1 (Scattered) to 5 (AI-ready) as the visitor answers 5 questions. Particles around the ring shift from `--chaos` to `--green` as the score rises.

### 3D-5: "Secure Vault" (Security page)
- A slowly rotating database core inside layered translucent shields (encryption, access control, audit log, backups). Hovering a shield highlights it and shows a one-line plain-language explanation.

### Ambient
- Subtle particle "data dust" in dark section backgrounds, very low opacity, pauses when off-screen.
- Numbers count up when entering viewport.
- Cards lift 4px with shadow on hover.

## B6. Page-by-page specification

### HOME (`/`)
1. **Hero** (3D-1 Stage 1–2 in background)
   - Eyebrow: *Trust the Data.*
   - H1: "Your data, *cleaned up* and working for you."
   - Sub: "We gather your data from everywhere it lives, clean it, store it securely, and give your team live dashboards, simple apps, and clear next steps. Get ready for AI — without the headache."
   - Buttons: `Get a Free Readiness Check` (primary) · `See how it works` (scrolls)
   - Trust strip: "You own your data · No new software to buy · Live in weeks, not months"
2. **The problem** (3 cards, icons)
   - "Your numbers live in 12 spreadsheets." · "Nobody trusts the reports." · "Everyone says 'use AI.' The data isn't ready."
3. **The Data Journey** (3D-1 full scroll story, 6 steps)
4. **Pick Your Business** (3D-2 with size toggle)
5. **Change a Number** (3D-3)
6. **Two paths** (split cards)
   - Small & Growing: "We host it, run it, and explain it. Very easy to start." → `/solutions/small-business`
   - Larger Organizations: "Your platform or ours. We work with IT, not against it." → `/solutions/enterprise`
7. **How hard / how long / how much** — compact version of A7 table with difficulty dots → `/getting-started`
8. **Why numarket** — 6 short points from A9, icon grid
9. **Pricing teaser** — three tiers with "from" prices → `/pricing`
10. **Proof** — real case studies OR clearly labeled illustrative scenarios (see B9)
11. **Final CTA** (dark stage, core glowing): "Find out how ready your data is. 30 minutes. Free." → `Book your Readiness Check`

### PRODUCTS (`/products` + 4 subpages)
- Overview page: 4 product cards arranged around a 3D core (Foundation at base, Workspace above, Insight Review beside, Engineering as optional add-on).
- Each subpage template:
  1. Hero: name, one-line promise, small 3D illustration of that step.
  2. "What you get" (bullets from A4).
  3. "What it looks like" (screenshot/interactive snippet).
  4. "What we need from you" (effort).
  5. "Included in" (which tiers).
  6. FAQ (3–5).
  7. CTA.

### PLATFORM (`/platform`) — "Under the hood, in plain English"
- Layered diagram (3D exploded stack, hover each layer):
  1. **Your sources** — spreadsheets, accounting, project tools, HR, ERP.
  2. **Connectors** — "secure pipes that copy your data automatically, read-only."
  3. **Your private database** — "your own encrypted database on Snowflake, an enterprise cloud data platform."
  4. **Clean layer** — "rules that fix and check your data every time it updates."
  5. **Workspace** — "the app your team uses."
  6. **Ask Your Data** — "plain-English questions, answered from your numbers."
- Section: "Your platform or ours" — toggle showing same stack inside numarket's environment vs. inside client's existing cloud.
- Section: "What happens if you leave" — animation of database handing off.
- Note: name technologies only here and in docs; never on Home.

### SOLUTIONS
- `/solutions`: 3D-2 selector full-page + "By need" cards.
- `/solutions/small-business`:
  - H1: "The data team you don't have to hire."
  - Pain → solution → a day-in-the-life before/after (owner checks phone Monday morning: sees cash, jobs, and 3 action items).
  - Effort table (small column only), pricing Insight/Operate, FAQ ("Is this overkill for a company my size?" "Do I need IT?" "What if my data is a mess?" → "That's exactly what we fix.").
- `/solutions/enterprise`:
  - H1: "Make the data you already have ready for AI."
  - "Your platform or ours," "We work with IT," security review process, phased rollout (one department first), Command tier, engineering services.
  - FAQ: "We already have Power BI / Snowflake / Azure." → "Good — we build inside it." "Will this replace our systems?" → "No. We sit alongside them."
- `/solutions/[industry]` template:
  1. Hero with industry 3D icon.
  2. "Where your data lives today" (sources list).
  3. "Questions you'll be able to answer" (3–5).
  4. Embedded demo dashboard for that industry.
  5. "What changes for your team."
  6. Small vs. large effort/price chips.
  7. CTA.

### HOW IT WORKS (`/how-it-works`)
- Full-length 3D-1 scroll story with expanded copy per step.
- Timeline graphic: Week 0 Readiness Check → Week 1 Proposal → Week 1–2 Kickoff → Weeks 2–10 Build → Launch → Monthly Insight Reviews.
- "What you do vs. what we do" two-column table for each step.

### GETTING STARTED (`/getting-started`) — most important conversion page
1. **Hero:** "Here's exactly what starting looks like." Sub: "How hard, how long, how much — before you ever get on a call."
2. **Readiness Quiz** (3D-4), 5 questions:
   1. Where does most of your data live? (Mostly spreadsheets / A few business apps / Many systems / A data warehouse already)
   2. How many different tools or files hold important numbers? (1–3 / 4–8 / 9–20 / 20+)
   3. Do your reports from different teams agree? (Rarely / Sometimes / Usually / Always)
   4. How long does it take to get a basic report? (Days / Hours / Minutes / Instant)
   5. Do you have an IT or data team? (No / One person / A team / A large department)
   - Result: Level 1–5 with description from A7, and a recommended path.
3. **Cost & Timeline Estimator** (interactive form, instant result):
   - Inputs: company size (employees), number of data sources, number of app users, where data should live (our platform / your platform / not sure), how soon (ASAP / 1–3 months / exploring).
   - Output card: Recommended tier · Difficulty (dots) · Your time required · Time to first dashboard · Estimated setup range · Estimated monthly range · "What we'll need from you" checklist.
   - Logic:
     - sources ≤3 AND users ≤15 AND employees <100 → Insight
     - sources ≤8 AND users ≤50 AND employees <500 → Operate
     - otherwise, OR "your platform" selected → Command
     - Setup/monthly ranges and timelines from A6/A7 tables; add +1–2 weeks and +20% setup if data mostly spreadsheets (Readiness Level 1).
   - Disclaimer: "Estimate only. Your Readiness Check gives you a fixed quote."
   - Button: `Book my Readiness Check with this estimate` (pre-fills contact form with inputs).
4. **The 5 steps** (from A7), with icons and durations.
5. **Effort comparison table** (full A7 table, three columns, difficulty dots).
6. **"What we'll need from you" checklists** (small / mid / large), downloadable as PDF.
7. **Value comparison** (hire an analyst vs. big firm vs. numarket).
8. **FAQ:** Do we have to stop using Excel? (No — we can sync it, or give you easier input screens.) What if our data is really bad? What access do you need? Is our data safe? What happens if we leave? Can we start small?

### PRICING (`/pricing`)
- Three-tier cards (A6), Operate highlighted "Most popular."
- Toggle: "Show setup + monthly" / "Show first-year total."
- Full comparison table (expandable).
- **"What's platform usage?"** explainer with a simple visual meter showing allowance vs. typical use.
- Add-ons: extra data source, extra input screen, extra users, migration projects (priced "from" or "quoted").
- "Free Readiness Check" banner.
- Link to estimator.
- Pricing FAQ (from A6 rules): contract length, leaving, overage, what's included, payment terms (setup 50% at signing / 50% at launch; monthly billed in advance).

### DEMOS (`/demos`)
- Keep all 6 existing dashboards with filters and tooltips.
- Re-frame header: "This is what your team would see — built on your data."
- Add the "Change a Number" and "Ask Your Data" demos as the first two tabs.
- Every demo labeled "Sample data" visibly.

### WHY NUMARKET (`/why-numarket`)
- The 7 differentiators (A9), each with a small illustration.
- Comparison table: numarket vs. hiring in-house vs. big consulting firm vs. DIY software. Columns: cost, time to value, who cleans the data, who explains it, lock-in, AI-readiness.

### SECURITY & TRUST (`/security`)
- 3D-5 Secure Vault.
- Five promises (A8).
- Detail sections: where data is stored, encryption, access control, logging, backups, source-system access (read-only), your team's permissions, healthcare/HIPAA option, insurance, data ownership & exit, incident response ("we notify you within 72 hours of any confirmed incident").
- Downloads: Data Processing Addendum, security overview one-pager.
- Rule: no certification claims numarket doesn't hold.

### PARTNERS (`/partners`)
- Hero: "Your clients are asking about AI. Be the firm with an answer."
- Who partners are (4 types, A10).
- Program table (A10).
- How it works (Introduce → We deliver → You earn).
- Partner inquiry form (firm name, type, # clients, industries served).

### ABOUT (`/about`)
- Story: founded in Atlanta by a data scientist with 7+ years of analytics work across energy, construction, healthcare, manufacturing, aerospace, pharmaceutical, and food production — who kept seeing the same problem: good companies making decisions on messy data.
- Mission: "Make every company's data trustworthy and ready for AI."
- Values: Trust the data · Show before we sell · Plain language · You own it.
- Founder section (photo, short bio, LinkedIn).
- Atlanta HQ, serving clients nationally.

### SUPPORT (`/support`)
- How to get help: email hello@numarket.us (or support@ when created), phone, client Slack/Teams channel (Operate/Command).
- Response targets by tier:
  | | Insight | Operate | Command |
  |---|---|---|---|
  | Business-hours response | 1 business day | 4 business hours | 2 hours |
  | Urgent issue (app down) | Same business day | 4 hours | 1 hour |
  | Channels | Email | Email, phone, shared channel | Dedicated analyst, all channels |
- How to request a change (link to docs).
- Link to Status and Documentation.

### STATUS (`/status` or status.numarket.us)
- Components: Client Workspaces · Data Refresh (pipelines) · Ask Your Data · Website.
- Live states only from a real monitoring service. If not yet set up, show: "All systems operational — updated [timestamp]" pulled from the monitor, or omit the page until it's real. Never hard-code uptime percentages.

### DOCUMENTATION (`/docs`, MDX)
Written for clients, plain language first, technical appendix second.
- **Getting started:** What happens at kickoff · What access we need (by source system) · How to grant read-only access (QuickBooks, Procore, SharePoint, Google Drive, etc.).
- **Using your Workspace:** Signing in · Reading your dashboard · Entering data in input screens · Asking your data questions (tips) · Setting up alerts.
- **Your data:** Data dictionary (what each metric means) · How often data refreshes · What to do if a number looks wrong.
- **Change requests:** How to request a new dashboard, field, or source.
- **Security:** Access, permissions, adding/removing users.
- **Leaving numarket:** Export and handover process, timeline, formats (CSV/Parquet, or full account transfer).
- **Glossary:** plain-English definitions (database, pipeline, dashboard, AI Q&A, platform usage, etc.).
- Docs have left sidebar navigation, search, and "Was this helpful?" feedback.

### CONTACT / START (`/contact`)
- Keep current layout and form, update copy:
  - H1: "Let's see how ready your data is."
  - Sub: "Book a free 30-minute Readiness Check, or send us a note. We reply within 1 business day."
- Left: Calendly embed for Readiness Check.
- Right: form (keep existing fields) + add: "Which path fits you?" (Small/growing · Larger organization · Not sure), "Number of people who need access," "Preferred start" (ASAP / 1–3 months / exploring), hidden fields pre-filled from estimator.
- Success message: "Got it. We'll reply within 1 business day — and come prepared."

### LEGAL (`/legal/terms`, `/legal/privacy`, `/legal/dpa`)
Build pages with this structure; final text must be reviewed by an attorney before publishing.
- **Terms of Service (website):** acceptance; use of site; demos use sample data and are not advice; intellectual property; no warranty; limitation of liability; governing law (Georgia); contact. Note that client engagements are governed by a separate signed Master Services Agreement.
- **Privacy Policy:** what we collect via forms and analytics; how we use it (respond, send proposals); no sale of personal information; cookies (cookieless analytics); service providers (hosting, scheduling, email, form storage); retention; rights and requests (CCPA/state privacy language as applicable); security; children; changes; contact.
- **Data Processing Addendum (summary page + downloadable PDF):** client is data owner, numarket is processor; purpose limitation; confidentiality; subprocessors list (Snowflake, cloud hosting, connectors); security measures; breach notification; return/deletion at termination; audit rights.

## B7. Industry content (for selector + industry pages)

| Industry | Where data lives today | Questions you'll be able to answer | What changes for your team |
|---|---|---|---|
| **Construction & Contractors** | Excel budgets, QuickBooks/Sage, Procore, daily logs, emailed RFIs | Which jobs are over budget right now? Where are change orders coming from? Which RFIs are delaying the schedule? | Supers enter daily progress from a phone; PMs stop rebuilding the same report every Friday |
| **Manufacturing & Operations** | ERP, production spreadsheets, maintenance logs, quality sheets | Which line loses the most time to downtime? Where are rejects coming from? Are we on plan today? | Shift leads log downtime in one screen; plant manager sees all sites live |
| **Food Production & Catering** | Menu/recipe systems, order sheets, inventory counts, labor schedules | How much should we produce tomorrow? Where is food waste highest? What's our true cost per meal? | Production counts entered once; ordering based on real demand, not guesses |
| **Healthcare & Clinics** | EHR exports, scheduling, staffing spreadsheets, billing | Where are wait times rising? Which units are short-staffed? Where is revenue leaking? | Managers see staffing gaps before the shift, not after |
| **Utilities & Energy** | Outage systems, work orders, crew schedules, asset records | Which district has the worst reliability? Are crews being used well? Which assets need attention first? | One live operations view instead of 14 spreadsheets |
| **Finance & Professional Services** | Accounting, time tracking, CRM, billing | Which clients are most profitable? Where are hours going unbilled? What does cash look like in 60 days? | Partners see utilization and cash weekly, not at quarter-end |
| **Logistics & Transportation** | Dispatch/TMS, telematics, fuel cards, accounting | What's our real cost per mile? Where are empty miles? Which customers cost us in wait time? | Dispatch and ops work from the same numbers |
| **Real Estate & Property** | Property management software, leases in spreadsheets, maintenance tickets | Which properties underperform? What leases expire soon? Where are maintenance costs rising? | Portfolio view across every property in one place |

## B8. Copy rules (enforce everywhere)

- Short sentences. One idea per sentence.
- Say "your data," "your team," "your numbers." Talk to them.
- Replace jargon: "ETL/pipelines" → "automatic data updates"; "data warehouse" → "your private database"; "semantic layer" → "business definitions"; "LLM/Cortex" → "Ask Your Data"; "RBAC" → "you control who sees what."
- Technical names (Snowflake, Streamlit, Airbyte) appear only on /platform, /security, and /docs.
- Every page ends with one clear CTA: `Get a Free Readiness Check`.
- Do not promise AI will "do everything." Our message: *we* build and run it; AI helps your team ask questions.

## B9. Content integrity (must follow)

- **Case studies:** Only publish results from real clients with permission. Until then, label them "Illustrative scenario — based on typical results" and do not present them as named past engagements. The three scenarios on the current site (utility, general contractor, professional services firm) must be either verified or re-labeled.
- **Demos:** Always visibly labeled "Sample data."
- **Logos:** No client or partner logos without written permission. No third-party product logos rendered in 3D scenes; text names are fine where accurate.
- **Stats:** No invented metrics (uptime, "clients served," savings) presented as fact.
- **Certifications:** Only claim what numarket holds.
- **Testimonials:** Real, attributed with permission, or omitted.

## B10. Build phases (for the coding platform)

**Phase 1 — Foundation (week 1)**
- Next.js project structure, Tailwind + brand tokens (light/dark), fonts, logo component.
- Global nav with mega menus, footer, all routes created with placeholder layouts.
- Reusable components: Button, Card, Tier Card, Difficulty Dots, Comparison Table, FAQ Accordion, CTA Banner, Section Header, Tabs.

**Phase 2 — Core pages (week 1–2)**
- Home (static fallbacks first), Pricing, Getting Started (quiz + estimator logic), Contact (form + Calendly), Solutions small/enterprise, Security.

**Phase 3 — 3D & interactivity (week 2–3)**
- 3D-1 Data Journey, 3D-2 Pick Your Business, 3D-3 Change a Number + Ask Your Data, 3D-4 Readiness Meter, 3D-5 Secure Vault.
- Reduced-motion and mobile fallbacks for each.

**Phase 4 — Remaining pages (week 3)**
- Products (overview + 4), Platform, 8 industry pages (one template + data file), How It Works, Why numarket, Partners, About, Support, Status, Demos (migrate existing 6).

**Phase 5 — Docs & legal (week 3–4)**
- MDX docs hub with sidebar and search; legal pages (text pending attorney review).

**Phase 6 — QA**
- Lighthouse targets, accessibility audit, 375px mobile check, cross-browser (Chrome, Safari, Edge, Firefox), form submission test, all CTAs route correctly, content integrity checklist (B9).

**Data files (keep content out of components):**
- `content/industries.ts` — the 8 industries (B7).
- `content/tiers.ts` — pricing tiers (A6).
- `content/effort.ts` — effort/timeline/cost by path (A7).
- `content/faq.ts` — FAQs by page.
- `content/steps.ts` — the 6 steps (A3).

## B11. Acceptance checklist

- [ ] A visitor can tell what numarket does within 5 seconds of landing on Home.
- [ ] A small-business owner and an enterprise buyer each find "their" path in one click.
- [ ] The Getting Started page answers how hard, how long, and how much without a call.
- [ ] Every page ends with the Readiness Check CTA.
- [ ] 3D scenes load after content, have fallbacks, and pause off-screen.
- [ ] No jargon on Home, Solutions, Pricing, or Getting Started.
- [ ] All demos and illustrative scenarios are labeled.
- [ ] No unverified claims (certifications, stats, logos, testimonials).
- [ ] Legal pages marked for attorney review before launch.
- [ ] Forms submit to Google Sheets endpoint; estimator inputs pre-fill contact form.
- [ ] Lighthouse ≥ 90 desktop / ≥ 80 mobile; WCAG 2.1 AA.
