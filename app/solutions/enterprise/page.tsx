import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBand, Dots, Faq, FeatureCard, PageHero, PrimaryCta, SectionHead } from "@/components/ui";
import IndustryExplorer from "@/components/IndustryExplorer";
import { effort } from "@/content/effort";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Larger Organizations",
  description: "Make the data you already have ready for AI. Your platform or ours. We work with IT, not against it.",
};

const phases = [
  { title: "Readiness assessment", time: "1–2 weeks", body: "We map sources, definitions, and gaps, and score readiness by department." },
  { title: "Security review", time: "In parallel", body: "We complete your questionnaire, sign your DPA or provide ours, and agree on access." },
  { title: "One department first", time: "6–10 weeks", body: "Prove it in one area — finance, operations, or a single business unit." },
  { title: "Expand", time: "Ongoing", body: "Add departments on the same foundation, with shared business definitions." },
];

export default function Enterprise() {
  const e = effort[2];
  return (
    <>
      <PageHero
        eyebrow="Larger organizations"
        title={
          <>
            Make the data you already have <em className="accent">ready for AI.</em>
          </>
        }
        lead="You have tools. Leadership wants an AI plan. But departments report differently and nobody trusts the numbers. We fix the layer underneath — inside your platform or ours."
      >
        <div className="btn-row">
          <PrimaryCta />
          <Link href="/security" className="btn btn-secondary">
            Security & trust
          </Link>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="container grid g3">
          <FeatureCard icon="layers" title="Your platform or ours" body="If IT already runs a cloud data platform, we build inside it. If not, we host it for you. Either way, you own it." />
          <FeatureCard icon="handshake" title="We work with IT" body="We don't fight IT — we make their investment pay off, with read-only access and named accounts." />
          <FeatureCard icon="check" title="One set of definitions" body="Revenue, margin, and headcount mean the same thing in every department and every AI answer." />
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Phased rollout" title="Start with one department." lead="The fastest way to earn trust across a large organization is to prove it in one place first." />
          </div>
          <ol className="timeline">
            {phases.map((p, i) => (
              <li key={p.title}>
                <span className="num-badge">{i + 1}</span>
                <div>
                  <h3>
                    {p.title} <span className="pill navy">{p.time}</span>
                  </h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="See it" title="Built for multiple sites and departments." lead="Sample data sized for a larger organization." />
          <IndustryExplorer initialSize="large" />
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div className="card">
            <span className="pill navy">Command</span>
            <h3 style={{ margin: "14px 0 8px" }}>From $40,000 setup · $10,000/mo</h3>
            <CheckList
              items={[
                "Unlimited data sources and users",
                "Fully custom dashboards, input screens, and automations",
                "Weekly Insight Review + daily executive brief",
                "A dedicated analyst",
                "Your platform or ours",
                "12–36 month terms",
              ]}
            />
          </div>
          <div className="card">
            <span className="pill navy">Your effort</span>
            <h3 style={{ margin: "14px 0 6px" }}>
              <Dots n={e.difficulty} /> {e.difficultyLabel}
            </h3>
            <dl className="est-grid" style={{ margin: "16px 0 20px" }}>
              <div>
                <dt>Your time</dt>
                <dd>{e.timeRequired}</dd>
              </div>
              <div>
                <dt>First dashboard</dt>
                <dd>{e.firstDashboard}</dd>
              </div>
              <div>
                <dt>Who&apos;s involved</dt>
                <dd>{e.whoInvolved}</dd>
              </div>
              <div>
                <dt>New software?</dt>
                <dd>{e.newSoftware}</dd>
              </div>
            </dl>
            <p>
              Need migrations or custom apps? See <Link href="/products/engineering">Engineering</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Questions IT and leadership ask." />
          <Faq items={faq.enterprise} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
