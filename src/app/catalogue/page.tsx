import Link from "next/link";
import { ProductExplorer } from "@/components/catalogue";
import { ArrowRight } from "@/components/icons";
import { CardImage, CtaBand, PageHero, SectionLabel } from "@/components/ui";
import { categories } from "@/content/catalogue";
import { delivery } from "@/content/company";
import { products } from "@/content/products";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Catalogue : moteurs, hydraulique, transmissions et pièces d’engins",
  description:
    "Moteurs thermiques, pompes et moteurs hydrauliques, boîtes de vitesses, réducteurs, injecteurs et pièces de rechange pour engins lourds. Prix et disponibilité sur devis.",
  path: "/catalogue",
});

export default function CataloguePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Catalogue", href: "/catalogue" }]}
        label="Catalogue sur cotation"
        title="Composants et pièces de rechange pour engins lourds"
        intro="Neufs, d’occasion ou reconditionnés : chaque demande fait l’objet d’une cotation personnalisée, avec confirmation de la disponibilité et de l’état du composant."
      />

      <section className="bg-bone">
        <div className="container-eh py-16 lg:py-20">
          <h2 className="sr-only">Rechercher une référence</h2>
          <ProductExplorer products={products} />
        </div>
      </section>

      <section className="bg-white">
        <div className="container-eh py-16 lg:py-24">
          <SectionLabel index="01">Familles de composants</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-[2.8rem]">Six familles pour couvrir l’essentiel de vos besoins</h2>
          <ul className="mt-12 grid gap-px border border-steel-200 bg-steel-200 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <li key={c.slug} className={i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                <Link href={`/catalogue/${c.slug}`} className={`on-light card-eh group flex h-full flex-col p-7 transition-colors ${i === 0 ? "bg-ink text-bone hover:bg-graphite" : "bg-white hover:bg-paper"}`}>
                  <span className={`flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] ${i === 0 ? "text-signal" : "text-steel-600"}`}>
                    {c.code}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <CardImage slot={c.photo} figure={c.figure} tone={i === 0 ? "dark" : "light"} className={`my-6 ${i === 0 ? "min-h-64 flex-1" : "aspect-[16/9]"}`} />
                  <span className="font-display text-2xl font-extrabold leading-tight">{c.title}</span>
                  <span className={`mt-2 text-[0.96rem] ${i === 0 ? "text-steel-300" : "text-steel-700"}`}>{c.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tech-grid bg-coal text-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionLabel index="02" tone="dark">
              Comment commander
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold">Pas de prix affichés : une cotation adaptée à chaque demande</h2>
            <p className="mt-5 text-lg text-steel-300">
              Le prix d’un composant dépend de sa référence, de son état et de la disponibilité. Nous vous adressons une
              cotation précise après étude de votre demande.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-3">
              {[
                { t: "Votre demande", d: "Référence, ou marque et modèle de l’engin, avec photo si possible." },
                { t: "Cotation", d: "Vérification de la disponibilité, de l’état et proposition de prix." },
                { t: "Expédition", d: "Après validation, préparation et envoi par notre magasin." },
              ].map((s, i) => (
                <li key={s.t} className="bg-coal p-6">
                  <span className="font-mono text-xs tracking-[0.16em] text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-[0.95rem] text-steel-300">{s.d}</p>
                </li>
              ))}
            </ol>
            <h3 className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-steel-400">Après validation de votre commande</h3>
            <ul className="mt-4 space-y-2.5 text-steel-300">
              {delivery.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-signal" />
                  {d}
                </li>
              ))}
            </ul>
            <Link href="/garanties-et-livraison" className="mt-6 inline-flex items-center gap-2 font-semibold text-bone underline decoration-signal decoration-2 underline-offset-[6px] hover:text-signal">
              Garanties et livraison <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Une référence à trouver rapidement ?"
        text="Envoyez-nous la référence ou une photo de la plaque signalétique : nous revenons vers vous avec une cotation."
        primary={{ href: quoteHref({ type: "piece" }), label: "Demander une cotation" }}
      />
    </>
  );
}
