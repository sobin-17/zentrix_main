import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowUpRight, MapPin, Clock, Briefcase, CheckCircle2,
} from 'lucide-react';

const responsibilities = [
  'Build and maintain features across our Python backend services alongside senior engineers.',
  'Write clean, well-tested code and participate in code reviews.',
  'Work with REST APIs and integrate with internal and third-party services.',
  'Help design and query relational databases for new product features.',
  'Debug issues in existing systems and ship fixes with guidance from the team.',
];

const requirements = [
  'Working knowledge of Python and core programming fundamentals.',
  'Familiarity with at least one web framework (Django, Flask, or FastAPI).',
  'Basic understanding of databases (SQL or NoSQL) and REST API concepts.',
  'Comfortable with Git and collaborative version control workflows.',
  'Currently pursuing or recently completed a degree in CS or a related field.',
];

const PythonDeveloperIntern = () => {
  // Available if you want to confirm the route slug matches this job,
  // or swap in fetched data for a fully dynamic /career/:slug page later.
  const { slug } = useParams();

  return (
    <div className="relative w-full">
      {/* Local ambient glow, scoped to this page (not fixed to viewport,
          so it won't conflict with GlobalAtmosphere in App.jsx) */}
      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[32rem] h-[32rem] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-0 w-[28rem] h-[28rem] bg-fuchsia-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8 md:pt-14 pb-24">
        {/* Back link */}
        <Link to="/career" className="inline-flex items-center gap-3 mb-10 group">
          <span className="w-1 h-6 rounded-full bg-gradient-to-b from-fuchsia-500 to-purple-600 group-hover:h-8 transition-all" />
          <span className="flex items-center gap-1.5 text-sm text-slate-300 group-hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Opportunities
          </span>
        </Link>

        {/* Badge */}
        <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-fuchsia-300 border border-fuchsia-400/30 bg-fuchsia-500/10 rounded-full px-4 py-1.5 mb-6">
          Software Development
        </span>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
          Python Full Stack Intern
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-fuchsia-400" /> Remote
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-fuchsia-400" /> Internship
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-fuchsia-400" /> 3 months
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mb-14">
          We are seeking a motivated and enthusiastic Python Full Stack Intern to join
          our development team. The intern will work on real-world projects,
          contribute to software development activities, and gain hands-on experience
          in Python programming, web development, APIs, databases, and modern
          development practices.
        </p>

        {/* Content grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-14">
            <section>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                Responsibilities
              </h2>
              <ul className="space-y-4">
                {responsibilities.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-400 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-400/80 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                Requirements
              </h2>
              <ul className="space-y-4">
                {requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-400 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-fuchsia-400/80 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar CTA */}
          <aside className="md:col-span-1">
            <div className="sticky top-8 border border-white/10 rounded-2xl p-6 bg-white/[0.03] backdrop-blur-md">
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
                Applications close
              </div>
              <div className="text-white font-semibold mb-6">Rolling basis</div>

              <Link
                to="/get-in-touch"
                className="w-full flex items-center justify-center gap-1.5 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-slate-200 transition-colors"
              >
                Apply Now <ArrowUpRight className="w-4 h-4" />
              </Link>

              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Send your resume and a short note about a Python project you're
                proud of.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PythonDeveloperIntern;