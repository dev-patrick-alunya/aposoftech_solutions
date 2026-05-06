import { services } from "./services";
import { page } from "./layout";

const heroBlock = (eyebrow: string, title: string, subtitle: string) => `
<section class="page-hero">
  <div class="container">
    <span class="eyebrow">${eyebrow}</span>
    <h1>${title}</h1>
    <p>${subtitle}</p>
  </div>
</section>`;

/* ───── Home ───── */
export const homeHTML = page("home", `
<section class="hero">
  <div class="container hero-grid">
    <div>
      <span class="eyebrow">Aposoftech Solutions</span>
      <h1>Your trusted <span class="gradient-text">tech partner</span> in Kenya.</h1>
      <p class="muted" style="font-size:1.1rem;max-width:520px">
        We build software, websites, mobile apps and brand experiences that help ambitious businesses grow.
      </p>
      <div class="hero-cta">
        <a href="/contact" class="btn btn-primary">Start a project →</a>
        <a href="/services" class="btn btn-ghost">Our services</a>
      </div>
      <div class="stats">
        <div class="stat"><div class="stat-num">50+</div><div class="stat-lbl">Projects delivered</div></div>
        <div class="stat"><div class="stat-num">30+</div><div class="stat-lbl">Happy clients</div></div>
        <div class="stat"><div class="stat-num">5+</div><div class="stat-lbl">Years experience</div></div>
        <div class="stat"><div class="stat-num">24/7</div><div class="stat-lbl">Support</div></div>
      </div>
    </div>
    <div class="hero-img">
      <img src="/images/hero/hero.png" alt="Aposoftech engineering team" loading="eager" />
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="sec-head">
      <span class="eyebrow">What we do</span>
      <h2>Services built for <span class="gradient-text">growth</span></h2>
      <p>From idea to launch — and everything in between.</p>
    </div>
    <div class="grid grid-3">
      ${services.map(s => `
        <a class="card" href="/services/${s.slug}">
          <img class="card-img" src="${s.image}" alt="${s.title}" loading="lazy" />
          <h3>${s.title}</h3>
          <p>${s.short}</p>
          <span class="more">Learn more →</span>
        </a>
      `).join("")}
    </div>
  </div>
</section>

<section class="section-sm">
  <div class="container">
    <div class="cta-band">
      <h2>Have a project in mind?</h2>
      <p style="max-width:560px;margin:0 auto 22px">Tell us your goals — we'll respond within one business day with a clear plan.</p>
      <a href="/contact" class="btn btn-primary">Get in touch</a>
    </div>
  </div>
</section>
`);

/* ───── About ───── */
export const aboutHTML = page("about", `
${heroBlock("About", "We're engineers, designers and problem-solvers.", "Aposoftech Solutions is a Nairobi-based software studio building digital products that move businesses forward.")}
<section class="section">
  <div class="container grid grid-2" style="align-items:center">
    <div>
      <h2>Our mission</h2>
      <p class="muted">We exist to make world-class technology accessible to African businesses. Every product we ship is engineered for performance, designed with care, and supported for the long haul.</p>
      <h2 style="margin-top:30px">Our values</h2>
      <ul class="feature-list">
        <li><strong>Craft</strong> — we sweat every pixel and every millisecond.</li>
        <li><strong>Clarity</strong> — straight talk, honest timelines.</li>
        <li><strong>Partnership</strong> — your success is the only metric.</li>
        <li><strong>Velocity</strong> — small teams shipping continuously.</li>
      </ul>
    </div>
    <img src="/images/services/fullstack-2x.png" alt="The Aposoftech team at work" style="border-radius:18px;box-shadow:var(--shadow)" />
  </div>
</section>
`);

/* ───── Services list ───── */
export const servicesHTML = page("services", `
${heroBlock("Services", "Everything you need to ship.", "End-to-end product capability — strategy, design, engineering and growth.")}
<section class="section">
  <div class="container">
    <div class="grid grid-3">
      ${services.map(s => `
        <a class="card" href="/services/${s.slug}">
          <img class="card-img" src="${s.image}" alt="${s.title}" loading="lazy" />
          <h3>${s.title}</h3>
          <p>${s.short}</p>
          <span class="more">Learn more →</span>
        </a>
      `).join("")}
    </div>
  </div>
</section>
`);

/* ───── Service detail ───── */
export function serviceDetailHTML(slug: string): string | null {
  const svc = services.find(s => s.slug === slug);
  if (!svc) return null;
  return page("services", `
${heroBlock("Service", svc.title, svc.short)}
<section class="section">
  <div class="container service-detail-grid">
    <div>
      <h2>What you get</h2>
      <p class="muted">${svc.description}</p>
      <ul class="feature-list">
        ${svc.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
      <div style="margin-top:28px">
        <a href="/contact" class="btn btn-primary">Start this project →</a>
      </div>
    </div>
    <img src="${svc.image}" alt="${svc.title}" style="border-radius:18px;box-shadow:var(--shadow)" />
  </div>
</section>
`);
}

/* ───── Projects ───── */
const projects = [
  { title: "Logistics Platform", img: "/images/services/fullstack.png", tags: ["Web", "Backend", "Dashboard"], desc: "End-to-end fleet & dispatch management." },
  { title: "E-commerce Suite", img: "/images/services/custom-web.png", tags: ["Web", "Payments"], desc: "Storefront with M-Pesa & Stripe checkout." },
  { title: "Field Ops Mobile App", img: "/images/services/mobile-app.png", tags: ["iOS", "Android", "Offline"], desc: "Survey collection app for field teams." },
  { title: "Brand Identity System", img: "/images/services/graphic-design.jpg", tags: ["Branding", "Design"], desc: "Full visual identity for a Nairobi startup." },
  { title: "SEO Growth Engagement", img: "/images/services/seo.png", tags: ["SEO", "Content"], desc: "3x organic traffic in 6 months." },
  { title: "Internal Support Tool", img: "/images/services/support.png", tags: ["Software", "Internal"], desc: "Custom CRM & ticketing for ops." },
];
export const projectsHTML = page("projects", `
${heroBlock("Projects", "Selected work.", "A small sample of what we've shipped recently for our clients.")}
<section class="section">
  <div class="container">
    <div class="grid grid-3">
      ${projects.map(p => `
        <article class="card">
          <img class="card-img" src="${p.img}" alt="${p.title}" loading="lazy" />
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        </article>
      `).join("")}
    </div>
  </div>
</section>
`);

/* ───── Contact ───── */
export const contactHTML = page("contact", `
${heroBlock("Contact", "Let's build something great.", "Tell us about your project and we'll respond within one business day.")}
<section class="section">
  <div class="container contact-grid">
    <div class="info-list">
      <a class="info-item" href="tel:+254115348341">
        <div class="info-ico">☎</div>
        <div><div class="info-lbl">Phone</div><div class="info-val">+254 115 348 341</div></div>
      </a>
      <a class="info-item" href="https://wa.me/254115348341" target="_blank" rel="noopener">
        <div class="info-ico">✆</div>
        <div><div class="info-lbl">WhatsApp</div><div class="info-val">+254 115 348 341</div></div>
      </a>
      <a class="info-item" href="mailto:aposoftechsolutions@gmail.com">
        <div class="info-ico">✉</div>
        <div><div class="info-lbl">Email</div><div class="info-val">aposoftechsolutions@gmail.com</div></div>
      </a>
      <div class="info-item">
        <div class="info-ico">⌖</div>
        <div><div class="info-lbl">Location</div><div class="info-val">Nairobi, Kenya</div></div>
      </div>
    </div>

    <form class="contact" id="contact-form" novalidate onsubmit="
      event.preventDefault();
      var f=this, btn=f.querySelector('button[type=submit]');
      var errEl=document.getElementById('contact-error');
      errEl.style.display='none'; errEl.textContent='';
      btn.disabled=true; var oldText=btn.textContent; btn.textContent='Sending…';
      var data={name:f.name.value,email:f.email.value,subject:f.subject.value,message:f.message.value};
      fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().then(function(j){return {ok:r.ok&&j.ok,j:j}});})
        .then(function(res){
          if(res.ok){ f.style.display='none'; document.getElementById('contact-success').style.display='block'; }
          else { errEl.textContent=(res.j&&res.j.error)||'Something went wrong. Please try again.'; errEl.style.display='block'; btn.disabled=false; btn.textContent=oldText; }
        })
        .catch(function(){ errEl.textContent='Network error. Please check your connection and try again.'; errEl.style.display='block'; btn.disabled=false; btn.textContent=oldText; });
      return false;
    ">
      <div class="form-row">
        <div><label>Your name</label><input required type="text" name="name" maxlength="100" /></div>
        <div><label>Email</label><input required type="email" name="email" maxlength="255" /></div>
      </div>
      <div><label>Subject</label><input required type="text" name="subject" maxlength="200" /></div>
      <div><label>Message</label><textarea required rows="5" name="message" maxlength="2000"></textarea></div>
      <div id="contact-error" role="alert" style="display:none;margin-bottom:12px;padding:12px 14px;border-radius:12px;background:rgba(220,60,60,.12);border:1px solid rgba(220,60,60,.4);color:#ffb4b4"></div>
      <button class="btn btn-primary" type="submit">Send message →</button>
    </form>
    <div id="contact-success" class="success" style="display:none;background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:28px;text-align:center">
      <div style="font-size:2rem">✓</div>
      <h3>Message sent</h3>
      <p class="muted">Thanks — we'll be in touch shortly.</p>
    </div>
  </div>
</section>
`);

/* ───── 404 ───── */
export const notFoundHTML = page("home", `
<section class="notfound">
  <div>
    <h1>404</h1>
    <h2>Page not found</h2>
    <p class="muted">The page you're looking for doesn't exist or has been moved.</p>
    <a href="/" class="btn btn-primary">Go home</a>
  </div>
</section>
`);
