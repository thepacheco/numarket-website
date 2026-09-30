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
function ScreenViz({ s }: { s: number }) {
  return (
    <div className="scr-stage" aria-hidden="true">
      {screens.map((sc, i) => {
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
      { eyebrow: "Map", title: "Every old table, mapped.", body: "Old field names matched to clear new ones." },
      { eyebrow: "Move", title: "Moved in batches.", body: "The old system keeps running while we copy." },
      { eyebrow: "Check", title: "Counted twice.", body: "Rows and totals must match before anything switches." },
      { eyebrow: "Switch", title: "Switch off the old one.", body: "Your team moves over. Nothing lost." },
    ],
  },
};

export default function ProductStory({ kind }: { kind: Exclude<ProductKind, "platform"> }) {
  const st = stories[kind];
  const visual = (a: number) => {
    if (kind === "foundation")
      return <MapViz s={a} tint="var(--p-foundation)" sources={["Spreadsheets", "Accounting", "Project tools", "Email files"]} hub={["Your", "database"]} outs={[["One clean database", "documented, refreshed"], ["Encrypted & private", "yours to keep"]]} />;
    if (kind === "engineering")
      return <MapViz s={a} tint="var(--p-engineering)" sources={["Old ERP tables", "Legacy reports", "Access database", "Archive files"]} hub={["New", "database"]} outs={[["184,220 rows", "mapped and moved"], ["Counts match ✓", "safe to switch"]]} />;
    if (kind === "workspace") return <ScreenViz s={a} />;
    return <CardsViz s={a} />;
  };
  return <ScrollStory steps={st.steps.map((x) => ({ eyebrow: x.eyebrow, title: x.title, body: <p>{x.body}</p> }))} visual={visual} />;
}
