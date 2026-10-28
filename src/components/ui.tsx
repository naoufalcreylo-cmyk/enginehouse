import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Figure, figureLabels, type FigureKey } from "@/components/figures";
import { ArrowRight, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { formatAddress, site } from "@/config/site";
import { media, type MediaSlotKey } from "@/content/media";
import { BrandMarquee } from "@/components/brand-marquee";

/* -------------------------------------------------------------------------- */
/* Typographie de section                                                      */
/* -------------------------------------------------------------------------- */

export function SectionLabel({
  index,
  children,
  tone = "light",
  ghost = true,
}: {
  index?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  /** Reprise décorative du libellé en grand, en contour, derrière le titre */
  ghost?: boolean;
}) {
  return (
    <div className="eh-label">
      {ghost && <span aria-hidden="true" className="eh-ghost" data-tone={tone} />}
      <p
        className={`flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] ${
          tone === "dark" ? "text-steel-300" : "text-steel-600"
        }`}
      >
        <span aria-hidden="true" className="inline-block size-2.5 bg-signal" />
        {index && <span className={tone === "dark" ? "text-signal" : "text-ink"}>{index}</span>}
        <span>{children}</span>
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Boutons                                                                     */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "dark" | "outline" | "outline-light";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  dark: "btn-dark",
  outline: "btn-outline on-light",
  "outline-light": "btn-outline-light",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`btn-eh inline-flex min-h-12 items-center justify-center gap-3 border-2 px-6 py-3 ${buttonStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow size-4" />}
    </Link>
  );
}

export function TextLink({ href, children, tone = "light" }: { href: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold underline decoration-2 underline-offset-[6px] transition-colors ${
        tone === "dark"
          ? "text-bone decoration-signal hover:text-signal"
          : "on-light text-ink decoration-signal hover:decoration-ink"
      }`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Emplacement média : photo réelle si configurée, sinon planche technique     */
/* -------------------------------------------------------------------------- */

export function MediaSlot({
  slot,
  figure,
  caption,
  tone = "light",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  figureNumber,
}: {
  slot: MediaSlotKey;
  figure: FigureKey;
  caption?: string;
  tone?: "light" | "dark";
  className?: string;
  sizes?: string;
  priority?: boolean;
  figureNumber?: string;
}) {
  const photo = media[slot];
  const label = caption ?? figureLabels[figure];

  if (photo) {
    return (
      <figure
        className={`relative overflow-hidden bg-graphite ${tone === "dark" ? "media-offset-dark" : "media-offset-light"} ${className}`}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="media-img object-cover"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-2.5 pt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
          <span>
            {figureNumber && <span className="text-signal">{figureNumber} — </span>}
            {label}
          </span>
          {photo.isIllustrative && <span className="shrink-0 text-steel-300">Photo d’illustration</span>}
        </figcaption>
      </figure>
    );
  }

  const dark = tone === "dark";
  return (
    <figure
      className={`crop-marks relative flex flex-col overflow-hidden border ${
        dark ? "tech-grid border-bone/15 bg-coal text-steel-300" : "tech-grid-light border-steel-200 bg-paper text-steel-700"
      } ${className}`}
    >
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <Figure name={figure} className="h-auto w-full max-w-[34rem]" />
      </div>
      <figcaption
        className={`flex items-center justify-between gap-4 border-t px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] ${
          dark ? "border-bone/15 text-steel-400" : "border-steel-200 text-steel-600"
        }`}
      >
        <span>
          {figureNumber && <span className={dark ? "text-signal" : "text-ink"}>{figureNumber} — </span>}
          {label}
        </span>
        <span aria-hidden="true">Schéma</span>
      </figcaption>
    </figure>
  );
}

/** Vignette de carte : photo si disponible, sinon planche technique. */
export function CardImage({
  slot,
  figure,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  tone = "light",
}: {
  slot: MediaSlotKey;
  figure: FigureKey;
  className?: string;
  sizes?: string;
  tone?: "light" | "dark";
}) {
  const photo = media[slot];
  return (
    <span className={`relative block overflow-hidden ${tone === "dark" ? "bg-coal" : "bg-paper"} ${className}`}>
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      ) : (
        <span className={`flex h-full items-center justify-center p-6 ${tone === "dark" ? "tech-grid text-steel-400" : "tech-grid-light text-steel-500"}`}>
          <Figure name={figure} className="h-full w-auto" />
        </span>
      )}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Bandeau des marques                                                         */
/* -------------------------------------------------------------------------- */

const brandLogos = [
  { name: "Caterpillar", src: "/marques/caterpillar.svg", h: "h-10" },
  { name: "Volvo", src: "/marques/volvo.svg", h: "h-11" },
  { name: "Komatsu", src: "/marques/komatsu.svg", h: "h-5" },
  { name: "Doosan", src: "/marques/doosan.svg", h: "h-5" },
  { name: "Liebherr", src: "/marques/liebherr.svg", h: "h-5" },
  { name: "Cummins", src: "/marques/cummins.svg", h: "h-10" },
];

export function BrandStrip({ title = "Intervention sur engins et moteurs de marques" }: { title?: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-600">{title}</p>
      <div className="mt-5">
        <BrandMarquee logos={brandLogos} />
      </div>
      <p className="mt-3 text-xs text-steel-600">
        Marques et logos cités à titre d’identification des engins et moteurs sur lesquels nous intervenons. Ils
        appartiennent à leurs propriétaires respectifs ; leur mention n’implique aucun partenariat ni agrément.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Plaque signalétique (inspirée des plaques constructeur)                     */
/* -------------------------------------------------------------------------- */

export function Nameplate({ title, rows, className = "" }: { title: string; rows: { label: string; value: string }[]; className?: string }) {
  return (
    <div className={`relative border border-bone/25 bg-ink/70 p-5 backdrop-blur-sm ${className}`}>
      {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span key={pos} aria-hidden="true" className={`absolute ${pos} size-1.5 rounded-full bg-steel-400`} />
      ))}
      <p className="border-b border-bone/20 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-signal">{title}</p>
      <dl className="divide-y divide-bone/10">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 py-3">
            <dt className="text-sm text-steel-300">{r.label}</dt>
            <dd className="font-display text-xl font-bold text-bone [font-stretch:115%]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Fil d'Ariane + données structurées                                          */
/* -------------------------------------------------------------------------- */

export type Crumb = { name: string; href: string };

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Breadcrumbs({ items, tone = "dark" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Accueil", href: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href === "/" ? "" : c.href}`,
    })),
  };
  return (
    <nav aria-label="Fil d’Ariane" className="font-mono text-[11px] uppercase tracking-[0.14em]">
      <JsonLd data={data} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex min-w-0 items-center gap-2 break-words">
              {last ? (
                <span aria-current="page" className={tone === "dark" ? "text-steel-300" : "text-steel-600"}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link
                    href={c.href}
                    className={tone === "dark" ? "text-steel-400 hover:text-signal" : "on-light text-steel-600 hover:text-ink"}
                  >
                    {c.name}
                  </Link>
                  <span aria-hidden="true" className="text-signal">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* En-tête de page intérieure                                                  */
/* -------------------------------------------------------------------------- */

export function PageHero({
  crumbs,
  label,
  title,
  intro,
  children,
  aside,
  photo,
}: {
  crumbs: Crumb[];
  label: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  aside?: ReactNode;
  /** Photo d’ambiance atténuée en fond de bandeau (décorative) */
  photo?: MediaSlotKey;
}) {
  const bg = photo ? media[photo] : null;
  return (
    <section className="tech-grid relative overflow-hidden bg-ink text-bone">
      {bg && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={bg.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="page-hero-photo object-cover opacity-40"
            style={bg.position ? { objectPosition: bg.position } : undefined}
          />
          <div className={`absolute inset-0 ${aside ? "bg-[linear-gradient(90deg,rgb(11_11_11/0.95)_0%,rgb(11_11_11/0.8)_50%,rgb(11_11_11/0.55)_100%)]" : "bg-ink/65"}`} />
          <div className="tech-grid absolute inset-0" />
        </div>
      )}
      {aside ? (
        <div className="container-eh grid gap-10 pb-14 pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-7">
            <Breadcrumbs items={crumbs} />
            <div className="mt-10 lg:mt-14">
              <SectionLabel tone="dark">{label}</SectionLabel>
            </div>
            <h1 className="hyphenate mt-5 break-words text-[clamp(1.8rem,8vw,2.35rem)] font-extrabold sm:text-5xl lg:text-[3.4rem]">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">{intro}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          <div className="lg:col-span-5 lg:self-end">{aside}</div>
        </div>
      ) : (
        <div className="container-eh flex flex-col items-center py-16 text-center lg:py-24">
          <div className="page-hero-centered flex justify-center">
            <SectionLabel tone="dark" ghost={false}>{label}</SectionLabel>
          </div>
          <h1 className="hyphenate mt-5 max-w-4xl break-words text-[clamp(1.8rem,8vw,2.35rem)] font-extrabold sm:text-5xl lg:text-[3.6rem]">{title}</h1>
          {intro && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
          <div className="mt-8 flex justify-center">
            <Breadcrumbs items={crumbs} />
          </div>
        </div>
      )}
      <div aria-hidden="true" className="h-1.5 w-full bg-[repeating-linear-gradient(135deg,var(--color-signal)_0_14px,var(--color-ink)_14px_28px)] opacity-90" />
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Coordonnées (affichées uniquement si configurées)                           */
/* -------------------------------------------------------------------------- */

export function ContactDetails({ tone = "dark", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const { phones, email, whatsapp, mapUrl } = site.contact;
  const address = formatAddress();
  const dark = tone === "dark";
  const linkCls = dark ? "hover:text-signal" : "on-light hover:underline decoration-signal decoration-2 underline-offset-4";
  const iconCls = `mt-1 size-4 shrink-0 ${dark ? "text-signal" : "text-ink"}`;

  return (
    <ul className={`space-y-3 ${compact ? "text-sm" : "text-base"} ${dark ? "text-steel-300" : "text-steel-700"}`}>
      {phones.map((p) => (
        <li key={p.e164} className="flex gap-3">
          <PhoneIcon className={iconCls} />
          <a href={`tel:${p.e164}`} className={`font-medium ${dark ? "text-bone" : "text-ink"} ${linkCls}`}>
            {p.label}
            <span className="sr-only"> ({p.kind === "mobile" ? "mobile" : "ligne fixe"})</span>
          </a>
        </li>
      ))}
      {email && (
        <li className="flex gap-3">
          <MailIcon className={iconCls} />
          <a href={`mailto:${email}`} className={`font-medium ${dark ? "text-bone" : "text-ink"} ${linkCls}`}>
            {email}
          </a>
        </li>
      )}
      {whatsapp && (
        <li className="flex gap-3">
          <WhatsAppIcon className={iconCls} />
          <a href={`https://wa.me/${whatsapp}`} className={`font-medium ${dark ? "text-bone" : "text-ink"} ${linkCls}`} rel="noopener">
            WhatsApp
          </a>
        </li>
      )}
      {address && (
        <li className="flex gap-3">
          <PinIcon className={iconCls} />
          <span>
            {mapUrl ? (
              <a href={mapUrl} className={linkCls} rel="noopener" target="_blank">
                {address}
                <span className="sr-only"> (ouvre la carte dans un nouvel onglet)</span>
              </a>
            ) : (
              address
            )}
          </span>
        </li>
      )}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Bandeau d'appel à l'action                                                  */
/* -------------------------------------------------------------------------- */

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="on-light bg-signal text-ink">
      <div className="container-eh grid gap-8 py-14 lg:grid-cols-12 lg:items-end lg:py-16">
        <div className="lg:col-span-7">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-lg">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <ButtonLink href={primary.href} variant="dark">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} variant="outline">
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
