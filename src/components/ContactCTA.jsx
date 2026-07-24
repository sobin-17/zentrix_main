import React from 'react';
import { Link } from "react-router-dom";
const ContactCTA = () => {
  return (
    <section id="contact" className="py-12 md:py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[300px] sm:h-[400px] bg-[var(--color-brand-purple)] opacity-20 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
        <div className="inline-block border border-white/20 bg-white/5 text-white mb-6 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Link
            to="/your-next-step#get-in-touch"
            className="hover:text-purple-300 transition-colors"
          >
            Contact Us
          </Link>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white drop-shadow-lg leading-tight">
          Ready to Innovate?
        </h2>
        
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 drop-shadow-md leading-relaxed px-2">
          Let's discuss how Zentrix Technology can help you build the future. Reach out to our team of experts today.
        </p>
      </div>
    </section>
  );
};

export default ContactCTA;
