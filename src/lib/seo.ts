import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.legalName,
      title,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/** Données structurées Organization : uniquement des informations vérifiées. */
export function organizationJsonLd() {
  const a = site.contact.address;
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: site.shortName,
    ...(site.hasProductionUrl && { url: site.url, logo: absoluteUrl("/brand/engine-house-logo.png") }),
    ...(site.contact.email && { email: site.contact.email }),
    ...(site.contact.phones.length && { telephone: site.contact.phones.map((p) => p.e164) }),
    ...(a && {
      address: {
        "@type": "PostalAddress",
        streetAddress: a.street,
        postalCode: a.postalCode,
        addressLocality: a.city,
        addressCountry: a.countryCode,
      },
    }),
    ...(sameAs.length && { sameAs }),
  };
}
