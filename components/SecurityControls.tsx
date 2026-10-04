"use client";

import { useState } from "react";
import Icon from "./Icon";

const groups = [
  {
    icon: "users",
    t: "Access",
    c: "var(--p-workspace)",
    items: [
      "Every person gets a named account — no shared logins.",
      "Multi-factor sign-in is required for everyone, including our team.",
      "Role-based access: each person sees only what their role allows.",
      "Access is reviewed every quarter and removed the same day someone leaves.",
      "Connections to your tools use each tool's official, read-only connection wherever one exists.",
    ],
  },
  {
    icon: "lock",
    t: "Encryption",
    c: "var(--p-foundation)",
    items: [
      "Data is encrypted at rest with AES-256, managed by the Snowflake platform.",
      "Data is encrypted in transit with TLS on every connection.",
      "Encryption keys are rotated automatically by the platform.",
    ],
  },
  {
    icon: "database",
    t: "Isolation",
    c: "var(--navy)",
    items: [
      "Each client gets its own dedicated database account and its own tables.",
      "Your data is used only to deliver your service, and it stays separate from every other client's.",
      "On Command, your data can stay inside your own cloud.",
    ],
  },
  {
    icon: "see",
    t: "Monitoring",
    c: "var(--p-insight)",
    items: [
      "Every login and every query is recorded in an audit history.",
      "We review access history and investigate anything unusual.",
      "Checks run on every data update; bad rows are flagged, not published.",
    ],
  },
  {
    icon: "refresh",
    t: "Recovery",
    c: "var(--i-utilities)",
    items: [
      "Point-in-time recovery lets us restore data from recent days if something goes wrong.",
      "The platform keeps additional fail-safe copies beyond that window.",
      "Your pipelines can be rebuilt from code — nothing depends on one person's laptop.",
    ],
  },
  {
    icon: "file",
    t: "Data handling",
    c: "var(--i-construction)",
    items: [
      "We only collect what your dashboards need.",
      "Sensitive fields (like Social Security numbers or patient identifiers) are masked or left out unless you require them.",
      "No client data is stored on laptops or personal devices.",
      "Healthcare data is handled under a signed Business Associate Agreement.",
    ],
  },
  {
    icon: "code",
    t: "Change control",
    c: "var(--p-engineering)",
    items: [
      "Every change to your data pipeline is tested before it's published.",
      "Changes are tracked, so we can see what changed, when, and roll it back.",
      "Definitions (what “revenue” means) are written down and changed only with you.",
    ],
  },
  {
    icon: "alert",
    t: "Incidents",
    c: "var(--risk)",
    items: [
      "We notify you within 72 hours of any confirmed incident affecting your data.",
      "You get what happened, what data was involved, and what we're doing about it.",
      "Afterward, you get a written summary and the fix that prevents a repeat.",
    ],
  },
];

export default function SecurityControls() {
  const [sel, setSel] = useState(0);
  const g = groups[sel];
  return (
    <div className="sec-ctl">
      <div className="sec-tabs" role="tablist" aria-label="Security controls">
        {groups.map((x, i) => (
          <button key={x.t} type="button" role="tab" aria-selected={sel === i} onClick={() => setSel(i)} style={{ ["--sc" as string]: x.c }}>
            <Icon name={x.icon} width={18} height={18} />
            {x.t}
          </button>
        ))}
      </div>
      <div className="sec-panel" role="tabpanel" key={g.t} style={{ ["--sc" as string]: g.c }}>
        <div className="sec-head">
          <span className="sec-ic">
            <Icon name={g.icon} />
          </span>
          <h3>{g.t}</h3>
        </div>
        <ul>
          {g.items.map((it, i) => (
            <li key={it} style={{ animationDelay: `${i * 70}ms` }}>
              <Icon name="check" width={18} height={18} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
