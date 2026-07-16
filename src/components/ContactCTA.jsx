import React from 'react';

const ContactCTA = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-[var(--color-brand-purple)] opacity-20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="badge border-white/20 bg-white/5 text-white mb-8">
          Contact Us
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-lg">
          Ready to Innovate?
        </h2>
        
        <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 drop-shadow-md">
          Let's discuss how Zentrix Technology can help you build the future. Reach out to our team of experts today.
        </p>
        

      </div>
    </section>
  );
};

export default ContactCTA;
