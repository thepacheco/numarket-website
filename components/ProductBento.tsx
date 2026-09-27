"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import { ProductArt, ProductGlyph } from "./ProductArt";
import { products, type Product } from "@/content/products";

/* Product cards with their own 3D objects. Clicking opens a quick-view pop-up. */
export default function ProductBento() {
  const [open, setOpen] = useState<Product | null>(null);
  return (
    <>
      <div className="bento stagger">
        {products.map((p) => (
          <button key={p.slug} type="button" className={`bento-card b-${p.kind}`} onClick={() => setOpen(p)} aria-haspopup="dialog">
            <ProductArt kind={p.kind} />
            <span className="step">{p.step}</span>
            <h3>
              <ProductGlyph kind={p.kind} small /> {p.name}
            </h3>
            <p>{p.short}</p>
            <span className="open-hint">
              Quick look <Icon name="arrow" width={15} height={15} />
            </span>
          </button>
        ))}
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)} label={open ? `${open.name} quick look` : ""}>
        {open && (
          <div style={{ display: "contents", ["--pc" as string]: `var(--p-${open.kind})` }}>
            <div className="modal-art" style={{ ["--pc" as string]: `var(--p-${open.kind})` }}>
              <ProductArt kind={open.kind} />
            </div>
            <div className="modal-body" style={{ ["--pc" as string]: `var(--p-${open.kind})` }}>
              <span className="step">{open.step}</span>
              <h3 style={{ fontSize: 26, display: "flex", gap: 12, alignItems: "center" }}>
                <ProductGlyph kind={open.kind} /> {open.name}
              </h3>
              <p className="muted">{open.intro}</p>
              <ul className="check-list">
                {open.get.map((g) => (
                  <li key={g}>
                    <Icon name="check" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <p className="small muted">{open.includedIn}</p>
              <div className="btn-row">
                <Link href={`/products/${open.slug}`} className="btn btn-primary">
                  Explore {open.name}
                </Link>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
