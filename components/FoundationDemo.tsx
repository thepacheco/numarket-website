"use client";

import { useMemo } from "react";
import Icon from "./Icon";
import { useStages } from "./useTween";
import { buildView, fmt, type Fmt } from "@/lib/sample-data";
import { industries, type IndustrySlug } from "@/content/industries";

/* Foundation, step by step: three sources that disagree → duplicates merged →
   names matched → a stale number refreshed → one clean table they all agree on.
   Then the data dictionary for three of the numbers. All from sample records. */

const abbrev = (s: string) =>
  s
    .split(" ")
    .map((w, i, a) => (i === a.length - 1 && w.length > 6 ? w.slice(0, 4) + "." : w))
    .join(" ")
    .toUpperCase();

const steps = ["Three reports, three different totals.", "Duplicates found and merged.", "Different names for the same place, matched.", "An out-of-date number, refreshed from the source.", "One clean table. Every report agrees."];

export default function FoundationDemo({ slug }: { slug: IndustrySlug }) {
  const ind = industries.find((i) => i.slug === slug)!;
  const d = useMemo(() => {
    const v = buildView(slug, "large", null, 12);
    const sites = v.sites.slice(0, 4);
    let label: string, f: Fmt, val: (s: string) => number;
    if (slug === "utilities") {
      label = "Customer outage minutes";
      f = "num";
      val = (s) => buildView(slug, "large", s, 12).totals.cmi;
    } else {
      label = v.breakdown.title.replace(/ by .*/, "");
      f = v.breakdown.fmt;
      val = (s) => buildView(slug, "large", s, 12).breakdown.items.reduce((t, x) => t + x.value, 0);
    }
    const rows = sites.map((s) => ({ site: s, v: val(s) }));
    const total = rows.reduce((t, r) => t + r.v, 0);
    const dict = v.kpis.slice(0, 3).map((k) => ({
      name: k.label,
      means: k.hint ?? "Calculated fresh from your records for whatever period you pick.",
      better: k.better === "up" ? "Higher is better" : k.better === "down" ? "Lower is better" : "Closer to plan is better",
      from: `${ind.sources[0]} and ${ind.sources[1]}`,
    }));
    return { label, f, rows, total, dict };
  }, [slug, ind]);
  const { stage, playing, play, reset } = useStages(4, 1500);
  const [r0, r1, r2, r3] = d.rows;
  const srcA = [
    { name: r0.site, v: r0.v },
    { name: r1.site, v: r1.v },
    { name: r1.site.toLowerCase() + " ", v: r1.v, dup: true },
    { name: r2.site, v: r2.v },
    { name: r3.site, v: r3.v },
  ];
  const srcB = d.rows.map((r, i) => ({ name: i === 2 ? `Proj ${abbrev(r.site).split(" ")[0]}-02` : abbrev(r.site), v: r.v, odd: i === 2, canon: r.site }));
  const srcC = d.rows.map((r, i) => ({ name: r.site, v: i === 3 ? r.v * 0.8 : r.v, stale: i === 3, fresh: r.v }));
  const totA = srcA.reduce((t, x) => t + (x.dup && stage >= 1 ? 0 : x.v), 0);
  const totB = srcB.reduce((t, x) => t + (x.odd && stage < 2 ? 0 : x.v), 0);
  const totC = srcC.reduce((t, x) => t + (x.stale && stage < 3 ? x.v : x.fresh), 0);
  const agree = stage >= 4;
  const F = (n: number) => fmt(n, d.f);
  return (
    <div className="fdemo">
      <p className={`narr-cap ${agree ? "ok" : ""}`} key={stage}>
        {steps[stage]}
      </p>
      <div className="fd-grid">
        <div className={`fd-src ${stage >= 1 ? "s1" : ""}`}>
          <h3 className="fd-h">
            <Icon name="spreadsheet" width={15} height={15} /> {ind.sources[0]}
          </h3>
          {srcA.map((x, i) => (
            <div key={i} className={`fd-row ${x.dup ? "dup" : ""} ${x.dup && stage >= 1 ? "gone" : ""}`}>
              <span>{x.name}</span>
              <b className="tnum">{F(x.v)}</b>
            </div>
          ))}
          <div className={`fd-tot ${agree ? "ok" : ""}`}>
            <span>Total</span>
            <b className="tnum">{F(totA)}</b>
          </div>
        </div>
        <div className="fd-src">
          <h3 className="fd-h">
            <Icon name="dollar" width={15} height={15} /> {ind.sources[1]}
          </h3>
          {srcB.map((x, i) => (
            <div key={i} className={`fd-row ${x.odd ? "odd" : ""} ${stage >= 2 ? "matched" : ""}`}>
              <span>
                {x.name}
                {stage >= 2 && <small> → {x.canon}</small>}
              </span>
              <b className="tnum">{F(x.v)}</b>
            </div>
          ))}
          <div className={`fd-tot ${agree ? "ok" : ""}`}>
            <span>Total{stage < 2 ? " (1 row didn't match)" : ""}</span>
            <b className="tnum">{F(totB)}</b>
          </div>
        </div>
        <div className="fd-src">
          <h3 className="fd-h">
            <Icon name="file" width={15} height={15} /> {ind.sources[2] ?? "Emailed updates"}
          </h3>
          {srcC.map((x, i) => (
            <div key={i} className={`fd-row ${x.stale ? (stage >= 3 ? "fixed" : "stale") : ""}`}>
              <span>
                {x.name}
                {x.stale && stage < 3 && <small> · last month</small>}
              </span>
              <b className="tnum">{F(x.stale && stage >= 3 ? x.fresh : x.v)}</b>
            </div>
          ))}
          <div className={`fd-tot ${agree ? "ok" : ""}`}>
            <span>Total</span>
            <b className="tnum">{F(totC)}</b>
          </div>
        </div>
        <div className={`fd-clean ${agree ? "on" : ""}`}>
          <h3 className="fd-h">
            <Icon name="lock" width={15} height={15} /> Your clean table
          </h3>
          {agree ? (
            <>
              {d.rows.map((r) => (
                <div key={r.site} className="fd-row">
                  <span>{r.site}</span>
                  <b className="tnum">{F(r.v)}</b>
                </div>
              ))}
              <div className="fd-tot ok">
                <span>{d.label}</span>
                <b className="tnum">{F(d.total)}</b>
              </div>
            </>
          ) : (
            <p className="fd-wait">Press “Clean it” and your clean table builds here.</p>
          )}
        </div>
      </div>
      <div className="fd-bar">
        <button type="button" className="btn btn-primary" onClick={play} disabled={playing}>
          {stage === 0 ? "Clean it" : playing ? "Cleaning…" : "Clean it again"}
        </button>
        {stage > 0 && !playing && (
          <button type="button" className="btn btn-secondary" onClick={reset}>
            Start over
          </button>
        )}
        {agree && (
          <span className="fd-agree">
            <Icon name="check" width={18} height={18} /> All three reports agree: {F(d.total)}
          </span>
        )}
      </div>
      {agree && (
        <div className="fd-dict on">
          <h3 className="fd-h">The data dictionary · three of your numbers</h3>
          <div className="fd-dict-grid">
            {d.dict.map((x) => (
              <dl key={x.name}>
                <dt>{x.name}</dt>
                <dd>
                  <span>Means</span>
                  {x.means}
                </dd>
                <dd>
                  <span>Comes from</span>
                  {x.from}
                </dd>
                <dd>
                  <span>Reading it</span>
                  {x.better}
                </dd>
              </dl>
            ))}
          </div>
        </div>
      )}
      <p className="small muted">Sample data.</p>
    </div>
  );
}
