export type Step = {
  n: number;
  key: string;
  title: string;
  plain: string;
  detail: string;
};

/* The six steps. The backbone of every page. */
export const steps: Step[] = [
  {
    n: 1,
    key: "collect",
    title: "Collect",
    plain:
      "We find your data wherever it lives — spreadsheets, accounting software, project tools, email attachments — and bring it together.",
    detail: "Source inventory, secure read-only connections, and automatic file sync from SharePoint, OneDrive, or Google Drive.",
  },
  {
    n: 2,
    key: "clean",
    title: "Clean",
    plain:
      "We fix duplicates, errors, missing pieces, and mismatched names so your numbers finally agree with each other.",
    detail: "Standard business definitions, checks on every update, and a plain-English data dictionary.",
  },
  {
    n: 3,
    key: "secure",
    title: "Secure",
    plain: "Your data goes into a private, encrypted database built just for your company.",
    detail: "A dedicated database per client, you control who sees what, multi-factor sign-in, and every login logged.",
  },
  {
    n: 4,
    key: "see",
    title: "See",
    plain:
      "Dashboards that update automatically, and a simple app where your team views status, enters updates, and asks questions in plain English.",
    detail: "Dashboards that refresh on their own, input screens that replace emailed spreadsheets, and Ask Your Data.",
  },
  {
    n: 5,
    key: "act",
    title: "Act",
    plain: "Every month we tell you what changed, what's at risk, and exactly what to do next.",
    detail: "An Insight Review with a numarket analyst. Action items with owners and due dates. Automatic alerts.",
  },
  {
    n: 6,
    key: "own",
    title: "Own",
    plain: "You own your data. If you ever leave, you walk away with it — clean, organized, and documented. No lock-in.",
    detail: "You own your data, the cleaning rules, and your apps. Everything is handed over within 30 days if you leave, at no charge."
  },
];
