import type { Metadata } from "next";
import NeedPage from "@/components/NeedPage";
import { AiCompare } from "@/components/NeedDemos";
import WorkspaceDemo from "@/components/WorkspaceDemo";
import { ReadinessLadder, WhatGoesWrong } from "@/components/NeedExtras";
import { Faq, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Get AI-Ready", description: "AI is only as good as the data under it. We fix the foundation first, so the answers you get are right." };

const wrong = [
  { t: "Counted twice", ex: "The same customer is in the CRM and in QuickBooks. AI adds them up and reports revenue 18% too high.", fix: "Duplicates merged before anything is asked." },
  { t: "Different names", ex: "“ACME Corp.” and “Acme Corporation” look like two customers, so your biggest account looks smaller than it is.", fix: "Names matched to one record." },
  { t: "No definition", ex: "Ask “what was revenue?” and get invoiced in one place, collected in another. Both sound confident.", fix: "Every number defined once, in writing." },
  { t: "Out of date", ex: "Last month's spreadsheet was the newest file it could find, so the answer is a month old.", fix: "Data updated on a schedule and checked for freshness." },
];

const steps = [
  ["One clean database", "Every source collected and matched, so there's one copy of the truth for AI to read."],
  ["Written definitions", "“Revenue,” “job cost,” “active customer” — defined with you, once, and used by every answer."],
  ["Checks on every update", "Bad rows are held back before AI or a person ever sees them."],
  ["The right access", "Each person — and the AI answering them — sees only what they're allowed to."],
];

const aiFaq = [
  { q: "Do we need to buy an AI tool?", a: "No. Ask Your Data comes with Workspace. Type a question in plain English and get an answer from your own numbers." },
  { q: "How do we know the answer is right?", a: "Answers come from your cleaned database and the definitions we wrote with you, and they show the numbers they used. If a question can't be answered from your data, it says so." },
  { q: "Where does our data go?", a: "It stays in your private database, separate from every other client. Ask Your Data runs there." },
  { q: "How long until we're AI-ready?", a: "As long as Foundation takes to set up: about 2–10 weeks depending on size. You can start asking questions the day Workspace launches." },
  { q: "Can we use other AI tools on top?", a: "Yes. Once your data is clean and defined, other tools can use it through the same access rules. We can set that up as Engineering work." },
];

export default function Page() {
  return (
    <NeedPage
      eyebrow="Get AI-ready"
      title={
        <>
          AI is only as good as <em className="accent">the data under it.</em>
        </>
      }
      lead="Everyone is being told to use AI. On messy data, it gives confident wrong answers. We fix the foundation first, so it's right."
      demoTitle="Same question. Messy data vs. clean data."
      demo={<AiCompare />}
      points={[
        { icon: "clean", title: "Clean first", body: "One matched set of numbers." },
        { icon: "book", title: "Your definitions", body: "“Revenue” means what you mean." },
        { icon: "sparkle", title: "Any AI tool", body: "Ask in plain English today. Plug in more tomorrow." },
      ]}
      extra={
        <>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="Why AI gets it wrong" title="Four ways messy data fools AI." lead="Each one is fixed before the first question is asked." />
              <WhatGoesWrong items={wrong} />
            </div>
          </section>
          <section className="section soft">
            <div className="container">
              <SectionHead eyebrow="How ready are you?" title="Five levels, from scattered to AI-ready." lead="Click a level to see what it looks like and what it takes." />
              <ReadinessLadder />
            </div>
          </section>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="What we put in place" title="Four things AI needs underneath it." />
              <ol className="ai-steps stagger">
                {steps.map(([t, b], i) => (
                  <li key={t}>
                    <span className="s3-n">{i + 1}</span>
                    <h3>{t}</h3>
                    <p>{b}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <section className="section soft">
            <div className="container">
              <SectionHead eyebrow="Ask Your Data" title="Plain English. Real numbers." lead="Pick an industry and ask. Every answer comes from the sample records." />
              <WorkspaceDemo initialTab="ask" />
            </div>
          </section>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="FAQ" title="AI questions owners ask." />
              <Faq items={aiFaq} />
            </div>
          </section>
        </>
      }
    />
  );
}
