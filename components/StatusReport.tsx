"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";
import { buildView, fmt } from "@/lib/sample-data";
import { sampleCompany } from "@/lib/ask";
import { industries, type IndustrySlug } from "@/content/industries";

/* The weekly status report Workspace builds and sends on its own — in the
   client's branding, or rebuilt for one of the client's own customers. */

const customer: Record<IndustrySlug, string> = {
  construction: "Fulton County Schools",
  manufacturing: "Brightline Appliances",
  "food-production": "Peachtree Conference Center",
  healthcare: "Northside Referral Network",
  utilities: "Lakeview Industrial Park",
  "professional-services": "Halvorsen Group",
  logistics: "Coastal Home Goods",
  "real-estate": "Marlow Family Trust",
};

const statusText = { good: "On track", watch: "Watch", risk: "At risk" } as const;

export default function StatusReport({ slug = "construction" }: { slug?: IndustrySlug }) {
  const [brand, setBrand] = useState<"yours" | "customer">("yours");
  const ind = industries.find((i) => i.slug === slug)!;
  const v = useMemo(() => buildView(slug, "large", null, 3), [slug]);
  const own = sampleCompany[slug];
  const isCust = brand === "customer";
  const rows = isCust ? v.table.slice(0, 1) : v.table.slice(0, 5);
  const kpis = isCust ? rows[0].values.slice(0, 3) : v.kpis.slice(0, 3).map((k) => ({ key: k.key, label: k.label, fmt: k.fmt, value: k.value }));
  const top = isCust ? null : v.action;
  return (
    <div className="srep">
      <div className="srep-ctl">
        <div className="seg" role="group" aria-label="Report branding">
          <button type="button" aria-pressed={!isCust} onClick={() => setBrand("yours")}>
            Your branding
          </button>
          <button type="button" aria-pressed={isCust} onClick={() => setBrand("customer")}>
            Your customer&apos;s
          </button>
        </div>
        <span className="small muted">
          <Icon name="clock" width={14} height={14} style={{ verticalAlign: "-2px", marginRight: 4 }} />
          Sent every Monday at 7:00 AM to {isCust ? "3 people at " + customer[slug] : "6 people on your team"}
        </span>
      </div>
      <article className={`srep-doc ${isCust ? "cust" : ""}`} key={brand} aria-label="Sample weekly status report">
        <header className="srep-head">
          <span className="srep-logo" aria-hidden="true">
            {(isCust ? customer[slug] : own)
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
          <div>
            <b>{isCust ? customer[slug] : own}</b>
            <span>
              Weekly status report · week of Sep 28{isCust ? ` · ${rows[0].site}` : ""}
            </span>
          </div>
        </header>
        <div className="srep-kpis">
          {kpis.map((k) => (
            <div key={k.key}>
              <span>{k.label}</span>
              <b className="tnum">{fmt(k.value, k.fmt)}</b>
            </div>
          ))}
        </div>
        <table className="srep-table">
          <thead>
            <tr>
              <th scope="col">{ind.siteNoun.one}</th>
              <th scope="col">{v.tableKpis[1]?.label ?? v.tableKpis[0].label}</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const c = r.values[1] ?? r.values[0];
              return (
                <tr key={r.site}>
                  <td>{r.site}</td>
                  <td className="tnum">{fmt(c.value, c.fmt)}</td>
                  <td>
                    <span className={`srep-st ${r.status}`}>{statusText[r.status]}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {top && (
          <p className="srep-top">
            <b>Top item this week:</b> {top.headline}
          </p>
        )}
        <footer className="srep-foot">
          {isCust ? `Prepared for ${customer[slug]} by ${own}` : "Built automatically from your clean data"} · Updated Monday 6:00 AM
        </footer>
      </article>
      <p className="small muted">
        Already send a PDF report? Its layout and numbers become the spec, and Workspace rebuilds it from your clean data. Sample data.
      </p>
    </div>
  );
}
