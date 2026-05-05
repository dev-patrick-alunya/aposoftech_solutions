// Plain HTML layout helpers — no React components, just string templates.

export function header(active: string): string {
  const link = (href: string, label: string, key: string) =>
    `<li><a href="${href}" class="${active === key ? "active" : ""}">${label}</a></li>`;
  return `
<header class="site-header">
  <div class="container nav">
    <a href="/" class="nav-logo" aria-label="Aposoftech Solutions home">
      <img src="/images/logo/logo-v1.png" alt="Aposoftech Solutions" />
    </a>
    <button class="nav-toggle" aria-label="Toggle menu" onclick="document.getElementById('navlinks').classList.toggle('open')">☰</button>
    <ul class="nav-links" id="navlinks">
      ${link("/", "Home", "home")}
      ${link("/about", "About", "about")}
      ${link("/services", "Services", "services")}
      ${link("/projects", "Projects", "projects")}
      ${link("/contact", "Contact", "contact")}
      <li class="nav-cta"><a href="/contact" class="btn btn-primary">Get a Quote</a></li>
    </ul>
  </div>
</header>`;
}

export function footer(): string {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <img src="/images/logo/logo-v1.png" alt="Aposoftech" style="height:42px;margin-bottom:14px" />
        <p class="muted" style="max-width:280px">Crafting modern software, web and mobile experiences for businesses across Kenya and beyond.</p>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="/services/software-development">Software Development</a></li>
          <li><a href="/services/web-development">Web Development</a></li>
          <li><a href="/services/mobile-app">Mobile Apps</a></li>
          <li><a href="/services/seo">SEO</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+254115348341">+254 115 348 341</a></li>
          <li><a href="mailto:aposoftechsolutions@gmail.com">aposoftechsolutions@gmail.com</a></li>
          <li class="muted">Nairobi, Kenya</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${year} Aposoftech Solutions. All rights reserved.</span>
      <span>Built in Nairobi 🇰🇪</span>
    </div>
  </div>
</footer>`;
}

export function page(active: string, body: string): string {
  return header(active) + `<main>${body}</main>` + footer();
}
