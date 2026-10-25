# numarket website

The marketing site at **numarket.us**. It's a Next.js application (App
Router, TypeScript), deployed on Vercel from `main`.

**Company documents live in the Portal repo, not here:**
`numarket-platform/docs/` (start with its `README.md`, the map). That includes
what's real today, the accounts to create, the build plan, and the pricing
source of truth.

## Where things are

| Path | What's in it |
|---|---|
| `content/` | All copy and numbers. Change a price, phone number, product line, industry, FAQ, or doc page here, and every page that uses it updates. |
| `content/tiers.ts` | **Prices.** Each product's price by size. The total for all three is computed as their sum, so it can't drift. Must match `numarket-platform/docs/product-and-pricing.md`. |
| `content/site.ts` | Contact details, the form endpoint (Google Sheet), Calendly, the Portal demo link |
| `app/` | One folder per page |
| `components/` | Navigation, demos, charts, forms, 3D scenes |
| `lib/sample-data.ts` | The sample-data engine behind every demo dashboard. Every number is calculated from row-level records, so filtered views add up. |
| `public/presentation/deck.html` | The client presentation (shown at /docs/presentation) |
| `docs/archive/` | Old documents and the April single-page site, kept for history |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Rules

See [`CLAUDE.md`](CLAUDE.md): brand, copy rules, and the promises the site
must not make.
