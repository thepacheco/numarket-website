import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, CtaBand, Faq, PageHero, PrimaryCta, SectionHead } from "@/components/ui";
import IndustryExplorer from "@/components/IndustryExplorer";
import PlatformToggle from "@/components/PlatformToggle";
import { faq } from "@/content/faq";
import { EngineeringArt } from "@/components/ProductArt";

export const metadata: Metadata = { title: "Larger Organizations", description: "Make the data you already have ready for AI. Your platform or ours." };

const phases = [
  { title: "Assess", time: "1–2 weeks", body: "Sources, definitions, gaps." },
  { title: "Security review", time: "In parallel", body: "Your questionnaire, your DPA." },
  { title: "One department", time: "6–10 weeks", body: "Prove it in one place." },
  { title: "Expand", time: "Ongoing", body: "Same foundation, more teams." },
];

export default function Enterprise() {
  return (
    <>
      <PageHero
        art={<EngineeringArt />}
        eyebrow="Larger organizations"
        title={
          <>
            Make the data you have <em className="accent">ready for AI.</em>
          </>
        }
        lead="We fix the layer underneath — inside your platform or ours."
      >
        <div className="btn-row">
          <PrimaryCta />
          <Link href="/security" className="btn btn-secondary">
            Security & trust
          </Link>
        </div>
      </PageHero>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div>
            <SectionHead eyebrow="Your platform or ours" title="Where should it live?" lead="Toggle it. The stack is the same." />
          </div>
          <PlatformToggle />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Rollout" title="Start with one department." />
          <ol className="phase-row stagger">
            {phases.map((p, i) => (
              <li key={p.title}>
                <span className="num-badge">{i + 1}</span>
                <b>{p.title}</b>
                <span className="pill navy">{p.time}</span>
                <span className="small muted">{p.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="See it" title="Built for many sites and departments." />
          <IndustryExplorer initialSize="large" />
        </div>
      </section>

      <section className="section soft">
        <div className="container split">
          <div className="card tier popular">
            <span className="badge">Command</span>
            <h3>From $40,000 setup · $10,000/mo</h3>
            <CheckList items={["Unlimited sources and users", "Fully custom dashboards", "Weekly review + daily exec brief", "A dedicated analyst", "Your platform or ours"]} />
          </div>
          <div>
            <SectionHead eyebrow="FAQ" title="IT and leadership ask." />
            <Faq items={faq.enterprise} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
