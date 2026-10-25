import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { DocsSide, Helpful } from "@/components/Docs";
import { docBySlug, docHref, docs } from "@/content/docs";

export const dynamicParams = false;
export function generateStaticParams() {
  return docs.filter((d) => !d.href).map((d) => ({ slug: d.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const d = docBySlug((await params).slug);
  return d ? { title: `${d.title} · Docs`, description: d.summary } : {};
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = docBySlug((await params).slug);
  if (!d || d.href) notFound();
  const i = docs.indexOf(d);
  const prev = docs[i - 1];
  const next = docs[i + 1];
  return (
    <section className="section-tight">
      <div className="container docs2">
        <DocsSide current={d.slug} />
        <article className="doc-article prose">
          <nav className="small muted" aria-label="Breadcrumb">
            <Link href="/docs">Docs</Link> / {d.group}
          </nav>
          <h1>{d.title}</h1>
          <p className="lead">{d.summary}</p>
          {d.body.map((b, k) => (
            <div key={k}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.ol && (
                <ol>
                  {b.ol.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              )}
              {b.ul && (
                <ul>
                  {b.ul.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
              {b.note && (
                <div className="doc-callout">
                  <Icon name="alert" />
                  <span>{b.note}</span>
                </div>
              )}
            </div>
          ))}
          <Helpful title={d.title} />
          <div className="doc-nav">
            {prev ? (
              <Link href={docHref(prev)}>
                <span>← Previous</span>
                {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={docHref(next)} style={{ textAlign: "right" }}>
                <span>Next →</span>
                {next.title}
              </Link>
            ) : (
              <span />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
