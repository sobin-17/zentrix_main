import React from 'react';
import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import ServicesOverview from '../components/ServicesOverview';
import InternshipProgram from '../components/InternshipProgram';
import Technologies from '../components/Technologies';
import WhyChooseUs from '../components/WhyChooseUs';
import Roadmap from '../components/Roadmap';
import ContactCTA from '../components/ContactCTA';

const Home = () => {
  // Optimized lightweight cosmic particles for 60fps smooth performance
  const [particles] = React.useState(() => {
    const colors = ['#00c6ff', '#25D366', '#a855f7', '#ec4899'];
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 100}px`,
      ty: `${(Math.random() - 0.5) * 100}px`,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  });

  return (
    <main>
      {/* Shared Cosmic Background Wrapper */}
      <div className="relative">
        {/* Fast Hardware-Accelerated Ambient Lighting */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden max-w-full transform-gpu">
          <div 
            className="ambient-light w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] top-0 left-1/4 transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(157, 0, 255, 0.15) 0%, transparent 70%)',
            }}
          />
          <div 
            className="ambient-light w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] bottom-0 right-1/4 transform-gpu"
            style={{
              background: 'radial-gradient(circle, rgba(0, 198, 255, 0.1) 0%, transparent 70%)',
              animationDelay: '2s'
            }}
          />

          {/* Optimized Floating Cosmic Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="service-particle"
              style={{
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
                backgroundColor: p.color,
                '--tx': p.tx,
                '--ty': p.ty,
                '--duration': `${p.duration}s`,
                '--delay': `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <Hero />
        <AboutPreview />
        <ServicesOverview />
        <InternshipProgram />
        <Technologies />
        <WhyChooseUs />
        <Roadmap />
      </div>

      <ContactCTA />
    </main>
  );
};

export default Home;
