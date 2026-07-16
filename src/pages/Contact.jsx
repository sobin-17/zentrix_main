import React from "react";

const Contact = () => {
  return (
    <div className="bg-black text-white overflow-hidden min-h-screen">

      {/* Hero Section */}
      <section className="relative max-w-[1400px] mx-auto px-8 pt-32 pb-24">

        {/* Purple Glow */}
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-purple-700/20 blur-[180px] rounded-full pointer-events-none" />

        {/* Heading */}
        <div className="mb-20">
          <h1 className="text-[72px] font-bold leading-none mb-4">
            Your Next Step
          </h1>

          <p className="text-gray-300 max-w-[700px] text-lg">
            Ready to scale your software systems or register inside our
            specialized academies? Submit the enquiry card beneath.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[0.9fr_1.25fr] gap-10">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6 h-full">
            {/* Contact Card */}
            <div className="flex-1 border border-purple-700/50 rounded-[30px] p-8 bg-[#070010] flex flex-col">
              <div className="border-b border-purple-700/40 mb-10 pb-6"></div>

              <div className="space-y-8">

                <div>
                  <p className="text-xs uppercase text-gray-500 mb-2">
                    Email Us
                  </p>

                  <p className="text-lg md:text-xl font-medium text-white break-words leading-7">
                    info.zentrixtechnology@gmail.com
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500 mb-2">
                    Call Support
                  </p>

                  <p className="text-[20px] md:text-[22px] font-medium text-white break-words leading-7">
                    +91 91509 73003
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-gray-500 mb-2">
                    HQ Address
                  </p>

                  <p className="text-[20px] md:text-[22px] font-medium text-white break-words leading-7">
                    Nagercoil, Tamilnadu
                  </p>
                </div>

              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex-1 border border-purple-700/50 rounded-[30px] p-8 bg-[#070010] flex flex-col justify-center">
              <h3 className="text-[24px] md:text-[26px] font-semibold text-white mb-5">
                Operating Hours
              </h3>

              <p className="text-gray-400">
                Monday - Saturday: 09:30 AM - 06:00 PM
              </p>

            </div>

          </div>

          {/* RIGHT SIDE FORM */}
          <div className="border border-purple-700/40 rounded-[35px] p-8 bg-[#05000d]">

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">
                  Your Name
                </label>

                <input
                  type="text"
                  className="w-full h-14 bg-black border border-purple-700/40 rounded-2xl px-5"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  className="w-full h-14 bg-black border border-purple-700/40 rounded-2xl px-5"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">
                  Phone / Whatsapp
                </label>

                <input
                  type="text"
                  className="w-full h-14 bg-black border border-purple-700/40 rounded-2xl px-5"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">
                  Interested Segment
                </label>

                <input
                  type="text"
                  defaultValue="Enterprise Software Development Consulting"
                  className="w-full h-14 bg-black border border-purple-700/40 rounded-2xl px-5"
                />
              </div>

            </div>

            <div className="mt-8">
              <label className="block text-xs uppercase text-gray-500 mb-2">
                Consultation Message Details
              </label>

              <textarea
                rows={8}
                className="w-full bg-black border border-purple-700/40 rounded-3xl p-5 resize-none"
              />
            </div>

            <button
              className="
                w-full
                mt-6
                h-14
                rounded-2xl
                bg-gradient-to-r
                from-purple-800
                to-fuchsia-600
                font-semibold
              "
            >
              Submit Consultation Card
            </button>

          </div>

        </div>

      </section>
    </div>
  );
};

export default Contact;

