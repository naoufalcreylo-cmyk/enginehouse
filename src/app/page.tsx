import Image from "next/image";
import { LineIcon } from "@/components/line-icons";
import { CountUp } from "@/components/count-up";
import Link from "next/link";
import type { CSSProperties } from "react";
import { HeroCaption, HeroCarousel, type HeroSlide } from "@/components/hero-backdrop";
import { ArrowRight } from "@/components/icons";
import { BrandStrip, ButtonLink, CardImage, ContactDetails, MediaSlot, Nameplate, SectionLabel, TextLink } from "@/components/ui";
import { site } from "@/config/site";
import { categories } from "@/content/catalogue";
import { approach, facilities, sectors } from "@/content/company";
import { media } from "@/content/media";
import { MACHINES, services } from "@/content/services";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Engine House Import Export — Maintenance et composants pour engins lourds",
    description:
      "Diagnostic sur site, reconditionnement de moteurs, pompes hydrauliques et transmissions, injection diesel, pièces de rechange et location de pelles pour le BTP, les mines et les carrières.",
    path: "/",
  }),
  title: { absolute: "Engine House Import Export — Maintenance et composants pour engins lourds" },
};

/** Photos du diaporama d’en-tête (la première reprend la légende d’origine). */
const heroSlides: HeroSlide[] = [
  { photo: media.hero, caption: "Moteur diesel industriel" },
  { photo: media.reconditionnement, caption: "Culasse de moteur en révision" },
  { photo: media.diagnostic, caption: "Pelle hydraulique en carrière" },
  { photo: media.location, caption: "Pelle hydraulique sur chenilles" },
].filter((s): s is HeroSlide => s.photo !== null);

export default function HomePage() {
  const [featured, ...others] = services;
  const rental = others.pop()!;

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section data-no-reveal className="relative overflow-hidden bg-ink text-bone">
        <HeroCarousel slides={heroSlides}>
        <div className="container-eh relative grid gap-12 pb-14 pt-16 lg:min-h-[min(46rem,calc(100svh-7.25rem))] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-24">
          <div className="lg:col-span-8 xl:col-span-7">
            <div className="hero-rise" style={{ "--d": "0.05s" } as CSSProperties}>
              <SectionLabel tone="dark" ghost={false}>Maintenance · Reconditionnement · Composants</SectionLabel>
            </div>
            <h1
              className="hero-rise mt-6 text-[2.6rem] font-extrabold leading-[0.98] sm:text-6xl lg:text-[4.9rem] [font-stretch:112%]"
              style={{ "--d": "0.15s" } as CSSProperties}
            >
              L’expertise qui remet vos engins <span className="text-signal">en mouvement.</span>
            </h1>
            <p
              className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-steel-300"
              style={{ "--d": "0.3s" } as CSSProperties}
            >
              Diagnostic sur site, reconditionnement des organes majeurs et fourniture de composants : Engine House aide
              les entreprises du BTP, du terrassement, des mines et des carrières à réduire l’immobilisation de leurs
              machines.
            </p>
            <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.42s" } as CSSProperties}>
              <ButtonLink href={quoteHref()}>Demander un devis</ButtonLink>
              <ButtonLink href="/nos-metiers" variant="outline-light">
                Découvrir nos métiers
              </ButtonLink>
            </div>
          </div>
          {heroSlides.length > 0 ? (
            <HeroCaption className="hero-rise self-end lg:col-span-4 xl:col-span-5" />
          ) : (
            <div className="relative lg:col-span-4 xl:col-span-5">
              <MediaSlot slot="hero" figure="engine" tone="dark" figureNumber="FIG. 01" priority className="min-h-[300px] lg:h-full" />
            </div>
          )}
        </div>

        {/* Repères factuels issus du document de présentation */}
        <div className="relative border-t border-bone/15 bg-ink/70 backdrop-blur-[2px]">
          <dl className="container-eh grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: `Depuis ${site.history.activitySince}`, label: "au cœur de la maintenance d’engins de terrassement" },
              { value: `+ de ${site.history.engineExperienceYears} ans`, label: "d’expérience cumulée dans les moteurs thermiques" },
              { value: facilities[0].area, label: "démontage, reconditionnement et essais" },
              { value: facilities[1].area, label: "hydraulique, transmissions et moteurs" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{ "--d": `${0.5 + i * 0.08}s` } as CSSProperties}
                className={`hero-rise py-6 pr-4 sm:py-8 ${i % 2 === 1 ? "border-l border-bone/15 pl-4 sm:pl-6" : ""} ${
                  i >= 2 ? "border-t border-bone/15 lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-extrabold text-bone sm:text-3xl [font-stretch:115%]">
                    <CountUp value={s.value} delay={650 + i * 90} />
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-steel-400">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        </HeroCarousel>
      </section>

      {/* ------------------------------------------------- SECTEURS & MARQUES */}
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <SectionLabel index="01">Expertise et applications</SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
              Au service des chantiers qui ne peuvent pas s’arrêter
            </h2>
            <p className="mt-6 text-lg text-steel-700">
              Nous intervenons sur l’ensemble des machines de chantier, toutes marques confondues, avec une maîtrise
              approfondie des moteurs diesel industriels, des composants hydrauliques et des organes de transmission.
            </p>
          </div>
          <ol className="grid gap-px self-start border border-steel-200 bg-steel-200 sm:grid-cols-2 lg:col-span-7">
            {sectors.map((s) => (
              <li key={s.code} className="icon-card group bg-bone p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-steel-600">{s.code}</span>
                  <LineIcon name={s.icon} className="size-12 text-ink" />
                </div>
                <h3 className="mt-3 text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-[0.98rem] text-steel-700">{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="space-y-10 border-t border-steel-200 pt-10 lg:col-span-12">
            <BrandStrip />
            <div className="grid gap-4 lg:grid-cols-12">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600 lg:col-span-3">Types d’engins</p>
              <ul className="flex flex-wrap gap-2 lg:col-span-9">
                {MACHINES.map((m) => (
                  <li key={m} className="border border-steel-300 px-3 py-1.5 text-sm font-medium text-steel-700">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- MANIFESTE */}
      <section className="bg-signal text-ink">
        <div className="container-eh grid gap-8 py-16 lg:grid-cols-12 lg:items-center lg:py-20">
          <p className="text-[2rem] font-extrabold leading-[1.05] sm:text-5xl lg:col-span-8 font-display [font-stretch:110%]">
            Sur un chantier, chaque heure d’immobilisation coûte cher.
          </p>
          <p className="text-lg lg:col-span-4">
            C’est de ce constat qu’est née Engine House. Notre priorité : réduire le temps d’arrêt de vos machines et
            sécuriser l’avancement de vos travaux.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- MÉTIERS */}
      <section className="bg-white">
        <div className="container-eh py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <SectionLabel index="02">Nos métiers</SectionLabel>
              <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Cinq métiers, un même objectif : la disponibilité</h2>
            </div>
            <TextLink href="/nos-metiers">Voir tous nos métiers</TextLink>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-px border border-steel-200 bg-steel-200 lg:grid-cols-12 [&>*]:min-w-0">
            {/* Métier mis en avant */}
            <Link
              href={`/nos-metiers/${featured.slug}`}
              className="on-light card-eh group relative flex flex-col bg-ink p-8 text-bone lg:col-span-6 lg:row-span-3 lg:p-10"
            >
              <span className="font-mono text-xs tracking-[0.16em] text-signal">{featured.code}</span>
              <h3 className="mt-4 text-3xl font-extrabold sm:text-4xl">{featured.title}</h3>
              <p className="mt-4 max-w-md text-steel-300">{featured.summary}</p>
              <CardImage slot={featured.photo} figure={featured.figure} tone="dark" className="my-8 min-h-56 flex-1" sizes="(min-width: 1024px) 45vw, 100vw" />
              <span className="inline-flex items-center gap-2 font-semibold text-signal">
                Découvrir le diagnostic sur site
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/nos-metiers/${s.slug}`}
                className="on-light card-eh group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-4 sm:gap-5 bg-white p-6 transition-colors hover:bg-paper sm:p-8 lg:col-span-6"
              >
                <span className="pt-1.5 font-mono text-xs tracking-[0.16em] text-steel-600">{s.code}</span>
                <span>
                  <span className="block font-display text-2xl font-extrabold leading-tight">{s.title}</span>
                  <span className="mt-2 block text-[0.98rem] text-steel-700">{s.summary}</span>
                </span>
                <span className="mt-1 flex size-10 items-center justify-center border-2 border-ink transition-colors group-hover:border-signal group-hover:bg-signal">
                  <ArrowRight />
                </span>
              </Link>
            ))}

            {/* Location : offre distincte */}
            <Link
              href={`/nos-metiers/${rental.slug}`}
              className="on-light card-eh group grid items-center gap-6 bg-paper p-6 sm:p-8 lg:col-span-12 lg:grid-cols-12"
            >
              <span className="font-mono text-xs tracking-[0.16em] text-steel-600 lg:col-span-1">{rental.code}</span>
              <span className="lg:col-span-6">
                <span className="block font-display text-2xl font-extrabold leading-tight sm:text-3xl">{rental.title}</span>
                <span className="mt-2 block text-steel-700">{rental.summary}</span>
              </span>
              <span className="flex items-baseline gap-3 lg:col-span-3">
                <span className="font-display text-5xl font-extrabold [font-stretch:120%]">20–30</span>
                <span className="font-mono text-sm uppercase tracking-[0.14em] text-steel-600">tonnes</span>
              </span>
              <span className="inline-flex items-center gap-2 font-semibold underline decoration-signal decoration-2 underline-offset-[6px] lg:col-span-2 lg:justify-end">
                En savoir plus
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- CATALOGUE */}
      <section className="tech-grid-light bg-paper">
        <div className="container-eh py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel index="03">Composants et catalogue</SectionLabel>
              <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Les organes qui font tourner vos machines</h2>
              <p className="mt-6 text-lg text-steel-700">
                Moteurs, pompes et moteurs hydrauliques, transmissions, réducteurs, composants d’injection et pièces de
                rechange : neufs, d’occasion ou reconditionnés.
              </p>

              <div className="mt-10 border-l-4 border-signal bg-white p-6">
                <h3 className="text-xl font-extrabold">Achat sur cotation</h3>
                <ol className="mt-4 space-y-3 text-[0.98rem] text-steel-700">
                  {[
                    "Vous transmettez la référence, ou la marque et le modèle de l’engin.",
                    "Nous vérifions la disponibilité et vous adressons une cotation.",
                    "Après validation, la pièce est conditionnée et expédiée avec suivi.",
                  ].map((t, i) => (
                    <li key={t} className="grid grid-cols-[1.75rem_1fr] gap-2">
                      <span className="font-mono text-sm font-medium text-ink">{String(i + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/catalogue" variant="dark">
                  Accéder au catalogue
                </ButtonLink>
                <ButtonLink href={quoteHref({ type: "piece" })} variant="outline">
                  Rechercher une référence
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/catalogue/${c.slug}`}
                    className="on-light card-eh group flex h-full flex-col border border-steel-300 bg-white transition-colors hover:border-ink"
                  >
                    <span className="flex items-center justify-between border-b border-dashed border-steel-300 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel-600">
                      <span>{c.code}</span>
                      <span aria-hidden="true" className="size-2 rounded-full border border-steel-400 group-hover:border-signal group-hover:bg-signal" />
                    </span>
                    <CardImage slot={c.photo} figure={c.figure} className="aspect-[16/9]" sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw" />
                    <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                      <span className="font-display text-xl font-extrabold leading-tight">{c.title}</span>
                      <span className="mt-1.5 text-sm text-steel-700">{c.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- MOYENS */}
      <section className="tech-grid relative bg-coal text-bone">
        {/* Photo d’ambiance atténuée en fond de section (décorative) */}
        {media.site1 && (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Image src={media.site1.src} alt="" fill sizes="100vw" className="object-cover opacity-[0.12] grayscale" />
          </div>
        )}
        <div className="container-eh py-20 lg:py-28">
          <div className="max-w-3xl">
            <SectionLabel index="04" tone="dark">
              Moyens techniques
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Deux sites complémentaires, une organisation structurée</h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {facilities.map((f) => (
              <article key={f.code} className="crop-marks flex flex-col border border-bone/15 bg-ink/60 p-7 sm:p-10">
                <p className="font-mono text-xs tracking-[0.18em] text-signal">{f.code}</p>
                <p className="num-outline mt-4 font-display text-6xl font-extrabold sm:text-7xl [font-stretch:120%]">
                  <CountUp value={f.area} />
                </p>
                <h3 className="mt-4 text-2xl font-bold">{f.title}</h3>
                {f.zones ? (
                  <ul className="mt-6 grid gap-x-6 gap-y-2 text-[0.95rem] text-steel-300 sm:grid-cols-2">
                    {f.zones.map((z) => (
                      <li key={z.title} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-signal" />
                        {z.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5 text-steel-300">
                    Démontage et reconditionnement des engins et machines lourdes, et tests de performance en conditions
                    quasi réelles avant remise en service.
                  </p>
                )}
              </article>
            ))}
          </div>
          <div className="mt-10">
            <TextLink href="/nos-moyens" tone="dark">
              Découvrir nos moyens techniques
            </TextLink>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- DÉMARCHE */}
      <section className="bg-white">
        <div className="container-eh py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionLabel index="05">Démarche</SectionLabel>
              <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">De la panne à la remise en service</h2>
            </div>
            <p className="text-lg text-steel-700 lg:col-span-5 lg:col-start-8 lg:self-end">
              Nos méthodes de montage et de contrôle suivent les standards et tolérances des constructeurs d’origine.
            </p>
          </div>
          <ol className="mt-14 grid gap-px border border-steel-200 bg-steel-200 md:grid-cols-2 lg:grid-cols-4">
            {approach.steps.map((s, i) => (
              <li key={s.title} className="relative bg-white p-7">
                <span className="font-display text-6xl font-extrabold text-steel-200 [font-stretch:120%]" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden="true" className="absolute left-7 top-[5.4rem] h-1 w-10 bg-signal" />
                <h3 className="mt-6 text-xl font-extrabold">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.98rem] text-steel-700">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm text-steel-600">{approach.note}</p>
        </div>
      </section>

      {/* -------------------------------------------------------- CONTACT */}
      <section className="tech-grid bg-ink text-bone">
        <div className="container-eh grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <SectionLabel index="06" tone="dark">
              Parlons de votre besoin
            </SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Une machine à l’arrêt ? Un composant à trouver ?</h2>
            <p className="mt-6 max-w-xl text-lg text-steel-300">
              Décrivez votre situation : nos équipes vous orientent vers la solution la plus adaptée à vos enjeux
              opérationnels.
            </p>
            <ul className="mt-10 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2">
              {[
                { label: "Signaler une panne", href: quoteHref({ type: "diagnostic" }) },
                { label: "Rechercher un composant", href: quoteHref({ type: "piece" }) },
                { label: "Étudier un projet de maintenance", href: quoteHref({ type: "maintenance" }) },
                { label: "Louer une pelle hydraulique", href: quoteHref({ type: "location" }) },
              ].map((a) => (
                <li key={a.label}>
                  <Link href={a.href} className="card-eh group flex items-center justify-between gap-4 bg-ink p-5 font-semibold transition-colors duration-300 hover:bg-graphite">
                    {a.label}
                    <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <Nameplate
              title="Engine House Import Export"
              rows={[
                { label: "Demande de prix", value: "Sur devis" },
                { label: "Composants", value: "Neuf · Occasion · Reconditionné" },
                { label: "Location", value: "Pelles 20–30 t" },
              ]}
            />
            <div className="mt-8">
              <ContactDetails />
            </div>
            <ButtonLink href={quoteHref()} className="mt-8 w-full">
              Demander un devis
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
