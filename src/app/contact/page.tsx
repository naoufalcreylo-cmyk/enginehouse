import { Suspense } from "react";
import { QuoteForm, QuoteFormFromSearchParams } from "@/components/quote-form";
import { ContactDetails, PageHero, SectionLabel } from "@/components/ui";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact et demande de devis",
  description:
    "Demande de devis pour un diagnostic, un reconditionnement, une pièce de rechange, l’injection diesel ou la location de pelles hydrauliques. Réponse adaptée à votre besoin.",
  path: "/contact",
});

const hasDirectContact = site.contact.phones.length > 0 || Boolean(site.contact.email) || Boolean(site.contact.address);

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact" }]}
        label="Contact et devis"
        title="Parlons de votre engin, de votre panne ou de votre besoin"
        intro="Demande d’information, étude de besoin, demande de prix, projet de maintenance ou de reconditionnement : nos équipes vous orientent vers la solution la plus adaptée."
      />

      <section id="devis" className="scroll-mt-28 bg-paper">
        <div className="container-eh grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-8 lg:order-2">
            <div className="border-t-4 border-ink bg-bone p-5 sm:p-8 lg:p-10">
              <h2 className="text-3xl font-extrabold">Demander un devis</h2>
              <div className="mt-8">
                <Suspense fallback={<QuoteForm />}>
                  <QuoteFormFromSearchParams />
                </Suspense>
              </div>
            </div>
          </div>

          <aside className="space-y-10 lg:col-span-4 lg:order-1">
            {hasDirectContact && (
              <div>
                <SectionLabel>Nous joindre</SectionLabel>
                <div className="mt-5">
                  <ContactDetails tone="light" />
                </div>
              </div>
            )}
            <div className="bg-ink p-7 text-bone">
              <h2 className="text-xl font-extrabold">Pour une réponse rapide</h2>
              <ul className="mt-4 space-y-3 text-[0.95rem] text-steel-300">
                {[
                  "La marque et le modèle de l’engin",
                  "La référence du composant, si vous la connaissez",
                  "Une photo de la plaque signalétique ou de la pièce",
                  "Les symptômes constatés et le lieu d’intervention",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-signal" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
