import type { Metadata } from "next";
import NeedPage from "@/components/NeedPage";
import { MigrationDemo } from "@/components/NeedDemos";
import { EngineeringArt } from "@/components/ProductArt";

export const metadata: Metadata = { title: "Move Off Old Systems", description: "Migrations done carefully: every row moved, counted, and checked before the old system is switched off." };

export default function Page() {
  return (
    <NeedPage
      art={<EngineeringArt />}
      eyebrow="Move off old systems"
      title={
        <>
          Retire the old system. <em className="accent">Lose nothing.</em>
        </>
      }
      lead="Every row moved, counted, and checked."
      demoTitle="Run a migration."
      demo={<MigrationDemo />}
      points={[
        { icon: "layers", title: "Mapped first", body: "Old fields matched to clear new names." },
        { icon: "check", title: "Counted twice", body: "Rows and totals must match before cutover." },
        { icon: "key", title: "Yours after", body: "Open formats. No new lock-in." },
      ]}
    />
  );
}
