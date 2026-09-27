/* ============================================================
   "Where the money is" — one plain-language money leak per
   industry, calculated from 12 months of sample records.
   Illustrative math only: the visitor chooses how much of the
   leak they'd fix, and any assumption is shown and editable.
   ============================================================ */

import type { IndustrySlug } from "@/content/industries";
import { buildView, type Fmt, type Size } from "@/lib/sample-data";

export type Leak = {
  title: string; // what's leaking, in plain words
  short: string; // two or three words for small labels
  why: string; // one-sentence explanation a non-expert gets
  fix: string; // what numarket changes
  qty: number | null; // how much of it (null = the leak is already in dollars)
  qtyLabel: string;
  qtyFmt: Fmt;
  unit: number; // dollars per unit of qty
  unitLabel: string;
  assumption?: { label: string; min: number; max: number; step: number; value: number };
  worst: string; // where it's worst
};

export const firstYearCost = (size: Size) => (size === "small" ? 7500 + 2500 * 12 : 40000 + 10000 * 12);
export const planFor = (size: Size) => (size === "small" ? "Insight" : "Command");

/* `assume` overrides the editable assumption (if the industry has one). */
export function leakFor(slug: IndustrySlug, size: Size, assume?: number): Leak {
  const v = buildView(slug, size, null, 12);
  const t = v.totals;
  const rows = v.table;
  const top = <T,>(arr: T[], f: (x: T) => number) => [...arr].sort((a, b) => f(b) - f(a))[0];

  switch (slug) {
    case "construction": {
      const over = rows.map((r) => ({ site: r.site, over: Math.max(0, r.t.actual - r.t.earned) }));
      const total = over.reduce((s, x) => s + x.over, 0);
      return {
        title: "Money spent past budget", short: "Budget overruns",
        why: "On jobs that ran over, costs went past the budget for the work actually done — and nobody saw it until month-end.",
        fix: "A live budget-vs-actual view per job, with an alert the week a job starts to slip.",
        qty: null,
        qtyLabel: "Over budget on jobs that ran over",
        qtyFmt: "money",
        unit: total,
        unitLabel: "",
        worst: top(over, (x) => x.over).site,
      };
    }
    case "manufacturing": {
      const margin = assume ?? 3.5;
      const perHour = t.units / (t.scheduled - t.downtime);
      return {
        title: "Production lost to downtime", short: "Downtime",
        why: "Every hour a line is stopped is product you didn't make — and profit you didn't earn.",
        fix: "Downtime logged in one screen with its cause, so the biggest causes get fixed first.",
        qty: t.downtime,
        qtyLabel: "Hours lines were stopped",
        qtyFmt: "hrs",
        unit: perHour * margin,
        unitLabel: "Profit lost per stopped hour",
        assumption: { label: "Your profit per unit", min: 0.5, max: 25, step: 0.5, value: margin },
        worst: top(rows, (r) => r.t.downtime).site,
      };
    }
    case "food-production": {
      const extra = t.produced - t.served;
      return {
        title: "Meals made that nobody ate", short: "Overproduction",
        why: "Kitchens cook to a guess. The extra meals cost food money and end up as waste.",
        fix: "A production number for tomorrow based on real demand, per kitchen.",
        qty: extra,
        qtyLabel: "Extra meals produced",
        qtyFmt: "num",
        unit: t.food / t.produced,
        unitLabel: "Food cost per meal",
        worst: top(rows, (r) => r.t.produced - r.t.served).site,
      };
    }
    case "healthcare": {
      const denied = v.breakdown.items.reduce((s, x) => s + x.value, 0);
      return {
        title: "Claims insurers denied", short: "Denied claims",
        why: "Coding errors, missing authorizations, and eligibility problems mean money you earned but didn't get paid.",
        fix: "Denials tracked by reason and clinic, with checks that catch the common ones before claims go out.",
        qty: null,
        qtyLabel: "Denied claims",
        qtyFmt: "money",
        unit: denied,
        unitLabel: "",
        worst: top(rows, (r) => r.t.billed - r.t.collected).site,
      };
    }
    case "utilities": {
      const rate = assume ?? 85;
      return {
        title: "Paid crew time with no work scheduled", short: "Idle crew hours",
        why: "Crews are paid for the whole shift. Hours without a work order are cost with nothing to show for it.",
        fix: "Crew schedules next to the work-order backlog, so idle time gets filled with planned maintenance.",
        qty: t.crewAvail - t.crewWorked,
        qtyLabel: "Idle crew hours",
        qtyFmt: "hrs",
        unit: rate,
        unitLabel: "Cost per crew hour",
        assumption: { label: "Your loaded cost per crew hour", min: 40, max: 200, step: 5, value: rate },
        worst: top(rows, (r) => r.t.crewAvail - r.t.crewWorked).site,
      };
    }
    case "professional-services":
      return {
        title: "Hours worked but never billed", short: "Unbilled hours",
        why: "Time that isn't entered, gets written down, or runs past a fixed fee is work you did for free.",
        fix: "Weekly unbilled-time view by practice and reason, before month-end close.",
        qty: t.unbilled,
        qtyLabel: "Unbilled hours",
        qtyFmt: "hrs",
        unit: t.unbilledValue / t.unbilled,
        unitLabel: "Average billing rate",
        worst: top(rows, (r) => r.t.unbilledValue).site,
      };
    case "logistics":
      return {
        title: "Miles driven with an empty trailer", short: "Empty miles",
        why: "An empty truck costs the same per mile — fuel, driver, wear — but earns nothing.",
        fix: "Empty miles by terminal and lane, so dispatch can book loads for the trip back.",
        qty: t.miles - t.loaded,
        qtyLabel: "Empty miles",
        qtyFmt: "num",
        unit: t.cost / t.miles,
        unitLabel: "Cost per mile",
        worst: top(rows, (r) => (r.t.miles - r.t.loaded) / r.t.miles).site,
      };
    case "real-estate":
      return {
        title: "Months units sat empty", short: "Vacant units",
        why: "Every month a unit is vacant is a month of rent you don't collect.",
        fix: "Vacancies and upcoming lease expirations in one view, so renewals start early.",
        qty: t.unitMonths - t.occupied,
        qtyLabel: "Vacant unit-months",
        qtyFmt: "num",
        unit: t.rentScheduled / t.occupied,
        unitLabel: "Average monthly rent",
        worst: top(rows, (r) => r.t.unitMonths - r.t.occupied).site,
      };
  }
}

export const leakTotal = (l: Leak) => (l.qty === null ? l.unit : l.qty * l.unit);
