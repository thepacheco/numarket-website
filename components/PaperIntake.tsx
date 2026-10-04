"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { engApps } from "@/content/engApps";
import { industries, type IndustrySlug } from "@/content/industries";

/* Paper to digital (an Engineering project): a phone form — or a scan of the
   paper you already have — writes a row into the clean table, and the
   dashboard updates. Sample data. */

const BASE = [42, 35, 28, 51, 30];

type Row = { id: number; when: string; site: string; qty: number; note: string; via: "Phone" | "Scan" };

export default function PaperIntake({ slug = "construction" }: { slug?: IndustrySlug }) {
  const c = engApps[slug].intake;
  const ind = industries.find((i) => i.slug === slug)!;
  const sites = ind.sites.large.slice(0, 5);
  const start = BASE.map((b) => Math.max(1, Math.round(b * c.scale)));
  const [week, setWeek] = useState<number[]>(start);
  const [rows, setRows] = useState<Row[]>([
    { id: 2, when: "Today 9:40 AM", site: sites[0], qty: Math.max(1, Math.round(8 * c.scale)), note: "", via: "Phone" },
    { id: 1, when: "Yesterday 4:55 PM", site: sites[3], qty: Math.max(1, Math.round(9 * c.scale)), note: "", via: "Scan" },
  ]);
  const [site, setSite] = useState(sites[1]);
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [scan, setScan] = useState<"idle" | "reading" | "read">("idle");
  const [via, setVia] = useState<"Phone" | "Scan">("Phone");
  const [hit, setHit] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const doScan = () => {
    setScan("reading");
    timers.current.push(
      window.setTimeout(() => {
        setSite(sites[2]);
        setQty(String(Math.max(1, Math.round(11 * c.scale))));
        setNote(c.note);
        setVia("Scan");
        setScan("read");
      }, 1300)
    );
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(qty);
    if (!qty || !Number.isFinite(n) || n <= 0) {
      setErr(`Enter ${c.qty.toLowerCase()} (a number above 0).`);
      return;
    }
    setErr("");
    const i = sites.indexOf(site);
    setWeek((w) => w.map((x, j) => (j === i ? x + n : x)));
    setRows((r) => [{ id: (r[0]?.id ?? 0) + 1, when: "Just now", site, qty: n, note, via }, ...r].slice(0, 4));
    setHit(i);
    timers.current.push(window.setTimeout(() => setHit(null), 1600));
    setQty("");
    setNote("");
    setScan("idle");
    setVia("Phone");
  };

  const max = Math.max(...week);
  const total = week.reduce((a, b) => a + b, 0);

  return (
    <div className="p2d">
      <div className="p2d-left">
        <div className={`p2d-paper ${scan}`} aria-hidden={scan === "idle"}>
          <span className="p2d-paper-h">{c.paper}</span>
          <i />
          <i />
          <i className="short" />
          {scan === "reading" && <span className="p2d-scanline" />}
        </div>
        <div className="p2d-phone">
          <div className="p2d-notch" aria-hidden="true" />
          <form className="p2d-form" onSubmit={submit} noValidate>
            <p className="p2d-title">{c.form}</p>
            <button type="button" className="btn btn-secondary p2d-scan" onClick={doScan} disabled={scan === "reading"}>
              <Icon name="file" width={15} height={15} /> {scan === "reading" ? "Reading the page…" : scan === "read" ? "Scanned. Check and send" : "Or scan the paper form"}
            </button>
            <label>
              <span>{ind.siteNoun.one}</span>
              <select value={site} onChange={(e) => setSite(e.target.value)} className={scan === "read" ? "filled" : ""}>
                {sites.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              <span>
                {c.qty} ({c.unit})
              </span>
              <input inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value.replace(/[^\d.]/g, ""))} placeholder="0" className={scan === "read" ? "filled" : ""} aria-invalid={!!err} />
            </label>
            <label>
              <span>Note</span>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" className={scan === "read" && note ? "filled" : ""} />
            </label>
            {err && (
              <p className="p2d-err" role="alert">
                {err}
              </p>
            )}
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="p2d-right">
        <div className="ea-panel">
          <h3 className="ea-h">
            <Icon name="see" width={14} height={14} /> {c.qty} this week · by {ind.siteNoun.one.toLowerCase()}
          </h3>
          <p className="ea-big tnum">
            {total.toLocaleString("en-US")} <small>{c.unit}</small>
          </p>
          <div className="p2d-bars">
            {sites.map((s, i) => (
              <div key={s} className={`p2d-bar ${hit === i ? "hit" : ""}`}>
                <span>{s}</span>
                <span className="p2d-track">
                  <i style={{ width: `${(week[i] / max) * 100}%` }} />
                </span>
                <b className="tnum">{week[i].toLocaleString("en-US")}</b>
              </div>
            ))}
          </div>
        </div>
        <div className="ea-panel">
          <h3 className="ea-h">
            <Icon name="lock" width={14} height={14} /> Your clean table
          </h3>
          <table className="p2d-table">
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">{ind.siteNoun.one}</th>
                <th scope="col">{c.unit}</th>
                <th scope="col">From</th>
              </tr>
            </thead>
            <tbody aria-live="polite">
              {rows.map((r, idx) => (
                <tr key={r.id} className={idx === 0 && r.when === "Just now" ? "new" : ""}>
                  <td>{r.when}</td>
                  <td>{r.site}</td>
                  <td className="tnum">{r.qty.toLocaleString("en-US")}</td>
                  <td>{r.via}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
