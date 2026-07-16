import React, { useMemo } from 'react';
import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import ServicesOverview from '../components/ServicesOverview';
import InternshipProgram from '../components/InternshipProgram';
import Technologies from '../components/Technologies';
import WhyChooseUs from '../components/WhyChooseUs';
import Roadmap from '../components/Roadmap';
import ContactCTA from '../components/ContactCTA';

const Home = () => {
  // Generate deterministic particles for floating light effect across both sections
  const [particles] = React.useState(() => {
    const colors = ['#00c6ff', '#25D366', '#a855f7', '#ec4899'];
    return Array.from({ length: 175 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      tx: `${(Math.random() - 0.5) * 200}px`,
      ty: `${(Math.random() - 0.5) * 200}px`,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  });

  return (
    <main>
      {/* Shared Cosmic Background Wrapper for Hero, About, and Services */}
      <div className="relative">
        {/* Ambient Lighting Background */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div 
            className="ambient-light bg-[var(--color-brand-purple)]/20 w-[600px] h-[600px] top-0 left-1/4"
          ></div>
          <div 
            className="ambient-light bg-[#00c6ff]/10 w-[700px] h-[700px] bottom-0 right-1/4"
            style={{ animationDelay: '2s' }}
          ></div>

          {/* Floating Particles covering all 3 sections */}
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
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
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
