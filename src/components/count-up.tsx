"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compteur animé pour un chiffre déjà présent dans le contenu
 * (ex. « 1 000 m² », « + de 15 ans »). Le texte final est rendu côté serveur
 * et lu par les lecteurs d’écran ; seule la copie visible s’anime, une fois,
 * à son entrée à l’écran. Les années (« 2013 ») ne sont pas animées.
 */
const NUMBER = /\d[\d\s  ]*/;

export function CountUp({
  value,
  duration = 1600,
  delay = 0,
  className,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const match = value.match(NUMBER);
  const raw = match?.[0] ?? "";
  const target = Number(raw.replace(/\D/g, ""));
  const isYear = target >= 1900 && target <= 2100;
  const animatable = Boolean(match) && target > 0 && !isYear;

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !animatable) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        setCurrent(t >= 1 ? null : Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setCurrent(0);
        timer = window.setTimeout(run, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [animatable, target, duration, delay]);

  if (!animatable) return <span className={className}>{value}</span>;

  const shown =
    current === null ? value : value.replace(raw.trimEnd(), current.toLocaleString("fr-FR").replace(/ /g, " "));

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {shown}
      </span>
    </span>
  );
}
