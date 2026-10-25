"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import SolidIcon from "./solids/SolidIcon";
import type { SolidKind } from "./solids/geometry";
import { allowance, engineering, hipaaNote, money, productPrices, quote, sizes, tiers, type PriceSize, type PricedProduct } from "@/content/tiers";

const solidOf: Record<PricedProduct, SolidKind> = { foundation: "foundation", workspace: "workspace", insight: "insight" };
const fmtFrom = (n: number, from?: boolean) => `${from ? "from " : ""}${money(n)}`;

/* Build your price: pick a size, turn products on or off. The result is an
   itemized bill: each product and the total, which is exactly their sum. */
export function PriceConfigurator() {
  const [size, setSize] = useState<PriceSize>("mid");
  const [ws, setWs] = useState(true);
  const [ir, setIr] = useState(true);
  const q = quote(size, ws, ir);
  const sz = sizes.find((s) => s.id === size)!;
  const toggle = (id: PricedProduct, on: boolean, set?: (v: boolean) => void, locked?: boolean) => {
    const p = productPrices[id].bySize[size];
    return (
      <label key={id} className={`cfg-prod ${on ? "on" : ""} ${locked ? "locked" : ""}`}>
        <input type="checkbox" checked={on} disabled={locked} onChange={(e) => set?.(e.target.checked)} />
        <SolidIcon kind={solidOf[id]} size={30} />
        <span className="cfg-prod-t">
          <b>{productPrices[id].name}</b>
          <small>
            {p.setup ? `${fmtFrom(p.setup, p.from)} setup` : "No setup fee"} · {fmtFrom(p.monthly, p.from)}/mo{p.note ? ` · ${p.note.toLowerCase()}` : ""}
          </small>
        </span>
        <span className="cfg-switch" aria-hidden="true">
          {locked ? "Required" : on ? "On" : "Off"}
        </span>
      </label>
    );
  };
  return (
    <div className="cfg">
      <div className="cfg-in">
        <fieldset>
          <legend>1. Your size</legend>
          <div className="seg" role="group" aria-label="Size">
            {sizes.map((s) => (
              <button key={s.id} type="button" aria-pressed={size === s.id} onClick={() => setSize(s.id)}>
                {s.name}
              </button>
            ))}
          </div>
          <p className="small muted cfg-limits">
            {sz.sources} · {sz.users} · {sz.rows.replace("Up to about", "up to about")}.{" "}
            <Link href="/getting-started#estimator">Not sure? Take the 2-minute estimate.</Link>
          </p>
        </fieldset>
        <fieldset>
          <legend>2. Products</legend>
          <div className="cfg-prods">
            {toggle("foundation", true, undefined, true)}
            {toggle("workspace", ws, setWs)}
            {toggle("insight", ir, setIr)}
          </div>
        </fieldset>
        <p className="small muted cfg-hipaa">{hipaaNote}</p>
      </div>
      <div className="cfg-out" aria-live="polite">
        <table className="cfg-bill tnum">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Item</span>
              </th>
              <th scope="col">Setup, one time</th>
              <th scope="col">Monthly</th>
            </tr>
          </thead>
          <tbody>
            {(["foundation", "workspace", "insight"] as PricedProduct[])
              .filter((id) => id === "foundation" || (id === "workspace" ? ws : ir))
              .map((id) => {
                const p = productPrices[id].bySize[size];
                return (
                  <tr key={id}>
                    <th scope="row">{productPrices[id].name}</th>
                    <td>{p.setup ? fmtFrom(p.setup, p.from) : "$0"}</td>
                    <td>{fmtFrom(p.monthly, p.from)}</td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Your price</th>
              <td>{fmtFrom(q.setup, q.from)}</td>
              <td>{fmtFrom(q.monthly, q.from)}</td>
            </tr>
          </tfoot>
        </table>
        <p className="cfg-year">
          First year (setup + 12 months): <b className="tnum">{fmtFrom(q.firstYear, q.from)}</b>
        </p>
        <p className="small muted">
          Platform usage: {allowance[size].toLowerCase()}. {sz.updates}. Growing past your size? <Link href="#add-ons">See what extra sources, history, and questions cost.</Link>
        </p>
        <p className="cfg-eng">
          <SolidIcon kind="engineering" size={22} />
          <span>
            <b>Custom work (Engineering):</b> fixed quote per project from {money(engineering.from)}, or {money(engineering.hourly)}/hr.
          </span>
        </p>
      </div>
    </div>
  );
}

/* All three products at each size. Click one to see everything it includes, product by product. */
export function PlanCards() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="plans">
      {tiers.map((t) => {
        const sz = sizes.find((s) => s.id === t.size)!;
        const isOpen = open === t.id;
        return (
          <div key={t.id} className={`plan ${t.popular ? "popular" : ""} ${isOpen ? "open" : ""}`}>
            <button type="button" className="plan-head" aria-expanded={isOpen} aria-controls={`plan-${t.id}`} onClick={() => setOpen(isOpen ? null : t.id)}>
              <span className="plan-name">
                <b>{sz.name}</b>
                <small>
                  {sz.sources} · {sz.users.toLowerCase()}
                </small>
              </span>
              <span className="plan-price tnum">
                <b>
                  {fmtFrom(t.monthlyFrom, t.from)}
                  <small>/mo</small>
                </b>
                <small>+ {fmtFrom(t.setupFrom, t.from)} setup</small>
              </span>
              <span className="plan-more">
                {isOpen ? "Hide details" : "What's included"} <Icon name="chevron" width={14} height={14} />
              </span>
            </button>
            <div id={`plan-${t.id}`} className="plan-body" hidden={!isOpen}>
              {(Object.keys(t.includes) as PricedProduct[]).map((k) => (
                <div key={k} className="plan-group">
                  <h4>
                    <SolidIcon kind={solidOf[k]} size={22} /> {productPrices[k].name}
                  </h4>
                  <ul>
                    {t.includes[k].map((line) => (
                      <li key={line}>
                        <Icon name="check" width={15} height={15} />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Buying products one at a time. */
export function ProductPriceTable() {
  const rows: [string, (s: PriceSize) => string][] = [
    ["Foundation setup (one time)", (s) => fmtFrom(productPrices.foundation.bySize[s].setup, productPrices.foundation.bySize[s].from)],
    ["Foundation monthly", (s) => fmtFrom(productPrices.foundation.bySize[s].monthly, productPrices.foundation.bySize[s].from)],
    ["Workspace setup (one time)", (s) => fmtFrom(productPrices.workspace.bySize[s].setup, productPrices.workspace.bySize[s].from)],
    ["Workspace monthly", (s) => fmtFrom(productPrices.workspace.bySize[s].monthly, productPrices.workspace.bySize[s].from)],
    ["Insight Review monthly", (s) => `${fmtFrom(productPrices.insight.bySize[s].monthly, productPrices.insight.bySize[s].from)} · ${productPrices.insight.bySize[s].note!.toLowerCase()}`],
    ["Engineering", () => `From ${money(engineering.from)} per project, or ${money(engineering.hourly)}/hr`],
  ];
  return (
    <div className="table-wrap">
      <table className="t">
        <thead>
          <tr>
            <th scope="col"></th>
            {sizes.map((s) => (
              <th scope="col" key={s.id}>
                {s.name}
                <small className="th-sub">{s.sources.replace(" data sources", " sources")}</small>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, f]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {label === "Engineering" ? (
                <td colSpan={3}>{f("small")}</td>
              ) : (
                sizes.map((s) => <td key={s.id}>{f(s.id)}</td>)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
