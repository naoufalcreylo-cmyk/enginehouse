import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { categories } from "@/content/catalogue";
import { products } from "@/content/products";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/a-propos",
    "/nos-metiers",
    ...services.map((s) => `/nos-metiers/${s.slug}`),
    "/catalogue",
    ...categories.map((c) => `/catalogue/${c.slug}`),
    ...products.map((p) => `/catalogue/produit/${p.slug}`),
    "/galerie",
    "/nos-moyens",
    "/contact",
    "/garanties-et-livraison",
    "/politique-de-confidentialite",
    "/credits-photos",
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
