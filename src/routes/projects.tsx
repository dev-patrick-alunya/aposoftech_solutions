import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/site/Page";
import { projectsHTML } from "@/site/pages";

export const Route = createFileRoute("/projects")({
  component: () => <Page html={projectsHTML} />,
  head: () => ({
    meta: [
      { title: "Projects | Aposoftech Solutions" },
      { name: "description", content: "Selected work from Aposoftech Solutions." },
    ],
  }),
});
