import { NextResponse, type NextRequest } from "next/server";
import { categories } from "@/content/catalogue";
import { products } from "@/content/products";
import { services } from "@/content/services";

/*
 * Avec Cache Components, une page dynamique inconnue est servie en streaming
 * avec un statut 200. On renvoie ici un vrai 404 pour les identifiants inconnus,
 * en réécrivant vers une route inexistante (page not-found globale).
 */
const known = {
  service: new Set(services.map((s) => s.slug)),
  category: new Set(categories.map((c) => c.slug)),
  product: new Set(products.map((p) => p.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, a, b, extra] = request.nextUrl.pathname.split("/");
  const isKnown =
    extra === undefined &&
    (section === "nos-metiers"
      ? b === undefined && known.service.has(a)
      : a === "produit"
        ? b !== undefined && known.product.has(b)
        : b === undefined && known.category.has(a));
  if (isKnown) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_introuvable", request.url));
}

export const config = {
  matcher: ["/nos-metiers/:path+", "/catalogue/:path+"],
};
