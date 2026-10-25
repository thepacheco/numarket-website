"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import StepScene from "./StepScene";
import { useDeferredMount } from "./useDeferredMount";
import { steps } from "@/content/steps";

const JourneyCanvas = dynamic(() => import("./journey/JourneyCanvas"), { ssr: false });

/* Seven scroll stages map onto the six steps (Collect covers chaos + pull). */
const stageToStep = [0, 0, 1, 2, 3, 4, 5];
const labels = [
  "Your data today: everywhere.",
  "Pulled together, automatically.",
  "Cleaned. Matched. Trusted.",
  "Stored privately. Yours.",
  "Screens for your whole team.",
  "Know what to do next.",
  "If you leave, your data goes with you.",
];

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function DataJourney() {
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  const [stage, setStage] = useState(0);
  const [ready, setReady] = useState(false);
  const progress = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(!reduce && webglOK() ? "3d" : "fallback");
  }, []);

  useEffect(() => {
    if (mode !== "3d") return;
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      progress.current = p;
      setStage(Math.min(6, Math.floor(p * 7)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode]);

  /* Don't load or build the 3D scene until the visitor is near it and has interacted. */
  const near = useDeferredMount(sectionRef, mode === "3d", "600px 0px");

  const onReady = useCallback(() => setReady(true), []);

  const jump = (s: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + total * ((s + 0.55) / 7), behavior: "smooth" });
  };

  if (mode === "fallback")
    return (
      <div className="container" style={{ paddingBottom: 64 }}>
        <StepScene />
      </div>
    );

  const step = stageToStep[stage];
  const pct = Math.round(progress.current * 100);

  return (
    <section ref={sectionRef} className="journey3d" aria-label="The data journey, in six steps">
      <div className="j-sticky">
        {mode === "3d" && near && <JourneyCanvas progress={progress} onReady={onReady} />}
        <div className={`j-loading ${ready ? "done" : ""}`} aria-hidden="true" />
        <div className="j-overlay container">
          <ol className="j-rail" aria-label="The six steps">
            {steps.map((st, i) => (
              <li key={st.key}>
                <button
                  type="button"
                  className={`j-rail-item ${i === step ? "on" : i < step ? "past" : ""}`}
                  onClick={() => jump(i === 0 ? 0 : i + 1)}
                  aria-current={i === step ? "step" : undefined}
                >
                  <span className="n">{i < step ? "✓" : i + 1}</span>
                  <span className="t">{st.title}</span>
                  <span className="d">
                    <b style={{ color: "var(--ink)", display: "block" }}>{i === step ? labels[stage] : ""}</b>
                    {st.plain}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="j-progress" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </div>
          <a href="#after-journey" className="j-skip">
            Skip the animation ↓
          </a>
        </div>
      </div>
      <span id="after-journey" />
    </section>
  );
}
