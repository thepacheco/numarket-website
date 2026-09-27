/* ============================================================
   Product art: one distinct 3D object per product.
   Isometric SVG + CSS 3D. No libraries, no images, and every
   animation stops for visitors who prefer reduced motion.
   ============================================================ */

import type React from "react";
import { fmt, overBudgetSummary } from "@/lib/sample-data";

export type ProductKind = "foundation" | "workspace" | "insight" | "engineering" | "platform";

/* ---------- isometric helpers ---------- */

const C30 = 0.866;
export const p = (a: number, b: number, c: number) => `${((a - b) * C30).toFixed(1)},${((a + b) * 0.5 - c).toFixed(1)}`;

export function Box({
  a,
  b,
  c,
  w,
  d,
  h,
  top,
  left,
  right,
  stroke,
}: {
  a: number;
  b: number;
  c: number;
  w: number;
  d: number;
  h: number;
  top: string;
  left: string;
  right: string;
  stroke?: string;
}) {
  const s = stroke ? { stroke, strokeWidth: 1, strokeLinejoin: "round" as const } : {};
  return (
    <g>
      <polygon points={[p(a, b + d, c), p(a + w, b + d, c), p(a + w, b + d, c + h), p(a, b + d, c + h)].join(" ")} fill={left} {...s} />
      <polygon points={[p(a + w, b, c), p(a + w, b + d, c), p(a + w, b + d, c + h), p(a + w, b, c + h)].join(" ")} fill={right} {...s} />
      <polygon points={[p(a, b, c + h), p(a + w, b, c + h), p(a + w, b + d, c + h), p(a, b + d, c + h)].join(" ")} fill={top} {...s} />
    </g>
  );
}

/* ---------- Foundation: blocks fall, turn clean, and stack into the database ---------- */

export function FoundationArt() {
  const cubes = [
    [-38, -38],
    [2, -38],
    [-38, 2],
    [2, 2],
  ];
  return (
    <div className="art art-foundation" role="img" aria-label="Messy blocks dropping onto a database stack and turning green as they land.">
      <svg viewBox="-150 -150 300 250">
        <ellipse cx="0" cy="20" rx="120" ry="62" className="art-shadow" />
        <Box a={-60} b={-60} c={0} w={120} d={120} h={16} top="#2f6c94" left="#173e59" right="#1f4f70" />
        <Box a={-60} b={-60} c={24} w={120} d={120} h={16} top="#3b8fae" left="#1f5a78" right="#2a7091" />
        <Box a={-60} b={-60} c={48} w={120} d={120} h={16} top="#5fc3b0" left="#2b8a82" right="#38a3a5" />
        <ellipse cx="0" cy={-106} rx="98" ry="52" className="art-ring" />
        {cubes.map(([a, b], i) => (
          <g key={i} className="drop" style={{ animationDelay: `${i * 0.55}s` }}>
            <g className="c-chaos">
              <Box a={a} b={b} c={64} w={30} d={30} h={20} top="#f2a58e" left="#c4553a" right="#e07a5f" />
            </g>
            <g className="c-clean">
              <Box a={a} b={b} c={64} w={30} d={30} h={20} top="#a6f5bd" left="#2e9e6b" right="#57cc99" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- Workspace: an exploded stack of app screens (real CSS 3D) ---------- */

export function WorkspaceArt() {
  const ob = overBudgetSummary();
  return (
    <div className="art art-workspace" role="img" aria-label="Three app screens stacked in 3D: a dashboard, an input form, and a chat.">
      <div className="ws-stage">
        <div className="ws-panel ws-dash">
          <div className="ws-bars">
            <i style={{ height: "40%" }} />
            <i style={{ height: "65%" }} />
            <i style={{ height: "52%" }} />
            <i style={{ height: "85%" }} />
            <i style={{ height: "70%" }} />
          </div>
        </div>
        <div className="ws-panel ws-form">
          <span className="ws-line" />
          <span className="ws-input" />
          <span className="ws-input" />
          <span className="ws-btn" />
        </div>
        <div className="ws-panel ws-chat">
          <span className="ws-bubble q">Which jobs are over budget?</span>
          <span className="ws-bubble a">
            {ob.count} jobs · {fmt(ob.total, "money")} over
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Insight Review: action cards flip up from a target ---------- */

export function InsightArt() {
  const cards = [
    ["Review change orders", "PM team · Friday"],
    ["Add 6 per-diem shifts", "Nurse manager · Monday"],
    ["Book backhauls", "Dispatch · 2 weeks"],
  ];
  return (
    <div className="art art-insight" role="img" aria-label="Action items with owners and due dates flipping up from a target.">
      <svg viewBox="-150 -60 300 170" className="ins-target">
        <ellipse cx="0" cy="50" rx="130" ry="46" className="ring r1" />
        <ellipse cx="0" cy="50" rx="92" ry="32" className="ring r2" />
        <ellipse cx="0" cy="50" rx="54" ry="19" className="ring r3" />
        <ellipse cx="0" cy="50" rx="18" ry="6.5" className="ring r4" />
        <ellipse cx="0" cy="50" rx="54" ry="19" className="pulse" />
      </svg>
      <div className="ins-deck">
        {cards.map(([t, s], i) => (
          <div key={t} className="ins-card" style={{ animationDelay: `${i * 2}s` }}>
            <span className="ins-check">✓</span>
            <span>
              <b>{t}</b>
              <small>{s}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Engineering: data flows from an old system into a new database ---------- */

export function EngineeringArt() {
  const pipe = `M ${p(-20, 10, 20).replace(",", " ")} L ${p(40, 10, 20).replace(",", " ")}`;
  return (
    <div className="art art-engineering" role="img" aria-label="Rows moving through a pipe from an old gray system into a new violet database.">
      <svg viewBox="-160 -120 320 220">
        <ellipse cx="0" cy="40" rx="140" ry="58" className="art-shadow" />
        <g className="old">
          <Box a={-100} b={-10} c={0} w={70} d={50} h={60} top="#d9dee4" left="#9aa6b2" right="#b8c2cc" />
          <g className="rows">
            {[0, 1, 2, 3].map((i) => (
              <polyline key={i} points={`${p(-30, -2 + i * 10, 48)} ${p(-30, 6 + i * 10, 48)}`} />
            ))}
          </g>
        </g>
        <path d={pipe} className="pipe-bg" />
        <path d={pipe} className="pipe-flow" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x="-5" y="-5" width="10" height="10" rx="2" className="packet">
            <animateMotion dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={pipe} />
          </rect>
        ))}
        <g className="new">
          <Box a={40} b={-10} c={0} w={60} d={50} h={18} top="#9d8ff0" left="#4a3cb0" right="#6c5dd3" />
          <Box a={40} b={-10} c={24} w={60} d={50} h={18} top="#b2a8f5" left="#5a4cc0" right="#7d6fe0" />
          <Box a={40} b={-10} c={48} w={60} d={50} h={18} top="#c9c2fa" left="#6a5dcc" right="#8f83ea" />
        </g>
        <g className="gear" transform="translate(0,-78)">
          <path d="M0,-22 l5,0 2,7 6,3 6,-4 4,4 -4,6 3,6 7,2 0,5 -7,2 -3,6 4,6 -4,4 -6,-4 -6,3 -2,7 -5,0 -2,-7 -6,-3 -6,4 -4,-4 4,-6 -3,-6 -7,-2 0,-5 7,-2 3,-6 -4,-6 4,-4 6,4 6,-3z" transform="translate(-2.5,0)" />
          <circle r="7" />
        </g>
      </svg>
    </div>
  );
}

export function ProductArt({ kind }: { kind: ProductKind }) {
  if (kind === "foundation") return <FoundationArt />;
  if (kind === "workspace") return <WorkspaceArt />;
  if (kind === "insight") return <InsightArt />;
  if (kind === "engineering") return <EngineeringArt />;
  return <FoundationArt />;
}

/* ---------- product glyphs: tiny isometric objects, one per product ---------- */

const gShade: Record<ProductKind, [string, string, string]> = {
  foundation: ["#5aa3c9", "#1d4a68", "#2a6a91"],
  workspace: ["#7fd1c3", "#1f7476", "#2a8f91"],
  insight: ["#9ee6bd", "#1f7a52", "#2e9e6b"],
  engineering: ["#b7adf6", "#4a3cb0", "#6c5dd3"],
  platform: ["#9fb4c4", "#1b3346", "#2b4a60"],
};

export function ProductGlyph({ kind, small }: { kind: ProductKind; small?: boolean }) {
  const [top, left, right] = gShade[kind];
  const B = (a: number, b: number, c: number, w: number, d: number, h: number, cls?: string, colors?: [string, string, string]) => {
    const [t, l, r] = colors ?? [top, left, right];
    return (
      <g className={cls}>
        <Box a={a} b={b} c={c} w={w} d={d} h={h} top={t} left={l} right={r} />
      </g>
    );
  };
  let body: React.ReactNode;
  if (kind === "foundation") body = <>{B(-8, -8, -6, 16, 16, 3)}{B(-8, -8, -1, 16, 16, 3)}<g className="g-top">{B(-8, -8, 4, 16, 16, 3)}</g></>;
  else if (kind === "workspace")
    body = (
      <>
        {B(-9, -7, -6, 18, 14, 1.5, undefined, ["#e6f5f5", "#9cc9ca", "#bfdede"])}
        <g className="g-top">
          {B(-9, -7, 3, 18, 14, 1.5)}
          {B(-6, -4, 4.5, 3, 3, 4, undefined, ["#ffffff", "#cfe9e9", "#e6f5f5"])}
          {B(-1, -4, 4.5, 3, 3, 7, undefined, ["#ffffff", "#cfe9e9", "#e6f5f5"])}
        </g>
      </>
    );
  else if (kind === "insight")
    body = (
      <>
        <ellipse cx="0" cy="6" rx="14" ry="7" fill="#e6f7ee" stroke="#9ee6bd" />
        <ellipse cx="0" cy="6" rx="8" ry="4" fill="none" stroke="#2e9e6b" />
        <ellipse cx="0" cy="6" rx="2.6" ry="1.3" fill="#1f7a52" />
        <g className="g-top">{B(-6, -1, 7, 12, 2, 10)}</g>
      </>
    );
  else if (kind === "engineering")
    body = (
      <>
        {B(-13, -2, -4, 9, 9, 9, undefined, ["#e3e7ec", "#98a4b0", "#bcc6cf"])}
        <circle cx="0" cy="1" r="1.8" fill="#6c5dd3" />
        <g className="g-top">{B(3, -2, -4, 9, 9, 12)}</g>
      </>
    );
  else body = <>{B(-8, -8, -6, 16, 16, 2)}{B(-8, -8, -2, 16, 16, 2)}{B(-8, -8, 2, 16, 16, 2)}<g className="g-top">{B(-8, -8, 6, 16, 16, 2)}</g></>;
  return (
    <span className={`pglyph pg-${kind} ${small ? "sm" : ""}`} aria-hidden="true">
      <svg viewBox="-17 -17 34 34">{body}</svg>
    </span>
  );
}
