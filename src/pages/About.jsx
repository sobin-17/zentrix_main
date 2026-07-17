import React from 'react';
import { Lightbulb, Rocket, Target, GraduationCap, Network, Brain } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const particles = Array.from({ length: 120 }).map((_, i) => ({

  


  id: i,
  size: Math.random() * 3 + 1,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  tx: `${(Math.random() - 0.5) * 200}px`,
  ty: `${(Math.random() - 0.5) * 200}px`,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}));

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 250, mass: 0.5 });
  const [isPointer, setIsPointer] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const handleOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], .cursor-hover, input, textarea');
      setIsPointer(!!target);
    };
    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          backgroundColor: '#c084fc',
        }}
        animate={{
          scale: isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* Outer ring - thin, trails smoothly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderWidth: 1.5,
          borderColor: 'rgba(168,85,247,0.6)',
        }}
        animate={{
          width: isPointer ? 44 : 28,
          height: isPointer ? 44 : 28,
          borderColor: isPointer ? 'rgba(168,85,247,0.9)' : 'rgba(168,85,247,0.5)',
          backgroundColor: isPointer ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0)',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      />
    </>
  );
}

export default function AboutView() {
  const [isDesktop, setIsDesktop] = useState(false);

useEffect(() => {
  const mq = window.matchMedia("(min-width: 1024px)");
  setIsDesktop(mq.matches);
  const handler = (e) => setIsDesktop(e.matches);
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}, []);
  return (
    <div className="relative pt-8 pb-16 bg-transparent text-gray-300 overflow-hidden">
      <CustomCursor />
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="service-particle"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              backgroundColor: "#a855f7",
              boxShadow: `0 0 ${p.size * 3}px #a855f7`,
              "--tx": p.tx,
              "--ty": p.ty,
              "--duration": `${p.duration}s`,
              "--delay": `${p.delay}s`,
            }}
          />
        ))}
      </div>
      {/* Ambient glows */}
      <div className="ambient-light bg-purple-600/20 w-[600px] h-[600px] top-0 left-1/4" />
      <div className="ambient-light bg-cyan-500/10 w-[700px] h-[700px] bottom-0 right-1/4" style={{ animationDelay: "2s" }} />
      {/* Background radial flares */}
      <div className="fixed top-10 right-0 w-[500px] h-[500px] bg-purple-900/15 rounded-full filter blur-[150px] pointer-events-none z-[-1]"></div>
      <div className="fixed bottom-20 left-10 w-[400px] h-[400px] bg-indigo-900/10 rounded-full filter blur-[120px] pointer-events-none z-[-1]"></div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.div
          className="relative w-screen left-1/2 -translate-x-1/2 min-h-[75vh] lg:min-h-[85vh] overflow-hidden flex items-center"
          id="about-hero"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* Background Orb */}
          <motion.img
            src="/about_orb.png"
            alt="About Orb Background"
            className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      object-center
      z-0
      pointer-events-none
      mix-blend-screen
    "
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.85, 1, 0.85],
              filter: [
                "brightness(1) saturate(1) drop-shadow(0 0 20px rgba(168,85,247,0.4))",
                "brightness(1.15) saturate(1.2) drop-shadow(0 0 60px rgba(168,85,247,0.9))",
                "brightness(1) saturate(1) drop-shadow(0 0 20px rgba(168,85,247,0.4))",
              ],
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-start text-left w-full max-w-screen-xl mx-auto px-6 md:px-12 -mt-12 lg:-mt-16">

            <div className="max-w-2xl">

              <motion.h1
                className="font-black tracking-tight flex flex-col gap-0 drop-shadow-2xl mb-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >

                <motion.span
                  className="text-white text-[4.5rem] md:text-[6rem] lg:text-[10rem] leading-[0.85]"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Meet
                </motion.span>

                <motion.span
                  className="text-[2.8rem] md:text-[4rem] lg:text-[5rem] leading-[0.85] md:whitespace-nowrap"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <span className="text-white">
                    Zentrix
                  </span>{" "}

                  <span className="bg-gradient-to-r from-[#c084fc] to-[#a855f7] text-transparent bg-clip-text">
                    Technology
                  </span>
                </motion.span>

              </motion.h1>

              <p
                className="
        text-[16px]
        md:text-[18px]
        text-gray-300
        text-center
        leading-[1.7]
        max-w-[500px]
        mx-auto
        mt-5
      "
              >
                Empowering business and individuals through innovative
                technology solutions, industry focus training and digital
                transformation.
              </p>

            </div>

          </div>
        </motion.div>

        <motion.div
          className="relative w-full mb-20 flex flex-col lg:flex-row items-center min-h-[450px] lg:min-h-[550px]"
          id="about-intro"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-[58%] flex flex-col justify-center">

            <motion.h2
              className="text-5xl md:text-6xl lg:text-[4.8rem] tracking-tight leading-none mb-7 whitespace-nowrap"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white font-extrabold">
                Company
              </span>{" "}

              <span className="text-[#b8b8b8] font-extralight">
                Introduction
              </span>
            </motion.h2>

            <p className="text-[15px] md:text-[17px] text-gray-300 leading-[1.9] max-w-[650px]">
              Zentrix Technology is an innovative IT solutions company specializing
              in custom websites, mobile applications, ERP & CRM systems, SaaS
              platforms, AI Voice Agents, and business automation solutions.
              We help businesses leverage technology to streamline operations,
              enhance customer experiences, and achieve sustainable growth.
              We are a growing technology company dedicated to empowering
              businesses and individuals through innovation, digital transformation,
              and practical technology solutions.
            </p>

          </div>

          {/* Right Image */}
          <div className="absolute top-[48%] right-[-100px] sm:right-[-160px] lg:right-[-220px] -translate-y-1/2 z-0 pointer-events-none overflow-visible">
          <motion.img
  src="/about_intro_logo.png"
  alt="Zentrix Logo"
  className="w-[280px] sm:w-[420px] md:w-[560px] lg:w-[800px] h-auto object-contain mix-blend-screen opacity-75"
  initial={{
    opacity: 0,
    scale: 0.85,
    rotate: -8,
  }}
  whileInView={{
    opacity: 0.75,
    scale: 1,
    rotate: 0,
  }}
  viewport={{ once: false, amount: 0.3 }}
  animate={{
    y: [0, -12, 0],
    rotate: [0, 2, 0, -2, 0],
    scale: [1, 1.02, 1],
  }}
  transition={{
    opacity: {
      duration: 1,
    },
    scale: {
      duration: 1,
    },
    rotate: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
    y: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    scale: 1.08,
    rotate: 5,
    opacity: 1,
    filter:
      "brightness(1.3) drop-shadow(0 0 70px rgba(168,85,247,0.9))",
    transition: {
      duration: 0.35,
    },
  }}
/>
          </div>

        </motion.div>
        {/* 3. Our Story (Timeline) */}
        <div className="mb-20 relative" id="about-story">
          <motion.h2
            className="text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem] leading-none mb-8 -mt-12 ml-6 md:ml-12 lg:ml-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="text-[#c026ff] font-bold">Our</span>{" "}
            <span className="text-white font-extralight">Story</span>
          </motion.h2>

          {/* Timeline Container (Desktop only) */}
          <div className="relative w-[105%] h-[760px] hidden md:block select-none overflow-hidden rounded-[2.5rem] bg-[#05010c]/30 border border-purple-950/20 p-8">
            {/* The Timeline Graphic from Figma (sized up even more) */}
            <img
              src="/about_timeline.png"
              alt="Our Story Timeline"
              className="absolute bottom-0 left-30 w-full h-[690px] object-contain object-bottom mix-blend-screen pointer-events-none"
            />

            {/* Timeline Item 1: 2025 */}
            <div className="absolute left-[18.5%] -translate-x-1/2 bottom-[240px] w-[380px] text-center flex flex-col items-center z-10">
              <span className="text-[#a855f7] font-bold text-sm block mb-1">2025</span>
              <h4 className="text-white font-bold text-lg mb-2">Idea Born</h4>
              <p className="text-[10px] md:text-[16px] text-gray-300 leading-[1.6] max-w-[950px]">
                Build secure, scalable, and innovative software solutions that help businesses streamline operations and accelerate digital growth.
              </p>
            </div>

            {/* Timeline Item 2: 2026 */}
            <div className="absolute left-[47.5%] -translate-x-1/2 bottom-[490px] w-[380px] text-center flex flex-col items-center">
              <span className="text-[#a855f7] font-bold text-sm block mb-1">2026</span>
              <h4 className="text-white font-bold text-lg mb-2">Official Launch</h4>
              <p className="text-[10px] md:text-[16px] text-gray-300 leading-[1.6] max-w-[950px]">
                Became an officially established organization offering training, internships, and software development services.
              </p>
            </div>

            {/* Timeline Item 3: Future */}
            <div className="absolute left-[90%] -translate-x-1/2 bottom-[580px] w-[300px] text-center flex flex-col items-center">
              <span className="text-[#a855f7] font-bold text-sm block mb-1">Future</span>
              <h4 className="text-white font-bold text-lg mb-2">Expansion</h4>
              <p className="text-[10px] md:text-[16px] text-gray-300 leading-[1.6] max-w-[950px]">
                Expanding our impact through technology, talent development, and digital solutions.
              </p>
            </div>
          </div>

          {/* Responsive Mobile Timeline */}
          <div className="flex flex-col gap-12 md:hidden relative pl-8 border-l-2 border-dashed border-purple-900/50 ml-6 md:ml-12 lg:ml-0">
            {/* Mobile Item 1 */}
            <div className="relative">
              <div className="absolute -left-[45px] top-0 w-10 h-10 rounded-full border border-purple-500 bg-[#0a0516] flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[#a855f7] font-bold text-xs">2025</span>
              <h4 className="text-white font-bold text-base mb-1">Idea Born</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Build secure, scalable, and innovative software solutions that help businesses streamline operations and accelerate digital growth.
              </p>
            </div>
            {/* Mobile Item 2 */}
            <div className="relative">
              <div className="absolute -left-[49px] top-0 w-10 h-10 rounded-full border border-purple-500 bg-[#0a0516] flex items-center justify-center">
                <Rocket className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[#a855f7] font-bold text-xs">2026</span>
              <h4 className="text-white font-bold text-base mb-1">Official Launch</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Became an officially established organization offering training, internships, and software development services.
              </p>
            </div>
            {/* Mobile Item 3 */}
            <div className="relative">
              <div className="absolute -left-[40px] top-0 w-10 h-10 rounded-full border border-purple-500 bg-[#0a0516] flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[#a855f7] font-bold text-xs">Future</span>
              <h4 className="text-white font-bold text-base mb-1">Expansion</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Expanding our impact through technology, talent development, and digital solutions.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Services / Capabilities */}
        <motion.div className="mt-8 mb-16" id="about-focus-areas" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl ml-6 md:ml-12 lg:ml-0 text-center px-4">

            {/* Software Development */}
            <motion.div
              className="flex flex-col items-center"
              whileHover={{
                scale: 1.04,
                y: -8,
                boxShadow: "0 0 40px rgba(168,85,247,0.4)"
              }}
            >
              <motion.img
  src="/icon_software.png"
  alt="Software Development"
  className="w-[240px] md:w-[280px] lg:w-[320px] h-auto object-contain mb-0"
  initial={{ opacity: 0, y: 40, scale: 0.9 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  animate={{
    y: [0, -12, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    scale: { duration: 0.8 },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    scale: 1.08,
    filter: "drop-shadow(0 0 35px rgba(168,85,247,0.7))",
  }}
/>

              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                Software Development
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[340px]">
                Build secure, scalable, and innovative software
                solutions that help businesses streamline
                operations and accelerate digital growth.
              </p>
            </motion.div>

            {/* Professional Training */}
            <motion.div
              className="flex flex-col items-center"
              whileHover={{
                scale: 1.04,
                y: -8,
                boxShadow: "0 0 40px rgba(168,85,247,0.4)"
              }}
            >
              <motion.img
  src="/icon_training.png"
  alt="Professional Training"
  className="w-[240px] md:w-[280px] lg:w-[320px] h-auto object-contain mb-0"
  initial={{ opacity: 0, y: 40, scale: 0.9 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  animate={{
    y: [0, -12, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    scale: { duration: 0.8 },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    scale: 1.08,
    filter: "drop-shadow(0 0 35px rgba(168,85,247,0.7))",
  }}
/>

              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                Professional Training
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[340px]">
                Hands-on learning programs designed to bridge
                the gap between education and industry
                requirements.
              </p>
            </motion.div>

            {/* Digital Marketing */}
            <motion.div
              className="flex flex-col items-center"
              whileHover={{
                scale: 1.04,
                y: -8,
                boxShadow: "0 0 40px rgba(168,85,247,0.4)"
              }}
            >
              <motion.img
  src="/icon_marketing.png"
  alt="Digital Marketing"
  className="w-[240px] md:w-[280px] lg:w-[320px] h-auto object-contain mb-0"
  initial={{ opacity: 0, y: 40, scale: 0.9 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  animate={{
    y: [0, -12, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    scale: { duration: 0.8 },
    y: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  whileHover={{
    scale: 1.08,
    filter: "drop-shadow(0 0 35px rgba(168,85,247,0.7))",
  }}
/>

              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                Digital Marketing
              </h3>

              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[340px]">
                Drive brand visibility, customer engagement,
                and business growth through data-driven
                digital marketing strategies.
              </p>
            </motion.div>

          </div>
        </motion.div>
        {/* 4. Future Goals */}
        <div className="mb-20 relative w-screen left-1/2 -translate-x-1/2 h-[350px] lg:h-[450px]" id="about-goals">
        <motion.img
  src="/about_hands.png"
  alt="Future Goals Hand Graphic"
  className="w-full h-full object-cover"
  initial={{ opacity: 0, scale: 0.90 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  animate={{
    y: [0, -8, 0],
  }}
  transition={{
    opacity: { duration: 0.8 },
    scale: { duration: 0.8 },
    y: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
/>
          <div className="absolute inset-0 flex items-start pt-10 lg:pt-14 bg-black/5">

            <div className="w-full px-6 md:px-12 lg:px-16 flex flex-col items-start text-left">

              <h2 className="text-white text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-medium tracking-tight leading-none mb-4 drop-shadow-lg">
                <span className="text-[#a855f7]">Our</span>{" "}
                Future Goals
              </h2>

              <p className="text-base md:text-[17px] text-gray-100 leading-relaxed max-w-[850px] font-normal drop-shadow-md">
                To empower businesses through innovative technology solutions,
                develop industry-ready talent through practical training, and create
                impactful digital products that drive growth, innovation, transformation,
                and long-term success across industries and communities.
              </p>

            </div>

          </div>
        </div>

       {/* 5. Vision & Mission */}
       {/* 5. Vision & Mission */}
<motion.div className="mb-20" id="about-vision-mission" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <div className="mb-16 flex items-center gap-6">
    <div className="w-[4px] h-20 bg-purple-600 rounded-full"></div>
    <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight">
      Vision & Mission
    </h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
    {/* Our Vision */}
    <motion.div
      className="bg-[#0b0518] border border-purple-900/40 p-6 md:p-8 rounded-[2rem] relative overflow-hidden group aspect-square md:aspect-auto md:min-h-[400px] flex flex-col items-start justify-center"
      initial={{ opacity: 0, x: -200, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 70, damping: 18, mass: 1 }}
      whileHover={{ scale: 1.04, y: -8, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
    >
      {/* moving shimmer border */}
      <div className="absolute inset-0 rounded-[2rem] pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-[2rem]"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(90deg, transparent, transparent, #a855f7, #e9d5ff, #a855f7, transparent, transparent)',
            backgroundSize: '300% 100%',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{ backgroundPosition: ['200% 0%', '-100% 0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img src="/vision_mission_bg.png" alt="" className="absolute top-0 left-0 w-[200%] h-full max-w-none object-cover opacity-45 mix-blend-screen" />
      </div>
      <div className="relative z-10 w-full max-w-md text-left">
        <h3 className="text-white text-3xl font-bold mb-10 text-left">Our Vision</h3>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Innovation & Technology</h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              To build a future-focused technology company that delivers innovative digital solutions and creates opportunities for businesses and individuals through modern technology and practical learning.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Growth & Digital Transformation</h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              To create a strong digital ecosystem that supports business growth, technology innovation, and industry-oriented skill development for the next generation.
            </p>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Our Mission */}
    <motion.div
      className="bg-[#0b0518] border border-purple-900/40 p-6 md:p-8 rounded-[2rem] relative overflow-hidden group aspect-square md:aspect-auto md:min-h-[400px] flex flex-col items-start justify-center"
      initial={{ opacity: 0, x: 200, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 70, damping: 18, mass: 1, delay: 0.15 }}
      whileHover={{ scale: 1.04, y: -8, boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
    >
      {/* moving shimmer border, opposite direction */}
      <div className="absolute inset-0 rounded-[2rem] pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-[2rem]"
          style={{
            padding: '1.5px',
            background: 'linear-gradient(90deg, transparent, transparent, #a855f7, #e9d5ff, #a855f7, transparent, transparent)',
            backgroundSize: '300% 100%',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{ backgroundPosition: ['-100% 0%', '200% 0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0.2 }}
        />
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img src="/vision_mission_bg.png" alt="" className="absolute top-0 right-0 w-[200%] h-full max-w-none object-cover opacity-45 mix-blend-screen" />
      </div>
      <div className="relative z-10 w-full max-w-md text-left">
        <h3 className="text-white text-3xl font-bold mb-10 text-left">Our Mission</h3>
        <div className="flex flex-col gap-6 w-full">
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Innovation & Quality</h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              We are committed to delivering innovative digital solutions and professional services that help businesses grow in the modern technology environment. Our focus is on quality, efficiency, and practical implementation.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-1">Learning & Growth</h4>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Our mission is to create opportunities for students and professionals through industry-focused training, real-world projects, and continuous skill development for future careers and business success.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>



        {/* 6. What Makes Us Different */}
        <motion.section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto mb-32" id="about-different" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>

          {/* Heading + Orb */}
          <motion.div className="hidden md:flex items-start justify-between mb-20 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-0 relative z-20">

              <div className="flex items-end gap-1">

                <motion.span
                  className="text-white text-[85px] md:text-[105px] lg:text-[130px] font-extralight leading-none"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  what
                </motion.span>

                <motion.span
                  className="text-white text-[40px] md:text-[50px] lg:text-[62px] font-light leading-none mb-[14px]"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  makes us
                </motion.span>

              </div>

              <motion.h2
                className="text-[58px] md:text-[72px] lg:text-[88px] font-bold text-[#a855f7] -mt-3 leading-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                Different?
              </motion.h2>

            </div>
            {/* Orb */}
          {/* Different Orb — floats, follows cursor with parallax shift, glows on hover */}
<div
  className="absolute right-[-10%] top-[-280px] z-10 pointer-events-auto"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty("--mx", `${x * 30}px`);
    e.currentTarget.style.setProperty("--my", `${y * 30}px`);
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.setProperty("--mx", "0px");
    e.currentTarget.style.setProperty("--my", "0px");
  }}
>
  <motion.img
    src="/about_different_orb.png"
    alt="Different Orb"
    className="w-[580px] md:w-[760px] lg:w-[920px] object-contain mix-blend-screen"
    style={{
      x: "var(--mx, 0px)",
      y: "var(--my, 0px)",
    }}
    animate={{
      y: [0, -15, 0],
    }}
    transition={{
      y: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      },
      x: { type: "spring", stiffness: 100, damping: 15 },
    }}
    whileHover={{
      scale: 1.08,
      rotate: 5,
      filter:
        "brightness(1.2) drop-shadow(0 0 60px rgba(168,85,247,0.8))",
    }}
    whileTap={{
      scale: 1.03,
    }}
  />
</div>
          </motion.div>

          {/* Background Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[900px] h-[650px] bg-purple-700/30 blur-[220px] rounded-full" />
          </div>
          {/* Desktop Cards */}
          <div className="relative mt-6 hidden md:block h-[620px]">

            {/* Connecting vertical line — grows from top to bottom */}
            <motion.div
              className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, #3b82f6 0%, #22c55e 50%, #a855f7 100%)",
                zIndex: 0,
              }}
              initial={{ height: "0px" }}
              animate={{ height: "620px" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />

            {/* Dot marks — pop in as the line reaches each card */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
              style={{ backgroundColor: "#3b82f6", top: "16%" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
              style={{ backgroundColor: "#22c55e", top: "50%" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9, ease: "easeOut" }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
              style={{ backgroundColor: "#a855f7", top: "84%" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.5, ease: "easeOut" }}
            />

            {/* Card 1 */}
            <motion.div
  className="absolute left-0 top-[3%] z-10 bg-[#0b0319] border border-purple-600/30 rounded-[28px] p-6 md:p-8 flex flex-col items-center text-center"
  style={{ width: "clamp(220px, 42%, 400px)" }}
  initial={{ opacity: 0, x: -150, scale: 0.9 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  viewport={{ once: false }}
  transition={{
    duration: 0.8,
    delay: 0.2,
    ease: "easeOut",
  }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0 0 20px rgba(133,46,226,0.5)"
  }}
>
              <h3 className="text-white text-xl font-semibold mb-5">
                Learning Beyond Classrooms
              </h3>

              <div className="w-20 h-20 rounded-full border border-purple-500/30 flex items-center justify-center mb-5">
                <GraduationCap className="w-10 h-10 text-purple-400" />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                Practical training focused on industry readiness.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
  className="absolute right-0 top-[32%] z-10 bg-[#0b0319] border border-purple-600/30 rounded-[28px] p-6 md:p-8 flex flex-col items-center text-center"
  style={{ width: "clamp(220px, 42%, 400px)" }}
  initial={{ opacity: 0, x: 150, scale: 0.9 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{
    duration: 0.8,
    delay: 0.4,
    ease: "easeOut",
  }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0 0 20px rgba(133,46,226,0.5)"
  }}
>
              <h3 className="text-white text-xl font-semibold mb-5">
                Innovation Driven Mindset
              </h3>

              <div className="w-20 h-20 rounded-full border border-purple-500/30 flex items-center justify-center mb-5">
                <Brain className="w-10 h-10 text-purple-400" />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                Transforming ideas into impactful solutions.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
  className="absolute left-0 top-[64%] z-10 bg-[#0b0319] border border-purple-600/30 rounded-[28px] p-6 md:p-8 flex flex-col items-center text-center"
  style={{ width: "clamp(220px, 42%, 400px)" }}
  initial={{ opacity: 0, x: -150, scale: 0.9 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  viewport={{ once: false, amount: 0.3 }}
  transition={{
    duration: 0.8,
    delay: 0.6,
    ease: "easeOut",
  }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0 0 20px rgba(133,46,226,0.5)"
  }}
>
              <h3 className="text-white text-xl font-semibold mb-5">
                One Ecosystem Endless Opportunities
              </h3>

              <div className="w-20 h-20 rounded-full border border-purple-500/30 flex items-center justify-center mb-5">
                <Network className="w-10 h-10 text-purple-400" />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-[300px]">
                Services, Training & Product Development under one roof.
              </p>
            </motion.div>

          </div>
          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-6 mt-10">

            <div className="bg-[#0b0319] border border-purple-900/40 rounded-[24px] p-6 flex flex-col items-center text-center">
              <GraduationCap className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-bold mb-2">
                Learning Beyond Classrooms
              </h3>
              <p className="text-gray-400 text-sm">
                Practical training focused on industry readiness.
              </p>
            </div>

            <div className="bg-[#0b0319] border border-purple-900/40 rounded-[24px] p-6 flex flex-col items-center text-center">
              <Brain className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-bold mb-2">
                Innovation Driven Mindset
              </h3>
              <p className="text-gray-400 text-sm">
                Transforming ideas into impactful solutions.
              </p>
            </div>

            <div className="bg-[#0b0319] border border-purple-900/40 rounded-[24px] p-6 flex flex-col items-center text-center">
              <Network className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-bold mb-2">
                One Ecosystem Endless Opportunities
              </h3>
              <p className="text-gray-400 text-sm">
                Services, Training & Product Development under one roof.
              </p>
            </div>

          </div>

        </motion.section>

        {/* ── 7. Founder's Message ────────────────────────────────── */}
        <motion.div
          className="relative mt-24 mb-24 min-h-[450px] flex items-center"
          id="about-founder"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          {/* Quote Image */}
          <img
            src="/quote_mark.png"
            alt="Quote"
            className="absolute left-[5%] top-1/2 -translate-y-1/2 h-[320px] lg:h-[380px] w-auto opacity-90 z-10"
          />

          {/* Founder Image */}
          <motion.img
            src="/about_founder.png"
            alt="Founder"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            animate={{ y: [0, -8, 0] }}
            className="absolute right-[-6%] top-1/2 -translate-y-1/2 h-[320px] lg:h-[380px] w-auto object-contain mix-blend-screen z-10" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="relative z-20 w-full max-w-6xl mx-auto px-6 pt-20"
          >

            <h3 className="text-white text-[34px] md:text-[52px] lg:text-[72px] font-bold leading-none mb-4 ml-[120px] lg:ml-[170px]">
              Founder&apos;s Message
            </h3>

            <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-[750px] ml-[120px] lg:ml-[170px]">
              We believe in the power of technology to transform ideas into opportunities.
              Through innovation, learning, and collaboration, we strive to create meaningful
              impact for businesses and future professionals.
            </p>

          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}