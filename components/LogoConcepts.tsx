/* Logo directions for numarket. Each concept is a mark + wordmark, drawn in SVG. */
import type React from "react";

const C = { navy: "#22577A", teal: "#38A3A5", green: "#57CC99", light: "#80ED99", ink: "#0B1F2E" };

export type Concept = { id: string; name: string; idea: string; mark: (dark?: boolean) => React.ReactNode; word: (dark?: boolean) => React.ReactNode };

const wordSans = (dark?: boolean, split = true) => (
  <text x="0" y="0" fontFamily="var(--font-grotesk), var(--font-sans)" fontWeight="700" fontSize="34" letterSpacing="-1.2">
    <tspan fill={dark ? "#fff" : C.ink}>nu</tspan>
    <tspan fill={split ? (dark ? C.light : "#00a862") : dark ? "#fff" : C.ink}>market</tspan>
  </text>
);

export const concepts: Concept[] = [
  {
    id: "current",
    name: "A · Current wordmark",
    idea: "What's live today. Clean and simple, but no symbol — nothing to use as an app icon or favicon.",
    mark: (dark) => (
      <g>
        <rect x="-24" y="-24" width="48" height="48" rx="12" fill={dark ? "#12324a" : "#eef7f2"} />
        <text x="0" y="9" textAnchor="middle" fontFamily="var(--font-grotesk)" fontWeight="700" fontSize="24" fill={dark ? "#fff" : C.ink}>
          nu
        </text>
      </g>
    ),
    word: (dark) => wordSans(dark),
  },
  {
    id: "stack",
    name: "B · Clean stack",
    idea: "Three layers of data, stacked neatly — the Foundation idea. Works as a 3D object across the site.",
    mark: () => (
      <g transform="scale(1.35)">
        {[
          [8, "#1d4a68", "#2a6a91", "#5aa3c9"],
          [0, "#1f7476", "#2a8f91", "#7fd1c3"],
          [-8, "#1f7a52", "#2e9e6b", "#9ee6bd"],
        ].map(([y, l, r, t], i) => (
          <g key={i} transform={`translate(0,${y})`}>
            <polygon points="-14,0 0,7 0,11 -14,4" fill={l as string} />
            <polygon points="14,0 0,7 0,11 14,4" fill={r as string} />
            <polygon points="0,-7 14,0 0,7 -14,0" fill={t as string} />
          </g>
        ))}
      </g>
    ),
    word: (dark) => wordSans(dark),
  },
  {
    id: "trend",
    name: "C · Trend slash",
    idea: "The original brief: an italic “nu” with a rising green trend line and a data point.",
    mark: (dark) => (
      <g>
        <text x="-8" y="12" textAnchor="middle" fontFamily="var(--font-dm-serif), Georgia, serif" fontStyle="italic" fontSize="34" fill={dark ? "#fff" : C.navy}>
          nu
        </text>
        <line x1="10" y1="14" x2="24" y2="-18" stroke={C.green} strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="24" cy="-18" r="4.5" fill={C.light} stroke={dark ? C.ink : "#fff"} strokeWidth="2" />
      </g>
    ),
    word: (dark) => (
      <text x="0" y="0" fontFamily="var(--font-dm-serif), Georgia, serif" fontSize="36" letterSpacing="-0.5">
        <tspan fill={dark ? "#fff" : C.navy} fontStyle="italic">
          nu
        </tspan>
        <tspan fill={dark ? "#dfe9f0" : C.ink} fontFamily="var(--font-sans)" fontWeight="600" fontSize="32">
          market
        </tspan>
      </text>
    ),
  },
  {
    id: "bars",
    name: "D · Rising n",
    idea: "The letter n drawn as two data bars — one short, one tall — with a point on top. Reads as “growth” at any size.",
    mark: (dark) => (
      <g>
        <rect x="-16" y="-6" width="11" height="24" rx="3" fill={dark ? C.teal : C.navy} />
        <rect x="3" y="-16" width="11" height="34" rx="3" fill={C.green} />
        <path d="M -10.5 -6 Q -10.5 -16 -1 -16 L 3 -16" fill="none" stroke={dark ? C.teal : C.navy} strokeWidth="5" />
        <circle cx="8.5" cy="-24" r="4" fill={C.light} />
      </g>
    ),
    word: (dark) => wordSans(dark, false),
  },
  {
    id: "cube",
    name: "E · Data cube",
    idea: "A single isometric cube in navy, teal, and green — one clean, secure place for your data.",
    mark: () => (
      <g transform="scale(1.5)">
        <polygon points="0,-16 14,-8 0,0 -14,-8" fill={C.light} />
        <polygon points="-14,-8 0,0 0,16 -14,8" fill={C.navy} />
        <polygon points="14,-8 0,0 0,16 14,8" fill={C.teal} />
        <polygon points="0,-5 5,-2.2 0,0.6 -5,-2.2" fill="#fff" opacity="0.9" />
      </g>
    ),
    word: (dark) => wordSans(dark),
  },
  {
    id: "orbit",
    name: "F · Scattered to sure",
    idea: "Four scattered squares snapping into one — the whole story in a symbol.",
    mark: () => (
      <g>
        <rect x="-18" y="-18" width="16" height="16" rx="4" fill={C.navy} />
        <rect x="2" y="-18" width="16" height="16" rx="4" fill={C.teal} />
        <rect x="-18" y="2" width="16" height="16" rx="4" fill={C.teal} />
        <rect x="2" y="2" width="16" height="16" rx="4" fill={C.green} />
        <rect x="14" y="-24" width="9" height="9" rx="2.5" fill="#e07a5f" transform="rotate(18 18 -20)" />
      </g>
    ),
    word: (dark) => wordSans(dark),
  },
];

export function Lockup({ c, dark, scale = 1 }: { c: Concept; dark?: boolean; scale?: number }) {
  return (
    <svg viewBox="-34 -34 300 68" width={300 * scale} height={68 * scale} role="img" aria-label={`numarket logo, ${c.name}`}>
      {c.mark(dark)}
      <g transform="translate(36,12)">{c.word(dark)}</g>
    </svg>
  );
}

export function MarkOnly({ c, size, dark, tile }: { c: Concept; size: number; dark?: boolean; tile?: boolean }) {
  return (
    <svg viewBox="-30 -30 60 60" width={size} height={size} role="img" aria-label={`${c.name} icon`}>
      {tile && <rect x="-30" y="-30" width="60" height="60" rx="14" fill={dark ? C.ink : "#fff"} />}
      {c.mark(dark)}
    </svg>
  );
}
