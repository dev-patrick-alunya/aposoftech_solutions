import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/site/Page";
import { servicesHTML } from "@/site/pages";

export const Route = createFileRoute("/services")({
  component: () => <Page html={servicesHTML} />,
  head: () => ({
    meta: [
      { title: "Services | Aposoftech Solutions" },
      { name: "description", content: "Software, web, mobile, design and SEO services from Aposoftech Solutions." },
    ],
  }),
});
