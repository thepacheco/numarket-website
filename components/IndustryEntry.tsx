"use client";

import { useState } from "react";
import Icon from "./Icon";
import Toast from "./Toast";
import { industries, type IndustrySlug } from "@/content/industries";

type Field = { key: string; label: string; kind: "site" | "select" | "number" | "text"; options?: string[]; def: string; suffix?: string };
type Cfg = { title: string; who: string; fields: Field[]; line: (v: Record<string, string>) => string; seed: string[] };

const cfg: Record<IndustrySlug, Cfg> = {
  construction: {
    title: "Daily log",
    who: "Superintendent",
    fields: [
      { key: "site", label: "Job", kind: "site", def: "" },
      { key: "crew", label: "Crew on site", kind: "number", def: "12" },
      { key: "pct", label: "Progress today", kind: "number", def: "3", suffix: "%" },
      { key: "issue", label: "Anything blocking?", kind: "select", options: ["Nothing", "RFI needed", "Material delay", "Weather"], def: "Nothing" },
    ],
    line: (v) => `${v.site}: ${v.crew} on site, +${v.pct}% today${v.issue !== "Nothing" ? ` · ${v.issue}` : ""}`,
    seed: ["Route 9 Bridge: 18 on site, +2% today · RFI needed", "Terminal Expansion: 26 on site, +4% today"],
  },
  manufacturing: {
    title: "Log downtime",
    who: "Shift lead",
    fields: [
      { key: "site", label: "Line", kind: "site", def: "" },
      { key: "min", label: "Minutes down", kind: "number", def: "45" },
      { key: "cause", label: "Cause", kind: "select", options: ["Changeover", "Breakdown", "Material shortage", "Quality hold"], def: "Breakdown" },
    ],
    line: (v) => `${v.site}: ${v.min} min down · ${v.cause}`,
    seed: ["Plant A · Assembly: 70 min down · Breakdown", "Plant B · Paint: 25 min down · Changeover"],
  },
  "food-production": {
    title: "Production count",
    who: "Kitchen lead",
    fields: [
      { key: "site", label: "Kitchen", kind: "site", def: "" },
      { key: "made", label: "Meals produced", kind: "number", def: "420" },
      { key: "left", label: "Meals left over", kind: "number", def: "18" },
    ],
    line: (v) => `${v.site}: ${v.made} made, ${v.left} left over (${Math.round((Number(v.left) / Math.max(1, Number(v.made))) * 100)}%)`,
    seed: ["Airport Commissary: 1,240 made, 131 left over (11%)", "Central Kitchen: 980 made, 38 left over (4%)"],
  },
  healthcare: {
    title: "Shift coverage",
    who: "Charge nurse",
    fields: [
      { key: "site", label: "Clinic", kind: "site", def: "" },
      { key: "shift", label: "Shift", kind: "select", options: ["Day", "Evening", "Night"], def: "Day" },
      { key: "need", label: "Staff needed", kind: "number", def: "8" },
      { key: "have", label: "Staff present", kind: "number", def: "7" },
    ],
    line: (v) => `${v.site} · ${v.shift}: ${v.have} of ${v.need} staff${Number(v.have) < Number(v.need) ? " · short " + (Number(v.need) - Number(v.have)) : ""}`,
    seed: ["Northside Clinic · Day: 9 of 11 staff · short 2", "Midtown Clinic · Day: 8 of 8 staff"],
  },
  utilities: {
    title: "Outage report",
    who: "Crew lead",
    fields: [
      { key: "site", label: "District", kind: "site", def: "" },
      { key: "out", label: "Customers out", kind: "number", def: "340" },
      { key: "cause", label: "Cause", kind: "select", options: ["Weather", "Equipment failure", "Vegetation", "Third-party damage"], def: "Equipment failure" },
    ],
    line: (v) => `${v.site}: ${Number(v.out).toLocaleString()} customers out · ${v.cause}`,
    seed: ["South District: 1,120 customers out · Equipment failure", "East District: 85 customers out · Vegetation"],
  },
  "professional-services": {
    title: "Time entry",
    who: "Staff accountant",
    fields: [
      { key: "site", label: "Practice", kind: "site", def: "" },
      { key: "client", label: "Client", kind: "text", def: "Brightline Health" },
      { key: "hrs", label: "Hours", kind: "number", def: "3.5" },
      { key: "bill", label: "Billable?", kind: "select", options: ["Yes", "No"], def: "Yes" },
    ],
    line: (v) => `${v.site} · ${v.client}: ${v.hrs} hrs ${v.bill === "Yes" ? "billable" : "non-billable"}`,
    seed: ["Audit & Assurance · Cobalt Logistics: 6 hrs billable", "Tax · Evergreen Foods: 2.5 hrs billable"],
  },
  logistics: {
    title: "Load status",
    who: "Driver",
    fields: [
      { key: "site", label: "Terminal", kind: "site", def: "" },
      { key: "load", label: "Load #", kind: "text", def: "L-20931" },
      { key: "st", label: "Status", kind: "select", options: ["Picked up", "Delivered on time", "Delivered late", "Waiting at dock"], def: "Delivered on time" },
    ],
    line: (v) => `${v.load} (${v.site}): ${v.st}`,
    seed: ["L-20917 (Savannah): Waiting at dock", "L-20922 (Atlanta): Delivered on time"],
  },
  "real-estate": {
    title: "Maintenance ticket",
    who: "Property manager",
    fields: [
      { key: "site", label: "Property", kind: "site", def: "" },
      { key: "cat", label: "Category", kind: "select", options: ["HVAC", "Plumbing", "Unit turnover", "Roof & exterior"], def: "HVAC" },
      { key: "cost", label: "Estimated cost", kind: "number", def: "450", suffix: "$" },
    ],
    line: (v) => `${v.site}: ${v.cat} · est. $${Number(v.cost).toLocaleString()}`,
    seed: ["Midtown Office Tower: HVAC · est. $2,400", "Oak Hill Apartments: Plumbing · est. $380"],
  },
};

export default function IndustryEntry({ slug }: { slug: IndustrySlug }) {
  const ind = industries.find((i) => i.slug === slug)!;
  const c = cfg[slug];
  const sites = ind.sites.large;
  const [vals, setVals] = useState<Record<string, string>>(() => Object.fromEntries(c.fields.map((f) => [f.key, f.kind === "site" ? sites[0] : f.def])));
  const [feed, setFeed] = useState<{ text: string; when: string; fresh?: boolean }[]>(c.seed.map((t, i) => ({ text: t, when: `${(i + 1) * 12} min ago` })));
  const [toast, setToast] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeed((f) => [{ text: c.line(vals), when: "Just now", fresh: true }, ...f.map((x) => ({ ...x, fresh: false }))].slice(0, 5));
    setToast("Saved. Everyone sees it now.");
  };

  return (
    <div className="entry">
      <div className="phone">
        <form className="phone-screen" onSubmit={submit}>
          <span className="small muted" style={{ fontWeight: 600 }}>
            {c.who} · on their phone
          </span>
          <h3 className="h4">{c.title}</h3>
          {c.fields.map((f) => (
            <div className="field" key={f.key}>
              <label htmlFor={`e-${slug}-${f.key}`}>{f.label}</label>
              {f.kind === "site" || f.kind === "select" ? (
                <select id={`e-${slug}-${f.key}`} value={vals[f.key]} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}>
                  {(f.kind === "site" ? sites : f.options!).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={`e-${slug}-${f.key}`}
                  inputMode={f.kind === "number" ? "decimal" : "text"}
                  value={vals[f.key]}
                  onChange={(e) => setVals({ ...vals, [f.key]: f.kind === "number" ? e.target.value.replace(/[^0-9.]/g, "") : e.target.value })}
                />
              )}
            </div>
          ))}
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Save
          </button>
        </form>
      </div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 17 }}>What the manager sees — live</h3>
          <span className="label-sample">Sample</span>
        </div>
        <ul className="feed" aria-live="polite">
          {feed.map((f, i) => (
            <li key={`${f.text}-${i}-${f.when}`} className={f.fresh ? "new" : ""}>
              <Icon name={f.fresh ? "check" : "clock"} width={16} height={16} style={{ color: f.fresh ? "var(--good)" : "var(--text-3)", flex: "none" }} />
              <span>{f.text}</span>
              <span className="when">{f.when}</span>
            </li>
          ))}
        </ul>
        <p className="small muted" style={{ marginTop: 14 }}>
          No emailed spreadsheets. Entered once, checked as it&apos;s typed, and in the dashboard right away.
        </p>
      </div>
      <Toast text={toast} onDone={() => setToast(null)} />
    </div>
  );
}
