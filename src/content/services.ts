import type { RequestType } from "@/lib/quote";
import type { FigureKey } from "@/components/figures";
import type { MediaSlotKey } from "@/content/media";

export type Service = {
  slug: string;
  code: string;
  title: string;
  /** Titre court pour les menus */
  navTitle: string;
  h1: string;
  summary: string;
  intro: string[];
  needs: string[];
  scope: { title: string; text: string }[];
  /** Machines ou organes concernés */
  appliesTo: { label: string; items: string[] };
  process?: { title: string; steps: { title: string; text: string }[]; note?: string };
  highlight?: { label: string; title: string; text: string };
  related: { services: string[]; categories: string[] };
  quote: { type: RequestType; label: string; objet: string };
  figure: FigureKey;
  photo: MediaSlotKey;
  seo: { title: string; description: string };
};

export const BRANDS = ["Caterpillar", "Volvo", "Komatsu", "Doosan", "Liebherr"] as const;

export const MACHINES = [
  "Pelles hydrauliques",
  "Bulldozers",
  "Niveleuses",
  "Tractopelles",
  "Chargeuses",
  "Concasseurs fixes ou mobiles",
  "Grues mobiles",
  "Foreuses",
] as const;

export const services: Service[] = [
  {
    slug: "diagnostic-et-reparation",
    code: "EH-01",
    title: "Diagnostic et réparation",
    navTitle: "Diagnostic et réparation",
    h1: "Diagnostic et réparation d’engins, directement sur vos sites",
    summary:
      "Nos techniciens se déplacent sur vos chantiers pour localiser la panne et remettre la machine en service au plus vite.",
    intro: [
      "Toute intervention réussie commence par un diagnostic complet de l’engin. C’est lui qui permet de distinguer le symptôme de la cause, et de décider de la bonne réparation.",
      "Nos techniciens se rendent directement sur les sites de nos clients pour détecter les pannes et y remédier dans les meilleurs délais. Lorsqu’une dépose d’organe s’impose, l’immobilisation est planifiée et communiquée en toute transparence, afin de limiter l’impact sur votre production.",
    ],
    needs: [
      "Un engin à l’arrêt qui bloque l’avancement du chantier",
      "Une panne à localiser avant d’engager des frais de réparation",
      "Une dépose d’organe à organiser sans désorganiser la production",
      "Un suivi technique régulier sur un site minier ou une carrière",
    ],
    scope: [
      {
        title: "Diagnostic complet sur site",
        text: "Recherche de panne sur l’engin, là où il travaille, pour établir un constat technique fiable.",
      },
      {
        title: "Réparation et remise en service",
        text: "Traitement de la panne sur place lorsque c’est possible, ou préparation d’une intervention plus lourde.",
      },
      {
        title: "Dépose d’organe planifiée",
        text: "Quand un organe doit être déposé, la durée d’immobilisation est anticipée et partagée avec vous.",
      },
      {
        title: "Contrats d’assistance et de maintenance",
        text: "Des techniciens expérimentés mis à disposition dans le cadre de contrats adaptés à votre exploitation.",
      },
    ],
    appliesTo: {
      label: "Engins concernés",
      items: [...MACHINES],
    },
    process: {
      title: "Déroulement d’une intervention",
      steps: [
        { title: "Signalement", text: "Vous décrivez l’engin, la panne constatée et le lieu d’intervention." },
        { title: "Diagnostic sur site", text: "Un technicien établit le constat et identifie l’origine de la panne." },
        { title: "Plan d’intervention", text: "Réparation sur place ou dépose planifiée, avec une immobilisation annoncée." },
        { title: "Remise en service", text: "Contrôle du bon fonctionnement de la machine avant son retour en production." },
      ],
    },
    highlight: {
      label: "Mines et carrières",
      title: "Une assistance pensée pour l’exploitation continue",
      text: "Conscients des contraintes propres aux mines et aux carrières, nous intégrons des techniciens expérimentés à des contrats d’assistance et de maintenance sur mesure, conçus pour sécuriser l’exploitation dans la durée.",
    },
    related: {
      services: ["reconditionnement-organes-majeurs", "injecteurs-et-pompes-haute-pression"],
      categories: ["moteurs-thermiques", "pieces-de-rechange"],
    },
    quote: {
      type: "diagnostic",
      label: "Signaler une panne",
      objet: "Diagnostic et réparation",
    },
    figure: "excavator",
    photo: "diagnostic",
    seo: {
      title: "Diagnostic et réparation d’engins de chantier sur site",
      description:
        "Diagnostic complet et réparation d’engins de chantier sur site : pelles, bulldozers, chargeuses, concasseurs. Contrats d’assistance pour mines et carrières.",
    },
  },
  {
    slug: "reconditionnement-organes-majeurs",
    code: "EH-02",
    title: "Reconditionnement des organes majeurs",
    navTitle: "Reconditionnement",
    h1: "Reconditionnement des organes majeurs de vos engins",
    summary:
      "Moteurs thermiques, moteurs hydrauliques, pompes, boîtes de transfert, boîtes de vitesses et réducteurs remis à niveau puis testés.",
    intro: [
      "Le reconditionnement est l’un des piliers de notre offre. Il consiste à remettre à niveau les composants majeurs d’un engin pour leur rendre un fonctionnement fiable dans la durée.",
      "Chaque opération suit les normes et procédures des constructeurs : démontage méthodique, contrôle approfondi, remplacement des éléments critiques, remontage selon les préconisations d’origine, puis essais finaux.",
    ],
    needs: [
      "Remettre à niveau un organe usé ou défaillant",
      "Disposer d’un composant contrôlé et testé avant son retour sur chantier",
      "Sécuriser la remise en route de la machine après remontage",
    ],
    scope: [
      {
        title: "Moteurs thermiques",
        text: "Remise à niveau de moteurs diesel industriels, dans le respect des tolérances constructeur.",
      },
      {
        title: "Moteurs et pompes hydrauliques",
        text: "Reconditionnement des composants hydrauliques soumis aux cycles intensifs du chantier.",
      },
      {
        title: "Boîtes de vitesses et de transfert",
        text: "Remise en état des organes de transmission, du démontage aux essais.",
      },
      {
        title: "Réducteurs",
        text: "Contrôle et remise à niveau des réducteurs, avec remplacement des éléments critiques.",
      },
    ],
    appliesTo: {
      label: "Organes reconditionnés",
      items: [
        "Moteurs thermiques",
        "Moteurs hydrauliques",
        "Pompes hydrauliques",
        "Boîtes de transfert",
        "Boîtes de vitesses",
        "Réducteurs",
      ],
    },
    process: {
      title: "Les étapes du reconditionnement",
      steps: [
        { title: "Démontage méthodique", text: "L’organe est démonté de façon ordonnée, pièce par pièce." },
        { title: "Contrôle approfondi", text: "Chaque élément est inspecté pour identifier l’usure et les défauts." },
        { title: "Remplacement des éléments critiques", text: "Les pièces hors tolérances sont remplacées." },
        { title: "Remontage", text: "L’organe est remonté selon les préconisations du constructeur." },
        { title: "Essais finaux", text: "Le composant est testé avant sa remise en service." },
      ],
      note: "Pour sécuriser le retour en service, nous proposons également une assistance au montage du composant reconditionné sur la machine, sur chantier.",
    },
    highlight: {
      label: "Garantie",
      title: "Une couverture possible sur certains moteurs reconditionnés",
      text: "Certains moteurs reconditionnés peuvent bénéficier d’une garantie allant jusqu’à 12 mois, selon les conditions applicables. Les modalités vous sont communiquées sur simple demande.",
    },
    related: {
      services: ["diagnostic-et-reparation", "pieces-de-rechange-et-composants"],
      categories: ["moteurs-thermiques", "pompes-et-moteurs-hydrauliques", "boites-de-vitesses-et-transmissions", "reducteurs"],
    },
    quote: {
      type: "reconditionnement",
      label: "Demander un reconditionnement",
      objet: "Reconditionnement d’organe",
    },
    figure: "engine",
    photo: "reconditionnement",
    seo: {
      title: "Reconditionnement de moteurs, pompes et transmissions d’engins",
      description:
        "Reconditionnement de moteurs thermiques, pompes et moteurs hydrauliques, boîtes de vitesses, boîtes de transfert et réducteurs d’engins, avec essais finaux.",
    },
  },
  {
    slug: "injecteurs-et-pompes-haute-pression",
    code: "EH-03",
    title: "Injecteurs et pompes haute pression",
    navTitle: "Injecteurs et pompes HP",
    h1: "Réparation d’injecteurs et de pompes diesel haute pression",
    summary:
      "Diagnostic, réparation et réglage des systèmes d’injection diesel sur bancs d’essai spécialisés.",
    intro: [
      "Dans un moteur diesel, l’injection est un domaine où la précision est déterminante. Un injecteur ou une pompe haute pression mal réglé dégrade les performances, la consommation et la fiabilité du moteur.",
      "Nous réparons et reconditionnons les injecteurs et les pompes diesel haute pression en nous appuyant sur des bancs d’essai diesel spécialisés. Ils permettent un diagnostic fin, des réglages justes et une optimisation du fonctionnement du moteur.",
    ],
    needs: [
      "Une perte de puissance ou un fonctionnement irrégulier du moteur",
      "Une consommation de carburant anormale",
      "Des injecteurs ou une pompe à contrôler, régler ou remettre en état",
    ],
    scope: [
      {
        title: "Réparation des injecteurs",
        text: "Contrôle, remise en état et réglage des injecteurs diesel.",
      },
      {
        title: "Pompes haute pression",
        text: "Réparation et reconditionnement des pompes diesel haute pression.",
      },
      {
        title: "Diagnostic sur banc d’essai",
        text: "Mesures précises pour identifier un défaut et valider le résultat de l’intervention.",
      },
      {
        title: "Réglage et optimisation",
        text: "Ajustement des réglages pour retrouver performances, consommation maîtrisée et fiabilité.",
      },
    ],
    appliesTo: {
      label: "Composants concernés",
      items: ["Injecteurs diesel", "Pompes haute pression", "Systèmes d’injection common rail", "Moteurs diesel industriels"],
    },
    process: {
      title: "Le passage au banc",
      steps: [
        { title: "Identification", text: "Relevé de la référence et des symptômes constatés sur le moteur." },
        { title: "Diagnostic sur banc", text: "Mesure du comportement du composant sur banc d’essai diesel." },
        { title: "Réparation", text: "Remise en état ou reconditionnement des éléments défaillants." },
        { title: "Réglage et contrôle", text: "Ajustement puis contrôle final sur banc avant restitution." },
      ],
    },
    related: {
      services: ["diagnostic-et-reparation", "reconditionnement-organes-majeurs"],
      categories: ["injecteurs-et-pompes-haute-pression", "moteurs-thermiques"],
    },
    quote: {
      type: "injection",
      label: "Faire contrôler une injection",
      objet: "Injecteurs / pompe haute pression",
    },
    figure: "injector",
    photo: "injection",
    seo: {
      title: "Réparation d’injecteurs diesel et de pompes haute pression",
      description:
        "Réparation et reconditionnement d’injecteurs diesel et de pompes haute pression sur bancs d’essai : diagnostic, réglage et optimisation des moteurs d’engins.",
    },
  },
  {
    slug: "pieces-de-rechange-et-composants",
    code: "EH-04",
    title: "Pièces de rechange et composants",
    navTitle: "Pièces et composants",
    h1: "Pièces de rechange et composants pour engins lourds",
    summary:
      "Achat et vente de composants et de pièces neufs, d’occasion ou reconditionnés pour les grandes marques d’engins.",
    intro: [
      "Au-delà de la maintenance, Engine House achète et vend des composants et des pièces de rechange, neufs ou d’occasion, pour les grandes marques d’engins : Caterpillar, Volvo, Komatsu, Doosan et bien d’autres.",
      "Nos moteurs neufs sont sélectionnés en fonction des applications et des contraintes d’usage de vos machines. Nos moteurs reconditionnés suivent un processus de révision complet, conforme à nos normes de qualité et aux préconisations des constructeurs d’origine.",
    ],
    needs: [
      "Remplacer rapidement un organe défaillant",
      "Trouver une référence précise pour un engin de chantier, de mine ou de carrière",
      "Choisir entre un composant neuf, d’occasion ou reconditionné",
    ],
    scope: [
      {
        title: "Composants neufs",
        text: "Sélectionnés selon l’application et les conditions d’utilisation de la machine.",
      },
      {
        title: "Composants d’occasion",
        text: "Une alternative pour certains besoins, à étudier selon la référence et l’usage.",
      },
      {
        title: "Composants reconditionnés",
        text: "Révisés intégralement pour une seconde vie, avec une garantie possible sur certains moteurs.",
      },
      {
        title: "Expédition suivie",
        text: "Après validation de la commande, le magasin organise le conditionnement et l’acheminement.",
      },
    ],
    appliesTo: {
      label: "Familles de composants",
      items: [
        "Moteurs thermiques",
        "Pompes et moteurs hydrauliques",
        "Boîtes de vitesses",
        "Réducteurs",
        "Composants d’injection",
        "Pièces de rechange",
      ],
    },
    highlight: {
      label: "Nos stocks",
      title: "Un stock constitué pour répondre aux besoins urgents",
      text: "Notre stock se compose principalement de moteurs thermiques Caterpillar et Cummins, de pompes hydrauliques couvrant l’ensemble de la gamme des machines et d’un stock important de pièces neuves et d’occasion. La disponibilité de chaque référence est confirmée lors de la cotation.",
    },
    related: {
      services: ["reconditionnement-organes-majeurs", "injecteurs-et-pompes-haute-pression"],
      categories: ["moteurs-thermiques", "pompes-et-moteurs-hydrauliques", "pieces-de-rechange"],
    },
    quote: {
      type: "piece",
      label: "Rechercher une pièce",
      objet: "Pièce de rechange ou composant",
    },
    figure: "parts",
    photo: "pieces",
    seo: {
      title: "Pièces de rechange et composants d’engins neufs, d’occasion ou reconditionnés",
      description:
        "Moteurs, pompes hydrauliques, boîtes de vitesses, réducteurs et pièces de rechange pour engins Caterpillar, Volvo, Komatsu, Doosan. Prix et disponibilité sur devis.",
    },
  },
  {
    slug: "location-longue-duree-pelles-hydrauliques",
    code: "EH-05",
    title: "Location longue durée de pelles hydrauliques",
    navTitle: "Location de pelles",
    h1: "Location longue durée de pelles hydrauliques de 20 à 30 tonnes",
    summary:
      "Des pelles hydrauliques « Medium Range » en location longue durée, pour renforcer votre parc sans immobiliser votre capital.",
    intro: [
      "Pour accompagner la croissance de la demande de nos clients, Engine House a développé une offre de location longue durée de pelles hydrauliques de catégorie « Medium Range ».",
      "Nous proposons des pelles hydrauliques de 20 à 30 tonnes, adaptées aux chantiers où la flexibilité opérationnelle, la continuité de service et la maîtrise des investissements sont des enjeux majeurs.",
    ],
    needs: [
      "Renforcer un parc machines pour la durée d’un chantier",
      "Assurer la continuité des travaux sans investissement immédiat",
      "Maîtriser le budget d’équipement d’un projet",
    ],
    scope: [
      {
        title: "Flexibilité opérationnelle",
        text: "Une capacité supplémentaire mobilisable pour suivre le rythme du chantier.",
      },
      {
        title: "Continuité de service",
        text: "Un engin dédié à votre activité sur la durée de la location.",
      },
      {
        title: "Maîtrise des investissements",
        text: "Une alternative à l’achat pour préserver votre trésorerie.",
      },
    ],
    appliesTo: {
      label: "Engins proposés",
      items: ["Pelles hydrauliques", "Catégorie « Medium Range »", "De 20 à 30 tonnes"],
    },
    highlight: {
      label: "Pour préparer votre demande",
      title: "Les informations utiles",
      text: "Indiquez la durée de location envisagée, la localisation du chantier, la nature des travaux et la date de démarrage souhaitée. Nous revenons vers vous avec une proposition adaptée.",
    },
    related: {
      services: ["diagnostic-et-reparation", "pieces-de-rechange-et-composants"],
      categories: [],
    },
    quote: {
      type: "location",
      label: "Demander une offre de location",
      objet: "Location de pelle hydraulique 20–30 t",
    },
    figure: "excavator",
    photo: "location",
    seo: {
      title: "Location longue durée de pelles hydrauliques 20 à 30 tonnes",
      description:
        "Location longue durée de pelles hydrauliques Medium Range de 20 à 30 tonnes pour chantiers de BTP, terrassement, mines et carrières. Offre sur demande.",
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
