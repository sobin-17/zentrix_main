import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { BrainCircuit, Orbit } from 'lucide-react';
import '../styles/services.css';

const Hero = () => {
  const [splineApp, setSplineApp] = useState(null);
  const [loadSpline, setLoadSpline] = useState(false);
  const heroRef = useRef(null);

  const words = ['Innovation', 'Technology', 'AI', 'Analytics', 'Automation'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    // Defer 3D canvas initialization so page opens instantly without delay
    const timer = setTimeout(() => setLoadSpline(true), 150);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    if (!loadSpline) return;

    const purgeSplineWatermark = () => {
      // 1. Regular DOM search
      document.querySelectorAll('a[href*="spline"], #logo, #spline-logo, .spline-watermark, [class*="watermark"]').forEach(el => {
        try {
          el.style.setProperty('display', 'none', 'important');
          el.style.setProperty('opacity', '0', 'important');
          el.style.setProperty('visibility', 'hidden', 'important');
          el.remove();
        } catch (e) {}
      });

      // 2. Shadow DOM search for custom elements
      document.querySelectorAll('*').forEach(node => {
        if (node.shadowRoot) {
          node.shadowRoot.querySelectorAll('a, #logo, #spline-logo, [class*="watermark"], [class*="logo"]').forEach(el => {
            try {
              el.style.setProperty('display', 'none', 'important');
              el.style.setProperty('opacity', '0', 'important');
              el.style.setProperty('visibility', 'hidden', 'important');
              el.remove();
            } catch (e) {}
          });
        }
      });
    };

    purgeSplineWatermark();
    const interval = setInterval(purgeSplineWatermark, 100);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loadSpline]);

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
    <section id="home" ref={heroRef} className="relative min-h-0 flex items-start pt-20 sm:pt-24 md:pt-28 pb-8 bg-transparent">
      {/* Deep Space Background Glow System - Fast Radial Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-1/2 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] -translate-y-1/2 translate-x-1/4 rounded-full pointer-events-none transform-gpu"
          style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Animated Pill Banner - Floating Badge */}
        <div className="relative w-full flex justify-center lg:justify-start z-20 pointer-events-none px-0 sm:px-4 mb-8 sm:mb-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative inline-block max-w-[calc(100vw-2rem)] pointer-events-auto"
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
              className="animated-border-wrapper inline-block group cursor-default max-w-full"
              style={{ '--glow-color': '#00c6ff' }}
            >
              {/* Outer breathing glow */}
              <div className="animate-breathing-glow opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="animated-border-inner flex items-center gap-2 sm:gap-3 px-3 py-1.5 md:px-5 md:py-2.5 max-w-full">
                {/* Moving color sweep */}
                <div className="absolute inset-0 opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="animate-service-sweep"
                    style={{ background: 'linear-gradient(90deg, transparent, #00c6ff, transparent)' }}
                  ></div>
                </div>

                {/* Left Icon */}
                <div className="relative z-10 text-[#00c6ff] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110 shrink-0">
                  <BrainCircuit className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" style={{ filter: 'drop-shadow(0 0 8px #00c6ff)' }} />
                </div>

                {/* Center Text */}
                <div className="relative z-10 flex-1 px-1 sm:px-1.5 overflow-hidden">
                  <span className="text-[9px] sm:text-xs md:text-sm font-bold tracking-[0.08em] sm:tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] via-[#25D366] to-[#00c6ff] drop-shadow-[0_0_8px_rgba(0,198,255,0.4)] whitespace-nowrap block truncate">
                    Empowering Innovation Through Technology
                  </span>
                </div>

                {/* Right Icon */}
                <div className="relative z-10 text-[#25D366] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shrink-0">
                  <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" style={{ filter: 'drop-shadow(0 0 8px #25D366)' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">

          {/* Left Column - Text Content */}
          <div className="w-full lg:w-[60%] text-left flex flex-col justify-center lg:justify-start z-10 pt-0">

            {/* Dynamic Hero Heading */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.2] lg:leading-[1.1] text-white max-w-full"
            >
              <span className="block sm:inline-block mr-0 sm:mr-3 lg:mr-4 mb-1 sm:mb-0">
                Transforming Businesses Through
              </span>
              <span className="block sm:inline-block relative min-w-[130px] sm:min-w-[200px] md:min-w-[250px] lg:min-w-[320px] xl:min-w-[400px] h-[1.3em] align-top">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={currentWord}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] via-[#a855f7] to-[#00c6ff] bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_20px_rgba(0,198,255,0.6)] whitespace-nowrap transform-gpu will-change-transform pb-2 block"
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>


          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="spline-wrapper w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[600px] flex justify-center lg:justify-end relative pointer-events-none lg:pointer-events-auto -translate-y-6 lg:-translate-y-10 transform-gpu will-change-transform overflow-hidden"
          >
            {loadSpline && (
              <div className="w-full h-[calc(100%+60px)] -mb-[60px] relative z-10 overflow-hidden">
                <Spline
                  scene="https://prod.spline.design/QYsjYTMQQVk8eqIS/scene.splinecode"
                  className="w-full h-full relative z-10"
                  style={{ background: 'transparent' }}
                  onLoad={(spline) => {
                    setSplineApp(spline);
                    try {
                      if (spline && spline._runtime) {
                        if (spline._runtime.pipeline && spline._runtime.pipeline.logoOverlayPass) {
                          spline._runtime.pipeline.logoOverlayPass.enabled = false;
                        }
                        if (spline._runtime.renderer) {
                          const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
                          const targetDPR = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
                          spline._runtime.renderer.setPixelRatio(targetDPR);
                        }
                      }
                    } catch (e) {
                      console.error("Spline load optimization error", e);
                    }
                  }}
                />
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
