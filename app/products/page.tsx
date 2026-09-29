import type { Metadata } from "next";
import ProductBento from "@/components/ProductBento";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = {
  title: "Products",
  description: "Foundation, Workspace, Insight Review, and Engineering — a clean, living database with apps and action items on top.",
};

const layers = [
  { cls: "l4", name: "Insight Review", note: "what to do next" },
  { cls: "l3", name: "Workspace", note: "dashboards · input screens · Ask Your Data" },
  { cls: "l2", name: "Foundation", note: "your private, clean database" },
  { cls: "l1", name: "Your systems & spreadsheets", note: "" },
];

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Everything a data team does. <em className="accent">Done for you.</em>
          </>
        }
        lead="Foundation cleans and secures your data. Workspace puts it in front of your team. Insight Review tells you what to do. Engineering handles the big moves."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="sr-only">Our four products</h2>
          <ProductBento />
        </div>
      </section>
      <section className="section soft">
        <div className="container">
          <SectionHead eyebrow="How they fit" title="Built in layers." />
          <div className="stack-diagram stagger">
            {layers.map((l) => (
              <div key={l.name} className={`lvl ${l.cls}`}>
                {l.name}
                {l.note && <span style={{ fontWeight: 500, opacity: 0.8 }}> — {l.note}</span>}
              </div>
            ))}
            <div className="lvl side">
              Engineering
              <br />
              <span style={{ fontWeight: 500 }}>migrations · custom builds</span>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
