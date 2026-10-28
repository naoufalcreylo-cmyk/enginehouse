"use client";

import { useState } from "react";

export type BrandLogo = { name: string; src: string; h: string };

/**
 * Carrousel continu des logos de marques, en couleurs, avec fondu sur les bords.
 * Il ralentit puis s’arrête au survol et au focus. Le bouton de pause n’est
 * visible qu’au clavier (critère d’accessibilité sur les contenus animés).
 * Avec prefers-reduced-motion, la liste reste fixe.
 */
export function BrandMarquee({ logos }: { logos: BrandLogo[] }) {
  const [paused, setPaused] = useState(false);
  const item = (b: BrandLogo, hidden: boolean) => (
    <li
      key={`${b.name}-${hidden ? "copie" : "orig"}`}
      aria-hidden={hidden || undefined}
      className="marquee-logo flex h-28 shrink-0 items-center justify-center px-8 sm:px-12"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- logos SVG vectoriels */}
      <img src={b.src} alt={hidden ? "" : b.name} className={`${b.h} w-auto max-w-[11rem]`} loading="lazy" />
    </li>
  );

  return (
    <div className="marquee relative" data-paused={paused}>
      <div className="marquee-mask overflow-hidden">
        <ul className="marquee-track flex w-max items-center">
          {logos.map((b) => item(b, false))}
          {logos.map((b) => item(b, true))}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="sr-only focus:not-sr-only focus:absolute focus:right-0 focus:top-full focus:mt-2 focus:bg-ink focus:px-3 focus:py-2 focus:text-xs focus:font-bold focus:text-bone"
      >
        {paused ? "Reprendre le défilement des logos" : "Mettre en pause le défilement des logos"}
      </button>
    </div>
  );
}
