import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, FileText, AlertCircle } from 'lucide-react';

export default function ResumeViewer() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resumeUrl = searchParams.get('url');
  const applicantName = searchParams.get('name') || 'Applicant';
  const jobTitle = searchParams.get('title') || '';

  const isValidUrl = resumeUrl && (resumeUrl.startsWith('http://') || resumeUrl.startsWith('https://') || resumeUrl.startsWith('data:'));

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-poppins relative overflow-hidden">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                navigate(-1);
              } else {
                navigate('/admin-dashboard');
              }
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />

          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              {applicantName}'s Resume
            </h1>
            {jobTitle && (
              <p className="text-xs text-slate-400">
                Applied for: <span className="text-purple-300 font-medium">{jobTitle}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isValidUrl && (
            <>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Direct URL
              </a>

              <a
                href={resumeUrl}
                download={`${applicantName}_Resume.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(157,0,255,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </>
          )}
        </div>
      </header>

      {/* PDF View Container */}
      <main className="flex-1 p-4 md:p-6 flex flex-col relative z-10 max-w-7xl mx-auto w-full h-[calc(100vh-73px)]">
        {isValidUrl ? (
          <div className="flex-1 w-full h-full bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <iframe
              src={resumeUrl}
              title={`${applicantName} Resume PDF`}
              className="w-full h-full flex-1 border-0"
            />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Resume PDF Not Available</h2>
            <p className="text-slate-400 text-sm max-w-md mb-6">
              {resumeUrl ? (
                <span className="text-red-400 font-mono text-xs">{resumeUrl}</span>
              ) : (
                'No resume URL was provided for this application.'
              )}
            </p>
            <button
              onClick={() => navigate('/admin-dashboard')}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
