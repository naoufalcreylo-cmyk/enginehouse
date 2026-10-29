import Image from "next/image";
import { LineIcon } from "@/components/line-icons";
import { CountUp } from "@/components/count-up";
import Link from "next/link";
import type { CSSProperties } from "react";
import { HeroCaption, HeroCarousel, type HeroSlide } from "@/components/hero-backdrop";
import { ArrowRight } from "@/components/icons";
import { Accordion } from "@/components/accordion";
import type { LineIconName } from "@/components/line-icons";
import { BrandStrip, ButtonLink, CardImage, ContactDetails, JsonLd, MediaSlot, Nameplate, SectionLabel, TextLink } from "@/components/ui";
import { site } from "@/config/site";
import { categories } from "@/content/catalogue";
import { approach, facilities, sectors } from "@/content/company";
import { faq } from "@/content/faq";
import { galleryItem } from "@/content/galerie";
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

/** Diaporama d’en-tête : photos transmises par Engine House (légende = titre et réf. de galerie). */
const heroSlides: HeroSlide[] = ["EH-G11", "EH-G10", "EH-G15", "EH-G08"]
  .map((ref) => galleryItem(ref))
  .filter((g) => g !== undefined)
  .map((g) => ({ photo: { src: g.src, alt: g.alt, width: g.width, height: g.height }, caption: `${g.title} · ${g.ref}` }));

/** Extrait de la galerie affiché sur l’accueil */
const galleryPreview = ["EH-G18", "EH-G03", "EH-G05", "EH-G12"].map((ref) => galleryItem(ref)).filter((g) => g !== undefined);

/** Icônes des quatre étapes de la démarche */
const stepIcons: LineIconName[] = ["inspection", "essais", "moteur", "tests"];

export default function HomePage() {
  const [featured, ...others] = services;
  const rental = others.pop()!;

  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section data-no-reveal className="hero-home relative overflow-hidden bg-ink text-bone">
        <HeroCarousel slides={heroSlides}>
          <div className="container-eh relative flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center pb-10 pt-[calc(4.5rem+3rem)] text-center lg:min-h-[min(48rem,calc(100svh-7.25rem))] lg:pt-[calc(5rem+4rem)]">
            <div className="hero-rise hero-label flex justify-center" style={{ "--d": "0.05s" } as CSSProperties}>
              <SectionLabel tone="dark" ghost={false}>Maintenance · Reconditionnement · Composants</SectionLabel>
            </div>
            <h1
              className="hero-rise mx-auto mt-6 max-w-5xl text-[2.4rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[5rem]"
              style={{ "--d": "0.15s" } as CSSProperties}
            >
              L’expertise qui remet vos engins <span className="text-signal">en mouvement.</span>
            </h1>
            <p
              className="hero-rise mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-steel-300"
              style={{ "--d": "0.3s" } as CSSProperties}
            >
              Diagnostic sur site, reconditionnement des organes majeurs et fourniture de composants : Engine House aide
              les entreprises du BTP, du terrassement, des mines et des carrières à réduire l’immobilisation de leurs
              machines.
            </p>
            <div className="hero-rise mt-10 flex flex-col justify-center gap-3 sm:flex-row" style={{ "--d": "0.42s" } as CSSProperties}>
              <ButtonLink href={quoteHref()}>Demander un devis</ButtonLink>
              <ButtonLink href="/nos-metiers" variant="outline-light">
                Découvrir nos métiers
              </ButtonLink>
            </div>
            {heroSlides.length > 0 ? (
              <HeroCaption className="hero-rise hero-caption-centered mt-auto w-full pt-14" />
            ) : (
              <MediaSlot slot="hero" figure="engine" tone="dark" figureNumber="FIG. 01" priority className="mt-10 min-h-[300px] w-full" />
            )}
          </div>
        </HeroCarousel>
      </section>

      {/* ------------------------------------------------ CHIFFRES (sur photo) */}
      <section className="relative bg-ink text-bone">
        {media.counters && (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Image src={media.counters.src} alt="" fill sizes="100vw" className="object-cover opacity-30" style={media.counters.position ? { objectPosition: media.counters.position } : undefined} />
            <div className="absolute inset-0 bg-ink/55" />
          </div>
        )}
        {/* Repères factuels issus du document de présentation */}
        <div className="container-eh py-16 lg:py-20">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 text-center lg:grid-cols-4">
            {[
              { value: `Depuis ${site.history.activitySince}`, label: "au cœur de la maintenance d’engins de terrassement", icon: "calendrier" as const },
              { value: `+ de ${site.history.engineExperienceYears} ans`, label: "d’expérience cumulée dans les moteurs thermiques", icon: "moteur" as const },
              { value: facilities[0].area, label: "démontage, reconditionnement et essais", icon: "surface" as const },
              { value: facilities[1].area, label: "hydraulique, transmissions et moteurs", icon: "hydraulique" as const },
            ].map((s) => (
              <div key={s.label} className="icon-card group flex flex-col items-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="flex flex-col items-center">
                  <LineIcon name={s.icon} className="size-14 text-signal" />
                  <span className="num-outline mt-5 block whitespace-nowrap font-display text-[1.6rem] font-extrabold sm:text-4xl xl:text-5xl">
                    <CountUp value={s.value} />
                  </span>
                  <span className="mt-3 block max-w-[16rem] text-sm leading-snug text-steel-300">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------- SECTEURS & MARQUES */}
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-8">
            <SectionLabel index="01">Expertise et applications</SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
              Au service des chantiers qui ne peuvent pas s’arrêter
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-steel-700">
              Nous intervenons sur l’ensemble des machines de chantier, toutes marques confondues, avec une maîtrise
              approfondie des moteurs diesel industriels, des composants hydrauliques et des organes de transmission.
            </p>
          </div>
          <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {sectors.map((s) => (
              <li key={s.code} className="icon-card group">
                <LineIcon name={s.icon} className="size-14 text-ink" />
                <span className="mt-5 block font-mono text-[11px] tracking-[0.16em] text-steel-600">{s.code}</span>
                <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
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
      <section className="bg-white">
        <div className="container-eh grid items-center gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-6">
            <MediaSlot slot="diagnostic" figure="engine" className="aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="lg:col-span-6">
            <p className="manifeste-text font-display text-[2rem] font-extrabold uppercase leading-[1.08] sm:text-5xl">
              Sur un chantier, chaque heure d’immobilisation coûte cher.
            </p>
            <span aria-hidden="true" className="mt-6 block h-1 w-16 bg-signal" />
            <p className="mt-6 text-lg text-steel-700">
              C’est de ce constat qu’est née Engine House. Notre priorité : réduire le temps d’arrêt de vos machines et
              sécuriser l’avancement de vos travaux.
            </p>
          </div>
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
                className="on-light card-eh group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 gap-y-3 bg-white p-6 transition-colors hover:bg-paper sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-8 lg:col-span-6"
              >
                <span className="pt-1.5 font-mono text-xs tracking-[0.16em] text-steel-600">{s.code}</span>
                <span className="col-span-2 row-start-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                  <span className="block break-words font-display text-xl font-extrabold leading-tight sm:text-2xl">{s.title}</span>
                  <span className="mt-2 block text-[0.98rem] text-steel-700">{s.summary}</span>
                </span>
                <span className="col-start-2 row-start-1 flex size-10 shrink-0 items-center justify-center border-2 border-ink transition-colors group-hover:border-signal group-hover:bg-signal sm:col-start-3 sm:mt-1">
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

      {/* --------------------------------------------------------- GALERIE */}
      <section className="bg-bone">
        <div className="container-eh py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Galerie</SectionLabel>
              <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Moteurs, injection, transmissions</h2>
              <p className="mt-6 text-lg text-steel-700">
                Chaque photo porte une référence à rappeler dans votre demande de devis.
              </p>
            </div>
            <TextLink href="/galerie">Voir toute la galerie</TextLink>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {galleryPreview.map((g) => (
              <li key={g.ref}>
                <Link href={`/galerie#${g.ref}`} className="card-eh group block">
                  <span className="relative block aspect-square overflow-hidden bg-graphite">
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                    <span className="absolute left-3 top-3 bg-signal px-2 py-1 text-[11px] font-bold text-ink">{g.ref}</span>
                  </span>
                  <span className="mt-3 block text-sm font-bold leading-snug">{g.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- DÉMARCHE */}
      <section className="relative bg-ink text-bone">
        {media.demarche && (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <Image src={media.demarche.src} alt="" fill sizes="100vw" className="object-cover opacity-25 grayscale" style={media.demarche.position ? { objectPosition: media.demarche.position } : undefined} />
            <div className="absolute inset-0 bg-ink/60" />
          </div>
        )}
        <div className="container-eh py-20 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionLabel index="05" tone="dark">Démarche</SectionLabel>
              <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">De la panne à la remise en service</h2>
            </div>
            <p className="text-lg text-steel-300 lg:col-span-5 lg:self-end">
              Nos méthodes de montage et de contrôle suivent les standards et tolérances des constructeurs d’origine.
            </p>
          </div>
          <ol className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {approach.steps.map((s, i) => (
              <li key={s.title} className="icon-card group">
                <div className="flex items-end justify-between">
                  <LineIcon name={stepIcons[i]} className="size-14 text-bone" />
                  <span aria-hidden="true" className="font-display text-5xl font-extrabold text-bone/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">
                  <span className="sr-only">Étape {i + 1} : </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-[0.98rem] text-steel-300">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-sm text-steel-400">{approach.note}</p>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ */}
      <section className="bg-white">
        <div className="container-eh grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <SectionLabel>Questions fréquentes</SectionLabel>
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">Vos questions</h2>
            <p className="mt-6 text-lg text-steel-700">Une autre question ? Nos équipes vous répondent.</p>
            <div className="mt-8">
              <TextLink href="/contact">Nous contacter</TextLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion items={faq} />
          </div>
        </div>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
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
