import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { steps } from "@/content/steps";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Collect, Clean, Secure, See, Act, Own — the six steps from scattered data to clear action.",
};

const youWe: Record<string, [string, string]> = {
  collect: ["Share a list of your tools and read-only logins.", "Find every source, connect it, and set up automatic updates."],
  clean: ["Answer a few questions about what numbers mean.", "Fix duplicates and mismatches, set up checks, write the data dictionary."],
  secure: ["Tell us who should see what.", "Build your private, encrypted database and set up access."],
  see: ["Tell us which spreadsheets to retire. Join a 30-minute training.", "Build dashboards, input screens, Ask Your Data, and alerts."],
  act: ["Show up to your Insight Review and act on the list.", "Review your numbers and hand you action items with owners."],
  own: ["Nothing — it's yours.", "Hand over a full export or the whole account within 30 days if you leave."],
};

const timeline = [
  ["Week 0", "Readiness Check"],
  ["Week 1", "Proposal"],
  ["Week 1–2", "Kickoff"],
  ["Weeks 2–10", "Build"],
  ["Launch", "Training + first review"],
  ["Monthly", "Insight Reviews"],
];

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={
          <>
            From scattered to <em className="accent">sure</em>, in six steps.
          </>
        }
        lead="AI is only as good as the data under it. We fix the foundation first — so your dashboards, your apps, and your AI are actually right."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <ol className="tl-h">
            {timeline.map(([w, t]) => (
              <li key={w}>
                <span className="tnum">{w}</span>
                <strong>{t}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {steps.map((s, i) => (
        <section key={s.key} className={`section ${i % 2 ? "soft" : ""}`}>
          <div className="container split">
            <div>
              <span className="eyebrow">Step {s.n}</span>
              <h2 style={{ margin: "12px 0 14px" }}>{s.title}</h2>
              <p className="lead">{s.plain}</p>
              <p className="muted" style={{ marginTop: 14 }}>
                {s.detail}
              </p>
            </div>
            <div className="table-wrap">
              <table className="t" style={{ minWidth: 0 }}>
                <thead>
                  <tr>
                    <th scope="col">What you do</th>
                    <th scope="col">What we do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{youWe[s.key][0]}</td>
                    <td>
                      <span style={{ display: "inline-flex", gap: 8 }}>
                        <Icon name={s.key} width={18} height={18} style={{ color: "var(--green-700)", flex: "none", marginTop: 3 }} />
                        {youWe[s.key][1]}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
