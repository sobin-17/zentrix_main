import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Layers, Code2, Database, Cpu, ChevronRight } from 'lucide-react';

/* ─── Animation Variants ────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Tech Tag Component ─────────────────────────────────────────────── */
const techColors = {
  'React.js':     { bg: 'rgba(97,218,251,0.12)',  border: 'rgba(97,218,251,0.4)',  text: '#61DAFB' },
  'Python Flask': { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.25)',text: '#ffffff' },
  'MySQL':        { bg: 'rgba(0,183,148,0.12)',   border: 'rgba(0,183,148,0.4)',   text: '#00B994' },
  'Tailwind CSS': { bg: 'rgba(56,189,248,0.12)',  border: 'rgba(56,189,248,0.4)',  text: '#38BDF8' },
};

function TechTag({ label }) {
  const c = techColors[label] || { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.4)', text: '#a855f7' };
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide border"
      style={{ background: c.bg, borderColor: c.border, color: c.text }}
    >
      {label}
    </span>
  );
}

/* ─── Mouse-Tilt Card ────────────────────────────────────────────────── */
function TiltCard({ children, className = '', onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        touchAction: 'pan-y',
      }}
      animate={{
        y: hovered ? -12 : 0,
        boxShadow: hovered
          ? '0 0 0 1px rgba(168,85,247,0.6), 0 0 60px rgba(157,0,255,0.35), 0 30px 80px rgba(0,0,0,0.6)'
          : '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.4)',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating Particles ─────────────────────────────────────────────── */
function FloatingParticles() {
  const [particles] = useState(() => {
    const colors = ['#9d00ff', '#d470ff', '#a855f7', '#7c3aed', '#60a5fa'];
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 180}px`,
      ty: `${(Math.random() - 0.5) * 180}px`,
      delay: Math.random() * 6,
      duration: Math.random() * 5 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  });

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="service-particle absolute pointer-events-none"
          style={{
            width: p.size, height: p.size,
            top: p.top, left: p.left,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            willChange: 'transform',
            transform: 'translateZ(0)',
            '--tx': p.tx, '--ty': p.ty,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ─── Main Portfolio Page ─────────────────────────────────────────────── */
export default function OurPortfolio() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleProjectClick = () => {
    navigate('/portfolio/abijoefurniture-erp');
  };

  const technologies = ['React.js', 'Python Flask', 'MySQL', 'Tailwind CSS'];

  return (
    <div className="relative min-h-screen bg-black text-white font-poppins">

      {/* ── Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/tech stack bg.png"
          alt=""
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      </div>

      {/* ── Ambient glow orbs ── */}
      <div className="fixed top-[-300px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-purple-900/10 blur-[250px] pointer-events-none z-0" />
      <div className="fixed bottom-[-200px] right-0 w-[700px] h-[700px] rounded-full bg-violet-900/8 blur-[200px] pointer-events-none z-0" />

      {/* ── Floating Particles ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <FloatingParticles />
      </div>

      {/* ════════════════════════════════════════ */}
      {/*  HERO SECTION                           */}
      {/* ════════════════════════════════════════ */}
      <section className="relative pt-32 md:pt-40 pb-8 md:pb-12 z-10">
        <div className="max-w-5xl mx-auto px-6 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/40 bg-purple-900/20 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-semibold tracking-widest uppercase">Our Work</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-black text-[56px] sm:text-[80px] md:text-[110px] leading-[0.9] tracking-[-0.04em] mb-6"
          >
            Our{' '}
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #9d00ff 40%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Portfolio
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Discover innovative software solutions developed by Zentrix Technology.
          </motion.p>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-32 h-px mx-auto mt-10 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  SECTION LABEL                          */}
      {/* ════════════════════════════════════════ */}
      <section className="relative z-10 pt-6 pb-4">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Featured Project</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/*  FEATURED PROJECT CARD                  */}
      {/* ════════════════════════════════════════ */}
      <section className="relative z-10 pb-24 pt-8">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard
              className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.1] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent backdrop-blur-xl cursor-pointer group"
              onClick={handleProjectClick}
            >
              {/* Inner gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent rounded-[24px] sm:rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Shimmer border on hover */}
              <div
                className="absolute inset-0 rounded-[24px] sm:rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(168,85,247,0.5)' }}
              />

              {/* ── Thumbnail ── */}
              <div className="relative overflow-hidden rounded-t-[24px] sm:rounded-t-[32px] bg-gradient-to-br from-gray-900 to-black h-48 sm:h-64 md:h-80">
                {/* Placeholder shimmer while loading */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-violet-900/20 animate-pulse" />
                )}

                <img
                  src="/abijoe furniture.png"
                  alt="AbiJoe Furniture ERP Project"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Overlay gradient for thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />

                {/* Status Badge overlay on thumbnail */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full bg-amber-500/20 border border-amber-400/40 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold tracking-wide uppercase">
                    <span className="text-xs sm:text-base">🚧</span>
                    In Development
                  </span>
                </div>

                {/* "Case Study" hint badge top-right */}
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-purple-600/80 border border-purple-400/50 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold">
                    View Case Study
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* ── Card Body ── */}
              <div className="relative z-10 p-4 sm:p-7 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-4 sm:gap-6 md:gap-10">

                  {/* Left: Info */}
                  <div className="flex-1">
                    {/* Project category */}
                    <p className="text-purple-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-3 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      Enterprise ERP · Furniture Industry
                    </p>

                    {/* Project Name */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-tight text-white mb-2 sm:mb-4 group-hover:text-purple-100 transition-colors duration-300">
                      ABIJOE FURNITURE ERP PROJECT
                    </h2>

                    {/* Description */}
                    <p className="text-gray-400 text-xs sm:text-sm md:text-[15px] leading-relaxed mb-3 sm:mb-6 max-w-2xl">
                      A complete ERP solution for furniture manufacturers and retailers to manage billing,
                      accounting, inventory, attendance, reports, GST, and business operations from a single platform.
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-8">
                      {technologies.map((tech) => (
                        <TechTag key={tech} label={tech} />
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-1 sm:mb-2">
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">Development Progress</span>
                        <span className="text-[10px] sm:text-xs font-bold text-purple-300">70% Completed</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #7c3aed, #9d00ff, #d470ff)' }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: '70%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="flex flex-col items-start md:items-end gap-3 sm:gap-4 md:min-w-[180px] md:pt-2">
                    {/* Module count chips */}
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 w-full md:w-auto">
                      {[
                        { icon: Layers, label: '7 Modules' },
                        { icon: Code2, label: '40+ Pages' },
                        { icon: Database, label: '50+ APIs' },
                        { icon: Cpu, label: '20+ Tables' },
                      ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2">
                          <Icon className="w-3 h-3 text-purple-400 flex-shrink-0" />
                          <span className="text-white/70 text-[11px] sm:text-xs font-medium whitespace-nowrap">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Primary CTA */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleProjectClick(); }}
                      className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 group/btn"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #9d00ff)',
                        boxShadow: '0 0 30px rgba(157,0,255,0.3)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 50px rgba(157,0,255,0.6)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(157,0,255,0.3)'; }}
                    >
                      View Project
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>

                    {/* Hint text */}
                    <p className="text-gray-600 text-[10px] sm:text-xs text-center md:text-right leading-snug w-full">
                      Click anywhere on the card to open full case study
                    </p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom fade ── */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-0" />
    </div>
  );
}