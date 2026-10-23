import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { legal } from "@/content/legal";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(legal).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const d = legal[(await params).doc];
  return d ? { title: d.title, robots: { index: false } } : {};
}

/* Change this date whenever the legal text changes. */
const legalEffective = "October 23, 2026";

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const key = (await params).doc;
  const d = legal[key];
  if (!d) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={d.title} lead={d.lead} />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container docs2">
          <aside className="docs-side" aria-label="Legal pages">
            <nav className="docs-group">
              <h2>Legal</h2>
              {Object.entries(legal).map(([k, v]) => (
                <Link key={k} href={`/legal/${k}`} aria-current={k === key ? "page" : undefined}>
                  {v.title}
                </Link>
              ))}
            </nav>
            <nav className="docs-group">
              <h2>On this page</h2>
              {d.sections.map(([h], i) => (
                <a key={h} href={`#s${i + 1}`}>
                  {h.replace(/^\d+\.\s*/, "")}
                </a>
              ))}
            </nav>
          </aside>
          <article className="doc-article prose">
            <p className="small muted">Effective {legalEffective} · Last updated {legalEffective}</p>
            {d.sections.map(([h, ps], i) => (
              <section key={h} id={`s${i + 1}`} style={{ scrollMarginTop: 90 }}>
                <h2>{h}</h2>
                {ps.map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
