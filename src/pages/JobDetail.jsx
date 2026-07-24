import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Briefcase, ChevronRight, Send, Loader2, X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getCareers } from "../services/careerService";
import { ensureCareerJobIds, getPredefinedDetailsForRole } from "../utils/jobIdHelper";
import { addApplication } from "../services/applicationService";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ─── EmailJS credentials ─────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ─── All job data (mirrors Careers.jsx) ─────────────────────────────── */
// const jobData = {
//   python: {
//     id: 'python',
//     title: 'Python Developer Intern',
//     category: 'Software Development',
//     experience: '3 – 6 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'We are seeking a motivated and enthusiastic Python Developer Intern to join our development team. The intern will work on real-world projects, contribute to software development activities, and gain hands-on experience in Python programming, web development, APIs, databases, and modern development practices.',
//     responsibilities: [
//       'Write clean, efficient Python code for backend development tasks',
//       'Assist in building RESTful APIs using Flask / FastAPI / Django',
//       'Work with SQL and NoSQL databases (MySQL, MongoDB)',
//       'Collaborate with the team to design and implement software solutions',
//       'Debug, test, and optimize existing applications',
//       'Participate in code reviews and technical discussions',
//       'Document code and maintain project wikis',
//     ],
//     skills: ['Python', 'REST APIs', 'Git', 'SQL / MongoDB', 'Problem Solving'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
//   mern: {
//     id: 'mern',
//     title: 'MERN Stack Intern',
//     category: 'Full Stack Development',
//     experience: '3 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'Join our team to build modern web applications using MongoDB, Express.js, React, and Node.js through hands-on real-world projects. You will be exposed to the full development lifecycle from planning to deployment.',
//     responsibilities: [
//       'Build responsive UIs using React and Tailwind CSS',
//       'Develop Node.js / Express.js REST APIs',
//       'Integrate MongoDB databases for data persistence',
//       'Work with Git for version control and collaboration',
//       'Optimize application performance and user experience',
//       'Write unit tests and participate in code reviews',
//       'Deploy applications using cloud services',
//     ],
//     skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Git'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
//   uiux: {
//     id: 'uiux',
//     title: 'UI / UX Intern',
//     category: 'Design',
//     experience: '3 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'Create user-friendly interfaces, wireframes, prototypes, and engaging digital experiences using industry-standard tools. Work alongside developers and product managers to bring ideas to life.',
//     responsibilities: [
//       'Design wireframes, mockups and interactive prototypes',
//       'Conduct user research and usability testing',
//       'Create design systems, components and style guides',
//       'Collaborate with developers to ensure pixel-perfect implementation',
//       'Iterate designs based on feedback and analytics',
//       'Produce social media visuals and marketing materials',
//       'Maintain brand consistency across all deliverables',
//     ],
//     skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
//   graphic: {
//     id: 'graphic',
//     title: 'Graphic Design Intern',
//     category: 'Design',
//     experience: '3 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'Design creative visuals, social media content, branding materials, and marketing assets that elevate our brand identity and engage our audiences across all digital and print channels.',
//     responsibilities: [
//       'Create branded graphics for social media, ads and websites',
//       'Design logos, banners, flyers and marketing collateral',
//       'Develop visual concepts aligned with brand guidelines',
//       'Collaborate with the marketing team on campaigns',
//       'Prepare print-ready and digital-ready artwork',
//       'Participate in creative brainstorming sessions',
//       'Organise and manage design assets and files',
//     ],
//     skills: ['Photoshop', 'Illustrator', 'InDesign', 'Canva', 'Typography', 'Color Theory'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
//   video: {
//     id: 'video',
//     title: 'Video Editor Intern',
//     category: 'Media Production',
//     experience: '3 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'Edit and enhance videos, add visual effects, transitions, and create engaging multimedia content for our brand channels, social media, and client deliverables.',
//     responsibilities: [
//       'Edit raw footage into polished, professional videos',
//       'Add motion graphics, transitions and visual effects',
//       'Colour grade and audio mix final deliverables',
//       'Create short-form content for Instagram, YouTube & TikTok',
//       'Collaborate with the creative team on storyboards',
//       'Manage and organise media assets efficiently',
//       'Export videos in formats optimised for different platforms',
//     ],
//     skills: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Motion Graphics', 'Colour Grading'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
//   digital: {
//     id: 'digital',
//     title: 'Digital Marketing Intern',
//     category: 'Marketing',
//     experience: '3 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'Learn social media marketing, content strategy, campaign management, and online brand promotion. Work on live campaigns and help grow the Zentrix digital presence across multiple platforms.',
//     responsibilities: [
//       'Plan and schedule content across social media platforms',
//       'Assist in running paid ad campaigns (Meta, Google)',
//       'Write engaging captions, blogs and email newsletters',
//       'Track and report campaign KPIs and analytics',
//       'Research industry trends and competitor strategies',
//       'Engage with online communities and respond to followers',
//       'Support the team in influencer outreach and partnerships',
//     ],
//     skills: ['Social Media', 'Content Writing', 'Google Analytics', 'Meta Ads', 'Email Marketing'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
//   seo: {
//     id: 'seo',
//     title: 'SEO Analyst Intern',
//     category: 'Digital Marketing',
//     experience: '3 Months',
//     type: 'Internship',
//     location: 'Nagercoil, Tamil Nadu',
//     overview:
//       'Optimise websites for search engines, conduct keyword research, and improve online visibility and rankings. Gain hands-on experience with industry-leading SEO tools and strategies.',
//     responsibilities: [
//       'Conduct keyword research and competitive analysis',
//       'Perform on-page and off-page SEO optimisation',
//       'Audit websites for technical SEO issues',
//       'Build quality backlinks through outreach',
//       'Track rankings, traffic and conversions via Google Analytics',
//       'Create SEO reports and present insights to the team',
//       'Optimise meta tags, headings and content structure',
//     ],
//     skills: ['Google Search Console', 'SEMrush / Ahrefs', 'On-page SEO', 'Link Building', 'Analytics'],
//     stipend: 'Merit-based stipend',
//     certificate: 'Internship certificate provided',
//   },
// };

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

const fileToDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/* ─── Application Form ───────────────────────────────────────────────── */
const ApplyForm = ({ jobTitle, jobId }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', resume: null });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const fileInputRef = useRef(null);

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

    try {
      let resumeUrl = "";

      if (form.resume) {
        try {
          const cleanFileName = form.resume.name.replace(/[^a-zA-Z0-9._-]/g, '_');
          const resumeRef = ref(storage, `career-resumes/${Date.now()}_${cleanFileName}`);

          const uploadPromise = uploadBytes(resumeRef, form.resume).then(async () => {
            return await getDownloadURL(resumeRef);
          });

          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Storage timeout")), 5000)
          );

          const result = await Promise.race([uploadPromise, timeoutPromise]);
          if (result && result.startsWith('http')) {
            resumeUrl = result;
          } else {
            throw new Error("Invalid storage result");
          }
        } catch (storageErr) {
          console.warn("Firebase Storage unavailable or restricted. Falling back to Data URL:", storageErr);
          try {
            resumeUrl = await fileToDataURL(form.resume);
          } catch (dataUrlErr) {
            console.error("Failed to read file as Data URL:", dataUrlErr);
            resumeUrl = "Upload Failed - Read Error";
          }
        }
      }

      const applicationData = {
        careerId: jobId || 'general',
        jobTitle: jobTitle || 'General Application',
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message ? form.message.trim() : '',
        resumeUrl: resumeUrl || 'No resume uploaded',
        status: "New",
        appliedDate: new Date().toISOString()
      };

      const firestorePromise = addApplication(applicationData);
      const firestoreTimeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Database write timed out")), 10000)
      );

      await Promise.race([firestorePromise, firestoreTimeout]);

      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        const templateParams = {
          to_email: 'hr.zentrixtechnology@gmail.com',
          job_title: jobTitle,
          from_name: form.name,
          from_email: form.email,
          from_phone: form.phone,
          message: form.message || '(No additional message provided)',
          resume_url: resumeUrl,
        };

        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        ).catch(err => console.warn("EmailJS notification error:", err));
      }

      setStatus('success');
    } catch (err) {
      console.error("Submission failed:", err);
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
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Resume / CV *</label>
        <div className="relative w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 transition-colors focus-within:border-purple-500 hover:border-white/20">
          <input
            required
            ref={fileInputRef}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="w-full text-white text-sm focus:outline-none cursor-pointer file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 transition-all pr-12"
          />
          {form.resume && (
            <button
              type="button"
              onClick={() => {
                setForm(prev => ({ ...prev, resume: null }));
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400 p-1.5 bg-red-500/10 rounded-full transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
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
  
  const [fetchedJob, setFetchedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const rawCareers = await getCareers();
        const careers = ensureCareerJobIds(rawCareers);
        const searchId = (jobId || '').toLowerCase();

        const found = careers.find(
          (j) =>
            (j.jobId && j.jobId.toLowerCase() === searchId) ||
            (j.id && j.id.toLowerCase() === searchId) ||
            (j.firestoreId && j.firestoreId.toLowerCase() === searchId)
        );

        setFetchedJob(found);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  const job = fetchedJob;

  if (!job) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Role Not Found</h1>

        <Link
          to="/career"
          className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </Link>
      </div>
    );
  }

  const predefined = getPredefinedDetailsForRole(job.id || job.title || job.jobId);

  const hasSpecificResp = job.responsibilities && job.responsibilities.length > 0 && !job.responsibilities[0].includes('Contribute to real-world');
  const hasSpecificSkills = job.skills && job.skills.length > 0 && !job.skills[0].includes('Relevant domain skills');
  const hasSpecificGet = job.whatYouGet && job.whatYouGet.length > 0 && !job.whatYouGet[0].includes('Hands-on real-world');

  const responsibilities = hasSpecificResp ? job.responsibilities : predefined.responsibilities;
  const skills = hasSpecificSkills ? job.skills : predefined.skills;
  const whatYouGet = hasSpecificGet ? job.whatYouGet : predefined.whatYouGet;
  const overview = job.overview || job.description || predefined.overview;
  const category = job.category || predefined.category;

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

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-20 sm:pt-24 md:pt-28 pb-24">
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
          {/* Category & Job ID badges */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium bg-white/5">
              {category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-mono font-bold border border-purple-500/30">
              JOB ID: {job.jobId || job.id}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 tracking-tight">
            {job.title}
          </h1>

          {/* Overview */}
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mb-10">
            {overview}
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
                {responsibilities.map((item, i) => (
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
                {skills.map((skill) => (
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
                {whatYouGet.map((perk, index) => (
                  <li key={`${index}-${perk}`} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
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
              <ApplyForm jobTitle={job.title} jobId={job.firestoreId || job.id || 'unknown'} />
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default JobDetail;
