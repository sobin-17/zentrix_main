import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Smartphone, Globe, Cloud } from 'lucide-react';
import '../styles/services.css';

const ServicesOverview = () => {
  const services = [
    {
      title: "Web Development",
      tagline: "Custom & Scalable",
      description: "Custom, scalable, and high-performance web applications tailored to your business needs.",
      icon: <Globe className="w-5 h-5 shrink-0" />,
      color: "#00c6ff", // Blue glow
    },
    {
      title: "Mobile Development",
      tagline: "Native Experiences",
      description: "Native and cross-platform mobile experiences that engage users on any device.",
      icon: <Smartphone className="w-5 h-5 shrink-0" />,
      color: "#25D366", // Green glow
    },
    {
      title: "UI/UX Design",
      tagline: "Intuitive Interfaces",
      description: "Intuitive, accessible, and visually stunning interfaces designed for user retention.",
      icon: <Layers className="w-5 h-5 shrink-0" />,
      color: "#a855f7", // Purple glow
    },
    {
      title: "Digital Marketing",
      tagline: "Growth & Brand Visibility",
      description: "Data-driven marketing strategies to accelerate your growth and brand visibility.",
      icon: <Cloud className="w-5 h-5 shrink-0" />,
      color: "#ec4899", // Violet/Pink glow
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="service" className="py-10 md:py-24 relative bg-transparent z-10">

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="badge">Services</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-slate-400 max-w-3xl text-lg">
            At Zentrix Technology, we offer a comprehensive range of services designed to meet modern business and learning needs. Our expertise includes software development, website and mobile application solutions, digital marketing, project development, AI-powered systems, and industry-focused training programs. We combine innovation, technical excellence, and practical experience to help clients achieve their goals efficiently.
          </p>
        </div>

        {/* Services Highlight Cards */}
        <motion.div 
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 md:gap-4 mt-8 lg:mt-12 w-full relative z-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => {
            // Assign a unique duration between 6s and ~10s for each card to prevent synchronization
            const sweepDuration = 6 + (index * 1.3);
            
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                className="group relative cursor-pointer w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] xl:w-auto shrink-0 transition-all duration-500 hover:-translate-y-2"
                title={service.description}
              >
                {/* Outer Glow on Hover */}
                <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"></div>

                {/* Elegant Energy Border (Seamless Perimeter Loop) */}
                <div className="zentrix-energy-border">
                  <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2">
                    <div 
                      className="w-full h-full"
                      style={{
                        background: "conic-gradient(from 0deg, transparent 75%, rgba(168, 85, 247, 0.9) 100%)",
                        animation: `zentrix-border-spin ${sweepDuration}s linear infinite`
                      }}
                    />
                  </div>
                </div>

                {/* Glassmorphism Panel */}
                <div className="relative flex items-center gap-4 px-5 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden transition-all duration-500">
                  
                  {/* Inner Highlight Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                  {/* Faint Energy Sweep (Hover & Continuous) */}
                  <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-[250%] h-[250%] -translate-x-1/2 -translate-y-1/2">
                      <div 
                        className="w-full h-full"
                        style={{
                          background: "conic-gradient(from 0deg, transparent 75%, rgba(168, 85, 247, 0.15) 100%)",
                          animation: `zentrix-border-spin ${sweepDuration}s linear infinite`
                        }}
                      />
                    </div>
                  </div>

                  {/* Icon Container with Soft Glow */}
                  <div className="relative z-10 flex items-center justify-center shrink-0">
                    <div className="absolute inset-[-4px] bg-purple-500/30 blur-md rounded-full pointer-events-none transition-all duration-500 group-hover:bg-purple-500/60 group-hover:scale-150"></div>
                    <div className="relative z-10 text-white transition-transform duration-500 group-hover:scale-110">
                      {React.cloneElement(service.icon, { className: "w-5 h-5 shrink-0" })}
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col flex-1 relative z-10 overflow-hidden text-left">
                    <h3 className="text-xs lg:text-[11px] font-bold text-white uppercase tracking-wider truncate">
                      {service.title}
                    </h3>
                    <span className="text-[11px] lg:text-[10px] text-slate-400 group-hover:text-white/90 transition-colors truncate mt-0.5">
                      {service.tagline}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default ServicesOverview;
