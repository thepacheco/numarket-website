export type IndustrySlug =
  | "construction"
  | "manufacturing"
  | "food-production"
  | "healthcare"
  | "utilities"
  | "professional-services"
  | "logistics"
  | "real-estate";

export type Industry = {
  slug: IndustrySlug;
  name: string;
  short: string;
  icon: IndustrySlug;
  sources: string[];
  questions: string[];
  changes: string;
  /* What the "site" filter is called for this business (Job, Line, Clinic...) */
  siteNoun: { one: string; many: string };
  sites: { small: string[]; large: string[] };
};

export const industries: Industry[] = [
  {
    slug: "construction",
    name: "Construction & Contractors",
    short: "Construction",
    icon: "construction",
    sources: ["Excel budgets", "QuickBooks / Sage", "Procore", "Daily logs", "Emailed RFIs"],
    questions: [
      "Which jobs are over budget right now?",
      "Where are change orders coming from?",
      "Which RFIs are delaying the schedule?",
    ],
    changes: "Supers enter daily progress from a phone. PMs stop rebuilding the same report every Friday.",
    siteNoun: { one: "Job", many: "All jobs" },
    sites: {
      small: ["Hillside Custom Home", "Main St Retail Fit-Out", "Elm Park Renovation"],
      large: ["Terminal Expansion", "Route 9 Bridge", "Data Center Shell", "Substation Upgrade", "Medical Office Building"],
    },
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Operations",
    short: "Manufacturing",
    icon: "manufacturing",
    sources: ["ERP", "Production spreadsheets", "Maintenance logs", "Quality sheets"],
    questions: [
      "Which line loses the most time to downtime?",
      "Where are rejects coming from?",
      "Are we on plan today?",
    ],
    changes: "Shift leads log downtime in one screen. The plant manager sees every line in one view.",
    siteNoun: { one: "Line", many: "All lines" },
    sites: {
      small: ["Line 1 · Cutting", "Line 2 · Assembly", "Line 3 · Packing"],
      large: ["Plant A · Stamping", "Plant A · Assembly", "Plant B · Machining", "Plant B · Paint", "Plant C · Packaging"],
    },
  },
  {
    slug: "food-production",
    name: "Food Production & Catering",
    short: "Food & Catering",
    icon: "food-production",
    sources: ["Menu & recipe system", "Order sheets", "Inventory counts", "Labor schedules"],
    questions: [
      "How much should we produce tomorrow?",
      "Where is food waste highest?",
      "What's our true cost per meal?",
    ],
    changes: "Production counts are entered once. Ordering is based on real demand, not guesses.",
    siteNoun: { one: "Kitchen", many: "All kitchens" },
    sites: {
      small: ["Main Kitchen", "Event Catering", "Café"],
      large: ["Central Kitchen", "Airport Commissary", "Hospital Café", "Corporate Dining", "Event Catering"],
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare & Clinics",
    short: "Healthcare",
    icon: "healthcare",
    sources: ["EHR exports", "Scheduling", "Staffing spreadsheets", "Billing"],
    questions: [
      "Where are wait times rising?",
      "Which clinics are short-staffed?",
      "Where is revenue leaking?",
    ],
    changes: "Managers see staffing gaps before the shift, not after.",
    siteNoun: { one: "Clinic", many: "All clinics" },
    sites: {
      small: ["Main Clinic", "Satellite Clinic", "Urgent Care"],
      large: ["Midtown Clinic", "Northside Clinic", "Westview Urgent Care", "Eastgate Family Practice", "Southpoint Specialty"],
    },
  },
  {
    slug: "utilities",
    name: "Utilities & Energy",
    short: "Utilities",
    icon: "utilities",
    sources: ["Outage system", "Work orders", "Crew schedules", "Asset records"],
    questions: [
      "Which district has the worst reliability?",
      "Are crews being used well?",
      "What's causing the most outage minutes?",
    ],
    changes: "One operations view instead of 14 spreadsheets.",
    siteNoun: { one: "District", many: "All districts" },
    sites: {
      small: ["North Service Area", "South Service Area", "East Service Area"],
      large: ["North District", "South District", "East District", "West District", "Central District"],
    },
  },
  {
    slug: "professional-services",
    name: "Finance & Professional Services",
    short: "Professional Services",
    icon: "professional-services",
    sources: ["Accounting", "Time tracking", "CRM", "Billing"],
    questions: [
      "Which practice areas are most profitable?",
      "Where are hours going unbilled?",
      "Are we collecting what we bill?",
    ],
    changes: "Partners see utilization and cash weekly, not at quarter-end.",
    siteNoun: { one: "Practice", many: "All practices" },
    sites: {
      small: ["Tax", "Bookkeeping", "Advisory"],
      large: ["Tax", "Audit & Assurance", "Advisory", "Outsourced Accounting", "Wealth Management"],
    },
  },
  {
    slug: "logistics",
    name: "Logistics & Transportation",
    short: "Logistics",
    icon: "logistics",
    sources: ["Dispatch / TMS", "Telematics", "Fuel cards", "Accounting"],
    questions: [
      "What's our real cost per mile?",
      "Where are empty miles?",
      "Which terminals miss delivery windows?",
    ],
    changes: "Dispatch and operations work from the same numbers.",
    siteNoun: { one: "Terminal", many: "All terminals" },
    sites: {
      small: ["Atlanta Yard", "Macon Yard", "Savannah Yard"],
      large: ["Atlanta", "Savannah", "Charlotte", "Jacksonville", "Nashville"],
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property Management",
    short: "Real Estate",
    icon: "real-estate",
    sources: ["Property management software", "Lease spreadsheets", "Maintenance tickets", "Accounting"],
    questions: [
      "Which properties underperform?",
      "Which leases expire soon?",
      "Where are maintenance costs rising?",
    ],
    changes: "A portfolio view across every property, in one place.",
    siteNoun: { one: "Property", many: "All properties" },
    sites: {
      small: ["Oak Street Duplexes", "Maple Court Apartments", "Downtown Retail Strip"],
      large: ["Peachtree Lofts", "Midtown Office Tower", "Riverside Retail", "Oak Hill Apartments", "Northpoint Industrial"],
    },
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
