import type { SVGProps } from "react";

/* Simple line icons (24px grid, 1.8 stroke). No third-party logos. */
const paths: Record<string, string> = {
  check: "M5 12.5l4.5 4.5L19 7.5",
  arrow: "M5 12h14M13 6l6 6-6 6",
  chevron: "M6 9l6 6 6-6",
  lock: "M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z",
  key: "M15 7a4 4 0 11-3.9 5H3v3h3v3h3v-3h2.1A4 4 0 0115 7z",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z",
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  collect: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14v6M14 17h6",
  clean: "M4 20l6-6M14 4l6 6-8 8-6-6zM3 21h7",
  see: "M3 20V10M9 20V4M15 20v-8M21 20V7",
  act: "M5 12.5l4.5 4.5L19 7.5M4 4h16",
  own: "M15 7a4 4 0 11-3.9 5H3v3h3v3h3v-3h2.1A4 4 0 0115 7z",
  spreadsheet: "M4 4h16v16H4zM4 9h16M4 14h16M10 4v16",
  chat: "M4 5h16v11H9l-5 4z",
  bell: "M6 16V11a6 6 0 1112 0v5l2 2H4zM10 21h4",
  users: "M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M16 3.5a4 4 0 010 7.5M18 14a6 6 0 014 5.6V21",
  building: "M4 21V5l8-2v18M12 7l8 2v12M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M2 21h20",
  sprout: "M12 21v-8M12 13c0-4 3-7 8-7 0 4-3 7-8 7zM12 13c0-3-2.5-5.5-7-5.5 0 3.5 2.5 5.5 7 5.5z",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  dollar: "M12 3v18M17 7.5C17 5.6 14.8 4.5 12 4.5S7 5.6 7 7.5 9 10.4 12 11s5 1.6 5 3.5-2.2 3-5 3-5-1.1-5-3",
  gauge: "M4 17a8 8 0 1116 0M12 17l4-6",
  plug: "M9 3v5M15 3v5M6 8h12v4a6 6 0 01-12 0zM12 18v3",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  file: "M6 3h8l5 5v13H6zM14 3v5h5",
  book: "M4 5a2 2 0 012-2h14v16H6a2 2 0 00-2 2zM4 21V5",
  support: "M4 13a8 8 0 1116 0v4a2 2 0 01-2 2h-2v-6h4M4 13h4v6H6a2 2 0 01-2-2z",
  handshake: "M3 11l5-5 4 3 4-3 5 5-5 6-4-3-4 3zM12 9v7",
  map: "M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  phone: "M5 3h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 4l-4 16",
  menu: "M4 7h16M4 12h16M4 17h16",
  window: "M3 5h18v14H3zM3 9h18M6.5 7h.01M9 7h.01",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 17a5 5 0 100-10 5 5 0 000 10zM12 13a1 1 0 100-2 1 1 0 000 2z",
  gear: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z",
  play: "M7 4l13 8-13 8z",
  send: "M4 12l16-8-6 16-2-7z",
  refresh: "M20 11a8 8 0 10-2.3 5.7M20 4v7h-7",
  close: "M6 6l12 12M18 6L6 18",
  alert: "M12 4l9 16H3zM12 10v4M12 17h.01",
  trend: "M3 17l6-6 4 4 8-8M15 7h6v6",
  /* industries */
  construction: "M3 18h18M5 18v-3a7 7 0 0114 0v3M12 8V5M9 9.5L8 7M15 9.5l1-2.5",
  manufacturing: "M3 21V11l5 3V11l5 3V11l5 3V5h3v16zM7 17h2M12 17h2",
  "food-production": "M3 17h18M5 17a7 7 0 0114 0M12 7v3M10 7h4M2 20h20",
  healthcare: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  utilities: "M13 2L4 14h7l-1 8 9-12h-7z",
  "professional-services": "M4 8h16v12H4zM9 8V5h6v3M4 13h16",
  logistics: "M2 6h12v10H2zM14 10h4l3 3v3h-7M6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
  "real-estate": "M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-6h4v6",
};

export type IconName = keyof typeof paths;

export default function Icon({ name, ...rest }: { name: string } & SVGProps<SVGSVGElement>) {
  const d = paths[name] ?? paths.check;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d={d} />
    </svg>
  );
}
