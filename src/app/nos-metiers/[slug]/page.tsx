import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { ButtonLink, CtaBand, MediaSlot, PageHero, SectionLabel } from "@/components/ui";
import { getCategory } from "@/content/catalogue";
import { getService, services } from "@/content/services";
import { quoteHref } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/nos-metiers/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ ...service.seo, path: `/nos-metiers/${service.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/nos-metiers/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const quote = quoteHref({ type: service.quote.type, objet: service.quote.objet });
  const relatedServices = service.related.services.map(getService).filter((s) => s !== undefined);
  const relatedCategories = service.related.categories.map(getCategory).filter((c) => c !== undefined);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Nos métiers", href: "/nos-metiers" },
          { name: service.title, href: `/nos-metiers/${service.slug}` },
        ]}
        label={`${service.code} · ${service.title}`}
        title={service.h1}
        intro={service.summary}
        aside={<MediaSlot slot={service.photo} figure={service.figure} tone="dark" figureNumber={service.code} className="aspect-[4/3]" />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={quote}>{service.quote.label}</ButtonLink>
          <ButtonLink href="#perimetre" variant="outline-light" arrow={false}>
            Périmètre d’intervention
          </ButtonLink>
        </div>
      </PageHero>

      {/* Introduction et besoins */}
      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="prose-eh text-lg leading-relaxed text-steel-700 lg:col-span-7">
            {service.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="lg:col-span-5">
            <div className="border-t-4 border-ink bg-white p-7">
              <h2 className="text-2xl font-extrabold">Vos besoins</h2>
              <ul className="mt-5 space-y-3.5">
                {service.needs.map((n) => (
                  <li key={n} className="grid grid-cols-[1.5rem_1fr] gap-2 text-[0.98rem] text-steel-700">
                    <CheckIcon className="mt-1 size-4 text-ink" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Périmètre */}
      <section id="perimetre" className="scroll-mt-28 bg-white">
        <div className="container-eh py-16 lg:py-24">
          <SectionLabel index="01">Périmètre</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-[2.8rem]">Ce que comprend notre intervention</h2>
          <ul className={`mt-12 grid gap-px border border-steel-200 bg-steel-200 sm:grid-cols-2 ${service.scope.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {service.scope.map((s, i) => (
              <li key={s.title} className="bg-white p-7">
                <span className="font-mono text-xs tracking-[0.16em] text-steel-600">{`${service.code}.${i + 1}`}</span>
                <span aria-hidden="true" className="mt-4 block h-1 w-8 bg-signal" />
                <h3 className="mt-4 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-[0.98rem] text-steel-700">{s.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-6 border-t border-steel-200 pt-8 lg:grid-cols-12">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600 lg:col-span-3">{service.appliesTo.label}</h3>
            <ul className="flex flex-wrap gap-2 lg:col-span-9">
              {service.appliesTo.items.map((m) => (
                <li key={m} className="border border-steel-300 px-3 py-1.5 text-sm font-medium text-steel-700">
                  {m}
                </li>
              ))}
            </ul>
            {service.slug === "diagnostic-et-reparation" && (
              <>
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600 lg:col-span-3">Marques</h3>
                <p className="text-steel-700 lg:col-span-9">
                  Intervention sur engins de marques Caterpillar, Volvo, Komatsu, Doosan et Liebherr, ainsi que sur les
                  concasseurs fixes ou mobiles, les grues mobiles et les foreuses.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Processus */}
      {service.process && (
        <section className="tech-grid bg-coal text-bone">
          <div className="container-eh py-16 lg:py-24">
            <SectionLabel index="02" tone="dark">
              Méthode
            </SectionLabel>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold sm:text-[2.8rem]">{service.process.title}</h2>
            <ol className="mt-12 grid gap-px border border-bone/15 bg-bone/15 md:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
              {service.process.steps.map((s, i) => (
                <li key={s.title} className="bg-coal p-6 lg:p-7">
                  <span className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-signal">
                    <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-bone/20" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">
                    <span className="sr-only">Étape {i + 1} : </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] text-steel-300">{s.text}</p>
                </li>
              ))}
            </ol>
            {service.process.note && (
              <p className="mt-8 max-w-3xl border-l-4 border-signal pl-5 text-steel-300">{service.process.note}</p>
            )}
          </div>
        </section>
      )}

      {/* Mise en avant */}
      {service.highlight && (
        <section className="bg-paper">
          <div className="container-eh py-16 lg:py-20">
            <div className="grid gap-6 border-l-[6px] border-signal bg-white p-7 sm:p-10 lg:grid-cols-12 lg:items-start">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600 lg:col-span-3">{service.highlight.label}</p>
              <div className="lg:col-span-9">
                <h2 className="text-3xl font-extrabold">{service.highlight.title}</h2>
                <p className="mt-4 max-w-3xl text-lg text-steel-700">{service.highlight.text}</p>
                {service.highlight.label === "Garantie" && (
                  <Link href="/garanties-et-livraison" className="on-light mt-5 inline-flex items-center gap-2 font-semibold underline decoration-signal decoration-2 underline-offset-[6px]">
                    Nos conditions de garantie <ArrowRight />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Liens associés */}
      <section className="bg-white">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <h2 className="text-2xl font-extrabold">Métiers associés</h2>
            <ul className="mt-6 divide-y divide-steel-200 border-y border-steel-200">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/nos-metiers/${s.slug}`} className="on-light group flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="mr-3 font-mono text-xs tracking-[0.14em] text-steel-600">{s.code}</span>
                      <span className="font-semibold">{s.title}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {relatedCategories.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold">Dans le catalogue</h2>
              <ul className="mt-6 divide-y divide-steel-200 border-y border-steel-200">
                {relatedCategories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/catalogue/${c.slug}`} className="on-light group flex items-center justify-between gap-4 py-4">
                      <span>
                        <span className="mr-3 font-mono text-xs tracking-[0.14em] text-steel-600">{c.code}</span>
                        <span className="font-semibold">{c.title}</span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={`${service.title} : parlons de votre besoin`}
        text="Décrivez l’engin ou le composant concerné. Nous revenons vers vous avec une réponse adaptée."
        primary={{ href: quote, label: service.quote.label }}
        secondary={{ href: "/contact", label: "Nous contacter" }}
      />
    </>
  );
}
