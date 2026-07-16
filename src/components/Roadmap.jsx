import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Roadmap = () => {
  const timelineData = [
    {
      badge: "Pillar 1",
      title: "Transform Businesses",
      description: "Through intelligent digital solutions and automation.",
      color: "bg-blue-500",
      borderColor: "border-blue-500",
      glowColor: "rgba(59,130,246,0.5)"
    },
    {
      badge: "Pillar 2",
      title: "Empower Talent",
      description: "By creating practical learning experiences that bridge the gap between education and industry.",
      color: "bg-green-500",
      borderColor: "border-green-500",
      glowColor: "rgba(34,197,94,0.5)"
    },
    {
      badge: "Pillar 3",
      title: "Create Innovation",
      description: "By developing impactful products that address evolving market needs and shape the future.",
      color: "bg-purple-500",
      borderColor: "border-purple-500",
      glowColor: "rgba(168,85,247,0.5)"
    }
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const lineDuration = 1.5;

  return (
    <section className="py-24 relative bg-transparent border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">

        <div className="flex flex-col items-center text-center mb-20">
          <div className="badge mb-6">Roadmap</div>
          <p className="text-slate-400 max-w-2xl text-lg">
            Our roadmap is centered around three pillars:
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mb-20" ref={sectionRef}>

          {/* Faint Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block"></div>

          {/* Animated Filled Vertical Line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 -translate-x-1/2 hidden md:block"
            initial={{ height: "0%" }}
            animate={isInView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: lineDuration, ease: "linear" }}
          />

          {/* Traveling Glowing Orb */}
          <motion.div
            className="absolute left-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff] -translate-x-1/2 hidden md:block z-30"
            initial={{ top: "0%", opacity: 0 }}
            animate={isInView ? { top: "100%", opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
            transition={{ duration: lineDuration, ease: "linear" }}
          />

          <div className="space-y-12 relative">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;
              // Precise timing: 0.25s, 0.75s, 1.25s
              const delay = 0.25 + (index * 0.5);

              return (
                <div key={index} className={`flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} relative`}>

                  {/* Card */}
                  <motion.div
                    className={`w-full md:w-[45%] bg-[#1a1b1e] rounded-2xl p-6 border-l-4 ${item.borderColor} shadow-2xl relative z-10 mb-8 md:mb-0`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.95, boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                    animate={isInView ? {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      boxShadow: [
                        "0 0 0px rgba(0,0,0,0)",
                        `0 0 40px ${item.glowColor}`,
                        "0 25px 50px -12px rgba(0,0,0,0.25)"
                      ]
                    } : { opacity: 0, x: isLeft ? -50 : 50, scale: 0.95, boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                    transition={{
                      opacity: { duration: 0.8, delay, ease: "easeOut" },
                      x: { duration: 0.8, delay, ease: "easeOut" },
                      scale: { duration: 0.8, delay, ease: "easeOut" },
                      boxShadow: { duration: 1.5, delay, ease: "easeInOut" }
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-4 py-1.5 rounded-full text-white text-sm font-bold ${item.color}`}>
                        {item.badge}
                      </span>
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
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
          <p className="text-lg text-slate-400 leading-relaxed">
            As we grow, our goal is to foster a community of innovators, learners, and businesses working together to create meaningful change through technology.
          </p>
          <p className="text-lg text-slate-200 font-medium leading-relaxed">
            We're not just building solutions. We're building the future of innovation, learning, and digital transformation.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Roadmap;
