import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryExplorer from "@/components/IndustryExplorer";
import IndustryEntry from "@/components/IndustryEntry";
import Icon from "@/components/Icon";
import { CtaBand, Dots, PrimaryCta, SectionHead } from "@/components/ui";
import { industries, industryBySlug } from "@/content/industries";
import { effort } from "@/content/effort";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const ind = industryBySlug((await params).industry);
  if (!ind) return {};
  return { title: ind.name, description: `numarket for ${ind.name.toLowerCase()}: ${ind.questions.join(" ")}` };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const ind = industryBySlug((await params).industry);
  if (!ind) notFound();
  const paths = [effort[0], effort[2]];
  return (
    <>
      <section className="page-hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{ind.name}</span>
            <h1>
              {ind.questions[0]} <em className="accent">Answered live.</em>
            </h1>
            <p className="lead">{ind.changes}</p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <PrimaryCta />
            </div>
          </div>
          <div className="ind-hero reveal" aria-hidden="true">
            <div className="ind-orbit">
              {ind.sources.map((s, i) => (
                <span key={s} className="orb" style={{ ["--a" as string]: `${(360 / ind.sources.length) * i}deg` }}>
                  {s}
                </span>
              ))}
              <div className="ind-center">
                <Icon name={ind.icon} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <IndustryExplorer initialIndustry={ind.slug} initialSize="large" lockIndustry />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="From the field" title="Entered once. Seen everywhere." lead="Fill it in and hit Save." />
          <IndustryEntry slug={ind.slug} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Effort & price" title="How hard, how long, how much." />
          <div className="grid g2 stagger">
            {paths.map((e) => (
              <div className="card effort-card" key={e.id}>
                <span className="pill navy">{e.id === "small" ? "Small / growing" : "Larger organization"}</span>
                <div className="effort-row">
                  <Dots n={e.difficulty} /> <b>{e.difficultyLabel}</b>
                </div>
                <dl className="est-grid">
                  <div>
                    <dt>Your time</dt>
                    <dd>{e.timeRequired.replace(" total", "")}</dd>
                  </div>
                  <div>
                    <dt>First dashboard</dt>
                    <dd>{e.firstDashboard}</dd>
                  </div>
                  <div>
                    <dt>Setup</dt>
                    <dd className="tnum">{e.setup}</dd>
                  </div>
                  <div>
                    <dt>Monthly</dt>
                    <dd className="tnum">{e.monthly}</dd>
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
