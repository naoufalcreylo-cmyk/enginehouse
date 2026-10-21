import { CtaBand, MediaSlot, PageHero, SectionLabel, TextLink } from "@/components/ui";
import { site } from "@/config/site";
import { team } from "@/content/company";
import { BRANDS } from "@/content/services";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "À propos : expertise en maintenance d’engins depuis 2013",
  description:
    "Née dans les pièces de rechange pour engins de terrassement, Engine House Import Export accompagne le BTP, les mines et les carrières dans la fiabilité de leur parc machines.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "À propos", href: "/a-propos" }]}
        label="À propos d’Engine House"
        title="Née d’un constat simple : chaque heure d’arrêt coûte cher"
        intro="Engine House Import Export s’est construite au cœur du commerce des pièces de rechange et des composants d’occasion pour engins de terrassement."
      />

      {/* Origines */}
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <SectionLabel index="01">Nos origines</SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold">La priorité de nos clients est devenue la nôtre</h2>
            <div className="prose-eh mt-6 text-lg leading-relaxed text-steel-700">
              <p>
                Habitués à la maintenance d’engins de marques de référence — {BRANDS.join(", ").replace(/, ([^,]*)$/, " et $1")} — les
                fondateurs d’Engine House ont identifié très tôt l’attente essentielle de leurs clients : réduire au
                maximum le temps d’arrêt des machines et sécuriser l’avancement des travaux.
              </p>
              <p>
                Notre ambition dépasse la simple fourniture de pièces. Nous voulons être un partenaire de la productivité
                de nos clients, en contribuant à la longévité, à la fiabilité et à la robustesse de leurs engins.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <MediaSlot slot="about" figure="engine" figureNumber="FIG. A" className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Expérience */}
      <section className="tech-grid bg-ink text-bone">
        <div className="container-eh py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel index="02" tone="dark">
                Notre expérience
              </SectionLabel>
              <dl className="mt-8 grid gap-px border border-bone/15 bg-bone/15">
                <div className="flex flex-col gap-1 bg-ink p-6">
                  <dt className="text-sm text-steel-400">Engine House évolue au cœur de la maintenance des engins de terrassement</dt>
                  <dd className="order-first font-display text-5xl font-extrabold [font-stretch:118%]">Depuis {site.history.activitySince}</dd>
                </div>
                <div className="flex flex-col gap-1 bg-ink p-6">
                  <dt className="text-sm text-steel-400">d’expérience cumulée dans les moteurs thermiques</dt>
                  <dd className="order-first font-display text-5xl font-extrabold [font-stretch:118%]">
                    + de {site.history.engineExperienceYears} ans
                  </dd>
                </div>
              </dl>
            </div>
            <div className="prose-eh text-lg leading-relaxed text-steel-300 lg:col-span-6 lg:col-start-7">
              <h2 className="mb-6 text-4xl font-extrabold text-bone">Un savoir-faire affiné année après année</h2>
              <p>
                Depuis 2013, notre savoir-faire progresse, porté par l’engagement de nos équipes et par des investissements
                constants dans un outillage spécialisé et des équipements de pointe.
              </p>
              <p>
                Nous intervenons sur l’ensemble des machines de chantier — pelles, bulldozers, niveleuses, tractopelles,
                chargeuses et concasseurs — toutes marques confondues. Fortes de plus de 15 ans d’expérience cumulée dans
                les moteurs thermiques, nos équipes maîtrisent en profondeur les moteurs diesel industriels et leurs
                différentes configurations.
              </p>
              <p>
                Notre expertise couvre également les composants hydrauliques et les organes de transmission. Qu’il s’agisse
                de reconditionnement ou de revente, nos méthodes de montage et de contrôle suivent les standards et
                tolérances des constructeurs d’origine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement */}
      <section className="bg-white">
        <div className="container-eh py-16 lg:py-24">
          <SectionLabel index="03">Notre engagement</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold">La fiabilité de vos engins, dans les environnements les plus exigeants</h2>
          <ul className="mt-12 grid gap-px border border-steel-200 bg-steel-200 md:grid-cols-3">
            {[
              {
                t: "Des organes testés",
                d: "Chaque moteur, pompe hydraulique, boîte de vitesses et réducteur fait l’objet de tests rigoureux avant sa remise en service.",
              },
              {
                t: "Une offre adaptée",
                d: "Nous accompagnons les entreprises du terrassement, des mines et des carrières en adaptant notre offre au profil et aux exigences de chacune.",
              },
              {
                t: "Des composants pour les grandes marques",
                d: "Une gamme de composants neufs ou reconditionnés, compatibles avec les principales marques d’engins.",
              },
            ].map((c) => (
              <li key={c.t} className="bg-white p-7">
                <span aria-hidden="true" className="block h-1 w-8 bg-signal" />
                <h3 className="mt-5 text-xl font-extrabold">{c.t}</h3>
                <p className="mt-2 text-steel-700">{c.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-paper">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <SectionLabel index="04">Nos équipes</SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold">Les femmes et les hommes qui font la différence</h2>
            <p className="mt-6 text-lg leading-relaxed text-steel-700">{team.intro}</p>
          </div>
          <div className="lg:col-span-7">
            <div className="border-2 border-ink bg-white">
              <p className="flex items-center justify-between border-b-2 border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em]">
                <span>Organisation de l’équipe</span>
                <span aria-hidden="true" className="size-2.5 bg-signal" />
              </p>
              <ul className="divide-y divide-steel-200">
                {team.roles.map((r) => (
                  <li key={r.role} className="grid grid-cols-[4rem_1fr] items-center gap-4 px-5 py-4">
                    <span className="font-display text-3xl font-extrabold [font-stretch:118%]">{r.count}</span>
                    <span className="text-lg font-semibold">{r.role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-steel-700">{team.outro}</p>
            <div className="mt-8 flex flex-wrap gap-6">
              <TextLink href="/nos-moyens">Nos moyens techniques</TextLink>
              <TextLink href="/nos-metiers">Nos métiers</TextLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Travaillons ensemble sur la disponibilité de votre parc"
        text="Une panne, un composant, un projet de maintenance : présentez-nous votre besoin."
        primary={{ href: quoteHref(), label: "Demander un devis" }}
        secondary={{ href: "/contact", label: "Nous contacter" }}
      />
    </>
  );
}
