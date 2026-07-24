import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Privacy Policy
        </h1>

        <p className="text-gray-400 mb-12">
          Effective Date: June 2026
        </p>

        <div className="space-y-10 text-gray-300 leading-relaxed">

          {/* Introduction */}
          <section>
            <p>
              At Zentrix Technology, protecting your privacy and ensuring
              the secure use of our services is a core commitment. We value
              the trust you place in us and take every measure to safeguard
              your personal and non-personal information while using our
              website, services, training programs, and digital platforms.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong className="text-white">
                  Personal Information:
                </strong>{" "}
                Name, email address, phone number, company details,
                and other information submitted through enquiry,
                registration, or contact forms.
              </li>

              <li>
                <strong className="text-white">
                  Course & Career Information:
                </strong>{" "}
                Information provided during course registrations,
                internship applications, job applications, and
                professional training programs.
              </li>

              <li>
                <strong className="text-white">
                  Website Usage Information:
                </strong>{" "}
                Browser type, device information, pages visited,
                referral sources, and interaction data collected
                through analytics tools.
              </li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              How We Use Your Data
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>To deliver and improve our products and services.</li>

              <li>
                To process registrations, enquiries, applications,
                and support requests.
              </li>

              <li>
                To communicate important updates regarding services,
                programs, events, and opportunities.
              </li>

              <li>
                To improve website functionality, performance,
                and user experience.
              </li>

              <li>
                To maintain security and prevent unauthorized use
                of our systems.
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Data Security & Confidentiality
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                Personal information is protected using industry
                standard security practices.
              </li>

              <li>
                Access to sensitive information is restricted to
                authorized personnel only.
              </li>

              <li>
                Regular security reviews and monitoring procedures
                are conducted to maintain data integrity.
              </li>

              <li>
                Reasonable measures are taken to prevent unauthorized
                access, disclosure, misuse, or alteration of data.
              </li>
            </ul>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Third-Party Services
            </h2>

            <p>
              Zentrix Technology may utilize trusted third-party
              platforms and services such as Firebase Hosting,
              Firebase Analytics, Firestore, and related cloud
              infrastructure providers to improve functionality,
              reliability, security, and overall website performance.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Cookies & Analytics
            </h2>

            <p>
              Our website may use cookies and analytics technologies
              to understand visitor behavior, optimize performance,
              enhance user experience, and improve the effectiveness
              of our digital services.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              User Rights
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>
                Request access to information we hold about you.
              </li>

              <li>
                Request correction of inaccurate or incomplete data.
              </li>

              <li>
                Request deletion of personal information where
                legally applicable.
              </li>

              <li>
                Withdraw consent for marketing communications.
              </li>
            </ul>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              User Consent & Policy Updates
            </h2>

            <p className="mb-4">
              By using our website, services, or training programs,
              you acknowledge and agree to the practices outlined
              in this Privacy Policy.
            </p>

            <p>
              Zentrix Technology reserves the right to update or
              modify this Privacy Policy at any time. Changes will
              become effective immediately upon publication on this
              website. Users are encouraged to review this page
              periodically for updates.
            </p>
          </section>

          {/* Commitment */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Our Commitment To You
            </h2>

            <p>
              Your trust is important to us. Zentrix Technology is
              committed to maintaining high standards of privacy,
              security, transparency, and responsible data handling
              across all of our services and platforms.
            </p>
          </section>


        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;