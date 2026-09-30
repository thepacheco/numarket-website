"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import Modal from "./Modal";
import ProductSolid from "./solids/ProductSolid";
import SolidIcon from "./solids/SolidIcon";
import { products, type Product } from "@/content/products";

/* Product cards with their own 3D objects. Clicking opens a quick-view pop-up. */
export default function ProductBento() {
  const [open, setOpen] = useState<Product | null>(null);
  return (
    <>
      <div className="bento stagger">
        {products.map((p) => (
          <button key={p.slug} type="button" className={`bento-card b-${p.kind}`} onClick={() => setOpen(p)} aria-haspopup="dialog" data-solid-host>
            <div className="art solid-art">
              <ProductSolid kind={p.kind} assemble={p.kind === "foundation"} />
            </div>
            <span className="step">{p.step}</span>
            <h3>
              <SolidIcon kind={p.kind} size={26} /> {p.name}
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
            <div className="modal-art" style={{ ["--pc" as string]: `var(--p-${open.kind})` }} data-solid-host>
              <ProductSolid kind={open.kind} scale={0.34} />
            </div>
            <div className="modal-body" style={{ ["--pc" as string]: `var(--p-${open.kind})` }}>
              <span className="step">{open.step}</span>
              <h3 style={{ fontSize: 26, display: "flex", gap: 12, alignItems: "center" }}>
                <SolidIcon kind={open.kind} size={32} /> {open.name}
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
