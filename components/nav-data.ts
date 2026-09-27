import { industries } from "@/content/industries";

export const productLinks = [
  { href: "/products/foundation", title: "Foundation", desc: "Collect, clean & secure your data" },
  { href: "/products/workspace", title: "Workspace", desc: "Your team's app: dashboards, input screens, Ask Your Data" },
  { href: "/products/insight-review", title: "Insight Review", desc: "Monthly action items from a real analyst" },
  { href: "/products/engineering", title: "Engineering", desc: "Migrations, custom apps, working in your platform" },
  { href: "/platform", title: "Platform", desc: "What's under the hood, in plain English" },
];

export const sizeLinks = [
  { href: "/solutions/small-business", title: "Small & growing businesses" },
  { href: "/solutions/enterprise", title: "Larger organizations" },
];

export const industryLinks = industries.map((i) => ({ href: `/solutions/${i.slug}`, title: i.name }));

export const needLinks = [
  { href: "/products/workspace", title: "Replace spreadsheets" },
  { href: "/getting-started", title: "Get AI-ready" },
  { href: "/products/foundation", title: "Trust your numbers" },
  { href: "/products/engineering", title: "Move off old systems" },
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
