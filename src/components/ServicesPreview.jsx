import React from 'react';

const ServicesPreview = () => {
  const services = [
    {
      title: "software developmet",
      features: [
        "Custom Web & Mobile Applications",
        "Scalable Business Solutions",
        "Secure & High-Performance Systems",
        "Maintenance & Technical Support"
      ]
    },
    {
      title: "Projects",
      features: [
        "Academic & Final Year Projects",
        "Industry-Oriented Development",
        "Real-World Problem Solving",
        "End-to-End Project Guidance"
      ]
    },
    {
      title: "Digital marketing",
      features: [
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Content Marketing Strategies",
        "Lead Generation Campaigns"
      ]
    }
  ];

  return (
    <section id="services" className="relative py-24 z-20">
      <div className="container mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-20 hidden">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="glass-card p-10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold mb-8 capitalize">{service.title}</h3>
              
              <ul className="flex-1 space-y-4 mb-10 text-left w-full pl-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start">
                    <span className="text-sky-400 mr-2 mt-1">&bull;</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="btn-outline w-3/4">
                Enquire now
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesPreview;
