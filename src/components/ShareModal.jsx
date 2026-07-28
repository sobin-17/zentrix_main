import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, MessageCircle, ExternalLink } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, item, type = 'career' }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const isCareer = type === 'career';

  // Determine item identifier
  const itemId = isCareer
    ? item.jobId || item.id || item.firestoreId
    : item.courseId || item.id || item.slug || item.firestoreId;

  const pathPrefix = isCareer ? '/career/' : '/course/';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${baseUrl}${pathPrefix}${itemId}`;

  // Formatted message for WhatsApp
  const whatsappText = isCareer
    ? `🚀 *Career Opportunity at Zentrix Technology!*

📌 *${item.title || 'Job Opening'}*
📍 Location: ${item.location || 'Nagercoil, Tamil Nadu'}
💼 Type: ${item.type || 'Internship'}
⌛ Experience: ${item.experience || '3 Months'}

Check details and apply here:
👉 ${shareUrl}`
    : `🎓 *Course at Zentrix Technology!*

📚 *${item.title || 'Course'}*
⏱ Duration: ${item.duration || '3 Months'}
🏷 Category: ${item.category || 'Technology'}

Learn more & enroll here:
👉 ${shareUrl}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleWhatsAppShare = () => {
    const encodedText = encodeURIComponent(whatsappText);
    const waUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out ${item.title} at Zentrix Technology`,
          url: shareUrl,
        });
      } catch (err) {
        console.log('User cancelled share or not supported', err);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#120d24] border border-purple-500/30 rounded-2xl p-6 shadow-2xl z-10 overflow-hidden text-white"
        >
          {/* Top Decorative Glow */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Share {isCareer ? 'Career Opening' : 'Course'}
              </h3>
              <p className="text-xs text-slate-400">
                Generate link & share with others
              </p>
            </div>
          </div>

          {/* Item Preview Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-5 flex items-center justify-between gap-3">
            <div className="overflow-hidden">
              <h4 className="font-semibold text-sm text-white truncate">{item.title}</h4>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {isCareer
                  ? `${item.type || 'Internship'} · ${item.location || 'Nagercoil'}`
                  : `${item.duration || '3 Months'} · ${item.category || 'Technology'}`}
              </p>
            </div>
            {itemId && (
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold whitespace-nowrap border border-purple-500/30">
                {itemId}
              </span>
            )}
          </div>

          {/* Generated Shareable Link Field */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Shareable Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-black/50 border border-purple-500/30 rounded-xl px-3.5 py-2.5 text-xs text-purple-200 font-mono focus:outline-none select-all"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            {/* Share via WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Share via WhatsApp
            </button>

            {/* Native browser share (if supported) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                More Share Options
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
