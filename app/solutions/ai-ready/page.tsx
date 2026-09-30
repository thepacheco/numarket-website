import type { Metadata } from "next";
import Link from "next/link";
import NeedPage from "@/components/NeedPage";
import { AiCompare } from "@/components/NeedDemos";
import WorkspaceDemo from "@/components/WorkspaceDemo";
import { SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Get AI-Ready", description: "AI is only as good as the data under it. Fix the foundation first." };

export default function Page() {
  return (
    <NeedPage
      eyebrow="Get AI-ready"
      title={
        <>
          AI is only as good as <em className="accent">the data under it.</em>
        </>
      }
      lead="Same question. Messy data vs. clean data."
      demoTitle="Ask it both ways."
      demo={<AiCompare />}
      points={[
        { icon: "clean", title: "Clean first", body: "One matched set of numbers." },
        { icon: "book", title: "Your definitions", body: "“Revenue” means what you mean." },
        { icon: "sparkle", title: "Any AI tool", body: "Ask in plain English today. Plug in more tomorrow." },
      ]}
      extra={
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Ask Your Data"
              title="Plain English. Real numbers."
              lead={
                <>
                  Not sure how ready you are? <Link href="/getting-started#quiz">Take the 5-question quiz.</Link>
                </>
              }
            />
            <WorkspaceDemo initialTab="ask" />
          </div>
        </section>
      }
    />
  );
}
