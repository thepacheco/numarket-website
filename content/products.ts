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
    short: "Your data: clean, in one private place, and yours to explore.",
    name: "Foundation",
    step: "Your data",
    icon: "database",
    promise: "Your data, clean and in one private place. Look through it, get alerts on it, add to it.",
    intro: "Every system connected, cleaned, and checked on every update, then kept current on a schedule (daily on Small, up to hourly on Mid). Your team can look through any of it, set alerts, and enter what isn't in any system.",
    get: [
      "Every key number in one place, updated on a schedule",
      "Bad data caught before anyone sees it",
      "Explore: filter, find, save, and download any of your data",
      "Alerts when something needs you, and a Monday summary email",
      "Forms for what isn't in any system, like the daily log",
      "Business definitions: what every number means",
    ],
    looks: [
      { title: "Before", body: "Budgets in Excel, costs in QuickBooks, schedules in a project tool, and three versions of the truth." },
      { title: "After", body: "One database where every system feeds in automatically, names match, and totals agree." },
      { title: "Explore and alerts", body: "“Show me every RFI open more than 30 days.” Filter it, save it, and get an email when a new one shows up." },
      { title: "Forms", body: "The superintendent's paper daily log becomes a one-minute phone form. It's checked as they type and lands in your data at the next update." },
    ],
    need: ["A list of the tools and spreadsheets you use", "Your OK on a read-only connection to each", "A few hours to review what we find"],
    includedIn: "Required for all plans. Setup takes 2–10 weeks depending on size.",
    depends: "Nothing. Everything else sits on it.",
    faq: [
      { q: "Do we have to change our systems?", a: "No. Your team keeps using QuickBooks, Procore, Excel, and the rest exactly as it does today. We work from a copy of the data, kept beside them." },
      { q: "What if some of our data is on paper?", a: "If it's information you fill in going forward, like a daily log or a change order list, we replace the paper with a simple form your team fills in on a phone. That's part of Foundation. Scanning the paper you already have, or reading forms automatically, is an Engineering project." },
      { q: "Can we look through the data ourselves?", a: "Yes. Explore lets anyone with access filter any list (open RFIs, change orders, invoices, job costs), find any word or number, save the view, and download it. Set an alert on what you filtered and you'll hear when something new shows up." },
      { q: "What are business definitions?", a: "Your data dictionary: one written meaning for every number (what counts as a late order, what “revenue” includes), where it comes from, and who on your team owns it. They're part of Foundation, and they're what keep dashboards and Ask Your Data accurate." },
      { q: "What if our data is a mess?", a: "That's normal, and it's exactly what Foundation fixes." },
      { q: "How often does it update?", a: "On a schedule: once a day overnight on Small, up to every hour during business hours on Mid, and a custom schedule on Large." },
      { q: "Can you move us off an old system?", a: "Yes, if you're replacing one. The move is priced into your setup quote: your data is mapped, moved table by table, and counted twice before the old system is switched off. If you aren't replacing a system, there's nothing to move." },
      { q: "Can we use our own reporting tool?", a: "Yes. Buy Foundation on its own, look through your data in Explore, and add a read-only login so Power BI, Tableau, or Excel can read your clean database ($150/mo)." },
      { q: "Who owns the data?", a: "You do: the data, the cleaning rules, and anything built for you. It's in the contract, and it all comes with you if you leave." },
    ],
  },
  {
    slug: "workspace",
    kind: "workspace",
    short: "Your dashboards and reports, built for you.",
    name: "Workspace",
    step: "Your dashboards and reports",
    icon: "see",
    promise: "Dashboards and reports built for your business, on your clean data.",
    intro: "We build the dashboards and reports your team uses every day, from our standard building blocks, and keep them working as your business changes. Plus Ask Your Data.",
    get: [
      "Dashboards that update on their own",
      "Your weekly status report, in your branding",
      "Ask Your Data, in plain English",
      "Each person's own Home page: pin what matters",
      "Change hours every month to keep it fitting",
    ],
    looks: [
      { title: "Dashboards", body: "Each role sees what matters to them: owner, manager, or crew lead." },
      { title: "Status reports", body: "The Monday report fills itself in. Your team adds the commentary and sends a PDF in your branding, or your customer's." },
      { title: "Ask Your Data", body: "“Which jobs are over budget this month?” Answered from your numbers, not the internet." },
    ],
    need: ["Tell us who needs to see what", "Send us the reports you make by hand today", "30 minutes for team training at launch"],
    includedIn: "Included in every plan, or on its own on top of Foundation.",
    depends: "Foundation. It reads from your clean database.",
    faq: [
      { q: "How does my team sign in?", a: "Each person gets their own named account from an email invitation, with multi-factor sign-in. No shared passwords." },
      { q: "Do we pay per user?", a: "No. Everyone within your size's user limit is included." },
      { q: "Does it work on a phone?", a: "It works in your phone's browser, so people can check numbers in the field." },
      { q: "Who builds the dashboards?", a: "We do. You tell us what you need to see; we build it from our building blocks and keep it working. Your team arranges their own Home page, filters, and pins charts. A new dashboard page uses your monthly change hours." },
      { q: "How is this different from Engineering?", a: "Workspace is configured, not built: we pick from a library we've already built and point it at your data. If you need something that doesn't exist yet, that's Engineering, quoted as a project." },
      { q: "Can the report look like the one we send today?", a: "Yes. Send us the PDF you use now. We rebuild it from your clean data, in your branding or your customer's, and send it on a schedule. If it needs a layout our building blocks don't cover, that part is a small Engineering project." },
      { q: "Is Ask Your Data accurate?", a: "It answers from your cleaned database using business definitions we write with you, so it uses your numbers and your meanings. Each plan includes a monthly allowance of questions (200 on Small, 1,000 on Mid); more are $40 per 100." },
    ],
  },
  {
    slug: "insight-review",
    kind: "insight",
    short: "Your analyst tells you what to do next.",
    name: "Insight Review",
    step: "Your analyst",
    icon: "act",
    promise: "A real analyst tells you what changed — and what to do next.",
    intro: "What changed, why it matters, and what to do — with owners and due dates.",
    get: [
      "What changed, in plain language",
      "What's at risk, early",
      "Action items with owners and dates",
      "Action items tracked to done, in your Portal",
      "A quarterly business review (QBR) pack for the board",
      "A monthly check on your data volume and usage",
    ],
    looks: [{ title: "An action item", body: "“Route 9 Bridge: design-error change orders are the #1 cost driver. Owner: PM team. Due Friday.”" }],
    need: ["30–60 minutes per review", "The right decision-maker in the room"],
    includedIn: "Optional, from $1,250/mo. A review every month on Small, every two weeks on Mid, weekly plus a daily brief on Large. Included when you take all three products.",
    depends: "Foundation. Works with or without Workspace.",
    faq: [
      { q: "Who runs the review?", a: "A numarket analyst who knows your data and your business." },
      { q: "When do we need an analyst?", a: "When nobody on your team has the time to read the numbers every month and turn them into decisions. If you already have a CFO or analyst who does that, skip Insight Review and take Foundation and Workspace." },
      { q: "Is this the same person who changes our dashboards?", a: "Often, yes: your analyst is your one contact at numarket. What you pay for is different. Changing a dashboard uses Workspace's monthly change hours, fixing something broken is always included, and Insight Review pays for the reading: what the numbers mean, what to do about them, and following up until it's done." },
      { q: "Do we need Workspace for this?", a: "No. The analyst works from your clean database. You can take Foundation plus Insight Review and skip Workspace." },
      { q: "Can we change the frequency?", a: "Yes — move up a size, or add reviews as needed." },
      { q: "What's the usage check?", a: "Each month we compare your data volume and platform usage to your allowance. If you're growing toward the limit, you hear it from us early, with options, before it shows up on an invoice." },
      { q: "Will the analyst follow up with my team every day?", a: "Insight Review is a standing review on a set schedule. Between reviews, the analyst watches your alerts and data checks and flags anything urgent. Daily status chasing isn't included." },
      { q: "Isn't this just reminders?", a: "No. Each cycle you get a written review that explains why the numbers moved, a meeting to agree what to do, action items with owners and dates tracked in your Portal, and every quarter the QBR pack. Your dashboards show what happened; your analyst tells you why and what to do." },
    ],
  },
  {
    slug: "engineering",
    kind: "engineering",
    short: "Custom apps and automations, built for you.",
    name: "Engineering",
    step: "Apps built for you",
    icon: "code",
    promise: "When you need something built that doesn't exist yet.",
    intro: "Getting from paper to digital, custom apps, automations that write back to your systems, client portals, and work inside your own cloud — built for you alone.",
    get: [
      "Paper to digital: scanning forms you already have",
      "Custom apps for one job",
      "Automations that write back to your systems",
      "Reports in the exact format you use today",
      "Portals your customers sign into",
      "Work inside your own cloud",
    ],
    looks: [{ title: "Typical projects", body: "An app that reads a photo of a paper daily log. An estimate builder that prices from your past jobs. Change order approvals on a phone. Automating a monthly close package." }],
    need: ["A sponsor and a clear goal", "Access to the systems involved", "A security review where required"],
    includedIn: "Fixed quote per project, from $5,000 · or $175/hr. Available on its own or on top of any plan.",
    depends: "Nothing required. Most builds use Foundation's clean data.",
    faq: [
      { q: "We still run a lot on paper. Where do we start?", a: "With the paper that matters most. Going forward, a simple phone form replaces it; that's part of Foundation. Reading the paper you already have (scanning past logs, or an app that reads a photo of the form) is a fixed-price Engineering project." },
      { q: "Can you rebuild a report we already send?", a: "Yes. Your current report's layout and numbers become the spec. If our standard report block covers it, it's part of Workspace. If it needs a new layout, it's a small Engineering project." },
      { q: "Isn't the platform already automated?", a: "Yes, for reporting: your data updates, checks, dashboards, status reports, and alerts run on their own as part of Foundation and Workspace. Engineering builds tools that do work in your other systems, like an approved change order posting itself into your accounting system." },
      { q: "Can you work in our cloud?", a: "Yes. We build inside your Snowflake, Azure, or Databricks." },
      { q: "How is it priced?", a: "A fixed quote per project after a short scoping call, from $5,000. Small open-ended work is $175/hr." },
      { q: "Do we need a plan to buy Engineering?", a: "No. It's available on its own or on top of any plan." },
    ],
  },
];

export const productBySlug = (s: string) => products.find((p) => p.slug === s);
