"use client";

import { useEffect, useRef, useState } from "react";

/* Smoothly animate a number when it changes. */
export function useTween(target: number, ms = 550) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      const x = a + (target - a) * (1 - Math.pow(1 - k, 3));
      setV(x);
      from.current = x;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* Auto-advancing stage counter: play() runs 1..last, one stage every `ms`. */
export function useStages(last: number, ms = 2200) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    if (stage >= last) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStage((s) => s + 1), stage === 0 ? 350 : ms);
    return () => clearTimeout(t);
  }, [playing, stage, last, ms]);
  return {
    stage,
    playing,
    play: () => {
      setStage(0);
      setPlaying(true);
    },
    reset: () => {
      setPlaying(false);
      setStage(0);
    },
    go: (s: number) => {
      setPlaying(false);
      setStage(s);
    },
  };
}
