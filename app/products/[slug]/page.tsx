import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { MigrationDemo } from "@/components/NeedDemos";
import FoundationDemo from "@/components/FoundationDemo";
import { ConnectedRow, DefinitionsDemo, FoundationInside } from "@/components/FoundationExtras";
import StatusReport from "@/components/StatusReport";
import WorkspaceDemo from "@/components/WorkspaceDemo";
import ProductStory from "@/components/ProductStory";
import ProductSolid from "@/components/solids/ProductSolid";
import SolidIcon from "@/components/solids/SolidIcon";
import SampleReview from "@/components/SampleReview";
import ScopeBox from "@/components/ScopeBox";
import EngineeringApps from "@/components/EngineeringApps";
import Roles from "@/components/Roles";
import { CtaBand, Faq, SectionHead } from "@/components/ui";
import { productBySlug, products } from "@/content/products";
import { engineering, money, productPrices, sizes, type PricedProduct } from "@/content/tiers";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = productBySlug((await params).slug);
  return p ? { title: p.name, description: p.promise } : {};
}

const demoTitle: Record<string, [string, string]> = {
  foundation: ["See it clean", "Three sources. Watch them agree."],
  workspace: ["Try it", "Change a number. Ask a question."],
  insight: ["A sample review", "What your analyst hands you."],
  engineering: ["Try the apps", "Paper to digital, and four custom apps."],
};

function Demo({ kind }: { kind: string }) {
  if (kind === "foundation")
    return (
      <div style={{ display: "grid", gap: 28 }}>
        <FoundationDemo slug="construction" />
        <div>
          <h3 className="demo-sub">Only if you&apos;re replacing a system: we move it, too.</h3>
          <p className="muted" style={{ marginBottom: 14 }}>
            Switching accounting software or retiring an old database? We map the old data, move it table by table, and count it twice before you switch
            the old system off. It&apos;s priced into your setup quote. If you aren&apos;t replacing anything, skip this.
          </p>
          <MigrationDemo />
        </div>
      </div>
    );
  if (kind === "workspace") return <WorkspaceDemo />;
  if (kind === "insight") return <SampleReview />;
  return <EngineeringApps />;
}

function PriceBlock({ kind }: { kind: string }) {
  if (kind === "engineering")
    return (
      <div className="card price-block">
        <h3>What it costs</h3>
        <p className="pb-big tnum">
          From {money(engineering.from)} <small>per project</small>
        </p>
        <p>Fixed quote per project after a short scoping call, or {money(engineering.hourly)}/hr for small, open-ended work.</p>
        <p className="small muted">Available on its own or on top of any plan.</p>
      </div>
    );
  const id: PricedProduct = kind === "insight" ? "insight" : (kind as PricedProduct);
  const pp = productPrices[id];
  return (
    <div className="card price-block">
      <h3>What it costs</h3>
      <div className="pb-cols">
        {sizes.map((s) => {
          const pr = pp.bySize[s.id];
          return (
            <div key={s.id}>
              <span className="pb-size">{s.name}</span>
              <b className="tnum">
                {pr.from ? "from " : ""}
                {money(pr.monthly)}
                <small>/mo</small>
              </b>
              {pr.setup ? (
                <span className="small muted tnum">
                  + {pr.from ? "from " : ""}
                  {money(pr.setup)} setup
                </span>
              ) : (
                <span className="small muted">{pr.note}</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="small muted">Monthly covers: {pp.what.toLowerCase()}.</p>
      <p className="small">
        <Link href="/pricing">Build your price, or see the plans that bundle all three →</Link>
      </p>
    </div>
  );
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
              <SolidIcon kind={p.kind} size={22} /> {p.name} · {p.step}
            </span>
            <h1>{p.promise}</h1>
            <p className="lead">{p.intro}</p>
            <p className="prod-needs">
              <b>{p.kind === "foundation" ? "Required for all plans." : "Needs:"}</b> {p.kind === "foundation" ? "Everything else sits on it." : p.depends}
            </p>
          </div>
          <div className="prod-solid" data-solid-host>
            <ProductSolid kind={p.kind} assemble={p.kind === "foundation"} scale={0.34} label={`${p.name} shape`} />
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

      {p.kind === "foundation" && (
        <section className="section-tight">
          <div className="container">
            <SectionHead eyebrow="What's inside" title="Four parts, one foundation." />
            <FoundationInside />
          </div>
        </section>
      )}

      {p.kind === "foundation" && (
        <section className="section-tight">
          <div className="container split">
            <SectionHead eyebrow="Your tools stay" title="We meet you in the tools you already use." lead="QuickBooks, your project tool, Excel, shared folders: keep all of it. We connect to them." />
            <ConnectedRow />
          </div>
        </section>
      )}

      {p.kind !== "insight" && (
        <section className="section-tight">
          <div className="container">
            <ScopeBox show={p.kind === "foundation" ? ["foundation", "engineering"] : p.kind === "workspace" ? ["workspace", "engineering"] : ["foundation", "workspace", "engineering"]} />
          </div>
        </section>
      )}

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

      {p.kind === "foundation" && (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Business definitions" title="Every number, defined once." lead="Your data dictionary is part of Foundation: what each number means, where it comes from, and who on your team owns it. It's what keeps every dashboard and every answer from Ask Your Data using the same meaning." />
            <DefinitionsDemo slug="construction" />
          </div>
        </section>
      )}

      {p.kind === "workspace" && (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Reports" title="Your weekly status report, built automatically." lead="In your branding, or rebuilt for one of your customers. Same clean numbers, sent on a schedule." />
            <StatusReport />
          </div>
        </section>
      )}

      {p.kind === "workspace" && (
        <section className="section soft">
          <div className="container">
            <SectionHead eyebrow="Who uses it" title="Everyone sees the same numbers." lead="Each person gets the view their role needs, from the owner to the crew in the field." />
            <Roles />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container grid g2 stagger">
          <PriceBlock kind={p.kind} />
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
            <p className="small muted" style={{ marginTop: 14 }}>
              {p.includedIn}
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
