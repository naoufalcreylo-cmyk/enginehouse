/**
 * Galerie photo — photos transmises par Engine House Import Export.
 *
 * `ref` est la référence de galerie (EH-G01…) à rappeler dans une demande de devis.
 * `marking` ne contient QUE ce qui est lisible sur la photo (étiquette, plaque,
 * texte du client) : ne rien déduire. Laisser vide si rien n’est lisible ;
 * Engine House pourra compléter avec la référence constructeur exacte.
 */

export type GalleryFamily = "moteurs" | "injection" | "hydraulique" | "transmissions";

export type GalleryItem = {
  ref: string;
  src: string;
  width: number;
  height: number;
  title: string;
  family: GalleryFamily;
  /** Marque visible sur la photo (logo, étiquette, plaque) */
  brand?: string;
  /** Marquage lisible sur la photo */
  marking?: string;
  alt: string;
};

export const galleryFamilies: { value: GalleryFamily; label: string }[] = [
  { value: "moteurs", label: "Moteurs" },
  { value: "injection", label: "Injection" },
  { value: "hydraulique", label: "Hydraulique" },
  { value: "transmissions", label: "Transmissions et réducteurs" },
];

const g = (n: number) => `/photos/galerie/eh-g${String(n).padStart(2, "0")}.jpg`;

export const gallery: GalleryItem[] = [
  { ref: "EH-G01", src: g(1), width: 1224, height: 1224, family: "moteurs", title: "Bloc moteur diesel sur palette", alt: "Bloc moteur diesel peint en jaune, filmé sur une palette en bois" },
  { ref: "EH-G02", src: g(2), width: 875, height: 614, family: "injection", title: "Injecteur diesel", alt: "Injecteur diesel avec joints et connecteur, vue de profil" },
  { ref: "EH-G03", src: g(3), width: 1080, height: 1080, family: "injection", title: "Pompe d’injection haute pression", brand: "Caterpillar", marking: "317-8021", alt: "Pompe d’injection Caterpillar avec son étiquette 317-8021" },
  { ref: "EH-G04", src: g(4), width: 1080, height: 1080, family: "injection", title: "Pompe d’injection à commande électronique", brand: "Bosch", marking: "0 281 001 592", alt: "Pompe d’injection Bosch avec boîtier électronique et bouchons de protection rouges" },
  { ref: "EH-G05", src: g(5), width: 1078, height: 810, family: "transmissions", title: "Transmission 980H", marking: "980H", alt: "Transmission peinte en jaune sur support, légendée 980H Transmission" },
  { ref: "EH-G06", src: g(6), width: 757, height: 661, family: "injection", title: "Injecteur diesel", alt: "Injecteur diesel, vue de trois quarts" },
  { ref: "EH-G07", src: g(7), width: 900, height: 1600, family: "moteurs", title: "Moteur diesel avec ventilateur", alt: "Moteur diesel jaune équipé de son ventilateur, posé sur une palette en atelier" },
  { ref: "EH-G08", src: g(8), width: 1024, height: 768, family: "moteurs", title: "Moteur diesel au chargement", alt: "Moteur diesel filmé, levé par chaînes au-dessus d’un plateau de camion" },
  { ref: "EH-G09", src: g(9), width: 1200, height: 1600, family: "moteurs", title: "Moteur diesel sur bâti", brand: "Caterpillar", alt: "Moteur Caterpillar sur bâti métallique, pompe d’injection et filtre visibles" },
  { ref: "EH-G10", src: g(10), width: 1280, height: 960, family: "moteurs", title: "Moteur diesel six cylindres", alt: "Moteur diesel six cylindres peint en jaune, faisceau électrique apparent" },
  { ref: "EH-G11", src: g(11), width: 1600, height: 1200, family: "moteurs", title: "Moteur diesel sur palette, en atelier", alt: "Moteur diesel jaune avec calculateur et démarreur, sur palette dans un atelier" },
  { ref: "EH-G12", src: g(12), width: 720, height: 865, family: "transmissions", title: "Réduction finale D8R", marking: "D8R", alt: "Réduction finale de bulldozer peinte en jaune, sur un support métallique" },
  { ref: "EH-G13", src: g(13), width: 720, height: 1600, family: "moteurs", title: "Moteur diesel à double turbocompresseur", alt: "Moteur diesel avec deux turbocompresseurs, posé sur un bâti" },
  { ref: "EH-G14", src: g(14), width: 1200, height: 1600, family: "moteurs", title: "Moteur diesel et filtres à carburant", brand: "Caterpillar", marking: "Filtres 1R-0762", alt: "Moteur diesel sur bâti avec deux filtres à carburant 1R-0762" },
  { ref: "EH-G15", src: g(15), width: 1600, height: 1200, family: "moteurs", title: "Moteur diesel sur palette", brand: "Caterpillar", marking: "Filtre 1R-1808", alt: "Moteur Caterpillar sur palette avec turbocompresseur et filtre à huile 1R-1808" },
  { ref: "EH-G16", src: g(16), width: 720, height: 1600, family: "moteurs", title: "Moteur diesel, côté volant moteur", alt: "Moteur diesel vu côté carter de volant, posé sur un bâti" },
  { ref: "EH-G17", src: g(17), width: 900, height: 1600, family: "moteurs", title: "Moteur diesel, vue avant", brand: "Caterpillar", alt: "Moteur diesel Caterpillar vu de l’avant, turbocompresseur et poulie visibles" },
  { ref: "EH-G18", src: g(18), width: 900, height: 1600, family: "moteurs", title: "Moteur C6.6 ACERT en caisse", brand: "Caterpillar", marking: "C6.6 ACERT", alt: "Moteur Caterpillar C6.6 ACERT emballé dans une caisse en bois" },
  { ref: "EH-G19", src: g(19), width: 1400, height: 1050, family: "moteurs", title: "Moteur diesel", brand: "Cummins", alt: "Moteur diesel Cummins noir posé sur une housse jaune" },
  { ref: "EH-G20", src: g(20), width: 1600, height: 1600, family: "transmissions", title: "Boîte de transmission en caisse", alt: "Boîte de transmission noire calée dans une caisse en bois" },
  { ref: "EH-G21", src: g(21), width: 1280, height: 960, family: "moteurs", title: "Moteur diesel avec calculateur", alt: "Moteur diesel jaune avec calculateur électronique et collecteur d’admission" },
  { ref: "EH-G22", src: g(22), width: 720, height: 1280, family: "transmissions", title: "Réducteurs de grande taille", alt: "Deux réducteurs de grande taille peints en jaune, empilés" },
  { ref: "EH-G23", src: g(23), width: 1080, height: 810, family: "transmissions", title: "Réducteurs d’orientation", alt: "Deux réducteurs avec pignon de sortie et anneaux de levage" },
  { ref: "EH-G24", src: g(24), width: 560, height: 315, family: "hydraulique", title: "Pompes hydrauliques en stock", alt: "Pompes hydrauliques principales rangées sur une étagère du stock (détail de la photo EH-G09)" },
];

export function galleryItem(ref: string) {
  return gallery.find((i) => i.ref === ref);
}
