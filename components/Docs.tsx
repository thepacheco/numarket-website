"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon from "./Icon";
import { docGroups, docs, docText } from "@/content/docs";
import { site } from "@/content/site";

function useSearch(q: string) {
  return useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const words = t.split(/\s+/);
    return docs
      .map((d) => {
        const text = docText(d).toLowerCase();
        const score = words.reduce((s, w) => s + (d.title.toLowerCase().includes(w) ? 3 : 0) + (text.includes(w) ? 1 : 0), 0);
        return { d, score, ok: words.every((w) => text.includes(w)) };
      })
      .filter((x) => x.ok)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.d);
  }, [q]);
}

function Highlight({ text, q }: { text: string; q: string }) {
  const w = q.trim().split(/\s+/).filter(Boolean)[0];
  if (!w) return <>{text}</>;
  const i = text.toLowerCase().indexOf(w.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + w.length)}</mark>
      {text.slice(i + w.length)}
    </>
  );
}

function SearchBox({ q, setQ, id }: { q: string; setQ: (v: string) => void; id: string }) {
  return (
    <div className="docs-search">
      <label htmlFor={id} className="sr-only">
        Search the docs
      </label>
      <Icon name="search" />
      <input id={id} type="search" placeholder="Search the docs…" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
    </div>
  );
}

/* Hub: big search + results, or the grouped list when empty */
export function DocsHub() {
  const [q, setQ] = useState("");
  const hits = useSearch(q);
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ maxWidth: 560 }}>
        <SearchBox q={q} setQ={setQ} id="docs-q" />
      </div>
      {q.trim() ? (
        <div className="docs-results" aria-live="polite">
          <p className="small muted">
            {hits.length} result{hits.length === 1 ? "" : "s"}
          </p>
          {hits.map((d) => (
            <Link key={d.slug} href={`/docs/${d.slug}`} className="docs-hit">
              <b>
                <Highlight text={d.title} q={q} />
              </b>
              <span>
                <Highlight text={d.summary} q={q} />
              </span>
            </Link>
          ))}
          {hits.length === 0 && (
            <p>
              Nothing yet. <a href={`mailto:${site.email}?subject=Docs question`}>Ask us</a> and we&apos;ll add it.
            </p>
          )}
        </div>
      ) : (
        <div className="grid g3 stagger">
          {docGroups.map((g) => (
            <div key={g} className="card">
              <h2 className="tier-name" style={{ marginBottom: 10 }}>
                {g}
              </h2>
              <ul className="check-list">
                {docs
                  .filter((d) => d.group === g)
                  .map((d) => (
                    <li key={d.slug}>
                      <Icon name="arrow" />
                      <Link href={`/docs/${d.slug}`}>{d.title}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Article sidebar with a filter */
export function DocsSide({ current }: { current: string }) {
  const [q, setQ] = useState("");
  const hits = useSearch(q);
  return (
    <aside className="docs-side" aria-label="Documentation">
      <SearchBox q={q} setQ={setQ} id="docs-side-q" />
      {q.trim() ? (
        <div className="docs-group">
          <h2>Results</h2>
          {hits.map((d) => (
            <Link key={d.slug} href={`/docs/${d.slug}`} aria-current={d.slug === current ? "page" : undefined}>
              {d.title}
            </Link>
          ))}
          {hits.length === 0 && <p className="small muted">No matches.</p>}
        </div>
      ) : (
        docGroups.map((g) => (
          <nav key={g} className="docs-group" aria-label={g}>
            <h2>{g}</h2>
            {docs
              .filter((d) => d.group === g)
              .map((d) => (
                <Link key={d.slug} href={`/docs/${d.slug}`} aria-current={d.slug === current ? "page" : undefined}>
                  {d.title}
                </Link>
              ))}
          </nav>
        ))
      )}
    </aside>
  );
}

export function Helpful({ title }: { title: string }) {
  const [ans, setAns] = useState<"yes" | "no" | null>(null);
  return (
    <div className="helpful" aria-live="polite">
      {ans === null ? (
        <>
          <b>Was this helpful?</b>
          <button type="button" className="chip-btn" onClick={() => setAns("yes")}>
            Yes
          </button>
          <button type="button" className="chip-btn" onClick={() => setAns("no")}>
            No
          </button>
        </>
      ) : ans === "yes" ? (
        <span>
          <b>Thanks.</b> Glad it helped.
        </span>
      ) : (
        <span>
          Sorry about that. <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Docs: ${title}`)}`}>Tell us what&apos;s missing</a> and we&apos;ll fix the page.
        </span>
      )}
    </div>
  );
}
