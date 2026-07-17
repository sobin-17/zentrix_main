import { Link } from "react-router-dom";
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen, Award, Target, Code, Briefcase, Users,
  Cpu, Palette, LineChart, Brain as BrainIcon,
  ChevronDown, Zap, Shield, Star, Rocket, CheckCircle2,
  GraduationCap, Globe, TrendingUp, Layout,
} from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import { ChevronRight } from "lucide-react";
import WhyChooseUs from '../components/WhyChooseUs';
import Technologies from '../components/Technologies';
import Footer from '../components/Footer';


/* ─────────────────── DATA ─────────────────── */

const courses = [
  {
    id: 'mern-stack',
    title: 'MERN STACK',
    category: 'Development',
    duration: '6 Months',
    level: 'Intermediate',
    image: '/mern_stack.jpeg',
    description:
      'Build modern, scalable, and high-performance web applications using the MERN Stack. Learn dynamic UI, robust backends, and database-driven apps through real-world projects.',
    icon: <Code className="w-5 h-5" />,
    bgLabel: 'MERN STACK',
    internship: true,
    placement: true,
  },
  {
    id: 'java-dev',
    title: 'JAVA PROGRAMMING',
    category: 'Development',
    duration: '6 Months',
    level: 'Intermediate',
    image: '/java.jpeg',
    description:
      'Create fast, scalable web applications using the Java ecosystem. Build backend services with Spring and handle database-driven solutions through real-world projects.',
    icon: <Cpu className="w-5 h-5" />,
    bgLabel: 'JAVA',
    internship: true,
    placement: true,
  },
  {
    id: 'ui-ux',
    title: 'UI - UX DESIGNING',
    category: 'Design',
    duration: '3 Months',
    level: 'Beginner',
    image: '/ui_ux.jpeg',
    description:
      'Design intuitive and engaging digital experiences. Learn user-friendly interfaces, enhance usability, and craft visually appealing designs through user research and projects.',
    icon: <Palette className="w-5 h-5" />,
    bgLabel: 'UI-UX',
    internship: false,
    placement: true,
  },
  {
    id: 'python-fullstack',
    title: 'PYTHON FULL STACK DEVELOPMENT ',
    category: 'Development',
    duration: '6 Months',
    level: 'Intermediate',
    image: '/python.jpeg',
    description:
      'Design and develop modern, efficient web applications using Python full stack. Build interactive front-end and backend logic with Django or Flask.',
    icon: <Code className="w-5 h-5" />,
    bgLabel: 'PYTHON',
    internship: true,
    placement: true,
  },
  {
    id: 'data-analytics',
    title: 'DATA ANALYTICS',
    category: 'Data Science',
    duration: '6 Months',
    level: 'Beginner – Intermediate',
    image: '/data.jpeg',
    description:
      'Transform raw data into meaningful insights. Learn to clean, analyse and visualise data, build reports, and uncover patterns through real-world case studies.',
    icon: <LineChart className="w-5 h-5" />,
    bgLabel: 'DATA ANALYTICS',
    internship: true,
    placement: true,
  },
  {
    id: 'data-science-ml',
    title: 'DATA SCIENCE & MACHINE LEARNING',
    category: 'Data Science',
    duration: '3 Months',
    level: 'Advanced',
    image: '/data science.jpeg',
    description:
      'Harness data science and machine learning to build intelligent, data-driven solutions. Develop predictive models and implement algorithms that automate decision-making.',
    icon: <BrainIcon className="w-5 h-5" />,
    bgLabel: 'DATA SCIENCE & MACHINE LEARNING',
    internship: false,
    placement: true,
  },
  {
    id: 'ai',
    title: 'ARTIFICIAL INTELLIGENCE',
    category: 'AI',
    duration: '4 Months',
    level: 'Advanced',
    image: '/ai.jpeg',
    description:
      'Explore AI to create smart, adaptive solutions. Build intelligent systems, work with advanced algorithms, and develop AI-powered applications through real-world use cases.',
    icon: <Target className="w-5 h-5" />,
    bgLabel: 'ARTIFICIAL INTELLIGENCE',
    internship: false,
    placement: true,
  },

];

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.05}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative rounded-[28px] overflow-hidden border border-white/10 hover:border-[var(--color-brand-purple)]/70 bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 cursor-pointer"
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Purple glow on hover */}
      <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 60px 10px rgba(157,0,255,0.18)' }}
      />

      {/* Image */}
      <div className="relative h-[180px] overflow-hidden">        <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
          {/* Category */}
          <span className="px-3 py-1 rounded-full bg-white text-black text-[9px] font-bold uppercase tracking-wide shadow-md">
            {course.category}
          </span>

          {/* Duration */}
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white text-[9px] font-bold uppercase shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            {course.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-7">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[var(--color-brand-purple-light)] transition-colors duration-300 leading-snug">
          {course.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
          {course.description}
        </p>

        <Link
          to="/get-touch"
          className="block w-full"
        >
          <button
            className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[var(--color-brand-purple)] to-purple-500 hover:from-purple-500 hover:to-[var(--color-brand-purple-light)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(157,0,255,0.4)]"
          >
            Enroll Now
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
  return (
    <div className="min-h-screen bg-black text-white font-poppins relative overflow-hidden">
      <ParticleBackground />

      {/* ═════════════════ HERO SECTION ═════════════════ */}
      <section className="relative pt-28 pb-24 overflow-hidden">

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
    text-[100px]
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
        <div className="relative z-20 max-w-4xl mx-auto text-center mt-40 px-6">          <p
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
      <section className="relative max-w-7xl mx-auto px-6 pb-24 overflow-visible">

        <div className="space-y-12">

          {courses.map((course, index) => (

            <div
              key={course.id}
              className={`relative flex ${index % 2 === 0
                ? "justify-start"
                : "justify-end"
                }`}
            >

              {/* Animated Background Text */}
              {/* Full Screen Animated Background Text */}
              <div
                className={`absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center`}
              >
                <div
                  className={`flex whitespace-nowrap ${index % 2 === 0
                    ? "animate-marquee-left"
                    : "animate-marquee-right"
                    }`}
                  style={{ width: "250vw" }}
                >
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span
                      key={i}
                      className="mx-12 text-[180px] font-black uppercase tracking-[0.2em] text-white/[0.04] select-none"
                    >
                      {course.bgLabel}
                    </span>
                  ))}
                </div>
              </div>
              {/* COURSE CARD */}
              <div className="relative z-10 w-full max-w-[600px]">

                <CourseCard
                  course={course}
                  index={index}
                />

              </div>

            </div>

          ))}

        </div>

      </section>
      {/* ================= CURRICULUM CORE FEATURES ================= */}

      <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">

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
            className="text-[56px] md:text-[72px] lg:text-[88px] font-bold text-white leading-tight"
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
      < section className="py-24 px-6 md:px-12 relative overflow-hidden" >
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
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">

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
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--color-brand-purple)]/10 blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">

            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
            >
              5-Stage Learning Process
            </motion.h2>

          </div>

          {/* Stages */}
          <div className="overflow-hidden w-full py-6">

  <motion.div
    className="flex items-center gap-8 w-max"
    animate={{
      x: ["0%", "-50%"],
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {[...learningStages, ...learningStages].map((stage, i) => (
      <React.Fragment key={i}>

        <StageCard
          stage={stage}
          index={i}
          total={learningStages.length * 2}
        />

        {i !== learningStages.length * 2 - 1 && (
          <div className="flex items-center">
            <ChevronRight className="w-10 h-10 text-purple-400" />
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