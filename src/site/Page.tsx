import { useEffect } from "react";

// Renders raw HTML. Acts as the bridge between TanStack routes and our plain HTML/CSS site.
export function Page({ html }: { html: string }) {
  useEffect(() => {
    // Ensure the stylesheet is present (also linked in __root for SSR)
    if (!document.getElementById("site-css")) {
      const l = document.createElement("link");
      l.id = "site-css";
      l.rel = "stylesheet";
      l.href = "/site.css";
      document.head.appendChild(l);
    }
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
