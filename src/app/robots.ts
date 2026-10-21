import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/config/site";

/**
 * Tant que NEXT_PUBLIC_SITE_URL n’est pas défini (prévisualisation, recette),
 * le site demande aux moteurs de ne pas l’indexer.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.hasProductionUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
