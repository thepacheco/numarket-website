/* Isometric hero objects for inner pages. Pure SVG + CSS, no libraries. */

import { Box, p } from "./ProductArt";
import { industries } from "@/content/industries";
import { NuBadgeShape } from "./NuMark";

const shadow = <ellipse cx="0" cy="40" rx="130" ry="56" className="art-shadow" />;

/* Pricing: three columns that grow with the plan */
export function PricingArt() {
  const cols = [
    { a: -80, h: 40, c: ["#9fd3e6", "#2a6a91", "#3b86b0"], label: "Insight" },
    { a: -20, h: 72, c: ["#9ee6d6", "#1f7476", "#2a8f91"], label: "Operate" },
    { a: 40, h: 110, c: ["#b3f0c9", "#1f7a52", "#2e9e6b"], label: "Command" },
  ];
  return (
    <div className="art hero-art-float" role="img" aria-label="Three plans, growing in size: Insight, Operate, Command.">
      <svg viewBox="-160 -150 320 230">
        {shadow}
        {cols.map((c, i) => (
          <g key={c.label} className="rise" style={{ animationDelay: `${i * 0.15}s` }}>
            <Box a={c.a} b={-10} c={0} w={44} d={44} h={c.h} top={c.c[0]} left={c.c[1]} right={c.c[2]} />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* Getting started: five steps up to a flag */
export function PathArt() {
  return (
    <div className="art hero-art-float" role="img" aria-label="Five steps climbing to a flag.">
      <svg viewBox="-170 -170 340 250">
        {shadow}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} className="rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <Box a={-100 + i * 40} b={-20} c={0} w={40} d={50} h={14 + i * 16} top={i === 4 ? "#b3f0c9" : "#e8f1f6"} left={i === 4 ? "#1f7a52" : "#9db3c3"} right={i === 4 ? "#2e9e6b" : "#c3d3de"} />
          </g>
        ))}
        {(() => {
          const [x, y] = p(80, 5, 78).split(",").map(Number);
          return (
            <g className="flag">
              <line x1={x} y1={y} x2={x} y2={y - 60} stroke="#0b1f2e" strokeWidth="3" strokeLinecap="round" />
              <path d={`M ${x} ${y - 60} l 34 10 l -34 12 z`} fill="#57cc99" />
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

/* Partners: numarket in the middle, partners around it */
export function NetworkArt() {
  const nodes = [
    [-110, -60],
    [110, -70],
    [-120, 50],
    [115, 55],
  ];
  return (
    <div className="art hero-art-float" role="img" aria-label="numarket connected to four partner firms.">
      <svg viewBox="-170 -130 340 250">
        {nodes.map(([x, y], i) => (
          <line key={i} x1="0" y1="0" x2={x} y2={y} className="net-line" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={`n${i}`} transform={`translate(${x},${y})`}>
            <circle r="30" fill="#fff" stroke="#cfdde7" strokeWidth="2" />
            <circle r="30" className="net-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
            <text textAnchor="middle" y="5" fontSize="12" fontWeight="700" fill="#243746">
              {["MSP", "CPA", "Reseller", "Advisor"][i]}
            </text>
          </g>
        ))}
        <g transform="translate(-44 -44) scale(0.88)">
          <NuBadgeShape />
        </g>
      </svg>
    </div>
  );
}

/* About / contact: a pin on Atlanta, on a small platform */
export function PinArt({ label = "Atlanta" }: { label?: string }) {
  return (
    <div className="art hero-art-float" role="img" aria-label={`Map pin on ${label}.`}>
      <svg viewBox="-160 -170 320 250">
        {shadow}
        <Box a={-90} b={-90} c={0} w={180} d={180} h={14} top="#eef6f2" left="#a9c4b6" right="#cfe2d8" />
        {[-60, -20, 20, 60].map((a) => (
          <polyline key={a} points={`${p(a, -90, 14)} ${p(a, 90, 14)}`} stroke="#d7e7df" strokeWidth="1.5" fill="none" />
        ))}
        {[-60, -20, 20, 60].map((b) => (
          <polyline key={`b${b}`} points={`${p(-90, b, 14)} ${p(90, b, 14)}`} stroke="#d7e7df" strokeWidth="1.5" fill="none" />
        ))}
        <ellipse cx="0" cy="-14" rx="26" ry="13" className="pin-ring" />
        <g className="pin">
          <path d="M0,-20 C-22,-48 -22,-82 0,-86 C22,-82 22,-48 0,-20 Z" fill="#22577a" />
          <circle cx="0" cy="-66" r="9" fill="#80ed99" />
        </g>
        <text x="0" y="46" textAnchor="middle" fontSize="15" fontWeight="700" fill="#243746">
          {label}
        </text>
      </svg>
    </div>
  );
}

/* Docs: a stack of pages */
export function BookArt() {
  return (
    <div className="art hero-art-float" role="img" aria-label="A stack of guide pages.">
      <svg viewBox="-160 -140 320 230">
        {shadow}
        {[0, 1, 2, 3].map((i) => (
          <g key={i} className="rise" style={{ animationDelay: `${i * 0.12}s` }}>
            <Box a={-70 + i * 4} b={-50 - i * 4} c={i * 14} w={140} d={100} h={10} top={i === 3 ? "#ffffff" : "#f1f6f9"} left="#b9c9d4" right="#d6e2ea" />
          </g>
        ))}
        {[0, 1, 2, 3].map((r) => (
          <polyline key={r} points={`${p(-40 + 12, -36 + r * 16, 52)} ${p(40 + 12 - r * 12, -36 + r * 16, 52)}`} stroke={r === 0 ? "#2a8f91" : "#c3d3de"} strokeWidth="4" strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}

/* Support: chat bubbles */
export function BubblesArt() {
  return (
    <div className="art hero-art-float" role="img" aria-label="Chat bubbles: a question and an answer.">
      <svg viewBox="-160 -130 320 230">
        <g className="bub1">
          <rect x="-140" y="-100" width="190" height="70" rx="20" fill="#fff" stroke="#d7e2ea" strokeWidth="2" />
          <rect x="-118" y="-78" width="120" height="10" rx="5" fill="#c3d3de" />
          <rect x="-118" y="-58" width="80" height="10" rx="5" fill="#dce6ed" />
        </g>
        <g className="bub2">
          <rect x="-40" y="0" width="190" height="80" rx="20" fill="#22577a" />
          <rect x="-18" y="22" width="130" height="10" rx="5" fill="#80ed99" />
          <rect x="-18" y="44" width="90" height="10" rx="5" fill="#9fc4da" />
        </g>
      </svg>
    </div>
  );
}

/* Solutions: eight industry tiles, one per color */
const tileColors: Record<string, [string, string, string]> = {
  construction: ["#f3cf8a", "#8f5f0e", "#b77a12"],
  manufacturing: ["#aeb7f2", "#3845a8", "#4f5fcf"],
  "food-production": ["#f0a3bf", "#962f55", "#c0406f"],
  healthcare: ["#93dcd6", "#0f625e", "#157f7a"],
  utilities: ["#9fc9f0", "#1f5d99", "#2a78c2"],
  "professional-services": ["#c6b4f2", "#5a3da6", "#7250cc"],
  logistics: ["#f3b58f", "#9a441a", "#c45a22"],
  "real-estate": ["#acdca3", "#2f6c27", "#3f8a35"],
};

export function TilesArt() {
  return (
    <div className="art hero-art-float" role="img" aria-label="Eight industries.">
      <svg viewBox="-170 -150 340 240">
        {shadow}
        {industries.map((ind, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          return (
            <g key={ind.slug} className="rise" style={{ animationDelay: `${i * 0.08}s` }}>
              <Box a={-90 + col * 46} b={-40 + row * 46} c={0} w={38} d={38} h={16 + ((i * 7) % 5) * 6} top={tileColors[ind.slug][0]} left={tileColors[ind.slug][1]} right={tileColors[ind.slug][2]} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
