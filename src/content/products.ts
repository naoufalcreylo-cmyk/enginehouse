/**
 * Inventaire vérifié.
 *
 * Ce fichier est volontairement vide : le document de présentation décrit des
 * familles de produits et des mots-clés, pas un inventaire. N'ajoutez ici que
 * des articles réellement disponibles et validés par Engine House.
 *
 * Règles :
 * - `compatibility` ne liste que des compatibilités confirmées (jamais déduites).
 * - Aucun prix : chaque article renvoie vers une demande de cotation.
 * - Les images vont dans /public/produits/ (photos réelles de l'article).
 * - `published: false` permet de préparer une fiche sans la publier.
 *
 * Exemple de fiche (à dupliquer) :
 *
 * {
 *   slug: "moteur-caterpillar-c13-reconditionne",
 *   reference: "C13",
 *   title: "Moteur Caterpillar C13 reconditionné",
 *   brand: "Caterpillar",
 *   category: "moteurs-thermiques",
 *   condition: "reconditionne",
 *   description: "Moteur révisé intégralement en atelier, testé avant expédition.",
 *   compatibility: [],
 *   images: [{ src: "/produits/c13-01.jpg", alt: "Moteur Caterpillar C13 reconditionné, vue latérale" }],
 *   published: true,
 * },
 */

import type { Condition } from "@/lib/quote";

export type Product = {
  slug: string;
  reference: string;
  title: string;
  brand: string;
  /** Slug d’une catégorie de src/content/catalogue.ts */
  category: string;
  condition: Exclude<Condition, "indifferent">;
  description: string;
  compatibility: string[];
  images: { src: string; alt: string; width?: number; height?: number }[];
  published: boolean;
};

const inventory: Product[] = [];

export const products = inventory.filter((p) => p.published);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsInCategory(category: string) {
  return products.filter((p) => p.category === category);
}
