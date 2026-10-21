import { categories } from "@/content/catalogue";
import { escapeHtml, mailConfig, sendMail, type MailAttachment } from "@/lib/mail";
import {
  ATTACHMENTS,
  EMPTY_QUOTE,
  MIN_FILL_MS,
  conditionLabel,
  requestTypeLabel,
  validateFiles,
  validateQuote,
  type QuoteFields,
} from "@/lib/quote";

/* Limitation de fréquence simple, par instance (complément au champ piège). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Vérifie la signature binaire des fichiers, sans se fier au type déclaré. */
function sniff(buf: Buffer): string | null {
  if (buf.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (buf.subarray(0, 5).toString("ascii") === "%PDF-") return "application/pdf";
  return null;
}

function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const now = Date.now();
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnu";

  if (rateLimited(ip, now)) {
    return json({ ok: false, code: "rate_limited", message: "Trop de demandes envoyées depuis cette connexion. Merci de réessayer un peu plus tard." }, 429);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > ATTACHMENTS.maxTotalBytes + 256 * 1024) {
    return json({ ok: false, code: "too_large", message: "Les pièces jointes dépassent 4 Mo au total." }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, code: "bad_request", message: "La demande reçue est illisible. Merci de réessayer." }, 400);
  }

  // Anti-robots : champ piège rempli ou envoi trop rapide après l’affichage
  const startedAt = Number(form.get("startedAt"));
  if (String(form.get("website") ?? "").trim() !== "" || !startedAt || now - startedAt < MIN_FILL_MS) {
    return json({ ok: false, code: "rejected", message: "Votre demande n’a pas pu être validée. Merci de patienter quelques secondes puis de réessayer." }, 422);
  }

  const str = (k: string) => String(form.get(k) ?? "").trim();
  const fields: QuoteFields = { ...EMPTY_QUOTE };
  for (const key of Object.keys(EMPTY_QUOTE) as (keyof QuoteFields)[]) {
    if (key === "consent") continue;
    (fields[key] as string) = str(key);
  }
  fields.consent = form.get("consent") === "on";
  if (fields.category && !categories.some((c) => c.slug === fields.category)) fields.category = "";

  const errors = validateQuote(fields);

  const files = form.getAll("attachments").filter((f): f is File => f instanceof File && f.size > 0);
  const fileError = validateFiles(files);
  if (fileError) errors.attachments = fileError;

  const attachments: MailAttachment[] = [];
  if (!fileError) {
    for (const f of files) {
      const content = Buffer.from(await f.arrayBuffer());
      const type = sniff(content);
      if (!type || !ATTACHMENTS.accept.includes(type)) {
        errors.attachments = `Le fichier « ${f.name.slice(0, 60)} » n’est pas une image ou un PDF valide.`;
        break;
      }
      attachments.push({ filename: f.name.replace(/[^\w.\- ()À-ÿ]/g, "_").slice(0, 100), content, contentType: type });
    }
  }

  if (Object.values(errors).some(Boolean)) {
    return json({ ok: false, code: "invalid", message: "Certains champs sont à corriger.", errors }, 422);
  }

  const config = mailConfig();
  if (!config) {
    console.error("[devis] Envoi impossible : RESEND_API_KEY, QUOTE_TO_EMAIL ou QUOTE_FROM_EMAIL manquant.");
    return json(
      {
        ok: false,
        code: "not_configured",
        message: "L’envoi de demandes en ligne n’est pas encore activé : votre demande n’a pas été transmise.",
      },
      503,
    );
  }

  const date = new Date(now);
  const reference = `EH-${date.toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const category = categories.find((c) => c.slug === fields.category)?.title ?? "";

  const rows: [string, string][] = [
    ["Référence de la demande", reference],
    ["Type de demande", requestTypeLabel(fields.type)],
    ["Objet", fields.subject],
    ["Nom", fields.name],
    ["Société", fields.company],
    ["E-mail", fields.email],
    ["Téléphone", fields.phone],
    ["Marque de l’engin", fields.machineBrand],
    ["Modèle", fields.machineModel],
    ["Référence composant", fields.reference],
    ["Famille", category],
    ["État souhaité", fields.condition ? conditionLabel(fields.condition) : ""],
    ["Durée de location", fields.rentalDuration],
    ["Localisation du chantier", fields.siteLocation],
    ["Date de démarrage", fields.startDate],
    ["Pièces jointes", attachments.map((a) => a.filename).join(", ")],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0b0b0b;max-width:640px">
      <div style="border-left:6px solid #fdb916;padding:4px 0 4px 14px;margin-bottom:20px">
        <strong style="font-size:18px">Nouvelle demande de devis — site Engine House</strong>
      </div>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #ddd;color:#555;width:200px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid #ddd">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px;font-size:15px">Description du besoin</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.6;margin:0">${escapeHtml(fields.message)}</p>
      <p style="margin-top:24px;font-size:12px;color:#777">Le demandeur a accepté l’utilisation de ses données pour le traitement de la demande. Répondre à ce message écrit directement au demandeur.</p>
    </div>`;
  const text = `${rows.map(([k, v]) => `${k} : ${v}`).join("\n")}\n\nDescription :\n${fields.message}`;

  try {
    await sendMail(config, {
      subject: `[Devis ${reference}] ${requestTypeLabel(fields.type)} — ${fields.company || fields.name}`,
      html,
      text,
      replyTo: fields.email,
      attachments,
    });
  } catch (error) {
    console.error("[devis] Échec de l’envoi", error);
    return json(
      { ok: false, code: "delivery_failed", message: "Votre demande n’a pas pu être transmise en raison d’un incident technique. Merci de réessayer ou de nous appeler." },
      502,
    );
  }

  return json({ ok: true, reference });
}
