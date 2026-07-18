import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, BookOpen, ChevronRight,
  Send, Loader2, CheckCircle2, Award, Star, Briefcase, Users,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

// ─── EmailJS credentials ───────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ─── Course data ─────────────────────────────────────────────────────────── */
const courseData = {
  'mern-stack': {
    id: 'mern-stack',
    title: 'MERN Stack',
    subtitle: 'Full Stack Development',
    category: 'Development',
    duration: '6 Months',
    level: 'Intermediate',
    image: '/mern_stack.jpeg',
    accentColor: '#6366f1',
    accentGlow: 'rgba(99,102,241,0.25)',
    overview:
      'Build modern, scalable, and high-performance web applications using the MERN Stack. Learn dynamic UI, robust backends, and database-driven apps through real-world projects. Master MongoDB, Express.js, React, and Node.js in a structured, industry-aligned curriculum.',
    curriculum: [
      'HTML, CSS & JavaScript Fundamentals',
      'React.js — Components, Hooks, Context & Redux',
      'Node.js & Express.js — REST APIs & Middleware',
      'MongoDB & Mongoose — Schema Design & Queries',
      'Authentication (JWT / OAuth 2.0)',
      'Deployment (Vercel, Render, Railway)',
      'Capstone Live Project — End-to-End Application',
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Git', 'Redux'],
    internship: true,
    placement: true,
  },
  'java-dev': {
    id: 'java-dev',
    title: 'Java Programming',
    subtitle: 'Backend Development',
    category: 'Development',
    duration: '6 Months',
    level: 'Intermediate',
    image: '/java.jpeg',
    accentColor: '#a855f7',
    accentGlow: 'rgba(168,85,247,0.25)',
    overview:
      'Create fast, scalable web applications using the Java ecosystem. Build backend services with Spring and handle database-driven solutions through real-world projects. Go from Java basics to enterprise-grade Spring Boot applications.',
    curriculum: [
      'Java Core — OOPs, Collections, Exceptions',
      'Data Structures & Algorithms in Java',
      'Spring Boot — REST APIs & MVC',
      'Spring Security & JWT Auth',
      'JPA / Hibernate — ORM & Database Integration',
      'MySQL & PostgreSQL — Advanced Queries',
      'Microservices Architecture & Deployment',
    ],
    skills: ['Java', 'Spring Boot', 'Hibernate', 'MySQL', 'REST APIs', 'Microservices'],
    internship: true,
    placement: true,
  },
  'ui-ux': {
    id: 'ui-ux',
    title: 'UI – UX Designing',
    subtitle: 'Design & User Experience',
    category: 'Design',
    duration: '3 Months',
    level: 'Beginner',
    image: '/ui_ux.jpeg',
    accentColor: '#ec4899',
    accentGlow: 'rgba(236,72,153,0.25)',
    overview:
      'Design intuitive and engaging digital experiences. Learn user-friendly interfaces, enhance usability, and craft visually appealing designs through user research and hands-on projects. Build a professional design portfolio with Figma.',
    curriculum: [
      'Design Thinking & UX Principles',
      'User Research, Personas & Journey Mapping',
      'Wireframing & Information Architecture',
      'Figma — Components, Auto-Layout & Prototyping',
      'UI Design — Typography, Color Theory & Grids',
      'Usability Testing & Iteration',
      'Portfolio Project — Real-World App Design',
    ],
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems', 'Wireframing'],
    internship: false,
    placement: true,
  },
  'python-fullstack': {
    id: 'python-fullstack',
    title: 'Python Full Stack',
    subtitle: 'Full Stack Development',
    category: 'Development',
    duration: '6 Months',
    level: 'Intermediate',
    image: '/python.jpeg',
    accentColor: '#22d3ee',
    accentGlow: 'rgba(34,211,238,0.25)',
    overview:
      'Design and develop modern, efficient web applications using Python full stack. Build interactive front-end and backend logic with Django or Flask, combined with a modern JavaScript front-end.',
    curriculum: [
      'Python Core — OOPs, File I/O, Modules',
      'HTML, CSS & JavaScript Basics',
      'Django — Models, Views, Templates & REST',
      'Flask — Microservice Architecture',
      'SQL & PostgreSQL — Relational Databases',
      'React Front-End Integration',
      'Cloud Deployment — AWS / Heroku',
    ],
    skills: ['Python', 'Django', 'Flask', 'React', 'PostgreSQL', 'REST APIs', 'Git'],
    internship: true,
    placement: true,
  },
  'data-analytics': {
    id: 'data-analytics',
    title: 'Data Analytics',
    subtitle: 'Data Science',
    category: 'Data Science',
    duration: '6 Months',
    level: 'Beginner – Intermediate',
    image: '/data.jpeg',
    accentColor: '#f97316',
    accentGlow: 'rgba(249,115,22,0.25)',
    overview:
      'Transform raw data into meaningful insights. Learn to clean, analyse and visualise data, build reports, and uncover patterns through real-world case studies using Python, SQL and Power BI.',
    curriculum: [
      'Python for Data Analysis — NumPy & Pandas',
      'SQL — Advanced Queries & Analytics',
      'Data Cleaning & Preprocessing Techniques',
      'Statistics & Probability Fundamentals',
      'Data Visualisation — Matplotlib, Seaborn, Plotly',
      'Power BI / Tableau Dashboard Building',
      'Capstone — Industry Dataset Analysis Project',
    ],
    skills: ['Python', 'SQL', 'Pandas', 'Tableau', 'Power BI', 'Statistics', 'Excel'],
    internship: true,
    placement: true,
  },
  'data-science-ml': {
    id: 'data-science-ml',
    title: 'Data Science & ML',
    subtitle: 'Machine Learning',
    category: 'Data Science',
    duration: '3 Months',
    level: 'Advanced',
    image: '/data science.jpeg',
    accentColor: '#10b981',
    accentGlow: 'rgba(16,185,129,0.25)',
    overview:
      'Harness data science and machine learning to build intelligent, data-driven solutions. Develop predictive models and implement algorithms that automate decision-making with Scikit-Learn and TensorFlow.',
    curriculum: [
      'Linear & Logistic Regression',
      'Decision Trees, Random Forests & Ensemble Methods',
      'Clustering — K-Means, DBSCAN',
      'Neural Networks & Deep Learning Basics',
      'NLP — Text Processing & Sentiment Analysis',
      'Model Evaluation & Hyperparameter Tuning',
      'Capstone — Real-World ML Prediction Project',
    ],
    skills: ['Python', 'Scikit-Learn', 'TensorFlow', 'Keras', 'NLP', 'Data Wrangling', 'Statistics'],
    internship: false,
    placement: true,
  },
  ai: {
    id: 'ai',
    title: 'Artificial Intelligence',
    subtitle: 'AI Engineering',
    category: 'AI',
    duration: '4 Months',
    level: 'Advanced',
    image: '/ai.jpeg',
    accentColor: '#ef4444',
    accentGlow: 'rgba(239,68,68,0.25)',
    overview:
      'Explore AI to create smart, adaptive solutions. Build intelligent systems, work with advanced algorithms, and develop AI-powered applications through real-world use cases including computer vision and LLMs.',
    curriculum: [
      'AI Fundamentals & Problem Formulation',
      'Search Algorithms — BFS, DFS, A* & Heuristics',
      'Computer Vision — OpenCV & Image Processing',
      'Deep Learning — CNNs & Object Detection',
      'Large Language Models & Prompt Engineering',
      'Reinforcement Learning Basics',
      'Capstone — AI-Powered Application',
    ],
    skills: ['Python', 'TensorFlow', 'OpenCV', 'LLMs', 'PyTorch', 'Computer Vision', 'Hugging Face'],
    internship: false,
    placement: true,
  },
};

/* ─── Floating particles ──────────────────────────────────────────────────── */
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

/* ─── Enrollment form ─────────────────────────────────────────────────────── */
const EnrollForm = ({ courseTitle }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', qualification: '', message: '', resume: null,
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    if (e.target.name === 'resume') {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      to_email: 'hr.zentrixtechnology@gmail.com',
      job_title: `Course Enrollment — ${courseTitle}`,
      from_name: form.name,
      from_email: form.email,
      from_phone: form.phone,
      message: `Qualification: ${form.qualification}\n\n${form.message || '(No additional message)'}`,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY);
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
        <h3 className="text-2xl font-bold text-white mb-3">Enrollment Submitted!</h3>
        <p className="text-slate-400 max-w-sm mx-auto">
          Thank you for enrolling in{' '}
          <span className="text-purple-400">{courseTitle}</span>.
          Our team will review and reach out to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
          <input
            required name="name" value={form.name} onChange={handleChange}
            placeholder="Your full name"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Phone *</label>
          <input
            required name="phone" value={form.phone} onChange={handleChange}
            placeholder="+91 00000 00000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
        <input
          required type="email" name="email" value={form.email} onChange={handleChange}
          placeholder="you@example.com"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
        />
      </div>

      {/* Qualification */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Highest Qualification *</label>
        <select
          required name="qualification" value={form.qualification} onChange={handleChange}
          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm"
        >
          <option value="" disabled>Select your qualification</option>
          <option>12th / HSC</option>
          <option>Diploma</option>
          <option>B.E / B.Tech</option>
          <option>B.Sc / BCA / B.Com</option>
          <option>M.E / M.Tech</option>
          <option>MCA / MBA</option>
          <option>Other</option>
        </select>
      </div>

      {/* Resume */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resume / CV (optional)</label>
        <div className="relative w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 transition-colors focus-within:border-purple-500 hover:border-white/20">
          <input
            type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange}
            className="w-full text-white text-sm focus:outline-none cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Why do you want to join?</label>
        <textarea
          name="message" value={form.message} onChange={handleChange} rows={4}
          placeholder="Tell us about your background, goals, and why you're interested in this course…"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:hr.zentrixtechnology@gmail.com" className="underline">
            hr.zentrixtechnology@gmail.com
          </a>
        </p>
      )}

      <button
        type="submit" disabled={status === 'sending'}
        className="w-full py-4 rounded-xl font-bold text-white text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
      >
        {status === 'sending' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> Enroll Now</>
        )}
      </button>
    </form>
  );
};

/* ─── Main Component ──────────────────────────────────────────────────────── */
const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courseData[courseId];

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <Link to="/course" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Courses
        </Link>
      </div>
    );
  }

  const perks = [
    course.internship ? 'Included Internship Opportunity' : 'Placement Support Included',
    'Internship Certificate Provided',
    'Hands-on Real-World Projects',
    'Expert Mentorship & Guidance',
    'Resume Building & Mock Interviews',
  ];

  return (
    <main className="min-h-screen bg-black text-white font-poppins relative overflow-x-hidden">

      {/* ── Particles ──────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {PARTICLES.map((p) => (
          <div
            key={p.id} className="service-particle"
            style={{
              width: p.size, height: p.size,
              top: p.top, left: p.left,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              '--tx': p.tx, '--ty': p.ty,
              '--duration': `${p.duration}s`, '--delay': `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Ambient glow ───────────────────────────────────────── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: '900px', height: '500px',
          background: `radial-gradient(ellipse at center, ${course.accentGlow} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-10 pb-24">

        {/* ── Back link ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={() => navigate('/course')} className="flex items-center gap-3 group mb-14">
            <span className="w-1 h-10 rounded-full bg-purple-500 inline-block flex-shrink-0" />
            <span className="text-white/70 group-hover:text-white text-lg font-medium transition-colors">
              Back to{' '}
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                Co<span className="text-white group-hover:text-white">urses</span>
              </span>
            </span>
          </button>
        </motion.div>

        {/* ── Course header ───────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>

          {/* Category badge */}
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium mb-6 bg-white/5">
            {course.category}
          </span>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-3 tracking-tight">
            {course.title}
          </h1>
          <p className="text-lg font-semibold mb-6" style={{ color: course.accentColor }}>
            {course.subtitle}
          </p>

          {/* Overview */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
            {course.overview}
          </p>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-4 mb-16">
            {[
              { icon: <Clock className="w-4 h-4" />, label: course.duration },
              { icon: <BookOpen className="w-4 h-4" />, label: course.level },
              { icon: <Award className="w-4 h-4" />, label: course.internship ? 'Internship Included' : 'Certificate Included' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm">
                <span style={{ color: course.accentColor }}>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Two-column: Curriculum + Form ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Curriculum, Skills, Perks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-8"
          >

            {/* Curriculum */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: course.accentColor }}>
                Curriculum
              </h2>
              <ul className="space-y-3">
                {course.curriculum.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: course.accentColor }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: course.accentColor }}>
                Skills You'll Gain
              </h2>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{
                      color: course.accentColor,
                      borderColor: `${course.accentColor}55`,
                      background: `${course.accentColor}12`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Perks */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: course.accentColor }}>
                What You Get
              </h2>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: course.accentColor }} />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>

          {/* Right: Enrollment form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-1">Enroll in this course</h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill in your details and our team will reach out to you shortly.
              </p>
              <EnrollForm courseTitle={course.title} />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default CourseDetail;
