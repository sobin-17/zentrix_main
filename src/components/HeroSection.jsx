import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => (
  <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
    {/* Particle background */}
    <ParticleBackground />
    {/* Purple glow orb */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-96 h-96 rounded-full bg-[var(--color-brand-purple)]/30 blur-[150px] animate-pulse-glow-purple"></div>
    </div>
    {/* Content */}
    <div className="relative z-10 w-full container mx-auto px-6 md:px-12 py-24">
      <motion.h1
        className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Courses
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl font-semibold text-white/80 max-w-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Empower your future with cutting‑edge tech education. Dive into immersive, project‑based learning and launch your career.
      </motion.p>
      <a href="#openings"
        className="inline-block px-8 py-3 rounded-full border border-white/30 hover:border-white/70 text-white bg-white/5 hover:bg-white/15 transition-all duration-300"
      >
        Explore Openings
      </a>
    </div>
    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
);

export default HeroSection;
