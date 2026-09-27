"use client";

import { useEffect, useState, type RefObject } from "react";

/* True once the element is near the viewport AND the visitor has interacted
   (scrolled, tapped, clicked, or pressed a key). Keeps heavy 3D out of page load. */
export function useDeferredMount(ref: RefObject<HTMLElement | null>, enabled = true, margin = "400px 0px") {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    let near = false;
    let acted = window.scrollY > 40; // landing mid-page counts as interaction
    const check = () => {
      if (near && acted) {
        setReady(true);
        cleanup();
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting;
        check();
      },
      { rootMargin: margin }
    );
    io.observe(ref.current);
    const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"] as const;
    const onAct = () => {
      acted = true;
      check();
    };
    events.forEach((ev) => window.addEventListener(ev, onAct, { passive: true, once: true }));
    function cleanup() {
      io.disconnect();
      events.forEach((ev) => window.removeEventListener(ev, onAct));
    }
    return cleanup;
  }, [ref, enabled, margin]);
  return ready;
}
