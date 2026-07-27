import React from 'react';
import { motion } from 'framer-motion';

const Roadmap = () => {
  const timelineData = [
    {
      badge: "Pillar 1",
      title: "Transform Businesses",
      description: "Through intelligent digital solutions and automation.",
      color: "bg-indigo-500",
      borderColor: "border-indigo-500",
    },
    {
      badge: "Pillar 2",
      title: "Empower Talent",
      description: "By creating practical learning experiences that bridge the gap between education and industry.",
      color: "bg-violet-500",
      borderColor: "border-violet-500",
    },
    {
      badge: "Pillar 3",
      title: "Create Innovation",
      description: "By developing impactful products that address evolving market needs and shape the future.",
      color: "bg-fuchsia-300",
      borderColor: "border-fuchsia-300",
    }
  ];

  return (
    <section className="py-10 md:py-24 relative bg-transparent border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl relative z-10">

        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <div className="badge mb-6">Roadmap</div>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Our roadmap is centered around three pillars:
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mb-16 md:mb-20">

          {/* Faint Vertical Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>

          {/* Animated Filled Vertical Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-violet-500 to-fuchsia-300 -translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8 sm:space-y-12 relative">
            {timelineData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className={`flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'} relative`}>

                  {/* Card */}
                  <motion.div
                    className={`w-full md:w-[45%] bg-[#1a1b1e] rounded-2xl p-5 sm:p-6 border-l-4 ${item.borderColor} shadow-xl relative z-10 mb-2 md:mb-0 transform-gpu`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
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

                  {/* Timeline Dot (Desktop) */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 z-20">
                    <motion.div
                      className={`w-full h-full rounded-full ${item.color} shadow-[0_0_15px_currentColor]`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.2 }}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4 px-2">
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