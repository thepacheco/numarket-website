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
      "Business definitions: what every number means",
    ],
    looks: [
      { title: "Before", body: "Budgets in Excel, costs in QuickBooks, schedules in a project tool, and three versions of the truth." },
      { title: "After", body: "One database where every system feeds in automatically, names match, and totals agree." },
    ],
    need: ["A list of the tools and spreadsheets you use", "Your OK on a read-only connection to each", "A few hours to review what we find"],
    includedIn: "Required for all plans. Setup takes 2–10 weeks depending on size.",
    depends: "Nothing. Everything else sits on it.",
    faq: [
      { q: "Do we have to change our systems?", a: "No. Your team keeps using QuickBooks, Procore, Excel, and the rest exactly as it does today. We work from a copy of the data, kept beside them." },
      { q: "What if some of our data is on paper?", a: "Foundation works with data that's already digital. Getting paper into a system — a phone form, or scanning what you already have — is an Engineering project. Once it's digital, Foundation picks it up with everything else." },
      { q: "What are business definitions?", a: "Your data dictionary: one written meaning for every number (what counts as a late order, what “revenue” includes), where it comes from, and who on your team owns it. They're part of Foundation, and they're what keep dashboards and Ask Your Data accurate." },
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
      "Your weekly status report, built automatically",
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
      { q: "Can the report look like the one we send today?", a: "Yes. Send us the PDF you use now. We rebuild it from your clean data, in your branding or your customer's, and send it on a schedule. If it needs a layout our building blocks don't cover, that part is a small Engineering project." },
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
      "A monthly check on your data volume and usage",
    ],
    looks: [{ title: "An action item", body: "“Route 9 Bridge: design-error change orders are the #1 cost driver. Owner: PM team. Due Friday.”" }],
    need: ["30–60 minutes per review", "The right decision-maker in the room"],
    includedIn: "Included in every plan: monthly on Small, every two weeks on Mid, weekly plus a daily brief on Large.",
    depends: "Foundation. Works with or without Workspace.",
    faq: [
      { q: "Who runs the review?", a: "A numarket analyst who knows your data and your business." },
      { q: "Do we need Workspace for this?", a: "No. The analyst works from your clean database. Many small owners take Foundation plus Insight Review and skip the app." },
      { q: "Can we change the frequency?", a: "Yes — move up a size, or add reviews as needed." },
      { q: "What's the usage check?", a: "Each month we compare your data volume and platform usage to your allowance. If you're growing toward the limit, you hear it from us early, with options, before it shows up on an invoice." },
      { q: "Will the analyst follow up with my team every day?", a: "Insight Review is a standing review on a set schedule. Day-to-day updates come in through your input screens, and alerts point out what needs attention between reviews." },
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
    intro: "Getting from paper to digital, custom apps, automations that write back to your systems, client portals, and work inside your own cloud — built for you alone.",
    get: [
      "Paper to digital: phone forms and scanning",
      "Custom apps for one job",
      "Automations that write back to your systems",
      "Reports in the exact format you use today",
      "Portals your customers sign into",
      "Work inside your own cloud",
    ],
    looks: [{ title: "Typical projects", body: "Replacing paper daily logs with a phone form. Rebuilding a customer report in its existing layout. Automating a monthly close package." }],
    need: ["A sponsor and a clear goal", "Access to the systems involved", "A security review where required"],
    includedIn: "Fixed quote per project, from $5,000 · or $175/hr. Available on its own or on top of any plan.",
    depends: "Nothing required. Most builds use Foundation's clean data.",
    faq: [
      { q: "We still run a lot on paper. Where do we start?", a: "With the paper that matters most. We replace it with a simple phone form, or scan what you already have, so it lands in a clean table. That's a fixed-price Engineering project. Once your data is digital, Foundation takes over." },
      { q: "Can you rebuild a report we already send?", a: "Yes. Your current report's layout and numbers become the spec. If our standard report block covers it, it's part of Workspace. If it needs a new layout, it's a small Engineering project." },
      { q: "Can you work in our cloud?", a: "Yes. We build inside your Snowflake, Azure, or Databricks." },
      { q: "How is it priced?", a: "A fixed quote per project after a short scoping call, from $5,000. Small open-ended work is $175/hr." },
      { q: "Do we need a plan to buy Engineering?", a: "No. It's available on its own or on top of any plan." },
    ],
  },
];

export const productBySlug = (s: string) => products.find((p) => p.slug === s);
