export type TierId = "insight" | "operate" | "command";

export type Tier = {
  id: TierId;
  name: string;
  bestFor: string;
  setupFrom: number;
  monthlyFrom: number;
  popular?: boolean;
  highlights: string[];
};

export const tiers: Tier[] = [
  {
    id: "insight",
    name: "Insight",
    bestFor: "Small businesses getting organized",
    setupFrom: 7500,
    monthlyFrom: 2500,
    highlights: [
      "Up to 3 data sources",
      "Up to 15 app users",
      "1 core dashboard + 1 input screen",
      "Ask Your Data",
      "Monthly Insight Review",
      "4 hrs/mo of changes included",
    ],
  },
  {
    id: "operate",
    name: "Operate",
    bestFor: "Growing and mid-size companies",
    setupFrom: 15000,
    monthlyFrom: 4000,
    popular: true,
    highlights: [
      "Up to 8 data sources",
      "Up to 50 app users",
      "Dashboards by role + up to 5 input screens",
      "Ask Your Data + advanced alerts",
      "Bi-weekly Insight Review",
      "10 hrs/mo of changes included",
    ],
  },
  {
    id: "command",
    name: "Command",
    bestFor: "Larger organizations",
    setupFrom: 40000,
    monthlyFrom: 10000,
    highlights: [
      "Unlimited data sources and users",
      "Fully custom dashboards and input screens",
      "Custom alerts and automations",
      "Weekly review + daily executive brief",
      "A dedicated analyst",
      "Your platform or ours",
    ],
  },
];

/* Full comparison table. Rows are [label, insight, operate, command]. */
export const tierComparison: [string, string, string, string][] = [
  ["Best for", "Small businesses getting organized", "Growing and mid-size companies", "Larger organizations"],
  ["Setup (one-time)", "From $7,500", "From $15,000", "From $40,000"],
  ["Monthly", "From $2,500/mo", "From $4,000/mo", "From $10,000/mo"],
  ["Data sources connected", "Up to 3", "Up to 8", "Unlimited"],
  ["App users", "Up to 15", "Up to 50", "Unlimited"],
  ["Dashboards", "1 core dashboard", "Suite by role (exec / manager / ops)", "Fully custom"],
  ["Input screens (replace spreadsheets)", "1", "Up to 5", "Custom"],
  ["Ask Your Data (plain-English questions)", "✓", "✓", "✓"],
  ["Alerts & automations", "Basic", "Advanced", "Custom"],
  ["Insight Review", "Monthly", "Bi-weekly", "Weekly + daily exec brief"],
  ["Change requests included", "4 hrs/mo", "10 hrs/mo", "Dedicated analyst"],
  ["Where your data lives", "Our secure platform", "Our secure platform", "Ours or yours"],
  ["Platform usage", "Included up to $400/mo", "Included up to $800/mo", "Passed through at cost + 15%"],
  ["Term", "12 months", "12 months", "12–36 months"],
];

export const addOns = [
  { name: "Extra data source", price: "Quoted", note: "Connect another system beyond your tier's limit." },
  { name: "Extra input screen", price: "Quoted", note: "Replace another spreadsheet with a simple form." },
  { name: "Extra app users", price: "Quoted", note: "Add people beyond your tier's user limit." },
  { name: "Migration project", price: "Quoted", note: "Move off an old system or out of spreadsheets for good." },
];

export const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
