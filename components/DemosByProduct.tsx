"use client";

import { useEffect, useState } from "react";
import IndGlyph from "./IndGlyph";
import SolidIcon from "./solids/SolidIcon";
import type { SolidKind } from "./solids/geometry";
import FoundationDemo from "./FoundationDemo";
import IndustryExplorer from "./IndustryExplorer";
import IndustryEntry from "./IndustryEntry";
import WorkspaceDemo from "./WorkspaceDemo";
import SampleReview from "./SampleReview";
import CrewScheduler from "./CrewScheduler";
import { MigrationDemo } from "./NarratedDemos";
import { industries, type IndustrySlug } from "@/content/industries";

const tabs: { id: SolidKind; name: string; line: string }[] = [
  { id: "foundation", name: "Foundation", line: "Messy sources in, one clean table out." },
  { id: "workspace", name: "Workspace", line: "The dashboard, an input screen, and Ask Your Data." },
  { id: "insight", name: "Insight Review", line: "What your analyst hands you, with action items to check off." },
  { id: "engineering", name: "Engineering", line: "A custom app built for one company, and a migration." },
];

/* Demos organized by product, filtered by industry. */
export default function DemosByProduct() {
  const [slug, setSlug] = useState<IndustrySlug>("construction");
  const [tab, setTab] = useState<SolidKind>("foundation");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const i = q.get("industry");
    const t = q.get("product");
    if (i && industries.some((x) => x.slug === i)) setSlug(i as IndustrySlug);
    if (t && tabs.some((x) => x.id === t)) setTab(t as SolidKind);
  }, []);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    q.set("industry", slug);
    q.set("product", tab);
    window.history.replaceState(null, "", `${window.location.pathname}?${q.toString()}`);
  }, [slug, tab]);
  const cur = tabs.find((t) => t.id === tab)!;
  return (
    <div className="dbp">
      <div className="dbp-filter">
        <span className="dbp-l">Industry</span>
        <div className="calc-inds" role="tablist" aria-label="Industry">
          {industries.map((i) => (
            <button key={i.slug} type="button" role="tab" aria-selected={slug === i.slug} className={`ind-chip ind-${i.slug}`} onClick={() => setSlug(i.slug)}>
              <IndGlyph /> {i.short}
            </button>
          ))}
        </div>
      </div>
      <div className="dbp-tabs" role="tablist" aria-label="Product">
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" id={`dt-${t.id}`} aria-selected={tab === t.id} aria-controls="dbp-panel" className="dbp-tab" onClick={() => setTab(t.id)}>
            <SolidIcon kind={t.id} size={26} />
            <span>{t.name}</span>
          </button>
        ))}
      </div>
      <div id="dbp-panel" role="tabpanel" aria-labelledby={`dt-${tab}`} className="dbp-panel" key={`${tab}-${slug}`}>
        <p className="dbp-line">
          {cur.line} <span className="label-sample">Sample data</span>
        </p>
        {tab === "foundation" && <FoundationDemo slug={slug} />}
        {tab === "workspace" && (
          <div className="dbp-stack">
            <h3 className="dbp-h">The dashboard</h3>
            <IndustryExplorer initialIndustry={slug} initialSize="large" lockIndustry />
            <h3 className="dbp-h">An input screen</h3>
            <IndustryEntry slug={slug} />
            <h3 className="dbp-h">Change a number, or ask a question</h3>
            <WorkspaceDemo askIndustry={slug} />
          </div>
        )}
        {tab === "insight" && <SampleReview slug={slug} />}
        {tab === "engineering" && (
          <div className="dbp-stack">
            <h3 className="dbp-h">A custom app: the scheduler</h3>
            <CrewScheduler slug={slug} />
            <h3 className="dbp-h">A migration, tracked table by table</h3>
            <MigrationDemo />
          </div>
        )}
      </div>
    </div>
  );
}
