"use client";

import { useMemo, useState } from "react";
import Icon from "./Icon";
import { buildView, fmt } from "@/lib/sample-data";
import { industries, type IndustrySlug } from "@/content/industries";
import { definitions } from "@/content/definitions";
import { flags } from "@/content/flags";

/* ---------- The tools you already use ---------- */

const connected = [
  { icon: "dollar", t: "Accounting" },
  { icon: "layers", t: "Project tool" },
  { icon: "spreadsheet", t: "Spreadsheets" },
  { icon: "file", t: "Shared files" },
  { icon: "users", t: "HR & payroll" },
  { icon: "gear", t: "Industry software" },
];

export function ConnectedRow() {
  return (
    <div className="conn">
      <span className="conn-l">Connected to</span>
      <ul className="conn-row">
        {connected.map((c) => (
          <li key={c.t}>
            <Icon name={c.icon} width={16} height={16} />
            {c.t}
          </li>
        ))}
      </ul>
      <p className="small muted">
        Your team keeps using them exactly as it does today. You approve a read-only connection to each one, and a copy updates in your private database on a schedule.
      </p>
    </div>
  );
}

/* ---------- What's inside Foundation ---------- */

const parts = [
  { icon: "plug", t: "Connections", b: "An official, read-only connection to each tool. You click “Allow” once." },
  { icon: "clean", t: "Cleaning and checks", b: "Duplicates merged, names matched, and checks on every update." },
  { icon: "lock", t: "Your private database", b: "Encrypted, separate from every other client, and yours." },
  { icon: "book", t: "Business definitions", b: "Your data dictionary: what every number means, where it comes from, and who owns it." },
];

export function FoundationInside() {
  return (
    <div className="f-parts stagger">
      {parts.map((p, i) => (
        <div key={p.t} className="f-part">
          <span className="f-part-n">{i + 1}</span>
          <span className="icon-badge" style={{ margin: 0 }}>
            <Icon name={p.icon} />
          </span>
          <h3>{p.t}</h3>
          <p>{p.b}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Flagged for review (after cleaning) ---------- */

export function FlaggedReview({ slug }: { slug: IndustrySlug }) {
  const items = flags[slug];
  const ind = industries.find((i) => i.slug === slug)!;
  const [picked, setPicked] = useState<(number | null)[]>(items.map(() => null));
  const done = picked.filter((p) => p !== null).length;
  const pick = (i: number, o: number) => setPicked((p) => p.map((x, j) => (j === i ? o : x)));
  return (
    <div className="flagged">
      <div className="flagged-head">
        <h3 className="fd-h">
          <Icon name="alert" width={15} height={15} /> Needs a person · {items.length} items
        </h3>
        <span className={`pill ${done === items.length ? "" : "warn"}`} aria-live="polite">
          {done} of {items.length} settled
        </span>
      </div>
      <p className="small muted">Rules settle most things. A few need someone who knows the business, so they wait here instead of going into a report.</p>
      <ul className="flag-list">
        {items.map((f, i) => {
          const p = picked[i];
          return (
            <li key={f.text} className={p === null ? "" : "done"}>
              <div>
                <b>{f.text}</b>
                <span className="small muted">{f.ask}</span>
                {p !== null && (
                  <span className="flag-out small">
                    <Icon name="check" width={14} height={14} />
                    {p === 0 ? "Settled. The rule is saved, so next time it's handled automatically." : `Settled. The record is marked for your team to correct in ${ind.sources[1]}.`}
                  </span>
                )}
              </div>
              <div className="flag-btns">
                {p === null ? (
                  f.options.map((o, oi) => (
                    <button key={o} type="button" className={`btn ${oi === 0 ? "btn-primary" : "btn-secondary"} flag-btn`} onClick={() => pick(i, oi)}>
                      {o}
                    </button>
                  ))
                ) : (
                  <button type="button" className="btn btn-ghost flag-btn" onClick={() => setPicked((x) => x.map((v, j) => (j === i ? null : v)))}>
                    Undo
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Business definitions: point at any number ---------- */

export function DefinitionsDemo({ slug = "construction" }: { slug?: IndustrySlug }) {
  const v = useMemo(() => buildView(slug, "large", null, 3), [slug]);
  const defs = definitions[slug];
  const [sel, setSel] = useState(v.kpis[0].key);
  const k = v.kpis.find((x) => x.key === sel) ?? v.kpis[0];
  const d = defs[k.key];
  return (
    <div className="defs">
      <div className="defs-tiles" role="tablist" aria-label="Numbers on the dashboard">
        {v.kpis.map((x) => (
          <button
            key={x.key}
            type="button"
            role="tab"
            aria-selected={sel === x.key}
            className={`defs-tile ${sel === x.key ? "on" : ""}`}
            onClick={() => setSel(x.key)}
            onMouseEnter={() => setSel(x.key)}
            onFocus={() => setSel(x.key)}
          >
            <span className="kpi-l">{x.label}</span>
            <span className="kpi-v tnum">{fmt(x.value, x.fmt)}</span>
            <span className="defs-i" aria-hidden="true">
              <Icon name="book" width={13} height={13} />
            </span>
          </button>
        ))}
      </div>
      {d && (
        <div className="defs-card" role="tabpanel" key={k.key}>
          <h3>{k.label}</h3>
          <dl>
            <div>
              <dt>Means</dt>
              <dd>{d.means}</dd>
            </div>
            <div>
              <dt>Comes from</dt>
              <dd>{d.from}</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{d.updated}</dd>
            </div>
            <div>
              <dt>Owned by</dt>
              <dd>{d.owner}</dd>
            </div>
          </dl>
        </div>
      )}
      <p className="small muted">Point at any number to see its definition. Sample data.</p>
    </div>
  );
}
