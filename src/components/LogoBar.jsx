import React from 'react';
import { FaFigma, FaGithub, FaReact, FaNodeJs, FaApple, FaStripe } from 'react-icons/fa';

const LogoBar = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-white/[0.01]">
      <div className="container mx-auto px-6 md:px-12">
        <p className="text-center text-sm text-slate-400 mb-8 uppercase tracking-widest">
          The clients we serve
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <FaReact className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tighter">React</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFigma className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tighter">Figma</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGithub className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tighter">GitHub</span>
          </div>
          <div className="flex items-center gap-2 hidden md:flex">
            <FaNodeJs className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tighter">NodeJS</span>
          </div>
          <div className="flex items-center gap-2 hidden lg:flex">
            <FaStripe className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tighter">Stripe</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBar;
