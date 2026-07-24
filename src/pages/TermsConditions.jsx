import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const sections = [
    {
        title: "Acceptance of Terms",
        content:
            "By accessing or using any services provided by Zentrix Technology, including software development, web development, mobile application development, technology consulting, training programs, internships, and other digital solutions, you agree to comply with these Terms and Conditions. This agreement applies to all current services as well as any future services introduced by Zentrix Technology. If you do not agree with any part of these Terms and Conditions, you should refrain from accessing or using our website, services, or programs."
    },
    {
        title: "Services",
        content:
            "Zentrix Technology provides a range of technology solutions and professional services, including software development, web and mobile application development, technology consulting, training programs, internships, and related digital services. Detailed information regarding our services, programs, and offerings is available on our website and may be updated periodically."
    },
    {
        title: "Payments & Service Agreements",
        content:
            "Payment terms for services, training programs, internships, or other offerings will be specified in the relevant quotation, invoice, agreement, or communication provided by Zentrix Technology. Failure to comply with agreed payment terms may result in the suspension, restriction, or termination of services until outstanding obligations are fulfilled."
    },
    {
        title: "Intellectual Property",
        content:
            "All intellectual property rights related to Zentrix Technology, including but not limited to software, source code, website content, designs, graphics, logos, training materials, documentation, and digital assets, remain the exclusive property of Zentrix Technology unless otherwise stated. Users and clients may not reproduce, distribute, modify, or commercially exploit any materials without prior written permission."
    },
    {
        title: "Privacy & Data Protection",
        content:
            "Zentrix Technology is committed to protecting the privacy and security of user information. Our Privacy Policy explains how personal data is collected, processed, stored, and protected. By accessing our website or services, you acknowledge and agree to the practices described in our Privacy Policy."
    },
    {
        title: "Accuracy of Information",
        content:
            "While Zentrix Technology strives to provide accurate, reliable, and up-to-date information, we do not guarantee the completeness, accuracy, or suitability of any information, materials, or services available through our website. Users are encouraged to verify information independently where necessary."
    },
    {
        title: "Limitation of Liability",
        content:
            "Zentrix Technology shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of, inability to use, or reliance upon our website, services, training programs, or digital solutions, even if advised of the possibility of such damages."
    },
    {
        title: "User Responsibilities",
        content:
            "Users agree to use our website and services responsibly and in compliance with applicable laws and regulations. Users must not engage in unauthorized access attempts, distribute malicious content, interfere with website functionality, or misuse any services provided by Zentrix Technology."
    },
    {
        title: "Changes to Terms",
        content:
            "Zentrix Technology reserves the right to modify, update, or replace these Terms and Conditions at any time without prior notice. Continued use of our website or services following any changes constitutes acceptance of the revised Terms and Conditions."
    },
    {
        title: "Contact Information",
        content:
            "For questions regarding these Terms and Conditions, our services, or your interactions with Zentrix Technology, please contact us at info.zentrixtechnology@gmail.com or call +91 91509 73003."
    }
];

const TermsConditions = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-black min-h-screen text-white pt-32 pb-24 px-6">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Terms & Conditions
                </h1>

                <p className="text-gray-400 mb-12">
                    Effective Date: June 2026
                </p>

                <div className="space-y-4">

                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-medium">
                                    {index + 1}. {section.title}
                                </span>

                                <ChevronDown
                                    className={`transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default TermsConditions;