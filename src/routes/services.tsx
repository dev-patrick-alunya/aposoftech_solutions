import { createFileRoute, Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, CtaBanner } from "./about";
import { ArrowRight, Code2, Smartphone, Palette, Search, Layout, Server } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: ServicesLayout,
  head: () => ({
    meta: [
      { title: "Our Services | Aposoftech Solutions" },
      { name: "description", content: "Software development, web & mobile apps, SEO, web design and graphic design from Aposoftech Solutions." },
    ],
  }),
});

export const services = [
  { slug: "software-development", icon: Code2, title: "Software Development", short: "Custom software that automates and scales.", image: "/images/services/software-development.png" },
  { slug: "web-development", icon: Layout, title: "Web Development", short: "Fast, secure web applications.", image: "/images/services/web-development.png" },
  { slug: "mobile-app-development", icon: Smartphone, title: "Mobile App Development", short: "Native & cross-platform mobile apps.", image: "/images/services/mobile-app.png" },
  { slug: "graphic-design", icon: Palette, title: "Graphic Design", short: "Brand systems & creatives.", image: "/images/services/graphic-design.jpg" },
  { slug: "seo", icon: Search, title: "SEO Services", short: "Rank higher, get found.", image: "/images/services/seo.png" },
  { slug: "web-design", icon: Server, title: "Web Design", short: "Conversion-focused interfaces.", image: "/images/services/web-design.png" },
];

function ServicesLayout() {
  const matchRoute = useMatchRoute();
  const isIndex = matchRoute({ to: "/services" });
  if (isIndex) return <ServicesIndex />;
  return <Outlet />;
}

function ServicesIndex() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Services" title="End-to-end services for ambitious teams" subtitle="From discovery to launch and beyond — pick a service or combine several into a tailored engagement." />
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ slug, icon: Icon, title, short, image }) => (
          <Link key={slug} to="/services/$slug" params={{ slug }} className="group rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/60 hover:shadow-glow transition-all">
            <div className="aspect-[4/3] overflow-hidden bg-surface-elevated">
              <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-brand flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{short}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
