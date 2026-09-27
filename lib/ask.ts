/* ============================================================
   Ask Your Data — industry-specific questions for the demo.
   Every answer is calculated from the same sample records the
   dashboards use. Nothing here is typed in by hand.
   ============================================================ */

import { industries, type IndustrySlug } from "@/content/industries";
import { buildView, fmt, type Fmt, type View } from "@/lib/sample-data";

export type Bar = { label: string; value: number; text: string; risk?: boolean };
export type QA = { q: string; a: string; chart?: Bar[] };

export const sampleCompany: Record<IndustrySlug, string> = {
  construction: "Summit Builders",
  manufacturing: "Ridgeway Manufacturing",
  "food-production": "Harvest Table Foods",
  healthcare: "Magnolia Health Partners",
  utilities: "Piedmont Electric Co-op",
  "professional-services": "Crescent Advisory Group",
  logistics: "Southline Freight",
  "real-estate": "Oakmont Properties",
};

type Row = View["table"][number];
const val = (r: Row, key: string) => r.values.find((x) => x.key === key)!.value;
const sortBy = (rows: Row[], f: (r: Row) => number, desc = true) => [...rows].sort((a, b) => (desc ? f(b) - f(a) : f(a) - f(b)));
const bars = (rows: Row[], f: (r: Row) => number, format: Fmt, riskIf: (r: Row) => boolean): Bar[] =>
  rows.map((r) => ({ label: r.site, value: f(r), text: fmt(f(r), format), risk: riskIf(r) }));
const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
const pct = (v: number) => fmt(v, "pct");

const KEEP = ["Excel", "QuickBooks", "Procore"];
const plain = (src: string) => {
  const s = src.replace(/ \/ .*/, "");
  const first = s.split(" ")[0];
  return KEEP.includes(first) || first === first.toUpperCase() ? s : s[0].toLowerCase() + s.slice(1);
};
const possessive = (name: string) => (name.endsWith("s") ? `${name}'` : `${name}'s`);

export function introFor(slug: IndustrySlug) {
  const ind = industries.find((i) => i.slug === slug)!;
  const n = ind.sites.large.length;
  return `I'm connected to ${possessive(sampleCompany[slug])} ${list(ind.sources.map(plain))} — ${n} ${ind.siteNoun.many.replace("All ", "")}, last 12 months. Ask me anything below.`;
}

export function questionsFor(slug: IndustrySlug): QA[] {
  const v = buildView(slug, "large", null, 12);
  const rows = v.table;
  const t = v.totals;

  switch (slug) {
    case "construction": {
      const over = sortBy(rows.filter((r) => val(r, "over") > 0), (r) => val(r, "over"));
      const items = [...v.breakdown.items].sort((a, b) => b.value - a.value);
      const coTot = items.reduce((s, x) => s + x.value, 0);
      const rfis = sortBy(rows, (r) => r.t.rfis);
      return [
        {
          q: "Which jobs are over budget right now?",
          a: over.length
            ? `${over.length} of ${rows.length} jobs: ${list(over.map((r) => `${r.site} (${fmt(val(r, "over"), "money")} over)`))}. Together that's ${fmt(over.reduce((s, r) => s + val(r, "over"), 0), "money")} more than budgeted for the work done.`
            : "None — every job is at or under budget for the work done.",
          chart: bars(rows, (r) => val(r, "over"), "over", (r) => val(r, "over") > 0),
        },
        {
          q: "Where are change orders coming from?",
          a: `${items[0].label} — ${fmt(items[0].value, "money")}, or ${pct(items[0].value / coTot)} of all change orders. Next is ${items[1].label.toLowerCase()} at ${pct(items[1].value / coTot)}.`,
          chart: items.map((x, i) => ({ label: x.label, value: x.value, text: fmt(x.value, "money"), risk: i === 0 })),
        },
        {
          q: "Which jobs have the most open RFIs?",
          a: `${rfis[0].site} has ${Math.round(rfis[0].t.rfis)} open RFIs — the most of any job. Across all jobs there are ${Math.round(t.rfis)} open.`,
          chart: bars(rows, (r) => r.t.rfis, "num", (r) => r === rfis[0]),
        },
        {
          q: "Are we spending faster than we're building?",
          a: `${t.earned / t.actual >= 1 ? "Overall, no" : "Overall, yes"}: cost performance is ${fmt(t.earned / t.actual, "dec2")} (1.00 = on budget).${over[0] ? ` Watch ${over[0].site}, running at ${fmt(val(over[0], "cpi"), "dec2")}.` : ""}`,
          chart: bars(rows, (r) => val(r, "cpi"), "dec2", (r) => val(r, "cpi") < 0.98),
        },
      ];
    }

    case "manufacturing": {
      const dt = sortBy(rows, (r) => r.t.downtime);
      const items = [...v.breakdown.items].sort((a, b) => b.value - a.value);
      const rej = sortBy(rows, (r) => val(r, "reject"));
      const plan = sortBy(rows, (r) => val(r, "plan"), false);
      return [
        {
          q: "Which line loses the most time to downtime?",
          a: `${dt[0].site}: ${fmt(dt[0].t.downtime, "hrs")} down in 12 months — uptime ${pct(val(dt[0], "uptime"))} against a 92% target.`,
          chart: bars(rows, (r) => r.t.downtime, "hrs", (r) => r === dt[0]),
        },
        {
          q: "Why are the lines stopping?",
          a: `${items[0].label} cause the most downtime (${fmt(items[0].value, "hrs")}), then ${items[1].label.toLowerCase()} (${fmt(items[1].value, "hrs")}).`,
          chart: items.map((x, i) => ({ label: x.label, value: x.value, text: fmt(x.value, "hrs"), risk: i === 0 })),
        },
        {
          q: "Where are rejects coming from?",
          a: `${rej[0].site} has the highest reject rate at ${pct(val(rej[0], "reject"))}. The plant average is ${pct(t.rejects / t.units)}.`,
          chart: bars(rows, (r) => val(r, "reject"), "pct", (r) => r === rej[0]),
        },
        {
          q: "Are we on plan?",
          a: `Overall output is ${pct(t.units / t.plannedUnits)} of plan. Furthest behind: ${plan[0].site} at ${pct(val(plan[0], "plan"))}.`,
          chart: bars(rows, (r) => val(r, "plan"), "pct", (r) => r === plan[0]),
        },
      ];
    }

    case "food-production": {
      const tomorrow = industries
        .find((i) => i.slug === slug)!
        .sites.large.map((site) => {
          const sv = buildView(slug, "large", site, 3);
          const last = sv.trend.points[sv.trend.points.length - 1];
          return { site, perDay: last.b / 30 };
        });
      const over = sortBy(rows, (r) => val(r, "over"));
      const cpm = sortBy(rows, (r) => val(r, "cpm"));
      const acc = sortBy(rows, (r) => val(r, "acc"));
      return [
        {
          q: "How much should we produce tomorrow?",
          a: `Based on last month's real demand: ${list(tomorrow.map((x) => `${x.site} ~${Math.round(x.perDay).toLocaleString()}`))} meals a day.`,
          chart: tomorrow.map((x) => ({ label: x.site, value: x.perDay, text: `${Math.round(x.perDay).toLocaleString()}/day` })),
        },
        {
          q: "Where is food waste highest?",
          a: `${over[0].site} makes ${pct(val(over[0], "over"))} more meals than it serves — ${fmt(over[0].t.produced - over[0].t.served, "num")} extra meals in 12 months.`,
          chart: bars(rows, (r) => val(r, "over"), "pct", (r) => val(r, "over") > 0.08),
        },
        {
          q: "What's our true cost per meal?",
          a: `${fmt((t.food + t.labor) / t.served, "money2")} across all kitchens (food + labor ÷ meals served). Highest: ${cpm[0].site} at ${fmt(val(cpm[0], "cpm"), "money2")}.`,
          chart: bars(rows, (r) => val(r, "cpm"), "money2", (r) => r === cpm[0]),
        },
        {
          q: "Which kitchen forecasts demand best?",
          a: `${acc[0].site} — ${pct(val(acc[0], "acc"))} forecast accuracy. Least accurate: ${acc[acc.length - 1].site} at ${pct(val(acc[acc.length - 1], "acc"))}.`,
          chart: bars(rows, (r) => val(r, "acc"), "pct", (r) => r === acc[acc.length - 1]),
        },
      ];
    }

    case "healthcare": {
      const waits = industries
        .find((i) => i.slug === slug)!
        .sites.large.map((site) => {
          const k = buildView(slug, "large", site, 3).kpis.find((x) => x.key === "wait")!;
          return { site, now: k.value, before: k.prior };
        })
        .sort((a, b) => b.now - b.before - (a.now - a.before));
      const fill = sortBy(rows, (r) => val(r, "fill"), false);
      const items = [...v.breakdown.items].sort((a, b) => b.value - a.value);
      const denied = items.reduce((s, x) => s + x.value, 0);
      return [
        {
          q: "Where are wait times rising?",
          a:
            waits[0].now > waits[0].before
              ? `${waits[0].site}: average wait went from ${fmt(waits[0].before, "min")} to ${fmt(waits[0].now, "min")} over the last 3 months.`
              : "Wait times are flat or falling at every clinic over the last 3 months.",
          chart: waits.map((w) => ({ label: w.site, value: w.now, text: fmt(w.now, "min"), risk: w.now > 20 })),
        },
        {
          q: "Which clinics are short-staffed?",
          a: `${fill[0].site} filled ${pct(val(fill[0], "fill"))} of shifts — ${fmt(fill[0].t.shiftsNeeded - fill[0].t.shiftsFilled, "num")} shifts short in 12 months.`,
          chart: bars(rows, (r) => val(r, "fill"), "pct", (r) => val(r, "fill") < 0.95),
        },
        {
          q: "Where is revenue leaking?",
          a: `${fmt(denied, "money")} in denied claims. The biggest reason is ${items[0].label.toLowerCase()} (${pct(items[0].value / denied)}). Most denials like these can be caught with checks before the claim goes out.`,
          chart: items.map((x, i) => ({ label: x.label, value: x.value, text: fmt(x.value, "money"), risk: i === 0 })),
        },
        {
          q: "How many patients did we see?",
          a: `${fmt(t.visits, "num")} visits in 12 months — ${pct(t.visits / t.targetVisits)} of target.`,
          chart: bars(rows, (r) => r.t.visits, "num", () => false),
        },
      ];
    }

    case "utilities": {
      const saidi = sortBy(rows, (r) => val(r, "saidi"));
      const items = [...v.breakdown.items].sort((a, b) => b.value - a.value);
      const tot = items.reduce((s, x) => s + x.value, 0);
      const crew = sortBy(rows, (r) => val(r, "crew"), false);
      return [
        {
          q: "Which district has the worst reliability?",
          a: `${saidi[0].site}: customers averaged ${fmt(val(saidi[0], "saidi"), "dec1")} outage minutes in 12 months, ${fmt(val(saidi[0], "vs"), "pctd")} vs. target.`,
          chart: bars(rows, (r) => val(r, "saidi"), "dec1", (r) => val(r, "vs") > 0.1),
        },
        {
          q: "What's causing the most outage minutes?",
          a: `${items[0].label} — ${pct(items[0].value / tot)} of all outage minutes. Then ${items[1].label.toLowerCase()} at ${pct(items[1].value / tot)}.`,
          chart: items.map((x, i) => ({ label: x.label, value: x.value, text: fmt(x.value, "dec1") + " min", risk: i === 0 })),
        },
        {
          q: "Are crews being used well?",
          a: `Overall crew utilization is ${pct(t.crewWorked / t.crewAvail)}. Lowest: ${crew[0].site} at ${pct(val(crew[0], "crew"))} — ${fmt(crew[0].t.crewAvail - crew[0].t.crewWorked, "hrs")} of paid crew time unused.`,
          chart: bars(rows, (r) => val(r, "crew"), "pct", (r) => r === crew[0]),
        },
        {
          q: "Are we beating our reliability target?",
          a: `${t.cmi <= t.targetCmi ? "Yes" : "Not overall"}: ${fmt(t.cmi / t.customers, "dec1")} outage minutes per customer, ${fmt(t.cmi / t.targetCmi - 1, "pctd")} vs. target. ${rows.filter((r) => val(r, "vs") <= 0).length} of ${rows.length} districts are on target.`,
          chart: bars(rows, (r) => val(r, "vs"), "pctd", (r) => val(r, "vs") > 0),
        },
      ];
    }

    case "professional-services": {
      const rev = sortBy(rows, (r) => r.t.billed);
      const ub = sortBy(rows, (r) => r.t.unbilledValue);
      const items = [...v.breakdown.items].sort((a, b) => b.value - a.value);
      const col = sortBy(rows, (r) => val(r, "collect"), false);
      const util = sortBy(rows, (r) => val(r, "util"));
      return [
        {
          q: "Which practices bring in the most?",
          a: `${rev[0].site}: ${fmt(rev[0].t.billed, "money")} billed in 12 months. Firm total: ${fmt(t.billed, "money")}.`,
          chart: bars(rows, (r) => r.t.billed, "money", () => false),
        },
        {
          q: "Where are hours going unbilled?",
          a: `${ub[0].site} worked ${fmt(ub[0].t.unbilled, "hrs")} it never billed (~${fmt(ub[0].t.unbilledValue, "money")}). Top reason firm-wide: ${items[0].label.toLowerCase()}.`,
          chart: bars(rows, (r) => r.t.unbilledValue, "money", (r) => r === ub[0]),
        },
        {
          q: "Are we collecting what we bill?",
          a: `${pct(t.collected / t.billed)} overall — ${fmt(t.billed - t.collected, "money")} billed but not yet collected. Lowest: ${col[0].site} at ${pct(val(col[0], "collect"))}.`,
          chart: bars(rows, (r) => val(r, "collect"), "pct", (r) => r === col[0]),
        },
        {
          q: "Who's busiest?",
          a: `${util[0].site} is at ${pct(val(util[0], "util"))} billable utilization; ${util[util.length - 1].site} has the most room at ${pct(val(util[util.length - 1], "util"))}.`,
          chart: bars(rows, (r) => val(r, "util"), "pct", (r) => val(r, "util") < 0.63),
        },
      ];
    }

    case "logistics": {
      const cpm = sortBy(rows, (r) => val(r, "cpm"));
      const empty = sortBy(rows, (r) => val(r, "empty"));
      const ot = sortBy(rows, (r) => val(r, "ontime"), false);
      const det = sortBy(rows, (r) => r.t.detention);
      const emptyCost = (r: Row) => (r.t.miles - r.t.loaded) * (r.t.cost / r.t.miles);
      return [
        {
          q: "What's our real cost per mile?",
          a: `${fmt(t.cost / t.miles, "money2")} across the fleet, against a $1.90 budget. Highest: ${cpm[0].site} at ${fmt(val(cpm[0], "cpm"), "money2")}.`,
          chart: bars(rows, (r) => val(r, "cpm"), "money2", (r) => val(r, "cpm") > 1.9),
        },
        {
          q: "Where are we running empty?",
          a: `${empty[0].site}: ${pct(val(empty[0], "empty"))} of miles with an empty trailer — about ${fmt(emptyCost(empty[0]), "money")} of cost in 12 months with no revenue.`,
          chart: bars(rows, emptyCost, "money", (r) => r === empty[0]),
        },
        {
          q: "Which terminals miss delivery windows?",
          a: `${ot[0].site} delivers on time ${pct(val(ot[0], "ontime"))} of the time — the lowest. Fleet: ${pct(t.ontimeLoads / t.loads)}.`,
          chart: bars(rows, (r) => val(r, "ontime"), "pct", (r) => r === ot[0]),
        },
        {
          q: "Where are trucks stuck waiting?",
          a: `${det[0].site}: ${fmt(det[0].t.detention, "hrs")} of detention (waiting at docks) in 12 months.`,
          chart: bars(rows, (r) => r.t.detention, "hrs", (r) => r === det[0]),
        },
      ];
    }

    case "real-estate": {
      const noi = sortBy(rows, (r) => val(r, "noi"), false);
      const exp = sortBy(rows, (r) => r.t.expiring);
      const items = [...v.breakdown.items].sort((a, b) => b.value - a.value);
      const col = sortBy(rows, (r) => val(r, "collect"), false);
      return [
        {
          q: "Which properties underperform?",
          a: `${noi[0].site}: net operating income ${fmt(val(noi[0], "noi"), "pctd")} vs. budget. ${rows.filter((r) => val(r, "noi") < -0.02).length} of ${rows.length} properties are below budget.`,
          chart: bars(rows, (r) => val(r, "noi"), "pctd", (r) => val(r, "noi") < -0.02),
        },
        {
          q: "Which leases expire soon?",
          a: `${fmt(t.expiring, "num")} leases expire in the next 90 days — the most at ${exp[0].site} (${fmt(exp[0].t.expiring, "num")}).`,
          chart: bars(rows, (r) => r.t.expiring, "num", (r) => r === exp[0]),
        },
        {
          q: "What's eating the maintenance budget?",
          a: `${items[0].label}: ${fmt(items[0].value, "money")} in 12 months. Total maintenance: ${fmt(t.maint, "money")}.`,
          chart: items.map((x, i) => ({ label: x.label, value: x.value, text: fmt(x.value, "money"), risk: i === 0 })),
        },
        {
          q: "Are tenants paying on time?",
          a: `${pct(t.rentCollected / t.rentScheduled)} of scheduled rent collected. Lowest: ${col[0].site} at ${pct(val(col[0], "collect"))}.`,
          chart: bars(rows, (r) => val(r, "collect"), "pct", (r) => r === col[0]),
        },
      ];
    }
  }
}
