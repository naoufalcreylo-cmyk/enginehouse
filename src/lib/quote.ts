/**
 * Schéma partagé du formulaire de devis : utilisé côté navigateur
 * (validation immédiate) et côté serveur (validation faisant foi).
 */

export const REQUEST_TYPES = [
  { value: "diagnostic", label: "Diagnostic ou réparation d’engin" },
  { value: "reconditionnement", label: "Reconditionnement d’un organe" },
  { value: "injection", label: "Injecteurs ou pompe haute pression" },
  { value: "piece", label: "Pièce de rechange ou composant" },
  { value: "location", label: "Location longue durée de pelle hydraulique" },
  { value: "maintenance", label: "Contrat d’assistance et de maintenance" },
  { value: "autre", label: "Autre demande" },
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number]["value"];

export const CONDITIONS = [
  { value: "indifferent", label: "Indifférent / à conseiller" },
  { value: "neuf", label: "Neuf" },
  { value: "occasion", label: "Occasion" },
  { value: "reconditionne", label: "Reconditionné" },
] as const;

export type Condition = (typeof CONDITIONS)[number]["value"];

export const ATTACHMENTS = {
  maxFiles: 3,
  /** Total volontairement inférieur à 4,5 Mo (limite de corps de requête des hébergeurs serverless). */
  maxTotalBytes: 4 * 1024 * 1024,
  accept: ["image/jpeg", "image/png", "image/webp", "application/pdf"] as readonly string[],
  acceptAttr: ".jpg,.jpeg,.png,.webp,.pdf",
  label: "JPG, PNG, WEBP ou PDF — 3 fichiers, 4 Mo au total",
};

export const LIMITS = {
  short: 120,
  reference: 80,
  message: 4000,
  messageMin: 15,
};

/** Délai minimal entre l'affichage du formulaire et l'envoi (anti-robots). */
export const MIN_FILL_MS = 3000;

export type QuoteFields = {
  type: string;
  /** Contexte transmis par le bouton d’origine (service, catégorie…) */
  subject: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  machineBrand: string;
  machineModel: string;
  reference: string;
  category: string;
  condition: string;
  rentalDuration: string;
  siteLocation: string;
  startDate: string;
  message: string;
  consent: boolean;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields | "attachments", string>>;

export const EMPTY_QUOTE: QuoteFields = {
  type: "",
  subject: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  machineBrand: "",
  machineModel: "",
  reference: "",
  category: "",
  condition: "",
  rentalDuration: "",
  siteLocation: "",
  startDate: "",
  message: "",
  consent: false,
};

/** Champs techniques affichés selon le type de demande. */
export function fieldsFor(type: string) {
  const isRental = type === "location";
  return {
    machine: !isRental && type !== "",
    reference: ["piece", "reconditionnement", "injection"].includes(type),
    condition: type === "piece",
    category: type === "piece",
    rental: isRental,
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d][\d\s().-]{5,24}$/;

export function validateQuote(f: QuoteFields): QuoteErrors {
  const e: QuoteErrors = {};
  if (!REQUEST_TYPES.some((t) => t.value === f.type)) e.type = "Choisissez le type de demande.";
  if (f.name.trim().length < 2) e.name = "Indiquez votre nom.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Indiquez une adresse e-mail valide.";
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim()))
    e.phone = "Ce numéro ne semble pas valide (chiffres, espaces et « + » uniquement).";
  if (f.message.trim().length < LIMITS.messageMin)
    e.message = "Décrivez votre besoin en quelques mots (15 caractères minimum).";
  if (f.message.length > LIMITS.message) e.message = "Votre message dépasse 4 000 caractères.";
  if (f.condition && !CONDITIONS.some((c) => c.value === f.condition)) e.condition = "État non reconnu.";
  if (f.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(f.startDate)) e.startDate = "Date non valide.";
  if (!f.consent) e.consent = "Votre accord est nécessaire pour que nous puissions traiter la demande.";

  for (const key of ["subject", "name", "company", "machineBrand", "machineModel", "rentalDuration", "siteLocation"] as const) {
    if (f[key].length > LIMITS.short) e[key] = "Ce champ est trop long.";
  }
  if (f.reference.length > LIMITS.reference) e.reference = "Cette référence est trop longue.";
  return e;
}

export function validateFiles(files: { size: number; type: string }[]): string | undefined {
  if (files.length > ATTACHMENTS.maxFiles) return `${ATTACHMENTS.maxFiles} fichiers maximum.`;
  if (files.some((f) => !ATTACHMENTS.accept.includes(f.type)))
    return "Formats acceptés : JPG, PNG, WEBP ou PDF.";
  const total = files.reduce((s, f) => s + f.size, 0);
  if (total > ATTACHMENTS.maxTotalBytes) return "Les fichiers dépassent 4 Mo au total.";
  return undefined;
}

export function requestTypeLabel(value: string) {
  return REQUEST_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function conditionLabel(value: string) {
  return CONDITIONS.find((c) => c.value === value)?.label ?? value;
}

/** Construit un lien vers le formulaire de devis avec le contexte prérempli. */
export function quoteHref(ctx: {
  type?: RequestType;
  categorie?: string;
  reference?: string;
  objet?: string;
} = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(ctx)) if (v) params.set(k, v);
  const qs = params.toString();
  return `/contact${qs ? `?${qs}` : ""}#devis`;
}
