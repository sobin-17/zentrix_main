import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-black pt-10 pb-28 sm:pb-32 lg:pb-10 overflow-hidden border-t border-white/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Background Glow - Top aligned */}
      <img
        src="/footer.jpeg"
        alt=""
        loading="lazy"
        decoding="async"
        className="
          absolute
          left-1/2
          top-0
          -translate-x-1/2
          w-[1000px]
          max-w-none
          opacity-80
          pointer-events-none
          z-[1]
        "
      />

      <div className="max-w-7xl mx-auto px-2 sm:px-8 lg:px-20 xl:px-24 relative z-10">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-[1.15fr_2fr_0.75fr_0.85fr] gap-8 items-start">
          {/* BRAND */}
          <div className="text-center lg:text-left">

            <h2 className="text-[48px] sm:text-[60px] lg:text-[78px] font-bold leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Zentrix
            </h2>

            <p className="text-[18px] sm:text-[22px] lg:text-[32px] font-light text-slate-300 tracking-[0.15em] mt-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Technology
            </p>

          </div>

          {/* DESCRIPTION */}
          <div className="max-w-[780px] lg:max-w-[850px] text-center lg:text-left">

            <p className="text-slate-200 text-[12px] lg:text-[13px] leading-[1.6] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Zentrix Technology empowers businesses and learners through
              innovative technology solutions, professional training programs,
              and industry-driven expertise. Our mission is to bridge the gap
              between learning and real-world success through creativity,
              innovation, and digital transformation.
            </p>

          </div>

          {/* MOBILE TABLE WRAPPER FOR LINKS AND CONTACT (FULL VISIBILITY 2-COLUMN LAYOUT) */}
          <div className="grid grid-cols-[0.85fr_1.15fr] sm:grid-cols-2 gap-2 sm:gap-6 lg:contents w-full pt-6 lg:pt-0 mt-4 lg:mt-0 border-t border-white/10 lg:border-none">
            {/* QUICK LINKS (LEFT) */}
            <div className="flex flex-col items-end lg:items-end justify-start text-right">

              <div className="px-3.5 sm:px-5 py-1.5 sm:py-2 border border-white/20 bg-black/60 backdrop-blur-sm rounded-full text-[10px] sm:text-xs lg:text-[13px] font-medium text-white mb-4 lg:mb-5 w-fit shadow-md">
                Quick Links
              </div>

              <ul className="flex flex-col items-end lg:items-end gap-2.5 sm:gap-3 text-[12px] sm:text-[13px] text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">

                <li className="w-full text-right">
                  <Link to="/" className="hover:text-white transition">
                    Orbit
                  </Link>
                </li>

                <li className="w-full text-right">
                  <Link to="/about" className="hover:text-white transition">
                    Meet Zentrix
                  </Link>
                </li>

                <li className="w-full text-right">
                  <Link to="/service" className="hover:text-white transition">
                    Tech Space
                  </Link>
                </li>

                <li className="w-full text-right">
                  <Link to="/your-next-step" className="hover:text-white transition">
                    Your Next Step
                  </Link>
                </li>

                <li className="w-full text-right">
                  <Link to="/course" className="hover:text-white transition">
                    Courses
                  </Link>
                </li>

                <li className="w-full text-right">
                  <Link to="/career" className="hover:text-white transition">
                    Careers
                  </Link>
                </li>

              </ul>

            </div>

            {/* CONTACT (RIGHT - FULLY VISIBLE EMAIL) */}
            <div className="flex flex-col items-center lg:items-end justify-start text-center lg:text-right overflow-visible">

              <div className="px-3.5 sm:px-5 py-1.5 sm:py-2 border border-white/20 bg-black/60 backdrop-blur-sm rounded-full text-[10px] sm:text-xs lg:text-[13px] font-medium text-white mb-4 lg:mb-5 w-fit shadow-md">
                Contact
              </div>

              <ul className="flex flex-col items-center lg:items-end gap-2.5 sm:gap-3 text-[12px] sm:text-[13px] text-slate-200 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">

                <li className="w-full text-center lg:text-right">
                  <a
                    href="mailto:info.zentrixtechnology@gmail.com"
                    className="hover:text-white transition whitespace-nowrap"
                  >
                    info.zentrixtechnology@gmail.com
                  </a>
                </li>

                <li className="w-full text-center lg:text-right">
                  <a
                    href="tel:+919150973003"
                    className="hover:text-white transition whitespace-nowrap"
                  >
                    +91 91509 73003
                  </a>
                </li>

                <li className="w-full text-center lg:text-right whitespace-nowrap">
                  Nagercoil, Tamil Nadu
                </li>

              </ul>

            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-8 pt-5 border-t border-white/10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">

            {/* Left Links */}
            <div className="flex flex-wrap justify-center gap-6 text-[12px] sm:text-[13px]">

              <Link
                to="/privacy-policy"
                className="hover:text-purple-300 transition whitespace-nowrap"
              >
                Privacy & Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="hover:text-purple-300 transition whitespace-nowrap"
              >
                Terms & Conditions
              </Link>

            </div>

            {/* Copyright */}
            <div className="text-[12px] sm:text-[13px] text-center text-slate-300">
              © 2026 Zentrix Technology. All rights reserved.
            </div>

            <div className="hidden md:block w-[180px]" />

          </div>

        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;