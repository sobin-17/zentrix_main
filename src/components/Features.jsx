import React from 'react';
import { ArrowRight, Zap, Code, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Intelligent Workflow Automation",
      description: "Set up automated tasks with AI-powered triggers to save time and reduce manual efforts.",
      icon: <Zap className="w-5 h-5 text-[var(--color-brand-purple-light)]" />,
      tags: ["Fast", "Active", "Assigned"]
    },
    {
      title: "Conversational AI Support",
      description: "Get real-time assistance with natural language processing through our advanced AI bots.",
      icon: <Code className="w-5 h-5 text-[var(--color-brand-purple-light)]" />,
      tags: ["Smart", "Helpful"]
    },
    {
      title: "Enterprise-Grade Security",
      description: "Protect your sensitive data with military-grade encryption and compliance tools.",
      icon: <Shield className="w-5 h-5 text-[var(--color-brand-purple-light)]" />,
      tags: ["Secure", "Private"]
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="badge">Features</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
            AI-Powered Tools for Effortless Productivity
          </h2>
          <p className="text-slate-400 max-w-xl text-lg">
            Discover how our cutting-edge AI tools can transform your workflow, streamline your tasks, and maximize efficiency.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card p-8 flex flex-col items-start text-left hover:bg-white/[0.03]">
              <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {feature.description}
              </p>
              
              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {feature.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${i === 0 ? 'bg-green-400' : i === 1 ? 'bg-blue-400' : 'bg-purple-400'}`}></span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
