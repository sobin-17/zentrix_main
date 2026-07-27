import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const Roadmap = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const timelineData = [
    {
      badge: "Pillar 1",
      title: "Transform Businesses",
      description: "Through intelligent digital solutions and automation.",
      color: "bg-indigo-500",
      borderColor: "border-indigo-500",
      glowColor: "rgba(99,102,241,0.5)"
    },
    {
      badge: "Pillar 2",
      title: "Empower Talent",
      description: "By creating practical learning experiences that bridge the gap between education and industry.",
      color: "bg-violet-500",
      borderColor: "border-violet-500",
      glowColor: "rgba(139,92,246,0.5)"
    },
    {
      badge: "Pillar 3",
      title: "Create Innovation",
      description: "By developing impactful products that address evolving market needs and shape the future.",
      color: "bg-fuchsia-300",
      borderColor: "border-fuchsia-300",
      glowColor: "rgba(240,171,252,0.5)"
    }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: isMobile ? "-30px" : "-100px" });

  const lineDuration = 1.2;

  return (
    <section className="py-10 md:py-24 relative bg-transparent border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

        <div className="flex flex-col items-center text-center mb-14 md:mb-20">
          <div className="badge mb-6">Roadmap</div>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Our roadmap is centered around three pillars:
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mb-16 md:mb-20" ref={sectionRef}>

          {/* Faint Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"></div>

          {/* Animated Filled Vertical Line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-fuchsia-300 -translate-x-1/2 hidden md:block"
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: lineDuration, ease: "easeInOut" }}
          />

          {/* Traveling Glowing Orb */}
          <motion.div
            className="absolute left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff] -translate-x-1/2 hidden md:block z-30"
            initial={{ top: "0%", opacity: 0 }}
            animate={isInView ? { top: "100%", opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
            transition={{ duration: lineDuration, ease: "linear" }}
          />

          <div className="space-y-8 sm:space-y-12 relative">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              const delay = isMobile ? index * 0.12 : 0.2 + (index * 0.4);

              return (
                <div key={index} className={`flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} relative`}>

                  {/* Card */}
                  <motion.div
                    className={`w-full md:w-[45%] bg-[#1a1b1e] rounded-2xl p-5 sm:p-6 border-l-4 ${item.borderColor} shadow-xl relative z-10 mb-6 md:mb-0 transform-gpu will-change-transform`}
                    initial={isMobile ? { opacity: 0, y: 16 } : { opacity: 0, x: isLeft ? -40 : 40, scale: 0.96 }}
                    animate={isInView ? (isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0, scale: 1 }) : (isMobile ? { opacity: 0, y: 16 } : { opacity: 0, x: isLeft ? -40 : 40, scale: 0.96 })}
                    transition={{
                      duration: isMobile ? 0.4 : 0.6,
                      delay,
                      ease: "easeOut"
                    }}
                  >
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-3">
                      <span className={`whitespace-nowrap px-3.5 py-1 rounded-full text-white text-xs sm:text-sm font-bold ${item.color}`}>
                        {item.badge}
                      </span>
                      <h3 className="text-white font-semibold text-base sm:text-lg">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-20">
                    <motion.div
                      className={`w-full h-full rounded-full ${item.color} shadow-[0_0_15px_currentColor]`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            As we grow, our goal is to foster a community of innovators, learners, and businesses working together to create meaningful change through technology.
          </p>
          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
            We're not just building solutions. We're building the future of innovation, learning, and digital transformation.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Roadmap;