import React, { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCircle2, Code2, LoaderCircle, Menu, MonitorSmartphone, Send, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { addContactMessage } from "../services/contactService";
import "../styles/website-development.css";

const packages = [
  { name: "BASIC", price: "₹29,999", description: "Everything you need to get started.", features: ["5–7 pages", "Responsive design", "Custom domain", "Basic SEO setup", "3 months Google Profile", "1 year domain validity", "Free hosting"], action: "Choose Basic" },
  { name: "STANDARD", price: "₹39,999", description: "A stronger foundation to grow online.", badge: "POPULAR", features: ["8–10 pages", "Responsive design", "Blog / portfolio", "Advanced SEO setup", "6 months SEO", "6 months Google Profile", "Free hosting"], action: "Choose Standard" },
];

const portfolio = [
  { name: "Spaces that inspire.", tag: "REAL ESTATE", image: "/about_intro_logo.png", className: "wd-work-image-one" },
  { name: "Made for living.", tag: "FURNITURE", image: "/about_hands.png", className: "wd-work-image-two" },
  { name: "Crafted to stand out.", tag: "BUSINESS", image: "/about_founder.png", className: "wd-work-image-three" },
];

export default function WebsiteDevelopment() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [status, setStatus] = useState({ error: "", loading: false, sent: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const openEnquiry = (plan = "") => {
    setSelectedPackage(plan);
    setFormOpen(true);
    setStatus({ error: "", loading: false, sent: false });
  };
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setStatus({ error: "", loading: true, sent: false });
    try {
      const plan = selectedPackage ? `Selected package: ${selectedPackage}\n\n` : "";
      await addContactMessage({ ...form, message: `Website Development enquiry\n${plan}${form.message}` });
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus({ error: "", loading: false, sent: true });
    } catch (error) {
      console.error("Website development enquiry failed", error);
      setStatus({ error: "We couldn't send your enquiry. Please try again.", loading: false, sent: false });
    }
  };

  return (
    <main className="wd-page" id="top">
      <div className="wd-background" aria-hidden="true" />
      <header className="wd-header">
        <Link to="/" aria-label="Zentrix home" className="wd-logo"><img src="/logo5_transparent.png" alt="Zentrix Technology" /></Link>
        <button type="button" className="wd-menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "wd-nav wd-nav-open" : "wd-nav"} aria-label="Website development navigation">
          <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <a href="#showcase" onClick={() => setMenuOpen(false)}>OUR WEBSITE</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>OUR WORK</a>
          <a href="#plans" onClick={() => setMenuOpen(false)}>PRICING</a>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
        </nav>
        <button className="wd-header-cta" type="button" onClick={() => openEnquiry()}>LET’S TALK <ArrowUpRight size={14} /></button>
      </header>

      <section className="wd-hero">
        <span className="wd-eyebrow">WEBSITE DEVELOPMENT</span>
        <h1>Websites that work<br />as hard as you do.</h1>
        <p>Modern, responsive websites designed to build trust,<br className="wd-desktop-break" /> showcase your business, and turn visitors into customers.</p>
        <div className="wd-hero-actions">
          <a href="#showcase" className="wd-button wd-button-outline">Explore our sites <ArrowDown size={14} /></a>
          <button type="button" className="wd-button wd-button-bright" onClick={() => openEnquiry()}>Get started <ArrowRight size={15} /></button>
        </div>
        <div className="wd-highlights">
          <span><MonitorSmartphone /> Responsive by design</span>
          <span><Code2 /> Built for your brand</span>
          <span><Sparkles /> Made to perform</span>
        </div>
      </section>

      <section className="wd-showcase-section" id="showcase">
        <div className="wd-section-heading">
          <h2>A website experience, from top to bottom.</h2>
          <p>Explore a sample business website layout.</p>
        </div>
        <div className="wd-browser">
          <div className="wd-browser-bar"><div className="wd-browser-dots"><i /><i /><i /></div><div className="wd-address">🔒 &nbsp; https://yourwebsite.com</div><div className="wd-browser-icons">⌕ &nbsp; ⋮</div></div>
          <div className="wd-site-preview">
            <div className="wd-site-nav"><b>✦ &nbsp; NOVA STUDIO</b><span>HOME　 ABOUT　 SERVICES　 CONTACT</span><button type="button" onClick={() => openEnquiry()}>LET’S TALK ↗</button></div>
            <div className="wd-site-hero">
              <div><small>DESIGN THAT FEELS LIKE YOU</small><h3>Spaces<br />that inspire.</h3><p>We shape beautiful places and thoughtful experiences for modern living.</p><button type="button" onClick={() => openEnquiry()}>Explore our work <ArrowRight size={11} /></button></div>
              <div className="wd-main-photo" role="img" aria-label="Modern architectural home" />
            </div>
            <div className="wd-site-work" id="work">
              <div className="wd-preview-heading"><div><small>THOUGHTFULLY MADE</small><h4>Design. Plan. Build.</h4></div><span>VIEW ALL PROJECTS ↗</span></div>
              <div className="wd-preview-cards">{portfolio.map((item) => <article key={item.name}><div className={`wd-project-image ${item.className}`} /><small>{item.tag}</small><b>{item.name}</b></article>)}</div>
            </div>
            <div className="wd-testimonial">
              <div className="wd-avatar">✦</div><div><small>WHAT OUR CLIENTS SAY</small><p>“The new website feels like us. The process was smooth, the design is beautiful, and our customers love it.”</p><b>— NOVA STUDIO CLIENT</b></div><div className="wd-stars">★★★★★</div>
            </div>
            <div className="wd-preview-bottom"><span>Let’s build something great together.</span><button type="button" onClick={() => openEnquiry()}>START A PROJECT ↗</button></div>
          </div>
        </div>
      </section>

      <section className="wd-plans" id="plans">
        <div className="wd-section-heading"><h2>Choose the right launch plan.</h2><p>Great websites, designed for your next move.</p></div>
        <div className="wd-plan-grid">{packages.map((plan) => <article className="wd-plan-card" key={plan.name}>
          {plan.badge && <span className="wd-plan-badge">{plan.badge}</span>}
          <small>{plan.name}</small><p>{plan.description}</p><strong>{plan.price}</strong><span className="wd-plan-caption">One-time website package</span>
          <ul>{plan.features.map((feature) => <li key={feature}><Check size={13} />{feature}</li>)}</ul>
          <button type="button" onClick={() => openEnquiry(plan.name)}>Choose {plan.name === "BASIC" ? "Basic" : "Standard"} <ArrowRight size={14} /></button>
        </article>)}</div>
      </section>

      <section className="wd-final-cta">
        <h2>Ready to build your website?</h2><p>Tell us about your business and we’ll shape a plan that fits.</p>
        <button type="button" className="wd-button wd-button-bright" onClick={() => openEnquiry()}>Enquire now <ArrowRight size={14} /></button>
      </section>

      <footer className="wd-footer"><Link to="/" aria-label="Zentrix home"><img src="/logo5_transparent.png" alt="Zentrix Technology" /></Link><span>© {new Date().getFullYear()} Zentrix Technology</span><div><Link to="/service">TECH SPACE</Link><Link to="/our-portfolio">PORTFOLIO</Link><Link to="/contact">CONTACT</Link></div></footer>

      {formOpen && <div className="wd-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}>
        <section className="wd-modal" role="dialog" aria-modal="true" aria-labelledby="wd-modal-title">
          <button type="button" className="wd-modal-close" aria-label="Close enquiry form" onClick={() => setFormOpen(false)}><X size={19} /></button>
          {status.sent ? <div className="wd-success" role="status"><CheckCircle2 size={42} /><h2 id="wd-modal-title">Thanks for reaching out!</h2><p>Your website development enquiry has been sent. Our team will be in touch.</p><button type="button" onClick={() => setFormOpen(false)}>Done</button></div> : <>
            <span className="wd-eyebrow">{selectedPackage ? `${selectedPackage} WEBSITE PACKAGE` : "WEBSITE DEVELOPMENT"}</span>
            <h2 id="wd-modal-title">Let’s build something great.</h2><p className="wd-modal-subtitle">Tell us a little about your project and we’ll be in touch.</p>
            <form onSubmit={submit} className="wd-form">
              <label>Your name<input required name="name" value={form.name} onChange={update} placeholder="Name" autoComplete="name" /></label>
              <label>Email address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" autoComplete="email" /></label>
              <label>Phone number<input required type="tel" name="phone" value={form.phone} onChange={update} placeholder="Your phone number" autoComplete="tel" /></label>
              <label>Tell us about your website<textarea required name="message" value={form.message} onChange={update} placeholder="What would you like to build?" rows={3} /></label>
              {status.error && <p className="wd-form-error" role="alert">{status.error}</p>}
              <button className="wd-form-submit" disabled={status.loading} type="submit">{status.loading ? <><LoaderCircle className="wd-spin" size={16} /> Sending…</> : <>Send enquiry <Send size={15} /></>}</button>
              <small>We’ll only use your details to respond to your enquiry.</small>
            </form>
          </>}
        </section>
      </div>}
    </main>
  );
}
