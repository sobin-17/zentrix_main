import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { jobOpenings } from './Careers'; // Adjust path if needed

const JobDetail = () => {
  const { slug } = useParams();
  
  const job = jobOpenings.find(j => j.slug === slug || j.id === slug);

  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Job Not Found</h2>
          <Link to="/career" className="text-purple-400 hover:underline">
            ← Back to Career Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20 font-poppins relative">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 py-5 sticky top-0 bg-black/95 z-50">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <Link 
            to="/career" 
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Opportunities
          </Link>

          <div className="flex items-center gap-3">
            <img src="/zentrix-logo.png" alt="Zentrix" className="h-9" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-16">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-5 py-2 bg-purple-900/60 text-purple-300 rounded-full text-sm font-semibold tracking-wider">
            {job.category || 'Software Development'}
          </span>
        </div>

        {/* Job Title */}
        <h1 className="text-6xl md:text-7xl font-black tracking-[-0.04em] leading-none mb-10">
          {job.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-gray-400 mb-12">
          <div><span className="text-purple-400 font-medium">Duration:</span> {job.experience}</div>
          <div><span className="text-purple-400 font-medium">Type:</span> {job.type}</div>
          <div><span className="text-purple-400 font-medium">Location:</span> {job.location}</div>
        </div>

        {/* Description */}
        <div className="text-lg text-gray-200 leading-relaxed mb-16">
          {job.description}
        </div>

        {/* Responsibilities */}
        {job.responsibilities && (
          <>
            <h3 className="text-3xl font-semibold mb-8">Key Responsibilities</h3>
            <ul className="space-y-4 mb-16 text-gray-300">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-purple-500 text-xl leading-none mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Requirements */}
        {job.requirements && (
          <>
            <h3 className="text-3xl font-semibold mb-8">Requirements</h3>
            <ul className="space-y-4 mb-16 text-gray-300">
              {job.requirements.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-purple-500 text-xl leading-none mt-1">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Benefits */}
        {job.benefits && (
          <>
            <h3 className="text-3xl font-semibold mb-8">What You Will Gain</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-20">
              {job.benefits.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-purple-500/30 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Apply Button */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-4">
          <a
            href="/contact"
            className="flex-1 py-5 px-10 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-2xl text-center transition-all active:scale-95"
          >
            Apply for this Position
          </a>
          
          <Link
            to="/career"
            className="flex-1 py-5 px-10 border border-white/30 hover:bg-white/5 text-white font-medium text-lg rounded-2xl text-center transition-all"
          >
            View All Openings
          </Link>
        </div>
      </div>
    </main>
  );
};

export default JobDetail;