import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Clock, BookOpen, ChevronRight,
  Send, Loader2, CheckCircle2, Award, Star, Briefcase, Users, Globe, Share2,
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getCourses } from "../services/courseService";
import { ensureCourseIds } from "../utils/courseIdHelper";
import { addEnrollment } from "../services/enrollmentService";
import ShareModal from "../components/ShareModal";

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
    name: '', email: '', phone: '', qualification: '', customQualification: '', message: '',
  });
  const [status, setStatus] = useState('idle');
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) {
      setForm({ ...form, phone: val });
      if (phoneError) setPhoneError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhoneError('');

    if (form.phone.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }

    setStatus('sending');
    
    const finalQualification = form.qualification === 'Other'
      ? (form.customQualification ? `Other (${form.customQualification.trim()})` : 'Other')
      : form.qualification;

    const templateParams = {
      to_email: 'hr.zentrixtechnology@gmail.com',
      job_title: `Course Enrollment — ${course.title}`,
      from_name: form.name,
      from_email: form.email,
      from_phone: form.phone,
      message: `Qualification: ${finalQualification}\n\n${form.message || '(No additional message)'}`,
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
        qualification: finalQualification,
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
            required
            type="tel"
            name="phone"
            maxLength={10}
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="10-digit phone number"
            className={`w-full bg-white/5 border ${phoneError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm`}
          />
          {phoneError && (
            <p className="text-red-400 text-xs mt-1">{phoneError}</p>
          )}
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
        {form.qualification === 'Other' && (
          <input
            required
            type="text"
            name="customQualification"
            value={form.customQualification || ''}
            onChange={handleChange}
            placeholder="Please specify your qualification *"
            className="mt-3 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm"
          />
        )}
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

      {/* ── Submitting Pop-up Loading Overlay ── */}
      {status === 'sending' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#0e071e]/95 border border-purple-500/40 rounded-3xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(168,85,247,0.35)] flex flex-col items-center gap-5"
          >
            <div className="relative flex items-center justify-center w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin relative z-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">Submitting Enrollment...</h3>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">
                Please wait while we register your course request.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Submitted Successfully Pop-up Screen ── */}
      {status === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative bg-[#0e071e]/95 border border-purple-500/50 rounded-3xl p-8 max-w-md w-full text-center shadow-[0_0_60px_rgba(168,85,247,0.4)] flex flex-col items-center gap-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 border border-purple-300/40 flex items-center justify-center shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">Enrollment Submitted! 🎉</h3>
              <p className="text-purple-300 font-semibold text-sm mt-1">{course.title}</p>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-white/5 border border-white/10 rounded-2xl p-4">
              Thank you for enrolling! Our admissions team has received your registration and will contact you shortly.
            </p>

            <button
              onClick={() => {
                setStatus('idle');
                setForm({ name: '', email: '', phone: '', qualification: '', customQualification: '', message: '', resume: null });
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white text-sm font-bold shadow-lg transition-all"
            >
              Done & Close
            </button>
          </motion.div>
        </div>
      )}
    </form>
  );
};

/* ─── Main Component ──────────────────────────────────────────────────────── */
const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        const rawCourses = await getCourses();
        const courses = ensureCourseIds(rawCourses);
        const searchId = (courseId || '').toLowerCase();

        const selectedCourse = courses.find(
          (c) =>
            (c.courseId && c.courseId.toLowerCase() === searchId) ||
            (c.slug && c.slug.toLowerCase() === searchId) ||
            (c.id && c.id.toLowerCase() === searchId) ||
            (c.firestoreId && c.firestoreId.toLowerCase() === searchId)
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-20 sm:pt-24 md:pt-28 pb-24">

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
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-medium bg-white/5">
              {course.category}
            </span>
            <button
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share Course
            </button>
          </div>

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
              { icon: <Globe className="w-4 h-4 text-emerald-400" />, label: course.mode || 'Hybrid' },
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

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        item={course}
        type="course"
      />
    </main>
  );
};

export default CourseDetail;
