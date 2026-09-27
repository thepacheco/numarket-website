import { industries } from "@/content/industries";
import type { ProductKind } from "./ProductArt";

export const productLinks: { href: string; title: string; desc: string; kind: ProductKind }[] = [
  { href: "/products/foundation", title: "Foundation", desc: "Collect, clean & secure your data", kind: "foundation" },
  { href: "/products/workspace", title: "Workspace", desc: "Dashboards, input screens, Ask Your Data", kind: "workspace" },
  { href: "/products/insight-review", title: "Insight Review", desc: "Action items from a real analyst", kind: "insight" },
  { href: "/products/engineering", title: "Engineering", desc: "Migrations and custom builds", kind: "engineering" },
  { href: "/platform", title: "Platform", desc: "What's under the hood", kind: "platform" },
];

export const sizeLinks = [
  { href: "/solutions/small-business", title: "Small & growing businesses" },
  { href: "/solutions/enterprise", title: "Larger organizations" },
];

export const industryLinks = industries.map((i) => ({ href: `/solutions/${i.slug}`, title: i.name, icon: i.icon as string }));

/* Each need has its own page with its own interactive demo. */
export const needLinks = [
  { href: "/solutions/replace-spreadsheets", title: "Replace spreadsheets" },
  { href: "/solutions/ai-ready", title: "Get AI-ready" },
  { href: "/solutions/trust-your-numbers", title: "Trust your numbers" },
  { href: "/solutions/move-off-old-systems", title: "Move off old systems" },
];

export const resourceLinks = [
  { href: "/getting-started", title: "Getting Started", desc: "How hard, how long, how much" },
  { href: "/docs", title: "Documentation", desc: "Guides for clients" },
  { href: "/security", title: "Security & Trust", desc: "How we protect your data" },
  { href: "/support", title: "Support", desc: "How to get help" },
  { href: "/status", title: "System Status", desc: "Platform health" },
  { href: "/partners", title: "Partners", desc: "Refer, co-sell, or white-label" },
  { href: "/about", title: "About Us", desc: "Who we are" },
];
