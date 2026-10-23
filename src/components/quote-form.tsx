"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertIcon, ArrowRight, CheckIcon, CloseIcon, PaperclipIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";
import { categories } from "@/content/catalogue";
import {
  ATTACHMENTS,
  CONDITIONS,
  EMPTY_QUOTE,
  LIMITS,
  REQUEST_TYPES,
  fieldsFor,
  validateFiles,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from "@/lib/quote";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; reference: string }
  | { state: "error"; message: string; offline?: boolean };

const FIELD_ORDER: (keyof QuoteErrors)[] = [
  "type",
  "name",
  "company",
  "email",
  "phone",
  "machineBrand",
  "machineModel",
  "reference",
  "category",
  "condition",
  "rentalDuration",
  "siteLocation",
  "startDate",
  "message",
  "attachments",
  "consent",
];

const FIELD_LABELS: Record<string, string> = {
  type: "Type de demande",
  name: "Nom",
  company: "Société",
  email: "E-mail",
  phone: "Téléphone",
  machineBrand: "Marque de l’engin",
  machineModel: "Modèle",
  reference: "Référence",
  category: "Famille de composant",
  condition: "État souhaité",
  rentalDuration: "Durée de location",
  siteLocation: "Localisation du chantier",
  startDate: "Date de démarrage",
  message: "Description",
  attachments: "Pièces jointes",
  consent: "Consentement",
  subject: "Objet",
};

/** Préremplissage depuis l’URL (?type=…&categorie=…&reference=…&objet=…). */
export function QuoteFormFromSearchParams() {
  const sp = useSearchParams();
  const type = sp.get("type") ?? "";
  const categorie = sp.get("categorie") ?? "";
  const category = categories.find((c) => c.slug === categorie);
  const initial: Partial<QuoteFields> = {
    type: REQUEST_TYPES.some((t) => t.value === type) ? type : category ? "piece" : "",
    category: category?.slug ?? "",
    reference: (sp.get("reference") ?? "").slice(0, LIMITS.reference),
    subject: (sp.get("objet") ?? category?.title ?? "").slice(0, LIMITS.short),
  };
  // La clé force un nouvel état lorsque le contexte d’URL change.
  return <QuoteForm key={sp.toString()} initial={initial} />;
}

export function QuoteForm({ initial = {} }: { initial?: Partial<QuoteFields> }) {
  const formId = useId();
  const [values, setValues] = useState<QuoteFields>({ ...EMPTY_QUOTE, ...initial });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [showSummary, setShowSummary] = useState(false);
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "success" || status.state === "error") resultRef.current?.focus();
  }, [status]);

  const show = fieldsFor(values.type);
  const id = (name: string) => `${formId}-${name}`;
  const categoryTitle = categories.find((c) => c.slug === values.category)?.title;

  function update<K extends keyof QuoteFields>(key: K, value: QuoteFields[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onText(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    update(e.target.name as keyof QuoteFields, e.target.value as never);
  }

  function onBlurValidate(key: keyof QuoteFields) {
    const all = validateQuote(values);
    // On ne signale au fil de la saisie que les champs déjà renseignés
    if (values[key] && all[key]) setErrors((e) => ({ ...e, [key]: all[key] }));
  }

  function onFiles(e: ChangeEvent<HTMLInputElement>) {
    const next = [...files, ...Array.from(e.target.files ?? [])];
    e.target.value = "";
    const error = validateFiles(next);
    setErrors((er) => ({ ...er, attachments: error }));
    if (!error) setFiles(next);
  }

  function removeFile(index: number) {
    setFiles((f) => f.filter((_, i) => i !== index));
    setErrors((er) => ({ ...er, attachments: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;

    const found = { ...validateQuote(values), attachments: validateFiles(files) };
    const hasErrors = Object.values(found).some(Boolean);
    setErrors(found);
    if (hasErrors) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setShowSummary(false);
    setStatus({ state: "sending" });

    const data = new FormData(e.currentTarget);
    data.set("consent", values.consent ? "on" : "");
    data.set("startedAt", String(startedAt.current));
    data.delete("attachments");
    files.forEach((f) => data.append("attachments", f, f.name));

    try {
      const res = await fetch("/api/devis", { method: "POST", body: data });
      const body = (await res.json().catch(() => null)) as
        | { ok: true; reference: string }
        | { ok: false; message?: string; errors?: QuoteErrors; code?: string }
        | null;

      if (res.ok && body?.ok) {
        setStatus({ state: "success", reference: body.reference });
        return;
      }
      if (body && !body.ok && body.errors) {
        setErrors(body.errors);
        setShowSummary(true);
      }
      setStatus({
        state: "error",
        offline: body && !body.ok ? body.code === "not_configured" : false,
        message:
          (body && !body.ok && body.message) ||
          "Votre demande n’a pas pu être transmise. Merci de réessayer dans quelques instants.",
      });
    } catch {
      setStatus({
        state: "error",
        message: "La connexion a échoué : votre demande n’a pas été transmise. Vérifiez votre connexion puis réessayez.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border-l-[6px] border-signal bg-white p-8 sm:p-10">
        <span className="flex size-12 items-center justify-center bg-ink text-signal">
          <CheckIcon className="size-6" />
        </span>
        <h3 className="mt-6 text-3xl font-extrabold">Demande transmise</h3>
        <p className="mt-3 max-w-xl text-lg text-steel-700">
          Merci {values.name.split(" ")[0]}. Votre demande a bien été reçue par nos équipes, qui reviendront vers vous à
          l’adresse {values.email}.
        </p>
        <p className="mt-6 font-mono text-sm uppercase tracking-[0.14em] text-steel-600">
          Référence de la demande : <span className="text-ink">{status.reference}</span>
        </p>
        <Link href="/" className="on-light mt-8 inline-flex items-center gap-2 font-semibold underline decoration-signal decoration-2 underline-offset-[6px]">
          Retour à l’accueil <ArrowRight />
        </Link>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);

  return (
    <form noValidate onSubmit={onSubmit} className="on-light space-y-10" aria-describedby={id("intro")}>
      <p id={id("intro")} className="text-sm text-steel-600">
        Les champs marqués <span aria-hidden="true">*</span>
        <span className="sr-only">d’un astérisque</span> sont obligatoires. Les informations techniques sont
        facultatives : elles nous aident simplement à vous répondre plus vite.
      </p>

      {showSummary && errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="border-2 border-ink bg-white p-5">
          <p className="flex items-center gap-2 font-semibold">
            <AlertIcon /> Merci de vérifier {errorList.length > 1 ? `les ${errorList.length} champs suivants` : "le champ suivant"} :
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-[0.95rem]">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k === "type" ? "type-0" : k)}`} className="underline decoration-signal decoration-2 underline-offset-4">
                  {FIELD_LABELS[k]} — {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(values.subject || categoryTitle) && (
        <div className="flex flex-wrap items-center gap-3 border border-steel-300 bg-paper px-4 py-3 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-600">Objet</span>
          <span className="font-semibold">{values.subject || categoryTitle}</span>
          <button
            type="button"
            onClick={() => update("subject", "")}
            className="ml-auto inline-flex items-center gap-1 text-steel-600 hover:text-ink"
          >
            <CloseIcon className="size-4" /> <span>Retirer</span>
          </button>
        </div>
      )}
      <input type="hidden" name="subject" value={values.subject} />

      {/* Champ piège pour les robots : invisible et ignoré par les lecteurs d’écran */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Ne pas remplir ce champ</label>
        <input id={id("website")} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {/* 1. Type de demande */}
      <fieldset aria-describedby={errors.type ? id("type-error") : undefined}>
        <legend className="font-display text-xl font-extrabold">
          1. Votre demande <span aria-hidden="true">*</span>
        </legend>
        {errors.type && <FieldError id={id("type-error")}>{errors.type}</FieldError>}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {REQUEST_TYPES.map((t, i) => {
            const checked = values.type === t.value;
            return (
              <label
                key={t.value}
                htmlFor={id(`type-${i}`)}
                className={`flex cursor-pointer items-center gap-3 border-2 px-4 py-3 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                  checked ? "border-ink bg-ink text-bone" : "border-steel-300 bg-white hover:border-ink"
                }`}
              >
                <input
                  id={id(`type-${i}`)}
                  type="radio"
                  name="type"
                  value={t.value}
                  checked={checked}
                  onChange={() => update("type", t.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${checked ? "border-signal bg-signal" : "border-steel-400"}`}
                >
                  {checked && <span className="size-1.5 rounded-full bg-ink" />}
                </span>
                {t.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* 2. Coordonnées */}
      <fieldset>
        <legend className="font-display text-xl font-extrabold">2. Vos coordonnées</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id={id("name")} label="Nom et prénom" required error={errors.name}>
            <input {...inputProps(id("name"), "name", errors.name)} value={values.name} onChange={onText} onBlur={() => onBlurValidate("name")} autoComplete="name" maxLength={LIMITS.short} required />
          </Field>
          <Field id={id("company")} label="Société" error={errors.company}>
            <input {...inputProps(id("company"), "company", errors.company)} value={values.company} onChange={onText} autoComplete="organization" maxLength={LIMITS.short} />
          </Field>
          <Field id={id("email")} label="E-mail professionnel" required error={errors.email}>
            <input {...inputProps(id("email"), "email", errors.email)} type="email" inputMode="email" value={values.email} onChange={onText} onBlur={() => onBlurValidate("email")} autoComplete="email" maxLength={LIMITS.short} required />
          </Field>
          <Field id={id("phone")} label="Téléphone" hint="Recommandé pour une prise de contact rapide." error={errors.phone}>
            <input {...inputProps(id("phone"), "phone", errors.phone, true)} type="tel" inputMode="tel" value={values.phone} onChange={onText} onBlur={() => onBlurValidate("phone")} autoComplete="tel" maxLength={30} />
          </Field>
        </div>
      </fieldset>

      {/* 3. Informations techniques (selon le type) */}
      {values.type && (
        <fieldset>
          <legend className="font-display text-xl font-extrabold">
            3. {show.rental ? "Votre projet de location" : "Informations techniques"}{" "}
            <span className="font-sans text-sm font-normal text-steel-600">(facultatif)</span>
          </legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {show.machine && (
              <>
                <Field id={id("machineBrand")} label="Marque de l’engin" error={errors.machineBrand}>
                  <input {...inputProps(id("machineBrand"), "machineBrand", errors.machineBrand)} value={values.machineBrand} onChange={onText} placeholder="Ex. Caterpillar, Volvo, Komatsu…" maxLength={LIMITS.short} list={id("brands")} />
                  <datalist id={id("brands")}>
                    {["Caterpillar", "Volvo", "Komatsu", "Doosan", "Liebherr", "Cummins"].map((b) => (
                      <option key={b} value={b} />
                    ))}
                  </datalist>
                </Field>
                <Field id={id("machineModel")} label="Modèle de l’engin" error={errors.machineModel}>
                  <input {...inputProps(id("machineModel"), "machineModel", errors.machineModel)} value={values.machineModel} onChange={onText} placeholder="Ex. 336D, D8R…" maxLength={LIMITS.short} />
                </Field>
              </>
            )}
            {show.reference && (
              <Field id={id("reference")} label="Référence du composant ou de la pièce" hint="Si vous la connaissez : plaque, numéro de pièce…" error={errors.reference}>
                <input {...inputProps(id("reference"), "reference", errors.reference, true)} value={values.reference} onChange={onText} placeholder="Ex. C13, numéro de pièce…" maxLength={LIMITS.reference} />
              </Field>
            )}
            {show.category && (
              <Field id={id("category")} label="Famille de composant" error={errors.category}>
                <select {...inputProps(id("category"), "category", errors.category)} value={values.category} onChange={onText}>
                  <option value="">Non précisée</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            {show.condition && (
              <Field id={id("condition")} label="État souhaité" error={errors.condition}>
                <select {...inputProps(id("condition"), "condition", errors.condition)} value={values.condition} onChange={onText}>
                  <option value="">Non précisé</option>
                  {CONDITIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            {show.rental && (
              <>
                <Field id={id("rentalDuration")} label="Durée de location envisagée" error={errors.rentalDuration}>
                  <input {...inputProps(id("rentalDuration"), "rentalDuration", errors.rentalDuration)} value={values.rentalDuration} onChange={onText} placeholder="Ex. 6 mois, 12 mois…" maxLength={LIMITS.short} />
                </Field>
                <Field id={id("siteLocation")} label="Localisation du chantier" error={errors.siteLocation}>
                  <input {...inputProps(id("siteLocation"), "siteLocation", errors.siteLocation)} value={values.siteLocation} onChange={onText} placeholder="Ville, région" maxLength={LIMITS.short} />
                </Field>
                <Field id={id("startDate")} label="Date de démarrage souhaitée" error={errors.startDate}>
                  <input {...inputProps(id("startDate"), "startDate", errors.startDate)} type="date" value={values.startDate} onChange={onText} />
                </Field>
              </>
            )}
          </div>
        </fieldset>
      )}

      {/* 4. Description et pièces jointes */}
      <fieldset>
        <legend className="font-display text-xl font-extrabold">{values.type ? "4." : "3."} Votre besoin</legend>
        <div className="mt-4 space-y-5">
          <Field
            id={id("message")}
            label="Description"
            required
            hint={
              show.rental
                ? "Nature des travaux, nombre d’engins, contraintes du chantier…"
                : "Symptômes constatés, contexte d’utilisation, délai souhaité…"
            }
            error={errors.message}
          >
            <textarea {...inputProps(id("message"), "message", errors.message, true)} value={values.message} onChange={onText} onBlur={() => onBlurValidate("message")} rows={6} maxLength={LIMITS.message} required />
          </Field>

          <div>
            <p className="text-[0.95rem] font-semibold" id={id("attachments-label")}>
              Photos ou documents <span className="font-normal text-steel-600">(facultatif)</span>
            </p>
            <p id={id("attachments-hint")} className="mt-1 text-sm text-steel-600">
              Plaque signalétique, photo de la pièce, rapport… {ATTACHMENTS.label}.
            </p>
            {errors.attachments && <FieldError id={id("attachments-error")}>{errors.attachments}</FieldError>}
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 border border-steel-300 bg-white px-3 py-2 text-sm">
                    <span className="flex min-w-0 items-center gap-2">
                      <PaperclipIcon className="size-4 shrink-0" />
                      <span className="truncate">{f.name}</span>
                      <span className="shrink-0 text-steel-600">{(f.size / 1024 / 1024).toFixed(1)} Mo</span>
                    </span>
                    <button type="button" onClick={() => removeFile(i)} className="shrink-0 p-1 text-steel-600 hover:text-ink">
                      <CloseIcon className="size-4" />
                      <span className="sr-only">Retirer {f.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {files.length < ATTACHMENTS.maxFiles && (
              <label
                htmlFor={id("attachments")}
                className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-dashed border-steel-400 bg-white px-4 font-semibold transition-colors hover:border-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-ink"
              >
                <PaperclipIcon />
                Joindre un fichier
                <input
                  ref={fileInputRef}
                  id={id("attachments")}
                  type="file"
                  name="attachments"
                  accept={ATTACHMENTS.acceptAttr}
                  multiple
                  onChange={onFiles}
                  className="sr-only"
                  aria-describedby={`${id("attachments-hint")}${errors.attachments ? ` ${id("attachments-error")}` : ""}`}
                  aria-invalid={Boolean(errors.attachments)}
                />
              </label>
            )}
          </div>
        </div>
      </fieldset>

      {/* Consentement */}
      <div>
        <label htmlFor={id("consent")} className="flex cursor-pointer gap-3 text-[0.95rem] text-steel-700">
          <input
            id={id("consent")}
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? id("consent-error") : undefined}
            className="mt-1 size-5 shrink-0 accent-ink"
            required
          />
          <span>
            J’accepte que les informations saisies soient utilisées par {site.legalName} pour traiter ma demande et me
            recontacter. <span aria-hidden="true">*</span>{" "}
            <Link href="/politique-de-confidentialite" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
              Politique de confidentialité
            </Link>
          </span>
        </label>
        {errors.consent && <FieldError id={id("consent-error")}>{errors.consent}</FieldError>}
      </div>

      {status.state === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border-2 border-ink bg-white p-5">
          <p className="flex items-start gap-2 font-semibold">
            <AlertIcon className="mt-0.5 size-5 shrink-0" />
            {status.message}
          </p>
          {site.contact.phones.length > 0 && (
            <p className="mt-3 text-[0.95rem] text-steel-700">
              {status.offline ? "Pour nous joindre dès maintenant :" : "Vous pouvez aussi nous appeler :"}{" "}
              {site.contact.phones.map((p, i) => (
                <span key={p.e164}>
                  {i > 0 && " ou "}
                  <a href={`tel:${p.e164}`} className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
                    <PhoneIcon className="size-3.5" />
                    {p.label}
                  </a>
                </span>
              ))}
              .
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        aria-disabled={status.state === "sending"}
        className="btn-eh btn-dark inline-flex min-h-13 w-full items-center justify-center gap-3 border-2 px-7 py-3.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status.state === "sending" ? (
          <>
            <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer la demande
            <ArrowRight className="btn-arrow size-4" />
          </>
        )}
      </button>
      <p aria-live="polite" className="sr-only">
        {status.state === "sending" ? "Envoi de la demande en cours" : ""}
      </p>
    </form>
  );
}

function inputProps(id: string, name: string, error?: string, hasHint = false) {
  const describedBy = [hasHint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
  return {
    id,
    name,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy || undefined,
    className: `block w-full border-2 bg-white px-3.5 py-3 text-base text-ink placeholder:text-steel-500 transition-colors focus:border-ink focus:outline-none focus-visible:shadow-[0_0_0_4px_var(--color-signal)] ${
      error ? "border-ink" : "border-steel-300 hover:border-steel-500"
    }`,
  };
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.95rem] font-semibold">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-sm text-steel-600">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children}</div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm font-semibold text-[#9a1c00]">
      <AlertIcon className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}
