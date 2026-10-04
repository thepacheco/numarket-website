import type { Metadata } from "next";
import NeedPage from "@/components/NeedPage";
import { ReconcileDemo } from "@/components/NeedDemos";
import { CheckLog, DictionarySample, WhatGoesWrong } from "@/components/NeedExtras";
import { Faq, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Trust Your Numbers", description: "One source of truth. Duplicates removed, names matched, every number defined, and checks on every update." };

const causes = [
  { t: "Entered twice", ex: "An invoice keyed into QuickBooks and the job spreadsheet. One report counts it twice.", fix: "Duplicates found and merged automatically." },
  { t: "Named differently", ex: "“Rt 9 Bridge” in accounting, “Route 9 Bridge” in Procore. The reports can't line them up.", fix: "Names matched to one record." },
  { t: "Defined differently", ex: "Finance counts revenue when invoiced; sales counts it when signed. Both are “right.”", fix: "One written definition per number." },
  { t: "Pulled at different times", ex: "One report was exported Monday, the other Friday. They'll never agree.", fix: "Every report reads the same updated database." },
];

const trustFaq = [
  { q: "What happens when a check fails?", a: "The odd rows are held back from every dashboard and report, and we're alerted. If our cleaning can fix it, we do. If the problem is in your source system, we show your team the exact record so it can be corrected there." },
  { q: "Who decides what a number means?", a: "You do. We draft the definitions from how your team already talks about the business, then a named person on your side approves each one." },
  { q: "Can we see who changed what?", a: "Yes. Every change made in an input screen is logged with who, what, and when." },
  { q: "Do we have to stop using our current reports?", a: "No. Point them at the clean database and they'll finally agree with each other." },
];

export default function Page() {
  return (
    <NeedPage
      eyebrow="Trust your numbers"
      title={
        <>
          Three reports. Three totals. <em className="accent">One truth.</em>
        </>
      }
      lead="Stop arguing about whose number is right. We give every report the same clean, checked numbers — and write down what each one means."
      demoTitle="Clean and match."
      demo={<ReconcileDemo />}
      points={[
        { icon: "clean", title: "Duplicates removed", body: "Entered twice? Counted once." },
        { icon: "users", title: "Names matched", body: "“ACME Corp.” and “Acme Corporation” are one customer." },
        { icon: "shield", title: "Checked every update", body: "Odd rows are held back and sent for review." },
      ]}
      extra={
        <>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="Why reports disagree" title="Four reasons. All fixable." />
              <WhatGoesWrong items={causes} />
            </div>
          </section>
          <section className="section soft">
            <div className="container split">
              <SectionHead eyebrow="Checked every update" title="Problems are caught before anyone sees them." lead="Every time your data updates, automatic checks run first. Anything odd is held back, not published." />
              <CheckLog />
            </div>
          </section>
          <section className="section">
            <div className="container">
              <SectionHead eyebrow="One definition per number" title="Everyone means the same thing." lead="Every number in your dashboards has a written definition, a source, and an owner on your team." />
              <DictionarySample />
            </div>
          </section>
          <section className="section soft">
            <div className="container">
              <SectionHead eyebrow="FAQ" title="Questions about trust." />
              <Faq items={trustFaq} />
            </div>
          </section>
        </>
      }
    />
  );
}
