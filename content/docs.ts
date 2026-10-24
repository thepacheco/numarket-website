/* Client documentation. Plain language first. */

export type Block = { h?: string; p?: string; ol?: string[]; ul?: string[]; note?: string };
export type Doc = { slug: string; group: string; title: string; summary: string; body: Block[] };

export const docGroups = ["Getting started", "Using your Workspace", "Your data", "Changes & support", "Security", "Leaving", "Reference"];

export const docs: Doc[] = [
  {
    slug: "kickoff",
    group: "Getting started",
    title: "What happens at kickoff",
    summary: "One hour. We agree on who needs what, get read-only access, and set the build schedule.",
    body: [
      { p: "Kickoff is a one-hour call after you sign. By the end of it, everyone knows what's being built, who is involved, and when you'll see progress." },
      { h: "Before the call", ul: ["A list of the tools and spreadsheets that hold your key numbers", "The names of the people who will use the Workspace", "Two or three reports your leaders rely on today (even messy ones)"] },
      { h: "On the call", ol: ["We confirm the questions your dashboards need to answer.", "We list every data source and who owns it.", "We agree on who sees what.", "We set the weekly progress check-in time."] },
      { h: "After the call", p: "We send you step-by-step instructions to grant read-only access to each tool. You'll see the first progress update within a week." },
    ],
  },
  {
    slug: "access",
    group: "Getting started",
    title: "What access we need",
    summary: "A read-only connection to the tools that hold your numbers, and only what we need.",
    body: [
      { p: "We only ask for what we need to copy your data. Wherever possible, that means a read-only user or an export." },
      { h: "Typical requests", ul: ["Accounting (for example QuickBooks, Sage, NetSuite): a read-only user or report access", "Project and operations tools (for example Procore): a read-only user or API access", "Files (SharePoint, OneDrive, Google Drive): access to one shared folder", "HR and payroll: summary exports only"] },
      { note: "You can remove our access at any time. Every login we make is recorded." },
    ],
  },
  {
    slug: "grant-access",
    group: "Getting started",
    title: "How to grant read-only access",
    summary: "The general steps. We send exact instructions for your specific tools at kickoff.",
    body: [
      { p: "Every tool is a little different, so we send you instructions written for your exact version. The pattern is almost always the same:" },
      { ol: ["Sign in to the tool as an admin.", "Invite a new user using the numarket address we give you.", "Choose the lowest role that can view reports (often called Viewer, Read-only, or Reports).", "Send us a note when it's done. We confirm the connection works and tell you exactly what we can see."] },
      { note: "Not sure which role to pick? Choose the most limited one. If we can't see something, we'll ask." },
    ],
  },
  {
    slug: "sign-in",
    group: "Using your Workspace",
    title: "Signing in",
    summary: "Named accounts with multi-factor sign-in. No shared passwords.",
    body: [
      { p: "Each person gets their own account. You'll receive an email invitation from numarket with a link to set up your sign-in." },
      { ol: ["Open the invitation email and choose a password.", "Set up multi-factor sign-in with an authenticator app or text message.", "Bookmark your Workspace link."] },
      { note: "Never share your sign-in. If someone new needs access, ask your admin or your analyst to add them." },
    ],
  },
  {
    slug: "dashboards",
    group: "Using your Workspace",
    title: "Reading your dashboard",
    summary: "Filters at the top, key numbers first, details below.",
    body: [
      { h: "Filters", p: "The row at the top (site, time period) changes every number on the page at once, so everything always adds up." },
      { h: "Key numbers", p: "The first row shows the few numbers that matter most, with the change from the prior period. Green means better; red means worse." },
      { h: "Details", p: "Charts and tables below explain the key numbers. Hover or tap on a chart to see exact values. Click a row to focus on it." },
    ],
  },
  {
    slug: "input-screens",
    group: "Your data",
    title: "Entering data in forms",
    summary: "Fill in the form and save. It's checked as you type and logged with your name.",
    body: [
      { p: "Forms replace the paper and spreadsheets people used to pass around, for information that isn't in any of your systems. What you save becomes part of your data and shows on dashboards at the next update." },
      { ol: ["Open Enter data in the menu and pick the form (for example “Daily field report” or “Change order log”).", "Fill in the fields. If something looks off, like a number far too high or a missing date, you'll see a message before saving.", "Press Save. The entry is logged with your name and time. Have a spreadsheet instead? Upload it on the same page; every row gets the same checks."] },
      { note: "Made a mistake? Open the entry and edit it. The change history is kept." },
    ],
  },
  {
    slug: "ask-your-data",
    group: "Using your Workspace",
    title: "Asking your data questions",
    summary: "Ask like you'd ask a colleague. Be specific about time and place.",
    body: [
      { p: "Ask Your Data answers questions in plain English using your own numbers and the business definitions we wrote with you." },
      { h: "Good questions", ul: ["Which jobs are over budget this month?", "What was cost per mile at the Savannah terminal last quarter?", "Which clinics had wait times over 20 minutes last week?"] },
      { h: "Tips", ul: ["Name the time period (this month, last quarter).", "Name the place (a job, site, or team).", "If an answer looks wrong, tell your analyst — we'll check the definition behind it."] },
    ],
  },
  {
    slug: "alerts",
    group: "Your data",
    title: "Setting up alerts",
    summary: "Pick what you care about. You'll hear about it when the next update finds it.",
    body: [
      { p: "Alerts watch your data for you. Every update is checked against your alerts; anything new shows on the bell in your Portal, and by email if you turn email on." },
      { ol: ["Open Explore, then Alerts.", "Pick a ready-made alert (a job over budget, customers more than 60 days late, cash below a level, a Monday summary of every job) and set your line.", "Or filter any view in Explore (for example, RFIs open more than 30 days) and choose Alert me. You'll hear when something new matches."] },
      { p: "Alerts are included in every plan. Each person sets their own." },
    ],
  },
  {
    slug: "data-dictionary",
    group: "Your data",
    title: "Business definitions (your data dictionary)",
    summary: "What every number means, in plain English.",
    body: [
      { p: "Every number in your Workspace has a written definition we agree with you during the build — what's included, what's not, and where it comes from." },
      { p: "Your analyst shares your business definitions at launch and keeps it up to date. When a definition changes, you'll be told first." },
    ],
  },
  {
    slug: "refresh",
    group: "Your data",
    title: "How often data refreshes",
    summary: "Data from your systems updates on a schedule, set by your size.",
    body: [
      { p: "Data from your other systems updates on a schedule: once a day, overnight, on Small; up to every hour during business hours on Mid; and a custom schedule on Large. Near-real-time feeds are available as Engineering work." },
      { p: "What your team types into forms shows up at the next update." },
      { p: "Your business definitions list the refresh schedule for each source, and every dashboard shows when it was last updated." },
    ],
  },
  {
    slug: "wrong-number",
    group: "Your data",
    title: "If a number looks wrong",
    summary: "Tell us. We trace it, fix it, and add a check so it doesn't happen again.",
    body: [
      { ol: ["Take a screenshot or note the page, filter, and number.", "Send it to your analyst or support.", "We trace the number back to the source and tell you what happened.", "We fix it and add a check so the same problem gets caught automatically next time."] },
    ],
  },
  {
    slug: "change-requests",
    group: "Changes & support",
    title: "Requesting a change",
    summary: "New dashboard, field, or source? Ask your analyst. Monthly hours are included.",
    body: [
      { p: "Each plan includes change-request hours every month (4 on Insight, 10 on Operate, a dedicated analyst on Command)." },
      { ol: ["Send your analyst what you want to see and why.", "We reply with an estimate in hours.", "If it fits in your monthly hours, we schedule it. If not, we tell you before any extra work starts."] },
    ],
  },
  {
    slug: "users",
    group: "Security",
    title: "Adding and removing users",
    summary: "Ask your analyst or your admin. Removed users lose access immediately.",
    body: [
      { p: "Your admin can add or remove people in the Workspace, or ask your analyst to do it." },
      { ul: ["New users get an invitation email and set up multi-factor sign-in.", "Each user only sees what their role allows.", "Removed users lose access immediately. Their past entries stay in the history."] },
    ],
  },
  {
    slug: "leaving",
    group: "Leaving",
    title: "Export and handover",
    summary: "After your term: full export or account transfer within 30 days, at no charge.",
    body: [
      { p: "Your data is yours. If you decide to leave after your term, you choose how to take it:" },
      { ul: ["Your data in open files (Parquet and CSV), delivered to your own cloud storage.", "The structure: every table, field, and relationship.", "The cleaning rules: the code that cleans and matches your data.", "Your apps: the code for your dashboards, forms, and Engineering builds.", "Your business definitions, in plain English.", "Or a transfer of the whole database account, so you keep it running and pay the provider directly."] },
      { p: "One thing to know: Ask Your Data runs on Snowflake. If you move your database somewhere else, that feature needs to be rebuilt there. Everything else comes with you." },
      { p: "We finish within 30 days of the end of your contract, at no charge. After handover, we delete our copies and confirm it in writing." },
    ],
  },
  {
    slug: "glossary",
    group: "Reference",
    title: "Glossary",
    summary: "Plain-English definitions of the words we use.",
    body: [
      { h: "Database", p: "Where your clean data is stored — privately, just for your company." },
      { h: "Automatic data updates", p: "Secure connections that copy data from your tools on a schedule. Sometimes called “pipelines.”" },
      { h: "Dashboard", p: "A screen of your key numbers that updates automatically." },
      { h: "Form", p: "A simple screen that replaces a paper form or a spreadsheet people used to email around. Found under Enter data." },
      { h: "Ask Your Data", p: "Plain-English questions answered from your own numbers." },
      { h: "Insight Review", p: "A regular meeting where your analyst explains what changed and what to do next." },
      { h: "Platform usage", p: "The storage and computing cost of running your database. Included up to an allowance in your plan." },
    ],
  },
];

export const docBySlug = (s: string) => docs.find((d) => d.slug === s);
export const docText = (d: Doc) => [d.title, d.summary, ...d.body.flatMap((b) => [b.h, b.p, b.note, ...(b.ol ?? []), ...(b.ul ?? [])])].filter(Boolean).join(" ");
