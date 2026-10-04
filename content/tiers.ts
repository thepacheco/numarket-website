/* Pricing (Site Revisions v2.1, section 1.2).
   Every product has its own price by size. The three plans are bundles of all
   three products and save about 10%. Engineering is always quoted separately. */

export type TierId = "insight" | "operate" | "command";
export type PriceSize = "small" | "mid" | "large";
export type PricedProduct = "foundation" | "workspace" | "insight";

export const money = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* Size is set by the data, not by headcount. */
export const sizes: { id: PriceSize; name: string; sources: string; users: string; updates: string }[] = [
  { id: "small", name: "Small", sources: "Up to 3 data sources", users: "Up to 15 app users", updates: "Data from your systems updates once a day, overnight" },
  { id: "mid", name: "Mid", sources: "Up to 8 data sources", users: "Up to 50 app users", updates: "Data from your systems updates up to every hour, business hours" },
  { id: "large", name: "Large", sources: "9+ data sources", users: "50+ app users", updates: "Custom update schedule; near-real-time is quoted as Engineering" },
];

export type Price = { setup: number; monthly: number; from?: boolean; note?: string };

export const productPrices: Record<PricedProduct, { name: string; required?: boolean; what: string; bySize: Record<PriceSize, Price> }> = {
  foundation: {
    name: "Foundation",
    required: true,
    what: "Hosting, updates, testing, monitoring, and the platform usage allowance",
    bySize: {
      small: { setup: 6000, monthly: 1100 },
      mid: { setup: 12000, monthly: 1900 },
      large: { setup: 30000, monthly: 5000, from: true },
    },
  },
  workspace: {
    name: "Workspace",
    what: "App hosting, users, Ask Your Data, alerts, and change hours",
    bySize: {
      small: { setup: 2500, monthly: 850 },
      mid: { setup: 5000, monthly: 1300 },
      large: { setup: 15000, monthly: 3000, from: true },
    },
  },
  insight: {
    name: "Insight Review",
    what: "Analyst reviews with action items",
    bySize: {
      small: { setup: 0, monthly: 850, note: "A review every month" },
      mid: { setup: 0, monthly: 1300, note: "A review every two weeks" },
      large: { setup: 0, monthly: 3000, from: true, note: "Weekly reviews plus a daily brief" },
    },
  },
};

export const engineering = { from: 5000, hourly: 175 };
export const hipaa: Record<PriceSize, number | null> = { small: 500, mid: 800, large: null };
export const allowance: Record<PriceSize, string> = { small: "$400/mo included", mid: "$800/mo included", large: "Passed through at cost + 15%" };

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
    setupFrom: 7500,
    monthlyFrom: 2500,
    includes: {
      foundation: [
        "Up to 3 data sources connected",
        "Updated once a day, overnight",
        "Checks on every update; bad data flagged, not published",
        "Your own private, encrypted database",
        "Platform usage included up to $400/mo",
        "Business definitions: what every number means",
      ],
      workspace: [
        "1 core dashboard and 1 input screen",
        "Up to 15 app users, no per-user fees",
        "Ask Your Data",
        "Basic alerts",
        "4 hours of changes a month",
      ],
      insight: ["A review every month", "What changed, what's at risk, 3–5 action items with owners and due dates", "Support replies within 1 business day"],
    },
  },
  {
    id: "operate",
    name: "Operate",
    size: "mid",
    bestFor: "Growing and mid-size companies",
    setupFrom: 15000,
    monthlyFrom: 4000,
    popular: true,
    includes: {
      foundation: [
        "Up to 8 data sources connected",
        "Updated up to every hour, business hours",
        "Checks on every update; bad data flagged, not published",
        "Your own private, encrypted database",
        "Platform usage included up to $800/mo",
        "Business definitions: what every number means",
      ],
      workspace: [
        "Dashboards by role (owner, manager, operations) and up to 5 input screens",
        "Up to 50 app users, no per-user fees",
        "Ask Your Data",
        "Advanced alerts",
        "10 hours of changes a month",
      ],
      insight: ["A review every two weeks", "What changed, what's at risk, 3–5 action items with owners and due dates", "Support replies within 4 business hours"],
    },
  },
  {
    id: "command",
    name: "Command",
    size: "large",
    bestFor: "Larger organizations",
    setupFrom: 40000,
    monthlyFrom: 10000,
    from: true,
    includes: {
      foundation: [
        "9+ data sources connected",
        "Update schedule set with you",
        "Checks on every update; bad data flagged, not published",
        "Our secure platform or your own cloud",
        "Platform usage passed through at cost + 15%",
        "Business definitions: what every number means",
      ],
      workspace: [
        "Dashboards and input screens configured for each team",
        "50+ app users",
        "Ask Your Data",
        "Custom alerts",
        "A dedicated analyst for changes",
      ],
      insight: ["Weekly reviews plus a daily executive brief", "What changed, what's at risk, and action items with owners and due dates", "Support replies within 2 hours"],
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
