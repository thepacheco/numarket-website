"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";
import { industries, type IndustrySlug } from "@/content/industries";
import { buildView, fmt } from "@/lib/sample-data";

/* A mini Insight Review: what changed, then the action item — from the same sample data. */
export default function InsightDemo() {
  const [slug, setSlug] = useState<IndustrySlug>("healthcare");
  const [run, setRun] = useState(false);
  const v = useMemo(() => buildView(slug, "large", null, 3), [slug]);
  const changes = v.kpis
    .filter((k) => k.better !== "none")
    .map((k) => {
      const d = k.value - k.prior;
      const good = (k.better === "up") === d > 0;
      return { ...k, d, good };
    })
    .slice(0, 3);
  return (
    <div className="demo-card">
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 18 }}>
        <label htmlFor="ir-ind" className="small" style={{ fontWeight: 600 }}>
          Review for:
        </label>
        <select
          id="ir-ind"
          className="filter-select"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value as IndustrySlug);
            setRun(false);
          }}
        >
          {industries.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
        <span className="label-sample">Sample data · last 3 months</span>
      </div>
      <h4 style={{ marginBottom: 10 }}>What changed</h4>
      <div className="grid g3" style={{ gap: 10 }}>
        {changes.map((c) => (
          <div className="kpi" key={c.key}>
            <div className="kpi-l">{c.label}</div>
            <div className="kpi-v tnum">{fmt(c.value, c.fmt)}</div>
            <div className={`kpi-d ${c.good ? "up" : "down"}`}>
              {c.d >= 0 ? "▲" : "▼"} from {fmt(c.prior, c.fmt)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18 }} aria-live="polite">
        {run ? (
          <div className={`action ${v.action.status}`} style={{ animation: "popIn .45s" }}>
            <div className="action-ic">
              <Icon name={v.action.status === "good" ? "check" : "alert"} />
            </div>
            <div>
              <div className="action-k">Action item</div>
              <div className="action-h">{v.action.headline}</div>
              <p>{v.action.detail}</p>
              <div className="action-meta">
                <span>
                  <b>Owner:</b> {v.action.owner}
                </span>
                <span>
                  <b>Due:</b> {v.action.due}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => setRun(true)}>
            Run the review <Icon name="play" width={15} height={15} />
          </button>
        )}
      </div>
    </div>
  );
}
