import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import InsightDemo from "@/components/InsightDemo";
import { MigrationDemo, ReconcileDemo } from "@/components/NeedDemos";
import { ProductArt, ProductGlyph } from "@/components/ProductArt";
import WorkspaceDemo from "@/components/WorkspaceDemo";
import ProductStory from "@/components/ProductStory";
import { CtaBand, Faq, PrimaryCta, SectionHead } from "@/components/ui";
import { productBySlug, products } from "@/content/products";
import Roles from "@/components/Roles";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  return p ? { title: p.name, description: p.promise } : {};
}

const demoTitle: Record<string, [string, string]> = {
  foundation: ["See it clean", "Three reports. Watch them agree."],
  workspace: ["Try it", "Change a number. Ask a question."],
  insight: ["Run a review", "From numbers to a to-do list."],
  engineering: ["Watch a migration", "Move it. Check it. Switch off the old one."],
};

function Demo({ kind }: { kind: string }) {
  if (kind === "foundation") return <ReconcileDemo />;
  if (kind === "workspace") return <WorkspaceDemo />;
  if (kind === "insight") return <InsightDemo />;
  return <MigrationDemo />;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  const [dEyebrow, dTitle] = demoTitle[p.kind];
  return (
    <div style={{ ["--pc" as string]: `var(--p-${p.kind})` }}>
      <section className="page-hero prod-hero">
        <div className="prod-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow prod-eyebrow">
              <ProductGlyph kind={p.kind} small /> {p.name} · {p.step}
            </span>
            <h1>{p.promise}</h1>
            <p className="lead">{p.intro}</p>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <PrimaryCta />
            </div>
          </div>
          <div className="prod-art reveal">
            <ProductArt kind={p.kind} eager />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="get-grid stagger">
            {p.get.map((g) => (
              <div key={g} className="get-item">
                <Icon name="check" />
                {g}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <SectionHead eyebrow="How it works" title="Scroll through it." />
          <ProductStory kind={p.kind} />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow={dEyebrow} title={dTitle} />
          <Demo kind={p.kind} />
        </div>
      </section>

      {p.kind === "workspace" && (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Who uses it" title="Everyone sees the same numbers." lead="Each person gets the view they need." />
            <Roles />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container grid g2 stagger">
          <div className="card">
            <h3>What we need from you</h3>
            <ul className="check-list" style={{ marginTop: 12 }}>
              {p.need.map((n) => (
                <li key={n}>
                  <Icon name="check" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>Included in</h3>
            <p style={{ marginTop: 8 }}>{p.includedIn}</p>
            <p style={{ marginTop: 12 }}>
              <a href="/pricing">See pricing →</a>
            </p>
          </div>
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="FAQ" title="Questions." />
          <Faq items={p.faq} />
        </div>
      </section>
      <CtaBand />
    </div>
  );
}
