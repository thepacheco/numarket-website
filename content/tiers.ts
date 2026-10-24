/* Pricing (v3, October 2026; the model is in docs/numarket-product-and-pricing.md §5).
   Every product has its own price by size. The three plans are bundles of all
   three products and save about 10%. Base fees cover the people who run it;
   normal usage is included; anything that grows with volume has a published
   price (addOns below). Engineering is always quoted separately. */

export type TierId = "insight" | "operate" | "command";
export type PriceSize = "small" | "mid" | "large";
export type PricedProduct = "foundation" | "workspace" | "insight";

export const money = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* Size is set by the data, not by headcount. */
export const sizes: { id: PriceSize; name: string; sources: string; users: string; updates: string; rows: string }[] = [
  { id: "small", name: "Small", sources: "Up to 3 data sources", users: "Up to 15 app users", updates: "Data from your systems updates once a day, overnight", rows: "Up to about 10 million rows of history" },
  { id: "mid", name: "Mid", sources: "Up to 8 data sources", users: "Up to 50 app users", updates: "Data from your systems updates up to every hour, business hours", rows: "Up to about 50 million rows of history" },
  { id: "large", name: "Large", sources: "9+ data sources", users: "50+ app users", updates: "Custom update schedule; near-real-time is quoted as Engineering", rows: "Sized with you" },
];

export type Price = { setup: number; monthly: number; from?: boolean; note?: string };

export const productPrices: Record<PricedProduct, { name: string; required?: boolean; what: string; bySize: Record<PriceSize, Price> }> = {
  foundation: {
    name: "Foundation",
    required: true,
    what: "Your data: connected, cleaned, checked, and kept current. Explore it, set alerts, enter what isn't in any system. Includes the platform usage allowance",
    bySize: {
      small: { setup: 7000, monthly: 1250 },
      mid: { setup: 14000, monthly: 2500 },
      large: { setup: 30000, monthly: 5000, from: true },
    },
  },
  workspace: {
    name: "Workspace",
    what: "Dashboards built for your business, status reports in your branding, Ask Your Data, and change hours",
    bySize: {
      small: { setup: 3000, monthly: 850 },
      mid: { setup: 6000, monthly: 1400 },
      large: { setup: 15000, monthly: 3000, from: true },
    },
  },
  insight: {
    name: "Insight Review",
    what: "A named analyst: reviews, the meeting, action items tracked to done, the QBR pack",
    bySize: {
      small: { setup: 0, monthly: 1250, note: "A review every month" },
      mid: { setup: 0, monthly: 2500, note: "A review every two weeks" },
      large: { setup: 0, monthly: 5000, from: true, note: "Weekly reviews plus a daily brief" },
    },
  },
};

export const engineering = { from: 5000, hourly: 175 };
export const hipaa: Record<PriceSize, number | null> = { small: 500, mid: 800, large: null };
export const allowance: Record<PriceSize, string> = { small: "$400/mo included", mid: "$800/mo included", large: "Passed through at cost + 15%" };

/* Everything that grows with volume has a price, so no client's usage can
   quietly eat the people who serve them. */
export const addOns: { name: string; price: string; why: string }[] = [
  { name: "Extra data source", price: "$150/mo, plus setup from $1,500", why: "Each source is one more thing to watch and fix." },
  { name: "Custom source (an ERP database, custom exports)", price: "+$300/mo each, setup from $4,000", why: "They change more often and need more watching." },
  { name: "More history than your size includes", price: "$200/mo per extra 25 million rows", why: "Longer updates and more checks. Or move up a size." },
  { name: "Hourly updates on Small", price: "$300/mo", why: "Thirteen updates a day instead of one." },
  { name: "Extra Ask Your Data questions", price: "$40 per 100", why: "Each answer runs AI in your database." },
  { name: "Extra change hours", price: "$175/hr, in blocks of 5", why: "New dashboards, fields, or reports beyond your included hours." },
  { name: "Read-only login for Power BI or Excel", price: "$150/mo, includes 25 database credits", why: "Your own queries, on their own capped warehouse." },
  { name: "Enterprise single sign-on (Okta, Entra ID)", price: "$250/mo per connection", why: "Microsoft and Google sign-in are always included." },
  { name: "Healthcare (HIPAA)", price: "+$500/mo Small, +$800/mo Mid", why: "A higher-security database edition that costs about twice as much to run." },
  { name: "Platform usage above your allowance", price: "Cost + 15%", why: "Shown on your Usage page. We warn you at 70% and 85%." },
];

export type Tier = {
  id: TierId;
  name: string;
  size: PriceSize;
  bestFor: string;
  setupFrom: number;
  monthlyFrom: number;
  from?: boolean;
  popular?: boolean;
  includes: Record<PricedProduct, string[]>;
};

export const tiers: Tier[] = [
  {
    id: "insight",
    name: "Insight",
    size: "small",
    bestFor: "Small businesses getting organized",
    setupFrom: 9500,
    monthlyFrom: 3000,
    includes: {
      foundation: [
        "Up to 3 data sources connected",
        "Updated once a day, overnight",
        "Up to about 10 million rows of history",
        "Checks on every update; bad data flagged, not published",
        "Explore: filter, find, and download any of your data",
        "Alerts and a Monday summary email",
        "Forms for what isn't in any system",
        "Your own private, encrypted database",
        "Platform usage included up to $400/mo",
        "Business definitions: what every number means",
      ],
      workspace: [
        "Core dashboards for your industry",
        "Your weekly status report, in your branding",
        "Ask Your Data: 200 questions a month",
        "Up to 15 app users, no per-user fees",
        "2 hours of changes a month",
      ],
      insight: ["A review every month, with a meeting", "What changed, what's at risk, 3–5 action items with owners and due dates", "Action items tracked to done", "Support replies within 1 business day"],
    },
  },
  {
    id: "operate",
    name: "Operate",
    size: "mid",
    bestFor: "Growing and mid-size companies",
    setupFrom: 19000,
    monthlyFrom: 5750,
    popular: true,
    includes: {
      foundation: [
        "Up to 8 data sources connected",
        "Updated up to every hour, business hours",
        "Up to about 50 million rows of history",
        "Checks on every update; bad data flagged, not published",
        "Explore: filter, find, save views, and download",
        "Alerts on anything you filter, and a Monday summary",
        "Forms for what isn't in any system",
        "Your own private, encrypted database",
        "Platform usage included up to $800/mo",
        "Business definitions: what every number means",
      ],
      workspace: [
        "Dashboards by role (owner, manager, operations)",
        "Status reports for your team and your customers",
        "Ask Your Data: 1,000 questions a month",
        "Up to 50 app users, no per-user fees",
        "6 hours of changes a month",
      ],
      insight: ["A review every two weeks, with a meeting", "What changed, what's at risk, 3–5 action items with owners and due dates", "Action items tracked to done, and a quarterly (QBR) pack", "Support replies within 4 business hours"],
    },
  },
  {
    id: "command",
    name: "Command",
    size: "large",
    bestFor: "Larger organizations",
    setupFrom: 40000,
    monthlyFrom: 12000,
    from: true,
    includes: {
      foundation: [
        "9+ data sources connected",
        "Update schedule set with you",
        "Checks on every update; bad data flagged, not published",
        "Explore, alerts, and forms for every team",
        "Our secure platform or your own cloud",
        "Platform usage passed through at cost + 15%",
        "Business definitions: what every number means",
      ],
      workspace: [
        "Dashboards and reports configured for each team",
        "Ask Your Data, sized to your use",
        "50+ app users",
        "A dedicated analyst for changes",
      ],
      insight: ["Weekly reviews plus a daily executive brief", "What changed, what's at risk, and action items with owners and due dates", "QBR and board packs", "Support replies within 2 hours"],
    },
  },
];

export const tierBySize = (s: PriceSize) => tiers.find((t) => t.size === s)!;

/* Totals for any combination. Foundation is always on. */
export function quote(size: PriceSize, withWorkspace: boolean, withInsight: boolean, healthcare: boolean) {
  const f = productPrices.foundation.bySize[size];
  const w = productPrices.workspace.bySize[size];
  const i = productPrices.insight.bySize[size];
  let setup = f.setup + (withWorkspace ? w.setup : 0);
  let monthly = f.monthly + (withWorkspace ? w.monthly : 0) + (withInsight ? i.monthly : 0);
  const aLaCarte = { setup, monthly };
  const bundle = withWorkspace && withInsight ? tierBySize(size) : null;
  if (bundle) {
    setup = bundle.setupFrom;
    monthly = bundle.monthlyFrom;
  }
  const hip = healthcare ? hipaa[size] : 0;
  if (hip) monthly += hip;
  return {
    setup,
    monthly,
    firstYear: setup + monthly * 12,
    from: size === "large",
    bundle,
    saves: bundle ? { setup: aLaCarte.setup - setup, monthly: aLaCarte.monthly + (hip ?? 0) - monthly } : null,
    hipaaQuoted: healthcare && hipaa[size] === null,
  };
}
