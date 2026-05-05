export type Service = {
  slug: string;
  title: string;
  short: string;
  image: string;
  features: string[];
  description: string;
};

export const services: Service[] = [
  {
    slug: "software-development",
    title: "Custom Software Development",
    short: "Tailor-made software systems engineered for your unique workflows.",
    image: "/images/services/software-development.png",
    description:
      "From internal tools to full ERP systems, we design and build software that fits your business like a glove — secure, scalable and maintainable.",
    features: ["Discovery & architecture", "Cloud-native deployment", "API integrations", "Long-term support"],
  },
  {
    slug: "web-development",
    title: "Web Development",
    short: "Fast, secure, beautifully engineered websites and web apps.",
    image: "/images/services/web-development.png",
    description:
      "We build production-grade web applications using modern stacks — optimised for speed, accessibility and conversion.",
    features: ["Responsive design", "SEO-ready architecture", "CMS integration", "Performance budgets"],
  },
  {
    slug: "mobile-app",
    title: "Mobile App Development",
    short: "Native-feeling iOS & Android apps your users will love.",
    image: "/images/services/mobile-app.png",
    description:
      "Cross-platform and native mobile apps engineered for performance, with offline support, push notifications and clean UX.",
    features: ["iOS & Android", "Offline-first", "App Store deployment", "Analytics & crash reporting"],
  },
  {
    slug: "graphic-design",
    title: "Graphic Design & Branding",
    short: "Identities and visuals that command attention.",
    image: "/images/services/graphic-design.jpg",
    description:
      "Logos, brand systems, marketing collateral and social media assets — all crafted to make your brand unmistakable.",
    features: ["Brand identity", "Logo design", "Marketing collateral", "Social media kits"],
  },
  {
    slug: "seo",
    title: "Search Engine Optimisation",
    short: "Get found by the right customers, on the right keywords.",
    image: "/images/services/seo.png",
    description:
      "Technical SEO, on-page optimisation, content strategy and link building — built to compound month over month.",
    features: ["Technical audits", "Keyword research", "On-page optimisation", "Monthly reporting"],
  },
  {
    slug: "web-design",
    title: "Web Design",
    short: "Conversion-focused design systems and visual identities for the web.",
    image: "/images/services/web-design.png",
    description:
      "Beautiful, on-brand interfaces that translate cleanly to development and convert visitors into customers.",
    features: ["UX research", "Wireframing", "High-fidelity UI", "Design system handoff"],
  },
];

export function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}
