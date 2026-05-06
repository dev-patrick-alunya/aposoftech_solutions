import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

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
        console.log("[contact] new submission:", {
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject,
          at: new Date().toISOString(),
        });
        return Response.json({ ok: true });
      },
    },
  },
} as any);
