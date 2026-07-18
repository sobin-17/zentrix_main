import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Users, Lightbulb, TrendingUp, Handshake, BookOpen, Trophy, LineChart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const jobOpenings = [
  {
    id: "python",
    title: "Python Developer Intern",
    experience: "3 – 6 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Learn Python programming, backend development, automation, and real-world software development practices."
  },
  {
    id: "mern",
    title: "Mern Stack Intern",
    experience: "3 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Build modern web applications using MongoDB, Express.js, React, and Node.js through hands-on projects."
  },
  {
    id: "uiux",
    title: "UI / UX Intern",
    experience: "3 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Create user-friendly interfaces, wireframes, prototypes, and engaging digital experiences using industry-standard tools."
  },
  {
    id: "graphic",
    title: "Graphic Design Intern",
    experience: "3 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Design creative visuals, social media content, branding materials, and marketing assets."
  },
  {
    id: "video",
    title: "Video Editor Intern",
    experience: "3 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Edit and enhance videos, add visual effects, transitions, and create engaging multimedia content."
  },
  {
    id: "digital",
    title: "Digital Marketing Intern",
    experience: "3 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Learn social media marketing, content strategy, campaign management, and online brand promotion."
  },
  {
    id: "seo",
    title: "SEO Analyst Intern",
    experience: "3 Months",
    type: "Internship",
    location: "Nagercoil, Tamil Nadu",
    description:
      "Optimize websites for search engines, conduct keyword research, and improve online visibility and rankings."
  }
];
const Careers = () => {
  const [expandedJobId, setExpandedJobId] = useState(null);

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

  const toggleJob = (id) => {
    if (expandedJobId === id) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(id);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white pb-16 font-poppins relative overflow-hidden">

      {/* ================= HERO SECTION — Full-width banner ================= */}
      <section className="relative w-full min-h-[32vh] lg:min-h-[85vh] overflow-hidden">        {/* Full-bleed hand image as banner background */}
        <div className="absolute inset-0 w-full h-full z-0">
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
          {/* Hand image */}
          <motion.img
            src="/career_hand.png"
            alt=""
            className="absolute top-[18%] md:top-[8%] lg:top-auto lg:-bottom-18 right-[-5%] lg:right-0 w-[65%] md:w-[50%] lg:w-[80%] xl:w-full object-contain pointer-events-none opacity-90 lg:opacity-100 mix-blend-screen lg:mix-blend-normal"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 1.5, 0, -1.5, 0],
              scale: [1, 1.01, 1],
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{
              scale: 1.05,
              y: -6,
              filter: "brightness(1.15) drop-shadow(0 0 70px rgba(168,85,247,0.8))",
              transition: { duration: 0.3 },
            }}
          />
          {/* Purple Glow */}
          <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#8B2EFF] opacity-30 blur-[220px] rounded-full"></div>
        </div>

        {/* Hero text content — overlaid on image */}
        <div className="absolute top-8 left-0 right-0 z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-none">

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-5">

            {/* Career Heading */}
            <h1 className="text-[64px] sm:text-[90px] md:text-[110px] lg:text-[150px] font-black leading-[1] lg:leading-[0.85] tracking-tight text-white relative z-10">
              Career
            </h1>

            {/* Right Side */}
            <div className="pt-1 sm:pt-3 lg:pt-6 max-w-[700px] relative z-10 pointer-events-auto">

              <h2 className="text-white font-semibold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] leading-tight lg:leading-none">
                "Your Career Our Mission"
              </h2>

              <p className="mt-2.5 lg:mt-2 text-gray-300 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.65] lg:leading-5 max-w-[650px] pr-4 sm:pr-0">
                At Zentrix Technologies, we create opportunities to learn, create,
                and innovate together.
              </p>

            </div>

          </div>

        </div>
        {/* Removed Duplicate Bottom Left Description as it was causing unnatural vertical layout jumps on tablets */}
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* ================= WHY WORK WITH US ================= */}
        <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden pt-0 pb-6 lg:py-12">
          {/* Stage backdrop — pure black so it blends with page */}
          <div className="absolute inset-0 bg-black" />

          {/* Main elliptical spotlight glow behind the heading */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "1400px",
              height: "650px",
              background:
                "radial-gradient(ellipse at center, rgba(190,130,255,0.55) 0%, rgba(139,46,255,0.35) 25%, rgba(80,20,160,0.18) 50%, transparent 75%)",
              filter: "blur(60px)",
            }}
          />

          {/* Soft warm-white core highlight (lamp hot-spot) */}
          <div
            className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "700px",
              height: "220px",
              background:
                "radial-gradient(ellipse at center, rgba(255,240,255,0.35) 0%, rgba(220,180,255,0.15) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Subtle bottom fade so the stage dissolves into the page */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />


          {/* ================= CONTENT ================= */}
          <div className="relative z-10 flex flex-col items-center justify-between h-full">

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


            {/* Heading */}
            <div className="pt-0 md:pt-4 lg:pt-14 text-center">

              <h2 className="text-white font-black text-[60px] sm:text-[82px] md:text-[105px] lg:text-[120px] leading-none">
                Why Work
              </h2>

              <h3 className="-mt-2 md:-mt-4 ml-[100px] md:ml-[190px] text-[28px] sm:text-[38px] md:text-[48px] lg:text-[56px] font-light text-[#D1B2FF] leading-none">
                with us?
              </h3>

            </div>

            {/* Description */}
            <div className="mt-6 md:mt-12 pb-8 md:pb-20 px-6 flex justify-center">

              <p className="max-w-[760px] text-center text-gray-300 text-[14px] md:text-[16px] leading-relaxed md:leading-8 font-light">
                At Zentrix Technology, we believe in innovation,
                continuous learning, and professional growth.
                We provide a collaborative environment where
                creativity thrives, skills are developed through
                real-world projects, and every contribution is valued.
                Join us to gain practical experience, explore new
                opportunities, and build a successful future in technology.
              </p>

            </div>

          </div>

        </section>
        {/* ================= WORK CULTURE ================= */}
        {/* ================= WORK CULTURE ================= */}
        <section className="relative bg-[#02010A] overflow-hidden py-8 font-poppins">

          {/* ── Top-left abstract dot grid ── */}
          <div className="absolute top-10 left-10 opacity-30 pointer-events-none">
            {Array.from({ length: 5 }).map((_, row) => (
              <div key={row} className="flex gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, col) => (
                  <div key={col} className="w-1 h-1 rounded-full bg-indigo-400" />
                ))}
              </div>
            ))}
          </div>

          {/* ── Heading ── */}
          <motion.div
            className="relative z-20 text-center px-6 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-extrabold leading-none tracking-tight mb-2" style={{ fontSize: 'clamp(48px, 6vw, 76px)' }}>
              <span className="text-white">Work </span>
              <span style={{
                background: 'linear-gradient(90deg, #c084fc 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Culture</span>
            </h2>

            {/* Center glowing dot and thin line */}
            <div className="flex items-center justify-center gap-2 max-w-[200px] mx-auto mt-4 mb-8">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-purple-500" />
              <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]" />
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-blue-500" />
            </div>
          </motion.div>

          {/* ── Description ── */}
          <motion.div
            className="relative z-20 text-center px-6 mb-4 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <p className="mx-auto max-w-[850px] text-gray-300 text-[14px] md:text-[17px] leading-relaxed md:leading-8 font-normal">
              We foster a collaborative, innovative, and growth-oriented work culture
              where creativity is encouraged and every contribution matters. Our team thrives
              on continuous learning, teamwork, and real-world problem-solving, creating an
              environment that empowers individuals to develop skills, share ideas,
              and achieve professional success.
            </p>
          </motion.div>

          {/* ── Main visual area (Background & Hexagons) ── */}
          <div className="relative w-[100vw] left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden flex items-center justify-center p-0 h-[450px] md:h-[min(75vh,750px)] md:min-h-[500px]">

            {/* Main Background Image with Animation */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src="/workculture image new.png"
                alt="Work Culture Virtual Background"
                className="w-full h-full object-cover object-center max-w-none"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* ── Attractive Moving Animated Neon Waves ── */}
              <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none mix-blend-screen">
                {/* Deep Purple Wave */}
                <motion.div
                  className="absolute left-[-20%] top-[45%] w-[140%] h-[350px] border-t-2 border-purple-500/50 rounded-[100%] shadow-[0_-15px_40px_rgba(168,85,247,0.5)]"
                  style={{ filter: "blur(5px)" }}
                  animate={{ y: [0, -40, 0], rotate: [-3, 3, -3] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Electric Blue Wave */}
                <motion.div
                  className="absolute left-[-30%] top-[55%] w-[160%] h-[400px] border-t-[3px] border-blue-400/50 rounded-[100%] shadow-[0_-20px_50px_rgba(59,130,246,0.6)]"
                  style={{ filter: "blur(8px)" }}
                  animate={{ y: [0, 50, 0], rotate: [4, -4, 4], scale: [1, 1.05, 1] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* Hot Pink Subtle Wave */}
                <motion.div
                  className="absolute left-[-10%] top-[30%] w-[120%] h-[200px] border-t-[1.5px] border-pink-500/60 rounded-[100%] shadow-[0_-10px_25px_rgba(236,72,153,0.5)]"
                  style={{ filter: "blur(4px)" }}
                  animate={{ y: [-20, 20, -20], rotate: [-6, 6, -6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
              </div>

              {/* Edge gradients to softly blend into the black background at the very rims */}
              <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#02010A] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#02010A] to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#02010A] via-[#02010A]/80 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#02010A] via-[#02010A]/80 to-transparent pointer-events-none" />
            </motion.div>

            {/* ── Symmetrical Floating Hexagons Arch (8 Total) ── */}

            {/* Top Center-Left: Empowering */}
            <motion.div
              className="absolute z-20 left-[25%] md:left-[30%] top-[5%] md:top-[8%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              animate={{ y: [-4, 4, -4] }} style={{ animationDuration: '4.2s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.7)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-cyan)" strokeWidth="2" fill="rgba(5,20,30,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-cyan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs>
                </svg>
                <Star className="w-6 h-6 md:w-7 md:h-7 text-cyan-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Empowering</span>
              </div>
            </motion.div>

            {/* Top Center-Right: Tech Driven */}
            <motion.div
              className="absolute z-20 right-[25%] md:right-[30%] top-[5%] md:top-[8%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              animate={{ y: [4, -4, 4] }} style={{ animationDuration: '4.6s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-red)" strokeWidth="2" fill="rgba(30,5,5,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-red" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f87171" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
                </svg>
                <Zap className="w-6 h-6 md:w-7 md:h-7 text-red-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Tech<br />Driven</span>
              </div>
            </motion.div>

            {/* Left Top: Collaborative */}
            <motion.div
              className="absolute z-20 left-[10%] md:left-[14%] top-[18%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
              animate={{ y: [-5, 5, -5] }} style={{ animationDuration: '4s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(236,72,153,0.7)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-pink)" strokeWidth="2" fill="rgba(20,5,15,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-pink" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#db2777" /></linearGradient></defs>
                </svg>
                <Handshake className="w-6 h-6 md:w-7 md:h-7 text-pink-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Collaborative</span>
              </div>
            </motion.div>

            {/* Left Middle: People First */}
            <motion.div
              className="absolute z-20 left-[4%] md:left-[6%] top-[50%] -translate-y-1/2 flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
              animate={{ y: [-8, 8, -8] }} style={{ animationDuration: '5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-purple)" strokeWidth="2" fill="rgba(20,5,40,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-purple" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#d8b4fe" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
                </svg>
                <Users className="w-6 h-6 md:w-7 md:h-7 text-purple-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">People<br />First</span>
              </div>
            </motion.div>

            {/* Left Bottom: Success Driven */}
            <motion.div
              className="absolute z-20 left-[10%] md:left-[14%] bottom-[18%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.7 }}
              animate={{ y: [6, -6, 6] }} style={{ animationDuration: '6.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-amber)" strokeWidth="2" fill="rgba(30,15,5,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-amber" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#fde68a" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs>
                </svg>
                <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Success<br />Driven</span>
              </div>
            </motion.div>

            {/* Right Top: Innovate Everyday */}
            <motion.div
              className="absolute z-20 right-[10%] md:right-[14%] top-[18%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
              animate={{ y: [7, -7, 7] }} style={{ animationDuration: '5.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-blue)" strokeWidth="2" fill="rgba(5,15,40,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-blue" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#93c5fd" /><stop offset="100%" stopColor="#3b82f6" /></linearGradient></defs>
                </svg>
                <Lightbulb className="w-6 h-6 md:w-7 md:h-7 text-blue-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Innovate<br />Everyday</span>
              </div>
            </motion.div>

            {/* Right Middle: Continuous Learning */}
            <motion.div
              className="absolute z-20 right-[4%] md:right-[6%] top-[50%] -translate-y-1/2 flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
              animate={{ y: [-6, 6, -6] }} style={{ animationDuration: '4.8s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-green)" strokeWidth="2" fill="rgba(5,30,15,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-green" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6ee7b7" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
                </svg>
                <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-green-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Continuous<br />Learning</span>
              </div>
            </motion.div>

            {/* Right Bottom: Grow Together */}
            <motion.div
              className="absolute z-20 right-[10%] md:right-[14%] bottom-[18%] flex flex-col items-center justify-center"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }}
              animate={{ y: [-5, 5, -5] }} style={{ animationDuration: '4.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}
            >
              <div className="relative flex flex-col items-center justify-center w-[90px] h-[105px] md:w-[110px] md:h-[125px]">
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]" viewBox="0 0 100 115" fill="none">
                  <polygon points="50,2 98,28 98,85 50,113 2,85 2,28" stroke="url(#hex-indigo)" strokeWidth="2" fill="rgba(15,10,40,0.5)" strokeLinejoin="round" />
                  <defs><linearGradient id="hex-indigo" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                </svg>
                <LineChart className="w-6 h-6 md:w-7 md:h-7 text-indigo-200 mb-1 relative z-10 drop-shadow-[0_0_8px_white]" strokeWidth={2} />
                <span className="text-white text-[10px] md:text-[11px] font-bold text-center leading-tight relative z-10 px-2 mt-1">Grow<br />Together</span>
              </div>
            </motion.div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02010A] to-transparent pointer-events-none z-10" />
          </div>

          {/* ── 6 Feature Cards ── */}
          <div className="relative z-20 w-full px-4 md:px-8 mt-12 pb-14">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
              {[
                { icon: Handshake, title: 'Collaborative', desc: 'We believe in the power of teamwork and open communication.' },
                { icon: Lightbulb, title: 'Innovative', desc: 'We encourage creativity and new ideas to solve real-world challenges.' },
                { icon: LineChart, title: 'Growth-Oriented', desc: 'We support continuous learning and personal & professional growth.' },
                { icon: Users, title: 'Empowering', desc: 'We empower individuals to take ownership and make an impact.' },
                { icon: BookOpen, title: 'Continuous Learning', desc: 'We promote knowledge sharing and skill development.' },
                { icon: Trophy, title: 'Success Driven', desc: 'We celebrate achievements and strive for excellence together.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="relative flex flex-col items-center text-center px-4 py-8 rounded-[20px] overflow-hidden group bg-[#060414] border border-white/5"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Neon border glow overlay mapped to the top */}
                  <div className="absolute inset-x-0 top-0 h-[30%] opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)' }} />
                  <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_#a855f7]" />

                  {/* Icon with circular thin outline */}
                  <div className="relative w-14 h-14 rounded-full border-[1.5px] border-white/20 flex items-center justify-center mb-6 group-hover:border-purple-400/50 transition-colors duration-300 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
                    <item.icon className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] group-hover:text-purple-300 group-hover:drop-shadow-[0_0_10px_#a855f7] transition-all duration-300" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-white font-[700] text-[13px] mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-gray-400 text-[11.5px] leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Marquee tagline ── */}
          <div className="relative z-20 flex justify-center items-center pb-8 border-b-2 border-indigo-900/30">
            <div className="flex flex-wrap justify-center items-center gap-y-3 gap-x-3 md:gap-x-4 text-[11px] md:text-[14px] text-gray-300 font-light tracking-wider px-4">
              <span className="whitespace-nowrap">Together We Create</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
              <span className="whitespace-nowrap">Together We Grow</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7] hidden sm:block" />
              <span className="whitespace-nowrap mt-1 sm:mt-0">Together We Succeed</span>
            </div>
          </div>

        </section>
        {/* ================= CURRENT OPENINGS ================= */}
        <section id="openings" className="relative pt-4 md:pt-16 pb-12">
          <div className="relative flex justify-center items-center">
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

            {/* Background Image */}
            <motion.img
              src="/career_current1.png"
              className="w-[1350px] md:w-[1450px] lg:w-[1550px] max-w-none h-auto object-contain -translate-y-4 md:-translate-y-12"
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Foreground particles — floats OVER the image */}
            <div className="absolute inset-0 z-[5] pointer-events-none">
              {particles.slice(40, 80).map((p) => (
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
            </div>

            {/* Content on Image */}
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-[24%]">

              <h2 className="text-white font-black leading-none tracking-tight
                 text-[72px] sm:text-[95px] md:text-[120px] lg:text-[145px]">
                Current
              </h2>

              <h3 className="-mt-3 text-[#C88BFF]
                 font-extralight tracking-tight
                 text-[38px] sm:text-[42px] md:text-[52px] lg:text-[64px]">
                Openings
              </h3>

            </div>

          </div>


          {/* Job listings accordion */}
          <div className="max-w-4xl mx-auto flex flex-col gap-4 relative z-10 -mt-16">
            {jobOpenings.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className={`border border-white/5 rounded-2xl transition-all duration-300 bg-white/[0.01] hover:bg-white/[0.03] overflow-hidden ${isExpanded ? 'border-[var(--color-brand-purple)] bg-white/[0.03]' : ''
                    }`}
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => toggleJob(job.id)}
                    className="w-full px-6 py-6 md:px-8 text-left flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-purple-light)] mb-1">
                        {job.type}
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-6 text-xs text-slate-400">
                        <span>{job.experience}</span>
                        <span>&bull;</span>
                        <span>{job.department}</span>
                      </div>
                    </div>
                    <div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-white/5 pt-6 bg-black/40">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Role Description & Responsibilities:
                      </h5>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                        {job.description}
                      </p>
                      <Link
                        to={`/career/${job.id}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-brand-purple)] hover:bg-purple-700 text-white text-xs font-bold rounded-full transition-all tracking-wider uppercase"
                      >
                        Apply Now <span>↗</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= GROWTH / OPPORTUNITIES ================= */}
        <section className="py-12 text-center relative">

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


          <div className="mb-16 text-left ml-6 md:ml-10 pr-6">
            {/* Small Caption */}
            <p className="text-[20px] md:text-[22px] font-normal text-[#8B8B8B] mb-4 tracking-[0.02em]">
              What's Waiting for you
            </p>

            {/* Heading */}
            <div className="flex flex-col md:flex-row md:items-end gap-0 md:gap-2">

              <h2 className="text-white font-bold leading-none
                   text-[68px] sm:text-[90px] md:text-[110px] lg:text-[130px]
                   tracking-[-0.05em]">
                Growth
              </h2>

              <span
                className="text-[#8C8C8C] font-extralight
                 text-[36px] sm:text-[42px] md:text-[52px] lg:text-[60px]
                 leading-[1.1] md:leading-none md:mb-4"
              >
                Opportunities
              </span>

            </div>

          </div>

          {/* Diamond diagram */}
          <div className="relative max-w-3xl mx-auto px-4" style={{ height: '820px' }}>

            {/* Animated SVG Lines behind nodes */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
              viewBox="0 0 780 780"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9d00ff" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#d470ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9d00ff" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Static dim base lines — top & bottom now equal length */}
              <line x1="390" y1="120" x2="150" y2="380" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="2.2" />
              <line x1="390" y1="120" x2="630" y2="380" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="2.2" />
              <line x1="150" y1="380" x2="390" y2="640" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="2.2" />
              <line x1="630" y1="380" x2="390" y2="640" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="2.2" />

              {/* Animated glowing lines */}
              <line x1="390" y1="120" x2="150" y2="380" stroke="url(#lineGrad)" strokeWidth="3">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="stroke-dasharray" from="0 500" to="500 0" dur="2.5s" repeatCount="indefinite" />
              </line>
              <line x1="390" y1="120" x2="630" y2="380" stroke="url(#lineGrad)" strokeWidth="3">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-dasharray" from="0 500" to="500 0" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
              </line>
              <line x1="150" y1="380" x2="390" y2="640" stroke="url(#lineGrad)" strokeWidth="3">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                <animate attributeName="stroke-dasharray" from="0 500" to="500 0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
              </line>
              <line x1="630" y1="380" x2="390" y2="640" stroke="url(#lineGrad)" strokeWidth="3">
                <animate attributeName="stroke-dashoffset" from="500" to="0" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                <animate attributeName="stroke-dasharray" from="0 500" to="500 0" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
              </line>
            </svg>

            {/* ===================== NODES ===================== */}

            {/* TOP — Experience */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: "20px", zIndex: 10 }}>
              <p className="text-slate-300 text-[14px] font-medium mb-4 text-center whitespace-nowrap leading-6">
                Hands-On Software Development Experience
              </p>
              <div
                className="w-48 h-48 rounded-full p-[3px] animate-pulse-glow-purple"
                style={{
                  background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
                  boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[24px] text-center px-4">
                  Experience
                </div>
              </div>
            </div>

            {/* LEFT — Mentorship */}
            <div className="absolute flex flex-col items-center" style={{ left: "10%", top: "49%", transform: "translateY(-50%)", zIndex: 10 }}>
              <div
                className="w-48 h-48 rounded-full p-[3px] animate-pulse-glow-purple"
                style={{
                  animationDelay: "0.7s",
                  background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
                  boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[24px] text-center px-4">
                  Mentorship
                </div>
              </div>
              <p className="text-slate-300 text-[14px] font-medium mt-4 max-w-[270px] text-center whitespace-nowrap leading-6">
                Expert Mentorship &amp; Career Guidance
              </p>
            </div>

            {/* RIGHT — Career Growth */}
            <div className="absolute flex flex-col items-center" style={{ right: "10%", top: "49%", transform: "translateY(-50%)", zIndex: 10 }}>
              <div
                className="w-48 h-48 rounded-full p-[3px] animate-pulse-glow-purple"
                style={{
                  animationDelay: "1.4s",
                  background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
                  boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[24px] text-center px-4">
                  Career<br />Growth
                </div>
              </div>
              <p className="text-slate-300 text-[14px] font-medium mt-4 max-w-[270px] text-center whitespace-nowrap leading-6">
                Performance-Based Career Growth
              </p>
            </div>

            {/* BOTTOM — Tech Ideas */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: "20px", zIndex: 10 }}>
              <div
                className="w-48 h-48 rounded-full p-[3px] animate-pulse-glow-purple"
                style={{
                  animationDelay: "2.1s",
                  background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
                  boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[24px] text-center px-4">
                  Tech<br />Ideas
                </div>
              </div>
              <p className="text-slate-300 text-[14px] font-medium mt-4 max-w-[310px] text-center whitespace-nowrap leading-6">
                Exposure to Emerging Technologies &amp; Industry Practices
              </p>
            </div>

          </div>
        </section>

      </div >
    </main >
  );
};

export default Careers;   