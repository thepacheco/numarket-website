"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import SolidIcon from "./solids/SolidIcon";
import { cta } from "@/content/site";
import { industryLinks, needLinks, productLinks, resourceLinks, sizeLinks } from "./nav-data";
import IndGlyph from "./IndGlyph";

type MenuId = "products" | "solutions" | "resources" | null;

export default function Header() {
  const [open, setOpen] = useState<MenuId>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAt = useRef(0);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  /* Close with a short delay so the pointer can travel from the trigger into the menu. */
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 260);
  }, []);

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const hoverProps = (id: Exclude<MenuId, null>) => ({
    onMouseEnter: () => {
      cancelClose();
      if (open !== id) hoverOpenedAt.current = Date.now();
      setOpen(id);
    },
    onMouseLeave: scheduleClose,
  });

  const section = (id: Exclude<MenuId, null>) =>
    id === "products"
      ? pathname.startsWith("/products")
      : id === "solutions"
        ? pathname.startsWith("/solutions")
        : resourceLinks.some((l) => l.href !== "/platform" && pathname.startsWith(l.href));
  const cur = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "current" : "");

  const trigger = (id: Exclude<MenuId, null>, label: string) => (
    <button
      type="button"
      className={`nav-item ${section(id) ? "current" : ""}`}
      aria-expanded={open === id}
      aria-controls={`menu-${id}`}
      onClick={() => {
        cancelClose();
        /* A click right after hover-open should keep the menu open, not toggle it shut. */
        if (open === id && Date.now() - hoverOpenedAt.current > 600) setOpen(null);
        else setOpen(id);
      }}
    >
      {label}
      <Icon name="chevron" className="chev" />
    </button>
  );

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container nav">
        <Logo />
        <nav ref={navRef} aria-label="Main" className="nav-main">
          <ul className="nav-links">
            <li {...hoverProps("products")}>
              {trigger("products", "Products")}
              <div id="menu-products" className={`mega ${open === "products" ? "open" : ""}`}>
                <div className="mega-panel mega-products">
                  {productLinks.map((l) => (
                    <Link key={l.href} href={l.href} className={`mega-prod pg-${l.kind}`}>
                      <SolidIcon kind={l.kind} size={34} className="mega-solid" />
                      <span>
                        <strong>{l.title}</strong>
                        <span>{l.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li {...hoverProps("solutions")}>
              {trigger("solutions", "Solutions")}
              <div id="menu-solutions" className={`mega ${open === "solutions" ? "open" : ""}`}>
                <div className="mega-panel wide">
                  <div className="mega-col">
                    <p className="mega-h">By size</p>
                    {sizeLinks.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.title}
                      </Link>
                    ))}
                    <p className="mega-h" style={{ marginTop: 10 }}>By need</p>
                    {needLinks.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.title}
                      </Link>
                    ))}
                  </div>
                  <div className="mega-col" style={{ gridColumn: "span 2" }}>
                    <p className="mega-h">By industry</p>
                    <div className="mega-ind">
                      {industryLinks.map((l) => (
                        <Link key={l.href} href={l.href} className={`ind-${l.href.split("/").pop()}`}>
                          <IndGlyph />
                          {l.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Link className={`nav-item ${cur("/how-it-works") || cur("/platform")}`} href="/how-it-works">
                How It Works
              </Link>
            </li>
            <li>
              <Link className={`nav-item ${cur("/pricing")}`} href="/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className={`nav-item ${cur("/demos")}`} href="/demos">
                Demos
              </Link>
            </li>
            <li {...hoverProps("resources")}>
              {trigger("resources", "Resources")}
              <div id="menu-resources" className={`mega ${open === "resources" ? "open" : ""}`}>
                <div className="mega-panel">
                  {resourceLinks.map((l) => (
                    <Link key={l.href} href={l.href}>
                      <strong>{l.title}</strong>
                      <span>{l.desc}</span>
                    </Link>
                  ))}
                </div>
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
        <p className="mega-h">Products</p>
        {productLinks.map((l) => (
          <Link key={l.href} href={l.href} className="m-prod">
            <SolidIcon kind={l.kind} size={20} />
            {l.title}
          </Link>
        ))}
        <p className="mega-h">Solutions</p>
        {[...sizeLinks, ...needLinks, ...industryLinks].map((l) => (
          <Link key={l.href} href={l.href}>
            {l.title}
          </Link>
        ))}
        <p className="mega-h">Company</p>
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
