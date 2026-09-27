import type { Metadata } from "next";
import NeedPage from "@/components/NeedPage";
import { ReconcileDemo } from "@/components/NeedDemos";
import { FoundationArt } from "@/components/ProductArt";

export const metadata: Metadata = { title: "Trust Your Numbers", description: "One source of truth. Duplicates removed, names matched, and checks on every update." };

export default function Page() {
  return (
    <NeedPage
      art={<FoundationArt />}
      eyebrow="Trust your numbers"
      title={
        <>
          Three reports. Three totals. <em className="accent">One truth.</em>
        </>
      }
      lead="Stop arguing about whose number is right."
      demoTitle="Clean and match."
      demo={<ReconcileDemo />}
      points={[
        { icon: "clean", title: "Duplicates removed", body: "Entered twice? Counted once." },
        { icon: "users", title: "Names matched", body: "“ACME Corp.” and “Acme Corporation” are one customer." },
        { icon: "shield", title: "Checked every update", body: "Bad rows are flagged, never published." },
      ]}
    />
  );
}
