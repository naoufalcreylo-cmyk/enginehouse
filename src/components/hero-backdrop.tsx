"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Photo } from "@/content/media";

export type HeroSlide = { photo: Photo; caption: string };

const INTERVAL = 6500;

type Ctx = {
  slides: HeroSlide[];
  index: number;
  setIndex: (i: number) => void;
  paused: boolean;
  setPaused: (fn: (p: boolean) => boolean) => void;
  reduced: boolean;
};

const HeroContext = createContext<Ctx | null>(null);

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const usePrefersReducedMotion = () =>
  useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false);

/**
 * Diaporama plein cadre de l’en-tête d’accueil (fondu enchaîné + zoom lent),
 * inspiré du carrousel du modèle de référence, avec une parallaxe discrète
 * qui suit la souris. Le texte de l’en-tête ne change jamais.
 * Accessibilité : bouton pause, accès direct à chaque photo, arrêt quand
 * l’onglet est masqué, aucune lecture automatique si les animations sont réduites.
 */
export function HeroCarousel({ slides, children }: { slides: HeroSlide[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = slides.length;

  // Parallaxe au pointeur (souris uniquement)
  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // Lecture automatique (relancée à chaque changement de photo)
  useEffect(() => {
    if (paused || reduced || count < 2) return;
    // Intervalle relancé à chaque changement (manuel ou automatique) ; ignoré si l’onglet est masqué
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, reduced, count, index]);

  return (
    <HeroContext.Provider value={{ slides, index, setIndex, paused, setPaused, reduced }}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div ref={ref} className="hero-bg absolute -inset-4">
          <div className="hero-bg-inner absolute inset-0">
            {slides.map((s, i) => (
              <div key={s.photo.src} className="hero-slide absolute inset-0" data-active={i === index}>
                <Image
                  src={s.photo.src}
                  alt={i === index ? s.photo.alt : ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="hero-slide-img object-cover"
                  style={s.photo.position ? { objectPosition: s.photo.position } : undefined}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Voile sombre : garantit la lisibilité du texte sur la photo */}
        <div className="absolute inset-0 bg-ink/75 lg:bg-[linear-gradient(90deg,rgb(11_11_11/0.93)_0%,rgb(11_11_11/0.78)_42%,rgb(11_11_11/0.28)_78%,rgb(11_11_11/0.12)_100%)]" />
        <div className="tech-grid absolute inset-0" />
      </div>
      {children}
    </HeroContext.Provider>
  );
}

/** Légende de la photo affichée + commandes du diaporama. */
export function HeroCaption({ className = "" }: { className?: string }) {
  const ctx = useContext(HeroContext);
  if (!ctx) return null;
  const { slides, index, setIndex, paused, setPaused, reduced } = ctx;
  const slide = slides[index];
  const count = slides.length;
  const playing = !paused && !reduced && count > 1;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {count > 1 && (
        <div className="flex items-center gap-3 lg:justify-end">
          <ol className="flex items-center gap-1.5" aria-label="Photos de l’en-tête">
            {slides.map((s, i) => (
              <li key={s.photo.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  className="group flex h-8 w-10 items-center"
                >
                  <span className="sr-only">
                    Photo {i + 1} sur {count} : {s.caption}
                  </span>
                  <span aria-hidden="true" className="relative block h-[3px] w-full overflow-hidden bg-bone/25 transition-colors group-hover:bg-bone/50">
                    <span
                      key={i === index ? `actif-${index}` : "inactif"}
                      className="hero-dot-fill absolute inset-0 bg-signal"
                      data-active={i === index}
                      data-playing={playing}
                      style={{ animationDuration: `${INTERVAL}ms` }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex size-8 items-center justify-center border border-bone/40 font-mono text-[10px] text-bone transition-colors duration-300 hover:border-signal hover:text-signal"
            >
              <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
              <span className="sr-only">{paused ? "Reprendre le diaporama" : "Mettre en pause le diaporama"}</span>
            </button>
          )}
        </div>
      )}
      <p key={index} className="hero-caption flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-300 lg:justify-end">
        <span>
          <span className="text-signal">FIG. {String(index + 1).padStart(2, "0")} — </span>
          {slide.caption}
        </span>
        {slide.photo.isIllustrative && <span className="text-steel-400">Photo d’illustration</span>}
      </p>
    </div>
  );
}
