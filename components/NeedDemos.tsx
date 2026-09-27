"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { messyTotal, reports, trueTotal, versions, type Row } from "@/lib/demo-data";
import { constructionJobs, fmt } from "@/lib/sample-data";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

/* ---------- Replace spreadsheets ---------- */
export function SpreadsheetDemo() {
  const [done, setDone] = useState(false);
  const truthCost = constructionJobs()[1].cost; // same job the Change a Number demo opens on
  const scaled = versions.map((v) => ({ ...v, amount: (v.amount / 281150) * truthCost * 0.98 }));
  return (
    <div className="demo-card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <h3 style={{ fontSize: 18 }}>{done ? "One input screen" : "Route 9 Bridge — cost to date"}</h3>
        <span className={done ? "pill" : "pill warn"}>{done ? "1 number, entered once" : `${versions.length} versions, ${versions.length} different numbers`}</span>
      </div>
      <div className="versions">
        {scaled.map((v, i) => (
          <div key={v.file} className={`ver ${done && i > 0 ? "gone" : ""} ${done && i === 0 ? "one" : ""}`} style={{ transitionDelay: `${i * 70}ms` }}>
            <Icon name={done ? "check" : "spreadsheet"} />
            <span>
              <b>{done ? "Workspace · Update job budget" : v.file}</b>
              <br />
              <span className="small muted">{done ? "Entered by the PM · everyone sees it live" : `Last edited by ${v.who}`}</span>
            </span>
            <span className="v-num">{fmt(done ? truthCost : v.amount, "money")}</span>
          </div>
        ))}
      </div>
      <div className="btn-row" style={{ marginTop: 18 }}>
        <button type="button" className="btn btn-primary" onClick={() => setDone(!done)}>
          {done ? (
            <>
              <Icon name="refresh" width={16} height={16} /> Show the old way
            </>
          ) : (
            <>
              Replace with one input screen <Icon name="arrow" className="arrow" width={16} height={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ---------- Trust your numbers ---------- */
export function ReconcileDemo() {
  const [clean, setClean] = useState(false);
  const shown = (rows: Row[]) =>
    rows.map((r) => {
      if (!clean) return { ...r, cls: r.issue === "missing" ? "out" : r.issue === "duplicate" || r.issue === "cancelled" ? "dup" : "", label: r.name };
      if (r.issue === "duplicate" || r.issue === "cancelled") return { ...r, cls: "out", label: r.name };
      if (r.issue === "name") return { ...r, cls: "fixed", label: r.fixTo! };
      if (r.issue === "missing") return { ...r, cls: "fixed", label: r.name };
      return { ...r, cls: "", label: r.name };
    });
  const totals = reports.map((rep) => (clean ? trueTotal : messyTotal(rep.rows)));
  const agree = new Set(totals).size === 1;
  return (
    <div className="demo-card">
      <p className="small muted" style={{ marginBottom: 12 }}>
        “Revenue last quarter” — as reported by three departments. Sample data.
      </p>
      <div className="recon">
        {reports.map((rep, i) => (
          <div className="recon-col" key={rep.dept}>
            <h4>
              {rep.dept} <span className="muted small">· {rep.system}</span>
            </h4>
            <div className="tot" style={{ color: agree ? "var(--good)" : "var(--ink)" }}>
              {money(totals[i])}
            </div>
            {shown(rep.rows).map((r, j) => (
              <div key={j} className={`recon-row ${r.cls}`} title={r.issue ? `Issue: ${r.issue}` : undefined}>
                <span>
                  {r.label}
                  {!clean && r.issue === "duplicate" && " (entered twice)"}
                  {!clean && r.issue === "cancelled" && " (cancelled)"}
                </span>
                <span className="tnum">{fmt(r.amount, "money")}</span>
              </div>
            ))}
            {!clean && rep.rows.some((r) => r.issue === "missing") && <div className="recon-row dup">Evergreen Foods — not entered yet</div>}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginTop: 18 }}>
        <div className={`agree ${agree ? "yes" : "no"}`} key={String(agree)} aria-live="polite">
          <Icon name={agree ? "check" : "alert"} />
          {agree ? `All three reports agree: ${money(trueTotal)}` : "Three reports. Three different totals."}
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setClean(!clean)}>
          {clean ? "Show the mess again" : "Clean & match"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Get AI-ready ---------- */
export function AiCompare() {
  const [asked, setAsked] = useState(false);
  const sales = reports[2];
  return (
    <div className="demo-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
        <div className="msg q" style={{ justifySelf: "start" }}>
          What was our revenue last quarter?
        </div>
        {!asked && (
          <button type="button" className="btn btn-primary" onClick={() => setAsked(true)}>
            Ask the AI <Icon name="send" width={16} height={16} />
          </button>
        )}
      </div>
      <div className="ai-compare">
        <div className="ai-side bad">
          <h4>
            <Icon name="alert" width={18} height={18} style={{ color: "var(--risk)" }} /> On messy data
          </h4>
          {asked ? (
            <div style={{ animation: "popIn .4s" }}>
              <p>
                <b>Revenue last quarter was {money(messyTotal(sales.rows))}.</b>
              </p>
              <p className="small muted" style={{ marginTop: 8 }}>
                Confident — and wrong. It read the Sales report, which still includes a cancelled deal. Finance and Operations would each give a different
                answer.
              </p>
            </div>
          ) : (
            <p className="muted small">Waiting for a question…</p>
          )}
        </div>
        <div className="ai-side good">
          <h4>
            <Icon name="check" width={18} height={18} style={{ color: "var(--good)" }} /> On clean data
          </h4>
          {asked ? (
            <div style={{ animation: "popIn .4s .25s both" }}>
              <p>
                <b>Revenue last quarter was {money(trueTotal)}.</b>
              </p>
              <p className="small muted" style={{ marginTop: 8 }}>
                From one matched set of 5 customers. Duplicates removed, names matched, cancelled deals excluded.
              </p>
            </div>
          ) : (
            <p className="muted small">Waiting for a question…</p>
          )}
        </div>
      </div>
      {asked && (
        <button type="button" className="btn btn-ghost" style={{ marginTop: 12 }} onClick={() => setAsked(false)}>
          <Icon name="refresh" width={16} height={16} /> Reset
        </button>
      )}
    </div>
  );
}

/* ---------- Move off old systems ---------- */
const TOTAL_ROWS = 184220;
const migSteps = ["Inventory every table and report", "Map old fields to new names", "Move the data", "Verify row counts and totals", "Retire the old reports"];

export function MigrationDemo() {
  const [phase, setPhase] = useState(-1); // -1 idle, 0..4 running, 5 done
  const [moved, setMoved] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (phase < 0 || phase >= migSteps.length) return;
    if (phase === 2) {
      const start = performance.now();
      const tick = (now: number) => {
        const k = Math.min(1, (now - start) / 2200);
        setMoved(Math.round(TOTAL_ROWS * k));
        if (k < 1) raf.current = requestAnimationFrame(tick);
        else setPhase(3);
      };
      raf.current = requestAnimationFrame(tick);
      return () => {
        if (raf.current) cancelAnimationFrame(raf.current);
      };
    }
    const t = setTimeout(() => setPhase((p) => p + 1), 900);
    return () => clearTimeout(t);
  }, [phase]);

  const run = () => {
    setMoved(0);
    setPhase(0);
  };
  const done = phase >= migSteps.length;

  return (
    <div className="demo-card">
      <div className="mig">
        <div className="mig-box old">
          <h4>
            <Icon name="database" width={18} height={18} /> Old reporting server
          </h4>
          <span className="small muted">Installed 2011 · on-premise</span>
          <div className="mig-count">{(TOTAL_ROWS - moved).toLocaleString("en-US")}</div>
          <span className="small muted">rows left to move</span>
        </div>
        <div className={`mig-pipe ${phase === 2 ? "run" : ""}`} aria-hidden="true">
          <i />
        </div>
        <div className="mig-box new">
          <h4>
            <Icon name="lock" width={18} height={18} style={{ color: "var(--p-engineering)" }} /> Your new database
          </h4>
          <span className="small muted">Private · encrypted · yours</span>
          <div className="mig-count" style={{ color: "var(--p-engineering)" }}>
            {moved.toLocaleString("en-US")}
          </div>
          <span className="small muted">rows moved</span>
        </div>
      </div>
      <ul className="checks" style={{ marginTop: 20 }} aria-live="polite">
        {migSteps.map((s, i) => (
          <li key={s} className={phase > i ? "done" : phase === i ? "active" : ""}>
            <i />
            {s}
            {i === 3 && phase > 3 && <b style={{ color: "var(--good)", marginLeft: 6 }}>{TOTAL_ROWS.toLocaleString()} = {TOTAL_ROWS.toLocaleString()} ✓</b>}
          </li>
        ))}
      </ul>
      <div className="btn-row" style={{ marginTop: 18 }}>
        <button type="button" className="btn btn-primary" onClick={run} disabled={phase >= 0 && !done}>
          {done ? (
            <>
              <Icon name="refresh" width={16} height={16} /> Run it again
            </>
          ) : phase >= 0 ? (
            "Migrating…"
          ) : (
            <>
              <Icon name="play" width={16} height={16} /> Run the migration
            </>
          )}
        </button>
        {done && <span className="pill">Nothing lost. Old system can be switched off.</span>}
      </div>
    </div>
  );
}
