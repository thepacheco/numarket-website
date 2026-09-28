import type { Metadata } from "next";
import { Lockup, MarkOnly, concepts } from "@/components/LogoConcepts";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Logo directions", robots: { index: false, follow: false } };

export default function Brand() {
  return (
    <>
      <PageHero eyebrow="Internal · not linked from the site" title="Pick a logo direction." lead="Six options, each shown in the header, on dark, as an app icon, and at favicon sizes. Tell me the letter you like — or two to combine." />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", gap: 22 }}>
          {concepts.map((c) => (
            <article key={c.id} className="logo-row">
              <header>
                <h2 className="tier-name">{c.name}</h2>
                <p className="muted">{c.idea}</p>
              </header>
              <div className="logo-tiles">
                <div className="lt light">
                  <Lockup c={c} />
                </div>
                <div className="lt dark">
                  <Lockup c={c} dark />
                </div>
                <div className="lt icons">
                  <MarkOnly c={c} size={72} tile />
                  <MarkOnly c={c} size={72} dark tile />
                  <span className="fav">
                    <MarkOnly c={c} size={32} />
                    <MarkOnly c={c} size={16} />
                    <small>32 · 16 px</small>
                  </span>
                </div>
                <div className="lt nav">
                  <Lockup c={c} scale={0.6} />
                  <span>Products</span>
                  <span>Solutions</span>
                  <span className="pill navy">Get a Free Readiness Check</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
