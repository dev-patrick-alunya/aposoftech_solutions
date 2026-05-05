import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-18 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/images/logo/logo-v1.png" alt="Aposoftech Solutions" className="h-10 w-auto transition-transform group-hover:scale-105" />
        </Link>
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/contact" className="ml-2 px-4 py-2 rounded-md text-sm font-semibold bg-gradient-brand text-primary-foreground shadow-glow hover:opacity-90 transition">
              Get a Quote
            </Link>
          </li>
        </ul>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <ul className="px-6 py-4 flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium" activeProps={{ className: "text-primary" }} activeOptions={{ exact: l.to === "/" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
