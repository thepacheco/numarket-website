import type { Metadata } from "next";
import { DocsHub } from "@/components/Docs";
import { BookArt } from "@/components/HeroArts";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Documentation", description: "Plain-language guides for numarket clients." };

export default function Docs() {
  return (
    <>
      <PageHero eyebrow="Documentation" title="Client guides, in plain English." lead="Search, or pick a topic." art={<BookArt />} />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <DocsHub />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
