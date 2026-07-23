import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MapPin, Clock, Zap, Users, ShieldCheck } from "lucide-react";
import { addContactMessage } from "../services/contactService";

/* ─── SVG Icons ─────────────────────────────────────────────── */
const LightbulbIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);

const PeopleIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClipboardIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const CodeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const RocketIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

/* ── "What We Do" icons ── */
const DevIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

const AcademyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const AIIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
    <circle cx="9" cy="13" r="1" fill="#a855f7" /><circle cx="15" cy="13" r="1" fill="#a855f7" />
    <path d="M9 17c.83.65 2.17 1 3 1s2.17-.35 3-1" />
  </svg>
);

const SupportIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────── */
const steps = [
  { num: "01", icon: <LightbulbIcon />, title: "Share Your Idea", desc: "Tell us what you need." },
  { num: "02", icon: <PeopleIcon />, title: "We Connect", desc: "Our team will reach out." },
  { num: "03", icon: <ClipboardIcon />, title: "Plan & Proposal", desc: "We analyze and prepare the best plan." },
  { num: "04", icon: <CodeIcon />, title: "Development", desc: "We build with quality and care." },
  { num: "05", icon: <RocketIcon />, title: "Delivery", desc: "On time. Every time. Beyond expectations." },
];

const services = [
  { icon: <DevIcon />, title: "Software Development", desc: "Custom software solutions that grow your business." },
  { icon: <AcademyIcon />, title: "Academy & Training", desc: "Industry-focused training for your career growth." },
  { icon: <AIIcon />, title: "AI & Tech Solutions", desc: "Intelligent solutions powered by technology." },
  { icon: <SupportIcon />, title: "Support & Maintenance", desc: "We're here even after the project is done." },
];

/* ─── Get In Touch animation variants ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Get In Touch Section (merged as a component) ──────────── */
const GetTouch = () => {
  const [particles] = useState(() => {
    const colors = ["#00c6ff", "#a855f7", "#ec4899", "#ffffff"];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 150}px`,
      ty: `${(Math.random() - 0.5) * 150}px`,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  });

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addContactMessage(form);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };

  const perks = [
    { icon: Zap, title: "Quick Response", desc: "We reply within 24 hours" },
    { icon: Users, title: "Real People", desc: "Talk to our friendly team" },
    { icon: ShieldCheck, title: "Trusted Support", desc: "We're here to help you succeed" },
  ];

  const contactCards = [
    { icon: Mail, label: "Email Us", value: "info.zentrixtechnology@gmail.com" },
    { icon: Phone, label: "Call Support", value: "+91 91509 73003" },
    { icon: MapPin, label: "Head Office", value: "Nagercoil, Tamilnadu" },
    { icon: Clock, label: "Working Hours", value: "Mon - Sat\n09:30 AM - 06:00 PM" },
  ];

  const locations = [
    { title: "Nagercoil, Tamil Nadu", tag: "Head Office", detail: "Nagercoil, Tamil Nadu, India" }
  ];

  return (
    <section id="get-in-touch" className="relative bg-[#07020f] min-h-screen overflow-hidden py-16 md:py-24 px-4 sm:px-6 md:px-10">
      {/* Space dots / particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="service-particle"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: p.left,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            "--tx": p.tx,
            "--ty": p.ty,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          }}
        />
      ))}

      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full bg-purple-600/20 blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ===================== TOP: Heading + Form ===================== */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT — Heading */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span
              variants={fadeUp}
              whileHover={{ scale: 1.04, borderColor: "rgba(216,180,254,0.6)" }}
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 cursor-default"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-purple-400"
              />
              We'd love to hear from you
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-5 font-extrabold leading-[0.95] tracking-tight text-white text-[48px] sm:text-[64px] md:text-[72px]"
            >
              GET IN
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                TOUCH
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-gray-400 text-sm sm:text-base leading-relaxed max-w-md"
            >
              Have a question, idea, or just want to say hello? Our team is
              here and ready to connect with you.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-6"
            >
              {perks.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  whileHover="hover"
                  className="flex flex-col gap-2 cursor-default"
                >
                  <motion.div
                    variants={{
                      hover: {
                        scale: 1.12,
                        rotate: -6,
                        borderColor: "rgba(216,180,254,0.7)",
                        backgroundColor: "rgba(168,85,247,0.18)",
                      },
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4 text-purple-300" />
                  </motion.div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-gray-500 text-xs leading-snug">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative bg-[#0d0618]/80 backdrop-blur border border-purple-500/20 rounded-[24px] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold">
                Send us a message
              </h2>
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.12, rotate: 12 }}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </motion.div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-4"
            >
              <motion.div variants={fadeUp} whileFocus={{ scale: 1.01 }} className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: "rgba(192,132,252,0.7)" }}
                  transition={{ duration: 0.2 }}
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#120a20] border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400/40 transition"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: "rgba(192,132,252,0.7)" }}
                  transition={{ duration: 0.2 }}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#120a20] border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400/40 transition"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <motion.input
                  whileFocus={{ scale: 1.01, borderColor: "rgba(192,132,252,0.7)" }}
                  transition={{ duration: 0.2 }}
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-[#120a20] border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400/40 transition"
                />
              </motion.div>

              <motion.textarea
                variants={fadeUp}
                whileFocus={{ scale: 1.01, borderColor: "rgba(192,132,252,0.7)" }}
                transition={{ duration: 0.2 }}
                name="message"
                placeholder="How can we help you?"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-[#120a20] border border-purple-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-purple-400/40 transition"
              />

              <motion.button
                variants={fadeUp}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(168,85,247,0.35)" }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="mt-1 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-semibold rounded-xl py-3.5 transition-colors group"
              >
                Send Message
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <Send className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.form>
          </motion.div>
        </div>

        {/* ===================== Contact Information ===================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 md:mt-20 bg-[#0a0512]/70 border border-purple-500/10 rounded-[24px] p-6 sm:p-8"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-purple-400"
            />
            <h3 className="text-white text-base sm:text-lg font-semibold">
              Contact Information
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
            {contactCards.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                whileHover="hover"
                animate="rest"
                className="bg-[#120a20] border border-purple-500/15 rounded-2xl p-5 flex flex-col gap-3 cursor-default"
              >
                <motion.div
                  variants={{
                    rest: { y: 0, borderColor: "rgba(168,85,247,0.3)" },
                    hover: { y: -4, borderColor: "rgba(216,180,254,0.8)" },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full flex flex-col gap-3"
                >
                  <motion.div
                    variants={{
                      rest: { rotate: 0, scale: 1 },
                      hover: { rotate: -8, scale: 1.1 },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center"
                  >
                    <Icon className="w-4 h-4 text-purple-300" />
                  </motion.div>
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-gray-500 text-xs leading-snug whitespace-pre-line">
                    {value}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===================== Our Locations ===================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-8 md:mt-10"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <h3 className="text-white text-base sm:text-lg font-semibold">
              Our Locations
            </h3>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative bg-[#0a0512]/70 border border-purple-500/10 rounded-[24px] p-6 sm:p-8 grid md:grid-cols-[minmax(0,280px)_1fr] gap-8 items-center overflow-hidden"
          >
            {/* Locations list */}
            <div className="flex flex-col gap-6 relative z-10">
              {locations.map(({ title, tag, detail }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{title}</p>
                    <p className="text-gray-500 text-xs">{tag}</p>
                    <p className="text-gray-500 text-xs">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dotted world map placeholder */}
            {/* <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden">
              <svg viewBox="0 0 800 400" className="w-full h-full opacity-70" aria-hidden="true">
                <defs>
                  <pattern id="dotgrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="1.2" cy="1.2" r="1.2" fill="#7c3aed" opacity="0.55" />
                  </pattern>
                </defs>
                <g fill="url(#dotgrid)">
                  <ellipse cx="150" cy="150" rx="90" ry="60" />
                  <ellipse cx="230" cy="260" rx="55" ry="90" />
                  <ellipse cx="420" cy="140" rx="110" ry="70" />
                  <ellipse cx="430" cy="260" rx="60" ry="80" />
                  <ellipse cx="600" cy="150" rx="130" ry="80" />
                  <ellipse cx="650" cy="290" rx="70" ry="50" />
                </g>
              </svg>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                className="absolute left-[52%] top-[58%] -translate-x-1/2 -translate-y-1/2"
              >
                <MapPin className="w-6 h-6 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" fill="#a855f7" />
              </motion.div>
            </div> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Component ──────────────────────────────────────────────── */
const YourNextStep = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#get-in-touch') {
      setTimeout(() => {
        const element = document.getElementById('get-in-touch');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div style={{ background: "#0a0a12", color: "#fff", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes heroFloat {
          0%   { transform: scale(1.02) translateY(0px); }
          50%  { transform: scale(1.06) translateY(-10px); }
          100% { transform: scale(1.02) translateY(0px); }
        }
        @keyframes rayShimmer {
          0%   { opacity: 0;    transform: rotate(-15deg) translateX(-80px); }
          40%  { opacity: 0.22; }
          70%  { opacity: 0.1;  }
          100% { opacity: 0;    transform: rotate(-15deg) translateX(80px); }
        }
        @keyframes sparkBlink {
          0%,100% { opacity: 0;   transform: scale(0.6); }
          30%     { opacity: 1;   transform: scale(1.4); }
          50%     { opacity: 0.2; transform: scale(0.8); }
          70%     { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.6; }
          33%  { transform: translateY(-22px) translateX(10px) scale(1.3); opacity: 1;   }
          66%  { transform: translateY(-10px) translateX(-8px) scale(0.9); opacity: 0.7; }
          100% { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.6; }
        }
        @keyframes heroTextFade {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ynx-hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 72px 24px 100px;
          overflow: hidden;
        }
        .ynx-hero-container {
          position: relative;
          z-index: 4;
          width: 100%;
          max-width: 1200px;
          padding-left: 20px;
        }
        .ynx-hero-img {
          position: absolute;
          right: 0; top: 0;
          width: 55%; height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          animation: heroFloat 8s ease-in-out infinite;
          transform-origin: center center;
        }
        .ynx-hero-text {
          max-width: 520px;
          animation: heroTextFade 1s ease-out both;
        }

        @media (max-width: 768px) {
          .ynx-hero-section {
            padding: 80px 16px 60px;
            align-items: flex-end;
            min-height: 70vh;
          }
          .ynx-hero-container { padding-left: 0; }
          .ynx-hero-img {
            width: 100%;
            opacity: 0.85;
          }
          .ynx-hero-text { max-width: 100%; }
        }
        @media (max-width: 480px) {
          .ynx-hero-section { padding: 70px 16px 48px; }
        }

        .ynx-section-padding { padding: 0 40px 100px; }
        .ynx-section-padding-top { padding: 20px 40px 100px; }

        .ynx-process-container {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0;
        }
        .ynx-step-connector {
          flex-shrink: 0;
          width: 48px;
          height: 2px;
          border-top: 2px dashed rgba(168,85,247,0.4);
          margin-top: 28px;
        }

        .ynx-cta-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ynx-cta-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .ynx-section-padding { padding: 0 24px 60px; }
          .ynx-section-padding-top { padding: 10px 24px 60px; }

          .ynx-process-container { flex-direction: column; align-items: center; gap: 16px; }
          .ynx-step-wrapper { width: 100%; max-width: 320px; }
          .ynx-step-connector {
            width: 2px;
            height: 36px;
            border-top: none;
            border-left: 2px dashed rgba(168,85,247,0.4);
            margin: 8px 0;
          }
        }

        @media (max-width: 600px) {
          .ynx-cta-banner { justify-content: center; text-align: center; }
          .ynx-cta-content { flex-direction: column; gap: 12px; text-align: center; }
        }

        @media (max-width: 480px) {
          .ynx-section-padding { padding: 0 16px 50px; }
          .ynx-section-padding-top { padding: 10px 16px 50px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="ynx-hero-section">
        <img src="/staircase_hero.png" alt="" className="ynx-hero-img" loading="eager" decoding="async" style={{ transform: 'translateZ(0)' }} />

        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, #0a0a12 15%, rgba(10,10,18,0.7) 40%, rgba(10,10,18,0.05) 100%)",
          zIndex: 1,
        }} />

        <div style={{
          position: "absolute", right: "3%", top: 0,
          width: "200px", height: "100%",
          background: "linear-gradient(115deg, transparent 0%, rgba(210,160,255,0.15) 50%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
          animation: "rayShimmer 5s ease-in-out infinite",
        }} />

        <div style={{
          position: "absolute", right: "20%", top: 0,
          width: "120px", height: "100%",
          background: "linear-gradient(130deg, transparent 0%, rgba(200,150,255,0.1) 50%, transparent 100%)",
          zIndex: 2, pointerEvents: "none",
          animation: "rayShimmer 7s ease-in-out infinite 2s",
        }} />

        {[
          { right: "28%", top: "22%", size: 5, delay: "0s", dur: "1.2s" },
          { right: "24%", top: "38%", size: 4, delay: "0.4s", dur: "1.8s" },
          { right: "32%", top: "18%", size: 6, delay: "0.8s", dur: "1.4s" },
          { right: "19%", top: "32%", size: 3, delay: "1.2s", dur: "2s" },
          { right: "21%", top: "50%", size: 4, delay: "0.2s", dur: "1.6s" },
          { right: "35%", top: "30%", size: 3, delay: "1.5s", dur: "1.1s" },
          { right: "17%", top: "44%", size: 5, delay: "0.6s", dur: "2.2s" },
          { right: "26%", top: "60%", size: 3, delay: "1s", dur: "1.5s" },
        ].map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            right: p.right, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "rgba(240,200,255,1)",
            boxShadow: `0 0 ${p.size * 3}px ${p.size}px rgba(180,80,255,0.9)`,
            zIndex: 3, pointerEvents: "none",
            animation: `sparkBlink ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        {[
          { right: "27%", top: "28%", size: 6, delay: "0s", dur: "4s" },
          { right: "23%", top: "44%", size: 4, delay: "1s", dur: "5s" },
          { right: "31%", top: "21%", size: 5, delay: "2s", dur: "3.5s" },
          { right: "18%", top: "36%", size: 3, delay: "0.5s", dur: "6s" },
        ].map((p, i) => (
          <div key={`d${i}`} style={{
            position: "absolute",
            right: p.right, top: p.top,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: "rgba(220,180,255,0.8)",
            boxShadow: "0 0 10px 4px rgba(168,85,247,0.7)",
            zIndex: 3, pointerEvents: "none",
            animation: `particleFloat ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        <div className="ynx-hero-container">
          <div className="ynx-hero-text" style={{ marginTop: "-23vh" }}>
            <h1 style={{ fontSize: "clamp(68px,12.5vw,135px)", fontWeight: 900, lineHeight: 0.95, margin: 0 }}>
              YOUR<br />
              <span style={{ color: "#a855f7" }}>NEXT</span> STEP
            </h1>
            <div style={{ width: "40px", height: "4px", background: "#a855f7", borderRadius: "2px", margin: "18px 0 22px" }} />
            <p style={{ fontSize: "17px", color: "#ccc", lineHeight: 1.7, margin: 0 }}>
              From idea to reality.<br />
              We make the process simple and effective.
            </p>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="ynx-section-padding">
        <div style={{
          background: "#13131f",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
          padding: "40px 32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          <div className="ynx-process-container">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="ynx-step-wrapper" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 8px" }}>
                  <div style={{ width: "56px", height: "56px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                    {step.icon}
                  </div>

                  <div style={{
                    background: "#a855f7",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 700,
                    borderRadius: "50px",
                    padding: "3px 12px",
                    marginBottom: "12px",
                    letterSpacing: "0.05em",
                  }}>
                    {step.num}
                  </div>

                  <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 8px", color: "#fff" }}>{step.title}</h3>
                  <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="ynx-step-connector" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="ynx-section-padding-top">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, marginBottom: "8px" }}>What We Do</h2>
          <div style={{ width: "40px", height: "4px", background: "#a855f7", borderRadius: "2px", marginBottom: "36px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {services.map((svc, idx) => (
              <div key={idx} style={{
                background: "#13131f",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "28px 24px",
                transition: "border-color 0.3s, transform 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: "52px", height: "52px",
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  borderRadius: "12px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "18px",
                }}>
                  {svc.icon}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", color: "#fff" }}>{svc.title}</h3>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.65, margin: 0 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH (merged) ── */}
      <GetTouch />
    </div>
  );
};

export default YourNextStep;