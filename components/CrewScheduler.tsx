"use client";

import { useState } from "react";
import Icon from "./Icon";
import { industries, type IndustrySlug } from "@/content/industries";
import { money } from "@/content/tiers";

/* An example of a custom app Engineering builds: drag a crew onto a job (or tap
   a crew, then tap a job) and watch that job's labor cost and finish date move. */

type Cfg = { res: string; target: string; people: [string, number][]; work: [number, number, number]; due: [number, number, number] };
const cfg: Record<IndustrySlug, Cfg> = {
  construction: { res: "crew", target: "job", people: [["Framing crew", 3200], ["Concrete crew", 4100], ["Electrical crew", 3800], ["Finish crew", 2900]], work: [24, 36, 14], due: [15, 20, 12] },
  manufacturing: { res: "team", target: "line", people: [["Operator team A", 1900], ["Operator team B", 1900], ["Maintenance tech", 2400], ["Setup tech", 2100]], work: [18, 22, 10], due: [10, 12, 8] },
  "food-production": { res: "cook", target: "kitchen", people: [["Prep cook", 1400], ["Line cook", 1500], ["Baker", 1600], ["Catering lead", 1900]], work: [12, 16, 9], due: [7, 9, 6] },
  healthcare: { res: "nurse", target: "clinic", people: [["Per-diem RN", 1100], ["Per-diem RN (nights)", 1150], ["Medical assistant", 640], ["Float LPN", 820]], work: [14, 20, 8], due: [8, 10, 5] },
  utilities: { res: "crew", target: "district", people: [["Line crew 1", 4200], ["Line crew 2", 4200], ["Vegetation crew", 3100], ["Meter tech", 1500]], work: [20, 28, 12], due: [12, 15, 9] },
  "professional-services": { res: "person", target: "engagement", people: [["Senior consultant", 1800], ["Consultant", 1400], ["Analyst", 950], ["Partner", 3200]], work: [16, 24, 10], due: [9, 14, 7] },
  logistics: { res: "driver", target: "lane", people: [["Driver · Macon", 640], ["Driver · Savannah", 640], ["Team drivers", 1200], ["Owner-operator", 900]], work: [10, 14, 8], due: [6, 8, 5] },
  "real-estate": { res: "tech", target: "property", people: [["Maintenance tech", 560], ["HVAC tech", 780], ["Turnover crew", 1400], ["Painter", 520]], work: [12, 18, 8], due: [7, 10, 6] },
};

const START = new Date(2026, 9, 1); // Thu, Oct 1
function addWorkdays(n: number) {
  const d = new Date(START);
  let left = n;
  while (left > 0) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) left--;
  }
  return d;
}
const fmtDate = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export default function CrewScheduler({ slug }: { slug: IndustrySlug }) {
  const c = cfg[slug];
  const ind = industries.find((i) => i.slug === slug)!;
  const jobs = ind.sites.large.slice(0, 3);
  const [assign, setAssign] = useState<number[][]>([[0], [1], []]);
  const [picked, setPicked] = useState<number | null>(null);
  const where = (p: number) => assign.findIndex((a) => a.includes(p));
  const place = (p: number, j: number) => {
    setAssign((cur) => cur.map((a, i) => (i === j ? (a.includes(p) ? a : [...a, p]) : a.filter((x) => x !== p))));
    setPicked(null);
  };
  const unassign = (p: number) => setAssign((cur) => cur.map((a) => a.filter((x) => x !== p)));
  return (
    <div className="sched">
      <div className="sched-top">
        <span className="label-sample">Custom app example · Sample data</span>
        <p className="small muted">
          Drag a {c.res} onto a {c.target} — or tap a {c.res}, then tap a {c.target}.
        </p>
      </div>
      <div className="sched-pool" aria-label={`${c.res}s`}>
        {c.people.map(([name, rate], p) => (
          <button
            key={name}
            type="button"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(p))}
            onClick={() => setPicked(picked === p ? null : p)}
            aria-pressed={picked === p}
            className={`sched-chip ${where(p) >= 0 ? "busy" : ""} ${picked === p ? "picked" : ""}`}
          >
            <b>{name}</b>
            <small>
              {money(rate)}/day · {where(p) >= 0 ? `on ${jobs[where(p)]}` : "available"}
            </small>
          </button>
        ))}
      </div>
      <div className="sched-jobs">
        {jobs.map((job, j) => {
          const team = assign[j];
          const rate = team.reduce((t, p) => t + c.people[p][1], 0);
          const days = team.length ? Math.ceil(c.work[j] / team.length) : null;
          const late = days !== null && days > c.due[j];
          return (
            <div
              key={job}
              className={`sched-job ${picked !== null ? "target" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => place(Number(e.dataTransfer.getData("text/plain")), j)}
              onClick={() => picked !== null && place(picked, j)}
              role={picked !== null ? "button" : undefined}
              tabIndex={picked !== null ? 0 : -1}
              onKeyDown={(e) => picked !== null && (e.key === "Enter" || e.key === " ") && place(picked, j)}
            >
              <h4>{job}</h4>
              <p className="small muted">
                {c.work[j]} {c.res}-days of work left · due in {c.due[j]} workdays
              </p>
              <div className="sched-team">
                {team.length ? (
                  team.map((p) => (
                    <span key={p} className="sched-tag">
                      {c.people[p][0]}
                      <button type="button" aria-label={`Remove ${c.people[p][0]}`} onClick={(e) => {
                          e.stopPropagation();
                          unassign(p);
                        }}>
                        ×
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="small muted">Nobody assigned</span>
                )}
              </div>
              <dl className="sched-out">
                <div>
                  <dt>Labor cost</dt>
                  <dd className="tnum">{days === null ? "—" : money(rate * days)}</dd>
                </div>
                <div>
                  <dt>Finishes</dt>
                  <dd className={late ? "late" : days !== null ? "ok" : ""}>{days === null ? "Not staffed" : fmtDate(addWorkdays(days))}</dd>
                </div>
              </dl>
              {late && (
                <p className="sched-warn">
                  <Icon name="alert" width={15} height={15} /> {days! - c.due[j]} workdays late — add a {c.res}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
