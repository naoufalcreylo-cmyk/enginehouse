import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CardImage, CtaBand, PageHero, SectionLabel } from "@/components/ui";
import { MACHINES, services } from "@/content/services";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nos métiers : maintenance, reconditionnement, injection, pièces et location",
  description:
    "Diagnostic et réparation sur site, reconditionnement des organes majeurs, injecteurs et pompes haute pression, pièces de rechange et location de pelles hydrauliques.",
  path: "/nos-metiers",
});

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Nos métiers", href: "/nos-metiers" }]}
        label="Nos métiers"
        title="Maintenir, reconditionner, fournir : tout ce qui garde vos engins en service"
        intro="Notre ambition dépasse la simple fourniture de pièces : nous voulons être le partenaire de la productivité de votre parc machines."
      />

      <section className="bg-white">
        <div className="container-eh py-16 lg:py-24">
          <ol className="divide-y divide-steel-200 border-y border-steel-200">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/nos-metiers/${s.slug}`}
                  className="on-light group grid items-center gap-6 py-8 transition-colors hover:bg-paper sm:px-4 lg:grid-cols-12 lg:py-10"
                >
                  <span className="font-mono text-sm tracking-[0.16em] text-steel-600 lg:col-span-1">{s.code}</span>
                  <span className="lg:col-span-6">
                    <span className="block text-3xl font-extrabold leading-tight sm:text-4xl font-display">{s.title}</span>
                    <span className="mt-3 block max-w-xl text-steel-700">{s.summary}</span>
                  </span>
                  <CardImage slot={s.photo} figure={s.figure} className="aspect-[16/9] lg:col-span-3" sizes="(min-width: 1024px) 22vw, 100vw" />
                  <span className="flex items-center gap-3 font-semibold lg:col-span-2 lg:justify-end">
                    Découvrir
                    <span className="flex size-11 items-center justify-center border-2 border-ink transition-colors group-hover:border-signal group-hover:bg-signal">
                      <ArrowRight />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-eh grid gap-8 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <SectionLabel>Champ d’intervention</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">L’ensemble des machines de chantier, toutes marques confondues</h2>
          </div>
          <ul className="flex flex-wrap content-start gap-2 lg:col-span-7">
            {MACHINES.map((m) => (
              <li key={m} className="border border-steel-300 bg-white px-3 py-1.5 font-medium text-steel-700">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Vous ne savez pas quel métier correspond à votre besoin ?"
        text="Décrivez simplement la situation : nous vous orientons vers la solution adaptée."
        primary={{ href: quoteHref(), label: "Demander un devis" }}
      />
    </>
  );
}
