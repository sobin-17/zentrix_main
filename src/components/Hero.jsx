import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { BrainCircuit, Orbit } from 'lucide-react';
import '../styles/services.css';

const Hero = () => {
  const [splineApp, setSplineApp] = useState(null);
  const heroRef = useRef(null);
  
  const words = ['Innovation', 'Technology', 'AI', 'Analytics', 'Automation'];
  const [currentWord, setCurrentWord] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (splineApp) {
          if (entry.isIntersecting) {
            // Attempt to play/resume when in view
            splineApp.play && splineApp.play();
          } else {
            // Attempt to stop/suspend when out of view to save GPU
            splineApp.stop && splineApp.stop();
          }
        }
      },
      { threshold: 0.01 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [splineApp]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };


  // Generate particles for the banner
  const [bannerParticles] = React.useState(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 60}px`,
      ty: `${(Math.random() - 0.5) * 60}px`,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
  });

  return (
    <section id="home" ref={heroRef} className="relative min-h-[calc(100vh-100px)] lg:min-h-[650px] flex items-center lg:items-start pt-8 lg:pt-16 pb-16 bg-transparent">
      {/* Deep Space Background Glow System */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Core robot glow - Testing Layer 1 */}
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[var(--color-brand-purple)]/10 blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Animated Pill Banner - Floating Badge */}
        <div className="absolute top-3 lg:top-7 left-0 w-full flex justify-center z-20 pointer-events-none">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative inline-block max-w-full pointer-events-auto"
            >
              {/* Floating particles around banner */}
              <div className="absolute inset-[-40px] pointer-events-none z-0">
                {bannerParticles.map(p => (
                  <div
                    key={p.id}
                    className="service-particle bg-[#00c6ff]"
                    style={{
                      width: p.size,
                      height: p.size,
                      top: p.top,
                      left: p.left,
                      boxShadow: `0 0 ${p.size * 2}px #00c6ff`,
                      '--tx': p.tx,
                      '--ty': p.ty,
                      '--duration': `${p.duration}s`,
                      '--delay': `${p.delay}s`,
                    }}
                  />
                ))}
              </div>

              <motion.div 
                variants={wordVariants}
                className="animated-border-wrapper inline-block group cursor-default"
                style={{ '--glow-color': '#00c6ff' }}
              >
                {/* Outer breathing glow */}
                <div className="animate-breathing-glow opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="animated-border-inner flex items-center gap-3 px-4 py-2 md:px-5 md:py-2.5">
                  {/* Moving color sweep */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
                    <div 
                      className="animate-service-sweep"
                      style={{ background: 'linear-gradient(90deg, transparent, #00c6ff, transparent)' }}
                    ></div>
                  </div>

                  {/* Left Icon */}
                  <div className="relative z-10 text-[#00c6ff] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                    <BrainCircuit className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ filter: 'drop-shadow(0 0 8px #00c6ff)' }} />
                  </div>

                  {/* Center Text */}
                  <div className="relative z-10 flex-1 px-1 sm:px-1.5 overflow-hidden">
                    <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.1em] sm:tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] via-[#25D366] to-[#00c6ff] drop-shadow-[0_0_8px_rgba(0,198,255,0.4)] whitespace-nowrap block truncate">
                      Empowering Innovation Through Technology
                    </span>
                  </div>

                  {/* Right Icon */}
                  <div className="relative z-10 text-[#25D366] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <Orbit className="w-4 h-4 md:w-5 md:h-5 shrink-0" style={{ filter: 'drop-shadow(0 0 8px #25D366)' }} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16">
          
          {/* Left Column - Text Content */}
          <div className="w-full lg:w-[60%] text-left flex flex-col justify-center lg:justify-start z-10 pt-20 lg:pt-28">
            
            {/* Dynamic Hero Heading */}
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.3] lg:leading-[1.1] text-white"
            >
              <span className="mr-2 sm:mr-3 lg:mr-4">Transforming Businesses Through</span>
              <span className="inline-block relative min-w-[160px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[320px] xl:min-w-[400px] h-[1.3em] align-top">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={currentWord}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
                    className="absolute left-0 top-0 pb-2 whitespace-nowrap z-10 flex"
                  >
                    {words[currentWord].split('').map((char, index) => (
                      <span key={index} className="relative inline-block">
                        {/* Base text layer */}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] via-[#a855f7] to-[#00c6ff] bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_15px_rgba(0,198,255,0.4)]">
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                        
                        {/* Premium Glow Wave overlay layer */}
                        <motion.span
                          className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#a855f7] drop-shadow-[0_0_20px_rgba(0,198,255,1)]"
                          initial={{ opacity: 0, filter: "brightness(1)" }}
                          animate={{ 
                            opacity: [0, 1, 0, 0], 
                            filter: ["brightness(1)", "brightness(2)", "brightness(1)", "brightness(1)"]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.05,
                            times: [0, 0.15, 0.5, 1]
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </span>
            </motion.h1>


          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[600px] flex justify-center lg:justify-end relative pointer-events-none lg:pointer-events-auto -translate-y-6 lg:-translate-y-10"
          >
            <Spline 
              scene="https://prod.spline.design/QYsjYTMQQVk8eqIS/scene.splinecode" 
              className="w-full h-full relative z-10"
              style={{ background: 'transparent' }}
              onLoad={(spline) => {
                // Remove WebGL watermark by disabling the logo overlay pass
                if (spline && spline._runtime && spline._runtime.pipeline && spline._runtime.pipeline.logoOverlayPass) {
                  spline._runtime.pipeline.logoOverlayPass.enabled = false;
                } else {
                  // Fallback for different runtime versions
                  try {
                    const runtime = Object.values(spline).find(v => v && v.pipeline && v.pipeline.logoOverlayPass);
                    if (runtime) {
                      runtime.pipeline.logoOverlayPass.enabled = false;
                    }
                  } catch (e) {}
                }
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
