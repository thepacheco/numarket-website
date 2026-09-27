import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { CheckList, CtaBand, Faq, PageHero, PrimaryCta, SectionHead } from "@/components/ui";
import { productBySlug, products } from "@/content/products";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  return p ? { title: p.name, description: p.promise } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero eyebrow={`numarket ${p.name} · ${p.step}`} title={p.promise} lead={p.intro}>
        <PrimaryCta />
      </PageHero>
      <section className="section-tight">
        <div className="container split">
          <div>
            <SectionHead eyebrow="What you get" title="Included." />
            <CheckList items={p.get} />
          </div>
          <div className="grid" style={{ gap: 16 }}>
            {p.looks.map((l) => (
              <div className="card" key={l.title}>
                <div className="icon-badge">
                  <Icon name={p.icon} />
                </div>
                <h3>{l.title}</h3>
                <p>{l.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section soft">
        <div className="container grid g2">
          <div className="card">
            <h3>What we need from you</h3>
            <div style={{ marginTop: 12 }}>
              <CheckList items={p.need} />
            </div>
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
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="FAQ" title={`${p.name} questions.`} />
          <Faq items={p.faq} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
