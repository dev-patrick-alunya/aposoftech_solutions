import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/site/Page";
import { aboutHTML } from "@/site/pages";

export const Route = createFileRoute("/about")({
  component: () => <Page html={aboutHTML} />,
  head: () => ({
    meta: [
      { title: "About | Aposoftech Solutions" },
      { name: "description", content: "Learn about Aposoftech Solutions — a Nairobi-based software studio." },
    ],
  }),
});
