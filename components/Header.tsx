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

type MenuId = "products" | "solutions" | "industries" | "resources" | null;

export default function Header() {
  const [open, setOpen] = useState<MenuId>(null);
  const [mobile, setMobile] = useState(false);
  const [mGroup, setMGroup] = useState<MenuId>(null);
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
    setMGroup(null);
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

  const onIndustry = industryLinks.some((l) => pathname === l.href);
  const section = (id: Exclude<MenuId, null>) =>
    id === "products"
      ? pathname.startsWith("/products")
      : id === "solutions"
        ? pathname.startsWith("/solutions") && !onIndustry
        : id === "industries"
          ? onIndustry
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
                <div className="mega-panel mega-sol">
                  <div className="mega-col">
                    <p className="mega-h">By size</p>
                    {sizeLinks.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.title}
                      </Link>
                    ))}
                  </div>
                  <div className="mega-col">
                    <p className="mega-h">By need</p>
                    {needLinks.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </li>
            <li {...hoverProps("industries")}>
              {trigger("industries", "Industries")}
              <div id="menu-industries" className={`mega ${open === "industries" ? "open" : ""}`}>
                <div className="mega-panel mega-inds">
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
        <div className="m-scroll">
          <Link href="/how-it-works" className="m-top">
            How It Works
          </Link>
          <Link href="/pricing" className="m-top">
            Pricing
          </Link>
          <Link href="/demos" className="m-top">
            Demos
          </Link>

          <MobileGroup id="products" title="Products" open={mGroup} setOpen={setMGroup}>
            {productLinks.map((l) => (
              <Link key={l.href} href={l.href} className="m-prod">
                <SolidIcon kind={l.kind} size={22} />
                <span>
                  <b>{l.title}</b>
                  <small>{l.desc}</small>
                </span>
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup id="solutions" title="Solutions" open={mGroup} setOpen={setMGroup}>
            <p className="m-sub">By size</p>
            {sizeLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.title}
              </Link>
            ))}
            <p className="m-sub">By need</p>
            {needLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.title}
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup id="industries" title="Industries" open={mGroup} setOpen={setMGroup}>
            {industryLinks.map((l) => (
              <Link key={l.href} href={l.href} className={`m-ind ind-${l.href.split("/").pop()}`}>
                <IndGlyph />
                {l.title}
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup id="resources" title="Resources" open={mGroup} setOpen={setMGroup}>
            {resourceLinks.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.title}
              </Link>
            ))}
          </MobileGroup>
        </div>
        <div className="m-cta">
          <Link href={cta.href} className="btn btn-primary">
            {cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}

/* One collapsible section of the phone menu. Only one is open at a time. */
function MobileGroup({
  id,
  title,
  open,
  setOpen,
  children,
}: {
  id: Exclude<MenuId, null>;
  title: string;
  open: MenuId;
  setOpen: (m: MenuId) => void;
  children: React.ReactNode;
}) {
  const isOpen = open === id;
  return (
    <div className={`m-group ${isOpen ? "open" : ""}`}>
      <button type="button" className="m-group-btn" aria-expanded={isOpen} aria-controls={`m-${id}`} onClick={() => setOpen(isOpen ? null : id)}>
        {title}
        <Icon name="chevron" width={18} height={18} />
      </button>
      <div id={`m-${id}`} className="m-group-body" hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
