import { Gallery } from "@/components/gallery";
import { CtaBand, PageHero } from "@/components/ui";
import { gallery } from "@/content/galerie";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Galerie : moteurs, injection, transmissions et réducteurs",
  description:
    "Galerie photos Engine House Import Export : moteurs diesel, pompes et injecteurs, transmissions et réducteurs. Chaque photo a sa référence pour votre demande de devis.",
  path: "/galerie",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        photo="site2"
        crumbs={[{ name: "Galerie", href: "/galerie" }]}
        label="Galerie"
        title="Galerie photos"
        intro="Moteurs, composants d’injection, transmissions et réducteurs. Chaque photo porte une référence (EH-G…) à rappeler dans votre demande de devis."
      />
      <section className="bg-bone">
        <div className="container-eh py-16 lg:py-20">
          <Gallery items={gallery} />
          <p className="mt-6 max-w-3xl text-sm text-steel-600">
            Les références EH-G identifient les photos de la galerie. La disponibilité, l’état et la compatibilité de
            chaque composant sont confirmés lors de la cotation.
          </p>
        </div>
      </section>
      <CtaBand
        title="Une pièce ressemble à ce que vous cherchez ?"
        text="Indiquez la référence de la photo, ou la référence constructeur de votre pièce : nous vous adressons une cotation."
        primary={{ href: quoteHref({ type: "piece" }), label: "Demander un devis" }}
        secondary={{ href: "/catalogue", label: "Voir le catalogue" }}
      />
    </>
  );
}
