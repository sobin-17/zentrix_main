import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';


const OurProducts = () => {
  return (
    <main className="min-h-screen bg-black text-white pb-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-[36rem] h-[36rem] bg-purple-600/20 rounded-full blur-[130px]" />
        <div className="absolute top-60 right-0 w-[28rem] h-[28rem] bg-fuchsia-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24">
        {/* Hero */}
        <div className="mb-16 md:mb-20">
          <p className="text-[13px] font-semibold tracking-[0.25em] uppercase text-fuchsia-300 mb-4">
            What We Build
          </p>
          <h1 className="text-white font-black leading-[0.95] tracking-tight text-[56px] md:text-[80px] lg:text-[92px]">
            Our Products
          </h1>
          <p className="mt-6 max-w-2xl text-slate-400 text-base md:text-lg leading-relaxed">
            Software built by Zentrix Technologies to solve real operational
            problems — from customer management to analytics. Explore what
            we've shipped, and what we can build for you.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-white/10 rounded-2xl p-7 md:p-8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-fuchsia-400/30 transition-all duration-300"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-fuchsia-300 mb-2">
                {product.tagline}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {product.name}
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-5">
                {product.description}
              </p>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-fuchsia-400/80 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white hover:text-fuchsia-300 transition-colors"
              >
                Get in touch <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-20 border border-white/10 rounded-2xl p-8 md:p-12 bg-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Need something custom built?
            </h2>
            <p className="text-slate-400 max-w-xl">
              We also build bespoke software tailored to your business. Tell
              us what you need.
            </p>
          </div>
          <Link
            to="/get-in-touch"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-white text-black px-6 py-3 rounded-full font-semibold text-sm hover:bg-slate-200 transition-colors"
          >
            Get In Touch <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OurProducts;