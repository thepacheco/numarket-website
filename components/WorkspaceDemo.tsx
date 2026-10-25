"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import Toast from "./Toast";
import { industries, type IndustrySlug } from "@/content/industries";
import { constructionJobs, fmt } from "@/lib/sample-data";
import { introFor, questionsFor, sampleCompany, type QA } from "@/lib/ask";

/* ============ Tab 1: Change a Number ============ */

function Gauge({ value }: { value: number }) {
  const v = Math.max(0.8, Math.min(1.2, value));
  const angle = ((v - 0.8) / 0.4) * 180 - 90;
  const color = value >= 0.98 ? "var(--good)" : value >= 0.94 ? "var(--watch)" : "var(--risk)";
  return (
    <svg width="150" height="92" viewBox="0 0 150 92" role="img" aria-label={`Cost performance ${value.toFixed(2)}`}>
      <path d="M15 80 A60 60 0 0 1 135 80" fill="none" stroke="var(--gray-100)" strokeWidth="12" strokeLinecap="round" />
      <path d="M15 80 A60 60 0 0 1 75 20" fill="none" stroke="#fbe1da" strokeWidth="12" strokeLinecap="round" />
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: "75px 80px", transition: "transform .6s cubic-bezier(.2,.7,.2,1)" }}>
        <line x1="75" y1="80" x2="75" y2="30" stroke={color} strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="75" cy="80" r="7" fill={color} />
      <text x="15" y="92" fontSize="10" fill="var(--text-3)">0.80</text>
      <text x="119" y="92" fontSize="10" fill="var(--text-3)">1.20</text>
    </svg>
  );
}

function ChangeANumber() {
  const base = useMemo(() => constructionJobs(), []);
  const [edits, setEdits] = useState<Record<string, { cost: number; progress: number }>>({});
  const [sel, setSel] = useState(base[1].site);
  const [flash, setFlash] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const jobs = base.map((j) => {
    const e = edits[j.site];
    const cost = e?.cost ?? j.cost;
    const progress = e?.progress ?? j.progress;
    const earned = j.budget * progress;
    return { ...j, cost, progress, earned, cpi: earned / cost, over: cost - earned };
  });
  const job = jobs.find((j) => j.site === sel)!;
  const status = job.cpi >= 0.98 ? "good" : job.cpi >= 0.94 ? "watch" : "risk";
  const maxV = Math.max(...jobs.map((j) => Math.max(j.cost, j.earned)));

  const update = (patch: Partial<{ cost: number; progress: number }>) => {
    setEdits((e) => ({ ...e, [sel]: { cost: e[sel]?.cost ?? job.cost, progress: e[sel]?.progress ?? job.progress, ...patch } }));
    setFlash((f) => f + 1);
  };

  return (
    <div className="wsd-body">
      <form className="wsd-form" onSubmit={(e) => { e.preventDefault(); setToast(`Saved — ${sel} updated for everyone`); }}>
        <h3 className="h4">
          <Icon name="spreadsheet" width={18} height={18} /> Update job budget <span className="pill navy">Form</span>
        </h3>
        <div className="field">
          <label htmlFor="cn-job">Job</label>
          <select id="cn-job" value={sel} onChange={(e) => setSel(e.target.value)}>
            {jobs.map((j) => (
              <option key={j.site}>{j.site}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cn-budget">Total budget</label>
          <input id="cn-budget" value={fmt(job.budget, "money")} readOnly aria-readonly="true" style={{ background: "var(--gray-25)" }} />
        </div>
        <div className="field">
          <label htmlFor="cn-cost">Cost to date</label>
          <div className="money-in">
            <span>$</span>
            <input
              id="cn-cost"
              inputMode="numeric"
              value={Math.round(job.cost).toLocaleString("en-US")}
              onChange={(e) => {
                const n = Number(e.target.value.replace(/[^0-9]/g, ""));
                if (n > 0) update({ cost: n });
              }}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="cn-pct">
            Percent complete: <b className="tnum">{Math.round(job.progress * 100)}%</b>
          </label>
          <input id="cn-pct" type="range" min={5} max={100} value={Math.round(job.progress * 100)} onChange={(e) => update({ progress: +e.target.value / 100 })} />
        </div>
        <div className="btn-row">
          <button type="submit" className="btn btn-primary">
            Save update
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => { setEdits({}); setFlash((f) => f + 1); }}>
            <Icon name="refresh" width={16} height={16} /> Reset
          </button>
        </div>
        <p className="small muted">Drag the slider or change the cost. The dashboard updates as you type.</p>
      </form>

      <div className="wsd-dash">
        <div className="wsd-kpis">
          <div className="kpi" key={`a${flash}`}>
            <div className="kpi-l">Budget for work done</div>
            <div className="kpi-v tnum flash">{fmt(job.earned, "money")}</div>
          </div>
          <div className="kpi" key={`b${flash}`}>
            <div className="kpi-l">Cost to date</div>
            <div className="kpi-v tnum flash">{fmt(job.cost, "money")}</div>
          </div>
          <div className="kpi" key={`c${flash}`}>
            <div className="kpi-l">Status</div>
            <div style={{ marginTop: 8 }}>
              <span className={`status ${status}`}>
                <i aria-hidden="true" />
                {status === "good" ? "On budget" : status === "watch" ? "Watch" : "Over budget"}
              </span>
            </div>
          </div>
        </div>
        <div className="gauge-wrap">
          <Gauge value={job.cpi} />
          <div>
            <div className="kpi-l">Cost performance</div>
            <div className="big-num" style={{ fontSize: 40 }}>{job.cpi.toFixed(2)}</div>
            <div className="small muted">1.00 or higher = on or under budget</div>
          </div>
        </div>
        <div className="chart">
          <div className="chart-title">Cost vs. budget for work done — all jobs</div>
          <div className="legend">
            <span>
              <i className="key solid" style={{ borderTopWidth: 6 }} /> Cost to date
            </span>
            <span>
              <i className="key" style={{ borderTop: "2px solid var(--ink)", width: 2, height: 12 }} /> Budget for work done
            </span>
          </div>
          <div className="bva">
            {jobs.map((j) => {
              const c = j.cpi >= 0.98 ? "var(--series-b)" : j.cpi >= 0.94 ? "var(--watch)" : "var(--risk)";
              return (
                <div className="bva-row" key={j.site} style={{ fontWeight: j.site === sel ? 700 : 400 }}>
                  <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.site}</span>
                  <span className="bva-track">
                    <span className="bva-fill" style={{ width: `${(j.cost / maxV) * 100}%`, background: c }} />
                    <span className="bva-mark" style={{ left: `${(j.earned / maxV) * 100}%` }} />
                  </span>
                  <span className="tnum small" style={{ textAlign: "right" }}>{fmt(j.over, "over")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="slot" aria-live="polite">
          {status === "good" ? (
            <div className="ok-card" key="ok">
              <Icon name="check" /> {sel} is on budget. No action needed.
            </div>
          ) : (
            <div className={`action ${status}`} key={`act-${sel}`}>
              <div className="action-ic">
                <Icon name="alert" />
              </div>
              <div>
                <div className="action-k">New action item</div>
                <div className="action-h">
                  {sel} is {fmt(job.over / job.earned, "pct")} over budget
                </div>
                <p>Review change orders before the next pay application.</p>
                <div className="action-meta">
                  <span>
                    <b>Owner:</b> Project manager
                  </span>
                  <span>
                    <b>Due:</b> This Friday
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toast text={toast} onDone={() => setToast(null)} />
    </div>
  );
}

/* ============ Tab 2: Ask Your Data ============ */

function Typed({ text, onDone }: { text: string; onDone: () => void }) {
  const [n, setN] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    const t = setInterval(() => setN((x) => Math.min(text.length, x + 3)), 16);
    return () => clearInterval(t);
  }, [text]);
  useEffect(() => {
    if (n >= text.length && !done.current) {
      done.current = true;
      onDone();
    }
  }, [n, text, onDone]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="caret" />}
    </>
  );
}

export function AskYourData({ initial = "construction" }: { initial?: IndustrySlug }) {
  const [slug, setSlug] = useState<IndustrySlug>(initial);
  const qs = useMemo(() => questionsFor(slug), [slug]);
  const [log, setLog] = useState<{ qa: QA; done: boolean; thinking: boolean }[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const busy = log.some((l) => !l.done);

  useEffect(() => setLog([]), [slug]);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  const ask = (qa: QA) => {
    setLog((l) => [...l, { qa, done: false, thinking: true }]);
    setTimeout(() => setLog((l) => l.map((x) => (x.qa === qa ? { ...x, thinking: false } : x))), 700);
  };

  const ind = industries.find((i) => i.slug === slug)!;
  const recCount = ind.sites.large.length * 12;

  return (
    <div className="ask">
      <div className="ask-top">
        <label htmlFor="ask-ind" className="small" style={{ fontWeight: 600 }}>
          Company:
        </label>
        <select id="ask-ind" className="filter-select" value={slug} onChange={(e) => setSlug(e.target.value as IndustrySlug)}>
          {industries.map((i) => (
            <option key={i.slug} value={i.slug}>
              {i.name}
            </option>
          ))}
        </select>
      </div>
      <div className="chat" ref={chatRef} aria-live="polite">
        {log.length === 0 && (
          <div className="msg a">
            {introFor(slug)}
            <span className="src">Pre-scripted demo · answers are calculated from sample data</span>
          </div>
        )}
        {log.map((l, i) => (
          <div key={i} style={{ display: "contents" }}>
            <div className="msg q">{l.qa.q}</div>
            <div className="msg a">
              {l.thinking ? (
                <span className="typing" aria-label="Thinking">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <>
                  <Typed text={l.qa.a} onDone={() => setLog((x) => x.map((y, j) => (j === i ? { ...y, done: true } : y)))} />
                  {l.done && l.qa.chart && (
                    <div className="mini-chart">
                      {(() => {
                        const vals = l.qa.chart!.map((c) => c.value);
                        const hi = Math.max(...vals);
                        const lo = Math.min(0, Math.min(...vals) - (hi - Math.min(...vals)) * 0.35);
                        return l.qa.chart!.map((c) => (
                          <div key={c.label}>
                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</span>
                            <span className="mtrack">
                              <span className={`mfill ${c.risk ? "risk" : ""}`} style={{ width: `${Math.max(4, ((c.value - lo) / (hi - lo || 1)) * 100)}%` }} />
                            </span>
                            <b className="tnum" style={{ textAlign: "right" }}>
                              {c.text}
                            </b>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                  {l.done && <span className="src">Answered from {recCount} sample records · last 12 months</span>}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="suggest">
        {qs.map((qa) => (
          <button key={qa.q} type="button" className="chip-btn" disabled={busy} onClick={() => ask(qa)}>
            {qa.q}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============ Wrapper ============ */

export default function WorkspaceDemo({ initialTab = "change", askIndustry }: { initialTab?: "change" | "ask"; askIndustry?: IndustrySlug }) {
  const [tab, setTab] = useState<"change" | "ask">(initialTab);
  return (
    <div className="wsd reveal">
      <div className="wsd-tabs" role="tablist" aria-label="Workspace demo">
        <button type="button" role="tab" className="wsd-tab" aria-selected={tab === "change"} onClick={() => setTab("change")}>
          <Icon name="spreadsheet" /> Change a Number
        </button>
        <button type="button" role="tab" className="wsd-tab" aria-selected={tab === "ask"} onClick={() => setTab("ask")}>
          <Icon name="chat" /> Ask Your Data
        </button>
        <span className="label-sample">Demo · sample data</span>
      </div>
      <div role="tabpanel">{tab === "change" ? <ChangeANumber /> : <AskYourData initial={askIndustry} />}</div>
    </div>
  );
}
