/**
 * Emplacements photo du site.
 *
 * Toutes les photos sont celles transmises par Engine House Import Export
 * (voir aussi la galerie, src/content/galerie.ts). Aucune autre photo n’est
 * utilisée. Une entrée à `null` affiche une planche technique dessinée : c’est
 * le cas lorsqu’aucune photo transmise ne correspond au sujet (pelle
 * hydraulique, pompe hydraulique).
 *
 * Pour changer une photo : remplacer `item("EH-Gxx")` par une autre référence
 * de la galerie, ou ajouter un fichier dans /public/photos/.
 */

import { galleryItem } from "@/content/galerie";

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Photo d’illustration (banque d’images) : ajoute la mention correspondante */
  isIllustrative?: boolean;
  /** Point focal pour le recadrage (object-position CSS) */
  position?: string;
};

export type MediaSlotKey =
  | "hero"
  | "about"
  | "diagnostic"
  | "reconditionnement"
  | "injection"
  | "pieces"
  | "location"
  | "site1"
  | "site2"
  | "team"
  | "counters"
  | "demarche"
  | "banner-metiers"
  | "livraison"
  | "cat-moteurs"
  | "cat-hydraulique"
  | "cat-transmissions"
  | "cat-reducteurs"
  | "cat-injection"
  | "cat-pieces";

function item(ref: string, position?: string): Photo {
  const i = galleryItem(ref);
  if (!i) throw new Error(`Photo de galerie inconnue : ${ref}`);
  return { src: i.src, alt: i.alt, width: i.width, height: i.height, position };
}

export const media: Record<MediaSlotKey, Photo | null> = {
  hero: item("EH-G11"),
  about: item("EH-G17", "50% 40%"),
  diagnostic: item("EH-G07", "50% 35%"),
  reconditionnement: item("EH-G01"),
  injection: item("EH-G02"),
  pieces: item("EH-G23"),
  location: null,
  site1: item("EH-G16", "50% 30%"),
  site2: item("EH-G15"),
  team: null,
  counters: item("EH-G13", "50% 35%"),
  demarche: item("EH-G09", "50% 40%"),
  "banner-metiers": item("EH-G21"),
  livraison: item("EH-G20"),
  "cat-moteurs": item("EH-G18", "50% 35%"),
  "cat-hydraulique": null,
  "cat-transmissions": item("EH-G05"),
  "cat-reducteurs": item("EH-G12"),
  "cat-injection": item("EH-G03"),
  "cat-pieces": item("EH-G06"),
};
