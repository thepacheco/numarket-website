import type { Metadata } from "next";
import NeedPage from "@/components/NeedPage";
import { SpreadsheetDemo } from "@/components/NeedDemos";
import WorkspaceDemo from "@/components/WorkspaceDemo";
import { SectionHead } from "@/components/ui";

export const metadata: Metadata = { title: "Replace Spreadsheets", description: "Stop emailing spreadsheets. Enter it once, in one place, and everyone sees the same number." };

export default function Page() {
  return (
    <NeedPage
      eyebrow="Replace spreadsheets"
      title={
        <>
          Five versions of one number. <em className="accent">Make it one.</em>
        </>
      }
      lead="Your team enters it once. Everyone sees it live."
      demoTitle="Collapse the versions."
      demo={<SpreadsheetDemo />}
      points={[
        { icon: "spreadsheet", title: "Keep Excel if you want", body: "We can sync the files you keep." },
        { icon: "check", title: "Checked as you type", body: "Bad entries get caught, not emailed." },
        { icon: "file", title: "Every change logged", body: "Who, what, and when." },
      ]}
      extra={
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Then" title="Change a number. Watch it update." />
            <WorkspaceDemo />
          </div>
        </section>
      }
    />
  );
}
