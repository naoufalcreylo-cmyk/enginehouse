import Link from "next/link";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crédits photos",
  description: "Origine des photographies et des logos utilisés sur le site Engine House Import Export.",
  path: "/credits-photos",
});

export default function CreditsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Crédits photos", href: "/credits-photos" }]} label="Crédits" title="Crédits photos" />
      <section className="bg-bone">
        <div className="container-eh py-14 lg:py-20">
          <div className="max-w-3xl space-y-6 text-lg leading-relaxed text-steel-700">
            <p>
              Les photographies du site ont été fournies par Engine House Import Export. Elles sont regroupées et
              référencées dans la{" "}
              <Link href="/galerie" className="on-light font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
                galerie
              </Link>
              .
            </p>
            <p className="text-base text-steel-600">
              Les logos de marques (Caterpillar, Volvo, Komatsu, Doosan, Liebherr, Cummins) sont utilisés uniquement pour
              identifier les engins et moteurs concernés ; ils appartiennent à leurs propriétaires respectifs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
