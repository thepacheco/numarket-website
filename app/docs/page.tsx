import type { Metadata } from "next";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Documentation", description: "Plain-language guides for numarket clients." };

const sections = [
  { id: "getting-started", title: "Getting started", items: [["What happens at kickoff", "A one-hour call. We confirm who needs what, get read-only access to your tools, and set the build schedule."], ["What access we need", "Read-only access to each system we connect — accounting, project tools, file storage. Never admin rights we don't need."], ["How to grant read-only access", "We send step-by-step instructions for each tool you use (QuickBooks, Procore, SharePoint, Google Drive, and more) at kickoff."]] },
  { id: "workspace", title: "Using your Workspace", items: [["Signing in", "Every user gets a named account with multi-factor sign-in."], ["Entering data in input screens", "Fill in the form and save. Entries are checked as you type and logged with your name and time."], ["Asking your data questions", "Ask the way you'd ask a colleague: “Which jobs are over budget this month?” Be specific about time and place for the best answers."], ["Setting up alerts", "Tell your analyst the line you care about (a budget, a count, a date). You'll get an email or chat message when it's crossed."]] },
  { id: "your-data", title: "Your data", items: [["Data dictionary", "Every metric in your Workspace has a plain-English definition, written with your team."], ["How often data refreshes", "Most sources update automatically every few hours or daily, depending on the tool. Your data dictionary shows each source's schedule."], ["If a number looks wrong", "Tell us. We trace it back to the source, fix it, and add a check so it doesn't happen again."]] },
  { id: "change-requests", title: "Change requests", items: [["Requesting a change", "Email or message your analyst with what you want to see and why. Each plan includes monthly change hours; we'll tell you before anything goes over."]] },
  { id: "security", title: "Security", items: [["Adding or removing users", "Ask your analyst, or your admin can do it in the Workspace. Removed users lose access immediately."]] },
  { id: "leaving", title: "Leaving numarket", items: [["Export and handover", "After your term, request an export (CSV or Parquet) or a full account transfer. We complete it within 30 days, at no charge."]] },
  { id: "glossary", title: "Glossary", items: [["Database", "Where your clean data is stored — privately, just for your company."], ["Automatic data updates", "Secure connections that copy data from your tools on a schedule (sometimes called “pipelines”)."], ["Dashboard", "A live screen of your key numbers."], ["Ask Your Data", "Plain-English questions answered from your own numbers."], ["Platform usage", "The storage and computing cost of running your database. Included up to an allowance."]] },
];

export default function Docs() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Client guides, in plain English." lead="How to get started, use your Workspace, and get the most from your data." />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container docs">
          <nav className="docs-nav" aria-label="Documentation">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <div className="prose">
            {sections.map((s) => (
              <div key={s.id} id={s.id} style={{ scrollMarginTop: 90 }}>
                <h2>{s.title}</h2>
                {s.items.map(([h, b]) => (
                  <div key={h}>
                    <h3>{h}</h3>
                    <p>{b}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
