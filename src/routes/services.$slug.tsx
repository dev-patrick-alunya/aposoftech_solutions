import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, CtaBanner } from "./about";
import { services } from "./services";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Service not found</h1>
        <Link to="/services" className="text-primary">Back to services</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-2">Something went wrong</h1>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} | Aposoftech Solutions` },
          { name: "description", content: `${loaderData.service.title} services by Aposoftech Solutions — ${loaderData.service.short}` },
          { property: "og:image", content: loaderData.service.image },
        ]
      : [],
  }),
});

const detail: Record<string, { intro: string; features: string[]; deliverables: string[] }> = {
  "software-development": {
    intro: "We build custom software that fits your operations exactly — from internal tools to customer-facing platforms.",
    features: ["Discovery & technical design", "Cloud-native architecture", "API & integrations", "Continuous delivery", "Maintenance & SLAs"],
    deliverables: ["Architecture diagrams", "Production codebase", "Test suite", "Deployment pipeline", "Documentation"],
  },
  "web-development": {
    intro: "Fast, secure and SEO-ready websites and web applications built on a modern stack.",
    features: ["Custom CMS or headless", "E-commerce", "Performance budgets", "WCAG accessibility", "Analytics setup"],
    deliverables: ["Production website", "Editor training", "Performance report", "SEO audit", "30-day support"],
  },
  "mobile-app-development": {
    intro: "Native and cross-platform mobile apps that feel at home on Android and iOS.",
    features: ["UX research", "React Native / Flutter / Native", "Push notifications", "Offline-first patterns", "App Store launch"],
    deliverables: ["Published app", "Backend & APIs", "Admin dashboard", "Analytics", "Release pipeline"],
  },
  "graphic-design": {
    intro: "Brand identity and visual systems that turn heads — and hold up across every touchpoint.",
    features: ["Logo & brand identity", "Social media kits", "Print collateral", "Pitch decks", "Illustrations"],
    deliverables: ["Brand guidelines", "Source files", "Export packs", "Templates"],
  },
  seo: {
    intro: "Get found by the people already searching for what you do.",
    features: ["Technical SEO audit", "Keyword & intent research", "On-page optimization", "Content strategy", "Link building"],
    deliverables: ["SEO roadmap", "Monthly reporting", "Content briefs", "Performance dashboard"],
  },
  "web-design": {
    intro: "Beautiful, conversion-focused interfaces grounded in research and accessibility.",
    features: ["UX strategy", "Wireframes & prototypes", "Design system", "User testing", "Hand-off to engineering"],
    deliverables: ["Figma files", "Design system", "Interactive prototype", "Specs"],
  },
};

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const d = detail[service.slug];
  return (
    <SiteLayout>
      <PageHero eyebrow="Service" title={service.title} subtitle={d.intro} />
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-start">
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
          <img src={service.image} alt={service.title} className="relative rounded-2xl border border-border shadow-card w-full" />
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">What's included</h2>
            <ul className="space-y-3">
              {d.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">What you get</h2>
            <ul className="space-y-3">
              {d.deliverables.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft className="h-4 w-4" /> Back to all services</Link>
        </div>
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
