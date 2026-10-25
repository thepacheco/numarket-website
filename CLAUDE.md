# numarket website: notes for Claude Code

The marketing site (numarket.us). Company documents, including the pricing
source of truth and the build plan, live in `numarket-platform/docs/`.

## Releases

- Brandon has authorized pushing website changes to `main`, which deploys
  numarket.us, as well as to the session's branch.
- Before pushing, run `npm run typecheck` and `npm run build`, then check the
  changed pages at desktop width and at 390 px wide (no sideways scrolling).

## Prices

- They live in `content/tiers.ts` only. Pages read from it; never hard-code a
  price in a page.
- **The total for all three products is exactly the sum of the product
  prices.** No bundle discount.
- Plans are named by size only: Small, Mid, Large.
- Keep `numarket-platform/docs/product-and-pricing.md` in step.
- Healthcare (HIPAA) and "your own cloud" are **by request**: reviewed first,
  then quoted. No published surcharge.

## Never put these on the site (decided October 25)

- **Response times.** No "we reply within…", per-plan response targets, or
  "answers in two minutes". Support is business hours, Eastern Time. Any
  service level goes in the contract only.
- "Most popular", "unlimited", or other social proof we can't back. No
  invented statistics, client counts, logos, or testimonials.
- "Leave any time." The term is 12 months, then month to month (Large 12 to
  36); the honest line is "If you leave, your data goes with you."
- Sign-in provider names (Microsoft, Google) in marketing copy.
- "Made-up company" or "not a real client" in estimates. Name the sample
  company and label the figure as an estimate.
- Certifications numarket doesn't hold (SOC 2, HIPAA compliance).
- Claims that AI builds the dashboards. We build them; AI answers questions.
- Anything the Portal or the company can't do yet, stated as working today.
  Check `numarket-platform/docs/START-HERE.md` §4 (the promise list) first.

## Copy

- Short sentences. Talk to the reader ("your data", "your team").
- Plain words:
  - "automatic data updates", not pipelines
  - "your private database", not data warehouse
  - "business definitions", not semantic layer
  - "Ask Your Data", not LLM or Cortex
- Technical product names only on the Platform, Security, and Docs pages.
- Who does what, consistently:
  - **Foundation:** your data, cleaned and checked.
  - **Workspace:** we build and change the screens, from change hours.
  - **Insight Review:** a person reads the numbers and follows up.
  - **Engineering:** software that does work beyond reporting, quoted per
    project.
- Every page ends with **Get a Free Readiness Check**.

## Brand

- Colors:
  - navy `#22577A`
  - teal `#38A3A5`
  - green `#57CC99`
  - ink `#0B1F2E`
  - chaos `#E07A5F` (only for messy data in animations)
- Product colors: Engineering is purple (`#9D92EA`).
- Fonts: DM Sans; DM Serif Display italic for accent words.
- White, spacious; 12–16 px corners; soft shadows.
