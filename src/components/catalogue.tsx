"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { CardImage } from "@/components/ui";
import { ArrowRight, SearchIcon } from "@/components/icons";
import { categories } from "@/content/catalogue";
import type { Product } from "@/content/products";
import { conditionLabel, quoteHref } from "@/lib/quote";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[\s\-_.]/g, "");

export function ProductExplorer({ products, category }: { products: Product[]; category?: string }) {
  const uid = useId();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(category ?? "");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");

  const options = useMemo(() => {
    const uniq = (xs: string[]) => [...new Set(xs)].sort((a, b) => a.localeCompare(b, "fr"));
    return {
      categories: uniq(products.map((p) => p.category)),
      brands: uniq(products.map((p) => p.brand)),
      conditions: uniq(products.map((p) => p.condition)),
    };
  }, [products]);

  const results = useMemo(() => {
    const q = normalize(query);
    return products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!brand || p.brand === brand) &&
        (!condition || p.condition === condition) &&
        (!q || [p.reference, p.title, p.brand, ...p.compatibility].some((v) => normalize(v).includes(q))),
    );
  }, [products, query, cat, brand, condition]);

  const requestHref = quoteHref({ type: "piece", reference: query.trim() || undefined, categorie: cat || category });
  const hasInventory = products.length > 0;

  return (
    <div className="on-light">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="grid gap-3 border-2 border-ink bg-white p-4 sm:p-5 lg:grid-cols-12 lg:items-end"
      >
        <div className={hasInventory ? "lg:col-span-5" : "lg:col-span-8"}>
          <label htmlFor={`${uid}-q`} className="block text-sm font-semibold">
            {hasInventory ? "Rechercher une référence, une marque…" : "Quelle référence recherchez-vous ?"}
          </label>
          <div className="relative mt-1.5">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-steel-500" />
            <input
              id={`${uid}-q`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex. C13, numéro de pièce, pompe principale…"
              maxLength={80}
              className="block w-full border-2 border-steel-300 bg-white py-3 pl-11 pr-3 text-base placeholder:text-steel-500 hover:border-steel-500 focus:border-ink focus:outline-none"
            />
          </div>
        </div>

        {hasInventory && (
          <>
            {!category && options.categories.length > 1 && (
              <FilterSelect id={`${uid}-cat`} label="Famille" value={cat} onChange={setCat}
                options={options.categories.map((c) => ({ value: c, label: categories.find((x) => x.slug === c)?.title ?? c }))} />
            )}
            {options.brands.length > 1 && (
              <FilterSelect id={`${uid}-brand`} label="Marque" value={brand} onChange={setBrand}
                options={options.brands.map((b) => ({ value: b, label: b }))} />
            )}
            {options.conditions.length > 1 && (
              <FilterSelect id={`${uid}-cond`} label="État" value={condition} onChange={setCondition}
                options={options.conditions.map((c) => ({ value: c, label: conditionLabel(c) }))} />
            )}
          </>
        )}

        {!hasInventory && (
          <Link
            href={requestHref}
            className="group inline-flex min-h-[3.25rem] items-center justify-center gap-3 border-2 border-ink bg-ink px-5 font-semibold text-bone transition-colors hover:border-signal hover:bg-signal hover:text-ink lg:col-span-4"
          >
            {query.trim() ? "Demander cette référence" : "Demander une cotation"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </form>

      {hasInventory ? (
        <>
          <p aria-live="polite" className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-steel-600">
            {results.length} {results.length > 1 ? "références publiées" : "référence publiée"}
          </p>
          {results.length > 0 ? (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <li key={p.slug}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState query={query} href={requestHref} />
          )}
        </>
      ) : (
        <p className="mt-4 max-w-3xl text-[0.95rem] text-steel-700">
          Nos références ne sont pas encore publiées en ligne. Indiquez celle que vous recherchez, ou la marque et le
          modèle de l’engin : nous vérifions la disponibilité et vous adressons une cotation.
        </p>
      )}
    </div>
  );
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="lg:col-span-2">
      <label htmlFor={id} className="block text-sm font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 block w-full border-2 border-steel-300 bg-white px-3 py-3 text-base hover:border-steel-500 focus:border-ink focus:outline-none"
      >
        <option value="">Toutes</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function EmptyState({ query, href }: { query: string; href: string }) {
  return (
    <div className="mt-4 border-l-4 border-signal bg-white p-6">
      <p className="font-semibold">
        {query ? `Aucune référence publiée ne correspond à « ${query} ».` : "Aucune référence publiée ne correspond à ces filtres."}
      </p>
      <p className="mt-2 text-steel-700">
        Toutes nos références ne sont pas en ligne : envoyez-nous votre demande, nous vérifions la disponibilité.
      </p>
      <Link href={href} className="mt-4 inline-flex items-center gap-2 font-semibold underline decoration-signal decoration-2 underline-offset-[6px]">
        Demander une cotation <ArrowRight />
      </Link>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const cat = categories.find((c) => c.slug === product.category);
  return (
    <Link
      href={`/catalogue/produit/${product.slug}`}
      className="on-light group flex h-full flex-col border border-steel-300 bg-white transition-colors hover:border-ink"
    >
      <span className="relative block aspect-[4/3] overflow-hidden bg-paper">
        {image ? (
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          cat && <CardImage slot={cat.photo} figure={cat.figure} className="h-full" />
        )}
        <span className="absolute left-3 top-3 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
          {conditionLabel(product.condition)}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-600">
          {product.brand} · Réf. {product.reference}
        </span>
        <span className="mt-2 font-display text-lg font-extrabold leading-snug">{product.title}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold">
          Voir la fiche <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
