import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCircle2, Code2, LoaderCircle, Menu, MonitorSmartphone, Send, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";
import { addContactMessage } from "../services/contactService";
import "../styles/website-development.css";

const packages = [
  { name: "BASIC", price: "₹29,999", description: "Everything you need to get started.", features: ["5–7 pages", "Responsive design", "Custom domain", "Basic SEO setup", "3 months Google Profile", "1 year domain validity", "Free hosting"], action: "Choose Basic" },
  { name: "STANDARD", price: "₹39,999", description: "A stronger foundation to grow online.", features: ["8–10 pages", "Responsive design", "Blog / portfolio", "Advanced SEO setup", "6 months SEO", "6 months Google Profile", "Free hosting"], action: "Choose Standard" },
];

const destinations = [
  { name: "Lake Como", location: "Italy", price: "From ₹12,499", image: "/trip-buddy-lake.webp" },
  { name: "Beijing", location: "China", price: "From ₹18,999", image: "/trip-buddy-china.webp" },
  { name: "Bali", location: "Indonesia", price: "From ₹9,999", image: "/trip-buddy-bali.webp" },
  { name: "Paris", location: "France", price: "From ₹15,999", image: "/trip-buddy-paris.webp" },
  { name: "Rome", location: "Italy", price: "From ₹13,499", image: "/trip-buddy-italy.webp" },
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
          <Link to="/service" onClick={() => setMenuOpen(false)}>TECH SPACE</Link>
          <a href="#work" onClick={() => setMenuOpen(false)}>OUR WORK</a>
          <a href="#plans" onClick={() => setMenuOpen(false)}>PRICING</a>
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
        <div className="wd-browser tb-browser">
          <div className="wd-browser-bar tb-browser-bar"><div className="wd-browser-dots"><i /><i /><i /></div><div className="wd-address">tripbuddy.com</div><div className="wd-browser-icons">⌕ &nbsp; ⋮</div></div>
          <div className="wd-site-preview tb-site-preview">
            <div className="tb-nav">
              <b className="tb-brand"><span aria-hidden="true">✦</span> TRIP BUDDY</b>
              <nav aria-label="Trip Buddy sample navigation"><a href="#work">About us</a><a href="#work">Reviews</a><a href="#work">Our blog</a></nav>
              <button type="button" onClick={() => openEnquiry()}>Download App <ArrowUpRight size={12} /></button>
            </div>
            <div className="tb-hero">
              <div className="tb-intro">
                <small>GO FURTHER, FEEL CLOSER</small>
                <h3>JOIN OUR<br />COMMUNITY</h3>
                <p>Become a part of our travel community and make every trip more enjoyable and amazing.</p>
                <button type="button" onClick={() => openEnquiry()}>Download App <ArrowRight size={13} /></button>
              </div>
              <div className="tb-phone-wrap" aria-label="Trip Buddy mobile app preview">
                <div className="tb-phone">
                  <div className="tb-phone-status"><span>9:41</span><span>●●● ▰</span></div>
                  <div className="tb-phone-notch" />
                  <div className="tb-phone-content">
                    <small>YOUR NEXT ADVENTURE</small>
                    <h4>PLAN YOUR<br />ESCAPE</h4>
                    <div className="tb-search"><span>⌕</span> Where do you want to go?</div>
                    <div className="tb-chips"><span>Asia</span><span>Europe</span><span>Beaches</span></div>
                    <div className="tb-recommend"><b>Recommended</b><span>See all</span></div>
                    <div className="tb-phone-trip"><img src="/trip-buddy-bali.webp" alt="" /><div><b>Bali getaway</b><small>5 days · from ₹9,999</small></div><span>♡</span></div>
                    <div className="tb-phone-trip"><img src="/trip-buddy-paris.webp" alt="" /><div><b>Paris in spring</b><small>4 days · from ₹15,999</small></div><span>♡</span></div>
                  </div>
                  <div className="tb-phone-bottom"><span>⌂<small>Home</small></span><span>⌕<small>Explore</small></span><span>♡<small>My trips</small></span><span>◉<small>Profile</small></span></div>
                </div>
              </div>
              <aside className="tb-community">
                <small>TRAVEL BETTER, TOGETHER</small>
                <h4>THE BEST<br />EXPERIENCE<br />IN TRAVEL</h4>
                <p>Join thousands of happy travellers discovering more together.</p>
                <div className="tb-travellers" aria-label="Trip Buddy travel community">
                  <span>AS</span><span>MK</span><span>RJ</span><span>+</span><b>+1K</b>
                </div>
              </aside>
            </div>
            <div className="tb-destinations" id="work">
              {destinations.map((destination) => <article className="tb-destination" key={destination.name}>
                <img src={destination.image} alt={`${destination.name}, ${destination.location}`} />
                <div className="tb-destination-info"><div><b>{destination.name}</b><small>{destination.location}</small></div><span>Partner deal</span></div>
                <div className="tb-destination-footer"><small>{destination.price} / person</small><button type="button" onClick={() => openEnquiry()}>Explore <ArrowUpRight size={10} /></button></div>
              </article>)}
            </div>
            <div className="tb-details">
              <article className="tb-plan-card">
                <small>MAKE IT YOURS</small><h4>PLAN YOUR<br /><i>ESCAPE</i></h4>
                <p>Find the right trip for you, with inspiring places and a plan that feels effortless.</p>
                <button type="button" onClick={() => openEnquiry()}>Find your trip <ArrowRight size={11} /></button>
                <div className="tb-route" aria-hidden="true"><span>✈</span><i /><span>⌖</span></div>
              </article>
              <article className="tb-tour-card">
                <div className="tb-stats"><div><b>1K+</b><small>UNIQUE TOURS</small></div><div><b>10K+</b><small>HAPPY TRAVELLERS</small></div><div><b>4.8+</b><small>APP STORE RATING</small></div></div>
                <div className="tb-tour-copy"><small>YOUR NEXT GREAT STORY</small><h4>IMMENSE TOURS<br />SELECTION</h4><p>We turn your dreams into unforgettable travel.</p><button type="button" onClick={() => openEnquiry()}>View journeys <ArrowRight size={11} /></button></div>
                <div className="tb-tour-images"><img src="/trip-buddy-italy.webp" alt="Trip Buddy journey in Italy" /><img src="/trip-buddy-china.webp" alt="Trip Buddy journey in China" /><img src="/trip-buddy-paris.webp" alt="Trip Buddy journey in Paris" /></div>
              </article>
              <article className="tb-why-card">
                <div><small>TRAVEL, YOUR WAY</small><h4>WHY TRAVELLERS<br />CHOOSE US</h4></div>
                <div className="tb-benefits"><div><span>◎</span><b>Clear & simple<br />app interface</b></div><div><span>♡</span><b>Trips made<br />for you</b></div><div><span>↗</span><b>A world of<br />possibilities</b></div></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="wd-plans" id="plans">
        <div className="wd-section-heading"><h2>Choose the right launch plan.</h2><p>Great websites, designed for your next move.</p></div>
        <div className="wd-plan-grid">{packages.map((plan) => <article className="wd-plan-card" key={plan.name}>
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
