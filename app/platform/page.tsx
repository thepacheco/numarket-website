import type { Metadata } from "next";
import Link from "next/link";
import PlatformLayers from "@/components/PlatformLayers";
import PlatformToggle from "@/components/PlatformToggle";
import NestedSolids from "@/components/solids/NestedSolids";
import SolidIcon from "@/components/solids/SolidIcon";
import { CtaBand, SectionHead } from "@/components/ui";
import { exitCaveat, exitPackage, exitTiming } from "@/content/exit";
import { engineering, money, productPrices } from "@/content/tiers";
import type { SolidKind } from "@/components/solids/geometry";

export const metadata: Metadata = {
  title: "How It Fits Together",
  description: "Foundation, Workspace, Insight Review, and Engineering: how the four fit together, what runs underneath, and what you get if you leave.",
};

const f = productPrices.foundation.bySize,
  w = productPrices.workspace.bySize,
  i = productPrices.insight.bySize;
const rows: { kind: SolidKind; href: string; name: string; does: string; needs: string; price: string }[] = [
  { kind: "foundation", href: "/products/foundation", name: "Foundation", does: "Your data. Connects every source (and moves you off old systems), cleans it, writes down what every number means, and keeps it in your private database, updated and checked every month. Your team explores it, sets alerts, and enters what isn't in any system.", needs: "Nothing. It's required, and everything else sits on it.", price: `${money(f.small.setup)}–${money(f.mid.setup)}+ setup, ${money(f.small.monthly)}–${money(f.mid.monthly)}+/mo` },
  { kind: "workspace", href: "/products/workspace", name: "Workspace", does: "Your dashboards and reports: built for your business from our standard building blocks, plus Ask Your Data.", needs: "Foundation.", price: `${money(w.small.setup)}–${money(w.mid.setup)}+ setup, ${money(w.small.monthly)}–${money(w.mid.monthly)}+/mo` },
  { kind: "insight", href: "/products/insight-review", name: "Insight Review", does: "Your analyst: reviews that explain what changed and why, action items with owners and dates tracked to done, and the quarterly (QBR) pack.", needs: "Foundation. Works with or without Workspace.", price: `${money(i.small.monthly)}–${money(i.mid.monthly)}+/mo` },
  { kind: "engineering", href: "/products/engineering", name: "Engineering", does: "Anything custom, built for you alone: getting from paper to digital, apps, automations, write-backs, client portals, work in your own cloud.", needs: "Optional. Usually uses Foundation's clean data.", price: `From ${money(engineering.from)} per project, or ${money(engineering.hourly)}/hr` },
];

export default function Platform() {
  return (
    <>
      <section className="page-hero fits-hero">
        <div className="container">
          <span className="eyebrow">How it fits together</span>
          <h1>
            Four pieces. <em className="accent">One system.</em>
          </h1>
          <p className="lead">Foundation sits at the center. Workspace reads from it. Insight Review reads from both. Engineering is the optional custom layer on the outside.</p>
          <NestedSolids />
        </div>
      </section>

      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="The pieces" title="What each one does, needs, and costs." />
          <div className="fit-rows">
            {rows.map((r) => (
              <Link key={r.kind} href={r.href} className="fit-row">
                <span className="fit-name">
                  <SolidIcon kind={r.kind} size={34} />
                  <b>{r.name}</b>
                </span>
                <span>
                  <small>What it does</small>
                  {r.does}
                </span>
                <span>
                  <small>Needs</small>
                  {r.needs}
                </span>
                <span>
                  <small>Price</small>
                  <span className="tnum">{r.price}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="small muted" style={{ marginTop: 14 }}>
            Take Foundation, Workspace, and Insight Review together as a plan and save about 10%. <Link href="/pricing">See pricing →</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What runs underneath" title="The technology, in plain English." lead="The only page where we name it. Tap a layer." />
          <PlatformLayers />
        </div>
      </section>

      <section className="section soft" id="leaving">
        <div className="container">
          <SectionHead eyebrow="If you ever leave" title="You own your data. Here's what you walk away with." lead={exitTiming} />
          <ol className="exit-list stagger">
            {exitPackage.map((x, n) => (
              <li key={x.t}>
                <span className="exit-n">{n + 1}</span>
                <b>{x.t}</b>
                <span>{x.b}</span>
              </li>
            ))}
          </ol>
          <p className="exit-caveat">
            <b>One honest caveat:</b> {exitCaveat}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <SectionHead eyebrow="Your platform or ours" title="Same stack. Your choice." />
          <PlatformToggle />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
