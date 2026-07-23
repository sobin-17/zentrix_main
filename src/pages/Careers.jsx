import React, { useEffect,useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, Users, Lightbulb, TrendingUp, Handshake, BookOpen, Trophy, LineChart, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCareers } from "../services/careerService";
import { ensureCareerJobIds } from "../utils/jobIdHelper";


const Careers = () => {
  const [jobOpenings, setJobOpenings] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const rawCareers = await getCareers();
        const formatted = ensureCareerJobIds(rawCareers);

        // Only show active careers
        setJobOpenings(
          formatted.filter(job => job.status === "Active")
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadCareers();
  }, []);

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
      <section className="relative w-full overflow-hidden">

  {/* Background */}
  <div className="absolute inset-0 z-0 overflow-hidden bg-black">

    {/* Particles */}
    {particles.map((p) => (
      <div
        key={p.id}
        className="service-particle absolute"
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

    {/* Hand Image */}
    <motion.img
      src="/career_hand.png"
      alt="Career opportunities at Zentrix Technologies"
      className="
  absolute
  z-30
  top-auto
  bottom-0

  right-[-5%]
  sm:right-[-2%]
  md:right-[0%]
  lg:right-[5%]
  xl:right-[8%]
  2xl:right-[10%]

  w-[100%]
  sm:w-[85%]
  md:w-[68%]
  lg:w-[74%]
  xl:w-[82%]
  2xl:w-[88%]

  object-contain
  pointer-events-none
  opacity-90
  lg:opacity-100
  mix-blend-screen
"
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      animate={{
        y: [0, -12, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
        scale: [1, 1.015, 1],
      }}
      transition={{
        opacity: { duration: 1.2 },
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      }}
    />

    {/* Purple Glow */}
    <div
      className="
        absolute
        left-1/2
        -translate-x-1/2
        bottom-[-120px]
        sm:bottom-[-160px]
        lg:bottom-[-200px]

        w-[500px]
        sm:w-[700px]
        md:w-[900px]
        lg:w-[1200px]

        h-[250px]
        sm:h-[350px]
        md:h-[450px]
        lg:h-[600px]

        rounded-full
        bg-[#8B2EFF]/30
        blur-[60px]
        md:blur-[140px]
      "
    />
  </div>

  {/* Hand Image — Positioned behind text at z-1 */}
  <motion.div
    className="
      absolute
      z-1
      bottom-0

      right-[-5%]
      sm:right-[-2%]
      md:right-[0%]
      lg:right-[5%]
      xl:right-[8%]
      2xl:right-[10%]

      w-[100%]
      sm:w-[85%]
      md:w-[68%]
      lg:w-[74%]
      xl:w-[82%]
      2xl:w-[88%]

      pointer-events-none
    "
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  >
    <motion.img
      src="/career_hand.png"
      alt="Career opportunities at Zentrix Technologies"
      className="
        w-full
        h-auto
        object-contain
        pointer-events-none
        opacity-85
        md:opacity-100
        mix-blend-screen
      "
      animate={{
        y: [0, -12, 0],
        rotate: [0, 1.2, 0, -1.2, 0],
        scale: [1, 1.012, 1],
      }}
      transition={{
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  </motion.div>

  {/* Hero Content — Positioned at z-20 above hand */}
  <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-[80px] sm:pb-[100px] md:pb-[120px] lg:pb-[180px] xl:pb-[200px] 2xl:pb-[220px]">

    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">

      {/* Left */}
      <div>

        <h1
          className="
            text-white
            font-black
            leading-[0.9]
            tracking-[-0.04em]

            text-5xl
            sm:text-7xl
            md:text-8xl
            lg:text-[120px]
            xl:text-[150px]
            2xl:text-[170px]
          "
        >
          Career
        </h1>

      </div>

      {/* Right */}
      <div className="max-w-xl lg:pt-10">

        <h2
          className="
            text-white
            font-semibold

            text-lg
            sm:text-xl
            md:text-2xl
            lg:text-3xl
          "
        >
          "Your Career Our Mission"
        </h2>

        <p
          className="
            mt-4
            text-gray-300
            leading-relaxed

            text-sm
            sm:text-base
            md:text-lg
          "
        >
          At Zentrix Technologies, we create opportunities to learn,
          create, innovate, and grow together. Join a passionate team
          building impactful technology while shaping your future.
        </p>

      </div>

    </div>

  </div>

</section>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* ================= WHY WORK WITH US ================= */}
        <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden pt-4 pb-6 lg:pb-12 bg-black">
          {/* Stage backdrop — pure black so it blends with page */}
          <div className="absolute inset-0 bg-black" />

          {/* Smooth Top Gradient Fade so Why Work blends seamlessly with Hero */}
          <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Main elliptical spotlight glow behind the heading */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: "1400px",
              height: "650px",
              background:
                "radial-gradient(ellipse at center, rgba(190,130,255,0.45) 0%, rgba(139,46,255,0.25) 30%, rgba(80,20,160,0.1) 55%, transparent 80%)",
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
                "radial-gradient(ellipse at center, rgba(255,240,255,0.25) 0%, rgba(220,180,255,0.1) 40%, transparent 70%)",
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
            <div className="pt-0 md:pt-4 lg:pt-4 text-center">

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
        <section className="relative w-screen left-1/2 -translate-x-1/2 bg-[#02010A] overflow-hidden pt-8 pb-0 font-poppins">

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
          <div className="relative w-full overflow-hidden flex items-center justify-center p-0 h-[450px] md:h-[min(75vh,750px)] md:min-h-[500px]">

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

              {/* ── Animated Neon Waves ── */}
              <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none md:mix-blend-screen">
                {/* Deep Purple Wave */}
                <motion.div
                  className="absolute left-[-20%] top-[45%] w-[140%] h-[350px] border-t-2 border-purple-500/50 rounded-[100%] shadow-[0_-10px_25px_rgba(168,85,247,0.4)]"
                  style={{ transform: 'translateZ(0)' }}
                  animate={{ y: [0, -30, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Electric Blue Wave */}
                <motion.div
                  className="absolute left-[-30%] top-[55%] w-[160%] h-[400px] border-t-[3px] border-blue-400/50 rounded-[100%] shadow-[0_-15px_30px_rgba(59,130,246,0.5)]"
                  style={{ transform: 'translateZ(0)' }}
                  animate={{ y: [0, 40, 0], rotate: [3, -3, 3] }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* Hot Pink Subtle Wave */}
                <motion.div
                  className="absolute left-[-10%] top-[30%] w-[120%] h-[200px] border-t-[1.5px] border-pink-500/60 rounded-[100%] shadow-[0_-8px_20px_rgba(236,72,153,0.4)]"
                  style={{ transform: 'translateZ(0)' }}
                  animate={{ y: [-15, 15, -15], rotate: [-4, 4, -4] }}
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



          {/* ── Marquee tagline ── */}
          <div className="relative z-20 flex justify-center items-center pb-4 border-b-2 border-indigo-900/30">
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
        <section
  id="openings"
  className="relative overflow-hidden pt-0 pb-12 md:pb-20"
>
  <div className="relative flex items-center justify-center">

    {/* Background Particles */}
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

    {/* Hero Image */}
    <motion.img
      src="/career_current1.png"
      alt="Current Openings"
      className="
        w-full
        max-w-[340px]
        sm:max-w-[520px]
        md:max-w-[720px]
        lg:max-w-[950px]
        xl:max-w-[1150px]
        2xl:max-w-[1350px]
        h-auto
        object-contain
        mx-auto
      "
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

    {/* Foreground Particles */}
    <div className="absolute inset-0 z-10 pointer-events-none">
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
            "--tx": p.tx,
            "--ty": p.ty,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          }}
        />
      ))}
    </div>

    {/* Hero Text */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

      <h2
        className="
          text-white
          font-black
          leading-none
          tracking-tight
          text-5xl
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
          xl:text-[130px]
        "
      >
        Current
      </h2>

      <h3
        className="
          mt-1
          sm:mt-2
          md:mt-3
          text-[#C88BFF]
          font-extralight
          tracking-tight
          text-2xl
          sm:text-3xl
          md:text-4xl
          lg:text-5xl
          xl:text-6xl
        "
      >
        Openings
      </h3>

    </div>
  </div>

  {/* Job Accordion */}
  <div
  className="
    relative
    z-20
    max-w-4xl
    mx-auto
    px-4
    sm:px-6
    lg:px-0
    flex
    flex-col
    gap-4
    mt-4
    sm:mt-6
    md:mt-8
    lg:mt-10
  "
>
    {jobOpenings.map((job) => {
      const isExpanded = expandedJobId === job.id;

      return (
        <div
          key={job.id}
          className={`rounded-2xl border overflow-hidden transition-all duration-300
          ${
            isExpanded
              ? "border-[var(--color-brand-purple)] bg-white/[0.04]"
              : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
          }`}
        >
          <button
            onClick={() => toggleJob(job.id)}
            className="w-full px-5 sm:px-6 md:px-8 py-5 flex items-center justify-between gap-4 text-left"
          >
            <div className="flex-1 min-w-0">

              <div className="flex flex-wrap items-center gap-2 mb-2">

                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-purple-light)]">
                  {job.type}
                </span>

                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] sm:text-[11px] font-mono font-bold">
                  {job.jobId || job.id}
                </span>

              </div>

              <h4 className="text-lg sm:text-xl font-bold text-white">
                {job.title}
              </h4>

              <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-5 text-xs text-slate-400">

                <span>{job.experience}</span>

                <span className="hidden sm:block">&bull;</span>

                <span>
                  {job.department || "Tech & Engineering"}
                </span>

              </div>
            </div>

            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </button>

          {isExpanded && (
            <div className="border-t border-white/5 bg-black/40 px-5 sm:px-6 md:px-8 py-6">

              <h5 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Role Description & Responsibilities
              </h5>

              <p className="mb-6 text-sm md:text-base leading-7 text-slate-300">
                {job.description}
              </p>

              <Link
                to={`/career/${job.jobId || job.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-purple)] px-5 sm:px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-purple-700"
              >
                Apply Now ({job.jobId || job.id}) ↗
              </Link>

            </div>
          )}
        </div>
      );
    })}
  </div>
</section>

        {/* ================= GROWTH / OPPORTUNITIES ================= */}
        <section className="py-12 text-center relative overflow-hidden">

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


<div className="mb-12 md:mb-16 text-left ml-4 sm:ml-6 md:ml-10 pr-4 sm:pr-6">
  {/* Small Caption */}
  <p className="text-[16px] sm:text-[20px] md:text-[22px] font-normal text-[#8B8B8B] mb-3 md:mb-4 tracking-[0.02em]">
    What's Waiting for you
  </p>

  {/* Heading */}
  <div className="flex flex-col md:flex-row md:items-end gap-0 md:gap-2">

    <h2 className="text-white font-bold leading-none
         text-[44px] xs:text-[52px] sm:text-[68px] md:text-[90px] lg:text-[110px] xl:text-[130px]
         tracking-[-0.05em]">
      Growth
    </h2>

    <span
      className="text-[#8C8C8C] font-extralight
       text-[26px] xs:text-[30px] sm:text-[36px] md:text-[42px] lg:text-[52px] xl:text-[60px]
       leading-[1.1] md:leading-none md:mb-4"
    >
      Opportunities
    </span>

  </div>

</div>

{/* ============ MOBILE / TABLET (below md): stacked nodes ============ */}
<div className="md:hidden flex flex-col items-center gap-10 px-6 max-w-sm mx-auto">

  {/* Experience */}
  <div className="flex flex-col items-center">
    <div
      className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[18px] text-center px-4">
        Experience
      </div>
    </div>
    <p className="text-slate-300 text-[13px] sm:text-[14px] font-medium mt-4 max-w-[260px] text-center leading-6">
      Hands-On Software Development Experience
    </p>
  </div>

  <div className="w-[2px] h-8" style={{ background: "linear-gradient(#9d00ff, rgba(157,0,255,0.15))" }} />

  {/* Mentorship */}
  <div className="flex flex-col items-center">
    <div
      className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        animationDelay: "0.7s",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[18px] text-center px-4">
        Mentorship
      </div>
    </div>
    <p className="text-slate-300 text-[13px] sm:text-[14px] font-medium mt-4 max-w-[270px] text-center leading-6">
      Expert Mentorship &amp; Career Guidance
    </p>
  </div>

  <div className="w-[2px] h-8" style={{ background: "linear-gradient(#9d00ff, rgba(157,0,255,0.15))" }} />

  {/* Career Growth */}
  <div className="flex flex-col items-center">
    <div
      className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        animationDelay: "1.4s",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[18px] text-center px-4">
        Career Growth
      </div>
    </div>
    <p className="text-slate-300 text-[13px] sm:text-[14px] font-medium mt-4 max-w-[270px] text-center leading-6">
      Performance-Based Career Growth
    </p>
  </div>

  <div className="w-[2px] h-8" style={{ background: "linear-gradient(#9d00ff, rgba(157,0,255,0.15))" }} />

  {/* Tech Ideas */}
  <div className="flex flex-col items-center">
    <div
      className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        animationDelay: "2.1s",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[18px] text-center px-4">
        Tech Ideas
      </div>
    </div>
    <p className="text-slate-300 text-[13px] sm:text-[14px] font-medium mt-4 max-w-[310px] text-center leading-6">
      Exposure to Emerging Technologies &amp; Industry Practices
    </p>
  </div>

</div>

{/* ============ DESKTOP (md and up): diamond diagram ============ */}
<div
  className="hidden md:block relative mx-auto px-4"
  style={{ width: "min(90vw, 780px)", aspectRatio: "1 / 1" }}
>

  {/* Animated SVG Lines behind nodes */}
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ zIndex: 0 }}
    viewBox="0 0 100 100"
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
    <line x1="50" y1="15.4" x2="19.2" y2="48.7" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="0.3" />
    <line x1="50" y1="15.4" x2="80.8" y2="48.7" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="0.3" />
    <line x1="19.2" y1="48.7" x2="50" y2="82" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="0.3" />
    <line x1="80.8" y1="48.7" x2="50" y2="82" stroke="#9d00ff" strokeOpacity="0.25" strokeWidth="0.3" />

    {/* Animated glowing lines */}
    <line x1="50" y1="15.4" x2="19.2" y2="48.7" stroke="url(#lineGrad)" strokeWidth="0.4">
      <animate attributeName="stroke-dashoffset" from="140" to="0" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="2.5s" repeatCount="indefinite" />
    </line>
    <line x1="50" y1="15.4" x2="80.8" y2="48.7" stroke="url(#lineGrad)" strokeWidth="0.4">
      <animate attributeName="stroke-dashoffset" from="140" to="0" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
      <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
    </line>
    <line x1="19.2" y1="48.7" x2="50" y2="82" stroke="url(#lineGrad)" strokeWidth="0.4">
      <animate attributeName="stroke-dashoffset" from="140" to="0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
      <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
    </line>
    <line x1="80.8" y1="48.7" x2="50" y2="82" stroke="url(#lineGrad)" strokeWidth="0.4">
      <animate attributeName="stroke-dashoffset" from="140" to="0" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
      <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
    </line>
  </svg>

  {/* ===================== NODES ===================== */}

  {/* TOP — Experience */}
  <div
    className="absolute flex flex-col items-center"
    style={{ left: "50%", top: "15.4%", transform: "translate(-50%, -50%)", zIndex: 10 }}
  >
    <p className="text-slate-300 text-[clamp(11px,1.1vw,14px)] font-medium mb-3 md:mb-4 text-center max-w-[220px] leading-6">
      Hands-On Software Development Experience
    </p>
    <div
      className="rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        width: "clamp(110px, 15vw, 192px)",
        height: "clamp(110px, 15vw, 192px)",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[clamp(16px,2vw,24px)] text-center px-4">
        Experience
      </div>
    </div>
  </div>

  {/* LEFT — Mentorship */}
  <div
    className="absolute flex flex-col items-center"
    style={{ left: "19.2%", top: "48.7%", transform: "translate(-50%, -50%)", zIndex: 10 }}
  >
    <div
      className="rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        width: "clamp(110px, 15vw, 192px)",
        height: "clamp(110px, 15vw, 192px)",
        animationDelay: "0.7s",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[clamp(16px,2vw,24px)] text-center px-4">
        Mentorship
      </div>
    </div>
    <p className="text-slate-300 text-[clamp(11px,1.1vw,14px)] font-medium mt-3 md:mt-4 max-w-[250px] text-center leading-6">
      Expert Mentorship &amp; Career Guidance
    </p>
  </div>

  {/* RIGHT — Career Growth */}
  <div
    className="absolute flex flex-col items-center"
    style={{ left: "80.8%", top: "48.7%", transform: "translate(-50%, -50%)", zIndex: 10 }}
  >
    <div
      className="rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        width: "clamp(110px, 15vw, 192px)",
        height: "clamp(110px, 15vw, 192px)",
        animationDelay: "1.4s",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[clamp(16px,2vw,24px)] text-center px-4">
        Career<br />Growth
      </div>
    </div>
    <p className="text-slate-300 text-[clamp(11px,1.1vw,14px)] font-medium mt-3 md:mt-4 max-w-[250px] text-center leading-6">
      Performance-Based Career Growth
    </p>
  </div>

  {/* BOTTOM — Tech Ideas */}
  <div
    className="absolute flex flex-col items-center"
    style={{ left: "50%", top: "82%", transform: "translate(-50%, -50%)", zIndex: 10 }}
  >
    <div
      className="rounded-full p-[3px] animate-pulse-glow-purple"
      style={{
        width: "clamp(110px, 15vw, 192px)",
        height: "clamp(110px, 15vw, 192px)",
        animationDelay: "2.1s",
        background: "conic-gradient(from 200deg, #ff3fd8, #9d00ff 55%, #9d00ff 100%)",
        boxShadow: "0 0 30px rgba(180,60,255,0.55), 0 0 14px rgba(255,60,220,0.4)",
      }}
    >
      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[clamp(16px,2vw,24px)] text-center px-4">
        Tech<br />Ideas
      </div>
    </div>
    <p className="text-slate-300 text-[clamp(11px,1.1vw,14px)] font-medium mt-3 md:mt-4 max-w-[310px] text-center leading-6">
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