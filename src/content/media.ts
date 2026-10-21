/**
 * Emplacements photo du site.
 *
 * Les photos actuelles sont des photos d'illustration sous licence libre
 * (Wikimedia Commons) : elles ne montrent ni les locaux, ni le personnel, ni
 * le stock d'Engine House. Elles portent donc `isIllustrative: true` (mention
 * « Photo d’illustration ») et leurs crédits sont publiés sur /credits-photos.
 *
 * Pour publier une photo authentique : déposer le fichier dans /public/photos/,
 * renseigner `src`, `alt`, `width`, `height`, retirer `credit` et
 * `isIllustrative`. Une entrée à `null` affiche la planche technique dessinée.
 */

export type Credit = {
  author: string;
  license: string;
  licenseUrl: string | null;
  source: string;
};

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  isIllustrative?: boolean;
  credit?: Credit;
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
  | "cat-moteurs"
  | "cat-hydraulique"
  | "cat-transmissions"
  | "cat-reducteurs"
  | "cat-injection"
  | "cat-pieces";

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
const BY_SA = (v: string) => `https://creativecommons.org/licenses/by-sa/${v}/`;
const CC0 = "https://creativecommons.org/publicdomain/zero/1.0/";

export const media: Record<MediaSlotKey, Photo | null> = {
  hero: {
    src: "/photos/hero.jpg",
    alt: "Moteur diesel Caterpillar : turbocompresseur, collecteurs et tuyauteries",
    width: 1800,
    height: 1320,
    isIllustrative: true,
    credit: { author: "Ruth Hartnup", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", source: commons("Caterpillar_engine_(2450810728).jpg") },
  },
  about: {
    src: "/photos/about.jpg",
    alt: "Chargeuse sur pneus Caterpillar dans une carrière de marbre",
    width: 1800,
    height: 1200,
    isIllustrative: true,
    credit: { author: "Naturpuur", license: "CC BY-SA 4.0", licenseUrl: BY_SA("4.0"), source: commons("Salla,_Marmor_Steinbruch_Brusa,_Marktgemeinde_Maria_Lankowitz,_Weststeiermark,_Austria_10.jpg") },
  },
  diagnostic: {
    src: "/photos/diagnostic.jpg",
    alt: "Pelle hydraulique au travail sur le front de taille d’une carrière",
    width: 1800,
    height: 1010,
    isIllustrative: true,
    credit: { author: "Derek Harper", license: "CC BY-SA 2.0", licenseUrl: BY_SA("2.0"), source: commons("Excavator,_Callow_Rock_Quarry_-_geograph.org.uk_-_5964712.jpg") },
  },
  reconditionnement: {
    src: "/photos/reconditionnement.jpg",
    alt: "Culasse de moteur Caterpillar déposée, soupapes apparentes, en cours de révision",
    width: 1800,
    height: 1001,
    isIllustrative: true,
    credit: { author: "Seedlesslime", license: "CC BY-SA 4.0", licenseUrl: BY_SA("4.0"), source: commons("Cylinder_head_of_a_Caterpillar_engine.jpg") },
  },
  injection: {
    src: "/photos/injection.jpg",
    alt: "Injecteur diesel common rail en gros plan",
    width: 1800,
    height: 936,
    isIllustrative: true,
    credit: { author: "Panoha", license: "CC BY-SA 3.0", licenseUrl: BY_SA("3.0"), source: commons("Bosch_common_rail_injector_(cropped).JPG") },
  },
  pieces: {
    src: "/photos/pieces.jpg",
    alt: "Vilebrequin en place dans un bloc moteur ouvert",
    width: 1800,
    height: 1333,
    isIllustrative: true,
    credit: { author: "Seedlesslime", license: "CC BY-SA 4.0", licenseUrl: BY_SA("4.0"), source: commons("Crankshaft_of_an_engine.jpg") },
  },
  location: {
    src: "/photos/location.jpg",
    alt: "Pelle hydraulique sur chenilles de la catégorie 20 tonnes, vue de côté",
    width: 1800,
    height: 1143,
    isIllustrative: true,
    credit: { author: "Wikideas1", license: "CC0", licenseUrl: CC0, source: commons("Excavator_side.jpg") },
  },
  site1: {
    src: "/photos/site1.jpg",
    alt: "Alignement de bulldozers Caterpillar D8R sur une aire de stationnement",
    width: 1800,
    height: 1350,
    isIllustrative: true,
    credit: { author: "Alf van Beem", license: "CC0", licenseUrl: CC0, source: commons("Caterpillar_D8R_p1.JPG") },
  },
  site2: {
    src: "/photos/site2.jpg",
    alt: "Mécanicien intervenant sur un moteur diesel Caterpillar monté sur support",
    width: 1800,
    height: 1200,
    isIllustrative: true,
    position: "30% 50%",
    credit: { author: "Cpl Michael J. O’Brien (US Marine Corps)", license: "Domaine public", licenseUrl: null, source: commons("USMC-070801-M-4314O-008.jpg") },
  },
  team: null,
  "cat-moteurs": {
    src: "/photos/cat-moteurs.jpg",
    alt: "Moteur diesel Caterpillar C32 exposé sur son support",
    width: 1800,
    height: 1617,
    isIllustrative: true,
    credit: { author: "JMK", license: "CC BY-SA 3.0", licenseUrl: BY_SA("3.0"), source: commons("Caterpillar_C32,_Waterkloof_Lugmagbasis.jpg") },
  },
  "cat-hydraulique": {
    src: "/photos/cat-hydraulique.jpg",
    alt: "Moteur hydraulique raccordé à ses flexibles sur une machine",
    width: 1800,
    height: 1095,
    isIllustrative: true,
    credit: { author: "Simiprof", license: "CC0", licenseUrl: CC0, source: commons("Hydraulic_motor.jpg") },
  },
  "cat-transmissions": {
    src: "/photos/cat-transmissions.jpg",
    alt: "Boîte de transmission industrielle de grande taille chargée sur un plateau",
    width: 1800,
    height: 1321,
    isIllustrative: true,
    position: "50% 75%",
    credit: { author: "Yuexin indonesia", license: "CC BY-SA 4.0", licenseUrl: BY_SA("4.0"), source: commons("Manufactures_of_industrial_gearbox.jpg") },
  },
  "cat-reducteurs": {
    src: "/photos/cat-reducteurs.jpg",
    alt: "Bulldozer Caterpillar D8R, vue latérale montrant le barbotin et la transmission finale",
    width: 1800,
    height: 1349,
    isIllustrative: true,
    credit: { author: "Alf van Beem", license: "CC0", licenseUrl: CC0, source: commons("Caterpillar_D8R_p2.JPG") },
  },
  "cat-injection": {
    src: "/photos/cat-injection.jpg",
    alt: "Pompe d’injection diesel montée sur moteur, avec ses canalisations haute pression",
    width: 1800,
    height: 1350,
    isIllustrative: true,
    credit: { author: "Panoha", license: "CC BY-SA 3.0", licenseUrl: BY_SA("3.0"), source: commons("Bosch_distributor_injection_pump.jpg") },
  },
  "cat-pieces": {
    src: "/photos/cat-pieces.jpg",
    alt: "Roulement à billes de 60 mm",
    width: 1800,
    height: 1350,
    isIllustrative: true,
    credit: { author: "Massimiliano Lincetto", license: "CC BY-SA 3.0", licenseUrl: BY_SA("3.0"), source: commons("Rolling-element_bearing_60_mm.jpg") },
  },
};

export const mediaLabels: Partial<Record<MediaSlotKey, string>> = {
  hero: "Accueil — en-tête",
  about: "À propos",
  diagnostic: "Diagnostic et réparation",
  reconditionnement: "Reconditionnement",
  injection: "Injecteurs et pompes HP",
  pieces: "Pièces de rechange",
  location: "Location de pelles",
  site1: "Nos moyens — site 1",
  site2: "Nos moyens — site 2",
  "cat-moteurs": "Catalogue — moteurs thermiques",
  "cat-hydraulique": "Catalogue — hydraulique",
  "cat-transmissions": "Catalogue — transmissions",
  "cat-reducteurs": "Catalogue — réducteurs",
  "cat-injection": "Catalogue — injection",
  "cat-pieces": "Catalogue — pièces de rechange",
};
