/**
 * Icônes au trait (48 × 48) avec un détail jaune, dans l'esprit des blocs
 * « icône + texte » observés sur le modèle de référence. Décoratives.
 * Le détail jaune porte la classe `ic-accent`, animée au survol de la carte.
 */

import type { ReactNode } from "react";

export type LineIconName =
  | "btp"
  | "terrassement"
  | "mines"
  | "carrieres"
  | "tests"
  | "sur-mesure"
  | "marques"
  | "inspection"
  | "essais"
  | "flux"
  | "tracabilite"
  | "magasin"
  | "lavage"
  | "banc"
  | "moteur"
  | "hydraulique"
  | "charge";

const icons: Record<LineIconName, ReactNode> = {
  btp: (
    <>
      <path d="M8 42h32M12 42V14h4v28M16 14h22l-4 6H16" />
      <path d="M14 14l2-6 2 6M34 20v8" />
      <rect x="30" y="28" width="8" height="6" className="ic-accent" />
    </>
  ),
  terrassement: (
    <>
      <path d="M6 40h36M8 40l3-7h14l3 7" />
      <path d="M14 33V25h8l3 8M22 25l8-12 8 7" />
      <path d="M38 20l2 8-7 1z" className="ic-accent" />
    </>
  ),
  mines: (
    <>
      <path d="M10 38l18-18M24 16c6-2 12 0 16 4-6-1-10 0-14 2" />
      <path d="M22 22l4 4" />
      <circle cx="13" cy="35" r="3.5" className="ic-accent" />
      <path d="M30 42h12M33 42l3-6 3 6" />
    </>
  ),
  carrieres: (
    <>
      <path d="M4 42l10-14 6 6 8-12 16 20z" />
      <path d="M20 34l-4 8M28 22l2 6" />
      <circle cx="36" cy="12" r="4" className="ic-accent" />
    </>
  ),
  tests: (
    <>
      <path d="M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11z" />
      <path d="M17 24l5 5 9-10" className="ic-accent-stroke" />
    </>
  ),
  "sur-mesure": (
    <>
      <path d="M10 10v28M24 10v28M38 10v28" />
      <rect x="6" y="16" width="8" height="5" className="ic-accent" />
      <rect x="20" y="28" width="8" height="5" />
      <rect x="34" y="20" width="8" height="5" />
    </>
  ),
  marques: (
    <>
      <rect x="10" y="16" width="24" height="18" />
      <path d="M14 16v-5h6v5M24 16v-5h6v5M34 22h6v8h-6M10 25H5" />
      <circle cx="22" cy="25" r="4" className="ic-accent" />
    </>
  ),
  inspection: (
    <>
      <circle cx="20" cy="20" r="11" />
      <path d="M28 28l12 12" />
      <circle cx="20" cy="20" r="4" className="ic-accent" />
    </>
  ),
  essais: (
    <>
      <path d="M8 34a16 16 0 1 1 32 0" />
      <path d="M24 34l9-11" className="ic-accent-stroke" />
      <circle cx="24" cy="34" r="3" className="ic-accent" />
      <path d="M12 26l3 2M24 18v3M36 26l-3 2" />
    </>
  ),
  flux: (
    <>
      <rect x="5" y="18" width="10" height="12" />
      <rect x="33" y="18" width="10" height="12" />
      <path d="M15 24h18M28 19l5 5-5 5" />
      <circle cx="24" cy="24" r="3" className="ic-accent" />
    </>
  ),
  tracabilite: (
    <>
      <rect x="11" y="8" width="26" height="34" />
      <path d="M18 8V5h12v3M16 18h6M16 26h6M16 34h6" />
      <path d="M26 18l2 2 4-4M26 26l2 2 4-4" />
      <path d="M26 34l2 2 4-4" className="ic-accent-stroke" />
    </>
  ),
  magasin: (
    <>
      <path d="M6 42V8M42 42V8M6 20h36M6 32h36" />
      <rect x="10" y="12" width="9" height="8" />
      <rect x="24" y="24" width="12" height="8" className="ic-accent" />
      <rect x="12" y="34" width="8" height="8" />
    </>
  ),
  lavage: (
    <>
      <path d="M14 8h20M24 8v6M16 14h16l-2 6H18z" />
      <path d="M18 26v3M24 26v6M30 26v3" />
      <path d="M24 34c-3 4-4 6-4 8a4 4 0 0 0 8 0c0-2-1-4-4-8z" className="ic-accent" />
    </>
  ),
  banc: (
    <>
      <path d="M4 38h40M8 38v4M40 38v4" />
      <rect x="8" y="22" width="16" height="16" />
      <path d="M24 30h6" />
      <circle cx="36" cy="30" r="6" className="ic-accent" />
      <path d="M12 22v-4h8v4" />
    </>
  ),
  moteur: (
    <>
      <path d="M10 18h24v18H10z" />
      <path d="M14 18v-5h6v5M24 18v-5h6v5M34 24h7v6h-7M10 27H5" />
      <path d="M16 24v6M22 24v6M28 24v6" className="ic-accent-stroke" />
    </>
  ),
  hydraulique: (
    <>
      <circle cx="20" cy="24" r="12" />
      <circle cx="20" cy="24" r="4" className="ic-accent" />
      <path d="M32 24h10M37 19v10M20 12V6M20 42v-6" />
    </>
  ),
  charge: (
    <>
      <rect x="8" y="12" width="28" height="26" />
      <path d="M36 20h4v10h-4M14 12V8h6v4M24 12V8h6v4" />
      <path d="M24 17l-6 9h6l-2 8 8-11h-6z" className="ic-accent" />
    </>
  ),
};

export function LineIcon({ name, className = "size-12" }: { name: LineIconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`line-icon ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}
