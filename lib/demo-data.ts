/* Small, fixed datasets for the "by need" demos. Totals are always
   calculated from the rows, so the demos can't drift from their own data. */

export type Row = { name: string; amount: number; issue?: "duplicate" | "name" | "cancelled" | "missing"; fixTo?: string };

/* The truth: five customers, last quarter. */
export const truth: Row[] = [
  { name: "Acme Corporation", amount: 184000 },
  { name: "Brightline Health", amount: 126500 },
  { name: "Cobalt Logistics", amount: 97250 },
  { name: "Delta Fabrication", amount: 142800 },
  { name: "Evergreen Foods", amount: 61900 },
];

/* Three department reports of the same quarter, each wrong in a normal way. */
export const reports: { dept: string; system: string; rows: Row[] }[] = [
  {
    dept: "Finance",
    system: "Accounting",
    rows: [...truth.slice(0, 2), { name: "Brightline Health", amount: 126500, issue: "duplicate" }, ...truth.slice(2)],
  },
  {
    dept: "Operations",
    system: "Project tool",
    rows: [
      { name: "ACME Corp.", amount: 184000, issue: "name", fixTo: "Acme Corporation" },
      truth[1],
      { name: "Cobalt Logistics LLC", amount: 97250, issue: "name", fixTo: "Cobalt Logistics" },
      truth[3],
      { name: "Evergreen Foods", amount: 61900, issue: "missing" },
    ],
  },
  {
    dept: "Sales",
    system: "CRM",
    rows: [...truth, { name: "Fairway Partners", amount: 88000, issue: "cancelled" }],
  },
];

export const sum = (rows: Row[]) => rows.reduce((s, r) => s + r.amount, 0);

/* What each report says before cleaning (missing rows aren't in the report yet). */
export const messyTotal = (rows: Row[]) => sum(rows.filter((r) => r.issue !== "missing"));
export const trueTotal = sum(truth);

/* Spreadsheet versions of one job's cost-to-date. */
export const versions = [
  { file: "Job_Budget_v3.xlsx", who: "Office", amount: 268400 },
  { file: "Job_Budget_v3_FINAL.xlsx", who: "PM", amount: 274900 },
  { file: "Job_Budget_v3_FINAL_mike.xlsx", who: "Superintendent", amount: 259300 },
  { file: "Copy of Job_Budget (2).xlsx", who: "Owner", amount: 281150 },
  { file: "RE: RE: updated numbers.pdf", who: "Email", amount: 276000 },
];
