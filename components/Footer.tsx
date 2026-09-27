import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/content/site";
import { industryLinks } from "./nav-data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p style={{ marginTop: 14, maxWidth: 300 }}>
              {site.tagline} We get your business ready for AI — and you own all of it.
            </p>
            <p style={{ marginTop: 18 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={site.phoneHref}>{site.phone}</a>
            </p>
          </div>
          <div>
            <h2 className="f-h">Company</h2>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/why-numarket">Why numarket</Link></li>
              <li><Link href="/partners">Partners</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="f-h">Products</h2>
            <ul>
              <li><Link href="/products/foundation">Foundation</Link></li>
              <li><Link href="/products/workspace">Workspace</Link></li>
              <li><Link href="/products/insight-review">Insight Review</Link></li>
              <li><Link href="/products/engineering">Engineering</Link></li>
              <li><Link href="/platform">Platform</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="f-h">Solutions</h2>
            <ul>
              <li><Link href="/solutions/small-business">Small Business</Link></li>
              <li><Link href="/solutions/enterprise">Larger Organizations</Link></li>
              {industryLinks.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="f-h">Resources</h2>
            <ul>
              <li><Link href="/getting-started">Getting Started</Link></li>
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/security">Security</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/status">Status</Link></li>
              <li><Link href="/demos">Demos</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-legal">
          <nav aria-label="Legal">
            <Link href="/legal/terms">Terms of Service</Link>
            <Link href="/legal/privacy">Privacy Policy</Link>
            <Link href="/legal/dpa">Data Processing Addendum</Link>
          </nav>
          <span>© {site.year} {site.legalName} · {site.city}</span>
        </div>
      </div>
    </footer>
  );
}
