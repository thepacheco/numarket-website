import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryExplorer from "@/components/IndustryExplorer";
import IndustryEntry from "@/components/IndustryEntry";
import Icon from "@/components/Icon";
import { CtaBand, SectionHead } from "@/components/ui";
import IndustryStory from "@/components/IndustryStory";
import IndustryIso from "@/components/IndustryIso";
import SavingsCalc from "@/components/SavingsCalc";
import { industries, industryBySlug } from "@/content/industries";

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
  return (
    <>
      <section className="page-hero">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-fade" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">{ind.name}</span>
            <h1>
              {ind.questions[0]} <em className="accent">Answered in one place.</em>
            </h1>
            <p className="lead">{ind.changes}</p>
          </div>
          <IndustryIso
            slug={ind.slug}
            mode="hero"
            eager
            className="ind-hero-iso"
            label={`Animated 3D scene of a ${ind.short.toLowerCase()} business.`}
            fallback={
              <div className={`ind-hero ind-${ind.slug}`} aria-hidden="true">
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
            }
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHead eyebrow="How it works here" title="Follow the data." lead="Scroll. Watch it get connected, cleaned, and turned into money found." />
          <IndustryStory slug={ind.slug} />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="Your numbers" title="Run the math yourself." />
          <SavingsCalc initialIndustry={ind.slug} initialSize="large" picker={false} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="The dashboard" title="What your team would see." lead="Filter it. Every number adds up." />
          <IndustryExplorer initialIndustry={ind.slug} initialSize="large" lockIndustry />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="From the field" title="Entered once. Seen everywhere." lead="Fill it in and hit Save." />
          <IndustryEntry slug={ind.slug} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
