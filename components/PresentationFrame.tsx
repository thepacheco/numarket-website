"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const DECK = "/presentation/deck.html";

export const slides: [string, string][] = [
  ["intro", "Welcome"],
  ["problem", "The problem"],
  ["system", "The system"],
  ["foundation", "01 · Foundation"],
  ["workspace", "02 · Workspace"],
  ["insight", "03 · Insight Review"],
  ["engineering", "04 · Engineering"],
  ["examples", "What you get"],
  ["time", "Where time goes"],
  ["cost", "The cost difference"],
  ["compare", "How we compare"],
  ["founder", "Who we are"],
  ["portal", "Your system"],
  ["security", "Security"],
  ["questions", "Common questions"],
  ["next-steps", "After yes"],
  ["start", "Next step"],
];

/* The client deck in a 16:9 frame, with full screen and a slide list. */
export default function PresentationFrame() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [cur, setCur] = useState("intro");
  /* keep the slide list in step with the deck (same origin, so the hash is readable) */
  useEffect(() => {
    const id = window.setInterval(() => {
      try {
        const h = frame.current?.contentWindow?.location.hash.slice(1);
        if (h) setCur((c) => (c === h ? c : h));
      } catch {
        /* not loaded yet */
      }
    }, 600);
    return () => window.clearInterval(id);
  }, []);
  const jump = (id: string) => {
    setCur(id);
    const w = frame.current?.contentWindow;
    if (w) w.location.hash = id;
    frame.current?.focus();
  };
  const full = () => {
    const el = frame.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => window.open(DECK, "_blank"));
    else window.open(DECK, "_blank");
    el.focus();
  };
  return (
    <div className="pres">
      <div className="pres-frame">
        <iframe ref={frame} src={`${DECK}#intro`} title="numarket presentation" allow="fullscreen" allowFullScreen />
      </div>
      <div className="pres-bar">
        <button type="button" className="btn btn-primary" onClick={full}>
          <Icon name="arrow" width={16} height={16} /> Present full screen
        </button>
        <a className="btn btn-secondary" href={DECK} target="_blank" rel="noopener">
          Open in a new tab
        </a>
        <span className="small muted pres-hint">Click the slide, then use the arrow keys. On a phone, swipe. Play runs it hands-free.</span>
      </div>
      <nav className="pres-outline" aria-label="Slides">
        <h2>Jump to a slide</h2>
        <ol>
          {slides.map(([id, label], i) => (
            <li key={id}>
              <button type="button" aria-current={cur === id ? "step" : undefined} onClick={() => jump(id)}>
                <span className="tnum">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
