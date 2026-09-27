"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";

export default function Modal({ open, onClose, label, children, style }: { open: boolean; onClose: () => void; label: string; children: ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("a,button,input,select,textarea,[tabindex]:not([tabindex='-1'])");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => ref.current?.querySelector<HTMLElement>(".modal-close")?.focus(), 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} className="modal" role="dialog" aria-modal="true" aria-label={label} style={style}>
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          <Icon name="close" width={18} height={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
