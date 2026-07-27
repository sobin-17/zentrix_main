import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MapPin, Clock, Zap, Users, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
import { addContactMessage } from "../services/contactService";

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
  const [form, setForm] = useState({ name: "", email: "", countryCode: "+91", phone: "", message: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const countryCodes = [
    { code: "+91", label: "🇮🇳 +91 (IN)" },
    { code: "+1", label: "🇺🇸 +1 (US)" },
    { code: "+44", label: "🇬🇧 +44 (UK)" },
    { code: "+61", label: "🇦🇺 +61 (AU)" },
    { code: "+971", label: "🇦🇪 +971 (UAE)" },
    { code: "+65", label: "🇸🇬 +65 (SG)" },
    { code: "+966", label: "🇸🇦 +966 (SA)" },
    { code: "+49", label: "🇩🇪 +49 (DE)" },
    { code: "+33", label: "🇫🇷 +33 (FR)" },
    { code: "+81", label: "🇯🇵 +81 (JP)" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (form.countryCode === "+91" && val.length > 10) return;
    setForm({ ...form, phone: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (form.countryCode === "+91" && form.phone.length !== 10) {
      setError("Indian phone number must be exactly 10 digits.");
      return;
    }

    if (form.countryCode !== "+91" && (form.phone.length < 6 || form.phone.length > 15)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setLoading(true);
    try {
      await addContactMessage({
        name: form.name,
        email: form.email,
        phone: `${form.countryCode} ${form.phone}`,
        message: form.message,
      });

      setSubmitted(true);

      setForm({
        name: "",
        email: "",
        countryCode: "+91",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
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
    <section className="relative bg-[#07020f] min-h-screen overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 md:px-10">
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
        className="absolute top-10 right-1/4 w-[480px] h-[480px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let’s Build Something{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
              Great Together
            </span>
          </h1>
          <p className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, a question about our services, or want to partner up?
            Drop us a message and we’ll get back to you quickly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-white text-xl sm:text-2xl font-bold">
                Why reach out to Zentrix?
              </h2>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Whether you're looking for web development, app solutions, digital marketing, or professional training, our experts are ready to collaborate.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4 mt-2">
              {perks.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{ x: 6, borderColor: "rgba(168,85,247,0.4)" }}
                  className="flex items-start gap-4 bg-[#0d0618]/70 border border-purple-500/15 rounded-2xl p-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold">{title}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 relative bg-[#0d0618]/80 backdrop-blur border border-purple-500/20 rounded-[24px] p-6 sm:p-8"
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

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-xs sm:text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center"
              >
                {error}
              </motion.div>
            )}

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
                  required
                  placeholder="Your Name *"
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
                  required
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#120a20] border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400/40 transition"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex gap-2">
                <div className="relative shrink-0">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="h-full bg-[#120a20] border border-purple-500/20 rounded-xl px-3 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-400/40 cursor-pointer transition appearance-none pr-7"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#120a20] text-white">
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-[10px]">
                    ▼
                  </span>
                </div>

                <div className="relative flex-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <motion.input
                    whileFocus={{ scale: 1.01, borderColor: "rgba(192,132,252,0.7)" }}
                    transition={{ duration: 0.2 }}
                    type="tel"
                    name="phone"
                    required
                    maxLength={form.countryCode === "+91" ? 10 : 15}
                    placeholder={form.countryCode === "+91" ? "10-digit Phone Number *" : "Phone Number *"}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-[#120a20] border border-purple-500/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-400/40 transition"
                  />
                </div>
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
                disabled={loading}
                className="mt-1 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-semibold rounded-xl py-3.5 transition-colors group disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
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

      {/* ── Submitting Pop-up Loading Overlay ── */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#0e071e]/95 border border-purple-500/40 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.35)] flex flex-col items-center gap-5"
          >
            <div className="relative flex items-center justify-center w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin relative z-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">Sending Message...</h3>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">
                Please wait while we transmit your message.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Submitted Successfully Pop-up Screen ── */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative bg-[#0e071e]/95 border border-purple-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_60px_rgba(168,85,247,0.4)] flex flex-col items-center gap-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border border-purple-300/40 flex items-center justify-center shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">Message Sent Successfully! 🎉</h3>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-4">
              Thank you for contacting Zentrix Technology! Our support team has received your message and will respond to you shortly.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg transition-all"
            >
              Done & Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default GetTouch;