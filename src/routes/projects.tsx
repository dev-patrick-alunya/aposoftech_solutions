import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, CtaBanner } from "./about";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Our Projects | Aposoftech Solutions" },
      { name: "description", content: "A selection of recent web, mobile and brand projects shipped by Aposoftech Solutions." },
    ],
  }),
});

const projects = [
  { title: "Custom Web Platform", category: "Web Development", img: "/images/services/custom-web.png", desc: "A bespoke web platform with role-based dashboards and real-time analytics." },
  { title: "Full Stack Web App", category: "Software", img: "/images/services/fullstack.png", desc: "End-to-end web application with a custom backend and admin tools." },
  { title: "Backend Solutions", category: "Software", img: "/images/services/backend.png", desc: "Scalable APIs and infrastructure for a growing fintech client." },
  { title: "Customer Support Portal", category: "Web Development", img: "/images/services/support.png", desc: "User-centric helpdesk and ticketing experience." },
  { title: "Mobile Banking App", category: "Mobile", img: "/images/services/mobile-app.png", desc: "Cross-platform mobile experience for retail banking." },
  { title: "Brand Identity Refresh", category: "Design", img: "/images/services/graphic-design.jpg", desc: "A complete visual system for an Africa-first SaaS brand." },
];

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Projects" title="Selected work" subtitle="A snapshot of recent engagements across web, mobile and brand." />
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article key={p.title} className="group rounded-2xl overflow-hidden bg-surface border border-border hover:border-primary/60 transition">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">{p.category}</div>
              <h3 className="text-lg font-semibold flex items-center gap-2">{p.title} <ExternalLink className="h-4 w-4 text-muted-foreground" /></h3>
              <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
            </div>
          </article>
        ))}
      </section>
      <CtaBanner />
    </SiteLayout>
  );
}
