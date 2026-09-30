import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";
import { cta } from "@/content/site";
import type { QA } from "@/content/faq";
import SolidsField from "./solids/SolidsField";

export function PageHero({ eyebrow, title, lead, children, art }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; art?: ReactNode }) {
  return (
    <section className="page-hero">
      <SolidsField textZone="left" />
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-fade" aria-hidden="true" />
      <div className={`container ${art ? "hero-grid" : ""}`}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children && <div style={{ marginTop: 28 }}>{children}</div>}
        </div>
        {art && (
          <div className="page-hero-art" data-parallax="0.12">
            {art}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, center }: { eyebrow?: string; title: ReactNode; lead?: ReactNode; center?: boolean }) {
  return (
    <div className={`section-head reveal ${center ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

export function Dots({ n, of = 5, label }: { n: number; of?: number; label?: string }) {
  return (
    <span className="dots" role="img" aria-label={`${label ?? "Difficulty"}: ${n} of ${of}`}>
      {Array.from({ length: of }, (_, i) => (
        <i key={i} className={i < n ? "on" : ""} />
      ))}
    </span>
  );
}

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q}>
          <summary>{it.q}</summary>
          <p>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="check-list">
      {items.map((it, i) => (
        <li key={i}>
          <Icon name="check" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = (
    <>
      How ready is <em className="accent">your data?</em>
    </>
  ),
  lead = "",
}: {
  title?: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section className="cta-light">
      <SolidsField textZone="center" count={8} seed={11} />
      <div className="container">
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        <div className="btn-row">
          <Link href={cta.href} className="btn btn-primary">
            {cta.label} <Icon name="arrow" className="arrow" width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PrimaryCta({ label = cta.label }: { label?: string }) {
  return (
    <Link href={cta.href} className="btn btn-primary">
      {label} <Icon name="arrow" className="arrow" width={16} height={16} />
    </Link>
  );
}

export function FeatureCard({ icon, title, body, href, more }: { icon?: string; title: string; body: ReactNode; href?: string; more?: string }) {
  const inner = (
    <>
      {icon && (
        <div className="icon-badge">
          <Icon name={icon} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{body}</p>
      {href && <span className="more">{more ?? "Learn more"} →</span>}
    </>
  );
  return href ? (
    <Link href={href} className="card">
      {inner}
    </Link>
  ) : (
    <div className="card">{inner}</div>
  );
}
