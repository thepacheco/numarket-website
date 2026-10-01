/* ============================================================
   Product art: one distinct 3D object per product.
   Isometric SVG + CSS 3D. No libraries, no images, and every
   animation stops for visitors who prefer reduced motion.
   ============================================================ */

import type React from "react";
import WorkspaceArt from "./WorkspaceArt";

export { WorkspaceArt };

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

/* ---------- Engineering: rows flow through a pipe from an old system into a new one ---------- */

export function EngineeringArt() {
  const pipe = `M ${p(-20, 10, 20).replace(",", " ")} L ${p(40, 10, 20).replace(",", " ")}`;
  return (
    <div className="art art-engineering hero-art-float" role="img" aria-label="Rows moving through a pipe from an old gray system into a new violet database.">
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
