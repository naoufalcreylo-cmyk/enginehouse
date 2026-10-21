import { CtaBand, MediaSlot, PageHero, SectionLabel, TextLink } from "@/components/ui";
import { facilities } from "@/content/company";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nos moyens : 1 000 m² et 750 m² d’ateliers techniques",
  description:
    "Deux sites complémentaires : démontage, reconditionnement et essais d’engins, rénovation de composants hydrauliques, transmissions et moteurs thermiques, bancs d’essai.",
  path: "/nos-moyens",
});

const benefits = [
  {
    t: "Inspection",
    d: "Le lavage industriel et le démontage méthodique permettent d’examiner chaque pièce dans de bonnes conditions.",
  },
  {
    t: "Essais",
    d: "Banc d’essai, station de charge et tests en conditions quasi réelles valident le comportement avant remise en service.",
  },
  {
    t: "Flux maîtrisés",
    d: "Des espaces dédiés à chaque famille d’organes structurent le travail et sécurisent chaque étape du processus.",
  },
  {
    t: "Traçabilité",
    d: "Cette organisation permet une traçabilité complète des interventions réalisées.",
  },
];

export default function FacilitiesPage() {
  const [site1, site2] = facilities;
  return (
    <>
      <PageHero
        crumbs={[{ name: "Nos moyens", href: "/nos-moyens" }]}
        label="Nos moyens techniques"
        title="Des infrastructures structurées autour de deux sites complémentaires"
        intro="Pour soutenir notre niveau d’exigence, nous nous appuyons sur des ateliers organisés par métier, de la réception des organes jusqu’aux essais."
      />

      {/* Site 1 */}
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-6">
            <SectionLabel index={site1.code}>Premier site</SectionLabel>
            <p className="mt-6 font-display text-7xl font-extrabold leading-none sm:text-8xl [font-stretch:120%]">{site1.area}</p>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{site1.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-steel-700">{site1.text}</p>
          </div>
          <div className="lg:col-span-6">
            <MediaSlot slot="site1" figure="excavator" figureNumber={site1.code} caption="Démontage et essais d’engins" className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Site 2 */}
      <section className="tech-grid bg-ink text-bone">
        <div className="container-eh py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index={site2.code} tone="dark">
                Second site
              </SectionLabel>
              <p className="mt-6 font-display text-7xl font-extrabold leading-none sm:text-8xl [font-stretch:120%]">{site2.area}</p>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">{site2.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel-300">{site2.text}</p>
            </div>
            <div className="lg:col-span-5">
              <MediaSlot slot="site2" figure="bench" tone="dark" figureNumber={site2.code} caption="Banc d’essai" className="aspect-[4/3]" />
            </div>
          </div>

          <ol className="mt-14 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-3">
            {site2.zones?.map((z, i) => (
              <li key={z.title} className="bg-ink p-7">
                <span className="font-mono text-xs tracking-[0.16em] text-signal">ZONE {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-bold">{z.title}</h3>
                <p className="mt-2 text-[0.96rem] text-steel-300">{z.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="bg-white">
        <div className="container-eh py-16 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel>Ce que cela change pour vous</SectionLabel>
              <h2 className="mt-5 text-4xl font-extrabold">Une organisation au service du contrôle et de la traçabilité</h2>
            </div>
          </div>
          <ul className="mt-12 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <li key={b.t} className="bg-white p-7">
                <span aria-hidden="true" className="block h-1 w-8 bg-signal" />
                <h3 className="mt-5 text-xl font-extrabold">{b.t}</h3>
                <p className="mt-2 text-[0.98rem] text-steel-700">{b.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stocks */}
      <section className="bg-paper">
        <div className="container-eh grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionLabel>Nos stocks</SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold">Un stock pensé pour être opérationnel rapidement</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg text-steel-700">
              Notre valeur de stock reflète notre volonté d’être immédiatement opérationnels pour nos clients. Elle se
              compose principalement de :
            </p>
            <ul className="mt-6 divide-y divide-steel-300 border-y border-steel-300">
              {[
                "Moteurs thermiques Caterpillar et Cummins",
                "Pompes hydrauliques couvrant l’ensemble de la gamme des machines",
                "Un stock important de pièces de rechange neuves et d’occasion",
              ].map((s) => (
                <li key={s} className="flex gap-4 py-4 text-lg font-semibold">
                  <span aria-hidden="true" className="mt-3 h-1 w-5 shrink-0 bg-signal" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-steel-700">
              Associé à une logistique maîtrisée, ce stock nous permet de réduire les délais d’attente et de répondre
              rapidement aux besoins urgents. La disponibilité d’une référence est confirmée à chaque cotation.
            </p>
            <div className="mt-8">
              <TextLink href="/catalogue">Consulter le catalogue</TextLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Un organe à faire contrôler ou reconditionner ?"
        text="Moteur, pompe, boîte de vitesses ou réducteur : nos ateliers sont organisés pour le prendre en charge."
        primary={{ href: quoteHref({ type: "reconditionnement" }), label: "Demander un reconditionnement" }}
        secondary={{ href: "/nos-metiers/reconditionnement-organes-majeurs", label: "Notre méthode" }}
      />
    </>
  );
}
