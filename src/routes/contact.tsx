import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/site/Page";
import { contactHTML } from "@/site/pages";

export const Route = createFileRoute("/contact")({
  component: () => <Page html={contactHTML} />,
  head: () => ({
    meta: [
      { title: "Contact | Aposoftech Solutions" },
      { name: "description", content: "Get in touch with Aposoftech Solutions to discuss your next project." },
    ],
  }),
});
