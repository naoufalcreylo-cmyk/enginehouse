/** Contenus institutionnels : secteurs, démarche, moyens, équipe. */

import type { LineIconName } from "@/components/line-icons";

export const sectors = [
  {
    code: "S-01",
    icon: "btp" as LineIconName,
    title: "BTP",
    text: "Des engins disponibles pour tenir les plannings et sécuriser l’avancement des travaux.",
  },
  {
    code: "S-02",
    icon: "terrassement" as LineIconName,
    title: "Terrassement",
    text: "Pelles, bulldozers, niveleuses et chargeuses, sollicités au quotidien sur les chantiers.",
  },
  {
    code: "S-03",
    icon: "mines" as LineIconName,
    title: "Mines",
    text: "Assistance et maintenance sur mesure pour des exploitations qui ne peuvent pas s’arrêter.",
  },
  {
    code: "S-04",
    icon: "carrieres" as LineIconName,
    title: "Carrières",
    text: "Concasseurs fixes ou mobiles, chargeuses et organes soumis à des cycles intensifs.",
  },
];

export const approach = {
  title: "Notre démarche d’intervention",
  steps: [
    {
      title: "Comprendre le besoin",
      text: "L’engin, son usage, la panne constatée ou la référence recherchée : nous partons de votre situation réelle.",
    },
    {
      title: "Diagnostiquer ou évaluer",
      text: "Diagnostic sur site, contrôle en atelier ou étude technique de la demande, selon le cas.",
    },
    {
      title: "Intervenir ou fournir",
      text: "Réparation, reconditionnement ou composant adapté — neuf, d’occasion ou reconditionné.",
    },
    {
      title: "Tester et accompagner",
      text: "Essais, contrôle final et, si besoin, assistance au montage pour une remise en service maîtrisée.",
    },
  ],
  note: "Ces étapes décrivent une intervention technique. Une simple commande de pièce suit un circuit plus court : cotation, validation, puis expédition.",
};

export type Facility = {
  code: string;
  area: string;
  areaValue: number;
  title: string;
  text: string;
  zones?: { title: string; text: string; icon: LineIconName }[];
};

export const facilities: Facility[] = [
  {
    code: "SITE 01",
    area: "1 000 m²",
    areaValue: 1000,
    title: "Démontage, reconditionnement et essais d’engins",
    text: "Le premier site est consacré aux travaux de démontage et de reconditionnement des engins et machines lourdes. Il permet aussi de réaliser des tests de performance en conditions quasi réelles, afin de valider le comportement des machines avant leur remise en service.",
  },
  {
    code: "SITE 02",
    area: "750 m²",
    areaValue: 750,
    title: "Composants hydrauliques, transmissions et moteurs thermiques",
    text: "Le second site est dédié à la rénovation des composants hydrauliques, des organes de transmission et des moteurs thermiques. Il est organisé en espaces spécialisés.",
    zones: [
      {
        title: "Magasin de pièces de rechange",
        icon: "magasin" as LineIconName,
        text: "Stockage organisé des pièces neuves et d’occasion, préparation et conditionnement des expéditions.",
      },
      {
        title: "Espace de lavage industriel",
        icon: "lavage" as LineIconName,
        text: "Nettoyage des organes avant démontage pour une inspection fiable des pièces.",
      },
      {
        title: "Espace banc d’essai",
        icon: "banc" as LineIconName,
        text: "Contrôles et mesures des composants avant leur restitution.",
      },
      {
        title: "Montage des moteurs thermiques",
        icon: "moteur" as LineIconName,
        text: "Remontage des moteurs selon les préconisations des constructeurs.",
      },
      {
        title: "Montage des pompes et moteurs hydrauliques",
        icon: "hydraulique" as LineIconName,
        text: "Un espace dédié au remontage des composants hydrauliques.",
      },
      {
        title: "Station de charge pour moteurs thermiques",
        icon: "charge" as LineIconName,
        text: "Essais des moteurs en charge pour valider leur comportement avant remise en service.",
      },
    ],
  },
];

export const team = {
  intro:
    "Au-delà des équipements, ce sont les femmes et les hommes d’Engine House qui font la différence. La direction technique place la formation au cœur des priorités : techniciens itinérants ou sédentaires partagent un esprit de formation continue et un sens aigu du service, envers l’entreprise comme envers le client.",
  roles: [
    { count: 2, role: "Motoristes" },
    { count: 1, role: "Hydraulicien" },
    { count: 1, role: "Technicien de chantier itinérant" },
    { count: 2, role: "Opérateurs" },
    { count: 1, role: "Responsable atelier" },
    { count: 1, role: "Responsable magasin de pièces de rechange" },
  ],
  outro: "Cette organisation permet de conjuguer expertise pointue, réactivité sur le terrain et suivi rigoureux des dossiers.",
};

export const delivery = [
  "Sélection du transporteur le plus adapté",
  "Contrôle qualité et conditionnement soigné de la pièce ou du composant",
  "Remise au transporteur dans des conditions conformes aux exigences du matériel",
  "Suivi de chaque expédition jusqu’à la livraison",
];
