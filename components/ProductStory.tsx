"use client";

import ScrollStory from "./ScrollStory";
import Icon from "./Icon";
import type { ProductKind } from "./ProductArt";

/* ---------- a small data map: sources → hub → two outputs ---------- */
function MapViz({ s, sources, hub, outs, tint }: { s: number; sources: string[]; hub: [string, string]; outs: [string, string][]; tint: string }) {
  const gap = 420 / (sources.length + 1);
  const scatter = [
    [-30, -24, -8],
    [36, 28, 7],
    [-12, 44, -11],
    [28, -36, 9],
  ];
  return (
    <svg className="dmap" data-s={[0, 1, 2, 4][s] ?? 4} viewBox="0 0 640 420" role="img" aria-label={`Step ${s + 1}`} style={{ ["--tint" as string]: tint }}>
      {sources.map((_, i) => (
        <path key={`l${i}`} className="link" d={`M 190 ${gap * (i + 1)} C 250 ${gap * (i + 1)}, 250 210, 290 210`} />
      ))}
      <path className="olink" d="M 390 210 C 430 210, 430 130, 450 130" />
      <path className="olink" d="M 390 210 C 430 210, 430 290, 450 290" />
      {sources.map((name, i) => {
        const [dx, dy, dr] = scatter[i % 4];
        return (
          <g key={name} className="src" style={{ ["--dx" as string]: `${dx}px`, ["--dy" as string]: `${dy}px`, ["--dr" as string]: `${dr}deg`, transformBox: "fill-box", transformOrigin: "center" }}>
            <rect x="14" y={gap * (i + 1) - 20} width="176" height="40" rx="10" />
            <text x="30" y={gap * (i + 1) + 5}>
              {name}
            </text>
          </g>
        );
      })}
      <g className="hub">
        <rect x="290" y="170" width="100" height="80" rx="16" />
        <text x="340" y="206" textAnchor="middle">
          {hub[0]}
        </text>
        <text x="340" y="224" textAnchor="middle">
          {hub[1]}
        </text>
      </g>
      {outs.map(([a, b], i) => (
        <g key={a} className={`out ${i === 0 ? "" : "save"}`}>
          <rect x="450" y={i === 0 ? 92 : 252} width="182" height="76" rx="12" />
          <text x="464" y={i === 0 ? 122 : 282}>
            {a}
          </text>
          <text x="464" y={i === 0 ? 146 : 306} className="sub">
            {b}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- a 3D stack of app screens that flips to the active one ---------- */
const screens = [
  { t: "Dashboard", body: <div className="scr-bars"><i style={{ height: "45%" }} /><i style={{ height: "70%" }} /><i style={{ height: "58%" }} /><i style={{ height: "88%" }} /><i style={{ height: "64%" }} /></div> },
  { t: "Update job budget", body: <div className="scr-form"><span /><span /><span className="btnish">Save</span></div> },
  { t: "Ask Your Data", body: <div className="scr-chat"><span className="q">Which jobs are over budget?</span><span className="a">2 jobs · $1.10M over</span></div> },
  { t: "Alert", body: <div className="scr-alert"><b>Budget line crossed</b><span>Route 9 Bridge · sent to PM</span></div> },
];
const engScreens = [
  {
    t: "Crew scheduler",
    body: (
      <div className="scr-list">
        <span>
          <b>Framing crew</b> → Route 9 Bridge
        </span>
        <span>
          <b>Concrete crew</b> → Terminal Expansion
        </span>
        <span className="hl">Labor $10,780 · finishes Mon, Oct 12</span>
      </div>
    ),
  },
  {
    t: "Change orders → QuickBooks",
    body: (
      <div className="scr-list">
        <span>
          <b>CO-117 approved</b> · $42,750
        </span>
        <span>Sent to QuickBooks · 9:14</span>
        <span className="hl">Posted ✓ · job budget updated</span>
      </div>
    ),
  },
  {
    t: "Estimate builder",
    body: (
      <div className="scr-list">
        <span>
          <b>12,000 sq ft</b> · Standard · 15% margin
        </span>
        <span>From 4 past jobs · $245/sq ft</span>
        <span className="hl">Price $3.46M</span>
      </div>
    ),
  },
  {
    t: "Owner portal",
    body: (
      <div className="scr-list">
        <span>
          <b>Route 9 Bridge</b> · 62% complete
        </span>
        <span>Next: Dried in</span>
        <span className="hl">On track · updated this morning</span>
      </div>
    ),
  },
];

function ScreenViz({ s, list = screens }: { s: number; list?: typeof screens }) {
  return (
    <div className="scr-stage" aria-hidden="true">
      {list.map((sc, i) => {
        const d = i - s;
        return (
          <div key={sc.t} className={`scr ${d === 0 ? "on" : ""}`} style={{ ["--d" as string]: d }}>
            <div className="scr-bar">
              <i />
              <i />
              <i />
              <span>{sc.t}</span>
            </div>
            {sc.body}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- review cards that build up ---------- */
function CardsViz({ s }: { s: number }) {
  const cards = [
    { k: "What changed", v: "Northside wait time: 27.6 min (target 15)", c: "var(--risk)" },
    { k: "Why", v: "Northside filled 90.7% of shifts", c: "var(--watch)" },
    { k: "Action item", v: "Add 6 per-diem shifts · Nurse mgr · Mon", c: "var(--p-insight)" },
    { k: "Follow-up", v: "Next review: wait time back under 20 min ✓", c: "var(--good)" },
  ];
  return (
    <div className="cards-viz" aria-hidden="true">
      {cards.map((c, i) => (
        <div key={c.k} className={`cv ${i <= s ? "in" : ""} ${i === s ? "on" : ""}`} style={{ ["--cc" as string]: c.c, ["--i" as string]: i }}>
          <span className="cv-k">{c.k}</span>
          <b>{c.v}</b>
          {i === 2 && <Icon name="check" className="cv-check" />}
        </div>
      ))}
    </div>
  );
}

const stories: Record<Exclude<ProductKind, "platform">, { steps: { eyebrow: string; title: string; body: string }[] }> = {
  foundation: {
    steps: [
      { eyebrow: "Find", title: "We find every source.", body: "Spreadsheets, accounting, project tools, files in email." },
      { eyebrow: "Connect", title: "We connect them, read-only.", body: "Automatic updates. Nothing changes in your tools." },
      { eyebrow: "Clean", title: "Names match. Duplicates go.", body: "Checks run on every update. Bad rows never reach a dashboard." },
      { eyebrow: "Secure", title: "Locked in your own database.", body: "Encrypted, private, and yours to keep." },
    ],
  },
  workspace: {
    steps: [
      { eyebrow: "See", title: "Dashboards that update automatically.", body: "The numbers each person needs, updated on their own." },
      { eyebrow: "Enter", title: "Input screens.", body: "Your team types it once. No more emailed spreadsheets." },
      { eyebrow: "Ask", title: "Ask Your Data.", body: "Plain-English questions, answered from your numbers." },
      { eyebrow: "Alert", title: "Alerts.", body: "Told as soon as the next update shows a problem." },
    ],
  },
  insight: {
    steps: [
      { eyebrow: "1", title: "What changed.", body: "Your analyst starts with the few numbers that moved." },
      { eyebrow: "2", title: "Why it changed.", body: "Traced to the cause — a site, a shift, a supplier." },
      { eyebrow: "3", title: "What to do.", body: "An action item with an owner and a date." },
      { eyebrow: "4", title: "Did it work?", body: "Next review checks the result. Nothing falls through." },
    ],
  },
  engineering: {
    steps: [
      { eyebrow: "App 1 · Scheduler", title: "Schedule crews against the budget.", body: "Drag a crew onto a job and see labor cost and finish date before you commit. Built around one company's crews, rates, and jobs." },
      { eyebrow: "App 2 · Write-back", title: "Approved change orders post themselves.", body: "Approve once in the app. It posts to QuickBooks and the job budget updates. Nobody types it twice." },
      { eyebrow: "App 3 · Estimate builder", title: "Bids from your own past jobs.", body: "Pick the size and complexity. The price comes from what similar jobs really cost you, not a blank spreadsheet." },
      { eyebrow: "App 4 · Client portal", title: "Customers check status themselves.", body: "A branded page where each owner sees progress and the next milestone — straight from your clean data." },
    ],
  },
};

export default function ProductStory({ kind }: { kind: Exclude<ProductKind, "platform"> }) {
  const st = stories[kind];
  const visual = (a: number) => {
    if (kind === "foundation")
      return <MapViz s={a} tint="var(--p-foundation)" sources={["Spreadsheets", "Accounting", "Project tools", "Email files"]} hub={["Your", "database"]} outs={[["One clean database", "documented, refreshed"], ["Encrypted & private", "yours to keep"]]} />;
    if (kind === "engineering") return <ScreenViz s={a} list={engScreens} />;
    if (kind === "workspace") return <ScreenViz s={a} />;
    return <CardsViz s={a} />;
  };
  return <ScrollStory steps={st.steps.map((x) => ({ eyebrow: x.eyebrow, title: x.title, body: <p>{x.body}</p> }))} visual={visual} />;
}
