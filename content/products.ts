import type { QA } from "./faq";

export type Product = {
  slug: "foundation" | "workspace" | "insight-review" | "engineering";
  kind: "foundation" | "workspace" | "insight" | "engineering";
  short: string;
  name: string;
  step: string;
  icon: string;
  promise: string;
  intro: string;
  get: string[];
  looks: { title: string; body: string }[];
  need: string[];
  includedIn: string;
  faq: QA[];
};

export const products: Product[] = [
  {
    slug: "foundation",
    kind: "foundation",
    short: "All your data in one clean, private database.",
    name: "Foundation",
    step: "Collect · Clean · Secure",
    icon: "database",
    promise: "All your data, in one clean, private database you own.",
    intro: "The one-time setup every engagement starts with.",
    get: [
      "Every key number in one place",
      "Updates on its own — no copy and paste",
      "Bad data caught before anyone sees it",
      "A plain-English dictionary of every number",
    ],
    looks: [
      { title: "Before", body: "Budgets in Excel, costs in QuickBooks, schedules in a project tool, and three versions of the truth." },
      { title: "After", body: "One database where every system feeds in automatically, names match, and totals agree." },
    ],
    need: ["A list of the tools and spreadsheets you use", "Read-only access to each", "A few hours to review what we find"],
    includedIn: "Every engagement. Timeline: 2–10 weeks depending on size.",
    faq: [
      { q: "Do we have to change our systems?", a: "No. We read from them. Your team keeps working the way it does today." },
      { q: "What if our data is a mess?", a: "That's normal, and it's exactly what Foundation fixes." },
      { q: "Who owns the database?", a: "You do. It's written into the contract, and you can take it with you." },
    ],
  },
  {
    slug: "workspace",
    kind: "workspace",
    short: "The app your team uses every day.",
    name: "Workspace",
    step: "See",
    icon: "see",
    promise: "The app your team actually uses — built on your clean data.",
    intro: "Dashboards, input screens, plain-English questions, and alerts — in one private app.",
    get: [
      "Live dashboards",
      "Input screens that replace spreadsheets",
      "Ask Your Data, in plain English",
      "Alerts when something crosses a line",
    ],
    looks: [
      { title: "Dashboards", body: "Each role sees what matters to them — owner, manager, or crew lead." },
      { title: "Input screens", body: "“Update job budget,” “Log downtime,” “Enter today's counts.” Validated, logged, done." },
      { title: "Ask Your Data", body: "“Which jobs are over budget this month?” Answered from your numbers, not the internet." },
    ],
    need: ["Tell us who needs to see what", "Name the spreadsheets you want to retire", "30 minutes for team training at launch"],
    includedIn: "Every subscription: Insight, Operate, and Command.",
    faq: [
      { q: "Do we pay per user?", a: "No. Everyone within your tier's user limit is included." },
      { q: "Does it work on a phone?", a: "Yes. Input screens are built to be used on a phone in the field." },
      { q: "Is Ask Your Data accurate?", a: "It answers from your cleaned database using business definitions we write with you — so it uses your numbers and your meanings." },
    ],
  },
  {
    slug: "insight-review",
    kind: "insight",
    short: "A real analyst tells you what to do next.",
    name: "Insight Review",
    step: "Act",
    icon: "act",
    promise: "A real analyst tells you what changed — and what to do next.",
    intro: "What changed, why it matters, and what to do — with owners and due dates.",
    get: [
      "What changed, in plain language",
      "What's at risk, early",
      "Action items with owners and dates",
      "Follow-up on last time's list",
    ],
    looks: [{ title: "An action item", body: "“Route 9 Bridge: design-error change orders are the #1 cost driver. Owner: PM team. Due Friday.”" }],
    need: ["30–60 minutes per review", "The right decision-maker in the room"],
    includedIn: "Every subscription. Monthly on Insight, bi-weekly on Operate, weekly plus a daily executive brief on Command.",
    faq: [
      { q: "Who runs the review?", a: "A numarket analyst who knows your data and your business." },
      { q: "Can we change the frequency?", a: "Yes — move up a tier, or add reviews as needed." },
    ],
  },
  {
    slug: "engineering",
    kind: "engineering",
    short: "Migrations and custom builds, when you need them.",
    name: "Engineering",
    step: "Optional project work",
    icon: "code",
    promise: "Migrations, custom apps, and work inside your existing platform.",
    intro: "Fixed-scope projects that sit alongside your subscription.",
    get: [
      "Move off old systems for good",
      "Custom apps and automations",
      "Work inside your existing cloud",
      "AI readiness assessments",
    ],
    looks: [{ title: "Typical projects", body: "Retiring a legacy reporting system. Automating a monthly close package. Standing up a governed data layer for an AI pilot." }],
    need: ["A sponsor and a clear goal", "Access to the systems involved", "A security review where required"],
    includedIn: "Optional. Quoted per project.",
    faq: [
      { q: "Can you work in our cloud?", a: "Yes. On Command, your data can live in your platform. We build inside it." },
      { q: "How is it priced?", a: "A fixed quote per project after a short scoping call." },
    ],
  },
];

export const productBySlug = (s: string) => products.find((p) => p.slug === s);
