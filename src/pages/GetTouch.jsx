import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MapPin, Clock, Zap, Users, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const GetTouch = () => {
    const [particles] = useState(() => {
        const colors = ['#00c6ff', '#a855f7', '#ec4899', '#ffffff'];
        return Array.from({ length: 80 }).map((_, i) => ({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // hook up to your backend / email service here
    console.log(form);
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
    { title: "Nagercoil, Tamil Nadu", tag: "Head Office", detail: "Nagercoil, Tamil Nadu, India" },
    { title: "Kerala Office", tag: "Branch Office", detail: "Kerala, India" },
  ];

  return (
    <section className="relative bg-[#07020f] min-h-screen overflow-hidden py-16 md:py-24 px-4 sm:px-6 md:px-10">
      {/* Ambient purple glow, top right — slow breathing motion */}
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
        '--tx': p.tx,
        '--ty': p.ty,
        '--duration': `${p.duration}s`,
        '--delay': `${p.delay}s`,
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
            <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden">
              <svg
                viewBox="0 0 800 400"
                className="w-full h-full opacity-70"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="dotgrid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="1.2" cy="1.2" r="1.2" fill="#7c3aed" opacity="0.55" />
                  </pattern>
                </defs>
                {/* rough world-map-ish blob mask using simple continents shapes */}
                <g fill="url(#dotgrid)">
                  <ellipse cx="150" cy="150" rx="90" ry="60" />
                  <ellipse cx="230" cy="260" rx="55" ry="90" />
                  <ellipse cx="420" cy="140" rx="110" ry="70" />
                  <ellipse cx="430" cy="260" rx="60" ry="80" />
                  <ellipse cx="600" cy="150" rx="130" ry="80" />
                  <ellipse cx="650" cy="290" rx="70" ry="50" />
                </g>
              </svg>

              {/* Pin markers */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
                className="absolute left-[52%] top-[58%] -translate-x-1/2 -translate-y-1/2"
              >
                <MapPin className="w-6 h-6 text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" fill="#a855f7" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetTouch;