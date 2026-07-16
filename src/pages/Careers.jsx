import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <section className="relative w-full min-h-[85vh] overflow-hidden">        {/* Full-bleed hand image as banner background */}
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
        <motion.img
  src="/career_hand.png"
  className="absolute -bottom-18 right-0 w-full  object-contain"
  initial={{
    opacity: 0,
    scale: 0.9,
    y: 40,
  }}
  whileInView={{
    opacity: 1,
    scale: 1,
    y: 0,
  }}
  viewport={{ once: false, amount: 0.3 }}
  animate={{
    y: [0, -10, 0],
    rotate: [0, 1.5, 0, -1.5, 0],
    scale: [1, 1.01, 1],
  }}
  transition={{
    opacity: { duration: 1 },
    scale: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
    rotate: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    scale: 1.05,
    y: -6,
    filter:
      "brightness(1.15) drop-shadow(0 0 70px rgba(168,85,247,0.8))",
    transition: { duration: 0.3 },
  }}
/>
          {/* Purple Glow */}
          <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#8B2EFF] opacity-30 blur-[220px] rounded-full"></div>
        </div>

        {/* Hero text content — overlaid on image */}
        <div className="absolute top-8 left-0 right-0 z-10 w-full max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex items-start gap-5">

            {/* Career Heading */}
            <h1 className="text-[90px] md:text-[125px] lg:text-[150px] font-black leading-[0.85] tracking-tight text-white whitespace-nowrap">
              Career
            </h1>

            {/* Right Side */}
            <div className="pt-5 lg:pt-6 max-w-[700px]">

              <h2 className="text-white font-semibold text-[22px] md:text-[26px] lg:text-[30px] leading-none whitespace-nowrap">
                "Your Career Our Mission"
              </h2>

              <p className="mt-2 text-gray-300 text-[14px] md:text-[15px] lg:text-[16px] leading-5 max-w-[650px]">
                At Zentrix Technologies, we create opportunities to learn, create,
                and innovate together.
              </p>

            </div>

          </div>

        </div>
        {/* Bottom Left Description */}
        <div className="absolute bottom-[80px] left-[60px] z-20 max-w-[400px]">
          <p className="text-white/85 text-[15px] md:text-[14px] font-light leading-[22px] tracking-[0.2px]">
            At Zentrix Technologies, we create opportunities to learn, create, and innovate together
          </p>
        </div>
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* ================= WHY WORK WITH US ================= */}
        <section className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-32 md:py-40">
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
            <div className="pt-14 text-center">

              <h2 className="text-white font-black text-[82px] md:text-[105px] lg:text-[120px] leading-none">
                Why Work
              </h2>

              <h3 className="-mt-4 ml-[190px] text-[38px] md:text-[48px] lg:text-[56px] font-light text-[#D1B2FF] leading-none">
                with us?
              </h3>

            </div>

            {/* Description */}
            <div className="mt-12 pb-20 px-6 flex justify-center">

              <p className="max-w-[760px] text-center text-gray-300 text-[16px] leading-8 font-light">
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
        <section className="relative bg-black py-12">

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
          <div className="text-center mb-1">
            <h2 className="leading-none">
              <span className="text-[78px] md:text-[105px] lg:text-[120px] font-extralight text-white tracking-tight">
                Work
              </span>

              <span className="ml-3 text-[38px] md:text-[50px] lg:text-[60px] font-light text-white/30">
                Culture
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Description */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 w-full px-6 text-center">
              <p className="mx-auto max-w-[1100px] text-white text-[16px] md:text-[18px] leading-9 font-light tracking-[0.3px]">
                We foster a collaborative, innovative, and growth-oriented work culture where creativity is encouraged and every contribution matters. Our team thrives on continuous learning, teamwork, and real-world problem-solving, creating an environment that empowers individuals to develop skills, share ideas, and achieve professional success.
              </p>
            </div>

            <div className="relative w-full h-[700px] overflow-hidden">

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

  {/* Background */}
  <img
    src="/career_background.png "
    className="w-full h-full object-cover ml-0"
    animate={{
      scale: [1, 1.03, 1],
      rotate: [0, 0.2, 0, -0.2, 0],
      y: [0, -6, 0],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

  {/* Animated People */}
  <motion.img
    src="/career_people1.png"
    className="absolute inset-0 w-[110%] h-[110%] object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  "
    animate={{
      x: [0, 8, 0],
      y: [0, -4, 0],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />

</div>

          </div>

        </section>
        {/* ================= CURRENT OPENINGS ================= */}
        <section id="openings" className="relative pt-40 pb-20 mt-24">
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
  className="w-[1350px] md:w-[1450px] lg:w-[1550px] max-w-none h-auto object-contain -translate-y-32"
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
                 text-[95px] md:text-[120px] lg:text-[145px]">
                Current
              </h2>

              <h3 className="-mt-3 text-[#C88BFF]
                 font-extralight tracking-tight
                 text-[42px] md:text-[52px] lg:text-[64px]">
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
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-brand-purple)] hover:bg-purple-700 text-white text-xs font-bold rounded-full transition-all tracking-wider uppercase"
                      >
                        Apply Now <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= GROWTH / OPPORTUNITIES ================= */}
        <section className="py-20 text-center relative">

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


          <div className="mb-16 text-left ml-10">
            {/* Small Caption */}
            <p className="text-[20px] md:text-[22px] font-normal text-[#8B8B8B] mb-4 tracking-[0.02em]">
              What's Waiting for you
            </p>

            {/* Heading */}
            <div className="flex items-end gap-2">

              <h2 className="text-white font-bold leading-none
                   text-[90px] md:text-[110px] lg:text-[130px]
                   tracking-[-0.05em]">
                Growth
              </h2>

              <span
                className="text-[#8C8C8C] font-extralight
                 text-[42px] md:text-[52px] lg:text-[60px]
                 leading-none mb-4"
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