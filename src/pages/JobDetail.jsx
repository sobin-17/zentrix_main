import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Briefcase, ChevronRight, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── EmailJS credentials ─────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ─── All job data (mirrors Careers.jsx) ─────────────────────────────── */
const jobData = {
  python: {
    id: 'python',
    title: 'Python Developer Intern',
    category: 'Software Development',
    experience: '3 – 6 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'We are seeking a motivated and enthusiastic Python Developer Intern to join our development team. The intern will work on real-world projects, contribute to software development activities, and gain hands-on experience in Python programming, web development, APIs, databases, and modern development practices.',
    responsibilities: [
      'Write clean, efficient Python code for backend development tasks',
      'Assist in building RESTful APIs using Flask / FastAPI / Django',
      'Work with SQL and NoSQL databases (MySQL, MongoDB)',
      'Collaborate with the team to design and implement software solutions',
      'Debug, test, and optimize existing applications',
      'Participate in code reviews and technical discussions',
      'Document code and maintain project wikis',
    ],
    skills: ['Python', 'REST APIs', 'Git', 'SQL / MongoDB', 'Problem Solving'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
  mern: {
    id: 'mern',
    title: 'MERN Stack Intern',
    category: 'Full Stack Development',
    experience: '3 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'Join our team to build modern web applications using MongoDB, Express.js, React, and Node.js through hands-on real-world projects. You will be exposed to the full development lifecycle from planning to deployment.',
    responsibilities: [
      'Build responsive UIs using React and Tailwind CSS',
      'Develop Node.js / Express.js REST APIs',
      'Integrate MongoDB databases for data persistence',
      'Work with Git for version control and collaboration',
      'Optimize application performance and user experience',
      'Write unit tests and participate in code reviews',
      'Deploy applications using cloud services',
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Git'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
  uiux: {
    id: 'uiux',
    title: 'UI / UX Intern',
    category: 'Design',
    experience: '3 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'Create user-friendly interfaces, wireframes, prototypes, and engaging digital experiences using industry-standard tools. Work alongside developers and product managers to bring ideas to life.',
    responsibilities: [
      'Design wireframes, mockups and interactive prototypes',
      'Conduct user research and usability testing',
      'Create design systems, components and style guides',
      'Collaborate with developers to ensure pixel-perfect implementation',
      'Iterate designs based on feedback and analytics',
      'Produce social media visuals and marketing materials',
      'Maintain brand consistency across all deliverables',
    ],
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
  graphic: {
    id: 'graphic',
    title: 'Graphic Design Intern',
    category: 'Design',
    experience: '3 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'Design creative visuals, social media content, branding materials, and marketing assets that elevate our brand identity and engage our audiences across all digital and print channels.',
    responsibilities: [
      'Create branded graphics for social media, ads and websites',
      'Design logos, banners, flyers and marketing collateral',
      'Develop visual concepts aligned with brand guidelines',
      'Collaborate with the marketing team on campaigns',
      'Prepare print-ready and digital-ready artwork',
      'Participate in creative brainstorming sessions',
      'Organise and manage design assets and files',
    ],
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'Typography', 'Color Theory'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
  video: {
    id: 'video',
    title: 'Video Editor Intern',
    category: 'Media Production',
    experience: '3 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'Edit and enhance videos, add visual effects, transitions, and create engaging multimedia content for our brand channels, social media, and client deliverables.',
    responsibilities: [
      'Edit raw footage into polished, professional videos',
      'Add motion graphics, transitions and visual effects',
      'Colour grade and audio mix final deliverables',
      'Create short-form content for Instagram, YouTube & TikTok',
      'Collaborate with the creative team on storyboards',
      'Manage and organise media assets efficiently',
      'Export videos in formats optimised for different platforms',
    ],
    skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Colour Grading'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
  digital: {
    id: 'digital',
    title: 'Digital Marketing Intern',
    category: 'Marketing',
    experience: '3 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'Learn social media marketing, content strategy, campaign management, and online brand promotion. Work on live campaigns and help grow the Zentrix digital presence across multiple platforms.',
    responsibilities: [
      'Plan and schedule content across social media platforms',
      'Assist in running paid ad campaigns (Meta, Google)',
      'Write engaging captions, blogs and email newsletters',
      'Track and report campaign KPIs and analytics',
      'Research industry trends and competitor strategies',
      'Engage with online communities and respond to followers',
      'Support the team in influencer outreach and partnerships',
    ],
    skills: ['Social Media', 'Content Writing', 'Google Analytics', 'Meta Ads', 'Email Marketing'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
  seo: {
    id: 'seo',
    title: 'SEO Analyst Intern',
    category: 'Digital Marketing',
    experience: '3 Months',
    type: 'Internship',
    location: 'Nagercoil, Tamil Nadu',
    overview:
      'Optimise websites for search engines, conduct keyword research, and improve online visibility and rankings. Gain hands-on experience with industry-leading SEO tools and strategies.',
    responsibilities: [
      'Conduct keyword research and competitive analysis',
      'Perform on-page and off-page SEO optimisation',
      'Audit websites for technical SEO issues',
      'Build quality backlinks through outreach',
      'Track rankings, traffic and conversions via Google Analytics',
      'Create SEO reports and present insights to the team',
      'Optimise meta tags, headings and content structure',
    ],
    skills: ['Google Search Console', 'SEMrush / Ahrefs', 'On-page SEO', 'Link Building', 'Analytics'],
    stipend: 'Merit-based stipend',
    certificate: 'Internship certificate provided',
  },
};

/* ─── Floating particles (reused style) ─────────────────────────────── */
const PARTICLES = Array.from({ length: 50 }, (_, i) => {
  const colors = ['#00c6ff', '#a855f7', '#ec4899', '#ffffff'];
  return {
    id: i,
    size: Math.random() * 2.5 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    tx: `${(Math.random() - 0.5) * 150}px`,
    ty: `${(Math.random() - 0.5) * 150}px`,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
});

/* ─── Application Form ───────────────────────────────────────────────── */
const ApplyForm = ({ jobTitle }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      to_email:    'hr.zentrixtechnology@gmail.com',
      job_title:   jobTitle,
      from_name:   form.name,
      from_email:  form.email,
      from_phone:  form.phone,
      message:     form.message || '(No additional message provided)',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-purple-600/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-6">
          <Send className="w-8 h-8 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Application Submitted!</h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          Thank you for applying for <span className="text-purple-400">{jobTitle}</span>.
          Our HR team will review your application and reach out soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Phone *</label>
          <input
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 00000 00000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
        <input
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Why should we hire you?</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself, your skills, and why you're interested in this role…"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or email us directly at{' '}
          <a href="mailto:hr.zentrixtechnology@gmail.com" className="underline">
            hr.zentrixtechnology@gmail.com
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Submit Application
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};


/* ─── Main Component ─────────────────────────────────────────────────── */
const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const job = jobData[jobId];

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Role Not Found</h1>
        <Link to="/career" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-poppins relative overflow-x-hidden">
      {/* ── Particles ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {PARTICLES.map((p) => (
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

      {/* ── Ambient glow ──────────────────────────────────────── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(139,46,255,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-10 pb-24">
        {/* ── Back link ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/career')}
            className="flex items-center gap-3 group mb-14"
          >
            <span className="w-1 h-10 rounded-full bg-purple-500 inline-block flex-shrink-0" />
            <span className="text-white/70 group-hover:text-white text-lg font-medium transition-colors">
              Back to{' '}
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                Opp<span className="text-white group-hover:text-white">ortunities</span>
              </span>
            </span>
          </button>
        </motion.div>

        {/* ── Job header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Category badge */}
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium mb-6 bg-white/5">
            {job.category}
          </span>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 tracking-tight">
            {job.title}
          </h1>

          {/* Overview */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
            {job.overview}
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-4 mb-16">
            {[
              { icon: <MapPin className="w-4 h-4" />, label: job.location },
              { icon: <Clock className="w-4 h-4" />, label: job.experience },
              { icon: <Briefcase className="w-4 h-4" />, label: job.type },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm"
              >
                <span className="text-purple-400">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Two-column layout: details + form ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Responsibilities + Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-8"
          >
            {/* Responsibilities */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-6">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-5">
                Skills Required
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold text-purple-300 border border-purple-500/40 bg-purple-500/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-5">
                What You Get
              </h2>
              <ul className="space-y-3">
                {[job.stipend, job.certificate, 'Hands-on real-world project exposure', 'Expert mentorship & guidance'].map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Apply form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-6 bg-white/[0.03] border border-white/8 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-1">Apply for this role</h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill in your details and we'll get back to you shortly.
              </p>
              <ApplyForm jobTitle={job.title} />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default JobDetail;
