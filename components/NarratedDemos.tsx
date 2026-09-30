"use client";

/* Narrated demos: pressing the button walks through the real steps,
   one at a time, with a caption, the affected rows highlighted, and
   totals recalculated from the rows at every step. */

import Icon from "./Icon";
import { useStages, useTween } from "./useTween";
import { reports, truth, versions, type Row } from "@/lib/demo-data";
import { constructionJobs, fmt } from "@/lib/sample-data";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Tw({ v, f = money }: { v: number; f?: (n: number) => string }) {
  const x = useTween(v, 700);
  return <span className="tnum">{f(x)}</span>;
}

function Steps({ items, stage, onGo }: { items: { t: string; d: string }[]; stage: number; onGo: (i: number) => void }) {
  return (
    <ol className="nsteps">
      {items.map((it, i) => {
        const n = i + 1;
        const cls = stage > n ? "done" : stage === n ? "on" : "";
        return (
          <li key={it.t} className={cls}>
            <button type="button" onClick={() => onGo(n)}>
              <i>{stage > n ? "✓" : n}</i>
              <span>
                <b>{it.t}</b>
                <small>{it.d}</small>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Controls({ stage, last, playing, play, reset, label }: { stage: number; last: number; playing: boolean; play: () => void; reset: () => void; label: string }) {
  return (
    <div className="btn-row" style={{ marginTop: 16 }}>
      {stage === 0 && !playing ? (
        <button type="button" className="btn btn-primary" onClick={play}>
          <Icon name="play" width={15} height={15} /> {label}
        </button>
      ) : stage >= last ? (
        <button type="button" className="btn btn-secondary" onClick={reset}>
          <Icon name="refresh" width={15} height={15} /> Start over
        </button>
      ) : (
        <span className="pill navy">
          <span className="live-dot" /> Working… step {stage} of {last - 1}
        </span>
      )}
    </div>
  );
}

/* ============ Trust your numbers: three reports become one truth ============ */

const reconSteps = [
  { t: "Find duplicates", d: "Finance entered one customer twice." },
  { t: "Match names", d: "“ACME Corp.” and “Acme Corporation” are the same." },
  { t: "Add what's missing", d: "Operations hadn't entered Evergreen Foods yet." },
  { t: "Drop cancelled deals", d: "Sales still counted a deal that fell through." },
];
const reconCaption = [
  "Three departments, three different totals for the same quarter. Which one is right?",
  "Step 1 — Finance entered Brightline Health twice. We count it once.",
  "Step 2 — Operations spells two customers differently. We match them to one name.",
  "Step 3 — Operations is missing Evergreen Foods. We add it from the invoice.",
  "Step 4 — Sales still counts Fairway Partners, a deal that was cancelled. We drop it.",
  "Done. Every report now says the same thing — and a check runs on every update so it stays that way.",
];

function rowState(r: Row, st: number): { show: boolean; count: boolean; cls: string; name: string } {
  switch (r.issue) {
    case "duplicate":
      return { show: st <= 1, count: st < 1, cls: st === 1 ? "hit" : "", name: r.name };
    case "name":
      return { show: true, count: true, cls: st === 2 ? "fixing" : st > 2 ? "fixed" : "", name: st >= 2 ? r.fixTo! : r.name };
    case "missing":
      return { show: st >= 3, count: st >= 3, cls: st === 3 ? "added" : "fixed", name: r.name };
    case "cancelled":
      return { show: st <= 4, count: st < 4, cls: st === 4 ? "hit" : "", name: r.name };
    default:
      return { show: true, count: true, cls: "", name: r.name };
  }
}

export function ReconcileDemo() {
  const LAST = 5;
  const { stage, playing, play, reset, go } = useStages(LAST, 2600);
  const totals = reports.map((rep) => rep.rows.reduce((s, r) => s + (rowState(r, stage).count ? r.amount : 0), 0));
  const agree = new Set(totals).size === 1;
  return (
    <div className="demo-card narrated">
      <div className="narr-top">
        <div>
          <p className={`narr-cap ${agree ? "ok" : ""}`} key={stage}>
            {reconCaption[stage]}
          </p>
          <div className="recon">
            {reports.map((rep, i) => (
              <div className={`recon-col ${agree ? "agree-col" : ""}`} key={rep.dept}>
                <h3 className="h4">
                  {rep.dept} <span className="muted small">· {rep.system}</span>
                </h3>
                <div className="tot" style={{ color: agree ? "var(--good)" : "var(--ink)" }}>
                  <Tw v={totals[i]} />
                </div>
                {rep.rows.map((r, j) => {
                  const s = rowState(r, stage);
                  if (!s.show) return null;
                  return (
                    <div key={j} className={`recon-row ${s.cls}`}>
                      <span>{s.name}</span>
                      <span className="tnum">{fmt(r.amount, "money")}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className={`agree ${agree ? "yes" : "no"}`} key={String(agree)} style={{ marginTop: 14 }} aria-live="polite">
            <Icon name={agree ? "check" : "alert"} />
            {agree ? `All three reports agree: ${money(totals[0])} across ${truth.length} customers` : `Three reports, three totals — ${money(Math.max(...totals) - Math.min(...totals))} apart`}
          </div>
        </div>
        <Steps items={reconSteps} stage={stage} onGo={go} />
      </div>
      <Controls stage={stage} last={LAST} playing={playing} play={play} reset={reset} label="Clean & match, step by step" />
    </div>
  );
}

/* ============ Replace spreadsheets: five files become one input screen ============ */

const sheetSteps = [
  { t: "Spot the conflict", d: "Five files, five different numbers." },
  { t: "Replace the files", d: "One input screen, owned by the PM." },
  { t: "Enter it once", d: "Checked as it's typed, logged with a name." },
  { t: "Everyone sees it", d: "Owner, PM, and super see the same number." },
];
const sheetCaption = [
  "Route 9 Bridge's cost to date lives in five spreadsheets and an email. Which one is right?",
  "Step 1 — The versions disagree by thousands of dollars. Nobody knows which one the owner is looking at.",
  "Step 2 — We replace all five with one simple input screen. The files stop being the source.",
  "Step 3 — The PM enters the number once. It's checked as it's typed and logged with their name.",
  "Step 4 — The owner, the PM, and the superintendent all see the same number, right away.",
  "Done. One number, entered once, trusted by everyone.",
];

export function SpreadsheetDemo() {
  const LAST = 5;
  const { stage, playing, play, reset, go } = useStages(LAST, 2600);
  const truthCost = constructionJobs()[1].cost;
  const vs = versions.map((v) => ({ ...v, amount: (v.amount / 281150) * truthCost * 0.98 }));
  const lo = Math.min(...vs.map((v) => v.amount));
  const hi = Math.max(...vs.map((v) => v.amount));
  const typed = stage >= 3 ? truthCost : 0;
  return (
    <div className="demo-card narrated">
      <div className="narr-top">
        <div>
          <p className={`narr-cap ${stage >= 4 ? "ok" : ""}`} key={stage}>
            {sheetCaption[stage]}
          </p>
          <div className="sheet-stage">
            <div className={`sheet-files ${stage >= 2 ? "gone" : ""}`}>
              {vs.map((v, i) => (
                <div key={v.file} className={`ver ${stage === 1 && (v.amount === lo || v.amount === hi) ? "flag" : ""}`} style={{ transitionDelay: `${i * 90}ms` }}>
                  <Icon name="spreadsheet" />
                  <span>
                    <b>{v.file}</b>
                    <br />
                    <span className="small muted">Last edited by {v.who}</span>
                  </span>
                  <span className="v-num">{fmt(v.amount, "money")}</span>
                </div>
              ))}
              {stage === 1 && (
                <div className="spread" aria-live="polite">
                  <span>{fmt(lo, "money")}</span>
                  <i />
                  <span>{fmt(hi, "money")}</span>
                  <b>{fmt(hi - lo, "money")} apart</b>
                </div>
              )}
            </div>
            <div className={`sheet-screen ${stage >= 2 ? "in" : ""}`}>
              <div className="scr-bar">
                <i />
                <i />
                <i />
                <span>Update job budget</span>
              </div>
              <label className="small muted">Job</label>
              <div className="fake-in">Route 9 Bridge</div>
              <label className="small muted">Cost to date</label>
              <div className={`fake-in big ${stage === 3 ? "typing" : ""}`}>
                <Tw v={typed} />
              </div>
              {stage >= 3 && <span className="small" style={{ color: "var(--good)", fontWeight: 600 }}>✓ Checked · saved by the PM</span>}
              <div className={`viewers ${stage >= 4 ? "in" : ""}`}>
                {["Owner", "PM", "Super"].map((p) => (
                  <span key={p}>
                    <i>{p[0]}</i>
                    {p}
                    <b className="tnum">{fmt(truthCost, "money")}</b>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Steps items={sheetSteps} stage={stage} onGo={go} />
      </div>
      <Controls stage={stage} last={LAST} playing={playing} play={play} reset={reset} label="Replace the spreadsheets, step by step" />
    </div>
  );
}

/* ============ Move off old systems: table by table, checked twice ============ */

const tables = [
  { old: "CUST_MSTR", neu: "customers", rows: 4812, total: null as number | null },
  { old: "INV_HDR", neu: "invoices", rows: 61240, total: 48_214_630 },
  { old: "JOB_CST", neu: "job_costs", rows: 88305, total: 31_902_118 },
  { old: "VNDR", neu: "vendors", rows: 1963, total: null },
  { old: "TIME_ENT", neu: "timesheets", rows: 27900, total: null },
];
const fieldMap = [
  ["CUST_NM", "customer_name"],
  ["INV_AMT_TOT", "invoice_total"],
  ["JB_NO", "job_number"],
  ["DT_CRTD", "created_date"],
];
const migSteps = [
  { t: "Inventory", d: "List every table and report in the old system." },
  { t: "Map", d: "Match cryptic old fields to clear new names." },
  { t: "Move", d: "Copy table by table while the old system keeps running." },
  { t: "Verify", d: "Row counts and dollar totals must match exactly." },
  { t: "Switch off", d: "Your team moves over. The old server retires." },
];
const migCaption = [
  "An old on-premise reporting server from 2011. Five core tables, about 184,000 rows. Nobody wants to touch it.",
  "Step 1 — We list every table, what it holds, and who uses it.",
  "Step 2 — Cryptic column names become names your team understands.",
  "Step 3 — We copy one table at a time. The old system keeps running the whole time.",
  "Step 4 — Every table is counted twice: rows and dollar totals must match to the cent.",
  "Step 5 — Everything matches. The team switches over, and the old server is turned off. Nothing lost.",
];

export function MigrationDemo() {
  const LAST = 5;
  const { stage, playing, play, reset, go } = useStages(LAST, 2800);
  const total = tables.reduce((s, t) => s + t.rows, 0);
  return (
    <div className="demo-card narrated">
      <div className="narr-top">
        <div>
          <p className={`narr-cap ${stage >= 5 ? "ok" : ""}`} key={stage}>
            {migCaption[stage]}
          </p>
          <div className="mig2">
            <div className={`mig2-old ${stage >= 5 ? "off" : ""}`}>
              <h3 className="h4">
                <Icon name="database" width={17} height={17} /> Old server · 2011
              </h3>
              {tables.map((t, i) => (
                <div key={t.old} className={`tb ${stage >= 1 ? "listed" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <code>{t.old}</code>
                  <span className="tnum small">{t.rows.toLocaleString()} rows</span>
                </div>
              ))}
              {stage >= 5 && <span className="off-tag">Switched off</span>}
            </div>
            <div className="mig2-mid">
              {stage === 2 ? (
                <div className="fmap" key="map">
                  {fieldMap.map(([a, b], i) => (
                    <div key={a} style={{ animationDelay: `${i * 150}ms` }}>
                      <code>{a}</code>
                      <Icon name="arrow" width={14} height={14} />
                      <code className="n">{b}</code>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`mig-pipe ${stage === 3 ? "run" : ""}`} aria-hidden="true">
                  <i />
                </div>
              )}
            </div>
            <div className="mig2-new">
              <h3 className="h4">
                <Icon name="lock" width={17} height={17} /> Your new database
              </h3>
              {tables.map((t, i) => {
                const moved = stage >= 3;
                const verified = stage >= 4;
                return (
                  <div key={t.neu} className={`tb new ${moved ? "moved" : ""}`} style={{ ["--d" as string]: `${i * 0.35}s` }}>
                    <code>{t.neu}</code>
                    <span className="bar">
                      <i />
                    </span>
                    <span className="tnum small">{moved ? t.rows.toLocaleString() : "—"}</span>
                    {verified && (
                      <span className="vchk" title={t.total ? `$${t.total.toLocaleString()} = $${t.total.toLocaleString()}` : "rows match"}>
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {stage >= 4 && (
            <div className="verify" aria-live="polite">
              <span>
                <b className="tnum">{total.toLocaleString()}</b> rows = <b className="tnum">{total.toLocaleString()}</b> rows
              </span>
              <span>
                Invoices <b className="tnum">$48,214,630</b> = <b className="tnum">$48,214,630</b>
              </span>
              <span>
                Job costs <b className="tnum">$31,902,118</b> = <b className="tnum">$31,902,118</b>
              </span>
            </div>
          )}
        </div>
        <Steps items={migSteps} stage={stage} onGo={go} />
      </div>
      <Controls stage={stage} last={LAST} playing={playing} play={play} reset={reset} label="Run the migration, step by step" />
      <p className="small muted" style={{ marginTop: 10 }}>
        Sample data.
      </p>
    </div>
  );
}
