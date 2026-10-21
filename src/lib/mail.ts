/**
 * Envoi des demandes de devis par e-mail via l’API Resend (https://resend.com).
 * Module serveur uniquement : les clés ne sont jamais exposées au navigateur.
 *
 * Variables d’environnement :
 *   RESEND_API_KEY     clé API Resend
 *   QUOTE_TO_EMAIL     destinataire(s) des demandes, séparés par des virgules
 *   QUOTE_FROM_EMAIL   expéditeur vérifié dans Resend, ex. « Site Engine House <devis@domaine.ma> »
 */

export type MailAttachment = { filename: string; content: Buffer; contentType: string };

export function mailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL?.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to?.length || !from) return null;
  return { apiKey, to, from };
}

export async function sendMail(
  config: NonNullable<ReturnType<typeof mailConfig>>,
  message: { subject: string; html: string; text: string; replyTo: string; attachments: MailAttachment[] },
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      reply_to: message.replyTo,
      subject: message.subject,
      html: message.html,
      text: message.text,
      attachments: message.attachments.map((a) => ({
        filename: a.filename,
        content: a.content.toString("base64"),
        content_type: a.contentType,
      })),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
