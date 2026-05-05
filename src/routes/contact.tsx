import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero } from "./about";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact | Aposoftech Solutions" },
      { name: "description", content: "Get in touch with Aposoftech Solutions to discuss your next software, web or mobile project." },
    ],
  }),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Let's build something great." subtitle="Tell us about your project and we'll respond within one business day." />
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-5">
            {[
              { Icon: Phone, label: "Phone", value: "+254 115 348 341", href: "tel:+254115348341" },
              { Icon: MessageCircle, label: "WhatsApp", value: "+254 115 348 341", href: "https://wa.me/254115348341" },
              { Icon: Mail, label: "Email", value: "aposoftechsolutions@gmail.com", href: "mailto:aposoftechsolutions@gmail.com" },
              { Icon: MapPin, label: "Location", value: "Nairobi, Kenya" },
            ].map(({ Icon, label, value, href }) => (
              <a key={label} href={href} className="flex items-start gap-4 p-5 rounded-xl bg-surface border border-border hover:border-primary/60 transition">
                <div className="h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="font-medium">{value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="lg:col-span-3 p-8 rounded-2xl bg-surface border border-border space-y-5"
        >
          {sent ? (
            <div className="text-center py-12">
              <div className="h-14 w-14 mx-auto rounded-full bg-gradient-brand flex items-center justify-center mb-4">
                <Send className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message sent</h3>
              <p className="text-muted-foreground">Thanks — we'll be in touch shortly.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Your name" name="name" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <Field label="Subject" name="subject" required />
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea required rows={5} className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition" />
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition">
                Send message <Send className="h-4 w-4" />
              </button>
            </>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input name={name} type={type} required={required} className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition" />
    </div>
  );
}
