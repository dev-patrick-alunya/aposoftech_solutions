import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Target, Eye, Heart, Award, Users, Clock, Headphones, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us | Aposoftech Solutions" },
      { name: "description", content: "Learn about Aposoftech Solutions — a Nairobi-based software development team building digital products for clients across Kenya and the world." },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="About us" title="A small team. Big ideas. Better software." subtitle="We help founders, brands and institutions design and build the digital products their customers love." />

      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
          <img src="/images/services/custom-web.png" alt="Aposoftech team at work" className="relative rounded-2xl border border-border shadow-card" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Who we are</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">A dedicated software development partner.</h2>
          <p className="text-muted-foreground">
            Aposoftech Solutions is a software studio headquartered in Nairobi, Kenya. We craft custom software, websites, mobile apps and brand systems for clients across Nairobi, Machakos, Kakamega, Nakuru, Mombasa and beyond.
          </p>
          <p className="text-muted-foreground mt-4">
            We pair sharp engineering with thoughtful design to ship products that perform — on every device, in every market.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { Icon: Target, title: "Our Mission", body: "Help our clients reach their goals with high-quality software, on time and on budget." },
            { Icon: Eye, title: "Our Vision", body: "To be the most trusted software development partner in East Africa and beyond." },
            { Icon: Heart, title: "Our Values", body: "Honesty, integrity and transparency — every relationship, every line of code." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="p-8 rounded-2xl bg-surface border border-border">
              <div className="h-12 w-12 rounded-lg bg-gradient-brand flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Why choose us</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-2xl">Reasons teams keep coming back.</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { Icon: Award, title: "Quality first", body: "Every deliverable goes through code review, QA and accessibility checks." },
            { Icon: Users, title: "Experienced team", body: "Senior designers and engineers across multiple industries." },
            { Icon: Headphones, title: "Real support", body: "Direct line to the people who built your product." },
            { Icon: Clock, title: "Fair pricing", body: "Transparent estimates and packages that fit your budget." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="p-6 rounded-2xl bg-surface border border-border hover:border-primary/60 transition">
              <Icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-12 md:p-16 text-center">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <h2 className="relative text-3xl md:text-4xl font-bold text-primary-foreground max-w-2xl mx-auto">
          Ready to start your next project?
        </h2>
        <Link to="/contact" className="relative mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-background text-foreground font-semibold hover:scale-105 transition-transform">
          Get in touch <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
