"use client";

import { useState } from "react";
import Icon from "./Icon";
import { tiers, money, type TierId } from "@/content/tiers";

/* How the service actually runs, per plan: the operating rhythm, where the
   setup fee goes, and the terms. Every figure matches content/tiers.ts. */

type Who = "auto" | "us" | "you";
const whoLabel: Record<Who, string> = { auto: "Automatic", us: "numarket", you: "You" };

const plan = {
  insight: { weeks: 3, hours: "3–5 hours", changes: "4 hours of changes a month", review: "Once a month", alerts: "Basic alerts", usage: "your $400/mo allowance", reply: "1 business day", urgent: "the same business day" },
  operate: { weeks: 6, hours: "8–15 hours", changes: "10 hours of changes a month", review: "Every two weeks", alerts: "Advanced alerts", usage: "your $800/mo allowance", reply: "4 business hours", urgent: "4 hours" },
  command: { weeks: 10, hours: "20–40 hours (a sponsor + IT)", changes: "A dedicated analyst", review: "Every week, plus a daily executive brief", alerts: "Custom alerts and automations", usage: "actual cost + 15%", reply: "2 hours", urgent: "1 hour" },
} as const;

function TierSwitch({ id, set }: { id: TierId; set: (t: TierId) => void }) {
  return (
    <div className="seg" role="group" aria-label="Plan">
      {tiers.map((t) => (
        <button key={t.id} type="button" aria-pressed={id === t.id} onClick={() => set(t.id)}>
          {t.name}
        </button>
      ))}
    </div>
  );
}

export function OperatingRhythm() {
  const [id, setId] = useState<TierId>("operate");
  const p = plan[id];
  const lanes: { when: string; items: { who: Who; text: string }[] }[] = [
    {
      when: "Every day",
      items: [
        { who: "auto", text: "Your tools sync into your private database on a set schedule." },
        { who: "auto", text: "Every load is checked for duplicates, blanks, and totals that don't match. A failed check alerts us, not you." },
        { who: "auto", text: `Dashboards and Ask Your Data update on their own. ${p.alerts} go out when a number crosses a line you set.` },
      ],
    },
    {
      when: "Every week",
      items: [
        { who: "us", text: "We fix whatever a check caught — at the source, so it stays fixed." },
        { who: "us", text: `We build what you ask for: new screens, fields, and reports. ${p.changes} included.` },
      ],
    },
    {
      when: id === "insight" ? "Every month" : id === "operate" ? "Every two weeks" : "Every week",
      items: [
        { who: "us", text: "Insight Review with your analyst: what changed, what's at risk, and 3–5 action items with owners and due dates." },
        { who: "you", text: "You decide which action items to take. We track them until they're done." },
        { who: "us", text: `A usage report: platform cost against ${p.usage}. We warn you at 85%.` },
      ],
    },
    {
      when: "Whenever you need us",
      items: [
        { who: "us", text: `Support replies within ${p.reply}. If the app is down, within ${p.urgent}.` },
        { who: "us", text: "Every quarter, we review who can see what, with you." },
        { who: "you", text: "Leave after your term with a full export or handover within 30 days. No charge." },
      ],
    },
  ];
  return (
    <div className="ops">
      <div className="ops-top">
        <TierSwitch id={id} set={setId} />
        <ul className="ops-key" aria-label="Who does it">
          {(["auto", "us", "you"] as Who[]).map((w) => (
            <li key={w}>
              <i className={`who-dot ${w}`} /> {whoLabel[w]}
            </li>
          ))}
        </ul>
      </div>
      <div className="ops-lanes" key={id}>
        {lanes.map((l, i) => (
          <section key={l.when} className="ops-lane" style={{ animationDelay: `${i * 70}ms` }}>
            <h3 className="ops-when">
              <span className={`ops-pulse ${i === 0 ? "on" : ""}`} aria-hidden="true" />
              {l.when}
            </h3>
            <ul>
              {l.items.map((it) => (
                <li key={it.text}>
                  <span className={`who ${it.who}`}>{whoLabel[it.who]}</span>
                  <p>{it.text}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

const phases = [
  { name: "Kickoff + read-only access", a: 0, b: 0.1, you: "1-hour kickoff" },
  { name: "Connect your tools", a: 0.06, b: 0.42 },
  { name: "Clean, match, and check", a: 0.26, b: 0.72, you: "Review meeting" },
  { name: "Build your Workspace", a: 0.5, b: 0.92 },
  { name: "Train + launch + first Insight Review", a: 0.88, b: 1, you: "30-min training" },
];

export function SetupTimeline() {
  const [id, setId] = useState<TierId>("operate");
  const t = tiers.find((x) => x.id === id)!;
  const p = plan[id];
  const span = (a: number, b: number) => {
    const s = Math.floor(a * p.weeks) + 1,
      e = Math.max(s, Math.ceil(b * p.weeks));
    return s === e ? `Wk ${s}` : `Wk ${s}–${e}`;
  };
  return (
    <div className="setup">
      <div className="ops-top">
        <TierSwitch id={id} set={setId} />
        <p className="small muted">
          Setup from <b className="tnum">{money(t.setupFrom)}</b> · about <b>{p.weeks} weeks</b> · your time: <b>{p.hours}</b> total
        </p>
      </div>
      <div className="gantt" key={id}>
        <div className="g-scale" aria-hidden="true">
          {Array.from({ length: p.weeks }, (_, i) => (
            <span key={i}>Wk {i + 1}</span>
          ))}
        </div>
        {phases.map((ph, i) => (
          <div className="g-row" key={ph.name}>
            <span className="g-name">
              {ph.name}
              {ph.you && (
                <small className="g-yours">
                  <Icon name="users" width={12} height={12} /> You: {ph.you}
                </small>
              )}
            </span>
            <span className="g-track" style={{ backgroundSize: `${100 / p.weeks}% 100%` }}>
              <span className="g-bar" style={{ left: `${ph.a * 100}%`, width: `${(ph.b - ph.a) * 100}%`, animationDelay: `${i * 90}ms` }}>
                <span className="g-wk">{span(ph.a, ph.b)}</span>
              </span>
            </span>
          </div>
        ))}
        <div className="g-pay">
          <span style={{ left: 0 }}>50% of setup at signing</span>
          <span style={{ left: "100%" }}>50% at launch · monthly starts</span>
        </div>
      </div>
    </div>
  );
}

export function TermsGlance() {
  const terms = [
    ["Term", "12 months, then month to month. Command can be 12–36."],
    ["Setup", "Fixed price in your proposal. Half at signing, half at launch."],
    ["Monthly", "Flat fee, billed in advance. No per-user fees inside your plan."],
    ["Platform usage", "Included up to an allowance. Over it: cost + 15%, and we warn you at 85%."],
    ["Changes", "Hours included every month. Bigger projects are quoted before we start."],
    ["Leaving", "Your data is yours. Full export or handover within 30 days, free."],
  ];
  return (
    <dl className="terms">
      {terms.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Yearly cost ranges on one scale. */
export function CostCompare() {
  const max = 500;
  const rows = [
    { name: "Hire one data analyst", lo: 85, hi: 140, note: "$85K–$110K salary, plus benefits and tools. One person, months to ramp." },
    { name: "Big consulting firm", lo: 150, hi: 500, note: "$150K–$500K+. Long timelines, built for enterprises." },
    { name: "numarket Operate", lo: 48, hi: 63, note: "~$63K the first year, ~$48K after. A team, the platform, and you own everything.", us: true },
  ];
  return (
    <div className="costcmp">
      <div className="cc-scale" aria-hidden="true">
        {[0, 100, 200, 300, 400, 500].map((v) => (
          <span key={v} style={{ left: `${(v / max) * 100}%` }}>
            {v === 0 ? "$0" : `$${v}K`}
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div className={`cc-row ${r.us ? "us" : ""}`} key={r.name}>
          <div className="cc-label">
            <b>{r.name}</b>
            <span className="small muted">{r.note}</span>
          </div>
          <div className="cc-track">
            <span className="cc-bar" style={{ left: `${(r.lo / max) * 100}%`, width: `${((r.hi - r.lo) / max) * 100}%` }} />
          </div>
        </div>
      ))}
      <p className="small muted">Per year. Analyst range includes a typical 25–30% for benefits and tools.</p>
    </div>
  );
}
