import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/content/site";
import { needLinks } from "./nav-data";
import { industries } from "@/content/industries";

const cols: { title: string; links: { href: string; title: string }[] }[] = [
  {
    title: "Products",
    links: [
      { href: "/products/foundation", title: "Foundation" },
      { href: "/products/workspace", title: "Workspace" },
      { href: "/products/insight-review", title: "Insight Review" },
      { href: "/products/engineering", title: "Engineering" },
      { href: "/pricing", title: "Pricing" },
    ],
  },
  {
    title: "Solutions",
    links: [{ href: "/solutions/small-business", title: "Small business" }, { href: "/solutions/enterprise", title: "Larger organizations" }, ...needLinks],
  },
  { title: "Industries", links: industries.map((i) => ({ href: `/solutions/${i.slug}`, title: i.short })) },
  {
    title: "Resources",
    links: [
      { href: "/getting-started", title: "Getting started" },
      { href: "/how-it-works", title: "How it works" },
      { href: "/platform", title: "How it fits together" },
      { href: "/demos", title: "Demos" },
      { href: "/docs", title: "Documentation" },
      { href: "/security", title: "Security" },
      { href: "/support", title: "Support" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", title: "About" },
      { href: "/why-numarket", title: "Why numarket" },
      { href: "/partners", title: "Partners" },
      { href: "/contact", title: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-top">
          <div>
            <Logo />
            <p>{site.tagline}</p>
          </div>
        </div>
        <nav className="foot-cols" aria-label="Footer">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="f-h">{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="foot-bottom">
          <span>
            © {site.year} {site.legalName} · {site.city} · <a href={`mailto:${site.email}`}>{site.email}</a> · <a href={site.phoneHref}>{site.phone}</a>
          </span>
          <nav aria-label="Legal">
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/dpa">Data Processing Addendum</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
