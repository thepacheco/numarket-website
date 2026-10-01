"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";
import CrewScheduler from "./CrewScheduler";
import { engApps } from "@/content/engApps";
import { industries, type IndustrySlug } from "@/content/industries";
import { money } from "@/content/tiers";
import { buildView } from "@/lib/sample-data";
import { sampleCompany } from "@/lib/ask";

/* Four custom apps Engineering builds — each one made for a single company.
   Sample data throughout. */

function WriteBack({ slug }: { slug: IndustrySlug }) {
  const c = engApps[slug].writeBack;
  const [stage, setStage] = useState<number[]>(c.items.map(() => 0));
  const [log, setLog] = useState<string[]>([]);
  const approve = (i: number) => {
    if (stage[i]) return;
    const set = (v: number) => setStage((s) => s.map((x, j) => (j === i ? v : x)));
    set(1);
    setLog((l) => [`Approved ${c.items[i][0].split(" · ")[0]}`, ...l]);
    setTimeout(() => {
      set(2);
      setLog((l) => [`Sent to ${c.system}`, ...l]);
    }, 700);
    setTimeout(() => {
      set(3);
      setLog((l) => [`Posted in ${c.system} · budget updated`, ...l]);
    }, 1500);
  };
  const posted = c.items.reduce((t, it, i) => t + (stage[i] === 3 ? it[1] : 0), 0);
  return (
    <div className="ea-wb">
      <div className="ea-panel">
        <h3 className="ea-h">Waiting for approval</h3>
        {c.items.map(([label, amt], i) => (
          <div key={label} className={`ea-item s${stage[i]}`}>
            <span>
              <b>{label}</b>
              <small className="tnum">{money(amt)}</small>
            </span>
            <button type="button" className={`btn ${stage[i] ? "btn-secondary" : "btn-primary"} ea-btn`} onClick={() => approve(i)} disabled={!!stage[i]}>
              {["Approve", "Approved", "Sending…", "Posted ✓"][stage[i]]}
            </button>
          </div>
        ))}
      </div>
      <div className="ea-panel ea-sys">
        <h3 className="ea-h">
          <Icon name="refresh" width={14} height={14} /> {c.system}
        </h3>
        <p className="ea-big tnum">{money(posted)}</p>
        <p className="small muted">posted automatically today — nobody typed it twice</p>
        <ol className="ea-log" aria-live="polite">
          {log.length ? log.slice(0, 5).map((l, i) => <li key={log.length - i}>{l}</li>) : <li className="muted">Approve an item to see it post.</li>}
        </ol>
      </div>
    </div>
  );
}

function EstimateBuilder({ slug }: { slug: IndustrySlug }) {
  const c = engApps[slug].estimate;
  const ind = industries.find((i) => i.slug === slug)!;
  const [qty, setQty] = useState(c.start);
  const [complex, setComplex] = useState(false);
  const [margin, setMargin] = useState(15);
  const comps = useMemo(() => ind.sites.large.slice(0, 4).map((s, i) => ({ name: s, rate: c.rate * [0.94, 1.03, 0.98, 1.08][i] })), [ind, c.rate]);
  const avg = comps.reduce((t, x) => t + x.rate, 0) / comps.length;
  const cost = qty * avg * (complex ? 1.18 : 1);
  const price = cost / (1 - margin / 100);
  const maxR = Math.max(...comps.map((x) => x.rate));
  const fmtRate = (r: number) => (r < 10 ? `$${r.toFixed(2)}` : money(r));
  return (
    <div className="ea-est">
      <div className="ea-panel">
        <h3 className="ea-h">{c.title}</h3>
        <label className="ea-field">
          <span>
            Size: <b className="tnum">{qty.toLocaleString("en-US")}</b> {c.unit}
          </span>
          <input type="range" min={c.min} max={c.max} step={c.step} value={qty} onChange={(e) => setQty(+e.target.value)} />
        </label>
        <div className="seg" role="group" aria-label="Complexity">
          <button type="button" aria-pressed={!complex} onClick={() => setComplex(false)}>
            Standard
          </button>
          <button type="button" aria-pressed={complex} onClick={() => setComplex(true)}>
            Complex (+18%)
          </button>
        </div>
        <label className="ea-field">
          <span>
            Margin: <b className="tnum">{margin}%</b>
          </span>
          <input type="range" min={5} max={35} step={1} value={margin} onChange={(e) => setMargin(+e.target.value)} />
        </label>
      </div>
      <div className="ea-panel">
        <h3 className="ea-h">Your price</h3>
        <p className="ea-big tnum">{money(price)}</p>
        <p className="small muted tnum">
          Cost {money(cost)} · likely range {money(price * 0.92)}–{money(price * 1.08)}
        </p>
        <p className="ea-sub">
          Based on what {comps.length} past {c.noun}s really cost you, per {c.unit.replace(/s$/, "").replace(" a week", " per week")}:
        </p>
        {comps.map((x) => (
          <div key={x.name} className="ea-comp">
            <span>{x.name}</span>
            <span className="ea-comp-bar">
              <i style={{ width: `${(x.rate / maxR) * 100}%` }} />
            </span>
            <b className="tnum">{fmtRate(x.rate)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientPortal({ slug }: { slug: IndustrySlug }) {
  const c = engApps[slug].portal;
  const ind = industries.find((i) => i.slug === slug)!;
  const v = useMemo(() => buildView(slug, "large", null, 3), [slug]);
  const [site, setSite] = useState(v.table[0].site);
  const row = v.table.find((r) => r.site === site)!;
  const pct = [62, 48, 35, 71, 55, 80][Math.max(0, v.table.indexOf(row)) % 6];
  const step = Math.min(3, Math.floor(pct / 25));
  const status = { good: ["On track", "good"], watch: ["Watching closely", "watch"], risk: ["Behind — your contact will call today", "risk"] }[row.status];
  return (
    <div className="ea-portal">
      <div className="ea-browser">
        <div className="ea-bar">
          <i />
          <i />
          <i />
          <span>portal.{sampleCompany[slug].toLowerCase().replace(/[^a-z]+/g, "")}.com</span>
        </div>
        <div className="ea-page">
          <p className="ea-brand">{sampleCompany[slug]} · {c.customer} portal</p>
          <label className="ea-field">
            <span>Your {ind.siteNoun.one.toLowerCase()}</span>
            <select className="filter-select" value={site} onChange={(e) => setSite(e.target.value)}>
              {v.table.map((r) => (
                <option key={r.site}>{r.site}</option>
              ))}
            </select>
          </label>
          <div className="ea-prog">
            <div>
              <b className="tnum">{pct}%</b> complete
            </div>
            <span className={`ea-status ${status[1]}`}>{status[0]}</span>
          </div>
          <span className="ea-track">
            <i style={{ width: `${pct}%` }} />
          </span>
          <ol className="ea-steps">
            {c.milestones.map((m, i) => (
              <li key={m} className={i < step ? "done" : i === step ? "now" : ""}>
                {m}
              </li>
            ))}
          </ol>
          <p className="small muted">Updated this morning · no phone call needed</p>
        </div>
      </div>
      <p className="ea-note">
        Each {c.customer} signs in and sees only their own {ind.siteNoun.one.toLowerCase()}. The status comes straight from your clean data — the same numbers
        your team uses.
      </p>
    </div>
  );
}

const apps = [
  { id: "sched", name: "Scheduler", line: "Put people where they're needed and see the cost before you commit." },
  { id: "wb", name: "Write-back", line: "Approve once; it posts to your other system by itself." },
  { id: "est", name: "Estimate builder", line: "Prices from what similar work really cost you." },
  { id: "portal", name: "Client portal", line: "Customers check their own status, without calling." },
] as const;

export default function EngineeringApps({ slug = "construction" }: { slug?: IndustrySlug }) {
  const [tab, setTab] = useState<(typeof apps)[number]["id"]>("sched");
  const cur = apps.find((a) => a.id === tab)!;
  return (
    <div className="ea">
      <div className="ea-tabs" role="tablist" aria-label="Custom apps">
        {apps.map((a, i) => (
          <button key={a.id} type="button" role="tab" aria-selected={tab === a.id} className="ea-tab" onClick={() => setTab(a.id)}>
            <small>App {i + 1}</small>
            {a.name}
          </button>
        ))}
      </div>
      <p className="ea-line">
        {cur.line} <span className="label-sample">Custom app example · Sample data</span>
      </p>
      <div className="ea-body" key={`${tab}-${slug}`}>
        {tab === "sched" && <CrewScheduler slug={slug} />}
        {tab === "wb" && <WriteBack slug={slug} />}
        {tab === "est" && <EstimateBuilder slug={slug} />}
        {tab === "portal" && <ClientPortal slug={slug} />}
      </div>
    </div>
  );
}
