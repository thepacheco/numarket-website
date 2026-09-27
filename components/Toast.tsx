"use client";

import { useEffect } from "react";
import Icon from "./Icon";

export default function Toast({ text, onDone }: { text: string | null; onDone: () => void }) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [text, onDone]);
  if (!text) return null;
  return (
    <div className="toast" role="status">
      <Icon name="check" /> {text}
    </div>
  );
}
