import type { FigureKey } from "@/components/figures";
import type { MediaSlotKey } from "@/content/media";

export type Category = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  intro: string[];
  /** Types de composants couverts par la famille */
  covers: string[];
  /**
   * Références ou marques citées dans le document de présentation.
   * Elles servent de repères de consultation : elles ne signifient ni
   * une disponibilité en stock, ni une compatibilité.
   */
  consultFor?: { label: string; items: string[] };
  stockNote?: string;
  relatedService: string;
  figure: FigureKey;
  photo: MediaSlotKey;
  seo: { title: string; description: string };
};

export const categories: Category[] = [
  {
    slug: "moteurs-thermiques",
    code: "CAT-01",
    title: "Moteurs thermiques",
    summary: "Moteurs diesel industriels neufs, d’occasion ou reconditionnés pour engins lourds.",
    intro: [
      "Le moteur est l’organe dont l’arrêt immobilise toute la machine. Nous proposons des moteurs diesel industriels neufs, d’occasion ou reconditionnés, sélectionnés selon l’application et les conditions d’utilisation de l’engin.",
      "Nos moteurs reconditionnés suivent une révision complète. Certains peuvent bénéficier d’une garantie allant jusqu’à 12 mois, selon les conditions applicables.",
    ],
    covers: ["Moteurs complets", "Moteurs reconditionnés", "Blocs et sous-ensembles", "Pièces moteur"],
    consultFor: {
      label: "Moteurs Caterpillar sur lesquels nous consulter",
      items: ["C6.6", "C7", "C9", "C11", "C13", "C15", "C18", "C27", "C32", "3126", "3408", "3508"],
    },
    stockNote: "Notre stock de moteurs se compose principalement de moteurs Caterpillar et Cummins.",
    relatedService: "reconditionnement-organes-majeurs",
    figure: "engine",
    photo: "cat-moteurs",
    seo: {
      title: "Moteurs thermiques diesel pour engins — neufs, occasion, reconditionnés",
      description:
        "Moteurs diesel industriels Caterpillar et Cummins pour engins de chantier, mines et carrières : neufs, d’occasion ou reconditionnés. Cotation sur demande.",
    },
  },
  {
    slug: "pompes-et-moteurs-hydrauliques",
    code: "CAT-02",
    title: "Pompes et moteurs hydrauliques",
    summary: "Pompes hydrauliques et moteurs hydrauliques pour pelles, chargeuses et engins de carrière.",
    intro: [
      "L’hydraulique transmet la puissance aux outils, à la translation et à l’orientation de l’engin. Une pompe ou un moteur hydraulique défaillant suffit à arrêter un chantier.",
      "Nous fournissons et reconditionnons des pompes et des moteurs hydrauliques, montés et contrôlés selon les standards et tolérances des constructeurs.",
    ],
    covers: ["Pompes hydrauliques principales", "Moteurs hydrauliques", "Composants hydrauliques"],
    consultFor: {
      label: "Marques à indiquer dans votre demande, par exemple",
      items: ["Caterpillar", "Volvo", "Komatsu", "Doosan", "Liebherr", "Poclain"],
    },
    stockNote: "Notre stock de pompes hydrauliques couvre l’ensemble de la gamme des machines.",
    relatedService: "reconditionnement-organes-majeurs",
    figure: "pump",
    photo: "cat-hydraulique",
    seo: {
      title: "Pompes et moteurs hydrauliques pour engins de chantier",
      description:
        "Pompes hydrauliques et moteurs hydrauliques neufs, d’occasion ou reconditionnés pour pelles et engins de mines et carrières. Demande de prix et disponibilité.",
    },
  },
  {
    slug: "boites-de-vitesses-et-transmissions",
    code: "CAT-03",
    title: "Boîtes de vitesses et transmissions",
    summary: "Boîtes de vitesses, boîtes de transfert et organes de transmission.",
    intro: [
      "Les organes de transmission subissent des charges élevées et répétées, en particulier sur les machines de mines et de carrières.",
      "Nous traitons les boîtes de vitesses et les boîtes de transfert avec la même exigence que nos moteurs : contrôle, remise à niveau et essais selon les préconisations des constructeurs.",
    ],
    covers: ["Boîtes de vitesses", "Boîtes de transfert", "Organes de transmission"],
    relatedService: "reconditionnement-organes-majeurs",
    figure: "gearbox",
    photo: "cat-transmissions",
    seo: {
      title: "Boîtes de vitesses et transmissions pour engins lourds",
      description:
        "Boîtes de vitesses, boîtes de transfert et organes de transmission pour engins de chantier, mines et carrières : fourniture et reconditionnement sur devis.",
    },
  },
  {
    slug: "reducteurs",
    code: "CAT-04",
    title: "Réducteurs",
    summary: "Réducteurs pour engins de chantier, fournis ou reconditionnés.",
    intro: [
      "Les réducteurs convertissent la vitesse des moteurs hydrauliques en couple utile. Leur usure se traduit par des bruits, des fuites ou une perte d’efficacité.",
      "Nous fournissons et reconditionnons des réducteurs, avec un stock dimensionné pour répondre aux besoins des machines de carrières et de mines.",
    ],
    covers: ["Réducteurs de translation", "Réducteurs d’orientation", "Sous-ensembles de réducteurs"],
    relatedService: "reconditionnement-organes-majeurs",
    figure: "reducer",
    photo: "cat-reducteurs",
    seo: {
      title: "Réducteurs pour engins de chantier, mines et carrières",
      description:
        "Réducteurs pour pelles et engins de chantier : fourniture et reconditionnement avec contrôle selon les préconisations constructeur. Cotation sur demande.",
    },
  },
  {
    slug: "injecteurs-et-pompes-haute-pression",
    code: "CAT-05",
    title: "Injecteurs et pompes haute pression",
    summary: "Réparation et reconditionnement d’injecteurs diesel et de pompes HP sur banc d’essai.",
    intro: [
      "L’injection conditionne la puissance, la consommation et la longévité du moteur diesel.",
      "Transmettez-nous la référence de vos injecteurs ou de votre pompe haute pression : nous étudions la réparation, le reconditionnement ou la solution la plus adaptée, avec diagnostic et réglage sur banc d’essai.",
    ],
    covers: ["Injecteurs diesel", "Pompes haute pression", "Composants common rail"],
    consultFor: {
      label: "Marques à indiquer dans votre demande, par exemple",
      items: ["Caterpillar", "Bosch"],
    },
    relatedService: "injecteurs-et-pompes-haute-pression",
    figure: "injector",
    photo: "cat-injection",
    seo: {
      title: "Injecteurs diesel et pompes haute pression pour engins",
      description:
        "Injecteurs diesel, pompes haute pression et composants common rail : réparation et reconditionnement sur banc d’essai pour moteurs d’engins.",
    },
  },
  {
    slug: "pieces-de-rechange",
    code: "CAT-06",
    title: "Pièces de rechange",
    summary: "Pièces de rechange neuves et d’occasion pour les grandes marques d’engins.",
    intro: [
      "Une pièce manquante peut immobiliser une machine aussi sûrement qu’une panne majeure.",
      "Nous disposons d’un stock important de pièces de rechange neuves et d’occasion. Indiquez la référence, ou à défaut la marque et le modèle de l’engin : nous vérifions la disponibilité et vous adressons une cotation.",
    ],
    covers: ["Pièces moteur", "Pièces hydrauliques", "Pièces de transmission", "Pièces d’usure et d’entretien"],
    consultFor: {
      label: "Marques à indiquer dans votre demande, par exemple",
      items: ["Caterpillar", "Volvo", "Volvo Penta", "Komatsu", "Doosan", "Liebherr"],
    },
    stockNote: "Nous disposons d’un stock important de pièces neuves et d’occasion.",
    relatedService: "pieces-de-rechange-et-composants",
    figure: "parts",
    photo: "cat-pieces",
    seo: {
      title: "Pièces de rechange pour engins Caterpillar, Volvo, Komatsu, Doosan",
      description:
        "Pièces de rechange neuves et d’occasion pour engins de chantier, mines et carrières. Recherche par référence et demande de prix en ligne.",
    },
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

/** Exemples d’engins cités dans le document de présentation. */
export const MACHINE_MODEL_EXAMPLES = ["D6R", "D8R", "330D", "336D", "349E"];
