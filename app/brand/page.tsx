import type { Metadata } from "next";
import { Lockup, MarkOnly, concepts } from "@/components/LogoConcepts";
import { NuBadge, NuLetters } from "@/components/NuMark";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Logo", robots: { index: false, follow: false } };

function Word({ size, dark }: { size: number; dark?: boolean }) {
  return (
    <span className={`logo brand-word ${dark ? "on-dark" : ""}`} style={{ fontSize: size }}>
      <NuLetters className="nu-svg" />
      <span className="mk">market</span>
    </span>
  );
}

export default function Brand() {
  return (
    <>
      <PageHero
        eyebrow="Internal · not linked from the site"
        title="The logo."
        lead="Direction A, with the n and u drawn as smooth, rounded letters — the same shapes as the round badge. The u is the n turned upside down, and the spacing is exactly what the typed letters had."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", gap: 22 }}>
          <article className="logo-row">
            <div className="logo-tiles">
              <div className="lt light big">
                <Word size={84} />
              </div>
              <div className="lt dark big">
                <Word size={84} dark />
              </div>
              <div className="lt icons">
                <NuBadge size={96} />
                <NuBadge size={96} bg="#22577A" />
                <span className="fav">
                  <NuBadge size={32} />
                  <NuBadge size={16} />
                  <small>32 · 16 px</small>
                </span>
              </div>
              <div className="lt nav">
                <Word size={25} />
                <span>Products</span>
                <span>Solutions</span>
                <span className="pill navy">Get a Free Readiness Check</span>
              </div>
            </div>
          </article>

          <article className="logo-row">
            <header>
              <h2 className="tier-name">Before and after</h2>
              <p className="muted">Same size, same spacing. Only the shapes change: round ends, one smooth curve, and a u that mirrors the n.</p>
            </header>
            <div className="logo-tiles">
              <div className="lt light">
                <span className="logo brand-word" style={{ fontSize: 72 }}>
                  <span className="nu">nu</span>
                  <span className="mk">market</span>
                </span>
                <small className="muted">Typed</small>
              </div>
              <div className="lt light">
                <Word size={72} />
                <small className="muted">Drawn</small>
              </div>
            </div>
            <div className="lt light guides" aria-hidden="true">
              <NuLetters className="guide-nu" />
              <small className="muted">Equal stems, equal gaps: x-height 0.50 em · stroke 0.136 em · gap 0.116 em</small>
            </div>
          </article>

          <details className="logo-row">
            <summary className="tier-name">Other directions we looked at</summary>
            <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
              {concepts.map((c) => (
                <div key={c.id} className="logo-tiles">
                  <div className="lt light">
                    <Lockup c={c} />
                  </div>
                  <div className="lt icons">
                    <MarkOnly c={c} size={64} tile />
                    <small className="muted">{c.name}</small>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
