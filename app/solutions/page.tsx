import type { Metadata } from "next";
import IndustryExplorer from "@/components/IndustryExplorer";
import { CtaBand, FeatureCard, PageHero, SectionHead } from "@/components/ui";
import { industries } from "@/content/industries";
import Icon from "@/components/Icon";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions",
  description: "numarket for small businesses and larger organizations, across eight industries.",
};

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={
          <>
            Pick your business. <em className="accent">See it work.</em>
          </>
        }
        lead="Choose your industry and size. The sources, the dashboard, the questions, and the action items all change to match."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <IndustryExplorer />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="By size" title="Two paths. One click." />
          <div className="grid g2">
            <FeatureCard icon="sprout" title="Small & growing businesses" body="We host it, run it, and explain it. Very easy to start." href="/solutions/small-business" />
            <FeatureCard icon="building" title="Larger organizations" body="Your platform or ours. We work with IT, not against it." href="/solutions/enterprise" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="By industry" title="Built around how your business runs." />
          <div className="grid g4">
            {industries.map((i) => (
              <Link key={i.slug} href={`/solutions/${i.slug}`} className="card">
                <div className="icon-badge">
                  <Icon name={i.icon} />
                </div>
                <h3>{i.name}</h3>
                <p>{i.questions[0]}</p>
              </Link>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 20 }}>
            And more — <Link href="/contact">ask us</Link>. The approach works in any industry.
          </p>
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="By need" title="What are you trying to fix?" />
          <div className="grid g4">
            <FeatureCard icon="spreadsheet" title="Replace spreadsheets" body="Simple input screens your team uses from a phone or desk. Enter it once, everyone sees it." href="/products/workspace" />
            <FeatureCard icon="sparkle" title="Get AI-ready" body="Clean, documented, governed data — the foundation every AI tool needs." href="/getting-started" />
            <FeatureCard icon="check" title="Trust your numbers" body="One source of truth, with checks on every update." href="/products/foundation" />
            <FeatureCard icon="layers" title="Move off old systems" body="Migrations done carefully, with nothing lost." href="/products/engineering" />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
