import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What makes this SaaS different from others?",
      answer: "Our SaaS stands out due to its AI-powered automation, seamless integration with popular tools, and a workflow designed to maximize productivity while minimizing effort. It's built to adapt to scale and industries."
    },
    {
      question: "Does it integrate with other platforms?",
      answer: "Yes, we offer native integrations with Slack, Salesforce, Google Workspace, and a robust API for custom connections."
    },
    {
      question: "Can I customize the dashboard to suit my needs?",
      answer: "Absolutely! You can use our drag-and-drop widget system to create a personalized view of your most important metrics."
    },
    {
      question: "Is customer support available?",
      answer: "We offer 24/7 customer support via live chat, email, and a comprehensive knowledge base."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-32 bg-black/50 border-y border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="badge">FAQ</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`feature-card overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/[0.03] border-white/10' : 'bg-transparent border-transparent hover:bg-white/[0.01]'}`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                >
                  <span className="font-semibold text-lg text-slate-200">{faq.question}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                  )}
                </button>
                
                <div 
                  className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
