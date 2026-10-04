import type { Metadata } from "next";
import Link from "next/link";
import NeedPage from "@/components/NeedPage";
import PaperIntakePicker from "@/components/PaperIntakePicker";
import ScopeBox from "@/components/ScopeBox";
import { EngineeringArt } from "@/components/ProductArt";
import { Faq, SectionHead } from "@/components/ui";
import { engineering, money } from "@/content/tiers";

export const metadata: Metadata = {
  title: "Go From Paper to Digital",
  description: "Paper logs, clipboards, and sign-in sheets, turned into data with a phone form or a scan. Then Foundation keeps it clean with the rest of your numbers.",
};

const steps = [
  ["Pick the paper that matters", "In your Readiness Check, we find the forms behind the numbers you care about most."],
  ["Build the form", "A phone form that follows the paper your team already knows, checked as they type."],
  ["Bring in the history", "If last year's paper matters, we scan it into the same table. If not, you start fresh."],
  ["Retire the paper", "Every entry lands in your clean table, and Foundation keeps it with the rest of your data."],
];

const paperFaq = [
  { q: "Do our crews need new phones or an app?", a: "No. The form opens in the browser on the phones they already carry. Nothing to install." },
  { q: "Can you read handwriting?", a: "Clear handwriting on a consistent form usually reads well. Anything the scan isn't sure about is shown to a person to confirm before it's saved." },
  { q: "What happens to the paper we already have?", a: "If you need the history, we scan it in as part of the project. If you don't, you start fresh from the day the form goes live." },
  { q: "Why isn't this part of Foundation?", a: "Foundation is a monthly service for data that's already in a system. Getting from paper to digital is a one-time build, so it's quoted once, as an Engineering project." },
  { q: "Can we start with one form?", a: "Yes. Most companies start with the one or two forms behind their most important numbers, and add more later." },
];

export default function Page() {
  return (
    <NeedPage
      artBack={<EngineeringArt />}
      eyebrow="Go from paper to digital"
      title={
        <>
          Paper logs and clipboards. <em className="accent">Make them data.</em>
        </>
      }
      lead="When the numbers that matter are still on paper, we start by getting them into a system: a simple phone form, or a scan of the paper you already have."
      demoTitle="Fill in the form, or scan the paper. Watch it land."
      demo={<PaperIntakePicker />}
      points={[
        { icon: "phone", title: "Phone forms for the field", body: "Entered where the work happens, and checked as it's typed." },
        { icon: "file", title: "Scan what you have", body: "Paper already filled in is read into the same table." },
        { icon: "database", title: "Then Foundation takes over", body: "Cleaned, matched, and kept with the rest of your data." },
      ]}
      extra={
        <>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="How it works" title="Four steps, then no more paper." />
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
            <div className="container grid g2" style={{ alignItems: "start" }}>
              <ScopeBox show={["foundation", "engineering"]} />
              <div className="card price-block">
                <h3>What it costs</h3>
                <p className="pb-big tnum">
                  From {money(engineering.from)} <small>per project</small>
                </p>
                <p>A fixed quote for getting your paper into a system, set after a short scoping call.</p>
                <p className="small muted">
                  Once it&apos;s digital, Foundation is a monthly price based on how many sources you have. <Link href="/pricing">See pricing →</Link>
                </p>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="FAQ" title="Questions about paper." />
              <Faq items={paperFaq} />
            </div>
          </section>
        </>
      }
    />
  );
}
