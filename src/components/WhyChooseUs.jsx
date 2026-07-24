import React, { useRef, useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const WhyChooseUs = () => {
  const reasons = [
    { title: "Comprehensive Technology Solutions", desc: "From custom software and mobile applications to AI-powered solutions and business automation, we provide end-to-end digital transformation services." },
    { title: "Industry-Focused Training", desc: "We bridge the gap between education and industry by offering practical, hands-on training designed to build real-world skills." },
    { title: "Innovation-Driven Approach", desc: "We leverage modern technologies and creative thinking to develop solutions that solve real business challenges." },
    { title: "Client-Centric Partnership", desc: "We work closely with our clients and learners to understand their goals and deliver solutions that create measurable value." },
    { title: "Scalable & Future-Ready Solutions", desc: "Our products and services are designed to grow alongside your business and adapt to changing industry needs." },
    { title: "Quality & Excellence", desc: "We are committed to delivering high-quality services, impactful learning experiences, and reliable products that exceed expectations." }
  ];

  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [pathD, setPathD] = useState("");
  const [cardDelays, setCardDelays] = useState(reasons.map((_, i) => i * 0.5)); // Fallback delays
  
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const totalDuration = 1.8; // Fast & snappy 1.8s journey

  useEffect(() => {
    const calculatePath = () => {
      if (!containerRef.current || cardRefs.current.length === 0) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const centers = [];
      
      for (let i = 0; i < reasons.length; i++) {
        const card = cardRefs.current[i];
        if (card) {
          const rect = card.getBoundingClientRect();
          // Calculate center coordinates relative to the parent container
          const x = rect.left - containerRect.left + rect.width / 2;
          const y = rect.top - containerRect.top + rect.height / 2;
          centers.push({ x, y });
        }
      }
      
      if (centers.length > 0) {
        let d = `M ${centers[0].x},${centers[0].y}`;
        for (let i = 1; i < centers.length; i++) {
          d += ` L ${centers[i].x},${centers[i].y}`;
        }
        setPathD(d);
        
        // Calculate cumulative lengths to accurately sync cards with constant-speed path
        let totalLen = 0;
        const lengths = [0];
        for (let i = 1; i < centers.length; i++) {
          const dx = centers[i].x - centers[i-1].x;
          const dy = centers[i].y - centers[i-1].y;
          totalLen += Math.sqrt(dx*dx + dy*dy);
          lengths.push(totalLen);
        }
        
        if (totalLen > 0) {
          setCardDelays(lengths.map(l => (l / totalLen) * totalDuration));
        }
      }
    };
    
    // Initial calculation and observer
    calculatePath();
    const resizeObserver = new ResizeObserver(calculatePath);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [reasons.length]);

  return (
    <section className="py-8 md:py-16 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="badge mb-6">Why Choose Zentrix</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Built for Performance. Designed for Growth
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              We leverage modern technologies and creative thinking to develop solutions that solve real business challenges.
            </p>
          </div>
          
          <div className="relative" ref={containerRef}>
            
            {/* Connected Journey Path Overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              <defs>
                <linearGradient id="journeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00c6ff" />
                  <stop offset="50%" stopColor="#6a82fb" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
                <filter id="orbGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {pathD && (
                <>
                  {/* Faint background track */}
                  <path d={pathD} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="8,8" />
                  
                  {/* Animated Glowing Path */}
                  <motion.path 
                    id="animatedJourneyPath"
                    d={pathD} 
                    fill="none" 
                    stroke="url(#journeyGradient)" 
                    strokeWidth="3" 
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: totalDuration, ease: "linear" }}
                    style={{ filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.7))' }}
                  />
                  
                  {/* Traveling Glowing Orb */}
                  {isInView && (
                    <circle r="6" fill="#ffffff" filter="url(#orbGlow)">
                      <animateMotion dur={`${totalDuration}s`} repeatCount="1" fill="freeze" calcMode="linear">
                        <mpath href="#animatedJourneyPath" />
                      </animateMotion>
                    </circle>
                  )}
                </>
              )}
            </svg>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {reasons.map((reason, index) => (
                <motion.div 
                  key={index} 
                  ref={el => cardRefs.current[index] = el}
                  initial={{ opacity: 0, y: 30, boxShadow: "0 0 0px rgba(0,198,255,0)" }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    boxShadow: ["0 0 0px rgba(0,198,255,0)", "0 0 35px rgba(168,85,247,0.5)", "0 0 0px rgba(0,198,255,0)"]
                  } : { opacity: 0, y: 30, boxShadow: "0 0 0px rgba(0,198,255,0)" }}
                  transition={{ 
                    opacity: { duration: 0.6, delay: cardDelays[index] || 0, ease: "easeOut" },
                    y: { duration: 0.6, delay: cardDelays[index] || 0, ease: "easeOut" },
                    boxShadow: { duration: 1.2, delay: cardDelays[index] || 0, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    y: -6, 
                    boxShadow: "0 15px 35px -10px rgba(0,198,255,0.4)",
                    transition: { duration: 0.3 }
                  }}
                  className="feature-card p-6 relative bg-black/40 backdrop-blur-sm border border-white/5 cursor-default transform-gpu"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <h4 className="font-semibold text-white text-lg">{reason.title}</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{reason.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
