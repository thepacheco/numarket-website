import type { Metadata } from "next";
import PlatformLayers from "@/components/PlatformLayers";
import PlatformToggle from "@/components/PlatformToggle";
import { CtaBand, PageHero, SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Platform", description: "What's under the hood, in plain English." };

export default function Platform() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title={
          <>
            Under the hood, <em className="accent">in plain English.</em>
          </>
        }
        lead="Tap a layer to see what it does — and what it's built on."
      />
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <PlatformLayers />
        </div>
      </section>
      <section className="section soft">
        <div className="container split">
          <SectionHead eyebrow="Your platform or ours" title="Same stack. Your choice." />
          <PlatformToggle />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
