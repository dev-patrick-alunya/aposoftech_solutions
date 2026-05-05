import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, Code2, Smartphone, Palette, Search, Layout, Server, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Aposoftech Solutions | Software, Web & Mobile Development in Kenya" },
      { name: "description", content: "Custom software, web and mobile app development from Nairobi. We build digital products that move your business forward." },
    ],
  }),
});

const services = [
  { icon: Code2, title: "Software Development", desc: "Tailored software that automates workflows and scales with your business.", to: "/services/software-development" },
  { icon: Layout, title: "Web Development", desc: "Fast, secure, SEO-ready websites and web applications.", to: "/services/web-development" },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform apps for Android & iOS.", to: "/services/mobile-app-development" },
  { icon: Palette, title: "Graphic Design", desc: "Brand identity, social creatives and print collateral.", to: "/services/graphic-design" },
  { icon: Search, title: "SEO Services", desc: "Rank higher and capture intent-driven traffic.", to: "/services/seo" },
  { icon: Server, title: "Web Design", desc: "Conversion-focused, accessible, responsive interfaces.", to: "/services/web-design" },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: "url(/images/hero/hero.png)" }}
        />
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-36 md:pb-44">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface/50 backdrop-blur text-xs text-muted-foreground mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Software studio · Nairobi, Kenya
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl">
            Engineering <span className="text-gradient">digital products</span> that grow your business.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Aposoftech Solutions is a dedicated software development partner — building web, mobile and brand experiences for ambitious teams across Kenya and beyond.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-brand text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition">
              Explore services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface/60 backdrop-blur font-semibold hover:bg-surface transition">
              Start a project
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {[
              { k: "50+", v: "Projects shipped" },
              { k: "30+", v: "Happy clients" },
              { k: "6+", v: "Years experience" },
              { k: "24/7", v: "Customer support" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-3xl md:text-4xl font-bold text-gradient">{s.k}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">What we do</p>
            <h2 className="text-4xl md:text-5xl font-bold max-w-2xl">Services tuned for growing businesses</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
            View all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, to }) => (
            <Link key={title} to={to} className="group relative p-8 rounded-2xl bg-surface border border-border hover:border-primary/60 hover:shadow-glow transition-all overflow-hidden">
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative">
                <div className="h-12 w-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-5">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
          <img src="/images/services/fullstack.png" alt="Full stack development" className="relative rounded-2xl shadow-card border border-border" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Why Aposoftech</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Engineering excellence,<br />without the agency overhead.</h2>
          <p className="text-muted-foreground mb-8">We pair senior craftsmanship with a startup pace — so you ship the right thing, faster.</p>
          <ul className="space-y-4">
            {[
              "Senior engineers and designers on every project",
              "Transparent timelines and predictable pricing",
              "User-centric design backed by analytics",
              "Long-term support and continuous improvement",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-12 md:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <h2 className="relative text-3xl md:text-5xl font-bold text-primary-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's build it together.
          </h2>
          <Link to="/contact" className="relative mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-background text-foreground font-semibold hover:scale-105 transition-transform">
            Get a free quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
