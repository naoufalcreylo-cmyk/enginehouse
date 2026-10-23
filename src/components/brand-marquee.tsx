"use client";

import { useState } from "react";

export type BrandLogo = { name: string; src: string; h: string };

/**
 * Carrousel continu des logos de marques (inspiré du carrousel « clients »
 * du modèle). Il s’arrête au survol et au focus ; un bouton permet de le
 * mettre en pause. Avec prefers-reduced-motion, la liste reste fixe.
 */
export function BrandMarquee({ logos }: { logos: BrandLogo[] }) {
  const [paused, setPaused] = useState(false);
  const item = (b: BrandLogo, hidden: boolean) => (
    <li
      key={`${b.name}-${hidden ? "copie" : "orig"}`}
      aria-hidden={hidden || undefined}
      className="group flex h-24 w-44 shrink-0 items-center justify-center border-r border-steel-200 bg-white px-6 sm:w-52"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- logos SVG vectoriels */}
      <img
        src={b.src}
        alt={hidden ? "" : b.name}
        className={`${b.h} w-auto max-w-full opacity-75 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0`}
        loading="lazy"
      />
    </li>
  );

  return (
    <div className="marquee relative mb-10 border border-steel-200 bg-white" data-paused={paused}>
      <div className="overflow-hidden">
        <ul className="marquee-track flex w-max">
          {logos.map((b) => item(b, false))}
          {logos.map((b) => item(b, true))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="marquee-toggle absolute -bottom-8 right-0 inline-flex min-h-6 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-600 hover:text-ink"
      >
        <span aria-hidden="true" className="inline-flex size-4 items-center justify-center border border-current">
          {paused ? "▶" : "❚❚"}
        </span>
        {paused ? "Reprendre le défilement des logos" : "Mettre en pause le défilement des logos"}
      </button>
    </div>
  );
}
