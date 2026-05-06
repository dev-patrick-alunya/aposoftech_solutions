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

function confirmationHtml(name: string, subject: string, message: string) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f6f8fa;padding:24px;color:#0b1a2b">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;padding:28px;border:1px solid #e5e9f0">
    <h2 style="margin:0 0 12px;color:#0b1a2b">Thanks for reaching out, ${escapeHtml(name)}!</h2>
    <p style="margin:0 0 16px;line-height:1.5">We've received your message and a member of the Aposoftech Solutions team will get back to you within one business day.</p>
    <div style="background:#f0f7fb;border-left:4px solid #22b8e6;padding:14px 16px;border-radius:6px;margin:16px 0">
      <div style="font-size:13px;color:#55606e;margin-bottom:6px"><strong>Your subject:</strong> ${escapeHtml(subject)}</div>
      <div style="font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#55606e">— Aposoftech Solutions<br/>Nairobi, Kenya · +254 115 348 341</p>
  </div></body></html>`;
}

function internalCopyHtml(d: { name: string; email: string; subject: string; message: string }) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;padding:20px;color:#0b1a2b">
  <h2 style="margin:0 0 12px">New contact form submission</h2>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="padding:6px 12px 6px 0;color:#55606e"><strong>Name</strong></td><td>${escapeHtml(d.name)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#55606e"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a></td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#55606e"><strong>Subject</strong></td><td>${escapeHtml(d.subject)}</td></tr>
  </table>
  <h3 style="margin:18px 0 6px">Message</h3>
  <div style="white-space:pre-wrap;background:#f6f8fa;border:1px solid #e5e9f0;border-radius:8px;padding:14px">${escapeHtml(d.message)}</div>
  <p style="margin-top:18px;font-size:12px;color:#55606e">Reply directly to this email to respond to ${escapeHtml(d.name)}.</p>
  </body></html>`;
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
