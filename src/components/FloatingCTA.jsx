import React from 'react';
import { motion } from 'framer-motion';
import { Phone, GraduationCap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FloatingCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-3"
    >
      {/* WhatsApp Button — indigo -> violet (start of the family) */}
      <a
        href="https://wa.me/91938423728"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_4px_15px_rgba(99,102,241,0.35)] hover:shadow-[0_0_25px_rgba(99,102,241,0.65)] transition-all duration-300 hover:scale-110"
        title="WhatsApp Us"
      >
        <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6 text-white" />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(99,102,241,0.55)]"></div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-3 py-1.5 bg-[#111827]/95 border border-indigo-400/20 rounded-lg text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md">
          WhatsApp Us
        </div>
      </a>

      {/* Call Button — violet -> purple (midpoint of the family) */}
      <a
        href="tel:+91938423728"
        className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#A855F7] shadow-[0_4px_15px_rgba(139,92,246,0.35)] hover:shadow-[0_0_25px_rgba(139,92,246,0.65)] transition-all duration-300 hover:scale-110"
        title="Call Us"
      >
        <Phone className="w-4 h-4 md:w-5 md:h-5 text-white" />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(139,92,246,0.55)]"></div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-3 py-1.5 bg-[#111827]/95 border border-violet-400/20 rounded-lg text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md">
          Call Us
        </div>
      </a>

      {/* Enroll Button — purple -> pink (end of the family, stays the boldest/primary CTA) */}
      <Link
        to="/course"
        className="group relative flex flex-col items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#A855F7] to-[#EC4899] shadow-[0_4px_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_25px_rgba(168,85,247,0.65)] transition-all duration-300 hover:scale-110"
      >
        <GraduationCap className="w-4 h-4 md:w-5 md:h-5 mb-0 text-white" />
        <span className="text-[6px] md:text-[8px] font-bold tracking-wider text-white">
          ENROLL
        </span>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(168,85,247,0.55)]"></div>
      </Link>
    </motion.div>
  );
};

export default FloatingCTA;