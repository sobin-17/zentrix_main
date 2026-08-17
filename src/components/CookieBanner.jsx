import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a cookie selection
    const consent = localStorage.getItem('zentrix_cookie_consent');
    if (!consent) {
      // Delay presentation slightly for optimal smooth page entry experience
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('zentrix_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('zentrix_cookie_consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[99999] max-w-[calc(100vw-2rem)] w-[420px] pointer-events-auto"
        >
          <div className="relative bg-[#0d071b]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(157,0,255,0.2)] text-white overflow-hidden transform-gpu">
            
            {/* Ambient Background Gradient Accent */}
            <div 
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)' }}
            />

            {/* Top Bar with Icon & Title & Close button */}
            <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <Cookie className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white tracking-wide flex items-center gap-1.5">
                    We Use Cookies <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-purple-300/80 font-medium">Privacy & Data Preferences</p>
                </div>
              </div>

              <button
                onClick={handleDecline}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                aria-label="Close cookie consent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description Text */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4 relative z-10">
              We use cookies to enhance your browsing experience, deliver personalized content, and analyze site traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies as detailed in our{' '}
              <Link to="/privacy-policy" className="text-purple-400 hover:text-purple-300 underline font-medium transition-colors">
                Privacy Policy
              </Link>.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 relative z-10">
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all cursor-pointer text-center"
              >
                Accept All
              </button>
              
              <button
                onClick={handleDecline}
                className="py-2.5 px-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-medium rounded-xl transition-all cursor-pointer text-center"
              >
                Essential Only
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(CookieBanner);
