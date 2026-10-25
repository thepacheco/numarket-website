"use client";

import { useEffect, useState } from "react";
import SolidIcon from "./solids/SolidIcon";
import type { SolidKind } from "./solids/geometry";
import FoundationDemo from "./FoundationDemo";
import { DefinitionsDemo } from "./FoundationExtras";
import StatusReport from "./StatusReport";
import IndustryExplorer from "./IndustryExplorer";
import IndustryEntry from "./IndustryEntry";
import { AskYourData } from "./WorkspaceDemo";
import SampleReview from "./SampleReview";
import EngineeringApps from "./EngineeringApps";
import { MigrationDemo } from "./NarratedDemos";
import { industries, type IndustrySlug } from "@/content/industries";

/* One product at a time, one view at a time. The product lines follow the
   hand-off doc: Foundation is your data, Workspace is what we build on it,
   Insight Review is your analyst, Engineering is apps built for you. */
const tabs: { id: SolidKind; name: string; tag: string; views: [string, string][] }[] = [
  {
    id: "foundation",
    name: "Foundation",
    tag: "Your data",
    views: [
      ["clean", "Clean it"],
      ["enter", "Enter data"],
      ["define", "What each number means"],
      ["move", "Move off an old system"],
    ],
  },
  {
    id: "workspace",
    name: "Workspace",
    tag: "Dashboards & reports",
    views: [
      ["dashboard", "Dashboard"],
      ["report", "Status report"],
      ["ask", "Ask Your Data"],
    ],
  },
  { id: "insight", name: "Insight Review", tag: "Your analyst", views: [] },
  { id: "engineering", name: "Engineering", tag: "Apps built for you", views: [] },
];

function View({ tab, view, slug }: { tab: SolidKind; view: string; slug: IndustrySlug }) {
  if (tab === "foundation") {
    if (view === "enter") return <IndustryEntry slug={slug} />;
    if (view === "define") return <DefinitionsDemo slug={slug} />;
    if (view === "move") return <MigrationDemo />;
    return <FoundationDemo slug={slug} />;
  }
  if (tab === "workspace") {
    if (view === "report") return <StatusReport slug={slug} />;
    if (view === "ask") return <AskYourData initial={slug} />;
    return <IndustryExplorer initialIndustry={slug} initialSize="large" lockIndustry />;
  }
  if (tab === "insight") return <SampleReview slug={slug} />;
  return <EngineeringApps slug={slug} />;
}

export default function DemosByProduct() {
  const [slug, setSlug] = useState<IndustrySlug>("construction");
  const [tab, setTab] = useState<SolidKind>("foundation");
  const [view, setView] = useState("clean");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const i = q.get("industry");
    const t = tabs.find((x) => x.id === q.get("product"));
    if (i && industries.some((x) => x.slug === i)) setSlug(i as IndustrySlug);
    if (t) {
      setTab(t.id);
      const v = q.get("view");
      setView(t.views.some(([id]) => id === v) ? v! : (t.views[0]?.[0] ?? ""));
    }
  }, []);
  /* keep the address clean until the visitor picks something */
  useEffect(() => {
    if (slug === "construction" && tab === "foundation" && view === "clean" && !window.location.search) return;
    const q = new URLSearchParams();
    q.set("product", tab);
    if (view) q.set("view", view);
    q.set("industry", slug);
    window.history.replaceState(null, "", `${window.location.pathname}?${q.toString()}`);
  }, [slug, tab, view]);
  const cur = tabs.find((t) => t.id === tab)!;
  const pick = (id: SolidKind) => {
    setTab(id);
    setView(tabs.find((t) => t.id === id)!.views[0]?.[0] ?? "");
  };
  return (
    <div className="dbp">
      <div className="dbp-tabs" role="tablist" aria-label="Product">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`dt-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="dbp-panel"
            className={`dbp-tab dbp-${t.id}`}
            onClick={() => pick(t.id)}
          >
            <SolidIcon kind={t.id} size={28} />
            <span>
              <b>{t.name}</b>
              <small>{t.tag}</small>
            </span>
          </button>
        ))}
      </div>
      <div id="dbp-panel" role="tabpanel" aria-labelledby={`dt-${tab}`} className="dbp-panel">
        <div className="dbp-head">
          {cur.views.length > 0 ? (
            <div className="dbp-views" role="group" aria-label={`${cur.name} views`}>
              {cur.views.map(([id, name]) => (
                <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)}>
                  {name}
                </button>
              ))}
            </div>
          ) : (
            <span />
          )}
          <label className="dbp-ind">
            <span>Industry</span>
            <select className="filter-select" value={slug} onChange={(e) => setSlug(e.target.value as IndustrySlug)}>
              {industries.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.short}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="dbp-body" key={`${tab}-${view}-${slug}`}>
          <View tab={tab} view={view} slug={slug} />
        </div>
      </div>
    </div>
  );
}
