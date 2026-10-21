/**
 * Emplacements photo du site.
 *
 * Aucune photographie authentique n'a été fournie : chaque emplacement affiche
 * pour l'instant une planche technique illustrée. Pour publier une vraie photo,
 * déposez le fichier dans /public/photos/ puis renseignez `src`, `alt`,
 * `width` et `height` ci-dessous. La photo remplace l'illustration partout où
 * l'emplacement est utilisé.
 *
 * Ne pas présenter de photo d'illustration (banque d'images) comme les locaux
 * ou le personnel d'Engine House : utiliser `isIllustrative: true` le cas échéant,
 * ce qui ajoute la mention « Photo d’illustration ».
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isIllustrative?: boolean;
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
  | "team";

export const media: Record<MediaSlotKey, Photo | null> = {
  hero: null,
  about: null,
  diagnostic: null,
  reconditionnement: null,
  injection: null,
  pieces: null,
  location: null,
  site1: null,
  site2: null,
  team: null,
};
