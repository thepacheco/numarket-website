import type { Metadata } from "next";
import Link from "next/link";
import DataJourney from "@/components/DataJourney";
import ProductSolid from "@/components/solids/ProductSolid";
import { SetupTimeline } from "@/components/PricingOps";
import { CtaBand, SectionHead } from "@/components/ui";
import SolidsField from "@/components/solids/SolidsField";
import { steps } from "@/content/steps";
import type { SolidKind } from "@/components/solids/geometry";

export const metadata: Metadata = { title: "How It Works", description: "Collect, Clean, Secure, See, Act, Own — what happens from the first call to your first monthly review, who does what, and what you get." };

const detail: Record<string, { we: string; you: string; get: string }> = {
  collect: { we: "Find every source and connect it with read-only access.", you: "List your tools and share read-only logins.", get: "All your data flowing into one place on a schedule." },
  clean: { we: "Fix duplicates, errors, and mismatched names. Add checks on every update.", you: "Answer a few questions about what your numbers mean.", get: "Numbers that agree, and a plain-English dictionary." },
  secure: { we: "Build your private, encrypted database and set who sees what.", you: "Tell us who should see what.", get: "One secure home for your data, with every login recorded." },
  see: { we: "Set up dashboards, input screens, Ask Your Data, and alerts from our building blocks.", you: "Pick the spreadsheets to retire. Join a 30-minute training.", get: "An app your team signs into with the Microsoft or Google account they already use." },
  act: { we: "Review your numbers and write action items with owners and due dates.", you: "Show up and act on the list.", get: "A short to-do list every review, with follow-up on the last one." },
  own: { we: "Keep everything documented and ready to hand over.", you: "Nothing.", get: "Your data, cleaning rules, apps, and dictionary if you ever leave." },
};

const productRow: { kind: SolidKind; href: string; steps: string; name: string }[] = [
  { kind: "foundation", href: "/products/foundation", steps: "Collect · Clean · Secure", name: "Foundation" },
  { kind: "workspace", href: "/products/workspace", steps: "See", name: "Workspace" },
  { kind: "insight", href: "/products/insight-review", steps: "Act", name: "Insight Review" },
  { kind: "engineering", href: "/products/engineering", steps: "Build (optional)", name: "Engineering" },
];

export default function HowItWorks() {
  return (
    <>
      <section className="page-hero hiw-hero">
        <SolidsField textZone="left" seed={5} />
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h1>
            From scattered to <em className="accent">sure</em>, in six steps.
          </h1>
          <p className="lead">Here&apos;s exactly what happens from the first call to your first monthly review — who does what, how long it takes, and what you get at each step.</p>
          <dl className="hiw-facts">
            <div>
              <dt className="tnum">2–10 weeks</dt>
              <dd>to launch</dd>
            </div>
            <div>
              <dt className="tnum">3–40 hours</dt>
              <dd>of your team&apos;s time, depending on size</dd>
            </div>
            <div>
              <dt>You own your data</dt>
              <dd>at every step, and at the end</dd>
            </div>
          </dl>
          <div className="hiw-products">
            {productRow.map((p) => (
              <Link key={p.kind} href={p.href} className="hiw-prod" data-solid-host>
                <span className="hiw-solid">
                  <ProductSolid kind={p.kind} scale={0.4} />
                </span>
                <span>
                  <small>{p.steps}</small>
                  <b>{p.name}</b>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <DataJourney />
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Step by step" title="What we do. What you do. What you get." />
          <ol className="steps3 stagger">
            {steps.map((s) => (
              <li key={s.key}>
                <span className="s3-n">{s.n}</span>
                <h3>{s.title}</h3>
                <dl>
                  <dt>We</dt>
                  <dd>{detail[s.key].we}</dd>
                  <dt>You</dt>
                  <dd>{detail[s.key].you}</dd>
                  <dt>You get</dt>
                  <dd>{detail[s.key].get}</dd>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Timeline" title="From kickoff to launch." lead="Pick a size. Your part is marked with a person." />
          <SetupTimeline />
        </div>
      </section>
      <section className="section soft">
        <div className="container fits-teaser">
          <div>
            <SectionHead eyebrow="How it fits together" title="Three products, one optional add-on." lead="Foundation is the base. Workspace reads from it. Insight Review reads from both. Engineering is custom work on top." />
            <Link href="/platform" className="more">
              See how they fit, what runs underneath, and what you get if you leave →
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
