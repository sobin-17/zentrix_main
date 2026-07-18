import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Counter = ({ from = 0, to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOut * (to - from) + from));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutPreview = () => {
  const stats = [
    { value: 48, label: "Project Deliverables", suffix: "+" },
    { value: 220, label: "Hands-on Training Sessions", suffix: "+" },
    { value: 12, label: "Business Partnerships", suffix: "+" },
    { value: 35, label: "Employees", suffix: "+" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
    }
  };

  return (
    <section id="about" className="py-10 md:py-24 relative bg-transparent z-10">


      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
            <motion.h2 
              initial={{ 
                opacity: 0, 
                y: 40,
                backgroundPosition: "200% center" 
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                backgroundPosition: "-200% center"
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                opacity: { duration: 1.2, ease: "easeOut" },
                y: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                backgroundPosition: { duration: 2.5, ease: "easeInOut", delay: 0.1 }
              }}
              style={{
                backgroundImage: "linear-gradient(110deg, #ffffff 40%, #d8b4fe 50%, #ffffff 60%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent"
              }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              Pioneering the Future of Digital Experiences
            </motion.h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Zentrix Technology is a forward-thinking technology company dedicated to empowering businesses and individuals through innovation, digital transformation, and practical learning.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              From software development and business automation to professional training and product development, we deliver solutions that drive growth, enhance skills, and create meaningful impact in today's rapidly evolving digital world.
            </p>
        </div>

        {/* Premium Animated Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full max-w-5xl mx-auto mt-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              className="relative h-full z-10"
            >
              <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-white/[0.02] hover:-translate-y-1 transition-all duration-500 hover:shadow-[0_8px_30px_-10px_rgba(168,85,247,0.25)] h-full">
                
                {/* Rotating Border Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                     style={{
                       background: 'conic-gradient(from 0deg, transparent 0 340deg, #a855f7 360deg)',
                       animation: 'spin 5s linear infinite'
                     }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-30 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                     style={{
                       background: 'conic-gradient(from 180deg, transparent 0 340deg, #00c6ff 360deg)',
                       animation: 'spin 5s linear infinite'
                     }}
                />

                {/* Inner Card */}
                <div className="flex flex-col items-center justify-center h-full p-6 bg-black/90 backdrop-blur-xl rounded-2xl relative z-10 overflow-hidden">
                  
                  {/* Ambient Light Effect (Shimmer Sweep) */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none">
                    <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#00c6ff] to-transparent opacity-50"
                         style={{ animation: 'shimmer-sweep 6s ease-in-out infinite' }}
                    />
                  </div>

                  {/* Very Soft Ambient Radial Glow Behind Numbers */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-[40px] bg-[#a855f7] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

                  <h3 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#a855f7] mb-3 drop-shadow-[0_0_15px_rgba(0,198,255,0.3)] relative z-10">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </h3>

                  <span className="text-sm text-slate-300 uppercase tracking-wider font-medium text-center relative z-10 transition-colors duration-300 group-hover:text-white">
                    {stat.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;
