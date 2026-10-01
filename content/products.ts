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
  /* what it needs underneath it */
  depends: string;
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
    promise: "All your data, in one clean, private database.",
    intro: "The base every engagement starts with — set up once, then kept clean and updated every month.",
    get: [
      "Every key number in one place",
      "Updates on a schedule — no copy and paste",
      "Bad data caught before anyone sees it",
      "A plain-English dictionary of every number",
    ],
    looks: [
      { title: "Before", body: "Budgets in Excel, costs in QuickBooks, schedules in a project tool, and three versions of the truth." },
      { title: "After", body: "One database where every system feeds in automatically, names match, and totals agree." },
    ],
    need: ["A list of the tools and spreadsheets you use", "Read-only access to each", "A few hours to review what we find"],
    includedIn: "Required for all plans. Setup takes 2–10 weeks depending on size.",
    depends: "Nothing. Everything else sits on it.",
    faq: [
      { q: "Do we have to change our systems?", a: "No. We read from them. Your team keeps working the way it does today." },
      { q: "What if our data is a mess?", a: "That's normal, and it's exactly what Foundation fixes." },
      { q: "How often does it update?", a: "On a schedule: once a day overnight on Small, up to every hour during business hours on Mid, and a custom schedule on Large." },
      { q: "Can you move us off an old system?", a: "Yes, as part of Foundation. Your data is mapped, moved table by table, and counted twice before the old system is switched off. Very large migrations are quoted up front." },
      { q: "Can we use our own reporting tool?", a: "Yes. Buy Foundation on its own and point Power BI, Tableau, or Excel at your clean database." },
      { q: "Who owns the data?", a: "You do: the data, the cleaning rules, and anything built for you. It's in the contract, and it all comes with you if you leave." },
    ],
  },
  {
    slug: "workspace",
    kind: "workspace",
    short: "Your reports and your apps.",
    name: "Workspace",
    step: "See",
    icon: "see",
    promise: "Your reports and your apps, on your clean data.",
    intro: "Dashboards, input screens, Ask Your Data, and alerts — set up for your business from our standard building blocks.",
    get: [
      "Dashboards that update automatically",
      "Input screens that replace spreadsheets",
      "Ask Your Data, in plain English",
      "Alerts when the next update shows a problem",
    ],
    looks: [
      { title: "Dashboards", body: "Each role sees what matters to them — owner, manager, or crew lead." },
      { title: "Input screens", body: "“Update job budget,” “Log downtime,” “Enter today's counts.” Validated, logged, done." },
      { title: "Ask Your Data", body: "“Which jobs are over budget this month?” Answered from your numbers, not the internet." },
    ],
    need: ["Tell us who needs to see what", "Name the spreadsheets you want to retire", "30 minutes for team training at launch"],
    includedIn: "Included in every plan, or on its own on top of Foundation.",
    depends: "Foundation. It reads from your clean database.",
    faq: [
      { q: "How does my team sign in?", a: "With the Microsoft or Google account they already use. No new passwords." },
      { q: "Do we pay per user?", a: "No. Everyone within your size's user limit is included." },
      { q: "Does it work on a phone?", a: "It works in your phone's browser, so people can check numbers and fill in input screens in the field." },
      { q: "How is this different from Engineering?", a: "Workspace is configured, not built: we pick from a library we've already built and point it at your data. If you need something that doesn't exist yet, that's Engineering, quoted as a project." },
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
    includedIn: "Included in every plan: monthly on Small, every two weeks on Mid, weekly plus a daily brief on Large.",
    depends: "Foundation. Works with or without Workspace.",
    faq: [
      { q: "Who runs the review?", a: "A numarket analyst who knows your data and your business." },
      { q: "Do we need Workspace for this?", a: "No. The analyst works from your clean database. Many small owners take Foundation plus Insight Review and skip the app." },
      { q: "Can we change the frequency?", a: "Yes — move up a size, or add reviews as needed." },
    ],
  },
  {
    slug: "engineering",
    kind: "engineering",
    short: "Custom apps and automations, built for you.",
    name: "Engineering",
    step: "Build · optional",
    icon: "code",
    promise: "When you need something built that doesn't exist yet.",
    intro: "Custom apps, automations, integrations that write back to your systems, client portals, and work inside your own cloud — built for you alone.",
    get: [
      "Custom apps for one job",
      "Automations that write back to your systems",
      "Portals your customers sign into",
      "Work inside your own cloud",
    ],
    looks: [{ title: "Typical projects", body: "Retiring a legacy reporting system. Automating a monthly close package. Standing up a governed data layer for an AI pilot." }],
    need: ["A sponsor and a clear goal", "Access to the systems involved", "A security review where required"],
    includedIn: "Fixed quote per project, from $5,000 · or $175/hr. Available on its own or on top of any plan.",
    depends: "Nothing required. Most builds use Foundation's clean data.",
    faq: [
      { q: "Can you work in our cloud?", a: "Yes. We build inside your Snowflake, Azure, or Databricks." },
      { q: "How is it priced?", a: "A fixed quote per project after a short scoping call, from $5,000. Small open-ended work is $175/hr." },
      { q: "Do we need a plan to buy Engineering?", a: "No. It's available on its own or on top of any plan." },
    ],
  },
];

export const productBySlug = (s: string) => products.find((p) => p.slug === s);
