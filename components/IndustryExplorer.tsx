"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { BarChart, LineChart } from "./Charts";
import { Dots } from "./ui";
import { industries, type IndustrySlug } from "@/content/industries";
import { effort } from "@/content/effort";
import { buildView, fmt, type Period, type Size } from "@/lib/sample-data";
import { sampleCompany } from "@/lib/ask";
import IndGlyph from "./IndGlyph";

const statusText = { good: "On track", watch: "Watch", risk: "At risk" } as const;

export default function IndustryExplorer({
  initialIndustry = "construction",
  initialSize = "small",
  lockIndustry = false,
  syncUrl = false,
}: {
  initialIndustry?: IndustrySlug;
  initialSize?: Size;
  lockIndustry?: boolean;
  syncUrl?: boolean;
}) {
  const [slug, setSlug] = useState<IndustrySlug>(initialIndustry);
  const [size, setSize] = useState<Size>(initialSize);
  const [site, setSite] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>(12);
  const [tab, setTab] = useState<"overview" | "sites">("overview");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* read ?industry=&size= on first load */
  useEffect(() => {
    if (!syncUrl) return;
    const q = new URLSearchParams(window.location.search);
    const i = q.get("industry");
    const s = q.get("size");
    if (i && industries.some((x) => x.slug === i)) setSlug(i as IndustrySlug);
    if (s === "small" || s === "large") setSize(s);
  }, [syncUrl]);

  useEffect(() => {
    if (!syncUrl) return;
    const url = new URL(window.location.href);
    url.searchParams.set("industry", slug);
    url.searchParams.set("size", size);
    window.history.replaceState(null, "", url.toString());
  }, [slug, size, syncUrl]);

  /* a filter value from another industry/size makes no sense — reset it */
  useEffect(() => setSite(null), [slug, size]);

  const ind = industries.find((i) => i.slug === slug)!;
  const view = useMemo(() => buildView(slug, size, site, period), [slug, size, site, period]);
  const eff = effort.find((e) => e.id === (size === "small" ? "small" : "large"))!;

  const onTabKey = (e: React.KeyboardEvent, idx: number) => {
    let next = idx;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % industries.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + industries.length) % industries.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = industries.length - 1;
    else return;
    e.preventDefault();
    setSlug(industries[next].slug);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="explorer">
      <div className="explorer-controls">
        {!lockIndustry && (
          <div className="ind-tabs" role="tablist" aria-label="Pick your business">
            {industries.map((i, idx) => (
              <button
                key={i.slug}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                role="tab"
                id={`tab-${i.slug}`}
                aria-selected={slug === i.slug}
                aria-controls="explorer-panel"
                tabIndex={slug === i.slug ? 0 : -1}
                className={`ind-tab ind-${i.slug}`}
                onClick={() => setSlug(i.slug)}
                onKeyDown={(e) => onTabKey(e, idx)}
              >
                <IndGlyph size={18} />
                <span>{i.short}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div id="explorer-panel" role={lockIndustry ? undefined : "tabpanel"} aria-labelledby={lockIndustry ? undefined : `tab-${slug}`} className="stage">
        {/* LEFT: messy sources → one database */}
        <aside className="flow" key={`flow-${slug}-${size}`}>
          <p className="flow-h">Where the data lives today</p>
          <ul className="sources">
            {ind.sources.map((s, i) => (
              <li key={s} style={{ ["--i" as string]: i }}>
                <Icon name="spreadsheet" />
                {s}
              </li>
            ))}
          </ul>
          <div className="flow-arrow" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="flow-core">
            <Icon name="lock" />
            <div>
              <strong>One private database</strong>
              <span>Collected · cleaned · secured</span>
            </div>
          </div>
          <p className="flow-h" style={{ marginTop: 22 }}>
            Questions you&apos;ll be able to answer
          </p>
          <ul className="questions">
            {ind.questions.map((q) => (
              <li key={q}>“{q}”</li>
            ))}
          </ul>
        </aside>

        {/* RIGHT: the Workspace app */}
        <div className="app" key={`app-${slug}-${size}`}>
          <div className="app-bar">
            <span className="lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="app-name">
              {sampleCompany[slug]} · <span>Workspace</span>
            </span>
            <span className="app-tabs" role="tablist" aria-label="Dashboard view">
              <button type="button" role="tab" aria-selected={tab === "overview"} onClick={() => setTab("overview")}>
                Overview
              </button>
              <button type="button" role="tab" aria-selected={tab === "sites"} onClick={() => setTab("sites")}>
                By {ind.siteNoun.one.toLowerCase()}
              </button>
            </span>
            <span className="label-sample">Sample data</span>
          </div>

          <div className="app-body">
            <div className="filters">
              <label className="sr-only" htmlFor={`site-${slug}`}>
                {ind.siteNoun.one}
              </label>
              <select id={`site-${slug}`} value={site ?? ""} onChange={(e) => setSite(e.target.value || null)} className="filter-select">
                <option value="">{ind.siteNoun.many}</option>
                {view.sites.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="seg small-seg" role="group" aria-label="Time period">
                {([3, 6, 12] as Period[]).map((p) => (
                  <button key={p} type="button" aria-pressed={period === p} onClick={() => setPeriod(p)}>
                    {p === 12 ? "12 mo" : `${p} mo`}
                  </button>
                ))}
              </div>
              <div className="seg small-seg" role="group" aria-label="Company size">
                <button type="button" aria-pressed={size === "small"} onClick={() => setSize("small")}>
                  Small
                </button>
                <button type="button" aria-pressed={size === "large"} onClick={() => setSize("large")}>
                  Large
                </button>
              </div>
              <span className="rows tnum">{view.rowCount} monthly records</span>
            </div>

            {tab === "overview" ? (
            <>
            <div className="kpis">
              {view.kpis.map((k) => {
                const d = k.value - k.prior;
                const good = k.better === "none" || Math.abs(d) < 1e-9 ? null : (k.better === "up") === d > 0;
                const pctChange = k.prior !== 0 && ["money", "num", "hrs"].includes(k.fmt) ? d / Math.abs(k.prior) : null;
                return (
                  <div className="kpi" key={k.key} title={k.hint}>
                    <div className="kpi-l">{k.label}</div>
                    <div className="kpi-v tnum">{fmt(k.value, k.fmt)}</div>
                    <div className={`kpi-d ${good === null ? "" : good ? "up" : "down"}`}>
                      {pctChange !== null
                        ? `${pctChange >= 0 ? "▲" : "▼"} ${fmt(Math.abs(pctChange), "pct")}`
                        : `${d >= 0 ? "▲" : "▼"} from ${fmt(k.prior, k.fmt)}`}{" "}
                      <span>vs. prior {period} mo</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="charts">
              <LineChart height={150} points={view.trend.points} aLabel={view.trend.aLabel} bLabel={view.trend.bLabel} format={view.trend.fmt} title={view.trend.title} />
              <BarChart items={view.breakdown.items} format={view.breakdown.fmt} title={view.breakdown.title} />
            </div>

            <div className={`action compact ${view.action.status}`}>
              <div className="action-ic">
                <Icon name={view.action.status === "good" ? "check" : "alert"} />
              </div>
              <div>
                <div className="action-h">
                  <span className="action-k">{view.action.status === "good" ? "Note" : "Action item"} · </span>
                  {view.action.headline}
                </div>
                <p>{view.action.detail}</p>
                <div className="action-meta">
                  <span>
                    <b>Owner:</b> {view.action.owner}
                  </span>
                  <span>
                    <b>Due:</b> {view.action.due}
                  </span>
                </div>
              </div>
            </div>
            </>
            ) : (
            <div className="site-table">
              <table>
                <caption className="sr-only">
                  {ind.siteNoun.one} summary for the last {period} months
                </caption>
                <thead>
                  <tr>
                    <th scope="col">{ind.siteNoun.one}</th>
                    {view.tableKpis.map((k) => (
                      <th scope="col" key={k.key}>
                        {k.label}
                      </th>
                    ))}
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {view.table.map((r) => (
                    <tr key={r.site} className={site === r.site ? "sel" : ""}>
                      <th scope="row">
                        <button
                          type="button"
                          className="linkish"
                          onClick={() => {
                            setSite(r.site);
                            setTab("overview");
                          }}
                        >
                          {r.site}
                        </button>
                      </th>
                      {r.values.map((v) => (
                        <td key={v.key} className="tnum">
                          {fmt(v.value, v.fmt)}
                        </td>
                      ))}
                      <td>
                        <span className={`status ${r.status}`}>
                          <i aria-hidden="true" />
                          {statusText[r.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            )}
          </div>
        </div>
      </div>

      <div className="explorer-foot">
        <div>
          <p className="flow-h">What your team does differently</p>
          <p className="changes">{ind.changes}</p>
        </div>
        <dl className="stat-chips">
          <div className="stat-chip">
            <dt>Effort for you</dt>
            <dd>
              <Dots n={eff.difficulty} /> {eff.difficultyLabel}
            </dd>
          </div>
          <div className="stat-chip">
            <dt>First dashboard</dt>
            <dd>{eff.firstDashboard}</dd>
          </div>
          <div className="stat-chip">
            <dt>Plan setup from</dt>
            <dd>{size === "small" ? "$7,500" : "$40,000"}</dd>
          </div>
        </dl>
        <div className="btn-row">
          {lockIndustry ? (
            <Link href={`/demos?industry=${slug}&size=${size}`} className="btn btn-secondary">
              Open in Demos
            </Link>
          ) : (
            <Link href={`/solutions/${slug}`} className="btn btn-secondary">
              {ind.short} solutions
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
