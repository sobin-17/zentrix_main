import React from 'react';

const CompanyOverview = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Glowing Blobs */}
      <div className="glow-blob glow-purple w-[1000px] h-[600px] top-1/2 left-0 -translate-y-1/2 opacity-30"></div>
      <div className="glow-blob glow-blue w-[800px] h-[500px] top-1/2 right-0 -translate-y-1/2 opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-6">
              What we<br/>do
            </h2>
          </div>

          <div className="w-full md:w-1/2 flex justify-end">
            <p className="text-right text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
              Zentrix Technology empowers individuals and businesses through innovative technology solutions, industry-focused training, and digital transformation services. From software development and UI/UX design to project building, digital marketing, and emerging technologies, we help clients and learners achieve their goals through practical expertise, creative thinking, and modern solutions tailored to today's rapidly evolving digital landscape.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
