import type { Metadata } from "next";
import { CtaBand, FeatureCard, PageHero, SectionHead } from "@/components/ui";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Foundation, Workspace, Insight Review, and Engineering — a clean, hosted, living database with apps and action items on top.",
};

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            A clean, living database — <em className="accent">and everything built on it.</em>
          </>
        }
        lead="Every engagement uses Foundation and Workspace. Insight Review is included in every subscription. Engineering is there when you need it."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid g2">
            {products.map((p) => (
              <FeatureCard key={p.slug} icon={p.icon} title={`${p.name} · ${p.step}`} body={p.promise} href={`/products/${p.slug}`} />
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <SectionHead title="How they fit together" />
            <div className="stack-diagram">
              <div className="lvl l4">Insight Review — what to do next</div>
              <div className="lvl l3">Workspace — dashboards · input screens · Ask Your Data · alerts</div>
              <div className="lvl l2">Foundation — your private, clean database</div>
              <div className="lvl l1">Your systems &amp; spreadsheets</div>
              <div className="lvl side">Engineering — migrations, custom apps, your platform</div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
