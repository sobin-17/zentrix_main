import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Layers3,
  LoaderCircle,
  LockKeyhole,
  Menu,
  Rocket,
  Send,
  Smartphone,
  Workflow,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { addContactMessage } from "../services/contactService";
import "../styles/app-development.css";

const serviceDetails = {
  "web-app": {
    title: "Web App Development",
    eyebrow: "WEB APPLICATIONS",
    headline: <>Powerful web apps.<br />Built around your business.</>,
    introduction:
      "From customer portals to complex operations platforms, we build secure web applications that simplify work and scale with your goals.",
    highlights: [
      { icon: Layers3, label: "Purpose-built platforms" },
      { icon: LockKeyhole, label: "Security at every layer" },
      { icon: Workflow, label: "Connected workflows" },
    ],
    capabilities: [
      { icon: Layers3, title: "Dashboards & portals", detail: "Clear, role-based workspaces for your customers, team, and operations." },
      { icon: Workflow, title: "Workflow automation", detail: "Replace repetitive manual steps with reliable, connected processes." },
      { icon: LockKeyhole, title: "Integrations & security", detail: "Connect the tools you use with thoughtful access controls and data protection." },
      { icon: Code2, title: "Scalable architecture", detail: "A maintainable foundation that can grow as your product and user base evolve." },
    ],
    process: [
      ["01", "Discover", "We map your users, goals, workflows, and technical requirements."],
      ["02", "Design", "We shape the experience and agree on a clear delivery plan."],
      ["03", "Build", "We develop, integrate, and test the application in focused stages."],
      ["04", "Launch & grow", "We deploy your app and support its next steps."],
    ],
    plans: [
      {
        name: "BASIC",
        description: "Everything you need to get online",
        price: "₹3,35,000",
        features: [
          "5 to 7 pages",
          "Secure admin login and access control",
          "Database-connected forms and record management",
          "Basic admin dashboard",
          "1 standard API integration (if required)",
        ],
      },
      {
        name: "STANDARD",
        description: "More room to grow",
        price: "₹7,25,000",
        features: [
          "8–15 responsive pages",
          "2–4 user roles with permission controls",
          "Multiple modules with dashboards, filters and reports",
          "Up to 2 API integrations and 1 payment gateway",
          "Email, SMS or WhatsApp notifications",
        ],
      },
      {
        name: "ADVANCED",
        description: "For complex operations",
        price: "₹17,45,000",
        features: [
          "15+ complex pages and operational dashboards",
          "5+ user roles with granular permissions",
          "Advanced workflows and background processing",
          "Up to 4 integrations, including 1 AI-powered workflow",
          "Scalable cloud infrastructure and advanced security",
        ],
      },
    ],
    formPrompt: "Tell us what your web app needs to do.",
  },
  "mobile-app": {
    title: "Mobile App Development",
    eyebrow: "MOBILE APPLICATIONS",
    headline: <>Great ideas,<br />made for mobile.</>,
    introduction:
      "We create intuitive iOS and Android apps that bring your service closer to customers, from the first tap through every daily interaction.",
    highlights: [
      { icon: Smartphone, label: "iOS & Android" },
      { icon: Layers3, label: "Native or cross-platform" },
      { icon: Rocket, label: "Ready to grow" },
    ],
    capabilities: [
      { icon: Smartphone, title: "iOS & Android apps", detail: "Reach customers on the devices they use with a consistent, polished experience." },
      { icon: Layers3, title: "Product design", detail: "Simple, accessible journeys designed around real mobile habits." },
      { icon: Workflow, title: "APIs & notifications", detail: "Connect your app to existing services, data, and timely customer updates." },
      { icon: Rocket, title: "Release & support", detail: "Prepare for launch and keep improving with reliable post-release support." },
    ],
    process: [
      ["01", "Shape the idea", "We align on your audience, product goals, and essential features."],
      ["02", "Design the journey", "We map key screens and interactions for a smooth mobile experience."],
      ["03", "Develop & test", "We build for your selected platforms and test across real-world use cases."],
      ["04", "Launch & improve", "We help prepare your release and plan ongoing improvements."],
    ],
    plans: [
      {
        name: "BASIC",
        description: "Everything you need to get online",
        price: "₹3,45,000",
        features: [
          "8–10 screens for Android and iOS",
          "Secure login with email or phone",
          "Basic backend, database and admin panel",
          "Push notifications and 1 device feature",
          "App Store and Google Play submission assistance",
        ],
      },
      {
        name: "STANDARD",
        description: "More room to grow",
        price: "₹7,11,000",
        features: [
          "10–20 screens with reusable UI components",
          "2–3 user types with role-based access",
          "Advanced admin dashboard and reports",
          "Up to 2 API integrations and 1 payment gateway",
          "Push notifications, messaging and up to 2 device features",
        ],
      },
      {
        name: "ADVANCED",
        description: "Everything you need to get online",
        price: "₹16,00,000",
        features: [
          "20+ screens with complex, offline-ready workflows",
          "Multi-role access with advanced authentication",
          "Advanced admin panel, reports and data exports",
          "Up to 4 integrations, including 1 AI-powered feature",
          "GPS, maps, biometrics and advanced push notifications",
        ],
      },
    ],
    formPrompt: "Tell us about the mobile experience you want to create.",
  },
};

export default function AppDevelopment({ serviceType }) {
  const service = serviceDetails[serviceType] || serviceDetails["web-app"];
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [formOpen, setFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [status, setStatus] = useState({ error: "", loading: false, sent: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const openEnquiry = (plan = "") => {
    setSelectedPlan(plan);
    setStatus({ error: "", loading: false, sent: false });
    setFormOpen(true);
  };

  useEffect(() => {
    if (!formOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setFormOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [formOpen]);

  const updateForm = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitEnquiry = async (event) => {
    event.preventDefault();
    setStatus({ error: "", loading: true, sent: false });
    try {
      const selectedPlanText = selectedPlan ? `Selected plan: ${selectedPlan}\n\n` : "";
      await addContactMessage({
        ...form,
        message: `${service.title} enquiry\n${selectedPlanText}${form.message}`,
      });
      setForm({ name: "", email: "", phone: "", message: "" });
      setStatus({ error: "", loading: false, sent: true });
    } catch (error) {
      console.error(`${service.title} enquiry failed`, error);
      setStatus({ error: "We couldn't send your enquiry. Please try again.", loading: false, sent: false });
    }
  };

  return (
    <main className="appd-page" id="top">
      <header className="appd-header">
        <Link to="/" className="appd-logo" aria-label="Zentrix home">
          <img src="/logo5_transparent.png" alt="Zentrix Technology" />
        </Link>
        <button
          type="button"
          className="appd-menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "appd-nav appd-nav-open" : "appd-nav"} aria-label={`${service.title} navigation`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
          <a href="#showcase" onClick={() => setMenuOpen(false)}>OUR WEBSITE</a>
          <Link to="/service" onClick={() => setMenuOpen(false)}>TECH SPACE</Link>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>OUR WORK</a>
          <a href="#plans" onClick={() => setMenuOpen(false)}>PRICING</a>
        </nav>
        <button type="button" className="appd-header-cta" onClick={() => openEnquiry()}>
          LET&apos;S TALK <ArrowUpRight size={14} />
        </button>
      </header>

      <section className="appd-hero">
        <span className="appd-eyebrow">{service.eyebrow}</span>
        <h1>{service.headline}</h1>
        <p>{service.introduction}</p>
        <div className="appd-hero-actions">
          <a href="#capabilities" className="appd-button appd-button-outline">Explore what we build <ArrowRight size={14} /></a>
          <button type="button" className="appd-button appd-button-bright" onClick={() => openEnquiry()}>Start a project <ArrowUpRight size={14} /></button>
        </div>
        <div className="appd-highlights">
          {service.highlights.map(({ icon: Icon, label }) => (
            <span key={label}><Icon aria-hidden="true" />{label}</span>
          ))}
        </div>
      </section>

      <section className="appd-showcase" id="showcase" aria-label={`${service.title} preview`}>
        <div className="appd-section-heading">
          <span className="appd-eyebrow">DESIGNED AROUND YOUR USERS</span>
          <h2>{serviceType === "mobile-app" ? "A mobile experience, from first tap to everyday use." : "A powerful web application, built around your workflow."}</h2>
          <p>{serviceType === "mobile-app" ? "Explore a sample mobile app experience across devices." : "Explore a sample workspace with the tools your team needs."}</p>
        </div>
        <div className={`appd-product-preview ${serviceType === "mobile-app" ? "appd-mobile-preview" : ""}`} aria-hidden="true">
          {serviceType === "mobile-app" ? (
            <div className="appd-mobile-screens">
              <article className="appd-phone">
                <div className="appd-phone-camera" />
                <div className="appd-phone-bar"><b>9:41</b><span>●●● ▰</span></div>
                <small>YOUR NEXT ADVENTURE</small>
                <strong>Plan your<br />escape.</strong>
                <div className="appd-phone-search">⌕ &nbsp; Where to?</div>
                <div className="appd-phone-chips"><i>Popular</i><i>Nearby</i></div>
                <div className="appd-phone-trip"><img src="/trip-buddy-bali.webp" alt="" /><span><b>Bali getaway</b><small>5 days · from ₹9,999</small></span></div>
                <div className="appd-phone-tab">⌂ &nbsp;&nbsp;&nbsp; ⌕ &nbsp;&nbsp;&nbsp; ♡ &nbsp;&nbsp;&nbsp; ◉</div>
              </article>
              <article className="appd-phone appd-phone-featured">
                <div className="appd-phone-camera" />
                <div className="appd-phone-bar"><b>9:41</b><span>●●● ▰</span></div>
                <small>EXPLORE THE WORLD</small>
                <strong>Find your<br />next story.</strong>
                <div className="appd-phone-photo"><img src="/trip-buddy-paris.webp" alt="" /><span>Paris, France <b>♡</b></span></div>
                <div className="appd-phone-trip"><img src="/trip-buddy-italy.webp" alt="" /><span><b>Lake Como</b><small>From ₹12,499</small></span></div>
                <div className="appd-phone-tab">⌂ &nbsp;&nbsp;&nbsp; ⌕ &nbsp;&nbsp;&nbsp; ♡ &nbsp;&nbsp;&nbsp; ◉</div>
              </article>
              <article className="appd-phone">
                <div className="appd-phone-camera" />
                <div className="appd-phone-bar"><b>9:41</b><span>●●● ▰</span></div>
                <small>YOUR SAVED TRIPS</small>
                <strong>Trips to<br />remember.</strong>
                <div className="appd-phone-trip"><img src="/trip-buddy-china.webp" alt="" /><span><b>Beijing escape</b><small>4 days · 2 guests</small></span></div>
                <div className="appd-phone-trip"><img src="/trip-buddy-lake.webp" alt="" /><span><b>Lake Como</b><small>Plan your stay</small></span></div>
                <div className="appd-phone-tab">⌂ &nbsp;&nbsp;&nbsp; ⌕ &nbsp;&nbsp;&nbsp; ♡ &nbsp;&nbsp;&nbsp; ◉</div>
              </article>
            </div>
          ) : (
            <div className="appd-browser">
              <div className="appd-browser-bar"><span><i /><i /><i /></span><small>workspace.zentrix.app</small><b>•••</b></div>
              <div className="appd-dashboard">
                <div className="appd-dashboard-side"><b>Z.</b><span>◈</span><span>▦</span><span>⌘</span><span>⚙</span></div>
                <div className="appd-dashboard-main">
                  <div className="appd-dashboard-top"><span>Overview</span><i>◉ &nbsp; Welcome back</i></div>
                  <div className="appd-dashboard-intro"><small>YOUR WORKSPACE</small><b>Good morning, Alex</b><span>Here&apos;s what&apos;s happening today.</span></div>
                  <div className="appd-stats">
                    <div><small>Active projects</small><b>12 <i>↗ 8.2%</i></b></div>
                    <div><small>Tasks completed</small><b>86 <i>↗ 12.4%</i></b></div>
                    <div><small>Team members</small><b>24 <i>↗ 4.1%</i></b></div>
                  </div>
                  <div className="appd-chart"><div><b>Project activity</b><small>Last 7 days</small></div><div className="appd-chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="appd-section" id="capabilities">
        <div className="appd-section-heading">
          <span className="appd-eyebrow">WHAT WE DELIVER</span>
          <h2>Technology that fits the way you work.</h2>
          <p>Thoughtful design and dependable engineering, shaped around your priorities.</p>
        </div>
        <div className="appd-capability-grid">
          {service.capabilities.map(({ icon: Icon, title, detail }, index) => (
            <article className="appd-capability" key={title}>
              <span className="appd-capability-icon"><Icon aria-hidden="true" /></span>
              <small>0{index + 1}</small>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="appd-section appd-process" id="process">
        <div className="appd-section-heading">
          <span className="appd-eyebrow">HOW WE WORK</span>
          <h2>A clear path from idea to launch.</h2>
        </div>
        <div className="appd-process-grid">
          {service.process.map(([number, title, detail]) => (
            <article className="appd-process-step" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="appd-section appd-plans" id="plans">
        <div className="appd-section-heading">
          <span className="appd-eyebrow">{serviceType === "mobile-app" ? "MOBILE APP LAUNCH PLANS" : "FLEXIBLE ENGAGEMENT"}</span>
          <h2>
            {serviceType === "web-app"
              ? "Choose your web app plan."
              : serviceType === "mobile-app"
                ? "Choose the right mobile launch plan."
                : "Choose the right way to get started."}
          </h2>
          <p>
            {serviceType === "web-app"
              ? "A clear scope, transparent pricing, and the right foundation for your next stage."
              : serviceType === "mobile-app"
                ? "Straightforward packages for your next mobile app."
                : "Every project is different. We'll shape the scope and proposal around your requirements."}
          </p>
        </div>
        <div className={`appd-plan-grid ${serviceType === "web-app" ? "appd-web-plan-grid" : ""} ${serviceType === "mobile-app" ? "appd-mobile-plan-grid" : ""}`}>
          {service.plans.map((plan) => (
            <article className="appd-plan-card" key={plan.name}>
              <small>{plan.name}</small>
              <p>{plan.description}</p>
              <strong>{plan.price || "Let&apos;s discuss"}</strong>
              <span className="appd-plan-caption">{plan.price ? "+ GST" : "Tailored to your project scope"}</span>
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
              <button type="button" onClick={() => openEnquiry(plan.name)}>Choose {plan.name.charAt(0) + plan.name.slice(1).toLowerCase()} <ArrowRight size={14} /></button>
            </article>
          ))}
        </div>
      </section>

      <section className="appd-final-cta">
        <span className="appd-eyebrow">READY WHEN YOU ARE</span>
        <h2>Let&apos;s make your next idea real.</h2>
        <p>Share what you have in mind and our team will help you find the right next step.</p>
        <button type="button" className="appd-button appd-button-bright" onClick={() => openEnquiry()}>Enquire now <ArrowRight size={14} /></button>
      </section>

      <footer className="appd-footer">
        <Link to="/" aria-label="Zentrix home"><img src="/logo5_transparent.png" alt="Zentrix Technology" /></Link>
        <span>© {new Date().getFullYear()} Zentrix Technology</span>
        <div><Link to="/service">TECH SPACE</Link><Link to="/our-portfolio">PORTFOLIO</Link><Link to="/contact">CONTACT</Link></div>
      </footer>

      {formOpen && (
        <div
          className="appd-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFormOpen(false);
          }}
        >
          <section className="appd-modal" role="dialog" aria-modal="true" aria-labelledby="appd-modal-title">
            <button type="button" className="appd-modal-close" aria-label="Close enquiry form" onClick={() => setFormOpen(false)}><X size={19} /></button>
            {status.sent ? (
              <div className="appd-success" role="status">
                <CheckCircle2 size={42} />
                <h2 id="appd-modal-title">Thanks for reaching out!</h2>
                <p>Your {service.title.toLowerCase()} enquiry has been sent. Our team will be in touch.</p>
                <button type="button" onClick={() => setFormOpen(false)}>Done</button>
              </div>
            ) : (
              <>
                <span className="appd-eyebrow">{selectedPlan ? `${selectedPlan} PLAN` : service.eyebrow}</span>
                <h2 id="appd-modal-title">Let&apos;s talk about your project.</h2>
                <p className="appd-modal-subtitle">Tell us a little about what you need and we&apos;ll be in touch.</p>
                <form className="appd-form" onSubmit={submitEnquiry}>
                  <label>Your name<input required name="name" value={form.name} onChange={updateForm} placeholder="Name" autoComplete="name" /></label>
                  <label>Email address<input required type="email" name="email" value={form.email} onChange={updateForm} placeholder="you@example.com" autoComplete="email" /></label>
                  <label>Phone number<input required type="tel" name="phone" value={form.phone} onChange={updateForm} placeholder="10-digit phone number" autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} title="Enter exactly 10 digits" /></label>
                  <label>Project details<textarea required name="message" value={form.message} onChange={updateForm} placeholder={service.formPrompt} rows={3} /></label>
                  {status.error && <p className="appd-form-error" role="alert">{status.error}</p>}
                  <button className="appd-form-submit" disabled={status.loading} type="submit">
                    {status.loading ? <><LoaderCircle className="appd-spin" size={16} /> Sending…</> : <>Send enquiry <Send size={15} /></>}
                  </button>
                  <small>We&apos;ll only use your details to respond to your enquiry.</small>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
