import { CtaBand, PageHero, SectionLabel } from "@/components/ui";
import { delivery } from "@/content/company";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Garanties et livraison",
  description:
    "Politique de garantie d’Engine House Import Export et organisation de la livraison des pièces et composants : conditionnement, transporteur adapté, suivi d’expédition.",
  path: "/garanties-et-livraison",
});

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        photo="livraison"
        crumbs={[{ name: "Garanties et livraison", href: "/garanties-et-livraison" }]}
        label="Engagements"
        title="Garanties et livraison"
        intro="Nous nous engageons à fournir des produits et des services de qualité, dans une logique de fiabilité et de transparence."
      />
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <article>
            <SectionLabel index="01">Garanties</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Des conditions claires, communiquées sur demande</h2>
            <div className="prose-eh mt-6 text-lg leading-relaxed text-steel-700">
              <p>Notre politique de garantie a été conçue pour offrir une véritable tranquillité d’esprit à nos clients.</p>
              <p>
                Certains moteurs reconditionnés peuvent bénéficier d’une garantie allant jusqu’à 12 mois, selon les
                conditions applicables à chaque composant.
              </p>
              <p>
                Un document détaillant les modalités de couverture et les droits de chaque partie est disponible sur simple
                demande : notre équipe vous transmet les conditions de garantie applicables à votre commande.
              </p>
            </div>
          </article>
          <article>
            <SectionLabel index="02">Livraison</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Une expédition prise en charge par notre magasin</h2>
            <p className="mt-6 text-lg text-steel-700">Après validation de votre commande, notre magasin gère l’ensemble du processus logistique :</p>
            <ol className="mt-6 divide-y divide-steel-300 border-y border-steel-300">
              {delivery.map((d, i) => (
                <li key={d} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                  <span className="font-mono text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{d}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>
      <CtaBand
        title="Recevoir nos conditions de garantie"
        text="Précisez le composant concerné : nous vous transmettons le document applicable."
        primary={{ href: quoteHref({ type: "autre", objet: "Conditions de garantie" }), label: "Faire la demande" }}
      />
    </>
  );
}
