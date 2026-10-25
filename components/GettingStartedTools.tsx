"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "./Icon";
import { Dots } from "./ui";
import { effort, readinessLevels } from "@/content/effort";
import { engineering, sizes, tiers, money } from "@/content/tiers";

/* ---------------- Readiness quiz ---------------- */

const questions = [
  { q: "Where does most of your data live?", options: ["Mostly spreadsheets", "A few business apps", "Many systems", "A data warehouse already"] },
  { q: "How many different tools or files hold important numbers?", options: ["20+", "9–20", "4–8", "1–3"] },
  { q: "Do your reports from different teams agree?", options: ["Rarely", "Sometimes", "Usually", "Always"] },
  { q: "How long does it take to get a basic report?", options: ["Days", "Hours", "Minutes", "Instant"] },
  { q: "Do you have an IT or data team?", options: ["No", "One person", "A team", "A large department"] },
];

/* Questions 1–4 score readiness (0–3 each). Question 5 picks the path. */
function levelFrom(answers: (number | null)[]) {
  const s = answers.slice(0, 4).reduce<number>((a, b) => a + (b ?? 0), 0);
  return s <= 2 ? 1 : s <= 5 ? 2 : s <= 8 ? 3 : s <= 10 ? 4 : 5;
}

function Meter({ level, done, answered }: { level: number; done: boolean; answered: number }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const frac = done ? level / 5 : 0;
  /* A ring of "data dust" that lights up and turns from coral to green as readiness rises. */
  const N = 40;
  const lit = done ? level / 5 : (answered / 5) * 0.6;
  const chaos = [224, 122, 95];
  const green = [87, 204, 153];
  const mix = (k: number) => `rgb(${chaos.map((v, i) => Math.round(v + (green[i] - v) * k)).join(",")})`;
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" role="img" aria-label={done ? `Readiness level ${level} of 5` : "Readiness meter"}>
      <defs>
        <linearGradient id="meterGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#E07A5F" />
          <stop offset="55%" stopColor="#38A3A5" />
          <stop offset="100%" stopColor="#57CC99" />
        </linearGradient>
      </defs>
      <g className="meter-dots">
        {Array.from({ length: N }, (_, i) => {
          const a = (i / N) * Math.PI * 2 - Math.PI / 2;
          const on = i / N < lit;
          return (
            <circle
              key={i}
              cx={(100 + Math.cos(a) * 90).toFixed(2)}
              cy={(100 + Math.sin(a) * 90).toFixed(2)}
              r={on ? 3.2 : 2}
              fill={on ? mix(i / N) : "var(--gray-200)"}
              style={{ transition: "all .5s", transitionDelay: `${i * 12}ms` }}
            />
          );
        })}
      </g>
      <circle cx="100" cy="100" r={r} fill="none" stroke="var(--gray-100)" strokeWidth="14" />
      <circle
        cx="100"
        cy="100"
        r={r}
        fill="none"
        stroke="url(#meterGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeOpacity={frac ? 1 : 0}
        strokeDasharray={`${c * frac} ${c}`}
        transform="rotate(-90 100 100)"
        style={{ transition: "stroke-dasharray .8s cubic-bezier(.2,.7,.2,1)" }}
      />
      <text x="100" y="96" textAnchor="middle" fill="var(--ink)" fontSize="40" fontWeight="700">
        {done ? level : "?"}
      </text>
      <text x="100" y="120" textAnchor="middle" fill="var(--text-3)" fontSize="12" fontWeight="600" letterSpacing="1">
        OF 5
      </text>
    </svg>
  );
}

/* ---------------- Estimator ---------------- */

type Loc = "ours" | "yours" | "unsure";
type Timing = "asap" | "soon" | "exploring";
/* where most of the data lives today (Operating Decisions v2.2, §2) */
type Where = "systems" | "sheets" | "somePaper" | "paper";
type Volume = "small" | "mid" | "big";

const whereOpts: [Where, string][] = [
  ["systems", "In business systems"],
  ["sheets", "Spreadsheets"],
  ["somePaper", "Some on paper"],
  ["paper", "Mostly paper"],
];
const volumeOpts: [Volume, string][] = [
  ["small", "Under 1 million"],
  ["mid", "1–10 million"],
  ["big", "Over 10 million"],
];

function estimate(employees: number, sources: number, users: number, loc: Loc, spreadsheets: boolean) {
  let tierId: "insight" | "operate" | "command";
  if (loc === "yours") tierId = "command";
  /* size is set by the data (sources and users), not by headcount */
  else if (sources <= 3 && users <= 15) tierId = "insight";
  else if (sources <= 8 && users <= 50) tierId = "operate";
  else tierId = "command";
  const path = effort[tierId === "insight" ? 0 : tierId === "operate" ? 1 : 2];
  const base = {
    insight: { setup: [7500, 12000], monthly: [2500, 3500], weeks: [2, 3] },
    operate: { setup: [15000, 35000], monthly: [4000, 7000], weeks: [4, 6] },
    command: { setup: [40000, 150000], monthly: [10000, 18000], weeks: [6, 10] },
  }[tierId];
  const bump = spreadsheets ? 1.2 : 1;
  const setup = [Math.round((base.setup[0] * bump) / 500) * 500, Math.round((base.setup[1] * bump) / 500) * 500];
  const weeks = spreadsheets ? [base.weeks[0] + 1, base.weeks[1] + 2] : base.weeks;
  return { tier: tiers.find((t) => t.id === tierId)!, path, setup, monthly: base.monthly, weeks, openEnded: tierId === "command" };
}

export default function GettingStartedTools() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const answered = answers.filter((a) => a !== null).length;
  const quizDone = answered === 5;
  const level = levelFrom(answers);
  const lvl = readinessLevels[level - 1];

  const [employees, setEmployees] = useState(40);
  const [sources, setSources] = useState(3);
  const [users, setUsers] = useState(12);
  const [loc, setLoc] = useState<Loc>("ours");
  const [timing, setTiming] = useState<Timing>("soon");
  const [whereSel, setWhere] = useState<Where | null>(null);
  const [volume, setVolume] = useState<Volume>("small");

  /* Until the visitor picks, the quiz sets it: Level 1 means mostly spreadsheets. */
  const where: Where = whereSel ?? (quizDone ? (level === 1 ? "sheets" : "systems") : "sheets");
  const fromQuiz = whereSel === null && quizDone;
  const spreadsheets = where === "sheets";
  const paperOnly = where === "paper";
  const est = useMemo(() => estimate(employees, sources, users, loc, spreadsheets), [employees, sources, users, loc, spreadsheets]);

  const contactHref = useMemo(() => {
    const q = new URLSearchParams({
      from: "estimator",
      tier: est.tier.name,
      employees: String(employees),
      sources: String(sources),
      users: String(users),
      location: loc,
      timing,
      where: whereOpts.find(([v]) => v === where)![1],
      volume: volumeOpts.find(([v]) => v === volume)![1],
      estimate: `${money(est.setup[0])}–${money(est.setup[1])}${est.openEnded ? "+" : ""} setup; ${money(est.monthly[0])}${est.openEnded ? "+" : "–" + money(est.monthly[1])}/mo`,
    });
    if (paperOnly) q.set("estimate", "Mostly paper: talk first (Engineering before Foundation)");
    if (quizDone) q.set("readiness", `Level ${level} — ${lvl.name}`);
    return `/contact?${q.toString()}`;
  }, [est, employees, sources, users, loc, timing, quizDone, level, lvl.name, where, volume, paperOnly]);

  const setAnswer = (qi: number, oi: number) => setAnswers((a) => a.map((x, i) => (i === qi ? oi : x)));

  return (
    <>
      {/* QUIZ */}
      <section className="section soft" id="quiz">
        <div className="container split">
          <div>
            <span className="eyebrow">Readiness quiz · 5 questions</span>
            <h2 style={{ margin: "14px 0 16px" }}>
              How big of a problem is <em className="accent">your</em> data?
            </h2>
            <p className="lead">Five questions. See where you stand.</p>
            <div className="meter-box">
              <Meter level={level} done={quizDone} answered={answered} />
              <div aria-live="polite">
                {quizDone ? (
                  <>
                    <div className="pill">
                      Level {level} · {lvl.name}
                    </div>
                    <p style={{ marginTop: 12 }}>{lvl.looks}</p>
                    <p style={{ marginTop: 8 }} className="muted">
                      <strong style={{ color: "var(--ink)" }}>What it takes:</strong> {lvl.takes}
                    </p>
                    <p style={{ marginTop: 8 }} className="muted">
                      <strong style={{ color: "var(--ink)" }}>Recommended path:</strong>{" "}
                      {(answers[4] ?? 0) >= 2 ? (
                        <Link href="/solutions/enterprise">Larger organizations</Link>
                      ) : (
                        <Link href="/solutions/small-business">Small & growing businesses</Link>
                      )}
                    </p>
                  </>
                ) : (
                  <p className="muted">
                    {answered} of 5 answered. {5 - answered} to go.
                  </p>
                )}
              </div>
            </div>
          </div>
          <ol className="quiz">
            {questions.map((q, qi) => (
              <li key={q.q}>
                <fieldset>
                  <legend>
                    <span className="qn">{qi + 1}</span>
                    {q.q}
                  </legend>
                  <div className="opts">
                    {q.options.map((o, oi) => (
                      <label key={o} className={answers[qi] === oi ? "on" : ""}>
                        <input type="radio" name={`q${qi}`} checked={answers[qi] === oi} onChange={() => setAnswer(qi, oi)} />
                        {o}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="section" id="estimator">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Cost & timeline estimator</span>
            <h2>Your estimate, in about 60 seconds.</h2>
            <p className="lead">Move the sliders. It updates instantly.</p>
          </div>
          <div className="est">
            <form className="card form est-in" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label htmlFor="emp">
                  Company size: <b className="tnum">{employees >= 2000 ? "2,000+" : employees.toLocaleString()}</b> employees
                </label>
                <input id="emp" type="range" min={5} max={2000} step={5} value={employees} onChange={(e) => setEmployees(+e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="src">
                  Data sources to connect: <b className="tnum">{sources >= 25 ? "25+" : sources}</b>
                </label>
                <input id="src" type="range" min={1} max={25} value={sources} onChange={(e) => setSources(+e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="usr">
                  People who need access: <b className="tnum">{users >= 300 ? "300+" : users}</b>
                </label>
                <input id="usr" type="range" min={1} max={300} value={users} onChange={(e) => setUsers(+e.target.value)} />
              </div>
              <div className="field">
                <span className="lbl">Where should your data live?</span>
                <div className="seg" role="group" aria-label="Where should your data live">
                  {(
                    [
                      ["ours", "numarket hosts it"],
                      ["yours", "Our own cloud"],
                      ["unsure", "Not sure"],
                    ] as [Loc, string][]
                  ).map(([v, l]) => (
                    <button key={v} type="button" aria-pressed={loc === v} onClick={() => setLoc(v)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <span className="lbl">How soon?</span>
                <div className="seg" role="group" aria-label="How soon">
                  {(
                    [
                      ["asap", "ASAP"],
                      ["soon", "1–3 months"],
                      ["exploring", "Exploring"],
                    ] as [Timing, string][]
                  ).map(([v, l]) => (
                    <button key={v} type="button" aria-pressed={timing === v} onClick={() => setTiming(v)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <span className="lbl">
                  Where is most of your data today?
                  {fromQuiz && <em className="muted small"> (set by your quiz: Level {level})</em>}
                </span>
                <div className="seg seg-wrap" role="group" aria-label="Where is most of your data today">
                  {whereOpts.map(([v, l]) => (
                    <button key={v} type="button" aria-pressed={where === v} onClick={() => setWhere(v)}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <span className="lbl">Records in your biggest system</span>
                <div className="seg" role="group" aria-label="Records in your biggest system">
                  {volumeOpts.map(([v, l]) => (
                    <button key={v} type="button" aria-pressed={volume === v} onClick={() => setVolume(v)}>
                      {l}
                    </button>
                  ))}
                </div>
                <span className="small muted">Every invoice line, timesheet entry, or transaction counts as one. A guess is fine.</span>
              </div>
            </form>

            {paperOnly ? (
              <div className="est-out est-talk" aria-live="polite">
                <div className="est-top">
                  <span className="eyebrow">Let&apos;s talk first</span>
                  <h3>Start by getting the paper into a system.</h3>
                  <p>
                    Foundation cleans data that&apos;s already digital, so a price for it now wouldn&apos;t mean much. The first step is an Engineering project: a phone
                    form, or scanning what you already have. Once the data is digital, Foundation is priced by how many sources you have.
                  </p>
                </div>
                <ul className="check-list">
                  <li>
                    <Icon name="check" />
                    <span>A fixed quote for getting from paper to digital, from {money(engineering.from)}</span>
                  </li>
                  <li>
                    <Icon name="check" />
                    <span>We start with the one or two forms behind your most important numbers</span>
                  </li>
                  <li>
                    <Icon name="check" />
                    <span>Then Foundation, Workspace, and Insight Review, when you&apos;re ready</span>
                  </li>
                </ul>
                <p className="small">
                  <Link href="/solutions/paper-to-digital">See how paper to digital works →</Link>
                </p>
                <Link href={contactHref} className="btn btn-primary">
                  Book a Readiness Check <Icon name="arrow" className="arrow" width={16} height={16} />
                </Link>
              </div>
            ) : (
            <div className="est-out" aria-live="polite">
              {volume === "big" && (
                <p className="est-flag">
                  <Icon name="alert" width={16} height={16} /> Scoping call recommended. Over 10 million records needs a short call to plan updates and price it correctly. It
                  often fits the Large size.
                </p>
              )}
              <div className="est-top">
                <span className="eyebrow">Recommended</span>
                <h3>
                  {sizes.find((s) => s.id === est.tier.size)!.name} · all three products
                </h3>
                <p>
                  {est.tier.bestFor}. Includes Foundation, Workspace, and Insight Review. <Link href="/pricing">Fewer products? Build your price →</Link>
                </p>
              </div>
              <dl className="est-grid">
                <div>
                  <dt>Difficulty for you</dt>
                  <dd>
                    <Dots n={est.path.difficulty} /> {est.path.difficultyLabel}
                  </dd>
                </div>
                <div>
                  <dt>Your time required</dt>
                  <dd>{est.path.timeRequired}</dd>
                </div>
                <div>
                  <dt>Time to first dashboard</dt>
                  <dd>
                    {est.weeks[0]}–{est.weeks[1]} weeks
                  </dd>
                </div>
                <div>
                  <dt>Estimated setup</dt>
                  <dd className="tnum">
                    {money(est.setup[0])}–{money(est.setup[1])}
                    {est.openEnded && "+"}
                  </dd>
                </div>
                <div>
                  <dt>Estimated monthly</dt>
                  <dd className="tnum">{est.openEnded ? `${money(est.monthly[0])}+` : `${money(est.monthly[0])}–${money(est.monthly[1])}`}</dd>
                </div>
                <div>
                  <dt>Who's involved on your side</dt>
                  <dd>{est.path.whoInvolved}</dd>
                </div>
              </dl>
              <div>
                <p className="flow-h" style={{ color: "var(--text-2)" }}>
                  What we&apos;ll need from you
                </p>
                <ul className="check-list">
                  {est.path.checklist.map((c) => (
                    <li key={c}>
                      <Icon name="check" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="small muted">
                {loc === "yours" && "Building in your own cloud is by request on Large. "}
                {spreadsheets && "Includes +20% setup and 1–2 extra weeks because the data starts in spreadsheets. "}
                {where === "somePaper" && "Covers the data that's already digital. Getting the paper part into a system is quoted separately as an Engineering project. "}
                Estimate only. Your Readiness Check gives you a fixed quote.
              </p>
              <Link href={contactHref} className="btn btn-primary">
                Book my Readiness Check with this estimate <Icon name="arrow" className="arrow" width={16} height={16} />
              </Link>
            </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
