"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/content/media";

/**
 * Photo plein cadre de l’en-tête d’accueil, avec une parallaxe discrète qui
 * suit le pointeur (souris uniquement, désactivée si les animations sont
 * réduites). Décoratif : la photo est décrite par son texte alternatif.
 */
export function HeroBackdrop({ photo }: { photo: Photo }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const section = el?.closest("section");
    if (!el || !section) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div ref={ref} className="hero-bg absolute -inset-4">
        <div className="hero-bg-inner absolute inset-0">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={photo.position ? { objectPosition: photo.position } : undefined}
          />
        </div>
      </div>
      {/* Voile sombre : garantit la lisibilité du texte sur la photo */}
      <div className="absolute inset-0 bg-ink/75 lg:bg-[linear-gradient(90deg,rgb(11_11_11/0.93)_0%,rgb(11_11_11/0.78)_42%,rgb(11_11_11/0.28)_78%,rgb(11_11_11/0.12)_100%)]" />
      <div className="tech-grid absolute inset-0" />
    </div>
  );
}
