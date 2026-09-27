import type { Metadata } from "next";
import GettingStartedTools from "@/components/GettingStartedTools";
import { CtaBand, Dots, Faq, PageHero, SectionHead } from "@/components/ui";
import { effort, startSteps, valueCompare } from "@/content/effort";
import { faq } from "@/content/faq";
import Link from "next/link";
import { PathArt } from "@/components/HeroArts";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "How hard, how long, how much — before you ever get on a call. Take the readiness quiz and get an instant cost and timeline estimate.",
};

const rows: [string, keyof (typeof effort)[number]][] = [
  ["Your time required", "timeRequired"],
  ["Who's involved on your side", "whoInvolved"],
  ["What we need from you", "needFromYou"],
  ["Time to first dashboard", "firstDashboard"],
  ["Typical setup", "setup"],
  ["Typical monthly", "monthly"],
  ["Disruption to daily work", "disruption"],
  ["Do you need to buy new software?", "newSoftware"],
];

export default function GettingStarted() {
  return (
    <>
      <PageHero
        art={<PathArt />}
        eyebrow="Getting started"
        title={
          <>
            Here&apos;s exactly what <em className="accent">starting</em> looks like.
          </>
        }
        lead="How hard, how long, how much — before you call."
      >
        <div className="btn-row">
          <Link href="#quiz" className="btn btn-primary">
            Take the readiness quiz
          </Link>
          <Link href="#estimator" className="btn btn-secondary">
            Jump to the estimator
          </Link>
        </div>
      </PageHero>

      <GettingStartedTools />

      <section className="section soft">
        <div className="container split">
          <div>
            <SectionHead eyebrow="The 5 steps" title="From first call to first action item." />
          </div>
          <ol className="timeline">
            {startSteps.map((s, i) => (
              <li key={s.title}>
                <span className="num-badge">{i + 1}</span>
                <div>
                  <h3>
                    {s.title} <span className="pill navy">{s.time}</span>
                  </h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Effort" title="How much work is this for you?" />
          <div className="table-wrap">
            <table className="t">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {effort.map((e) => (
                    <th scope="col" key={e.id}>
                      {e.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Difficulty for you</th>
                  {effort.map((e) => (
                    <td key={e.id}>
                      <Dots n={e.difficulty} /> <span style={{ marginLeft: 6 }}>{e.difficultyLabel}</span>
                    </td>
                  ))}
                </tr>
                {rows.map(([label, key]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {effort.map((e) => (
                      <td key={e.id}>{String(e[key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Value" title="Compared to doing it yourself." />
          <div className="grid g3 stagger">
            {valueCompare.map((v) => (
              <div key={v.option} className={`card ${v.highlight ? "tier popular" : ""}`}>
                <h3>{v.option}</h3>
                <p style={{ fontWeight: 700, color: "var(--ink)", margin: "8px 0" }} className="tnum">
                  {v.cost}
                </p>
                <p>{v.reality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Common questions." />
          <Faq items={faq.gettingStarted} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
