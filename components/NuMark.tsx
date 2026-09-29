/* The drawn "nu": a smooth n and the same n turned upside down as the u.
   Sized to Space Grotesk Bold (units = 1/1000 em): x-height 500, stem 136,
   letter width 500, and the same 116 gap the typed "nu" has. */

const N = "M68 432 V235 A182 182 0 0 1 432 235 V432";
const U = "M684 68 V265 A182 182 0 0 0 1048 265 V68";
const U0 = "M68 68 V265 A182 182 0 0 0 432 265 V68";

export function NuLetters({ n = "currentColor", u = "currentColor", className, title }: { n?: string; u?: string; className?: string; title?: string }) {
  return (
    <svg className={className} viewBox="0 -15 1116 530" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <path d={N} fill="none" stroke={n} strokeWidth="136" strokeLinecap="round" />
      <path d={U} fill="none" stroke={u} strokeWidth="136" strokeLinecap="round" />
    </svg>
  );
}

/* The round badge (app icon, partners hub): n top-left, u bottom-right, split by a blue line.
   Drawn in a 100 x 100 box; NuBadgeShape can be placed inside another SVG. */
export function NuBadgeShape({ bg = "#0B1F2E" }: { bg?: string }) {
  return (
    <g>
      <circle cx="50" cy="50" r="50" fill={bg} />
      <line x1="75" y1="25" x2="25" y2="75" stroke="#3382B5" strokeWidth="2.6" strokeLinecap="round" />
      <path transform="translate(23 22) scale(0.045)" d={N} fill="none" stroke="#00C675" strokeWidth="136" strokeLinecap="round" />
      <path transform="translate(54.5 55) scale(0.045)" d={U0} fill="none" stroke="#fff" strokeWidth="136" strokeLinecap="round" />
    </g>
  );
}

export function NuBadge({ size = 88, bg, className }: { size?: number; bg?: string; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <NuBadgeShape bg={bg} />
    </svg>
  );
}
