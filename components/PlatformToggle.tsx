"use client";

import { useState } from "react";
import Icon from "./Icon";

const stack = ["Ask Your Data", "Workspace", "Clean layer", "Your private database"];

const modes = {
  ours: {
    btn: "We host it",
    home: "numarket's managed cloud",
    tag: "We run it for you",
    rows: [
      ["Where it runs", "Its own separate account in numarket's Snowflake organization"],
      ["Who pays the platform bill", "Included in Foundation, up to your allowance"],
      ["Who manages access", "numarket, with you approving who sees what"],
      ["What IT has to do", "Nothing. No servers, no installs"],
      ["Sizes", "Small, Mid, and Large"],
    ],
  },
  yours: {
    btn: "Your cloud",
    home: "Your company's cloud",
    tag: "Snowflake · Azure · Databricks",
    rows: [
      ["Where it runs", "Inside the cloud account your company already has"],
      ["Who pays the platform bill", "You pay your cloud provider directly"],
      ["Who manages access", "Your IT team; numarket works as named users"],
      ["What IT has to do", "A security review first, then we build inside"],
      ["Sizes", "Large (the Command plan)"],
    ],
  },
} as const;

/* Where it lives: the same stack, in our cloud or yours. Switching moves the
   stack into a different home and changes who does what. */
export default function PlatformToggle() {
  const [where, setWhere] = useState<"ours" | "yours">("ours");
  const m = modes[where];
  return (
    <div className={`ht ht-${where}`}>
      <div className="seg" role="group" aria-label="Where it runs">
        {(["ours", "yours"] as const).map((k) => (
          <button key={k} type="button" aria-pressed={where === k} onClick={() => setWhere(k)}>
            {modes[k].btn}
          </button>
        ))}
      </div>
      <div className="ht-home" key={where}>
        <div className="ht-head">
          <Icon name={where === "ours" ? "shield" : "building"} width={18} height={18} />
          <b>{m.home}</b>
          <span>{m.tag}</span>
        </div>
        <div className="ht-stack">
          {stack.map((s, i) => (
            <span key={s} style={{ animationDelay: `${i * 70}ms` }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <dl className="ht-rows" aria-live="polite">
        {m.rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd key={v}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="ht-same">
        <Icon name="check" width={16} height={16} /> The same four layers, cleaning rules, and apps either way. You own your data either way.
      </p>
    </div>
  );
}
