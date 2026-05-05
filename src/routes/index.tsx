import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/site/Page";
import { homeHTML } from "@/site/pages";

export const Route = createFileRoute("/")({
  component: () => <Page html={homeHTML} />,
  head: () => ({
    meta: [
      { title: "Aposoftech Solutions | Software, Web & Mobile Development in Kenya" },
      { name: "description", content: "Nairobi-based software studio building web, mobile and brand experiences for ambitious businesses." },
    ],
  }),
});
