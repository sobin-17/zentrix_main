import React from 'react';
import { BookOpen, Users, Trophy, Layers, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';


const InternshipProgram = () => {

  const expertiseContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const expertiseCardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="careers" className="py-24 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-brand-purple)] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="badge mb-6">Careers</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 max-w-2xl">
              Launch Your Career with our Internship Program
            </h2>
            <p className="text-slate-400 text-lg mb-28 lg:mb-32 leading-relaxed max-w-3xl">
              Kickstart your career with hands-on industry experience at Zentrix Technology. Our Internship Program is designed to bridge the gap between academic learning and real-world industry requirements. Interns gain practical exposure through live projects, mentorship from experienced professionals, and training in the latest technologies.
            </p>


            <div className="mb-12 w-full">
              <h4 className="text-2xl font-bold text-white mb-8 relative inline-block">
                Our Expertise
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-[#00c6ff] to-[#a855f7] rounded-full blur-[1px]"></div>
              </h4>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full relative z-10 text-center"
                variants={expertiseContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { 
                    title: "Courses", 
                    icon: <BookOpen className="w-8 h-8" />,
                    gradient: "bg-[linear-gradient(to_right,transparent,rgba(0,198,255,0.8),rgba(168,85,247,0.8),transparent)] w-[200%] h-full",
                    initial: { x: '-100%', y: '0%' },
                    animate: { x: '100%', y: '0%' },
                    cardVariants: {
                      hidden: { opacity: 0, x: -60, y: 0 },
                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } }
                    }
                  },
                  { 
                    title: "Services", 
                    icon: <Layers className="w-8 h-8" />,
                    gradient: "bg-[linear-gradient(to_bottom,transparent,rgba(0,198,255,0.8),rgba(168,85,247,0.8),transparent)] w-full h-[200%]",
                    initial: { x: '0%', y: '-100%' },
                    animate: { x: '0%', y: '100%' },
                    cardVariants: {
                      hidden: { opacity: 0, x: 0, y: -60 },
                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.2, delay: 0.6, ease: "easeOut" } }
                    }
                  },
                  { 
                    title: "Internships", 
                    icon: <Users className="w-8 h-8" />,
                    gradient: "bg-[linear-gradient(to_top,transparent,rgba(0,198,255,0.8),rgba(168,85,247,0.8),transparent)] w-full h-[200%]",
                    initial: { x: '0%', y: '100%' },
                    animate: { x: '0%', y: '-100%' },
                    cardVariants: {
                      hidden: { opacity: 0, x: 0, y: 60 },
                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.2, delay: 0.9, ease: "easeOut" } }
                    }
                  },
                  { 
                    title: "Placement Assistance", 
                    icon: <Rocket className="w-8 h-8" />,
                    gradient: "bg-[linear-gradient(to_left,transparent,rgba(0,198,255,0.8),rgba(168,85,247,0.8),transparent)] w-[200%] h-full",
                    initial: { x: '100%', y: '0%' },
                    animate: { x: '-100%', y: '0%' },
                    cardVariants: {
                      hidden: { opacity: 0, x: 60, y: 0 },
                      visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.2, delay: 1.2, ease: "easeOut" } }
                    }
                  }
                ].map((exp, index) => (
                  <motion.div 
                    key={index} 
                    variants={exp.cardVariants}
                    className="relative h-full z-10"
                  >
                    <div className="relative group p-[1px] rounded-2xl overflow-hidden bg-white/[0.02] hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_12px_40px_-10px_rgba(0,198,255,0.4)] h-full">
                      
                      {/* Full Surface Neon Energy Sweep */}
                      <motion.div
                        className={`absolute top-0 left-0 ${exp.gradient} pointer-events-none z-0`}
                        variants={{
                          hidden: exp.initial,
                          visible: {
                            ...exp.animate,
                            transition: { 
                              duration: 6 + (index * 2), 
                              ease: "linear", 
                              repeat: Infinity,
                              repeatType: "loop"
                            }
                          }
                        }}
                      />

                      {/* Inner Card */}
                      <div className="flex flex-col items-center justify-center h-full p-8 bg-black/70 backdrop-blur-xl rounded-2xl relative z-10 overflow-hidden">


                        {/* Icon */}
                        <div className="text-[var(--color-brand-cyan)] mb-4 drop-shadow-[0_0_10px_rgba(0,198,255,0.4)] group-hover:scale-110 transition-transform duration-500">
                          {exp.icon}
                        </div>
                        
                        {/* Title */}
                        <span className="text-lg text-slate-200 font-bold text-center relative z-10 transition-colors duration-300 group-hover:text-white">
                          {exp.title}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipProgram;
