"use client";

import { useEffect } from "react";

/**
 * Révélations au défilement, appliquées automatiquement aux blocs des
 * sections (sans modifier le contenu des pages).
 *
 * - Les blocs déjà visibles au chargement ne sont jamais masqués (pas de flash).
 * - Les listes en grille révèlent leurs éléments en cascade.
 * - Rien n’est animé si l’utilisateur a demandé à réduire les animations.
 * - Un MutationObserver prend en charge les navigations côté client.
 */
const BLOCKS = "main section:not([data-no-reveal]) > .container-eh > *";
const STAGGER_MIN = 3;

export function MotionRoot() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const register = (el: Element, delay = 0) => {
      if (el.classList.contains("rv")) return;
      const rect = el.getBoundingClientRect();
      // Visible ou déjà dépassé (ancre, retour arrière) : affiché sans animation
      const visible = rect.top < window.innerHeight * 0.95;
      el.classList.add("rv");
      if (visible) {
        el.classList.add("is-in");
      } else {
        if (delay) (el as HTMLElement).style.setProperty("--rv-delay", `${delay}ms`);
        io.observe(el);
      }
    };

    const scan = () => {
      document.querySelectorAll(BLOCKS).forEach((block) => {
        const isList = block.matches("ul, ol, .grid");
        const kids = [...block.children];
        if (isList && kids.length >= STAGGER_MIN && !block.matches(".container-eh")) {
          block.setAttribute("data-staggered", "");
          kids.forEach((kid, i) => register(kid, Math.min(i % 4, 3) * 80));
        } else {
          register(block);
        }
      });
    };

    document.documentElement.classList.add("motion-ok");
    scan();

    const main = document.querySelector("main");
    const mo = new MutationObserver(() => scan());
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
