import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/images/logo/logo-v1.png" alt="Aposoftech Solutions" className="h-12 mb-4" />
          <p className="text-sm text-muted-foreground max-w-md">
            Aposoftech Solutions is a dedicated software development company crafting web, mobile and brand experiences for clients across Kenya and beyond.
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/" },
              { Icon: Twitter, href: "https://twitter.com/AposoftechS" },
              { Icon: Instagram, href: "https://www.instagram.com/aposoftech.solutions/" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/aposoftech-solutions" },
              { Icon: Youtube, href: "https://www.youtube.com/" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-surface-elevated border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">Get in touch</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-primary" /><a href="tel:+254115348341">+254 115 348 341</a></li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /><a href="mailto:aposoftechsolutions@gmail.com">aposoftechsolutions@gmail.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" />Nairobi, Kenya</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Aposoftech Solutions. All rights reserved.</span>
          <span>Crafted with care in Nairobi.</span>
        </div>
      </div>
    </footer>
  );
}
