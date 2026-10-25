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
  { kind: "foundation", href: "/products/foundation", name: "Foundation", does: "Your data. We connect every source, clean and match it, write down what every number means, and keep it in your private database, checked on every update (daily on Small, up to hourly on Mid). Your team explores it, sets alerts, and enters what isn't in any system. Replacing an old system? We move its history too.", needs: "Nothing. It's required, and everything else sits on it.", price: `${money(f.small.setup)}–${money(f.mid.setup)}+ setup, ${money(f.small.monthly)}–${money(f.mid.monthly)}+/mo` },
  { kind: "workspace", href: "/products/workspace", name: "Workspace", does: "The screens your team uses: dashboards and status reports we build for your business, plus Ask Your Data. You don't build anything. Ask for a change and we make it, from your monthly change hours.", needs: "Foundation.", price: `${money(w.small.setup)}–${money(w.mid.setup)}+ setup, ${money(w.small.monthly)}–${money(w.mid.monthly)}+/mo` },
  { kind: "insight", href: "/products/insight-review", name: "Insight Review", does: "A person, not software. Your analyst reads the numbers on a schedule, meets with you, explains what changed and why, writes action items with owners and dates, tracks them to done, and prepares the quarterly (QBR) pack. Not tech support and not dashboard building. Skip it if you have your own CFO or analyst.", needs: "Foundation. Works with or without Workspace.", price: `${money(i.small.monthly)}–${money(i.mid.monthly)}+/mo` },
  { kind: "engineering", href: "/products/engineering", name: "Engineering", does: "Software that does work, built for you alone: paper forms to data, estimate builders, approvals that write back to your accounting system, client portals. Dashboards and reports that refresh on their own are already in Workspace; Engineering is for everything beyond reporting.", needs: "Optional. Usually uses Foundation's clean data.", price: `From ${money(engineering.from)} per project, or ${money(engineering.hourly)}/hr` },
];

/* From the product hand-off doc, section 1. */
const notWe: [string, string][] = [
  ["Not a work-management tool like Monday, Asana, or Smartsheet", "Those are where people manage tasks and type in status. We don't manage tasks. We pull the numbers from the tools you already use and report on them."],
  ["Not a blank BI tool like Power BI or Tableau", "Those leave the cleanup and the building to you. We do both. Want Power BI anyway? Point it at the clean data we keep."],
  ["Not a consulting firm", "We don't do a one-time study and leave. The data stays clean and the reports keep running, every month."],
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

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Where we fit"
            title="What we are, and what we're not."
            lead="A data team you subscribe to. Our software reads from the systems you already use; people rarely type into it."
          />
          <div className="notwe">
            {notWe.map(([not, diff]) => (
              <div key={not} className="notwe-row">
                <b>{not}</b>
                <p>{diff}</p>
              </div>
            ))}
          </div>
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
            Each product has a published price by size, and taking all three is simply the sum. <Link href="/pricing">See pricing →</Link>
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
