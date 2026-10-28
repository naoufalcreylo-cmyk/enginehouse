"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, CloseIcon, SearchIcon } from "@/components/icons";
import { galleryFamilies, type GalleryFamily, type GalleryItem } from "@/content/galerie";
import { quoteHref } from "@/lib/quote";

type Filter = "tous" | GalleryFamily;

const quoteFor = (g: GalleryItem) =>
  quoteHref({ type: "piece", reference: g.ref, objet: `${g.title} (${g.ref})` });

/**
 * Galerie filtrable (onglets animés), grille en mosaïque et visionneuse.
 * Chaque photo porte sa référence de galerie et un lien de demande de devis
 * qui préremplit cette référence.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const uid = useId();
  const [filter, setFilter] = useState<Filter>("tous");
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const visible = useMemo(() => (filter === "tous" ? items : items.filter((i) => i.family === filter)), [items, filter]);
  const tabs: { value: Filter; label: string; count: number }[] = [
    { value: "tous", label: "Toutes les photos", count: items.length },
    ...galleryFamilies.map((f) => ({ ...f, count: items.filter((i) => i.family === f.value).length })),
  ];

  const open = useCallback((index: number, trigger?: HTMLElement | null) => {
    lastTrigger.current = trigger ?? null;
    setCurrent(index);
  }, []);

  // Ouverture / fermeture de la boîte de dialogue native (focus et Échap gérés par le navigateur)
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (current !== null && !d.open) d.showModal();
    if (current === null && d.open) d.close();
  }, [current]);

  // Lien direct vers une photo : /galerie#EH-G05
  useEffect(() => {
    let t = 0;
    const fromHash = () => {
      const ref = decodeURIComponent(window.location.hash.slice(1));
      const idx = items.findIndex((i) => i.ref === ref);
      if (idx < 0) return;
      clearTimeout(t);
      t = window.setTimeout(() => {
        document.getElementById(ref)?.scrollIntoView({ block: "center" });
        setCurrent(idx);
      }, 300);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [items]);

  const step = (dir: 1 | -1) => {
    if (current === null) return;
    const pos = visible.indexOf(items[current]);
    const list = pos >= 0 ? visible : items;
    const base = pos >= 0 ? pos : current;
    const next = list[(base + dir + list.length) % list.length];
    setCurrent(items.indexOf(next));
  };

  const item = current !== null ? items[current] : null;

  return (
    <div>
      {/* Onglets de filtre */}
      <div role="tablist" aria-label="Familles de photos" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            id={`${uid}-tab-${t.value}`}
            aria-selected={filter === t.value}
            aria-controls={`${uid}-grid`}
            onClick={() => setFilter(t.value)}
            className="gal-tab inline-flex min-h-11 items-center gap-2 border px-4 text-sm font-bold uppercase tracking-wide"
          >
            {t.label}
            <span className="gal-tab-count text-xs">{t.count}</span>
          </button>
        ))}
      </div>

      {/* Grille en mosaïque */}
      <ul
        id={`${uid}-grid`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${filter}`}
        key={filter}
        className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3"
      >
        {visible.map((g, i) => {
          const index = items.indexOf(g);
          return (
            <li
              key={g.ref}
              id={g.ref}
              className="gal-item mb-5 break-inside-avoid scroll-mt-32"
              style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
            >
              <figure className="card-eh group border border-steel-200 bg-white">
                <button
                  type="button"
                  onClick={(e) => open(index, e.currentTarget)}
                  className="relative block w-full overflow-hidden bg-graphite"
                  aria-label={`Agrandir la photo ${g.ref} : ${g.title}`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span aria-hidden="true" className="gal-overlay absolute inset-0 flex items-center justify-center bg-ink/55">
                    <span className="flex size-14 items-center justify-center bg-signal text-ink">
                      <SearchIcon className="size-6" />
                    </span>
                  </span>
                  <span className="absolute left-3 top-3 bg-signal px-2.5 py-1 text-xs font-bold text-ink">{g.ref}</span>
                </button>
                <figcaption className="p-5">
                  <p className="text-lg font-bold leading-snug">{g.title}</p>
                  <dl className="mt-2 space-y-0.5 text-sm text-steel-600">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-steel-700">Réf. galerie :</dt>
                      <dd>{g.ref}</dd>
                    </div>
                    {g.brand && (
                      <div className="flex gap-2">
                        <dt className="font-semibold text-steel-700">Marque :</dt>
                        <dd>{g.brand}</dd>
                      </div>
                    )}
                    {g.marking && (
                      <div className="flex gap-2">
                        <dt className="font-semibold text-steel-700">Marquage visible :</dt>
                        <dd>{g.marking}</dd>
                      </div>
                    )}
                  </dl>
                  <Link
                    href={quoteFor(g)}
                    className="on-light mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide underline decoration-signal decoration-2 underline-offset-[6px]"
                  >
                    Demander un devis
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      {/* Visionneuse */}
      <dialog
        ref={dialogRef}
        aria-label={item ? `${item.ref} — ${item.title}` : "Visionneuse"}
        onClose={() => {
          setCurrent(null);
          lastTrigger.current?.focus();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setCurrent(null);
        }}
        className="gal-dialog m-auto max-h-[100dvh] w-full max-w-6xl bg-transparent p-0 text-bone backdrop:bg-ink/90"
      >
        {item && (
          <div className="flex max-h-[100dvh] flex-col p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold">
                <span className="mr-3 bg-signal px-2 py-1 text-ink">{item.ref}</span>
                {item.title}
              </p>
              <button
                type="button"
                onClick={() => setCurrent(null)}
                className="inline-flex size-11 shrink-0 items-center justify-center border border-bone/40 hover:border-signal hover:text-signal"
              >
                <CloseIcon className="size-5" />
                <span className="sr-only">Fermer la visionneuse</span>
              </button>
            </div>
            <div className="relative mt-4 min-h-0 flex-1">
              <Image
                key={item.ref}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="90vw"
                className="gal-zoom mx-auto h-auto max-h-[72dvh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="inline-flex min-h-11 items-center border border-bone/40 px-4 text-sm font-bold uppercase hover:border-signal hover:text-signal">
                  ← Précédente
                </button>
                <button type="button" onClick={() => step(1)} className="inline-flex min-h-11 items-center border border-bone/40 px-4 text-sm font-bold uppercase hover:border-signal hover:text-signal">
                  Suivante →
                </button>
              </div>
              <p className="text-sm text-steel-300">
                {[item.brand, item.marking && `Marquage visible : ${item.marking}`].filter(Boolean).join(" · ")}
              </p>
              <Link href={quoteFor(item)} className="btn-eh btn-primary inline-flex min-h-11 items-center gap-3 border-2 px-5">
                Demander un devis pour {item.ref}
                <ArrowRight className="btn-arrow size-4" />
              </Link>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
