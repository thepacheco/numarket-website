"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { steps } from "@/content/steps";
import { fmt, overBudgetSummary } from "@/lib/sample-data";

/* One scene, six states. Tiles start messy, get cleaned, locked away,
   turn into screens, produce an action item, and end with a key. */
const tiles = [
  { tx: 4, ty: 8, tr: -14, gx: 22, gy: 8 },
  { tx: 70, ty: 14, tr: 12, gx: 42.5, gy: 8 },
  { tx: 38, ty: 3, tr: -6, gx: 63, gy: 8 },
  { tx: 8, ty: 46, tr: 18, gx: 22, gy: 24 },
  { tx: 80, ty: 42, tr: -20, gx: 42.5, gy: 24 },
  { tx: 52, ty: 28, tr: 9, gx: 63, gy: 24 },
  { tx: 24, ty: 26, tr: -10, gx: 22, gy: 40 },
  { tx: 62, ty: 58, tr: 16, gx: 42.5, gy: 40 },
  { tx: 14, ty: 68, tr: -8, gx: 63, gy: 40 },
];

const captions = ["Your data today: everywhere", "Cleaned. Matched. Trusted.", "Stored privately. Yours.", "Live screens for your team", "Know what to do next", "Leave anytime. It's all yours."];
const short = ["Pull it together", "Fix the mess", "Lock it down", "Put it to work", "Tell you what to do", "It's yours"];
const DUR = 4500;

export default function StepScene() {
  const ob = overBudgetSummary();
  const [s, setS] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);
  const [run, setRun] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
  }, []);

  useEffect(() => {
    if (!auto || paused) return;
    const t = setTimeout(() => setS((x) => (x + 1) % steps.length), DUR);
    return () => clearTimeout(t);
  }, [s, auto, paused, run]);

  const pick = (i: number) => {
    setS(i);
    setRun((r) => r + 1);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % 6 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i + 5) % 6 : -1;
    if (n < 0) return;
    e.preventDefault();
    pick(n);
    tabs.current[n]?.focus();
  };

  return (
    <div className="stepper" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <ol className="step-list" role="tablist" aria-label="The six steps">
        {steps.map((st, i) => (
          <li key={st.key} role="presentation">
            <button
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={s === i}
              aria-controls="step-scene"
              tabIndex={s === i ? 0 : -1}
              className="step-btn"
              onClick={() => pick(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="sn">{st.n}</span>
              <span className="st">
                {st.title} <span style={{ fontWeight: 500, color: "var(--text-3)", fontSize: 15 }}>· {short[i]}</span>
              </span>
              <span className="sd">{st.plain}</span>
              <span key={`${s}-${run}-${paused}`} className={`bar ${auto && !paused ? "run" : ""}`} style={{ ["--dur" as string]: `${DUR}ms` }} />
            </button>
          </li>
        ))}
      </ol>

      <div id="step-scene" className="scene" data-s={s} role="img" aria-label={`Step ${s + 1}: ${captions[s]}`}>
        {tiles.map((t, i) => (
          <div
            key={i}
            className="t"
            style={{ ["--tx" as string]: t.tx, ["--ty" as string]: t.ty, ["--tr" as string]: `${t.tr}deg`, ["--gx" as string]: t.gx, ["--gy" as string]: t.gy, transitionDelay: `${i * 40}ms` }}
          >
            {i % 3 === 0 && <span className="dup" />}
            <i style={{ width: "80%" }} />
            <i style={{ width: "55%" }} />
            <i style={{ width: "68%" }} />
          </div>
        ))}
        <div className="shield" />
        <div className="core2">
          <div>
            <Icon name="lock" />
            YOUR PRIVATE
            <br />
            DATABASE
          </div>
        </div>
        <div className="pnl p1">
          <div className="mini-bars">
            <i style={{ height: "45%" }} />
            <i style={{ height: "70%" }} />
            <i style={{ height: "55%" }} />
            <i style={{ height: "90%" }} />
          </div>
        </div>
        <div className="pnl p2">
          <span className="mini-in" />
          <span className="mini-in" />
          <span className="mini-btn" />
        </div>
        <div className="pnl p3">
          <span className="bub">Which jobs are over budget?</span>
          <span className="bub a">
            {ob.count} jobs · {fmt(ob.total, "money")} over
          </span>
        </div>
        <div className="actc">
          <small>ACTION ITEM</small>
          <b>Review change orders on {ob.rows[0].site}</b>
          Owner: PM team · Due Friday
        </div>
        <div className="key">
          <Icon name="key" />
          Your database. Your key.
        </div>
        <div className="caption">
          <span>
            Step {s + 1} of 6
          </span>
          <b>{captions[s]}</b>
        </div>
      </div>
    </div>
  );
}
