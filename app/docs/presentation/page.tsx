import type { Metadata } from "next";
import Link from "next/link";
import { DocsSide } from "@/components/Docs";
import PresentationFrame from "@/components/PresentationFrame";

export const metadata: Metadata = {
  title: "Presentation · Docs",
  description: "The deck we walk new clients through: the problem, the four products, cost, security, and what happens after yes.",
};

export default function Presentation() {
  return (
    <section className="section-tight">
      <div className="container docs2">
        <DocsSide current="presentation" />
        <article className="doc-article">
          <nav className="small muted" aria-label="Breadcrumb">
            <Link href="/docs">Docs</Link> / Reference
          </nav>
          <h1>Presentation</h1>
          <p className="lead">The deck we walk new clients through: the problem, the four products, what your team gets, the cost difference, security, and what happens after yes.</p>
          <PresentationFrame />
        </article>
      </div>
    </section>
  );
}
