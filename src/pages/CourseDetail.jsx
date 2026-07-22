import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, BookOpen, ChevronRight,
  Send, Loader2, CheckCircle2, Award, Star, Briefcase, Users,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getCourses } from "../services/courseService";
import { addEnrollment } from "../services/enrollmentService";

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// ─── EmailJS credentials ───────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ─── Course data ─────────────────────────────────────────────────────────── */


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
const EnrollForm = ({ course }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', qualification: '', message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    

    const templateParams = {
      to_email: 'hr.zentrixtechnology@gmail.com',
      job_title: `Course Enrollment — ${course.title}`,
      from_name: form.name,
      from_email: form.email,
      from_phone: form.phone,
      message: `Qualification: ${form.qualification}\n\n${form.message || '(No additional message)'}`,
    };

    try {


      let resumeUrl = "";

      if (form.resume) {
        try {
          const resumeRef = ref(
            storage,
            `course-resumes/${Date.now()}-${form.resume.name}`
          );

          await uploadBytes(resumeRef, form.resume);
          resumeUrl = await getDownloadURL(resumeRef);
        } catch (storageErr) {
          console.warn("Storage upload failed - check Firebase Storage rules or network.", storageErr);
          resumeUrl = "Upload Failed - Firebase Storage Error";
        }
      }
      await addEnrollment({
        courseId: course.id,
        courseTitle: course.title,
        name: form.name,
        email: form.email,
        phone: form.phone,
        qualification: form.qualification,
        message: form.message,
        status: "New",
        enrolledDate: new Date().toISOString(),
        resume: resumeUrl,
      });
  
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        try {
          const emailTask = emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
          );
          const emailTimeout = new Promise((_, reject) => setTimeout(() => reject(new Error("EmailJS Timeout")), 5000));
          await Promise.race([emailTask, emailTimeout]);
        } catch (emailErr) {
          console.warn("EmailJS bypassed - likely blocked by network, adblockers, or timeout.", emailErr);
        }
      } else {
        console.warn("EmailJS credentials missing - skipping email notification.");
      }
  
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
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
          <span className="text-purple-400">{course.title}</span>.
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

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        const courses = await getCourses();

        const selectedCourse = courses.find(
          (c) => c.slug === courseId || c.id === courseId || c.firestoreId === courseId
        );

        setCourse(selectedCourse || null);
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

// Show loading while fetching data
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Loading...
    </div>
  );
}

if (!course) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>

      <Link
        to="/course"
        className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
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

  {/* Left */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.25 }}
    className="space-y-8"
  >

    {/* Curriculum */}
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-6"
        style={{ color: course.accentColor || "#a855f7" }}
      >
        Curriculum
      </h2>

      <ul className="space-y-3">
        {course.curriculum?.length ? (
          course.curriculum.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
            >
              <ChevronRight
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: course.accentColor || "#a855f7" }}
              />
              {item}
            </li>
          ))
        ) : (
          <li className="text-slate-500">Curriculum coming soon.</li>
        )}
      </ul>
    </div>

    {/* Skills */}
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-5"
        style={{ color: course.accentColor || "#a855f7" }}
      >
        Skills You'll Gain
      </h2>

      <div className="flex flex-wrap gap-2">
        {course.skills?.length ? (
          course.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                color: course.accentColor || "#a855f7",
                borderColor: `${course.accentColor || "#a855f7"}55`,
                background: `${course.accentColor || "#a855f7"}12`,
              }}
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-slate-500">Skills will be updated soon.</span>
        )}
      </div>
    </div>

    {/* Perks */}
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-5"
        style={{ color: course.accentColor || "#a855f7" }}
      >
        What You Get
      </h2>

      <ul className="space-y-3">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-3 text-slate-300 text-sm"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: course.accentColor || "#a855f7",
              }}
            />
            {perk}
          </li>
        ))}
      </ul>
    </div>

  </motion.div>

  {/* Right */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    <div className="sticky top-6 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
      <h2 className="text-xl font-bold text-white mb-1">
        Enroll in this course
      </h2>

      <p className="text-slate-500 text-sm mb-8">
        Fill in your details and our team will reach out to you shortly.
      </p>

      <EnrollForm course={course} />
    </div>
  </motion.div>

</div>
      </div>
    </main>
  );
};

export default CourseDetail;
