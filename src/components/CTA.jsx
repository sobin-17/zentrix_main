import React from 'react';

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[var(--color-brand-purple)] opacity-30 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="badge border-white/20 bg-white/5 text-white mb-8">
          CTA
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
          Take it to the next level
        </h2>
        
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 drop-shadow-md">
          Transform your workflows, automate tasks, and unlock your business full potential with our intuitive platform.
        </p>
        
        <button className="btn-outline px-10 py-3 bg-white/5 backdrop-blur-md hover:bg-white hover:text-black border-white/20 shadow-[0_0_30px_rgba(157,0,255,0.3)]">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default CTA;
