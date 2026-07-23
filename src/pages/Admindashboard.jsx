import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse as deleteCourseFromDB,
} from "../services/courseService";
import {
  getEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment
} from "../services/enrollmentService";

import {
  addCareer,
  getCareers,
  updateCareer,
  deleteCareer as deleteCareerFromDB,
} from "../services/careerService";
import {
  generateNextJobId,
  ensureCareerJobIds,
  DEFAULT_SEED_CAREERS,
  getPredefinedDetailsForRole,
  computeJobTitle,
} from "../utils/jobIdHelper";
import {
  generateNextCourseId,
  ensureCourseIds,
  DEFAULT_SEED_COURSES,
} from "../utils/courseIdHelper";
import {
  getApplications,
  updateApplicationStatus as updateAppStatusService,
  deleteApplication as deleteAppService
} from "../services/applicationService";
import {
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage as deleteContactMessageFromDB,
} from "../services/contactService";
import ContactMessagesManager from "../components/ContactMessagesManager";
import AdminsManager from "../components/AdminsManager";
import {
  LayoutDashboard, BookOpen, Grid3x3, PlayCircle, ClipboardList, Star,
  Award, Briefcase, FileText, Users, UserCog, Shield, Settings, Globe,
  Search, Bell, ChevronDown, Plus, Pencil, Trash2, Eye, X, Check,
  ChevronRight, TrendingUp, LogOut, ArrowLeft, GraduationCap, Mail, Phone,
  MessageSquare, Calendar, Menu,
} from 'lucide-react';

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
/* ────────────────────────────────────────────────────────────────────────
   CONSTANTS / SEED DATA
──────────────────────────────────────────────────────────────────────── */

const CATEGORIES = ['Development', 'Design', 'Data Science', 'AI'];
const LEVELS = ['Beginner', 'Beginner – Intermediate', 'Intermediate', 'Advanced'];
const CAREER_TYPES = ['Internship', 'Full-time', 'Part-time', 'Contract'];
const WORK_MODES = ['Onsite', 'Remote', 'Hybrid'];
const ENROLLMENT_STATUSES = ['New', 'Contacted', 'Confirmed', 'Cancelled'];



const seedCourses = DEFAULT_SEED_COURSES;

const seedCareers = DEFAULT_SEED_CAREERS;

const seedEnrollments = [
  { id: 'enr-1', courseId: 'mern-stack', name: 'Aisha Bello', email: 'aisha.bello@example.com', phone: '+91 98765 11111', qualification: 'B.E / B.Tech', message: 'Excited to build full-stack apps and eventually work on production systems.', resume: 'aisha_bello_resume.pdf', enrolledDate: '2026-07-16', status: 'Confirmed' },
  { id: 'enr-2', courseId: 'mern-stack', name: 'Diego Fernandez', email: 'diego.fernandez@example.com', phone: '+91 90000 22222', qualification: 'B.Sc / BCA / B.Com', message: 'Self-taught in HTML/CSS/JS, looking to go full-stack with a structured program.', resume: 'diego_fernandez_resume.pdf', enrolledDate: '2026-07-15', status: 'New' },
  { id: 'enr-3', courseId: 'java-dev', name: 'Ravi Shankar', email: 'ravi.shankar@example.com', phone: '+91 91234 33333', qualification: 'B.E / B.Tech', message: 'Want to move from academic Java knowledge into Spring Boot & real projects.', resume: 'ravi_shankar_resume.pdf', enrolledDate: '2026-07-14', status: 'Contacted' },
  { id: 'enr-4', courseId: 'ui-ux', name: 'Chloe Martin', email: 'chloe.martin@example.com', phone: '+91 99887 44444', qualification: '12th / HSC', message: 'Passionate about design, currently building a Figma portfolio on my own.', resume: 'chloe_martin_resume.pdf', enrolledDate: '2026-07-13', status: 'Confirmed' },
  { id: 'enr-5', courseId: 'ui-ux', name: 'Tom Whitfield', email: 'tom.whitfield@example.com', phone: '+91 93456 55555', qualification: 'Diploma', message: 'Looking for a career switch from graphic design into UX.', resume: 'tom_whitfield_resume.pdf', enrolledDate: '2026-07-12', status: 'New' },
  { id: 'enr-6', courseId: 'python-fullstack', name: 'Noor Hassan', email: 'noor.hassan@example.com', phone: '+91 97654 66666', qualification: 'MCA / MBA', message: 'Have basic Python knowledge, want Django + React to build full products.', resume: 'noor_hassan_resume.pdf', enrolledDate: '2026-07-11', status: 'Confirmed' },
  { id: 'enr-7', courseId: 'data-analytics', name: 'Ingrid Bakker', email: 'ingrid.bakker@example.com', phone: '+91 96543 77777', qualification: 'B.Sc / BCA / B.Com', message: 'Working with Excel currently, want to move into Python + SQL analytics.', resume: 'ingrid_bakker_resume.pdf', enrolledDate: '2026-07-10', status: 'New' },
  { id: 'enr-8', courseId: 'data-science-ml', name: 'Meera Nair', email: 'meera.nair@example.com', phone: '+91 95432 88888', qualification: 'M.E / M.Tech', message: 'Research background in stats, want hands-on ML project experience.', resume: 'meera_nair_resume.pdf', enrolledDate: '2026-07-09', status: 'Contacted' },
  { id: 'enr-9', courseId: 'ZTAI0001', name: 'Vishnu Prasad', email: 'vishnu.prasad@example.com', phone: '+91 94321 99999', qualification: 'B.E / B.Tech', message: 'Built a couple of OpenCV mini-projects, want to go deeper into LLMs.', resume: 'vishnu_prasad_resume.pdf', enrolledDate: '2026-07-08', status: 'Confirmed' },
  { id: 'enr-10', courseId: 'java-dev', name: 'Divya Suresh', email: 'divya.suresh@example.com', phone: '+91 93210 10101', qualification: 'B.E / B.Tech', message: 'Comfortable with core Java, want structured Spring Boot training.', resume: 'divya_suresh_resume.pdf', enrolledDate: '2026-07-07', status: 'Cancelled' },
];

const ENROLLMENT_STATUS_STYLE = {
  New: 'bg-sky-500/15 text-sky-400',
  Contacted: 'bg-purple-500/15 text-purple-400',
  Confirmed: 'bg-emerald-500/15 text-emerald-400',
  Cancelled: 'bg-red-500/15 text-red-400',
};

const slugify = (str) =>
  str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `item-${Date.now()}`;

const isCourseMatch = (course, enrollment) => {
  if (!course || !enrollment) return false;
  const courseKeys = [
    course.id,
    course.firestoreId,
    course.courseId,
    course.title ? slugify(course.title) : null,
  ].filter(Boolean);

  const enrollmentKeys = [
    enrollment.courseId,
    enrollment.id,
    enrollment.courseTitle ? slugify(enrollment.courseTitle) : null,
  ].filter(Boolean);

  return courseKeys.some((ck) =>
    enrollmentKeys.some((ek) => ck === ek || slugify(String(ck)) === slugify(String(ek)))
  );
};

const isCareerMatch = (career, application) => {
  if (!career || !application) return false;
  const careerKeys = [
    career.id,
    career.firestoreId,
    career.jobId,
    career.title ? slugify(career.title) : null,
  ].filter(Boolean);

  const applicationKeys = [
    application.careerId,
    application.jobId,
    application.id,
    application.careerTitle ? slugify(application.careerTitle) : null,
  ].filter(Boolean);

  return careerKeys.some((ck) =>
    applicationKeys.some((ak) => ck === ak || slugify(String(ck)) === slugify(String(ak)))
  );
};

function useLocalStorageState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const stored = window.localStorage?.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { window.localStorage?.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

/* ────────────────────────────────────────────────────────────────────────
   SMALL UI PRIMITIVES
──────────────────────────────────────────────────────────────────────── */

const NAV_SECTIONS = [
  { section: null, items: [{ key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }] },
  {
    section: 'Academy Management',
    items: [
      { key: 'courses', label: 'Courses', icon: BookOpen },
      { key: 'categories', label: 'Categories', icon: Grid3x3, soon: true },
      { key: 'lessons', label: 'Lessons', icon: PlayCircle, soon: true },
      { key: 'enrollments', label: 'Enrollments', icon: ClipboardList },

    ],
  },
  {
    section: 'Career Management',
    items: [
      { key: 'careers', label: 'Careers', icon: Briefcase },
      { key: 'applications', label: 'Applications', icon: FileText },
      { key: 'contacts', label: 'Contact Messages', icon: Mail },
      { key: 'opening careers', label: 'Opening Careers', icon: Briefcase },
      { key: 'closing careers', label: 'Closing Careers', icon: Briefcase },
    ],
  },
  {
    section: 'Users & Team',
    items: [
      { key: 'admins', label: 'Admins', icon: UserCog },
      { key: 'students', label: 'Students', icon: Users, soon: true },
    ],
  },
];

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  const handleSelect = (key) => {
    setActive(key);
    setMobileOpen(false);
  };

  const navBody = (
    <>
      <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo5_transparent.png" alt="Zentrix" className="h-10 w-auto object-contain" />
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-5 space-y-6">
        {NAV_SECTIONS.map((group, gi) => (
          <div key={gi}>
            {group.section && (
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {group.section}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map(({ key, label, icon: Icon, soon }) => {
                const isActive = active === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--color-brand-purple)] text-white shadow-[0_0_20px_rgba(157,0,255,0.35)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      {label}
                    </span>
                    {soon && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-slate-500 font-semibold">
                        soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] flex-shrink-0 h-screen sticky top-0 bg-[#0a0a0a] border-r border-white/10 overflow-y-auto">
        {navBody}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 flex flex-col w-[80vw] max-w-[300px] h-screen bg-[#0a0a0a] border-r border-white/10 overflow-y-auto"
            >
              {navBody}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Topbar({
  query,
  setQuery,
  handleLogout,
  admin,
  notifications,
  notificationCount,
  showNotifications,
  setShowNotifications,
  markAllNotificationsAsRead,
  onSelectNotification,
  onOpenMobileNav,
}) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 bg-black/70 backdrop-blur-md border-b border-white/10">
      <button
        onClick={onOpenMobileNav}
        className="lg:hidden flex-shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
        aria-label="Open menu"
      >
        <Menu className="w-4 h-4" />
      </button>

      <div className="relative w-full max-w-md hidden md:block">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, careers…"
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Mobile search toggle + input */}
      <div className="flex-1 min-w-0 md:hidden">
        {showMobileSearch ? (
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => !query && setShowMobileSearch(false)}
              placeholder="Search…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button
          onClick={() => setShowMobileSearch((s) => !s)}
          className="md:hidden flex-shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      <div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white"
  >
    <Bell className="w-4 h-4" />

    {notificationCount > 0 && (
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center">
        {notificationCount}
      </span>
    )}
  </button>

  {showNotifications && (
  <div className="absolute right-0 mt-3 w-[90vw] max-w-96 rounded-xl bg-[#111] border border-white/10 shadow-xl z-50 overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/[0.02]">
      <h3 className="text-white font-semibold text-sm">
        Notifications ({notificationCount})
      </h3>

      {notificationCount > 0 && (
        <button
          onClick={markAllNotificationsAsRead}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          Mark all as read
        </button>
      )}
    </div>

    {/* Notification List */}
    <div className="max-h-80 overflow-y-auto divide-y divide-white/5">

      {notifications.length === 0 ? (
        <p className="text-slate-500 p-6 text-center text-xs">
          No new notifications
        </p>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectNotification && onSelectNotification(item)}
            className="p-4 hover:bg-purple-600/10 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-white text-xs font-semibold group-hover:text-purple-300 transition-colors">
                {item.type === "enrollment" && `📚 ${item.name} enrolled`}
                {item.type === "application" && `💼 ${item.name} applied`}
                {item.type === "contact" && `📩 ${item.name} sent a message`}
              </p>

              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider group-hover:underline flex-shrink-0">
                View Full Info →
              </span>
            </div>

            <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
              {item.title}
            </p>

            <p className="text-slate-500 text-[10px] mt-2">
              {new Date(item.time).toLocaleString()}
            </p>
          </div>
        ))
      )}

    </div>

  </div>
)}
</div>
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
          <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">HR</div>
          <div className="hidden md:block leading-tight">
  <p className="text-sm font-semibold text-white">
    {admin?.email?.split("@")[0]}
  </p>
  <p className="text-xs text-slate-500">
    {admin?.email}
  </p>
</div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
        <button
  onClick={handleLogout}
  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm flex-shrink-0"
>
  <LogOut className="w-4 h-4" />
  <span className="hidden sm:inline">Logout</span>
</button>
      </div>
    </header>
  );
}

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}22`, color: accent }}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs mb-1 truncate">{label}</p>
        <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const positive = status === 'Published' || status === 'Active';
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${
        positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
      }`}
    >
      {status}
    </span>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-[100] bg-[#111] border border-emerald-500/40 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm"
    >
      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {message}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   COURSE FORM MODAL (Simplified with Dropdowns)
──────────────────────────────────────────────────────────────────────── */
function CourseModal({ initial, courses = [], onClose, onSave, saving }) {
  const isEdit = Boolean(initial);
 
  // Default to the first seed course
  const defaultCourse = seedCourses[0];

  const [form, setForm] = useState(
    initial
      ? {
          id: initial.id || '',
          courseId: initial.courseId || '',
          title: initial.title || '',
          subtitle: initial.subtitle || '',
          category: initial.category || CATEGORIES[0],
          duration: initial.duration || '',
          level: initial.level || LEVELS[0],
          mode: initial.mode || 'Hybrid',
          status: initial.status || 'Draft',
        }
      : {
          id: defaultCourse.id,
          courseId: defaultCourse.courseId,
          title: defaultCourse.title,
          subtitle: '',
          category: defaultCourse.category,
          duration: defaultCourse.duration,
          level: defaultCourse.level,
          mode: 'Hybrid',
          status: 'Published'
        }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const currentCourseId = isEdit
    ? (initial?.courseId || initial?.id)
    : generateNextCourseId(form.category || form.title || form.id, courses);

  const handleCourseChange = (e) => {
    const selectedId = e.target.value;
    const predefined = seedCourses.find(c => c.id === selectedId) || seedCourses[0];
    setForm(prev => ({
      ...prev,
      id: predefined.id,
      title: predefined.title,
      category: predefined.category,
      duration: predefined.duration,
      level: predefined.level
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (saving) return;

    // Grab the predefined data for this course to auto-attach the description, skills, image etc.
    const predefined = seedCourses.find(c => c.id === form.id) || seedCourses[0];
 
    const payload = {
      ...(isEdit ? { firestoreId: initial.firestoreId, courseId: initial.courseId } : { courseId: currentCourseId }),
      id: form.id,
      title: form.title,
      subtitle: form.subtitle,
      category: form.category,
      duration: form.duration,
      level: form.level,
      mode: form.mode,
      status: form.status,
      // Pre-defined static fields that user no longer manually enters:
      image: initial?.image || predefined.image || '',
      accentColor: initial?.accentColor || predefined.accentColor || '#a855f7',
      overview: initial?.overview || predefined.description || '',
      description: predefined.description || '',
      curriculum: initial?.curriculum || predefined.curriculum || [],
      skills: initial?.skills || predefined.skills || [],
      internship: initial?.internship ?? predefined.internship ?? false,
      placement: initial?.placement ?? predefined.placement ?? true,
      students: isEdit ? initial.students : 0,
    };
 
    onSave(payload, isEdit);
  };

  const activePredefined = seedCourses.find(c => c.id === form.id) || seedCourses[0];

  return (
    <ModalShell title={isEdit ? 'Edit Course' : 'Add New Course'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <Field label="Course Title *">
          <select
            value={form.id}
            onChange={handleCourseChange}
            className="input"
            disabled={isEdit}
          >
            {seedCourses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </Field>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Predefined Description</p>
          <p className="text-sm text-slate-300 leading-relaxed">{activePredefined.description}</p>
        </div>

        <Field label="Subtitle">
          <input value={form.subtitle} onChange={(e) => set('subtitle', e.target.value)} className="input" placeholder="e.g. Full Stack Development" />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Level">
            <select value={form.level} onChange={(e) => set('level', e.target.value)} className="input">
              {LEVELS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Duration">
            <input value={form.duration} onChange={(e) => set('duration', e.target.value)} className="input" placeholder="6 Months" />
          </Field>
          <Field label="Training Mode">
            <select value={form.mode} onChange={(e) => set('mode', e.target.value)} className="input">
              {WORK_MODES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input">
               <option>Draft</option>
               <option>Published</option>
            </select>
          </Field>
        </div>

        <ModalActions onClose={onClose} label={isEdit ? 'Save changes' : 'Add course'} saving={saving} />
      </form>
    </ModalShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CAREER FORM MODAL
──────────────────────────────────────────────────────────────────────── */

function CareerModal({ initial, careers = [], onClose, onSave }) {
  const isEdit = Boolean(initial);

  // Default to the first seed career
  const defaultCareer = seedCareers[0];

  const [form, setForm] = useState(
    initial
      ? {
          id: initial.id || '',
          jobId: initial.jobId || '',
          title: initial.title || '',
          type: initial.type || CAREER_TYPES[0],
          experience: initial.experience || '',
          location: initial.location || 'Nagercoil, Tamil Nadu',
          mode: initial.mode || 'Onsite',
          status: initial.status || 'Active',
        }
      : {
          id: defaultCareer.id,
          jobId: defaultCareer.jobId,
          title: defaultCareer.title,
          type: defaultCareer.type,
          experience: defaultCareer.experience,
          location: defaultCareer.location,
          mode: 'Onsite',
          status: 'Active',
        }
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const currentJobId = isEdit
    ? (initial?.jobId || initial?.id)
    : generateNextJobId(form.id || form.title, careers);

  const handleCareerChange = (e) => {
    const selectedId = e.target.value;
    const predefined = seedCareers.find(c => c.id === selectedId) || seedCareers[0];
    const baseTitle = predefined.baseTitle || predefined.title.replace(/\s+Intern$/i, '');
    const currentType = form.type || predefined.type || 'Internship';
    const computedTitle = computeJobTitle(baseTitle, currentType);

    setForm(prev => ({
      ...prev,
      id: predefined.id,
      baseTitle,
      title: computedTitle,
      type: currentType,
      experience: predefined.experience,
      location: predefined.location
    }));
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const predefined = seedCareers.find(c => c.id === form.id) || seedCareers[0];
    const baseTitle = form.baseTitle || predefined.baseTitle || form.title.replace(/\s+Intern$/i, '').replace(/\s*\([^)]*\)$/g, '');
    const computedTitle = computeJobTitle(baseTitle, newType);

    setForm(prev => ({
      ...prev,
      type: newType,
      title: computedTitle
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const predefinedSeed = seedCareers.find(c => c.id === form.id) || seedCareers[0];
    const roleDetails = getPredefinedDetailsForRole(form.id || form.title);
    const finalBaseTitle = form.baseTitle || predefinedSeed.baseTitle || form.title;
    const finalTitle = computeJobTitle(finalBaseTitle, form.type);

    onSave(
      {
        ...(isEdit ? { firestoreId: initial.firestoreId, jobId: initial.jobId } : { jobId: currentJobId }),
        id: form.id,
        title: finalTitle,
        type: form.type,
        experience: form.experience,
        location: form.location,
        mode: form.mode,
        status: form.status,
        category: roleDetails.category,
        overview: initial?.overview || initial?.description || predefinedSeed.description || roleDetails.overview,
        description: initial?.description || predefinedSeed.description || roleDetails.overview,
        responsibilities: initial?.responsibilities || predefinedSeed.responsibilities || roleDetails.responsibilities,
        skills: initial?.skills || predefinedSeed.skills || roleDetails.skills,
        whatYouGet: initial?.whatYouGet || predefinedSeed.whatYouGet || roleDetails.whatYouGet,
      },
      isEdit
    );
  };

  const activePredefined = seedCareers.find(c => c.id === form.id) || seedCareers[0];

  return (
    <ModalShell title={isEdit ? 'Edit Career' : 'Add New Career'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/30 rounded-xl p-3.5 mb-2 gap-2">
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Assigned Job ID:</span>
          <span className="px-3 py-1 rounded-lg bg-purple-600 text-white font-mono font-bold text-sm tracking-widest shadow-[0_0_10px_rgba(157,0,255,0.3)] whitespace-nowrap">
            {currentJobId}
          </span>
        </div>

        <Field label="Job Role *">
          <select
            value={form.id}
            onChange={handleCareerChange}
            className="input"
            disabled={isEdit}
          >
            {seedCareers.map(c => (
               <option key={c.id} value={c.id}>{c.baseTitle || c.title.replace(/\s+Intern$/i, '')}</option>
            ))}
          </select>
        </Field>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Generated Title Preview</p>
          <p className="text-base font-bold text-purple-300 mb-2">{computeJobTitle(form.baseTitle || activePredefined.baseTitle || form.title, form.type)}</p>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Role Description</p>
          <p className="text-sm text-slate-300 leading-relaxed">{activePredefined.description || activePredefined.overview}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Type">
            <select value={form.type} onChange={handleTypeChange} className="input">
              {CAREER_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Experience / Duration">
            <input value={form.experience} onChange={(e) => set('experience', e.target.value)} className="input" placeholder="3 Months" />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Location">
            <input value={form.location} onChange={(e) => set('location', e.target.value)} className="input" placeholder="Nagercoil, Tamil Nadu" />
          </Field>
          <Field label="Work Mode">
            <select value={form.mode} onChange={(e) => set('mode', e.target.value)} className="input">
              {WORK_MODES.map((m) => <option key={m}>{m}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Application Status">
          <div className="flex flex-col sm:flex-row gap-3">
            {['Active', 'Closed'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => set('status', opt)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors border ${
                  form.status === opt
                    ? opt === 'Active'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                }`}
              >
                {opt === 'Active' ? 'Open for applications' : 'Closed'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            {form.status === 'Active'
              ? 'Candidates can apply to this role on the public careers page.'
              : 'This role is hidden from new applicants but stays in your records.'}
          </p>
        </Field>

        <ModalActions onClose={onClose} label={isEdit ? 'Save changes' : 'Add career'} />
      </form>
    </ModalShell>
  );
}

function ModalShell({ title, onClose, children }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 sm:p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </motion.div>
      <style>{`.input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;padding:0.65rem 0.9rem;color:white;font-size:0.875rem;outline:none;transition:border-color .2s;} .input:focus{border-color:#a855f7;} select.input{background-color:#0d0d0d;}`}</style>
    </motion.div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function ModalActions({ onClose, label }) {
  return (
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-300 bg-white/5 hover:bg-white/10 transition-colors">
        Cancel
      </button>
      <button type="submit" className="flex-1 py-3 rounded-xl font-semibold text-sm text-white bg-[var(--color-brand-purple)] hover:opacity-90 transition-opacity">
        {label}
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   DASHBOARD HOME
──────────────────────────────────────────────────────────────────────── */

function DashboardHome({
  courses,
  careers,
  enrollments = [],
  careerApplications = [],
  goTo,
}) {

  const getCourseEnrollments = (course) =>
    enrollments.filter(e => isCourseMatch(course, e)).length;

  const getCareerApplicants = (career) =>
    careerApplications.filter(app => isCareerMatch(career, app)).length;

  const totalStudents = courses.reduce(
    (sum, c) => sum + getCourseEnrollments(c),
    0
  );

  const totalApplicants = careers.reduce(
    (sum, c) => sum + getCareerApplicants(c),
    0
  );

  const published = courses.filter(
    c => c.status === "Published"
  ).length;

  const openRoles = careers.filter(
    c => c.status === "Active"
  ).length;

  const coursesByEnrollment = [...courses].sort(
    (a, b) =>
      getCourseEnrollments(b) -
      getCourseEnrollments(a)
  );

  const careersByApplicants = [...careers].sort(
    (a, b) =>
      getCareerApplicants(b) -
      getCareerApplicants(a)
  );
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Welcome back, HR 👋</h1>
        <p className="text-slate-500 text-sm">Here's what's happening with your academy today.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard label="Total Courses" value={courses.length} icon={BookOpen} accent="#a855f7" />
        <StatCard label="Published Courses" value={published} icon={TrendingUp} accent="#22c55e" />
        <StatCard label="Total Careers" value={careers.length} icon={Briefcase} accent="#f59e0b" />
        <StatCard label="Open Roles" value={openRoles} icon={ClipboardList} accent="#38bdf8" />
        <StatCard label="Enrolled Students" value={totalStudents} icon={Users} accent="#f472b6" />
        <StatCard label="Total Applicants" value={totalApplicants} icon={FileText} accent="#facc15" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="min-w-0">
              <h2 className="font-bold text-white">Enrollments by Course</h2>
              <p className="text-slate-500 text-xs mt-0.5">{totalStudents} total students enrolled</p>
            </div>
            <button onClick={() => goTo('courses')} className="text-purple-400 text-xs font-semibold flex items-center gap-1 hover:text-purple-300 flex-shrink-0">
              Manage <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {coursesByEnrollment.map((c) => (
              <div key={c.id || c.firestoreId || c.title} className="flex items-center justify-between text-sm gap-2">
                <span className="text-slate-300 truncate pr-4">{c.title}</span>
                <span className="flex items-center gap-1.5 text-white font-semibold flex-shrink-0">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  {getCourseEnrollments(c)}
                </span>
              </div>
            ))}
            {courses.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No courses yet.</p>}
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="min-w-0">
              <h2 className="font-bold text-white">Applications by Career</h2>
              <p className="text-slate-500 text-xs mt-0.5">{totalApplicants} total applications received</p>
            </div>
            <button onClick={() => goTo('careers')} className="text-purple-400 text-xs font-semibold flex items-center gap-1 hover:text-purple-300 flex-shrink-0">
              Manage <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {careersByApplicants.map((j) => (
              <div key={j.id || j.firestoreId || j.jobId || j.title} className="flex items-center justify-between text-sm gap-2">
                <span className="text-slate-300 truncate pr-4">{j.title}</span>
                <span className="flex items-center gap-1.5 text-white font-semibold flex-shrink-0">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  {getCareerApplicants(j)}
                </span>
              </div>
            ))}
            {careers.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No career openings yet.</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h2 className="font-bold text-white">Courses Overview</h2>
            <button onClick={() => goTo('courses')} className="text-purple-400 text-xs font-semibold flex items-center gap-1 hover:text-purple-300 flex-shrink-0">
              Manage <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {courses.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm gap-2">
                <span className="text-slate-300 truncate">{c.title}</span>
                <StatusPill status={c.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h2 className="font-bold text-white">Careers Overview</h2>
            <button onClick={() => goTo('careers')} className="text-purple-400 text-xs font-semibold flex items-center gap-1 hover:text-purple-300 flex-shrink-0">
              Manage <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {careers.slice(0, 5).map((j) => (
              <div key={j.id} className="flex items-center justify-between text-sm gap-2">
                <span className="text-slate-300 truncate">{j.title}</span>
                <StatusPill status={j.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <button onClick={() => goTo('courses', 'add')} className="flex items-center gap-2 justify-center py-3 sm:py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Course
        </button>
        <button onClick={() => goTo('careers', 'add')} className="flex items-center gap-2 justify-center py-3 sm:py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Career
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   COURSES MANAGER
──────────────────────────────────────────────────────────────────────── */

function CoursesManager({ courses, query, onAdd, onEdit, onDelete }) {
  const filtered = useMemo(
    () => courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase())),
    [courses, query]
  );

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white">Courses</h2>
          <p className="text-slate-500 text-xs mt-0.5">{filtered.length} of {courses.length} courses</p>
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl bg-[var(--color-brand-purple)] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
              <th className="px-6 py-3 font-semibold">Course</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Students</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.firestoreId || c.courseId || c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                      <img src={c.image} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{c.title}</p>
                      <p className="text-slate-500 text-xs">{c.duration} · {c.level}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">{c.category}</td>
                <td className="px-6 py-4 text-slate-300">{c.students}</td>
                <td className="px-6 py-4"><StatusPill status={c.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/course/${c.courseId || c.id}`} target="_blank" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Open Course Page">
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button onClick={() => onEdit(c)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Edit Course">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDelete(c)} className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors" title="Delete Course">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-500">No courses match "{query}".</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CAREERS MANAGER
──────────────────────────────────────────────────────────────────────── */

function CareersManager({ careers, query, onAdd, onEdit, onDelete }) {
  const filtered = useMemo(
    () => careers.filter((j) => j.title.toLowerCase().includes(query.toLowerCase())),
    [careers, query]
  );

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 border-b border-white/10">
        <div>
          <h2 className="text-lg font-bold text-white">Careers</h2>
          <p className="text-slate-500 text-xs mt-0.5">{filtered.length} of {careers.length} openings</p>
        </div>
        <button onClick={onAdd} className="flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl bg-[var(--color-brand-purple)] text-white text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add New Career
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="text-left text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
              <th className="px-6 py-3 font-semibold">Job ID</th>
              <th className="px-6 py-3 font-semibold">Job Title</th>
              <th className="px-6 py-3 font-semibold">Type</th>
              <th className="px-6 py-3 font-semibold">Experience</th>
              <th className="px-6 py-3 font-semibold">Location</th>
              <th className="px-6 py-3 font-semibold">Status</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j.firestoreId || j.jobId || j.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4 font-mono font-bold text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap">
                    {j.jobId || j.id}
                  </span>
                </td>
                <td className="px-6 py-4 text-white font-medium">{j.title}</td>
                <td className="px-6 py-4 text-slate-300">{j.type}</td>
                <td className="px-6 py-4 text-slate-300">{j.experience}</td>
                <td className="px-6 py-4 text-slate-300">{j.location}</td>
                <td className="px-6 py-4"><StatusPill status={j.status} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/career/${j.jobId || j.id}`} target="_blank" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Open Role Detail Page">
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button onClick={() => onEdit(j)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors" title="Edit Role">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onDelete(j)} className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors" title="Delete Role">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-slate-500">No careers match "{query}".</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   ENROLLMENTS MANAGER — click a course to see who enrolled in it.
──────────────────────────────────────────────────────────────────────── */

function EnrollmentsManager({ courses, enrollments, onUpdateStatus, onDeleteEnrollment }) {
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);

  const countFor = (courseOrId) => {
    const targetCourse = typeof courseOrId === 'object'
      ? courseOrId
      : courses.find(c => c.id === courseOrId || c.firestoreId === courseOrId) || { id: courseOrId };
    return enrollments.filter((e) => isCourseMatch(targetCourse, e)).length;
  };

  if (!selectedCourseId) {
    const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
    const totalEnrollments = courses.reduce((sum, c) => sum + countFor(c), 0);

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Enrollments</h2>
            <p className="text-slate-500 text-xs mt-0.5">{totalEnrollments} students enrolled across {courses.length} courses</p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="px-6 py-3 font-semibold">Course</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Level</th>
                  <th className="px-6 py-3 font-semibold">Enrolled Students</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c) => (
                  <tr
                    key={c.id || c.firestoreId || c.title}
                    className="border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors"
                    onClick={() => setSelectedCourseId(c.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                          <img src={c.image} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{c.title}</p>
                          <p className="text-slate-500 text-xs">{c.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{c.category}</td>
                    <td className="px-6 py-4 text-slate-300">{c.level}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 text-white font-semibold">
                        <Users className="w-3.5 h-3.5 text-slate-500" /> {countFor(c)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedCourseId(c.id); }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> View students
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">No courses match "{query}".</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  const course = courses.find((c) => c.id === selectedCourseId || c.firestoreId === selectedCourseId) || { id: selectedCourseId };
  const students = enrollments
    .filter((e) => isCourseMatch(course, e))
    .filter((e) => {
      const q = query.toLowerCase();
      return !q || e.name?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q);
    });

  return (
    <div className="space-y-6">
      <button
        onClick={() => { setSelectedCourseId(null); setQuery(''); setExpanded(null); }}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to all courses
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{course?.title || 'Course'}</h2>
            <p className="text-slate-500 text-xs mt-0.5">{students.length} of {countFor(selectedCourseId)} enrolled students</p>
          </div>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-3 font-semibold">Student</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold">Qualification</th>
                <th className="px-6 py-3 font-semibold">Enrolled</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const isOpen = expanded === s.id;
                return (
                  <React.Fragment key={s.id}>
                    <tr className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer" onClick={() => setExpanded(isOpen ? null : s.id)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                          <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-white font-medium">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-300 text-xs flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-500" /> {s.email}</p>
                        <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-0.5"><Phone className="w-3 h-3 text-slate-500" /> {s.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{s.qualification}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">{s.enrolledDate ? new Date(s.enrolledDate).toLocaleDateString() : 'N/A'}</td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={s.status}
                          onChange={(e) => onUpdateStatus(s, e.target.value)}
                          className={`text-[11px] font-semibold rounded-full px-2.5 py-1 border-0 outline-none cursor-pointer ${ENROLLMENT_STATUS_STYLE[s.status]}`}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          {ENROLLMENT_STATUSES.map((st) => <option key={st} value={st} className="bg-[#0d0d0d] text-white">{st}</option>)}
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <ChevronRight className={`w-4 h-4 text-slate-500 inline-block transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="border-b border-white/5 bg-white/[0.015]">
                        <td colSpan={6} className="px-6 py-5">
                          <div className="flex items-start gap-2 text-sm text-slate-300 max-w-3xl">
                            <MessageSquare className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <p className="leading-relaxed">{s.message}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-500 mt-3">
  <span className="flex items-center gap-1.5">
    <Calendar className="w-3.5 h-3.5" />
    Enrolled on {s.enrolledDate ? new Date(s.enrolledDate).toLocaleDateString() : 'N/A'}
  </span>

  {s.resume ? (
    s.resume.startsWith('http') ? (
      <a
        href={s.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition"
      >
        <FileText className="w-4 h-4" />
        View Resume
      </a>
    ) : (
      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center max-w-[150px]">
        {s.resume}
      </span>
    )
  ) : (
    <span className="text-slate-500 text-sm">No Resume</span>
  )}
  <button
    onClick={(e) => { e.stopPropagation(); onDeleteEnrollment(s); }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600/20 transition sm:ml-auto"
  >
    <Trash2 className="w-4 h-4" />
    Delete Student
  </button>
</div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {students.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-500">No students match "{query}".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   APPLICATIONS MANAGER
──────────────────────────────────────────────────────────────────────── */

const openPdfInNewTab = (resumeUrl, title = 'Resume.pdf') => {
  if (!resumeUrl) return;

  if (resumeUrl.startsWith('data:')) {
    try {
      const arr = resumeUrl.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      const newWin = window.open(blobUrl, '_blank');
      if (newWin) {
        newWin.document.title = title;
      }
      return;
    } catch (err) {
      console.error("Failed to convert base64 to blob URL:", err);
    }
  }

  window.open(resumeUrl, '_blank');
};

function ApplicationsManager({ careers, applications, updateStatus, onDeleteApp }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeApplicant, setActiveApplicant] = useState(null);
  const [previewPdfUrl, setPreviewPdfUrl] = useState(null);

  if (!selectedJob) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Career Applications</h2>
            <p className="text-slate-400 text-xs mt-1">Review candidate applications and stored resumes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careers.map((career) => {
            const total = applications.filter(a => isCareerMatch(career, a)).length;

            return (
              <div
                key={career.firestoreId || career.id || career.title}
                className="bg-white/[0.03] border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                      {career.type || 'Internship'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{total} Applications</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{career.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-6">{career.description || career.overview}</p>
                </div>

                <button
                  onClick={() => setSelectedJob(career)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(157,0,255,0.2)]"
                >
                  <Eye className="w-4 h-4" />
                  View Applicants ({total})
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const applicants = applications.filter(a => isCareerMatch(selectedJob, a));

  return (
    <div className="space-y-6">
      <button
        onClick={() => setSelectedJob(null)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to job categories
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-purple-400" />
            {selectedJob.title}
          </h2>
          <p className="text-slate-400 text-xs mt-1">Total Applicants: {applicants.length}</p>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[900px]">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-semibold">Applicant</th>
                <th className="px-6 py-4 font-semibold">Contact Info</th>
                <th className="px-6 py-4 font-semibold">Applied Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Resume PDF</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {applicants.map(app => (
                <tr key={app.firestoreId || app.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {app.name ? app.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'AP'}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{app.name}</p>
                        <p className="text-slate-500 text-xs truncate max-w-[200px]">{app.message || 'No additional message'}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-xs">
                    <p className="text-slate-300 flex items-center gap-1.5"><Mail className="w-3 h-3 text-purple-400" /> {app.email}</p>
                    <p className="text-slate-400 flex items-center gap-1.5 mt-1"><Phone className="w-3 h-3 text-purple-400" /> {app.phone}</p>
                  </td>

                  <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                    {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={app.status || 'New'}
                      onChange={(e) => updateStatus(app, e.target.value)}
                      className="bg-black/60 border border-white/10 text-xs font-semibold rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    {app.resumeUrl && (app.resumeUrl.startsWith('http') || app.resumeUrl.startsWith('data:')) ? (
                      <button
                        onClick={() => openPdfInNewTab(app.resumeUrl, `${app.name}_Resume.pdf`)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium transition-all cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Resume
                      </button>
                    ) : (
                      <span className="text-red-400 text-xs font-medium bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20 inline-block">
                        {app.resumeUrl ? 'No valid URL' : 'No Resume'}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setActiveApplicant(app)}
                        className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => onDeleteApp(app)}
                        className="p-1.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-colors cursor-pointer"
                        title="Delete Application"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {applicants.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No applications submitted for this role yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Detail Modal */}
      {activeApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setActiveApplicant(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Application Details</span>
              <h3 className="text-xl font-bold text-white mt-1">{activeApplicant.name}</h3>
              <p className="text-slate-400 text-xs">{selectedJob.title}</p>
            </div>

            <div className="space-y-3 bg-white/5 p-4 rounded-xl text-xs">
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-medium break-all text-right">{activeApplicant.email}</span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white font-medium">{activeApplicant.phone}</span>
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                <span className="text-slate-400">Applied Date:</span>
                <span className="text-white font-medium">
                  {activeApplicant.appliedDate ? new Date(activeApplicant.appliedDate).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                  {activeApplicant.status || 'New'}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Message / Pitch</h4>
              <p className="text-slate-300 text-sm bg-white/5 p-4 rounded-xl leading-relaxed max-h-40 overflow-y-auto">
                {activeApplicant.message || 'No additional message provided.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              {activeApplicant.resumeUrl && (activeApplicant.resumeUrl.startsWith('http') || activeApplicant.resumeUrl.startsWith('data:')) ? (
                <button
                  onClick={() => openPdfInNewTab(activeApplicant.resumeUrl, `${activeApplicant.name}_Resume.pdf`)}
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(157,0,255,0.3)] cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  View Resume PDF
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 py-3 rounded-xl bg-white/5 text-slate-500 font-semibold text-xs text-center cursor-not-allowed"
                >
                  No Resume PDF Available
                </button>
              )}

              <button
                onClick={() => setActiveApplicant(null)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   PLACEHOLDER FOR NOT-YET-BUILT SECTIONS
──────────────────────────────────────────────────────────────────────── */

function ComingSoon({ label }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-16 text-center">
      <p className="text-white font-bold text-lg mb-2">{label}</p>
      <p className="text-slate-500 text-sm">This section isn't wired up yet — ping Claude when you're ready to build it out.</p>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   MAIN DASHBOARD
──────────────────────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/admin-login");
  } catch (error) {
    console.error(error);
  }
};
  const [active, setActive] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
  const [courses, setCourses] = useState([]);
  const [careers, setCareers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [applications, setApplications] = useState([]);

  const [contactMessages, setContactMessages] = useState([]);

const loadContacts = async () => {
  const data = await getContactMessages();
  setContactMessages(data);
};

useEffect(() => {
  loadContacts();
}, []);

  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin({
          email: user.email,
        });
      }
    });
  
    return unsubscribe;
  }, []);

useEffect(() => {
  loadEnrollments();
}, []);

const loadCareers = async () => {
  try {
    const data = await getCareers();
    const formatted = ensureCareerJobIds(data);
    setCareers(formatted);
  } catch (error) {
    console.error("Failed to load careers:", error);
    setCareers([]);
  }
};

useEffect(() => {
  loadCareers();
}, []);

const loadEnrollments = async () => {
  const data = await getEnrollments();
  setEnrollments(data);
};
  const [careerApplications, setCareerApplications] = useState([]);

  const notifications = [
    ...enrollments
      .filter(e => e.status === "New")
      .map(e => ({
        id: e.firestoreId,
        type: "enrollment",
        name: e.name,
        title: e.courseTitle || e.courseId,
        time: e.enrolledDate,
      })),
  
    ...careerApplications
      .filter(a => a.status === "New")
      .map(a => ({
        id: a.firestoreId,
        type: "application",
        name: a.name,
        title: a.jobTitle,
        time: a.appliedAt,
      })),

      ...contactMessages
  .filter(c => c.status === "New")
  .map(c => ({
    id: c.firestoreId,
    type: "contact",
    name: c.name,
    title: c.message,
    time: c.createdAt,
  }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time));
  
  const notificationCount = notifications.length;
 
  const loadApplications = async () => {
    try {
      const data = await getApplications();
      setCareerApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      // Update enrollments
      for (const enrollment of enrollments.filter(e => e.status === "New")) {
        await updateEnrollmentStatus(enrollment.firestoreId, "Contacted");
      }
  
      // Update applications
      for (const application of careerApplications.filter(a => a.status === "New")) {
        await updateAppStatusService(application.firestoreId, "Pending");
      }

      // Update contact messages
      for (const contact of contactMessages.filter(c => c.status === "New")) {
        await updateContactMessageStatus(contact.firestoreId, "Read");
      }
  
      // Reload data
      await loadEnrollments();
      await loadApplications();
      await loadContacts();
  
      setShowNotifications(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);
  const [courseModal, setCourseModal] = useState(null);
  const [careerModal, setCareerModal] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    loadCourses();
  }, []);
 
  const loadCourses = async () => {
    try {
      const data = await getCourses();
      const formatted = ensureCourseIds(data);
      setCourses(formatted);
    } catch (error) {
      console.error("Error loading courses:", error);
      setCourses([]);
    }
  };

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const goTo = (view, action) => {
    setActive(view);
    setMobileNavOpen(false);
    if (action === 'add' && view === 'courses') setCourseModal('add');
    if (action === 'add' && view === 'careers') setCareerModal('add');
  };

  const [savingCourse, setSavingCourse] = useState(false);

const saveCourse = async (payload, isEdit) => {
  if (savingCourse) return; // block re-entrant calls
  setSavingCourse(true);
  try {
    const cleanData = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined)
    );

    if (isEdit) {
      await updateCourse(payload.firestoreId, cleanData);
    } else {
      const nextCourseId = generateNextCourseId(cleanData.category || cleanData.title || cleanData.id, courses);
      cleanData.courseId = nextCourseId;
      await addCourse(cleanData);
    }

    await loadCourses();
    setCourseModal(null);
    flash(isEdit ? "Course updated" : "Course added");
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setSavingCourse(false);
  }
};
  const deleteCourse = async (course) => {
    if (!window.confirm(`Delete "${course.title}"?`)) return;

    try {
      if (course.firestoreId) {
        await deleteCourseFromDB(course.firestoreId);
      }
      setCourses((prev) => prev.filter((c) =>
        (c.firestoreId && c.firestoreId !== course.firestoreId) ||
        (c.courseId && c.courseId !== course.courseId) ||
        (c.id && c.id !== course.id)
      ));
      await loadCourses();
      flash("Course deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete course");
    }
  };

  const [savingCareer, setSavingCareer] = useState(false);

  const saveCareer = async (payload, isEdit) => {
    if (savingCareer) return;
    setSavingCareer(true);
    try {
      const cleanData = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined)
      );
      if (isEdit) {
        await updateCareer(payload.firestoreId, cleanData);
      } else {
        const nextJobId = generateNextJobId(cleanData.id || cleanData.title, careers);
        cleanData.jobId = nextJobId;
        await addCareer(cleanData);
      }
      await loadCareers();
      setCareerModal(null);
      flash(isEdit ? 'Career updated' : 'Career added');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSavingCareer(false);
    }
  };

  const deleteCareer = async (career) => {
    if (window.confirm(`Delete "${career.title}"? This can't be undone.`)) {
      try {
        if (career.firestoreId) {
          await deleteCareerFromDB(career.firestoreId);
        }
        setCareers((prev) => prev.filter((c) =>
          (c.firestoreId && c.firestoreId !== career.firestoreId) ||
          (c.jobId && c.jobId !== career.jobId) ||
          (c.id && c.id !== career.id)
        ));
        await loadCareers();
        flash('Career deleted');
      } catch (error) {
        console.error(error);
        alert("Failed to delete career");
      }
    }
  };

  const changeEnrollmentStatus = async (enrollment, status) => {
    try {
      await updateEnrollmentStatus(
        enrollment.firestoreId,
        status
      );
 
      await loadEnrollments();
 
      flash(`${enrollment.name} marked as ${status}`);
    } catch (error) {
      console.error("Error updating enrollment status:", error);
    }
  };

  const deleteStudentEnrollment = async (enrollment) => {
    if (!window.confirm(`Are you sure you want to completely remove ${enrollment.name} from this course?`)) return;
    try {
      await deleteEnrollment(enrollment.firestoreId);
      await loadEnrollments();
      flash(`${enrollment.name} was successfully removed`);
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to delete enrollment");
    }
  };
 


  const updateApplicationStatus = async (application, status) => {
    try {
      await updateAppStatusService(application.firestoreId, status);
      await loadApplications();
      flash(`Application for ${application.name} marked as ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  const removeApplication = async (application) => {
    if (!window.confirm(`Are you sure you want to completely discard the application from ${application.name}?`)) return;
    try {
      await deleteAppService(application.firestoreId);
      await loadApplications();
      flash(`Application from ${application.name} was successfully removed.`);
    } catch (err) {
      console.error(err);
      alert("Failed to discard application.");
    }
  };

  const removeContactMessage = async (idOrMsg) => {
    const id = typeof idOrMsg === 'object' ? idOrMsg?.firestoreId : idOrMsg;
    if (!id) return;
    try {
      await deleteContactMessageFromDB(id);
      setContactMessages((prev) => prev.filter((m) => m.firestoreId !== id));
      await loadContacts();
      flash("Contact message deleted");
    } catch (error) {
      console.error("Error deleting contact message:", error);
      alert("Failed to delete contact message");
    }
  };

  const titles = {
    dashboard: 'Dashboard', courses: 'Courses', careers: 'Careers', enrollments: 'Enrollments', applications: 'Applications',
    categories: 'Categories', lessons: 'Lessons', reviews: 'Reviews', certificates: 'Certificates',
    students: 'Students', mentors: 'Team / Mentors', admins: 'Admins',
  };

  const openingCareers = careers.filter(
    (career) => career.status === "Active"
  );
  
  const closingCareers = careers.filter(
    (career) => career.status === "Closed"
  );

  const handleNotificationClick = async (item) => {
    setShowNotifications(false);
    if (!item) return;

    try {
      if (item.type === 'contact') {
        if (item.id) {
          await updateContactMessageStatus(item.id, 'Read');
          await loadContacts();
        }
        setActive('contacts');
      } else if (item.type === 'application') {
        if (item.id) {
          await updateAppStatusService(item.id, 'Pending');
          await loadApplications();
        }
        setActive('applications');
      } else if (item.type === 'enrollment') {
        if (item.id) {
          await updateEnrollmentStatus(item.id, 'Contacted');
          await loadEnrollments();
        }
        setActive('enrollments');
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black font-poppins relative overflow-hidden w-full max-w-[100vw]">
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
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileNavOpen} setMobileOpen={setMobileNavOpen} />

      <div className="flex-1 min-w-0">
      <Topbar
  query={query}
  setQuery={setQuery}
  handleLogout={handleLogout}
  admin={admin}
  notifications={notifications}
  notificationCount={notificationCount}
  showNotifications={showNotifications}
  setShowNotifications={setShowNotifications}
  markAllNotificationsAsRead={markAllNotificationsAsRead}
  onSelectNotification={handleNotificationClick}
  onOpenMobileNav={() => setMobileNavOpen(true)}
/>

        <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
          {active === 'dashboard' && <DashboardHome courses={courses} careers={careers} enrollments={enrollments} careerApplications={careerApplications} goTo={goTo} />}

          {active === 'courses' && (
            <CoursesManager
              courses={courses}
              query={query}
              onAdd={() => setCourseModal('add')}
              onEdit={(c) => setCourseModal(c)}
              onDelete={deleteCourse}
            />
          )}

          {active === 'careers' && (
            <CareersManager
              careers={careers}
              query={query}
              onAdd={() => setCareerModal('add')}
              onEdit={(j) => setCareerModal(j)}
              onDelete={deleteCareer}
            />
          )}

{active === "contacts" && (
  <ContactMessagesManager
    messages={contactMessages}
    onDelete={removeContactMessage}
  />
)}

{active === "opening careers" && (
  <CareersManager
    careers={openingCareers}
    query={query}
    onAdd={() => setCareerModal("add")}
    onEdit={(j) => setCareerModal(j)}
    onDelete={deleteCareer}
  />
)}

{active === "closing careers" && (
  <CareersManager
    careers={closingCareers}
    query={query}
    onAdd={() => setCareerModal("add")}
    onEdit={(j) => setCareerModal(j)}
    onDelete={deleteCareer}
  />
)}

          {active === 'enrollments' && (
            <EnrollmentsManager
  courses={courses}
  enrollments={enrollments}
  onUpdateStatus={changeEnrollmentStatus}
  onDeleteEnrollment={deleteStudentEnrollment}
/>
          )}

          {active === 'applications' && <ApplicationsManager
    careers={careers}
    applications={careerApplications}
    updateStatus={updateApplicationStatus}
    onDeleteApp={removeApplication}
/>}

          {active === 'admins' && <AdminsManager />}

          {!['dashboard', 'courses', 'careers', "opening careers", "closing careers", 'enrollments', 'applications', 'contacts', 'admins'].includes(active) && (
            <ComingSoon label={titles[active] || active} />
          )}
        </main>
      </div>

      <AnimatePresence>
      {courseModal && (
        <CourseModal
          key="course-modal"
          initial={courseModal === 'add' ? null : courseModal}
          courses={courses}
          onClose={() => setCourseModal(null)}
          onSave={saveCourse}
          saving={savingCourse}
        />
      )}
        {careerModal && (
          <CareerModal
            key="career-modal"
            initial={careerModal === 'add' ? null : careerModal}
            careers={careers}
            onClose={() => setCareerModal(null)}
            onSave={saveCareer}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast key="toast" message={toast} />}</AnimatePresence>
    </div>
  );
}