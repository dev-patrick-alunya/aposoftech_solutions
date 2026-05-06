import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const INTERNAL_INBOX = "aposoftechsolutions@gmail.com";

function b64url(input: string): string {
  // UTF-8 safe base64url
  const bytes = new TextEncoder().encode(input);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function buildRaw(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): string {
  const headers = [
    `To: ${opts.to}`,
    `Subject: ${opts.subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
  ];
  if (opts.replyTo) headers.push(`Reply-To: ${opts.replyTo}`);
  const msg = headers.join("\r\n") + "\r\n\r\n" + opts.html;
  return b64url(msg);
}

async function gmailSend(raw: string) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GOOGLE_MAIL_API_KEY = process.env.GOOGLE_MAIL_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!GOOGLE_MAIL_API_KEY) throw new Error("GOOGLE_MAIL_API_KEY is not configured");

  const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_MAIL_API_KEY,
    },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gmail send failed [${res.status}]: ${body}`);
  }
  return res.json();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Brand tokens (from logo)
const BRAND = {
  navy: "#0b1a2b",
  navyDeep: "#081424",
  cyan: "#22b8e6",
  cyanDark: "#1796bf",
  ink: "#0b1a2b",
  muted: "#5b6b80",
  surface: "#f4f8fb",
  border: "#e2eaf2",
  white: "#ffffff",
};
const FONT_STACK = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

function shell(inner: string, preheader: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${BRAND.surface};font-family:${FONT_STACK};color:${BRAND.ink};-webkit-font-smoothing:antialiased">
  <span style="display:none!important;opacity:0;visibility:hidden;height:0;width:0;overflow:hidden">${escapeHtml(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.surface};padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${BRAND.white};border:1px solid ${BRAND.border};border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(11,26,43,.06)">
        <tr><td style="background:linear-gradient(135deg,${BRAND.navy} 0%,${BRAND.navyDeep} 100%);padding:28px 32px;border-bottom:3px solid ${BRAND.cyan}">
          <table role="presentation" width="100%"><tr>
            <td style="font-family:${FONT_STACK};font-size:22px;font-weight:700;letter-spacing:-.01em;color:${BRAND.white}">
              Apo<span style="color:${BRAND.cyan}">softech</span>
              <span style="display:block;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#9fb4cc;margin-top:4px">Solutions</span>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:36px 32px;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:${BRAND.ink}">${inner}</td></tr>
        <tr><td style="background:${BRAND.surface};padding:20px 32px;border-top:1px solid ${BRAND.border};font-family:${FONT_STACK};font-size:12px;line-height:1.5;color:${BRAND.muted};text-align:center">
          <strong style="color:${BRAND.navy}">Aposoftech Solutions</strong> · Nairobi, Kenya<br/>
          <a href="tel:+254115348341" style="color:${BRAND.cyanDark};text-decoration:none">+254 115 348 341</a> ·
          <a href="mailto:aposoftechsolutions@gmail.com" style="color:${BRAND.cyanDark};text-decoration:none">aposoftechsolutions@gmail.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function confirmationHtml(name: string, subject: string, message: string) {
  const inner = `
    <h1 style="margin:0 0 8px;font-family:${FONT_STACK};font-size:24px;font-weight:700;letter-spacing:-.01em;color:${BRAND.navy}">
      Thanks, ${escapeHtml(name)} — we've got your message.
    </h1>
    <p style="margin:0 0 24px;color:${BRAND.muted};font-size:15px;line-height:1.6">
      A member of the Aposoftech Solutions team will respond within one business day.
    </p>
    <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-left:4px solid ${BRAND.cyan};border-radius:10px;padding:18px 20px;margin:0 0 24px">
      <div style="font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:6px">Subject</div>
      <div style="font-size:15px;font-weight:600;color:${BRAND.navy};margin-bottom:12px">${escapeHtml(subject)}</div>
      <div style="font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.muted};margin-bottom:6px">Your message</div>
      <div style="font-size:14px;line-height:1.6;color:${BRAND.ink};white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
    <p style="margin:0;color:${BRAND.muted};font-size:14px;line-height:1.6">
      Need to add something? Just reply to this email — it lands straight in our inbox.
    </p>`;
  return shell(inner, `We received your message — we'll be in touch within one business day.`);
}

function internalCopyHtml(d: { name: string; email: string; subject: string; message: string }) {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px 10px 0;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.muted};vertical-align:top;width:90px">${label}</td>
      <td style="padding:10px 0;font-size:14px;color:${BRAND.navy};font-weight:500">${value}</td>
    </tr>`;
  const inner = `
    <div style="display:inline-block;background:${BRAND.cyan};color:${BRAND.navyDeep};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:6px 12px;border-radius:999px;margin-bottom:16px">New lead</div>
    <h1 style="margin:0 0 24px;font-family:${FONT_STACK};font-size:22px;font-weight:700;letter-spacing:-.01em;color:${BRAND.navy}">
      New contact form submission
    </h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${BRAND.border};border-bottom:1px solid ${BRAND.border};margin:0 0 20px">
      ${row("Name", escapeHtml(d.name))}
      ${row("Email", `<a href="mailto:${escapeHtml(d.email)}" style="color:${BRAND.cyanDark};text-decoration:none;font-weight:600">${escapeHtml(d.email)}</a>`)}
      ${row("Subject", escapeHtml(d.subject))}
    </table>
    <div style="font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${BRAND.muted};margin:0 0 8px">Message</div>
    <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:18px 20px;font-size:14px;line-height:1.6;color:${BRAND.ink};white-space:pre-wrap">${escapeHtml(d.message)}</div>
    <p style="margin:20px 0 0;font-size:13px;color:${BRAND.muted};line-height:1.5">
      Hit reply to respond directly to <strong style="color:${BRAND.navy}">${escapeHtml(d.name)}</strong>.
    </p>`;
  return shell(inner, `New contact from ${d.name}: ${d.subject}`);
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Please check your inputs and try again." },
            { status: 400 },
          );
        }
        const { name, email, subject, message } = parsed.data;

        try {
          // 1) Confirmation to the customer
          const confirmRaw = buildRaw({
            to: email,
            subject: `We received your message — Aposoftech Solutions`,
            html: confirmationHtml(name, subject, message),
            text: "",
            replyTo: INTERNAL_INBOX,
          });

          // 2) Internal copy to Aposoftech inbox (reply-to = customer)
          const internalRaw = buildRaw({
            to: INTERNAL_INBOX,
            subject: `[Contact] ${subject} — ${name}`,
            html: internalCopyHtml({ name, email, subject, message }),
            text: "",
            replyTo: email,
          });

          await Promise.all([gmailSend(confirmRaw), gmailSend(internalRaw)]);
        } catch (err) {
          console.error("[contact] email send failed:", err);
          return Response.json(
            { ok: false, error: "We couldn't send your message right now. Please try again or email us directly." },
            { status: 500 },
          );
        }

        console.log("[contact] sent:", { name, email, subject, at: new Date().toISOString() });
        return Response.json({ ok: true });
      },
    },
  },
} as any);
