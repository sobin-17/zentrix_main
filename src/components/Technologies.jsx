import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame, animate } from 'framer-motion';
import { Layers, X } from 'lucide-react';

function useOrbitRadius() {
  const [radius, setRadius] = useState(320);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setRadius(Math.min(320, Math.max(140, w * 0.26)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return radius;
}

const ELLIPSE_RATIO = 0.8;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Short "what is it / what it's for" blurbs shown inside STACK when a tech is selected.
const TECH_INFO = {
  'Node.js': 'A JavaScript runtime for running code outside the browser. Powers fast, scalable backend services and APIs.',
  Python: 'A readable, general-purpose language. Used for scripting, automation, data processing, and backend logic.',
  'Next.js': 'A React framework with server-side rendering and routing built in -- what this site is built on.',
  Firebase: 'A backend-as-a-service platform for auth, realtime data, hosting, and cloud functions.',
  MongoDB: 'A flexible NoSQL document database, useful when data shapes vary or need to scale out.',
  MySQL: 'A dependable relational database for structured data, transactions, and complex queries.',
  AWS: 'Cloud infrastructure behind hosting, storage, and scaling for our apps.',
  React: 'A component-based library for building fast, interactive user interfaces.',
};

const Planet = ({ planet, radius, index, canEmerge, onArrived, isSelected, isDimmed, onSelect }) => {
  const finalAngle = (planet.angle * Math.PI) / 180;
  const finalX = Math.cos(finalAngle) * radius;
  const finalY = Math.sin(finalAngle) * radius * ELLIPSE_RATIO;

  const angle = useMotionValue(finalAngle);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.3);

  const [settled, setSettled] = useState(prefersReducedMotion());
  const reportedRef = useRef(prefersReducedMotion());

  useEffect(() => {
    if (!canEmerge) return;

    if (prefersReducedMotion()) {
      x.set(finalX);
      y.set(finalY);
      opacity.set(1);
      scale.set(1);
      if (!reportedRef.current) {
        reportedRef.current = true;
        onArrived();
      }
      setSettled(true);
      return;
    }

    // All planets start near the zigzag crack
    const startX = 22 + (index % 3) * 8 - 12; // Slight variation around crack
    const startY = -20 + Math.sin(index) * 12;

    const delay = index * 0.05; // Gentle stagger
    const duration = 1.2 + index * 0.05;

    setTimeout(() => {
      animate(x, finalX, { duration, ease: 'easeOut' });
      animate(y, finalY, {
        duration,
        ease: 'easeOut',
        onComplete: () => {
          setSettled(true);
          if (!reportedRef.current) {
            reportedRef.current = true;
            onArrived();
          }
        },
      });
      animate(opacity, 1, { duration: 0.5, ease: 'easeOut' });
      animate(scale, [0.3, 1.2, 1], { duration: 1.2, times: [0, 0.6, 1] });
    }, delay * 1000);

    // Set initial position near crack
    x.set(startX);
    y.set(startY);
  }, [canEmerge, finalX, finalY, index]);

  // Orbit runs once settled, but pauses for EVERY planet the instant any one
  // of them is selected -- clicking one icon freezes the whole system so its
  // position (and the others') stays put while STACK shows the details.
  useAnimationFrame((_, delta) => {
    if (!settled || isDimmed || isSelected) return;
    const speed = (planet.direction * 2 * Math.PI) / (planet.duration * 1000);
    const next = angle.get() + speed * delta;
    angle.set(next);
    x.set(Math.cos(next) * radius);
    y.set(Math.sin(next) * radius * ELLIPSE_RATIO);
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 z-20"
      style={{ x, y, opacity, scale, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
    >
      <motion.div
        animate={
          settled && !isSelected && !isDimmed
            ? { y: [0, -10, 0], opacity: 1 }
            : { y: 0, opacity: isDimmed ? 0.35 : 1 }
        }
        transition={{
          y: { duration: 5.5 + (index % 4), repeat: Infinity, repeatType: 'loop', ease: 'easeInOut', delay: index * 0.2 },
          opacity: { duration: 0.3 },
        }}
        whileHover={{ y: -14, scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
        onClick={onSelect}
        className={`group flex flex-col items-center justify-center p-5 bg-[#0f0f19]/90 backdrop-blur-md border rounded-3xl w-[100px] h-[100px] md:w-[120px] md:h-[120px] shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer transition-colors duration-300 ${
          isSelected
            ? 'border-[var(--color-brand-purple)] shadow-[0_0_45px_rgba(157,0,255,0.5)]'
            : 'border-[var(--color-brand-purple)]/20 hover:border-[var(--color-brand-purple)]/60 hover:shadow-[0_0_40px_rgba(157,0,255,0.3)]'
        }`}
      >
        <div className="mb-2 transition-transform duration-500 group-hover:scale-110">
          {planet.icon}
        </div>
        <span className="text-[10px] md:text-xs font-semibold text-slate-200 tracking-wide">
          {planet.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Technologies = () => {
  const sun = {
    name: 'STACK',
    icon: <Layers color="#a855f7" className="w-12 h-12" />,
  };

  const ORBIT_DURATION = 20;
  const ORBIT_DIRECTION = -1;

  const planets = [
    { name: 'Node.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" className="w-10 h-10 object-contain" />, angle: 0 },
    { name: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-10 h-10 object-contain" />, angle: 45 },
    { name: 'Next.js', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Next.js" className="w-10 h-10 object-contain bg-white rounded-full" />, angle: 90 },
    { name: 'Firebase', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" alt="Firebase" className="w-10 h-10 object-contain" />, angle: 135 },
    { name: 'MongoDB', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="w-10 h-10 object-contain" />, angle: 180 },
    { name: 'MySQL', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" className="w-10 h-10 object-contain" />, angle: 225 },
    { name: 'AWS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" className="w-10 h-10 object-contain bg-slate-50 p-1 rounded-sm" />, angle: 270 },
    { name: 'React', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10 object-contain" />, angle: 315 },
  ].map((p) => ({ ...p, duration: ORBIT_DURATION, direction: ORBIT_DIRECTION }));

  const radius = useOrbitRadius();
  const [phase, setPhase] = useState(prefersReducedMotion() ? 'joined' : 'idle');
  const arrivedCountRef = useRef(0);
  const [selected, setSelected] = useState(null);
  const selectedPlanet = planets.find((p) => p.name === selected) || null;

  const handleArrived = () => {
    arrivedCountRef.current += 1;
    if (arrivedCountRef.current >= planets.length) {
      setPhase('joined');
    }
  };

  const shardVariants = {
    closed: { x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 420, damping: 24, mass: 0.6 } },
    left: { x: -58, y: -20, rotate: -14, transition: { duration: 1.8, ease: 'easeInOut' } },
    right: { x: 58, y: 20, rotate: 14, transition: { duration: 1.8, ease: 'easeInOut' } },
  };

  // Shards open once cracking starts, then close back together the moment
  // every planet has arrived -- the shell fuses shut into one solid,
  // unbroken card again rather than staying visibly split.
  const shardOpen = phase === 'cracking' || phase === 'emerging';

  return (
    <section id="course" className="py-8 md:py-16 bg-transparent border-y border-white/5 text-center overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Technologies We Work With</h2>

        <motion.div
          className="relative w-full h-[380px] sm:h-[450px] md:h-[550px] lg:h-[650px] max-w-6xl mx-auto mt-4 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          onViewportEnter={() => setPhase((p) => (p === 'idle' ? 'cracking' : p))}
          onClick={(e) => {
            // Clicking empty space closes the open detail and resumes orbiting.
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[420px] h-[420px] bg-[var(--color-brand-purple)]/20 rounded-full blur-[130px]" />
          </div>

          {/* Orbit Ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div
              className="rounded-full border-[0.5px] border-dashed border-[var(--color-brand-purple)]/25"
              style={{ width: radius * 2, height: radius * 2 * ELLIPSE_RATIO }}
            />
          </div>

          {/* Central STACK with Zigzag Break */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <motion.div
              className={`relative transition-[width,height] duration-500 ease-out ${
                selectedPlanet
                  ? 'w-[220px] h-[220px] md:w-[240px] md:h-[240px]'
                  : 'w-[135px] h-[135px] md:w-[160px] md:h-[160px]'
              }`}
              animate={{ scale: phase === 'healed' ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {/* STACK Content -- swaps to the selected tech's details, or
                  back to the STACK label when nothing is selected. */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-30 px-5 text-center pointer-events-auto"
                animate={{ scale: selectedPlanet ? 1 : [1, 1.08, 1] }}
                transition={{ duration: 4.5, repeat: selectedPlanet ? 0 : Infinity }}
              >
                <AnimatePresence mode="wait">
                  {selectedPlanet ? (
                    <motion.div
                      key={selectedPlanet.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="relative flex flex-col items-center gap-1"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(null);
                        }}
                        className="absolute -top-3 -right-3 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close details"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="mb-1 scale-90">{selectedPlanet.icon}</div>
                      <span className="text-sm font-bold text-slate-100">{selectedPlanet.name}</span>
                      <p className="text-[13px] md:text-sm leading-relaxed text-gray-400 mt-1">
                        {TECH_INFO[selectedPlanet.name]}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="flex flex-col items-center"
                    >
                      <div className="mb-2">{sun.icon}</div>
                      <span className="text-xs font-semibold text-slate-200 tracking-wide">{sun.name}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Left Zigzag Shell */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-[#0f0f19] border border-[var(--color-brand-purple)]/40 shadow-[0_0_50px_rgba(157,0,255,0.35)] z-10 overflow-hidden"
                style={{ clipPath: 'polygon(0% 0%, 50% 0%, 42% 14%, 58% 28%, 42% 50%, 58% 72%, 42% 86%, 50% 100%, 0% 100%)' }}
                variants={shardVariants}
                animate={shardOpen ? 'left' : 'closed'}
                onAnimationComplete={(def) => {
                  if (def === 'left' && phase === 'cracking') setPhase('emerging');
                  if (def === 'closed' && phase === 'joined') setPhase('healed');
                }}
              />

              {/* Right Zigzag Shell */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-[#0f0f19] border border-[var(--color-brand-purple)]/40 shadow-[0_0_50px_rgba(157,0,255,0.35)] z-10 overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 42% 86%, 58% 72%, 42% 50%, 58% 28%, 42% 14%)' }}
                variants={shardVariants}
                animate={shardOpen ? 'right' : 'closed'}
              />

              {/* Seal moment: a bright flash plus a firm little scale-settle
                  on the whole box the instant the shell finishes closing --
                  reads as fusing solidly shut, not just snapping together. */}
              <AnimatePresence>
                {phase === 'healed' && (
                  <motion.div
                    key="seal-flash"
                    className="absolute inset-0 rounded-3xl bg-white z-20"
                    initial={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Planets */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {planets.map((planet, index) => (
              <Planet
                key={planet.name}
                planet={planet}
                radius={radius}
                index={index}
                canEmerge={phase === 'emerging' || phase === 'joined' || phase === 'healed'}
                onArrived={handleArrived}
                isSelected={selected === planet.name}
                isDimmed={!!selected && selected !== planet.name}
                onSelect={() =>
                  setSelected((s) => (s === planet.name ? null : planet.name))
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;