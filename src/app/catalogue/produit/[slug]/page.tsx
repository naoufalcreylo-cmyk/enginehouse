import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { QuoteForm } from "@/components/quote-form";
import { JsonLd, MediaSlot, PageHero, SectionLabel } from "@/components/ui";
import { absoluteUrl } from "@/config/site";
import { getCategory } from "@/content/catalogue";
import { getProduct, type Product } from "@/content/products";
import { conditionLabel } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

/*
 * Fiche produit pour l’inventaire vérifié (src/content/products.ts).
 * Tant que l’inventaire est vide, toute URL renvoie une page 404.
 * Les paramètres sont lus à la requête (pas de generateStaticParams :
 * Cache Components refuse une liste vide), d’où la frontière Suspense.
 */

export async function generateMetadata({ params }: PageProps<"/catalogue/produit/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Référence introuvable", robots: { index: false } };
  return pageMetadata({
    title: `${product.title} — réf. ${product.reference}`,
    description: product.description.slice(0, 155),
    path: `/catalogue/produit/${product.slug}`,
  });
}

export default function ProductPage({ params }: PageProps<"/catalogue/produit/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-ink" aria-busy="true" />}>
      {params.then(({ slug }) => (
        <ProductDetail slug={slug} />
      ))}
    </Suspense>
  );
}

function productJsonLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    sku: p.reference,
    mpn: p.reference,
    brand: { "@type": "Brand", name: p.brand },
    description: p.description,
    image: p.images.map((i) => absoluteUrl(i.src)),
    itemCondition:
      p.condition === "neuf"
        ? "https://schema.org/NewCondition"
        : p.condition === "reconditionne"
          ? "https://schema.org/RefurbishedCondition"
          : "https://schema.org/UsedCondition",
  };
}

function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const [first, ...rest] = product.images;
  // Données structurées seulement si la fiche est suffisamment renseignée
  const richEnough = Boolean(product.reference && product.brand && first && product.description);

  return (
    <>
      {richEnough && <JsonLd data={productJsonLd(product)} />}
      <PageHero
        crumbs={[
          { name: "Catalogue", href: "/catalogue" },
          ...(category ? [{ name: category.title, href: `/catalogue/${category.slug}` }] : []),
          { name: product.reference, href: `/catalogue/produit/${product.slug}` },
        ]}
        label={`${product.brand} · Réf. ${product.reference}`}
        title={product.title}
        intro={product.description}
      />
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="space-y-4 lg:col-span-6">
            {first ? (
              <Image src={first.src} alt={first.alt} width={first.width ?? 1200} height={first.height ?? 900} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full border border-steel-200" />
            ) : (
              <MediaSlot slot="pieces" figure={category?.figure ?? "parts"} className="aspect-[4/3]" />
            )}
            {rest.length > 0 && (
              <ul className="grid grid-cols-3 gap-3">
                {rest.map((img) => (
                  <li key={img.src}>
                    <Image src={img.src} alt={img.alt} width={img.width ?? 600} height={img.height ?? 450} sizes="20vw" className="h-auto w-full border border-steel-200" />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:col-span-6">
            <dl className="divide-y divide-steel-200 border-y border-steel-200">
              {[
                ["Marque", product.brand],
                ["Référence", product.reference],
                ["Famille", category?.title ?? "—"],
                ["État", conditionLabel(product.condition)],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-steel-600">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
              {product.compatibility.length > 0 && (
                <div className="grid grid-cols-[9rem_1fr] gap-4 py-3">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-steel-600">Compatibilité confirmée</dt>
                  <dd>{product.compatibility.join(", ")}</dd>
                </div>
              )}
            </dl>
            <p className="mt-6 text-sm text-steel-600">
              Prix et disponibilité communiqués sur demande de cotation. Vérifiez la référence d’origine de votre engin
              avant commande.
            </p>
          </div>
        </div>
      </section>
      <section id="devis" className="scroll-mt-28 bg-paper">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <SectionLabel>Demande de prix</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold">Demander une cotation pour cette référence</h2>
          </div>
          <div className="lg:col-span-8">
            <QuoteForm
              initial={{
                type: "piece",
                category: product.category,
                reference: product.reference,
                subject: `${product.title} (réf. ${product.reference})`,
                condition: product.condition,
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
