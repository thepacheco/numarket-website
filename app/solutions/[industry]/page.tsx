import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryExplorer from "@/components/IndustryExplorer";
import Icon from "@/components/Icon";
import { CheckList, CtaBand, Dots, SectionHead } from "@/components/ui";
import { industries, industryBySlug } from "@/content/industries";
import { effort } from "@/content/effort";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const ind = industryBySlug(industry);
  if (!ind) return {};
  return {
    title: `${ind.name}`,
    description: `numarket for ${ind.name.toLowerCase()}: ${ind.questions.join(" ")}`,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const ind = industryBySlug(industry);
  if (!ind) notFound();
  const small = effort[0];
  const large = effort[2];
  return (
    <>
      <section className="page-hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container">
          <div className="icon-badge" style={{ width: 56, height: 56, borderRadius: 16 }}>
            <Icon name={ind.icon} />
          </div>
          <span className="eyebrow">{ind.name}</span>
          <h1>
            {ind.questions[0].replace("?", "")} — <em className="accent">answered live.</em>
          </h1>
          <p className="lead">
            We pull your data from {ind.sources.slice(0, -1).join(", ")} and {ind.sources[ind.sources.length - 1]} into one clean, private database — then give your team
            a Workspace that shows what&apos;s happening and what to do next.
          </p>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <IndustryExplorer initialIndustry={ind.slug} lockIndustry />
        </div>
      </section>

      <section className="section soft">
        <div className="container grid g3">
          <div className="card">
            <div className="icon-badge">
              <Icon name="spreadsheet" />
            </div>
            <h3>Where your data lives today</h3>
            <CheckList items={ind.sources} />
          </div>
          <div className="card">
            <div className="icon-badge">
              <Icon name="chat" />
            </div>
            <h3>Questions you&apos;ll be able to answer</h3>
            <CheckList items={ind.questions} />
          </div>
          <div className="card">
            <div className="icon-badge">
              <Icon name="users" />
            </div>
            <h3>What changes for your team</h3>
            <p>{ind.changes}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Effort & price" title="How hard, how long, how much." />
          <div className="grid g2">
            {[small, large].map((e) => (
              <div className="card" key={e.id}>
                <span className="pill navy">{e.id === "small" ? "Small / growing" : "Larger organization"}</span>
                <dl className="est-grid" style={{ marginTop: 16 }}>
                  <div>
                    <dt>Difficulty</dt>
                    <dd>
                      <Dots n={e.difficulty} /> {e.difficultyLabel}
                    </dd>
                  </div>
                  <div>
                    <dt>Your time</dt>
                    <dd>{e.timeRequired}</dd>
                  </div>
                  <div>
                    <dt>First dashboard</dt>
                    <dd>{e.firstDashboard}</dd>
                  </div>
                  <div>
                    <dt>Typical setup</dt>
                    <dd className="tnum">{e.setup}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
