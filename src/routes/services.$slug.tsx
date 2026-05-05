import { createFileRoute, notFound } from "@tanstack/react-router";
import { Page } from "@/site/Page";
import { serviceDetailHTML } from "@/site/pages";
import { findService } from "@/site/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const svc = findService(params.slug);
    if (!svc) throw notFound();
    return svc;
  },
  component: ServiceDetail,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Aposoftech Solutions` },
          { name: "description", content: loaderData.short },
          { property: "og:image", content: loaderData.image },
        ]
      : [{ title: "Service | Aposoftech Solutions" }],
  }),
  errorComponent: ({ error }) => <div className="notfound"><div><h2>Something went wrong</h2><p>{error.message}</p></div></div>,
  notFoundComponent: () => <Page html={`<section class="notfound"><div><h1>404</h1><h2>Service not found</h2><a href="/services" class="btn btn-primary">Back to services</a></div></section>`} />,
});

function ServiceDetail() {
  const svc = Route.useLoaderData();
  const html = serviceDetailHTML(svc.slug)!;
  return <Page html={html} />;
}
