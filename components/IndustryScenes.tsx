/* One animated scene per industry, shown when the scroll story reaches
   "the leak shows up" (fixed = false) and "fix a slice" (fixed = true). */

import type React from "react";
import type { IndustrySlug } from "@/content/industries";

type P = { fixed: boolean; a: string; b: string };

function Tag({ x, y, text, tone }: { x: number; y: number; text: string; tone: "bad" | "good" }) {
  const w = text.length * 7.6 + 24;
  return (
    <g className={`itag ${tone}`} transform={`translate(${x},${y})`}>
      <rect width={w} height="30" rx="15" />
      <text x={w / 2} y="20" textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

function Logistics({ fixed, a, b }: P) {
  const road = "M 90 300 C 220 300, 240 150, 360 150 S 520 150, 560 250";
  return (
    <>
      <path d={road} className="road" />
      <path d={road} className="road-dash" />
      <g transform="translate(40,262)">
        <rect width="92" height="64" rx="8" className="bld" />
        <text x="46" y="84" textAnchor="middle" className="lbl">
          Terminal
        </text>
      </g>
      <g transform="translate(520,210)">
        <rect width="86" height="64" rx="8" className="bld alt" />
        <text x="43" y="84" textAnchor="middle" className="lbl">
          Customer
        </text>
      </g>
      <g className="truck">
        <g transform="translate(-34,-26)">
          <rect x="0" y="4" width="46" height="26" rx="4" className={`trailer ${fixed ? "full" : "cycle"}`} />
          <rect x="48" y="12" width="20" height="18" rx="4" className="cab" />
          <circle cx="12" cy="33" r="5" className="wheel" />
          <circle cx="36" cy="33" r="5" className="wheel" />
          <circle cx="60" cy="33" r="5" className="wheel" />
        </g>
        <animateMotion dur="7s" repeatCount="indefinite" keyPoints="0;1;1;0;0" keyTimes="0;0.42;0.5;0.92;1" calcMode="linear" path={road} rotate="auto" />
      </g>
      {fixed ? <Tag x={236} y={60} text="Backhaul booked · loaded both ways" tone="good" /> : <Tag x={250} y={60} text="Empty on the way back" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function Construction({ fixed, a, b }: P) {
  return (
    <>
      <line x1="60" y1="360" x2="600" y2="360" className="ground" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="110" y={320 - i * 42} width="180" height="38" rx="3" className="floor" style={{ animationDelay: `${i * 0.35}s` }} />
      ))}
      <line x1="300" y1="80" x2="300" y2="360" className="crane" />
      <line x1="300" y1="84" x2="210" y2="84" className="crane" />
      <g transform="translate(400,0)">
        <text x="0" y="110" className="lbl">
          Budget
        </text>
        <rect x="0" y="120" width="170" height="22" rx="5" className="bar-bg" />
        <rect x="0" y="120" width="150" height="22" rx="5" className="bar-budget" />
        <text x="0" y="180" className="lbl">
          Actual cost
        </text>
        <rect x="0" y="190" width="170" height="22" rx="5" className="bar-bg" />
        <rect x="0" y="190" width={fixed ? 140 : 170} height="22" rx="5" className={`bar-actual ${fixed ? "ok" : "over"}`} />
        <line x1="150" y1="112" x2="150" y2="222" className="budget-line" />
      </g>
      {fixed ? <Tag x={340} y={250} text="Caught in week 2 · on budget" tone="good" /> : <Tag x={340} y={250} text="Over budget · found at month-end" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function Manufacturing({ fixed, a, b }: P) {
  return (
    <>
      <rect x="60" y="250" width="520" height="16" rx="8" className="belt" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <circle key={i} cx={80 + i * 60} cy="258" r="6" className="roller" />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="-40" y="212" width="36" height="36" rx="5" className={`box ${fixed ? "run" : "stall"}`} style={{ animationDelay: `${i * 1.1}s` }} />
      ))}
      <g transform="translate(300,120)">
        <rect x="-18" y="0" width="36" height="70" rx="8" className="light-house" />
        <circle cx="0" cy="18" r="10" className={`lamp red ${fixed ? "" : "blink"}`} />
        <circle cx="0" cy="48" r="10" className={`lamp green ${fixed ? "on" : ""}`} />
      </g>
      {fixed ? <Tag x={210} y={320} text="Changeovers planned · line running" tone="good" /> : <Tag x={220} y={320} text="Stopped again · breakdown" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function Food({ fixed, a, b }: P) {
  const extras = fixed ? 1 : 4;
  return (
    <>
      <text x="80" y="110" className="lbl">
        Made today
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} className="plate" style={{ animationDelay: `${i * 0.12}s` }} transform={`translate(${90 + (i % 5) * 58},${140 + Math.floor(i / 5) * 58})`}>
          <ellipse rx="22" ry="10" className={i >= 10 - extras ? "extra" : "served"} />
        </g>
      ))}
      <g transform="translate(470,210)">
        <path d="M 0 0 L 90 0 L 80 90 L 10 90 Z" className="bin" />
        <text x="45" y="116" textAnchor="middle" className="lbl">
          Waste
        </text>
        {Array.from({ length: extras }, (_, i) => (
          <ellipse key={i} cx={45} cy={70 - i * 12} rx="20" ry="7" className="extra drop" style={{ animationDelay: `${0.6 + i * 0.3}s` }} />
        ))}
      </g>
      {fixed ? <Tag x={80} y={300} text="Made to tomorrow's real demand" tone="good" /> : <Tag x={80} y={300} text={`${extras} of 10 trays never served`} tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function Healthcare({ fixed, a, b }: P) {
  const denied = fixed ? [6] : [1, 4, 6, 9];
  const reasons = ["Missing authorization", "Wrong code", "Eligibility", "Missing authorization"];
  return (
    <>
      <text x="60" y="96" className="lbl">
        Claims sent this week
      </text>
      {Array.from({ length: 10 }, (_, i) => {
        const bad = denied.includes(i);
        return (
          <g key={i} transform={`translate(${60 + (i % 5) * 58},${110 + Math.floor(i / 5) * 70})`}>
            <rect width="44" height="56" rx="6" className={`shift ${bad ? "empty" : "filled"}`} style={{ animationDelay: `${i * 0.06}s` }} />
            <line x1="9" y1="16" x2="35" y2="16" className="claim-line" />
            <line x1="9" y1="26" x2="30" y2="26" className="claim-line" />
            <text x="22" y="46" textAnchor="middle" className={`claim-mark ${bad ? "bad" : "good"}`}>
              {bad ? "✕" : "✓"}
            </text>
          </g>
        );
      })}
      <text x="400" y="96" className="lbl">
        Why they came back
      </text>
      {(fixed ? ["Caught before sending"] : reasons).map((r, i) => (
        <g key={r + i} transform={`translate(400,${112 + i * 34})`} className="claim-row" style={{ animationDelay: `${i * 0.2}s` }}>
          <rect width="170" height="26" rx="13" className={`claim-reason ${fixed ? "good" : "bad"}`} />
          <text x="85" y="17" textAnchor="middle" className="claim-reason-t">
            {r}
          </text>
        </g>
      ))}
      {fixed ? <Tag x={60} y={290} text="Checked before they go out · paid" tone="good" /> : <Tag x={60} y={290} text="4 of 10 denied · money earned, not paid" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function Utilities({ fixed, a, b }: P) {
  const nodes = [
    [140, 150],
    [320, 110],
    [500, 150],
    [220, 280],
    [420, 280],
  ];
  const links = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [4, 2],
    [1, 3],
    [1, 4],
  ];
  return (
    <>
      {links.map(([p, q], i) => (
        <line key={i} x1={nodes[p][0]} y1={nodes[p][1]} x2={nodes[q][0]} y2={nodes[q][1]} className={`wire ${!fixed && (p === 3 || q === 3) ? "dead" : ""}`} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <circle r="26" className={`district ${!fixed && i === 3 ? "out" : ""}`} />
          <path d="M-4 -12 L6 -2 L0 -2 L4 12 L-6 0 L0 0 Z" className="bolt" />
        </g>
      ))}
      {fixed ? <Tag x={180} y={345} text="Crews on planned work · all lit" tone="good" /> : <Tag x={170} y={345} text="South District out · crews idle" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function ProfServices({ fixed, a, b }: P) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <>
      <text x="60" y="96" className="lbl">
        One person's week
      </text>
      {days.map((d, i) => (
        <g key={d} transform={`translate(60,${120 + i * 44})`}>
          <text x="0" y="22" className="lbl">
            {d}
          </text>
          <rect x="50" y="4" width={280} height="26" rx="6" className="hrs billed" />
          <rect x={330} y="4" width={i % 2 ? 70 : 40} height="26" rx="6" className={`hrs ${fixed ? "billed rec" : "unbilled fall"}`} style={{ animationDelay: `${i * 0.3}s` }} />
        </g>
      ))}
      {fixed ? <Tag x={330} y={60} text="Time entered · billed" tone="good" /> : <Tag x={330} y={60} text="Worked · never billed" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

function RealEstate({ fixed, a, b }: P) {
  const vacant = fixed ? [9] : [2, 5, 9, 14, 17];
  return (
    <>
      <rect x="180" y="80" width="280" height="290" rx="6" className="facade" />
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={200 + (i % 4) * 64} y={100 + Math.floor(i / 4) * 52} width="44" height="34" rx="4" className={`win ${vacant.includes(i) ? "dark" : "lit"}`} style={{ animationDelay: `${i * 0.05}s` }} />
      ))}
      <rect x="296" y="330" width="48" height="40" rx="4" className="door" />
      {!fixed && (
        <g transform="translate(480,250)" className="sign">
          <line x1="0" y1="0" x2="0" y2="110" className="post" />
          <rect x="-4" y="-10" width="96" height="44" rx="6" />
          <text x="44" y="18" textAnchor="middle">
            FOR RENT
          </text>
        </g>
      )}
      {fixed ? <Tag x={180} y={386} text="Renewals started 90 days out" tone="good" /> : <Tag x={186} y={386} text="5 units empty this month" tone="bad" />}
      <Tag x={20} y={20} text={fixed ? b : a} tone={fixed ? "good" : "bad"} />
    </>
  );
}

const scenes: Record<IndustrySlug, (p: P) => React.ReactNode> = {
  logistics: Logistics,
  construction: Construction,
  manufacturing: Manufacturing,
  "food-production": Food,
  healthcare: Healthcare,
  utilities: Utilities,
  "professional-services": ProfServices,
  "real-estate": RealEstate,
};

export default function IndustryScene({ slug, fixed, leakText, fixText }: { slug: IndustrySlug; fixed: boolean; leakText: string; fixText: string }) {
  const S = scenes[slug];
  return (
    <svg className={`iscene ${fixed ? "is-fixed" : ""}`} viewBox="0 0 640 420" role="img" aria-label={fixed ? fixText : leakText} key={String(fixed)}>
      <S fixed={fixed} a={leakText} b={fixText} />
    </svg>
  );
}
