/* ============================================================
   numarket SAMPLE DATA ENGINE
   Every industry demo is built from row-level records:
   one record per site per month, 24 months, seeded so it is
   the same on every visit.

   Nothing on screen is typed in by hand. Every KPI, chart,
   table row and action item is calculated from the records
   that pass the current filters. Ratios are always computed
   from summed parts (never an average of averages), so a
   filtered view always ties back to the total.
   ============================================================ */

import { industries, type IndustrySlug } from "@/content/industries";

export type Size = "small" | "large";
export type Totals = Record<string, number>;
export type Fmt = "money" | "money2" | "pct" | "pctd" | "over" | "num" | "dec1" | "dec2" | "min" | "hrs";
export type Status = "good" | "watch" | "risk";

type Rng = () => number;

type Kpi = {
  key: string;
  label: string;
  fmt: Fmt;
  better: "up" | "down" | "none";
  value: (t: Totals) => number;
  hint?: string;
};

type BreakItem = { label: string; value: (t: Totals) => number };

type ActionCtx = {
  site: string;
  t: Totals;
  status: Status;
  top: { label: string; value: number; share: number };
  size: Size;
};

export type Action = { headline: string; detail: string; owner: string; due: string };

type Model = {
  stock?: string[];
  gen: (rng: Rng, siteIndex: number, month: number, size: Size, profile: Totals) => Totals;
  profile: (rng: Rng, siteIndex: number, size: Size) => Totals;
  kpis: Kpi[];
  trend: {
    title: string;
    fmt: Fmt;
    cumulative?: boolean;
    a: { label: string; value: (t: Totals) => number };
    b: { label: string; value: (t: Totals) => number };
  };
  breakdown: { title: string; fmt: Fmt; items: BreakItem[] };
  statusKpi: string;
  status: (t: Totals) => Status;
  action: (c: ActionCtx) => Action;
};

/* ---------- helpers ---------- */

const MONTHS = 24;
const MONTH_NAMES = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
/* Month index 23 = Aug 2026 */
export const monthLabel = (m: number) => {
  const year = m < 4 ? 24 : m < 16 ? 25 : 26;
  return `${MONTH_NAMES[m % 12]} '${year}`;
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): Rng {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const season = (m: number, amp = 0.12, phase = 0) => 1 + amp * Math.sin((2 * Math.PI * (m % 12)) / 12 + phase);
const jitter = (r: Rng, spread: number) => 1 + (r() - 0.5) * 2 * spread;
/* Per-site "story" bias: site 2 (index 1) is the one with a problem. */
const BIAS = [0.3, -1, 0.6, -0.35, 0.15];
const sum = (t: Totals, keys: string[]) => keys.reduce((s, k) => s + (t[k] || 0), 0);
const safe = (a: number, b: number) => (b === 0 ? 0 : a / b);

/* Split a total across categories by weights. */
function split(total: number, w: number[], keys: string[], out: Totals) {
  const wt = w.reduce((x, y) => x + y, 0);
  keys.forEach((k, i) => (out[k] = (total * w[i]) / wt));
}

function weights(r: Rng, base: number[], emphasis: number, boost: number) {
  return base.map((b, i) => b * (0.75 + r() * 0.5) * (i === emphasis ? boost : 1));
}

/* ---------- formatting ---------- */

export function fmt(v: number, f: Fmt): string {
  if (!isFinite(v)) return "—";
  switch (f) {
    case "money": {
      const a = Math.abs(v);
      const s = v < 0 ? "−" : "";
      if (a >= 1e6) return `${s}$${(a / 1e6).toFixed(a >= 1e7 ? 1 : 2)}M`;
      if (a >= 1e3) return `${s}$${(a / 1e3).toFixed(a >= 1e5 ? 0 : 1)}K`;
      return `${s}$${a.toFixed(0)}`;
    }
    case "money2":
      return `$${v.toFixed(2)}`;
    case "over":
      return `${fmt(Math.abs(v), "money")} ${v > 0 ? "over" : "under"}`;
    case "pctd":
      return `${v > 0 ? "+" : v < 0 ? "−" : ""}${(Math.abs(v) * 100).toFixed(1)}%`;
    case "pct":
      return `${(v * 100).toFixed(1)}%`;
    case "num":
      return Math.round(v).toLocaleString("en-US");
    case "dec1":
      return v.toFixed(1);
    case "dec2":
      return v.toFixed(2);
    case "min":
      return `${v.toFixed(1)} min`;
    case "hrs":
      return `${Math.round(v).toLocaleString("en-US")} hrs`;
  }
}

/* ============================================================
   INDUSTRY MODELS
   ============================================================ */

const CO = ["co_design", "co_owner", "co_unforeseen", "co_weather", "co_scope"];
const DT = ["dt_changeover", "dt_breakdown", "dt_material", "dt_quality", "dt_other"];
const WS = ["w_over", "w_spoil", "w_trim", "w_plate"];
const DN = ["dn_coding", "dn_auth", "dn_elig", "dn_timely", "dn_other"];
const CM = ["cmi_weather", "cmi_equip", "cmi_veg", "cmi_third", "cmi_other"];
const UB = ["ub_writedown", "ub_notentered", "ub_fixedfee", "ub_admin"];
const LC = ["c_fuel", "c_driver", "c_maint", "c_tolls"];
const MT = ["m_hvac", "m_plumb", "m_turn", "m_roof", "m_other"];

const models: Record<IndustrySlug, Model> = {
  /* ---------------- CONSTRUCTION ---------------- */
  construction: {
    stock: ["rfis"],
    profile: (r, i, size) => ({
      value: size === "large" ? 8e6 + r() * 46e6 : 3.5e5 + r() * 1.9e6,
      cpi: 1 + BIAS[i] * 0.06 + (r() - 0.5) * 0.015,
      spi: 1 + (r() - 0.5) * 0.06,
    }),
    gen: (r, i, m, size, p) => {
      const planned = (p.value / 20) * season(m, 0.18, 1.2) * jitter(r, 0.1);
      const earned = planned * p.spi * jitter(r, 0.04);
      const actual = earned / (p.cpi * jitter(r, 0.02));
      const out: Totals = { planned, earned, actual };
      out.rfis = Math.round((size === "large" ? 9 : 3) * (0.6 + r() * 0.8) * (p.cpi < 0.97 ? 2.1 : 1));
      const coTotal = actual * (0.018 + r() * 0.022) * (p.cpi < 0.97 ? 1.8 : 1);
      split(coTotal, weights(r, [22, 28, 20, 12, 18], p.cpi < 0.97 ? 0 : 4, 2.4), CO, out);
      return out;
    },
    kpis: [
      { key: "actual", label: "Spent in period", fmt: "money", better: "none", value: (t) => t.actual },
      { key: "cpi", label: "Cost performance", fmt: "dec2", better: "up", value: (t) => safe(t.earned, t.actual), hint: "1.00 or higher = on or under budget" },
      { key: "over", label: "Cost vs. budget for work done", fmt: "over", better: "down", value: (t) => t.actual - t.earned },
      { key: "rfis", label: "Open RFIs", fmt: "num", better: "down", value: (t) => t.rfis },
    ],
    trend: {
      title: "Budget vs. actual cost (cumulative)",
      fmt: "money",
      cumulative: true,
      a: { label: "Budget for work done", value: (t) => t.earned },
      b: { label: "Actual cost", value: (t) => t.actual },
    },
    breakdown: {
      title: "Change orders by cause",
      fmt: "money",
      items: [
        { label: "Design errors", value: (t) => t.co_design },
        { label: "Owner changes", value: (t) => t.co_owner },
        { label: "Unforeseen conditions", value: (t) => t.co_unforeseen },
        { label: "Weather", value: (t) => t.co_weather },
        { label: "Scope additions", value: (t) => t.co_scope },
      ],
    },
    statusKpi: "cpi",
    status: (t) => {
      const c = safe(t.earned, t.actual);
      return c >= 0.98 ? "good" : c >= 0.94 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) =>
      status === "good"
        ? {
            headline: `${site} is on budget`,
            detail: `Cost performance is ${fmt(safe(t.earned, t.actual), "dec2")}. ${top.label} are the largest change-order cause (${fmt(top.share, "pct")}). Keep watching them.`,
            owner: "Project manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Review ${top.label.toLowerCase()} change orders on ${site}`,
            detail: `${site} has spent ${fmt(t.actual - t.earned, "money")} more than budgeted for the work done so far. ${top.label} make up ${fmt(top.share, "pct")} of its change orders, and ${Math.round(t.rfis)} RFIs are still open.`,
            owner: "Project manager",
            due: "This Friday",
          },
  },

  /* ---------------- MANUFACTURING ---------------- */
  manufacturing: {
    profile: (r, i, size) => ({
      rate: size === "large" ? 180 + r() * 140 : 45 + r() * 40,
      down: 0.07 - BIAS[i] * 0.045 + r() * 0.01,
      reject: 0.018 - BIAS[i] * 0.008 + r() * 0.004,
    }),
    gen: (r, i, m, size, p) => {
      const scheduled = (size === "large" ? 620 : 420) * jitter(r, 0.03);
      const downtime = scheduled * p.down * jitter(r, 0.25);
      const plannedUnits = scheduled * p.rate * season(m, 0.06);
      const units = (scheduled - downtime) * p.rate * season(m, 0.06) * jitter(r, 0.02);
      const out: Totals = { scheduled, plannedUnits, units, rejects: units * p.reject * jitter(r, 0.2), downtime };
      split(downtime, weights(r, [30, 26, 16, 14, 14], p.down > 0.08 ? 1 : 0, 2), DT, out);
      return out;
    },
    kpis: [
      { key: "units", label: "Units produced", fmt: "num", better: "up", value: (t) => t.units },
      { key: "plan", label: "Output vs. plan", fmt: "pct", better: "up", value: (t) => safe(t.units, t.plannedUnits) },
      { key: "uptime", label: "Uptime", fmt: "pct", better: "up", value: (t) => 1 - safe(t.downtime, t.scheduled), hint: "Target: 92%" },
      { key: "reject", label: "Reject rate", fmt: "pct", better: "down", value: (t) => safe(t.rejects, t.units) },
    ],
    trend: {
      title: "Planned vs. produced units",
      fmt: "num",
      a: { label: "Planned", value: (t) => t.plannedUnits },
      b: { label: "Produced", value: (t) => t.units },
    },
    breakdown: {
      title: "Downtime hours by cause",
      fmt: "hrs",
      items: [
        { label: "Changeovers", value: (t) => t.dt_changeover },
        { label: "Breakdowns", value: (t) => t.dt_breakdown },
        { label: "Material shortage", value: (t) => t.dt_material },
        { label: "Quality hold", value: (t) => t.dt_quality },
        { label: "Other", value: (t) => t.dt_other },
      ],
    },
    statusKpi: "uptime",
    status: (t) => {
      const u = 1 - safe(t.downtime, t.scheduled);
      return u >= 0.92 ? "good" : u >= 0.88 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) =>
      status === "good"
        ? {
            headline: `${site} is running on plan`,
            detail: `Uptime is ${fmt(1 - safe(t.downtime, t.scheduled), "pct")}. ${top.label} are still the biggest source of lost time (${fmt(top.value, "hrs")}).`,
            owner: "Plant manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Cut ${top.label.toLowerCase()} on ${site}`,
            detail: `${site} lost ${fmt(t.downtime, "hrs")} to downtime. ${top.label} caused ${fmt(top.share, "pct")} of it. Output is at ${fmt(safe(t.units, t.plannedUnits), "pct")} of plan.`,
            owner: "Maintenance lead + shift leads",
            due: "Within 2 weeks",
          },
  },

  /* ---------------- FOOD PRODUCTION ---------------- */
  "food-production": {
    profile: (r, i, size) => ({
      meals: size === "large" ? 9000 + r() * 16000 : 1400 + r() * 2200,
      over: 0.06 - BIAS[i] * 0.045 + r() * 0.01,
      cpm: 6.2 + r() * 3.4 - BIAS[i] * 0.4,
    }),
    gen: (r, i, m, size, p) => {
      const served = p.meals * season(m, 0.14, 2.4) * jitter(r, 0.06);
      const forecast = served * jitter(r, 0.09);
      const produced = served * (1 + p.over * jitter(r, 0.3));
      const food = produced * p.cpm * 0.62 * jitter(r, 0.03);
      const labor = served * p.cpm * 0.44 * jitter(r, 0.03);
      const out: Totals = { served, forecast, produced, food, labor, absErr: Math.abs(forecast - served) };
      const wasteLbs = (produced - served) * 0.9 + served * 0.035;
      split(wasteLbs, weights(r, [36, 22, 26, 16], 0, p.over > 0.08 ? 1.8 : 1), WS, out);
      return out;
    },
    kpis: [
      { key: "served", label: "Meals served", fmt: "num", better: "up", value: (t) => t.served },
      { key: "cpm", label: "True cost per meal", fmt: "money2", better: "down", value: (t) => safe(t.food + t.labor, t.served), hint: "Food + labor ÷ meals served" },
      { key: "over", label: "Overproduction", fmt: "pct", better: "down", value: (t) => safe(t.produced - t.served, t.produced) },
      { key: "acc", label: "Forecast accuracy", fmt: "pct", better: "up", value: (t) => 1 - safe(t.absErr, t.served) },
    ],
    trend: {
      title: "Forecast vs. meals served",
      fmt: "num",
      a: { label: "Forecast", value: (t) => t.forecast },
      b: { label: "Served", value: (t) => t.served },
    },
    breakdown: {
      title: "Food waste by type (lbs)",
      fmt: "num",
      items: [
        { label: "Overproduction", value: (t) => t.w_over },
        { label: "Spoilage", value: (t) => t.w_spoil },
        { label: "Prep trim", value: (t) => t.w_trim },
        { label: "Plate returns", value: (t) => t.w_plate },
      ],
    },
    statusKpi: "over",
    status: (t) => {
      const o = safe(t.produced - t.served, t.produced);
      return o <= 0.06 ? "good" : o <= 0.1 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) =>
      status === "good"
        ? {
            headline: `${site} is producing close to demand`,
            detail: `Overproduction is ${fmt(safe(t.produced - t.served, t.produced), "pct")}. True cost per meal is ${fmt(safe(t.food + t.labor, t.served), "money2")}.`,
            owner: "Kitchen manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Set ${site} production to the demand forecast`,
            detail: `${site} made ${fmt(t.produced - t.served, "num")} more meals than it served (${fmt(safe(t.produced - t.served, t.produced), "pct")}). ${top.label} is the largest waste type at ${fmt(top.value, "num")} lbs.`,
            owner: "Executive chef",
            due: "Starting Monday",
          },
  },

  /* ---------------- HEALTHCARE ---------------- */
  healthcare: {
    profile: (r, i, size) => ({
      visits: size === "large" ? 2600 + r() * 3200 : 520 + r() * 600,
      fill: 0.955 + BIAS[i] * 0.045 + (r() - 0.5) * 0.01,
      wait: 14 - BIAS[i] * 6 + r() * 3,
      collect: 0.93 + BIAS[i] * 0.03,
    }),
    gen: (r, i, m, size, p) => {
      const targetVisits = p.visits * season(m, 0.1, 0.3);
      const fill = Math.min(1, p.fill * jitter(r, 0.015));
      const visits = targetVisits * (0.9 + fill * 0.08) * jitter(r, 0.03);
      const shiftsNeeded = Math.round(visits / 18);
      const billed = visits * (160 + r() * 20);
      const collected = billed * p.collect * jitter(r, 0.01);
      const out: Totals = {
        targetVisits,
        visits,
        waitTotal: visits * p.wait * (1 + (1 - fill) * 3) * jitter(r, 0.05),
        shiftsNeeded,
        shiftsFilled: Math.round(shiftsNeeded * fill),
        billed,
        collected,
      };
      split((billed - collected) * 0.8, weights(r, [30, 26, 22, 10, 12], p.collect < 0.92 ? 1 : 0, 1.8), DN, out);
      return out;
    },
    kpis: [
      { key: "visits", label: "Patient visits", fmt: "num", better: "up", value: (t) => t.visits },
      { key: "wait", label: "Average wait", fmt: "min", better: "down", value: (t) => safe(t.waitTotal, t.visits), hint: "Target: under 15 min" },
      { key: "fill", label: "Shifts filled", fmt: "pct", better: "up", value: (t) => safe(t.shiftsFilled, t.shiftsNeeded) },
      { key: "collect", label: "Collection rate", fmt: "pct", better: "up", value: (t) => safe(t.collected, t.billed) },
    ],
    trend: {
      title: "Visit target vs. actual visits",
      fmt: "num",
      a: { label: "Target", value: (t) => t.targetVisits },
      b: { label: "Actual", value: (t) => t.visits },
    },
    breakdown: {
      title: "Denied claims by reason",
      fmt: "money",
      items: [
        { label: "Coding errors", value: (t) => t.dn_coding },
        { label: "Missing prior auth", value: (t) => t.dn_auth },
        { label: "Eligibility", value: (t) => t.dn_elig },
        { label: "Timely filing", value: (t) => t.dn_timely },
        { label: "Other", value: (t) => t.dn_other },
      ],
    },
    statusKpi: "fill",
    status: (t) => {
      const f = safe(t.shiftsFilled, t.shiftsNeeded);
      return f >= 0.95 ? "good" : f >= 0.91 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) => {
      const gap = Math.max(0, t.shiftsNeeded - t.shiftsFilled);
      return status === "good"
        ? {
            headline: `${site} is fully staffed`,
            detail: `${fmt(safe(t.shiftsFilled, t.shiftsNeeded), "pct")} of shifts filled. Average wait is ${fmt(safe(t.waitTotal, t.visits), "min")}. ${top.label} are the top denial reason (${fmt(top.value, "money")}).`,
            owner: "Practice manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Fill ${site}'s staffing gap before it hits wait times`,
            detail: `${site} left ${fmt(gap, "num")} shifts unfilled, and the average wait rose to ${fmt(safe(t.waitTotal, t.visits), "min")}. Separately, ${top.label.toLowerCase()} denied ${fmt(top.value, "money")} in claims.`,
            owner: "Nurse manager + billing lead",
            due: "Before next schedule is posted",
          };
    },
  },

  /* ---------------- UTILITIES ---------------- */
  utilities: {
    stock: ["customers"],
    profile: (r, i, size) => ({
      customers: size === "large" ? 60000 + r() * 90000 : 4000 + r() * 6000,
      saidi: 7.2 - BIAS[i] * 1.6 + r() * 0.6,
      util: 0.8 + BIAS[i] * 0.07,
    }),
    gen: (r, i, m, size, p) => {
      const customers = p.customers * (1 + m * 0.0015);
      const storm = season(m, 0.45, 4.4);
      const cmi = customers * p.saidi * storm * jitter(r, 0.2);
      const out: Totals = {
        customers,
        cmi,
        targetCmi: customers * 6.8 * season(m, 0.3, 4.4),
        outages: Math.max(1, Math.round((size === "large" ? 6 : 2) * storm * (p.saidi / 6.5) * jitter(r, 0.3))),
        crewAvail: (size === "large" ? 4200 : 700) * jitter(r, 0.02),
      };
      out.crewWorked = out.crewAvail * Math.min(0.97, p.util * jitter(r, 0.03));
      split(cmi, weights(r, [36, 26, 18, 12, 8], p.saidi > 7.5 ? 1 : 0, 1.5), CM, out);
      return out;
    },
    kpis: [
      { key: "saidi", label: "Outage minutes per customer", fmt: "dec1", better: "down", value: (t) => safe(t.cmi, t.customers), hint: "SAIDI for the period" },
      { key: "vs", label: "vs. reliability target", fmt: "pctd", better: "down", value: (t) => safe(t.cmi, t.targetCmi) - 1 },
      { key: "outages", label: "Outage events", fmt: "num", better: "down", value: (t) => t.outages },
      { key: "crew", label: "Crew utilization", fmt: "pct", better: "up", value: (t) => safe(t.crewWorked, t.crewAvail) },
    ],
    trend: {
      title: "Outage minutes per customer vs. target",
      fmt: "dec1",
      a: { label: "Target", value: (t) => safe(t.targetCmi, t.customers) },
      b: { label: "Actual", value: (t) => safe(t.cmi, t.customers) },
    },
    breakdown: {
      title: "Outage minutes per customer by cause",
      fmt: "dec1",
      items: [
        { label: "Weather", value: (t) => safe(t.cmi_weather, t.customers) },
        { label: "Equipment failure", value: (t) => safe(t.cmi_equip, t.customers) },
        { label: "Vegetation", value: (t) => safe(t.cmi_veg, t.customers) },
        { label: "Third-party damage", value: (t) => safe(t.cmi_third, t.customers) },
        { label: "Other", value: (t) => safe(t.cmi_other, t.customers) },
      ],
    },
    statusKpi: "vs",
    status: (t) => {
      const v = safe(t.cmi, t.targetCmi);
      return v <= 1 ? "good" : v <= 1.12 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) =>
      status === "good"
        ? {
            headline: `${site} is beating its reliability target`,
            detail: `Customers averaged ${fmt(safe(t.cmi, t.customers), "dec1")} outage minutes, ${fmt(1 - safe(t.cmi, t.targetCmi), "pct")} better than target. Crew utilization is ${fmt(safe(t.crewWorked, t.crewAvail), "pct")}.`,
            owner: "District manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Target ${top.label.toLowerCase()} in ${site}`,
            detail: `${site} customers averaged ${fmt(safe(t.cmi, t.customers), "dec1")} outage minutes, ${fmt(safe(t.cmi, t.targetCmi) - 1, "pct")} worse than target. ${top.label} caused ${fmt(top.share, "pct")} of them. Crew utilization is ${fmt(safe(t.crewWorked, t.crewAvail), "pct")}.`,
            owner: "Operations director",
            due: "Before storm season",
          },
  },

  /* ---------------- PROFESSIONAL SERVICES ---------------- */
  "professional-services": {
    profile: (r, i, size) => ({
      staff: size === "large" ? 18 + Math.round(r() * 30) : 3 + Math.round(r() * 4),
      rate: 165 + r() * 120,
      util: 0.72 + BIAS[i] * 0.07,
      collect: 0.95 + BIAS[i] * 0.02,
    }),
    gen: (r, i, m, size, p) => {
      const avail = p.staff * 150 * jitter(r, 0.02);
      const busy = season(m, 0.2, i === 0 ? 5.6 : 0.5);
      const billedHrs = avail * Math.min(0.92, p.util * busy) * jitter(r, 0.03);
      const unbilled = billedHrs * (0.09 - BIAS[i] * 0.04) * jitter(r, 0.25);
      const billed = billedHrs * p.rate;
      const out: Totals = {
        avail,
        billedHrs,
        billed,
        target: avail * 0.72 * p.rate * busy,
        collected: billed * p.collect * jitter(r, 0.01),
        unbilled,
        unbilledValue: unbilled * p.rate,
      };
      split(unbilled, weights(r, [28, 34, 24, 14], p.util < 0.68 ? 1 : 0, 1.6), UB, out);
      return out;
    },
    kpis: [
      { key: "billed", label: "Revenue billed", fmt: "money", better: "up", value: (t) => t.billed },
      { key: "util", label: "Billable utilization", fmt: "pct", better: "up", value: (t) => safe(t.billedHrs, t.avail), hint: "Target: 70%" },
      { key: "unbilled", label: "Hours worked, not billed", fmt: "hrs", better: "down", value: (t) => t.unbilled },
      { key: "collect", label: "Collection rate", fmt: "pct", better: "up", value: (t) => safe(t.collected, t.billed) },
    ],
    trend: {
      title: "Revenue target vs. billed",
      fmt: "money",
      a: { label: "Target", value: (t) => t.target },
      b: { label: "Billed", value: (t) => t.billed },
    },
    breakdown: {
      title: "Unbilled hours by reason",
      fmt: "hrs",
      items: [
        { label: "Write-downs", value: (t) => t.ub_writedown },
        { label: "Time not entered", value: (t) => t.ub_notentered },
        { label: "Fixed-fee overrun", value: (t) => t.ub_fixedfee },
        { label: "Admin on client work", value: (t) => t.ub_admin },
      ],
    },
    statusKpi: "util",
    status: (t) => {
      const u = safe(t.billedHrs, t.avail);
      return u >= 0.7 ? "good" : u >= 0.63 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) =>
      status === "good"
        ? {
            headline: `${site} is at healthy utilization`,
            detail: `Utilization is ${fmt(safe(t.billedHrs, t.avail), "pct")} and ${fmt(safe(t.collected, t.billed), "pct")} of billings are collected. ${fmt(t.unbilled, "hrs")} still went unbilled.`,
            owner: "Practice lead",
            due: "Next Insight Review",
          }
        : {
            headline: `Recover unbilled time in ${site}`,
            detail: `${site} worked ${fmt(t.unbilled, "hrs")} it never billed — about ${fmt(t.unbilledValue, "money")} at its average rate. The biggest reason is ${top.label.toLowerCase()} (${fmt(top.share, "pct")}).`,
            owner: "Practice partner",
            due: "Before month-end close",
          },
  },

  /* ---------------- LOGISTICS ---------------- */
  logistics: {
    profile: (r, i, size) => ({
      trucks: size === "large" ? 40 + Math.round(r() * 60) : 5 + Math.round(r() * 7),
      empty: 0.14 - BIAS[i] * 0.06 + r() * 0.02,
      cpm: 1.92 - BIAS[i] * 0.12 + r() * 0.08,
      ontime: 0.93 + BIAS[i] * 0.035,
    }),
    gen: (r, i, m, size, p) => {
      const miles = p.trucks * 9200 * season(m, 0.08, 1) * jitter(r, 0.04);
      const loaded = miles * (1 - p.empty * jitter(r, 0.12));
      const cost = miles * p.cpm * jitter(r, 0.025);
      const loads = Math.round(loaded / 460);
      const out: Totals = {
        miles,
        loaded,
        cost,
        budgetCost: miles * 1.9,
        loads,
        ontimeLoads: Math.round(loads * Math.min(0.995, p.ontime * jitter(r, 0.01))),
        detention: loads * (0.35 - BIAS[i] * 0.15) * jitter(r, 0.2),
      };
      split(cost, [0.34 * jitter(r, 0.05), 0.44, 0.13 * jitter(r, 0.1), 0.09], LC, out);
      return out;
    },
    kpis: [
      { key: "cpm", label: "Cost per mile", fmt: "money2", better: "down", value: (t) => safe(t.cost, t.miles), hint: "Budget: $1.90" },
      { key: "empty", label: "Empty miles", fmt: "pct", better: "down", value: (t) => 1 - safe(t.loaded, t.miles) },
      { key: "ontime", label: "On-time deliveries", fmt: "pct", better: "up", value: (t) => safe(t.ontimeLoads, t.loads) },
      { key: "detention", label: "Detention hours", fmt: "hrs", better: "down", value: (t) => t.detention },
    ],
    trend: {
      title: "Cost per mile: budget vs. actual",
      fmt: "money2",
      a: { label: "Budget", value: (t) => safe(t.budgetCost, t.miles) },
      b: { label: "Actual", value: (t) => safe(t.cost, t.miles) },
    },
    breakdown: {
      title: "Operating cost by category",
      fmt: "money",
      items: [
        { label: "Driver pay", value: (t) => t.c_driver },
        { label: "Fuel", value: (t) => t.c_fuel },
        { label: "Maintenance", value: (t) => t.c_maint },
        { label: "Tolls & fees", value: (t) => t.c_tolls },
      ],
    },
    statusKpi: "cpm",
    status: (t) => {
      const v = safe(t.cost, t.budgetCost);
      return v <= 1 ? "good" : v <= 1.05 ? "watch" : "risk";
    },
    action: ({ site, t, status }) => {
      const emptyMiles = t.miles - t.loaded;
      return status === "good"
        ? {
            headline: `${site} is under budget per mile`,
            detail: `Cost per mile is ${fmt(safe(t.cost, t.miles), "money2")} with ${fmt(1 - safe(t.loaded, t.miles), "pct")} empty miles and ${fmt(safe(t.ontimeLoads, t.loads), "pct")} on time.`,
            owner: "Terminal manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Book backhauls out of ${site}`,
            detail: `${site} ran ${fmt(emptyMiles, "num")} empty miles (${fmt(1 - safe(t.loaded, t.miles), "pct")}) — about ${fmt(emptyMiles * safe(t.cost, t.miles), "money")} in cost with no revenue. Cost per mile is ${fmt(safe(t.cost, t.miles), "money2")} against a $1.90 budget.`,
            owner: "Dispatch lead",
            due: "Next 2 weeks",
          };
    },
  },

  /* ---------------- REAL ESTATE ---------------- */
  "real-estate": {
    stock: ["expiring"],
    profile: (r, i, size) => ({
      units: size === "large" ? 80 + Math.round(r() * 220) : 6 + Math.round(r() * 20),
      rent: 1250 + r() * 900,
      occ: 0.94 + BIAS[i] * 0.04,
      maint: 0.09 - BIAS[i] * 0.045,
    }),
    gen: (r, i, m, size, p) => {
      const occupied = p.units * Math.min(0.995, p.occ * jitter(r, 0.012));
      const rentScheduled = occupied * p.rent * (1 + m * 0.002);
      const rentCollected = rentScheduled * (0.975 + BIAS[i] * 0.012) * jitter(r, 0.006);
      const opex = p.units * p.rent * 0.28 * jitter(r, 0.03);
      const maint = p.units * p.rent * p.maint * season(m, 0.25, 3.6) * jitter(r, 0.15);
      const out: Totals = {
        unitMonths: p.units,
        occupied,
        rentScheduled,
        rentCollected,
        opex,
        maint,
        noiBudget: p.units * p.rent * 0.955 * (1 + m * 0.002) - p.units * p.rent * 0.28 - p.units * p.rent * 0.07,
        expiring: Math.round(p.units * (0.06 + r() * 0.06)),
      };
      split(maint, weights(r, [30, 22, 26, 12, 10], p.maint > 0.1 ? 0 : 2, 1.7), MT, out);
      return out;
    },
    kpis: [
      { key: "occ", label: "Occupancy", fmt: "pct", better: "up", value: (t) => safe(t.occupied, t.unitMonths) },
      { key: "collect", label: "Rent collected", fmt: "pct", better: "up", value: (t) => safe(t.rentCollected, t.rentScheduled) },
      { key: "noi", label: "NOI vs. budget", fmt: "pctd", better: "up", value: (t) => safe(t.rentCollected - t.opex - t.maint, t.noiBudget) - 1, hint: "Net operating income" },
      { key: "expiring", label: "Leases expiring in 90 days", fmt: "num", better: "none", value: (t) => t.expiring },
    ],
    trend: {
      title: "Net operating income: budget vs. actual",
      fmt: "money",
      a: { label: "Budget", value: (t) => t.noiBudget },
      b: { label: "Actual", value: (t) => t.rentCollected - t.opex - t.maint },
    },
    breakdown: {
      title: "Maintenance spend by category",
      fmt: "money",
      items: [
        { label: "HVAC", value: (t) => t.m_hvac },
        { label: "Plumbing", value: (t) => t.m_plumb },
        { label: "Unit turnover", value: (t) => t.m_turn },
        { label: "Roof & exterior", value: (t) => t.m_roof },
        { label: "Other", value: (t) => t.m_other },
      ],
    },
    statusKpi: "noi",
    status: (t) => {
      const v = safe(t.rentCollected - t.opex - t.maint, t.noiBudget) - 1;
      return v >= -0.02 ? "good" : v >= -0.08 ? "watch" : "risk";
    },
    action: ({ site, t, status, top }) =>
      status === "good"
        ? {
            headline: `${site} is at or above budget`,
            detail: `Occupancy is ${fmt(safe(t.occupied, t.unitMonths), "pct")} and ${fmt(safe(t.rentCollected, t.rentScheduled), "pct")} of rent is collected. ${Math.round(t.expiring)} leases expire in the next 90 days — start renewals now.`,
            owner: "Property manager",
            due: "Next Insight Review",
          }
        : {
            headline: `Get ${site} back to budget`,
            detail: `Net operating income at ${site} is ${fmt(Math.abs(safe(t.rentCollected - t.opex - t.maint, t.noiBudget) - 1), "pct")} under budget. ${top.label} is the largest maintenance cost (${fmt(top.value, "money")}), and occupancy is ${fmt(safe(t.occupied, t.unitMonths), "pct")}.`,
            owner: "Asset manager",
            due: "Within 30 days",
          },
  },
};

/* ============================================================
   ENGINE
   ============================================================ */

type Rec = { site: string; siteIndex: number; month: number; v: Totals };

const cache = new Map<string, Rec[]>();

export function records(slug: IndustrySlug, size: Size): Rec[] {
  const key = `${slug}:${size}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const ind = industries.find((i) => i.slug === slug)!;
  const model = models[slug];
  const sites = ind.sites[size];
  const out: Rec[] = [];
  sites.forEach((site, i) => {
    const r = mulberry32(hash(`${key}:${site}`));
    const profile = model.profile(r, i, size);
    for (let m = 0; m < MONTHS; m++) out.push({ site, siteIndex: i, month: m, v: model.gen(r, i, m, size, profile) });
  });
  cache.set(key, out);
  return out;
}

function aggregate(rows: Rec[], stock: string[] = []): Totals {
  const t: Totals = {};
  if (!rows.length) return t;
  const last = Math.max(...rows.map((r) => r.month));
  for (const r of rows) {
    for (const [k, val] of Object.entries(r.v)) {
      if (stock.includes(k)) {
        if (r.month === last) t[k] = (t[k] || 0) + val;
      } else t[k] = (t[k] || 0) + val;
    }
  }
  return t;
}

export type Period = 3 | 6 | 12;

export type View = {
  sites: string[];
  kpis: { key: string; label: string; fmt: Fmt; better: Kpi["better"]; value: number; prior: number; hint?: string }[];
  trend: { title: string; fmt: Fmt; aLabel: string; bLabel: string; points: { label: string; a: number; b: number }[] };
  breakdown: { title: string; fmt: Fmt; items: { label: string; value: number }[] };
  table: { site: string; status: Status; values: { key: string; label: string; fmt: Fmt; value: number }[] }[];
  tableKpis: { key: string; label: string; fmt: Fmt }[];
  action: Action & { site: string; status: Status };
  rowCount: number;
};

export function buildView(slug: IndustrySlug, size: Size, site: string | null, period: Period): View {
  const model = models[slug];
  const all = records(slug, size);
  const sites = industries.find((i) => i.slug === slug)!.sites[size];
  const start = MONTHS - period;
  const inWindow = (r: Rec) => r.month >= start;
  const inPrior = (r: Rec) => r.month >= start - period && r.month < start;
  const scoped = site ? all.filter((r) => r.site === site) : all;

  const cur = scoped.filter(inWindow);
  const t = aggregate(cur, model.stock);
  const tp = aggregate(scoped.filter(inPrior), model.stock);

  const kpis = model.kpis.map((k) => ({
    key: k.key,
    label: k.label,
    fmt: k.fmt,
    better: k.better,
    hint: k.hint,
    value: k.value(t),
    prior: k.value(tp),
  }));

  /* trend: aggregate each month separately */
  let ca = 0;
  let cb = 0;
  const points = [];
  for (let m = start; m < MONTHS; m++) {
    const mt = aggregate(cur.filter((r) => r.month === m), model.stock);
    let a = model.trend.a.value(mt);
    let b = model.trend.b.value(mt);
    if (model.trend.cumulative) {
      ca += a;
      cb += b;
      a = ca;
      b = cb;
    }
    points.push({ label: monthLabel(m), a, b });
  }

  const breakdown = model.breakdown.items.map((it) => ({ label: it.label, value: it.value(t) }));

  /* table: every site in scope, always from the same window */
  const tableSites = site ? [site] : sites;
  const statusRank: Record<Status, number> = { risk: 0, watch: 1, good: 2 };
  const statusKpi = model.kpis.find((k) => k.key === model.statusKpi)!;
  const table = tableSites.map((s) => {
    const st = aggregate(all.filter((r) => r.site === s && inWindow(r)), model.stock);
    return {
      site: s,
      status: model.status(st),
      t: st,
      values: model.kpis.map((k) => ({ key: k.key, label: k.label, fmt: k.fmt, value: k.value(st) })),
    };
  });

  /* action: worst site in scope (by status, then by the status KPI) */
  const dir = statusKpi.better === "down" ? -1 : 1;
  const worst = [...table].sort(
    (x, y) => statusRank[x.status] - statusRank[y.status] || dir * (statusKpi.value(x.t) - statusKpi.value(y.t))
  )[0];
  const wItems = model.breakdown.items.map((it) => ({ label: it.label, value: it.value(worst.t) }));
  const wTotal = wItems.reduce((s, x) => s + x.value, 0);
  const top = wItems.reduce((a, b) => (b.value > a.value ? b : a));
  const action = model.action({ site: worst.site, t: worst.t, status: worst.status, top: { ...top, share: safe(top.value, wTotal) }, size });

  return {
    sites,
    kpis,
    trend: { title: model.trend.title, fmt: model.trend.fmt, aLabel: model.trend.a.label, bLabel: model.trend.b.label, points },
    breakdown: { title: model.breakdown.title, fmt: model.breakdown.fmt, items: breakdown },
    table: table.map(({ site, status, values }) => ({ site, status, values })),
    tableKpis: model.kpis.map((k) => ({ key: k.key, label: k.label, fmt: k.fmt })),
    action: { ...action, site: worst.site, status: worst.status },
    rowCount: cur.length,
  };
}
