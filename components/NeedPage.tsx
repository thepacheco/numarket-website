import type { ReactNode } from "react";
import Icon from "./Icon";
import { CtaBand, PageHero, SectionHead } from "./ui";

/* Shared shell for the "by need" pages. Each page brings its own demo. */
export default function NeedPage({
  eyebrow,
  title,
  lead,
  demoTitle,
  demo,
  points,
  extra,
  art,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  demoTitle: string;
  demo: ReactNode;
  points: { icon: string; title: string; body: string }[];
  extra?: ReactNode;
  art?: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} art={art} />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHead eyebrow="Try it" title={demoTitle} />
          <div className="reveal">{demo}</div>
        </div>
      </section>
      <section className="section soft">
        <div className="container grid g3 stagger">
          {points.map((p) => (
            <div className="card lift" key={p.title}>
              <div className="icon-badge">
                <Icon name={p.icon} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>
      {extra}
      <CtaBand />
    </>
  );
}
