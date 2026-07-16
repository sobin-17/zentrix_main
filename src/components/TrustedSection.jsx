import React from 'react';
import { ShieldCheck, Award, Building2, BadgeCheck } from 'lucide-react';

const TrustedSection = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-center text-sm text-slate-400 mb-8 uppercase tracking-widest font-semibold">
          Trusted By & Certified Under
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[var(--color-brand-purple)]" />
            <span className="font-bold text-xl tracking-tighter">Govt. Recognized</span>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-[var(--color-brand-purple)]" />
            <span className="font-bold text-xl tracking-tighter">MSME Certified</span>
          </div>
          <div className="flex items-center gap-3 hidden md:flex">
            <Award className="w-8 h-8 text-[var(--color-brand-purple)]" />
            <span className="font-bold text-xl tracking-tighter">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-3 hidden lg:flex">
            <BadgeCheck className="w-8 h-8 text-[var(--color-brand-purple)]" />
            <span className="font-bold text-xl tracking-tighter">Data Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
