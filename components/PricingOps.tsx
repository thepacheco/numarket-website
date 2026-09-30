"use client";

import { useState } from "react";
import Icon from "./Icon";
import { tiers, money, type TierId } from "@/content/tiers";

/* Where the setup time goes, by plan, and the terms at a glance.
   Every figure matches content/tiers.ts. */

const plan = {
  insight: { weeks: 3, hours: "3–5 hours" },
  operate: { weeks: 6, hours: "8–15 hours" },
  command: { weeks: 10, hours: "20–40 hours (a sponsor + IT)" },
} as const;

function TierSwitch({ id, set }: { id: TierId; set: (t: TierId) => void }) {
  const label: Record<TierId, string> = { insight: "Small", operate: "Mid", command: "Large" };
  return (
    <div className="seg" role="group" aria-label="Size">
      {tiers.map((t) => (
        <button key={t.id} type="button" aria-pressed={id === t.id} onClick={() => set(t.id)}>
          {label[t.id]}
        </button>
      ))}
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
          {t.name} plan setup from <b className="tnum">{money(t.setupFrom)}</b> · about <b>{p.weeks} weeks</b> · your time: <b>{p.hours}</b> total
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
    ["Changes", "Workspace hours are included every month. Anything custom is Engineering, quoted first."],
    ["Monthly", "A predictable fee, billed in advance. No per-user fees inside your size."],
    ["Platform usage", "Included up to an allowance. Over it: cost + 15%, and we warn you at 85%."],
    ["Healthcare", "HIPAA data needs a higher-security database edition: +$500/mo Small, +$800/mo Mid, Large quoted."],
    ["Leaving", "You own your data. Full export package within 30 days, free."],
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
