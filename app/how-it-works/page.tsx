import type { Metadata } from "next";
import DataJourney from "@/components/DataJourney";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";
import { steps } from "@/content/steps";

export const metadata: Metadata = { title: "How It Works", description: "Collect, Clean, Secure, See, Act, Own — six steps from scattered data to clear action." };

const youWe: Record<string, [string, string]> = {
  collect: ["List your tools. Share read-only logins.", "Connect everything. Automatic updates."],
  clean: ["Answer a few questions.", "Fix duplicates and mismatches. Add checks."],
  secure: ["Say who sees what.", "Build your private, encrypted database."],
  see: ["Pick spreadsheets to retire. 30-min training.", "Dashboards, input screens, Ask Your Data."],
  act: ["Show up. Act on the list.", "Review your numbers. Hand you action items."],
  own: ["Nothing. It's yours.", "Full export or handover if you ever leave."],
};

const timeline = [
  ["Week 0", "Readiness Check"],
  ["Week 1", "Proposal"],
  ["Week 1–2", "Kickoff"],
  ["Weeks 2–10", "Build"],
  ["Launch", "Training"],
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
      />
      <DataJourney />
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Timeline" title="What happens when." />
          <ol className="tl-h stagger">
            {timeline.map(([w, t]) => (
              <li key={w}>
                <span className="tnum">{w}</span>
                <strong>{t}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Who does what" title="You vs. us." />
          <div className="table-wrap reveal">
            <table className="t">
              <thead>
                <tr>
                  <th scope="col">Step</th>
                  <th scope="col">You</th>
                  <th scope="col">Us</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((s) => (
                  <tr key={s.key}>
                    <th scope="row">
                      {s.n}. {s.title}
                    </th>
                    <td>{youWe[s.key][0]}</td>
                    <td>{youWe[s.key][1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
