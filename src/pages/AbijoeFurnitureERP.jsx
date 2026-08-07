import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring as useSpringMotion, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, MessageCircle, CheckCircle2, Circle,
  Layers, Code2, Database, Cpu, BarChart3, Users, Package,
  Calculator, Clock, FileText, Settings, ChevronRight, X,
  Monitor, Briefcase, TrendingUp, AlertCircle, ZapIcon
} from 'lucide-react';
import { getProjects, DEFAULT_SEED_PROJECTS } from '../services/projectService';

/* ─── Animation Variants ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Tech Colors ────────────────────────────────────────────────────── */
const techData = [
  { label: 'React.js', color: '#61DAFB', bg: 'rgba(97,218,251,0.1)', border: 'rgba(97,218,251,0.35)', desc: 'Frontend Framework' },
  { label: 'Python Flask', color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.2)', desc: 'Backend REST API' },
  { label: 'MySQL', color: '#00B994', bg: 'rgba(0,185,148,0.1)', border: 'rgba(0,185,148,0.35)', desc: 'Relational Database' },
  { label: 'Tailwind CSS', color: '#38BDF8', bg: 'rgba(56,189,248,0.1)', border: 'rgba(56,189,248,0.35)', desc: 'Utility-first CSS' },
];

/* ─── Statistics ─────────────────────────────────────────────────────── */
const stats = [
  { icon: Briefcase, label: 'Industry', value: 'Furniture Retail & Mfg' },
  { icon: Layers, label: 'Modules', value: '7 Core Modules' },
  { icon: Monitor, label: 'Pages', value: '40+' },
  { icon: Code2, label: 'REST APIs', value: '50+' },
  { icon: Database, label: 'DB Tables', value: '20+' },
];

/* ─── Modules ────────────────────────────────────────────────────────── */
const modules = [
  {
    icon: FileText,
    name: 'Billing',
    color: '#a855f7',
    status: 'done',
    desc: 'Generate itemized bills with GST calculation, customer selection, discount management, and instant print/PDF export.',
  },
  {
    icon: Calculator,
    name: 'Accounting',
    color: '#22d3ee',
    status: 'done',
    desc: 'Double-entry bookkeeping, ledger management, profit & loss statements, and GST return filing support.',
  },
  {
    icon: Users,
    name: 'Attendance',
    color: '#34d399',
    status: 'done',
    desc: 'Track employee check-in/out with daily/monthly attendance reports, leave management, and department-wise summaries.',
  },
  {
    icon: Package,
    name: 'Inventory',
    color: '#f59e0b',
    status: 'indev',
    desc: 'Real-time stock tracking, low-stock alerts, product categories, reorder management, and warehouse location mapping.',
  },
  {
    icon: Settings,
    name: 'Masters',
    color: '#60a5fa',
    status: 'done',
    desc: 'Manage customers, suppliers, products, units, categories, employees, and tax slabs from a central configuration hub.',
  },
  {
    icon: BarChart3,
    name: 'Reports',
    color: '#f472b6',
    status: 'indev',
    desc: 'Business intelligence dashboards with sales trends, expense analytics, inventory reports, and exportable data sheets.',
  },
  {
    icon: Settings,
    name: 'Settings',
    color: '#94a3b8',
    status: 'done',
    desc: 'User roles & permissions, company profile, fiscal year configuration, GST settings, and system preferences.',
  },
];

/* ─── Screenshots ────────────────────────────────────────────────────── */
const screenshots = [
  { label: 'Dashboard', src: '/DASHBOARD.jpeg' },
  { label: 'Billing', src: '/BILLING.jpeg' },
  { label: 'Inventory', src: '/INVENTORY.jpeg' },
  { label: 'Accounting', src: '/ACCOUNTING.jpeg' },
  { label: 'Masters', src: '/MASTERS.jpeg' },
  { label: 'Reports', src: '/REPORTS.jpeg' },
  { label: 'Settings', src: '/SETTINGS.jpeg' },
];

/* ─── Nav Sections ───────────────────────────────────────────────────── */
const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'modules', label: 'Modules' },
  { id: 'screenshots', label: 'Screenshots' },
  { id: 'technology', label: 'Technology' },
  { id: 'roadmap', label: 'Roadmap' },
];

/* ─── Scroll Progress Bar ────────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpringMotion(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] rounded-full"
      css={{ background: 'linear-gradient(90deg, #7c3aed, #9d00ff, #d470ff)' }}
    />
  );
}

/* ─── Sticky Nav ─────────────────────────────────────────────────────── */
function StickyNav({ active, setActiveSection }) {
  const scrollToSection = (id) => {
    if (setActiveSection) setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[72px] z-50 hidden sm:flex justify-center py-4 px-3 pointer-events-none w-full max-w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="pointer-events-auto flex items-center gap-1 p-1 sm:p-1.5 rounded-full border border-white/[0.12] bg-black/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-full overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {navSections.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-200 whitespace-nowrap flex-shrink-0 z-10 ${isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              {isActive && (
                <motion.span
                  layoutId="sticky-nav-active-pill"
                  className="absolute inset-0 bg-purple-600 rounded-full shadow-[0_0_20px_rgba(157,0,255,0.6)] z-[-1]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {s.label}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────────── */
function Lightbox({ src, label, onClose }) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative max-w-5xl w-full rounded-[24px] overflow-hidden border border-white/[0.15]"
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: '0 0 80px rgba(157,0,255,0.35)' }}
      >
        <img src={src} alt={label} className="w-full h-auto object-contain" decoding="async" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-red-600/80 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/60 border border-white/20 text-xs sm:text-sm text-white backdrop-blur-sm">
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function AbijoeFurnitureERP() {
  const { projectId } = useParams();
  const [activeSection, setActiveSection] = useState('overview');
  const [lightbox, setLightbox] = useState(null);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    getProjects().then(all => {
      const target = projectId || 'abijoefurniture-erp';
      let found = all.find(p => p.id === target || p.firestoreId === target);
      if (!found) {
        found = DEFAULT_SEED_PROJECTS.find(p => p.id === target || p.firestoreId === target);
      }
      if (!found) {
        found = all[0] || DEFAULT_SEED_PROJECTS[0];
      }
      if (found) setProjectData(found);
    }).catch(() => {
      const target = projectId || 'abijoefurniture-erp';
      const found = DEFAULT_SEED_PROJECTS.find(p => p.id === target || p.firestoreId === target) || DEFAULT_SEED_PROJECTS[0];
      setProjectData(found);
    });
  }, [projectId]);

  const projectTitle = projectData?.title || 'Abijoe Furnitures ERP Management System';
  const projectSubtitle = projectData?.subtitle || projectData?.category || 'Enterprise ERP · Furniture Industry';
  const projectCategory = projectData?.category || projectData?.subtitle || 'Enterprise ERP';
  const projectStatus = projectData?.status || 'In Development';
  const projectProgress = projectData?.progress || '70%';
  const projectImage = projectData?.image || '/abijoe furniture.png';
  const projectOverview = projectData?.overview || projectData?.description || 'A complete ERP solution for furniture manufacturers and retailers to manage billing, accounting, inventory, attendance, reports, GST, and business operations from a single platform.';
  const projectClient = projectData?.client || 'AbiJoe Furniture';
  const projectYear = projectData?.year || '2026';
  const projectLiveLink = projectData?.liveLink;

  const techList = Array.isArray(projectData?.technologies)
    ? projectData.technologies
    : (typeof projectData?.technologies === 'string'
        ? projectData.technologies.split(',').map(s => s.trim()).filter(Boolean)
        : ['React.js', 'Python Flask', 'MySQL', 'Tailwind CSS']);

  const currentTechData = techList.map(t => {
    const existing = techData.find(td => td.label.toLowerCase() === t.toLowerCase());
    return existing || { label: t, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.35)', desc: 'Technology' };
  });

  const currentStats = [
    { icon: Briefcase, label: 'Client / Industry', value: projectClient },
    { icon: Layers, label: 'Modules', value: projectData?.modulesCount || '7 Core Modules' },
    { icon: Monitor, label: 'Pages', value: projectData?.pagesCount || '40+' },
    { icon: Code2, label: 'REST APIs', value: projectData?.apisCount || '50+' },
    { icon: Database, label: 'DB Tables', value: projectData?.tablesCount || '20+' },
  ];

  const activeScreenshots = (projectData && Array.isArray(projectData.screenshots) && projectData.screenshots.length > 0)
    ? projectData.screenshots
    : screenshots;

  /* Throttled 60fps Scroll spy */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY + 180;

          for (let i = navSections.length - 1; i >= 0; i--) {
            const sectionId = navSections[i].id;
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              if (scrollPosition >= top) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-poppins">

      {/* ── Scroll Progress ── */}
      <ScrollProgress />

      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img src="/tech stack bg.png" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black" />
      </div>
      <div className="fixed top-[-300px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-purple-900/10 blur-[300px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-violet-900/8 blur-[200px] pointer-events-none z-0" />

      {/* ── Back Navigation ── */}
      <div className="relative z-10 pt-28 pb-0 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/ourporfolio"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════ */}
      {/*  HERO SECTION                           */}
      {/* ════════════════════════════════════════ */}
      <section className="relative z-10 pt-8 pb-12 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Status + Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-bold uppercase tracking-wide">
              <span>🚀</span> {projectStatus}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wide">
              <Layers className="w-3 h-3" /> {projectCategory}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-4 sm:mb-6"
          >
            {projectTitle}
          </motion.h1>

          {/* Progress + Tech */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8"
          >
            {/* Progress */}
            <div className="flex items-center gap-3 min-w-[220px]">
              <div className="flex-1 h-2 rounded-full bg-white/[0.08] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #9d00ff, #d470ff)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: projectProgress }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                />
              </div>
              <span className="text-sm font-bold text-purple-300 whitespace-nowrap">{projectProgress} Completed</span>
            </div>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-2">
              {currentTechData.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold border tracking-wide"
                  style={{ background: t.bg, borderColor: t.border, color: t.color }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {projectLiveLink && projectLiveLink.startsWith('http') && (
              <a
                href={projectLiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 text-white"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #9d00ff)',
                  boxShadow: '0 0 30px rgba(157,0,255,0.35)',
                }}
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
            <Link
              to="/your-next-step#get-in-touch"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm tracking-wide border border-white/20 hover:bg-white/[0.07] hover:border-purple-500/50 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" /> Contact Us
            </Link>
          </motion.div>

          {/* ── Hero MacBook Mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[24px] overflow-hidden border border-white/[0.1] cursor-zoom-in"
            style={{
              boxShadow: '0 0 0 1px rgba(168,85,247,0.2), 0 40px 120px rgba(0,0,0,0.8), 0 0 80px rgba(157,0,255,0.1)',
            }}
            onClick={() => setLightbox({ src: projectImage, label: `${projectTitle} Dashboard` })}
          >
            <img
              src={projectImage}
              alt={projectTitle}
              className="w-full h-auto object-cover max-h-[550px] object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Statistics Strip ── */}
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3"
          >
            {currentStats.map(({ icon: Icon, label, value }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-3.5 sm:p-5 rounded-[16px] sm:rounded-[20px] border border-white/[0.07] bg-white/[0.03] backdrop-blur-md text-center hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-purple-900/40 border border-purple-500/25">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
                </div>
                <p className="text-white font-bold text-xs sm:text-sm leading-tight">{value}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Nav ── */}
      <StickyNav active={activeSection} setActiveSection={setActiveSection} />

      {/* ════════════════════════════════════════ */}
      {/*  OVERVIEW                               */}
      {/* ════════════════════════════════════════ */}
      <section id="overview" className="relative z-10 py-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">01 — Overview</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Project Overview</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="p-8 rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md"
            >
              <p className="text-gray-300 text-[16px] leading-[1.75] mb-5">
                The <strong className="text-white">{projectTitle}</strong> is a full-stack,
                enterprise-grade business platform designed and engineered to streamline operations and scale performance.
              </p>
              <p className="text-gray-400 text-[15px] leading-relaxed mb-5">
                {projectOverview}
              </p>
              {Array.isArray(projectData?.features) && projectData.features.length > 0 && (
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-white font-bold text-xs uppercase tracking-wider text-purple-300">Key Features:</h4>
                  {projectData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-gray-300 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              {[
                {
                  icon: TrendingUp,
                  title: 'Business Impact',
                  text: 'Automates key processes, eliminates manual errors, and provides real-time operational visibility for stakeholders.',
                },
                {
                  icon: ZapIcon,
                  title: 'High Performance & Security',
                  text: 'Role-based access control, secure database transactions, and optimized asset loading.',
                },
                {
                  icon: Monitor,
                  title: 'Modern Tech Stack',
                  text: `${techList.join(', ')} — scalable, resilient, and built to modern engineering standards.`,
                },
              ].map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-5 rounded-[20px] border border-white/[0.07] bg-white/[0.03] hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-900/50 border border-purple-500/30 flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1.5">{title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  WORKFLOW                               */}
      {/* ════════════════════════════════════════ */}
      <section id="workflow" className="relative z-10 py-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">02 — Workflow</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Business Workflow</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0"
          >
            {[
              { icon: Users, label: 'Customer', color: '#a855f7', desc: 'Customer walks in or places order online' },
              { icon: FileText, label: 'Billing', color: '#f59e0b', desc: 'Bill generated with GST & product details' },
              { icon: Package, label: 'Inventory', color: '#34d399', desc: 'Stock deducted & stock levels updated' },
              { icon: Calculator, label: 'Accounting', color: '#22d3ee', desc: 'Auto journal entries created in ledger' },
              { icon: BarChart3, label: 'Reports', color: '#f472b6', desc: 'Revenue & insights updated in dashboard' },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col items-center gap-3 min-w-[130px] text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 hover:scale-110"
                    style={{
                      background: `${step.color}18`,
                      borderColor: `${step.color}50`,
                      boxShadow: `0 0 30px ${step.color}25`,
                    }}
                  >
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <p className="font-bold text-sm text-white">{step.label}</p>
                  <p className="text-gray-500 text-xs leading-tight max-w-[110px]">{step.desc}</p>
                </motion.div>

                {i < arr.length - 1 && (
                  <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="w-px h-8 md:h-px md:w-12 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <ChevronRight className="w-5 h-5 text-gray-600 hidden md:block" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  MODULES                                */}
      {/* ════════════════════════════════════════ */}
      <section id="modules" className="relative z-10 py-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">03 — Modules</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Core Modules</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {modules.map((mod) => (
              <motion.div
                key={mod.name}
                variants={fadeUp}
                className="relative group p-6 rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:border-purple-500/35 hover:bg-white/[0.06] transition-all duration-400 hover:shadow-[0_0_40px_rgba(157,0,255,0.12)] hover:-translate-y-1"
              >
                {/* Module status indicator */}
                <div className="absolute top-4 right-4">
                  {mod.status === 'done' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-amber-400" />
                  )}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 border"
                  style={{
                    background: `${mod.color}18`,
                    borderColor: `${mod.color}40`,
                    boxShadow: `0 0 20px ${mod.color}20`,
                  }}
                >
                  <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
                </div>

                <h3 className="font-bold text-base text-white mb-2">{mod.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{mod.desc}</p>

                <div className="mt-4 flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: mod.status === 'done' ? '#34d399' : '#f59e0b' }}
                  />
                  <span className="text-[11px] font-medium" style={{ color: mod.status === 'done' ? '#34d399' : '#f59e0b' }}>
                    {mod.status === 'done' ? 'Completed' : 'In Development'}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  SCREENSHOTS                            */}
      {/* ════════════════════════════════════════ */}
      <section id="screenshots" className="relative z-10 py-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">04 — Screenshots</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Screenshot Gallery</h2>
            <p className="text-gray-500 text-sm mt-3">Click any screenshot to view fullscreen</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {activeScreenshots.map((s, idx) => (
              <motion.div
                key={s.label || idx}
                variants={fadeUp}
                className="relative group overflow-hidden rounded-[20px] border border-white/[0.08] cursor-zoom-in hover:border-purple-500/40 transition-all duration-300"
                style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                onClick={() => setLightbox({ src: s.src, label: s.label })}
              >
                <img
                  src={s.src}
                  alt={s.label}
                  className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">{s.label}</span>
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ExternalLink className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  TECHNOLOGY STACK                       */}
      {/* ════════════════════════════════════════ */}
      <section id="technology" className="relative z-10 py-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">05 — Technology</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Technology Stack</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {techData.map((t) => (
              <motion.div
                key={t.label}
                variants={fadeUp}
                className="group relative p-6 rounded-[24px] border backdrop-blur-md text-center hover:-translate-y-2 transition-all duration-400"
                style={{
                  background: t.bg,
                  borderColor: t.border,
                  boxShadow: `0 0 0 1px ${t.border.replace('0.35', '0.08')}`,
                }}
                whileHover={{ boxShadow: `0 0 40px ${t.color}30, 0 0 0 1px ${t.border}` }}
              >
                {/* Glow orb */}
                <div
                  className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${t.color}12, transparent 70%)` }}
                />

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border text-2xl font-black"
                  style={{ background: `${t.color}15`, borderColor: `${t.color}40`, color: t.color }}
                >
                  {t.label === 'React.js' ? '⚛️' : t.label === 'Python Flask' ? '🐍' : t.label === 'MySQL' ? '🗄️' : '🎨'}
                </div>
                <h3 className="font-black text-base text-white mb-1">{t.label}</h3>
                <p className="text-xs font-medium" style={{ color: t.color }}>{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  DEVELOPMENT ROADMAP                    */}
      {/* ════════════════════════════════════════ */}
      <section id="roadmap" className="relative z-10 py-16 px-6 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3 block">06 — Roadmap</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Development Progress</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Progress Bar Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-7 rounded-[24px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-md col-span-1"
            >
              <h3 className="font-bold text-lg text-white mb-2">Overall Progress</h3>
              <div className="flex items-end gap-3 mb-5">
                <span
                  className="text-6xl font-black"
                  style={{
                    background: 'linear-gradient(135deg, #c084fc, #9d00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {projectProgress}
                </span>
                <span className="text-gray-500 text-sm mb-2">Completed</span>
              </div>
              <div className="h-3 rounded-full bg-white/[0.06] overflow-hidden mb-4">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #9d00ff, #d470ff)' }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: projectProgress }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
              <p className="text-gray-500 text-xs">5 of 7 core modules shipped</p>
            </motion.div>

            {/* Completed */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-7 rounded-[24px] border border-emerald-500/20 bg-emerald-900/[0.06] backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base text-emerald-300">Completed Modules</h3>
              </div>
              <ul className="space-y-2.5">
                {modules.filter(m => m.status === 'done').map((m) => (
                  <li key={m.name} className="flex items-center gap-2.5">
                    <m.icon className="w-4 h-4 flex-shrink-0" style={{ color: m.color }} />
                    <span className="text-gray-300 text-sm font-medium">{m.name}</span>
                    <span className="ml-auto text-[10px] text-emerald-400 font-bold uppercase">Done</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* In Development */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-7 rounded-[24px] border border-amber-500/20 bg-amber-900/[0.06] backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-amber-300">In Development</h3>
              </div>
              <ul className="space-y-2.5 mb-6">
                {modules.filter(m => m.status === 'indev').map((m) => (
                  <li key={m.name} className="flex items-center gap-2.5">
                    <m.icon className="w-4 h-4 flex-shrink-0" style={{ color: m.color }} />
                    <span className="text-gray-300 text-sm font-medium">{m.name}</span>
                    <span className="ml-auto text-[10px] text-amber-400 font-bold uppercase">Active</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/[0.06]">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Future Roadmap</h4>
                <ul className="space-y-1.5">
                  {['Mobile App (React Native)', 'WhatsApp Bill Sharing', 'AI Sales Forecasting', 'Multi-branch Support'].map(r => (
                    <li key={r} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1 h-1 rounded-full bg-gray-600 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  FINAL CTA                              */}
      {/* ════════════════════════════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative p-12 rounded-[32px] border border-purple-500/25 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(0,0,0,0.8), rgba(157,0,255,0.1))',
              boxShadow: '0 0 80px rgba(157,0,255,0.12)',
            }}
          >
            {/* Decorative glow blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-900/15 pointer-events-none rounded-[32px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple-600/10 blur-[80px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                <ZapIcon className="w-3 h-3" />
                Custom ERP Solutions
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
                Need an ERP for your{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #c084fc, #9d00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Business?
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                We build custom ERP systems tailored to your industry. From billing to analytics — let's digitise your entire business.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/your-next-step#get-in-touch"
                  className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-sm tracking-wide transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #9d00ff)',
                    boxShadow: '0 0 40px rgba(157,0,255,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 60px rgba(157,0,255,0.65)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(157,0,255,0.4)'; }}
                >
                  Let's Build Together
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
                <Link
                  to="/ourporfolio"
                  className="flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm tracking-wide border border-white/20 hover:bg-white/[0.07] hover:border-purple-500/50 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            label={lightbox.label}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
