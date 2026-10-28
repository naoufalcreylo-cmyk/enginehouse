"use client";

import { useId, useState } from "react";

/**
 * Accordéon inspiré du modèle de référence : l’en-tête ouvert passe au jaune,
 * l’icône « + » pivote, le contenu se déplie en douceur. Un seul panneau
 * ouvert à la fois ; le premier est ouvert par défaut.
 */
export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${uid}-b${i}`;
        const panel = `${uid}-p${i}`;
        return (
          <li key={item.q} className="acc-item border border-signal/70" data-open={isOpen}>
            <h3 className="font-sans text-base font-bold normal-case">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="acc-head flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
              >
                <span>{item.q}</span>
                <span aria-hidden="true" className="acc-icon relative size-4 shrink-0" />
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="acc-panel">
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pt-4 text-[0.98rem] leading-relaxed text-steel-700">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
