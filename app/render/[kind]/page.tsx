import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RenderStill from "@/components/iso/RenderStill";

/* Internal tool: renders product illustrations for export (scripts/render-art.mjs). Not linked. */
export const metadata: Metadata = { title: "Render", robots: { index: false, follow: false } };
export const dynamicParams = false;
const kinds = ["foundation", "workspace", "insight", "engineering"] as const;
export function generateStaticParams() {
  return kinds.map((kind) => ({ kind }));
}

export default async function Render({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!(kinds as readonly string[]).includes(kind)) notFound();
  return (
    <div style={{ padding: 20, background: "transparent" }}>
      <RenderStill kind={kind as (typeof kinds)[number]} />
    </div>
  );
}
