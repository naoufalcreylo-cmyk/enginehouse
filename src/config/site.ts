/**
 * Configuration centrale de l'entreprise.
 *
 * Règle : une coordonnée n'apparaît sur le site que si elle est renseignée ici.
 * Laisser `null` tant qu'une information n'est pas confirmée par Engine House.
 * La liste des informations manquantes est tenue à jour dans README.md.
 */

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export type Phone = {
  /** Affichage, ex. « +212 600 665 669 » */
  label: string;
  /** Format E.164 pour les liens tel: */
  e164: string;
  kind: "fixe" | "mobile";
};

export const site = {
  shortName: "Engine House",
  legalName: "Engine House Import Export",
  tagline: "Maintenance, reconditionnement et composants pour engins lourds",
  locale: "fr_MA",

  /** Domaine de production : à définir via NEXT_PUBLIC_SITE_URL. */
  url: configuredUrl ?? "http://localhost:3000",
  hasProductionUrl: Boolean(configuredUrl),

  /** Repères historiques issus du document de présentation. */
  history: {
    activitySince: 2013,
    engineExperienceYears: 15,
  },

  contact: {
    /**
     * Source : fiche annuaire fournie par le client (capture d'écran).
     * À faire confirmer avant mise en ligne.
     */
    phones: [
      { label: "+212 808 667 335", e164: "+212808667335", kind: "fixe" },
      { label: "+212 600 665 669", e164: "+212600665669", kind: "mobile" },
    ] as Phone[],
    email: null as string | null,
    /** Numéro WhatsApp au format international sans « + », ex. 212600000000 */
    whatsapp: null as string | null,
    address: {
      street: "Lot 236, Zone industrielle",
      postalCode: "28800",
      city: "Mohammedia",
      country: "Maroc",
      countryCode: "MA",
    } as {
      street: string;
      postalCode: string;
      city: string;
      country: string;
      countryCode: string;
    } | null,
    /** Lien Google Maps exact de l'établissement (ne pas déduire de l'adresse). */
    mapUrl: null as string | null,
    openingHours: null as string | null,
  },

  social: {
    linkedin: null as string | null,
    facebook: null as string | null,
    instagram: null as string | null,
  },

  legal: {
    /** Registre de commerce, ICE, IF… à compléter pour les mentions légales. */
    rc: null as string | null,
    ice: null as string | null,
  },
} as const;

export function formatAddress(separator = ", ") {
  const a = site.contact.address;
  if (!a) return null;
  return [a.street, `${a.postalCode} ${a.city}`, a.country].join(separator);
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
