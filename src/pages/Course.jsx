import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from 'framer-motion';
import {
  BookOpen, Award, Target, Code, Briefcase, Users,
  Cpu, Palette, LineChart, Brain as BrainIcon,
  ChevronDown, Zap, Shield, Star, Rocket, CheckCircle2,
  GraduationCap, Globe, TrendingUp, Layout,
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { ChevronRight, ArrowRight } from "lucide-react";
import WhyChooseUs from '../components/WhyChooseUs';
import Technologies from '../components/Technologies';
import Footer from '../components/Footer';


import { getCourses } from "../services/courseService";
import { ensureCourseIds } from "../utils/courseIdHelper";

/* ─────────────────── DATA ─────────────────── */


const coreFeatures = [
  {
    title: 'Certified Internship Opportunities',
    desc: 'Gain real industry experience with a mandatory paid internship embedded in every professional course.',
    icon: <Award className="w-7 h-7 text-[var(--color-brand-purple-light)]" />,
  },
  {
    title: 'Certified Live Projects',
    desc: 'Work on real-client projects that go into your professional portfolio and are verified by Zentrix.',
    icon: <Code className="w-7 h-7 text-[var(--color-brand-purple-light)]" />,
  },
  {
    title: 'Direct Hire Transition Protocols',
    desc: "Top performers are fast-tracked into full-time roles directly within Zentrix's active engineering teams.", icon: < Briefcase className="w-7 h-7 text-[var(--color-brand-purple-light)]" />,
  },
  {
    title: 'Mentorship from Tech Architects',
    desc: 'Get weekly 1-on-1 guidance from senior engineers and architects who have shipped real products.',
    icon: <Users className="w-7 h-7 text-[var(--color-brand-purple-light)]" />,
  },
  {
    title: 'Real-world Client Team Workflow',
    desc: 'Experience professional sprints, code reviews, and team collaboration exactly as in a tech company.',
    icon: <Target className="w-7 h-7 text-[var(--color-brand-purple-light)]" />,
  },
  {
    title: 'Placement & Career Support',
    desc: 'Resume building, mock interviews, LinkedIn optimisation, and direct referrals to our hiring network.',
    icon: <Rocket className="w-7 h-7 text-[var(--color-brand-purple-light)]" />,
  },
];

const learningStages = [
  { name: 'Learn', desc: 'Build a strong foundation with industry-relevant concepts and guided lessons.', icon: <BookOpen className="w-6 h-6" /> },
  { name: 'Practice', desc: 'Apply knowledge through hands-on exercises and real-world challenges.', icon: <Zap className="w-6 h-6" /> },
  { name: 'Experience', desc: 'Gain industry exposure through internships and collaborative learning.', icon: <Globe className="w-6 h-6" /> },
  { name: 'Build', desc: 'Work on live projects to create a professional developer portfolio.', icon: <Code className="w-6 h-6" /> },
  { name: 'Grow', desc: 'Launch your career with certifications and placement guidance', icon: <TrendingUp className="w-6 h-6" /> },
];

const internshipBenefits = [
  {
    title: "Certified Live Projects Credentials",
    icon: <Code className="w-6 h-6" />,
  },
  {
    title: "Direct Hire Transition Protocols",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    title: "Mentorship from Tech Architects",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Real-World Client Team Workflow",
    icon: <Target className="w-6 h-6" />,
  },
];

const placementSupport = [
  'Resume Building',
  'LinkedIn Optimisation',
  'Mock Interviews',
  'Technical Preparation',
  'Career Mentoring',
];

/* ─────────────────── ANIMATION VARIANTS ─────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: i * 0.1 },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
};

/* ─────────────────── SUB-COMPONENTS ─────────────────── */

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[var(--color-brand-purple)] bg-[var(--color-brand-purple)]/10 text-[var(--color-brand-purple-light)] text-sm font-semibold uppercase tracking-wider mb-6">
      {children}
    </div>
  );
}

function CourseCard({ course, index }) {

  const getAccent = () => {
    switch (course.id || course.slug) {
      case 'mern-stack': 
        return { 
          titleText: <><span className="text-white">MERN</span> <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">STACK</span></>,
          badge1: 'bg-[#3730a3]/80 text-[#818cf8] border border-[#6366f1]/50 shadow-[0_0_10px_rgba(99,102,241,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.6)] hover:shadow-[0_0_30px_rgba(124,58,237,1)] hover:bg-[#8b5cf6]', 
          cardBorder: 'hover:border-blue-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]',
          gradientHover: 'group-hover:from-blue-900/20'
        };
      case 'java-dev': 
        return { 
          titleText: <><span className="text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">JAVA</span> <span className="text-white">PROGRAMMING</span></>,
          badge1: 'bg-blue-600 text-white border border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.7)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-[#9333ea] text-white shadow-[0_0_15px_rgba(147,51,234,0.6)] hover:shadow-[0_0_30px_rgba(147,51,234,1)] hover:bg-[#a855f7]', 
          cardBorder: 'hover:border-purple-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]',
          gradientHover: 'group-hover:from-purple-900/20'
        };
      case 'ui-ux': 
        return { 
          titleText: <><span className="text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">UI - UX</span> <span className="text-white">DESIGNING</span></>,
          badge1: 'bg-pink-900/80 text-pink-300 border border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-pink-600 text-white shadow-[0_0_15px_rgba(219,39,119,0.6)] hover:shadow-[0_0_30px_rgba(219,39,119,1)] hover:bg-pink-500', 
          cardBorder: 'hover:border-pink-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]',
          gradientHover: 'group-hover:from-pink-900/20'
        };
      case 'python-fullstack': 
        return { 
          titleText: <><span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">PYTHON</span> <span className="text-white">FULL STACK</span></>,
          badge1: 'bg-cyan-900/60 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.6)] hover:shadow-[0_0_30px_rgba(8,145,178,1)] hover:bg-cyan-500', 
          cardBorder: 'hover:border-cyan-400/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]',
          gradientHover: 'group-hover:from-cyan-900/20'
        };
      case 'data-analytics': 
        return { 
          titleText: <><span className="text-white">DATA</span> <span className="text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">ANALYTICS</span></>,
          badge1: 'bg-orange-900/80 text-orange-300 border border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-orange-600 text-white shadow-[0_0_15px_rgba(234,88,12,0.6)] hover:shadow-[0_0_30px_rgba(234,88,12,1)] hover:bg-orange-500', 
          cardBorder: 'hover:border-orange-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]',
          gradientHover: 'group-hover:from-orange-900/20'
        };
      case 'data-science-ml': 
        return { 
          titleText: <><span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">DATA SCIENCE</span> <span className="text-white">& ML</span></>,
          badge1: 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.6)] hover:shadow-[0_0_30px_rgba(5,150,105,1)] hover:bg-emerald-500', 
          cardBorder: 'hover:border-emerald-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]',
          gradientHover: 'group-hover:from-emerald-900/20'
        };
      case 'ZTAI0001': 
        return { 
          titleText: <><span className="text-white">ARTIFICIAL</span> <span className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">INTELLIGENCE</span></>,
          badge1: 'bg-red-900/80 text-red-300 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.6)] hover:shadow-[0_0_30px_rgba(220,38,38,1)] hover:bg-red-500', 
          cardBorder: 'hover:border-red-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.25)]',
          gradientHover: 'group-hover:from-red-900/20'
        };
      default: 
        return { 
          titleText: <><span className="text-white">{course.title.split(' ')[0]}</span> <span className="text-purple-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.8)]">{course.title.split(' ').slice(1).join(' ')}</span></>,
          badge1: 'bg-purple-900/60 text-purple-300 border border-purple-500/50 shadow-[0_0_10px_rgba(167,139,250,0.5)]', 
          badge2: 'border-white/20 text-gray-200 bg-black/40 backdrop-blur-sm',
          btn: 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.6)] hover:shadow-[0_0_30px_rgba(147,51,234,1)] hover:bg-purple-500', 
          cardBorder: 'hover:border-purple-500/50',
          cardShadow: 'hover:shadow-[0_0_40px_rgba(167,139,250,0.25)]',
          gradientHover: 'group-hover:from-purple-900/20'
        };
    }
  };

  const accent = getAccent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      style={{ willChange: 'transform, opacity' }}
      className={`group relative rounded-[28px] overflow-hidden border border-white/10 bg-[#080808] cursor-pointer flex flex-col h-full w-full min-h-[300px] z-10 ${accent.cardBorder} ${accent.cardShadow}`}
    >
      {/* Background glow pseudo-element */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-500 pointer-events-none z-0 ${accent.gradientHover} group-hover:opacity-100`} />

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between w-full h-full flex-grow">
        <div>
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${accent.badge1}`}>
              {course.slug === "mern-stack" ? 'FULL STACK DEVELOPMENT' : course.category}
            </span>
            <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {course.courseId || course.id}
            </span>
            <span className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border ${accent.badge2} flex items-center gap-1.5`}>
              <span className="opacity-70 text-blue-400">⏱</span> {course.duration}
            </span>
            <span className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${
              (course.mode || 'Hybrid') === 'Remote' 
                ? 'border-sky-500/30 text-sky-300 bg-sky-500/10'
                : (course.mode || 'Hybrid') === 'Onsite'
                ? 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                : 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
            }`}>
              <span>🌐</span> {course.mode || 'Hybrid'}
            </span>
          </div>

          <h3 className="text-[34px] sm:text-[40px] font-black mb-4 leading-[1.1] tracking-tight uppercase">
            {accent.titleText}
          </h3>

          <p className="text-gray-300/80 text-sm leading-relaxed mb-6 font-normal line-clamp-3">
            {course.description || course.overview}
          </p>

          {course.id === 'java-dev' && (
            <div className="hidden xl:flex items-center gap-5 mb-6 text-[11px] text-gray-300 font-medium tracking-wide uppercase">
               <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-purple-400" /> Fast &amp; Scalable</span>
               <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-purple-400" /> Secure &amp; Reliable</span>
               <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5 text-purple-400" /> Enterprise Ready</span>
            </div>
          )}
        </div>

        <Link to={`/course/${course.courseId || course.id || course.firestoreId}`} className="block w-max mt-auto relative z-20">
          <button
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm tracking-wide ${accent.btn} flex items-center gap-2 relative overflow-hidden`}
            style={{ transition: 'box-shadow 0.25s ease, background-color 0.25s ease' }}
          >
            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30" />
            Enroll Now <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </Link>
      </div>


    </motion.div>
  );
}
function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      custom={index}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group p-7 rounded-2xl border border-white/10 hover:border-[var(--color-brand-purple)]/60 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-purple)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-brand-purple)]/20 transition-colors duration-300">
        {feature.icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-3 leading-snug">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

function StageCard({ stage, index, total }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLast = index === total - 1;

  return (
    <div className="flex flex-col lg:flex-row items-center" ref={ref}>
      {/* Card */}
      <motion.div
        variants={fadeUp}
        custom={index * 0.1}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        whileHover={{ y: -8, transition: { duration: 0.25 } }}
        className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 hover:border-[var(--color-brand-purple)]/60 bg-white/[0.03] backdrop-blur-sm transition-all duration-300 w-full lg:max-w-[180px]"
      >
        {/* Number ring */}
        <div className="w-16 h-16 rounded-full border-2 border-[var(--color-brand-purple)] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(157,0,255,0.3)] group-hover:shadow-[0_0_40px_rgba(157,0,255,0.5)] transition-shadow duration-300 bg-black">
          <span className="text-[var(--color-brand-purple-light)]">{stage.icon}</span>
        </div>
        <h4 className="text-base font-bold text-white mb-2">{stage.name}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{stage.desc}</p>
      </motion.div>

      {/* Connector line */}
      {!isLast && (
        <motion.div
          initial={{ scaleX: 0, scaleY: 0 }}
          animate={inView ? { scaleX: 1, scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
          className="hidden lg:block w-12 h-[2px] bg-gradient-to-r from-[var(--color-brand-purple)] to-[var(--color-brand-purple-light)] origin-left mx-1 flex-shrink-0"
        />
      )}
      {/* Mobile connector */}
      {!isLast && (
        <div className="lg:hidden w-[2px] h-8 bg-gradient-to-b from-[var(--color-brand-purple)] to-[var(--color-brand-purple-light)] my-2" />
      )}
    </div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      const formatted = ensureCourseIds(data);
      setCourses(formatted);
    } catch (error) {
      console.error(error);
    }
  };

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
  return (
    <div className="min-h-screen bg-black text-white font-poppins relative overflow-hidden">
      <ParticleBackground />

      {/* ═════════════════ HERO SECTION ═════════════════ */}
      <section className="relative pt-28 pb-10 lg:pb-24 overflow-hidden">

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

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="
    relative z-20
    text-center
    text-[68px]
    sm:text-[100px]
    md:text-[150px]
    lg:text-[190px]
    font-semibold
    text-white
    leading-none
    -mt-20
  "
        >
          Courses
        </motion.h1>
        {/* Arc Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full pointer-events-none z-0 overflow-hidden">
          <motion.img
            src="/course_arc.png"
            alt="Arc"
            className="w-full object-cover"
            animate={{
              y: [0, -12, 0],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Description on Arc */}
        <div className="relative z-20 max-w-4xl mx-auto text-center mt-12 md:mt-40 px-6">          <p
          className="
        text-gray-300
        text-sm
        md:text-base
        leading-relaxed
      "
        >
          At Zentrix Technology, we offer industry-focused training programs
          designed to bridge the gap between academic learning and real-world
          requirements. Our courses combine expert guidance, hands-on projects,
          practical assignments, and internship opportunities to help learners
          develop job-ready skills. Whether you're starting your career or
          upgrading your expertise, our programs provide the knowledge,
          experience, and confidence needed to succeed in today's rapidly
          evolving technology industry.
        </p>
        </div>

      </section>

      {/* ═════════════════ TOP COURSES HEADER ═════════════════ */}
      <section className="max-w-7xl mx-auto px-6 mb-16">

        <div className="border-l-[3px] border-purple-600 pl-8">

          <h2
            className="
        text-white
        text-[48px]
        md:text-[70px]
        font-bold
        leading-none
        mb-4
      "
          >
            Top Courses
          </h2>

          <p
            className="
        text-gray-400
        text-sm
        md:text-base
        max-w-3xl
      "
          >
            Explore our most in-demand courses designed to build practical skills,
            industry expertise, and career-ready knowledge through hands-on
            learning.
          </p>

        </div>


      </section>

      {/* ══════════ COURSE CARDS ══════════ */}
      <section className="relative max-w-7xl mx-auto px-6 pb-4 lg:pb-8 overflow-visible">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {courses.map((course, index) => (
    <div
      key={course.id}
      className="relative w-full h-full flex"
    >
      <CourseCard
        course={course}
        index={index}
      />
    </div>
  ))}
</div>
      </section>
      {/* ================= CURRICULUM CORE FEATURES ================= */}

      <section className="relative pt-4 pb-8 md:pt-6 md:pb-12 flex flex-col items-center text-center px-6 overflow-hidden">

        {/* Same Background Glow as 5-Stage Learning */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-brand-purple)]/10 blur-[140px] pointer-events-none" />


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

        <div className="max-w-7xl mx-auto relative z-10">

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-bold text-white leading-tight"
          >
            Curriculum Core Features
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 max-w-4xl mx-auto text-gray-400 text-[22px] md:text-[26px] lg:text-[30px] leading-relaxed font-light"
          >
            Our training methods are verified against corporate
            <br />
            software demands.
          </motion.p>

        </div>

      </section>
      {/* ══════════ INTERNSHIP BENEFITS ══════════ */}
      < section className="pt-8 pb-10 md:pt-12 md:pb-24 px-6 md:px-12 relative overflow-hidden" >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[var(--color-brand-purple)]/15 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              {/* <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionLabel><Award className="w-4 h-4" /> Internship Program</SectionLabel>
              </motion.div> */}
              <motion.h2
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Certified{' '}
                <span className="text-[var(--color-brand-purple-light)]">Internship</span>{' '}
                Opportunities
              </motion.h2>
              <motion.p
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-400 text-lg leading-relaxed mb-10"
              >
                Every professional course incorporates a mandatory 3-month stipend-incentivised
                corporate software project internship. Work directly alongside Zentrix's active
                developer squads and master technical hierarchies.
              </motion.p>
              {/* <div className="flex gap-8 flex-wrap mb-10">
                {[{ label: '3 Months', sub: 'Duration' }, { label: 'Stipend', sub: 'Incentivised' }, { label: 'Live', sub: 'Client Projects' }].map((s) => (
                  <div key={s.sub}>
                    <div className="text-3xl font-bold text-white mb-1">{s.label}</div>
                    <div className="text-xs uppercase tracking-widest text-gray-500">{s.sub}</div>
                  </div>
                ))}
              </div>
              <button className="px-10 py-4 rounded-full bg-gradient-to-r from-[var(--color-brand-purple)] to-purple-500 text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(157,0,255,0.5)] transition-all duration-300">
                Apply Now
              </button> */}
            </div>

            {/* Right — benefit cards */}
            <div>
              <div className="grid grid-cols-2 gap-6 max-w-[620px] mx-auto">
                {internshipBenefits.map((b, i) => (
                  <motion.div
                    key={b.title}
                    variants={scaleIn}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="flex flex-col items-center text-center p-5 rounded-2xl border border-white/10 hover:border-[var(--color-brand-purple)]/50 bg-white/[0.03] transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-purple)]/10 flex items-center justify-center mb-3 text-[var(--color-brand-purple-light)]">
                      {b.icon}
                    </div>
                    <span className="text-xs font-semibold text-gray-300 leading-tight">{b.title}</span>
                  </motion.div>
                ))}
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 5-STAGE LEARNING ROADMAP ══════════ */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">

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

  {/* Purple Glow */}
  <div
    className="
      absolute
      right-[-20%]
      top-1/2
      -translate-y-1/2
      w-56 h-56
      sm:w-80 sm:h-80
      md:w-[420px] md:h-[420px]
      lg:w-[550px] lg:h-[550px]
      rounded-full
      bg-[var(--color-brand-purple)]/10
      blur-[80px]
      md:blur-[120px]
      lg:blur-[160px]
      pointer-events-none
    "
  />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* Heading */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20"
    >
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        5-Stage Learning Process
      </h2>
    </motion.div>

    {/* Marquee */}
    <div className="relative overflow-hidden">

      {/* Left Fade */}
      <div className="absolute inset-y-0 left-0 z-20 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />

      {/* Right Fade */}
      <div className="absolute inset-y-0 right-0 z-20 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none" />

      <motion.div
        className="
          flex
          flex-nowrap
          items-center
          gap-4
          sm:gap-6
          md:gap-8
          lg:gap-10
          py-4
          w-max
          will-change-transform
        "
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {[...learningStages, ...learningStages].map((stage, i) => (
          <React.Fragment key={i}>

            <div className="flex-shrink-0">
              <StageCard
                stage={stage}
                index={i}
                total={learningStages.length * 2}
              />
            </div>

            {i !== learningStages.length * 2 - 1 && (
              <div className="flex items-center justify-center flex-shrink-0 px-1 sm:px-2 md:px-3 lg:px-4">
                <ChevronRight
                  className="
                    text-purple-400
                    w-4 h-4
                    sm:w-5 sm:h-5
                    md:w-7 md:h-7
                    lg:w-9 lg:h-9
                  "
                />
              </div>
            )}

          </React.Fragment>
        ))}
      </motion.div>

    </div>

  </div>

</section>

      {/* ══════════ WHY CHOOSE ZENTRIX ══════════
      <WhyChooseUs /> */}


      {/* ══════════ TECHNOLOGIES ══════════
      <Technologies />

      ══════════ FOOTER TRANSITION ══════════
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-purple)]/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[var(--color-brand-purple)]/20 blur-[120px] pointer-events-none rounded-full" />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>*/}
    </div>
  );
};

export default Course;