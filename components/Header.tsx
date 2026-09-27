"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { cta } from "@/content/site";
import { industryLinks, needLinks, productLinks, resourceLinks, sizeLinks } from "./nav-data";

type MenuId = "products" | "solutions" | "resources" | null;

export default function Header() {
  const [open, setOpen] = useState<MenuId>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const trigger = (id: Exclude<MenuId, null>, label: string) => (
    <button
      type="button"
      className="nav-item"
      aria-expanded={open === id}
      aria-controls={`menu-${id}`}
      onClick={() => setOpen(open === id ? null : id)}
      onMouseEnter={() => setOpen(id)}
    >
      {label}
      <Icon name="chevron" className="chev" />
    </button>
  );

  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container nav">
        <Logo />
        <nav ref={navRef} aria-label="Main" style={{ flex: 1 }} onMouseLeave={() => setOpen(null)}>
          <ul className="nav-links">
            <li>
              {trigger("products", "Products")}
              <div id="menu-products" className={`mega ${open === "products" ? "open" : ""}`}>
                {productLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    <strong>{l.title}</strong>
                    <span>{l.desc}</span>
                  </Link>
                ))}
              </div>
            </li>
            <li>
              {trigger("solutions", "Solutions")}
              <div id="menu-solutions" className={`mega wide ${open === "solutions" ? "open" : ""}`}>
                <div className="mega-col">
                  <h4>By size</h4>
                  {sizeLinks.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.title}
                    </Link>
                  ))}
                  <h4 style={{ marginTop: 10 }}>By need</h4>
                  {needLinks.map((l) => (
                    <Link key={l.title} href={l.href}>
                      {l.title}
                    </Link>
                  ))}
                </div>
                <div className="mega-col" style={{ gridColumn: "span 2" }}>
                  <h4>By industry</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    {industryLinks.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.title}
                      </Link>
                    ))}
                  </div>
                  <Link href="/solutions" style={{ color: "var(--teal-700)", fontWeight: 600 }}>
                    See all solutions →
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link className="nav-item" href="/how-it-works">
                How It Works
              </Link>
            </li>
            <li>
              <Link className="nav-item" href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="nav-item" href="/demos">
                Demos
              </Link>
            </li>
            <li>
              {trigger("resources", "Resources")}
              <div id="menu-resources" className={`mega ${open === "resources" ? "open" : ""}`}>
                {resourceLinks.map((l) => (
                  <Link key={l.href} href={l.href}>
                    <strong>{l.title}</strong>
                    <span>{l.desc}</span>
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </nav>
        <div className="nav-right">
          <Link href={cta.href} className="btn btn-primary desktop-only">
            {cta.label}
          </Link>
          <button
            type="button"
            className="menu-btn"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-panel"
            onClick={() => setMobile(!mobile)}
          >
            <Icon name={mobile ? "close" : "menu"} width={22} height={22} />
          </button>
        </div>
      </div>
      <div id="mobile-panel" className={`mobile-panel ${mobile ? "open" : ""}`}>
        <h4>Products</h4>
        {productLinks.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.title}
          </Link>
        ))}
        <h4>Solutions</h4>
        {[...sizeLinks, ...industryLinks].map((l) => (
          <Link key={l.href} href={l.href}>
            {l.title}
          </Link>
        ))}
        <h4>Company</h4>
        <Link href="/how-it-works">How It Works</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/demos">Demos</Link>
        {resourceLinks.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.title}
          </Link>
        ))}
        <Link href={cta.href} className="btn btn-primary">
          {cta.label}
        </Link>
      </div>
    </header>
  );
}
