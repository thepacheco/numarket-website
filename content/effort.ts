export type PathId = "small" | "mid" | "large";

export type Effort = {
  id: PathId;
  label: string;
  difficulty: number; // 1–5 dots
  difficultyLabel: string;
  timeRequired: string;
  whoInvolved: string;
  needFromYou: string;
  firstDashboard: string;
  setup: string;
  monthly: string;
  disruption: string;
  newSoftware: string;
  checklist: string[];
};

export const effort: Effort[] = [
  {
    id: "small",
    label: "Small business",
    difficulty: 1,
    difficultyLabel: "Very easy",
    timeRequired: "~3–5 hours total",
    whoInvolved: "Owner or office manager",
    needFromYou: "A read-only connection or export for each tool, one review meeting",
    firstDashboard: "2–3 weeks",
    setup: "$9,500–$14,000",
    monthly: "$3,000–$3,800",
    disruption: "None",
    newSoftware: "No",
    checklist: [
      "A list of the tools and spreadsheets you use today",
      "Your OK on a read-only connection (or an export) for each one",
      "One person who can answer questions (usually you or your office manager)",
      "One 45-minute review meeting before launch",
    ],
  },
  {
    id: "mid",
    label: "Mid-size",
    difficulty: 2,
    difficultyLabel: "Easy",
    timeRequired: "~8–15 hours total",
    whoInvolved: "Ops or finance lead",
    needFromYou: "Read-only connections to your systems, 2–3 review meetings",
    firstDashboard: "4–6 weeks",
    setup: "$19,000–$40,000",
    monthly: "$5,750–$7,500",
    disruption: "None",
    newSoftware: "No",
    checklist: [
      "An ops or finance lead as your point of contact",
      "Read-only access to each system we connect",
      "The reports your leaders use today (even if they're messy)",
      "Two or three short review meetings during the build",
    ],
  },
  {
    id: "large",
    label: "Large organization",
    difficulty: 3,
    difficultyLabel: "Moderate",
    timeRequired: "Sponsor + IT, ~20–40 hours total",
    whoInvolved: "Executive sponsor + IT contact",
    needFromYou: "Security review, read access, steering meetings",
    firstDashboard: "6–10 weeks",
    setup: "$40,000–$150,000+",
    monthly: "$12,000+",
    disruption: "None — we work alongside existing systems",
    newSoftware: "No (we can use what IT already owns)",
    checklist: [
      "An executive sponsor on the business side",
      "An IT contact to grant read access and complete a security review",
      "A decision on where your data lives: our platform or yours",
      "A steering meeting every two weeks during the build",
    ],
  },
];

export const readinessLevels = [
  { level: 1, name: "Scattered", looks: "Data mostly in spreadsheets, emailed around, different versions.", takes: "A full Foundation build. The biggest improvement." },
  { level: 2, name: "Siloed", looks: "Real systems (QuickBooks, Procore, etc.) but they don't talk to each other.", takes: "Connect and clean. The fastest payback." },
  { level: 3, name: "Connected but messy", looks: "Some reporting exists, but numbers don't match across teams.", takes: "Clean, standardize, and build one source of truth." },
  { level: 4, name: "Organized", looks: "A clean database and dashboards exist.", takes: "Add Workspace apps, Ask Your Data, and Insight Reviews." },
  { level: 5, name: "AI-ready", looks: "Governed, documented, and trusted.", takes: "Advanced automation and AI use cases." },
];

export const startSteps = [
  { title: "Free Readiness Check", time: "30 min", body: "We ask where your data lives and what decisions you're trying to make. You get a readiness score and 3 findings." },
  { title: "Proposal", time: "After the Readiness Check", body: "A fixed setup price, a fixed monthly price, a timeline, and exactly what you'll get." },
  { title: "Kickoff", time: "1 hour", body: "We get read-only access to your tools. You tell us who needs to see what." },
  { title: "Build", time: "2–10 weeks", body: "We collect, clean, and secure your data, then build your Workspace. You see progress every week." },
  { title: "Launch + first Insight Review", time: "1 week", body: "Your team gets access and a 30-minute training. You get your first list of action items." },
];

export const valueCompare = [
  { option: "Hire one data analyst", cost: "~$85K–$110K + benefits + tools", reality: "One person, one skill set, months to ramp up. When they leave, the knowledge leaves." },
  { option: "Big consulting firm", cost: "$150K–$500K+", reality: "Long timelines. Built for enterprises." },
  { option: "numarket, Mid size (all three products)", cost: "~$88K first year, ~$69K after", reality: "A full data team, a hosted platform, Ask Your Data, monthly action items — and you own everything.", highlight: true },
];
