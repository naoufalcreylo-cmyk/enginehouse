import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductExplorer } from "@/components/catalogue";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { QuoteForm } from "@/components/quote-form";
import { MediaSlot, PageHero, SectionLabel } from "@/components/ui";
import { categories, getCategory } from "@/content/catalogue";
import { productsInCategory } from "@/content/products";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/catalogue/[categorie]">) {
  const { categorie } = await params;
  const category = getCategory(categorie);
  if (!category) return {};
  return pageMetadata({ ...category.seo, path: `/catalogue/${category.slug}` });
}

export default async function CategoryPage({ params }: PageProps<"/catalogue/[categorie]">) {
  const { categorie } = await params;
  const category = getCategory(categorie);
  if (!category) notFound();

  const service = getService(category.relatedService);
  const others = categories.filter((c) => c.slug !== category.slug);
  const isInjection = category.slug === "injecteurs-et-pompes-haute-pression";

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Catalogue", href: "/catalogue" },
          { name: category.title, href: `/catalogue/${category.slug}` },
        ]}
        label={`${category.code} · Catalogue sur cotation`}
        title={category.title}
        intro={category.summary}
        aside={<MediaSlot slot="pieces" figure={category.figure} tone="dark" figureNumber={category.code} className="aspect-[4/3]" />}
      />

      <section className="bg-bone">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <div className="prose-eh text-lg leading-relaxed text-steel-700">
              {category.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {category.stockNote && (
              <p className="mt-8 border-l-4 border-signal bg-white px-5 py-4 text-[0.98rem]">
                {category.stockNote} La disponibilité de chaque référence est confirmée lors de la cotation.
              </p>
            )}
          </div>
          <aside className="space-y-8 lg:col-span-5">
            <div className="border-t-4 border-ink bg-white p-7">
              <h2 className="text-xl font-extrabold">Ce que couvre cette famille</h2>
              <ul className="mt-4 space-y-2.5">
                {category.covers.map((c) => (
                  <li key={c} className="grid grid-cols-[1.5rem_1fr] gap-2 text-steel-700">
                    <CheckIcon className="mt-1 size-4" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            {category.consultFor && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600">{category.consultFor.label}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {category.consultFor.items.map((r) => (
                    <li key={r} className="border border-steel-300 bg-white px-3 py-1.5 font-mono text-sm">
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-steel-600">
                  Repères indicatifs : la disponibilité et la compatibilité sont vérifiées pour chaque demande.
                </p>
              </div>
            )}
            {service && (
              <Link href={`/nos-metiers/${service.slug}`} className="on-light group flex items-center justify-between gap-4 border border-steel-300 bg-white p-5 hover:border-ink">
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-steel-600">Métier associé</span>
                  <span className="mt-1 block font-semibold">{service.title}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </aside>
        </div>
      </section>

      <section className="bg-white">
        <div className="container-eh py-16 lg:py-20">
          <SectionLabel index="01">Références</SectionLabel>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Rechercher dans « {category.title} »</h2>
          <div className="mt-8">
            <ProductExplorer products={productsInCategory(category.slug)} category={category.slug} />
          </div>
        </div>
      </section>

      <section id="devis" className="scroll-mt-28 bg-paper">
        <div className="container-eh grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <SectionLabel index="02">Demande de prix</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Demander une cotation — {category.title.toLowerCase()}</h2>
            <p className="mt-5 text-steel-700">
              Plus votre demande est précise (référence, marque et modèle de l’engin, photo de la plaque), plus notre
              réponse est rapide.
            </p>
          </div>
          <div className="lg:col-span-8">
            <QuoteForm
              initial={{
                type: isInjection ? "injection" : "piece",
                category: category.slug,
                subject: category.title,
              }}
            />
          </div>
        </div>
      </section>

      <nav aria-label="Autres familles du catalogue" className="bg-white">
        <div className="container-eh py-12">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600">Autres familles</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogue/${c.slug}`} className="on-light inline-flex border border-steel-300 px-4 py-2 font-medium hover:border-ink hover:bg-paper">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
