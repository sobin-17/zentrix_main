import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-black pt-10 pb-4 overflow-hidden border-t border-white/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      {/* Background Glow */}
      <img
        src="/footer.jpeg"
        alt=""
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[900px]
          max-w-none
          opacity-70
          pointer-events-none
          z-[1]
        "
      />

      <div className="max-w-7xl mx-auto px-10 lg:px-20 xl:px-24 relative z-10">

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-[1.15fr_2fr_0.75fr_0.85fr] gap-8 items-start">
          {/* BRAND */}
          <div className="text-center lg:text-left">

            <h2 className="text-[60px] lg:text-[78px] font-bold leading-none text-white">
              Zentrix
            </h2>

            <p className="text-[22px] lg:text-[32px] font-light text-slate-300 tracking-[0.15em] mt-2">
              Technology
            </p>

          </div>

          {/* DESCRIPTION */}
          <div className="max-w-[780px] lg:max-w-[850px]">

            <p className="text-slate-200 text-[12px] lg:text-[13px] leading-[1.5]">              Zentrix Technology empowers businesses and learners through
              innovative technology solutions, professional training programs,
              and industry-driven expertise. Our mission is to bridge the gap
              between learning and real-world success through creativity,
              innovation, and digital transformation.
            </p>

          </div>

          {/* MOBILE TABLE WRAPPER FOR LINKS AND CONTACT */}
          <div className="grid grid-cols-2 gap-4 lg:contents w-full pt-6 lg:pt-0 mt-4 lg:mt-0 border-t border-white/10 lg:border-none">
            {/* QUICK LINKS */}
            <div className="flex flex-col items-start lg:items-center justify-start">

              <div className="px-4 lg:px-6 py-2 border border-white/20 rounded-full text-[11px] lg:text-[13px] font-medium text-white mb-5 w-fit">
                Quick Links
              </div>

              <ul className="flex flex-col items-start lg:items-center gap-3 text-[13px] text-slate-300">

                <li className="text-left lg:text-center">
                  <Link to="/" className="hover:text-white transition">
                    Orbit
                  </Link>
                </li>

                <li className="text-left lg:text-center">
                  <Link to="/about" className="hover:text-white transition">
                    Meet Zentrix
                  </Link>
                </li>

                <li className="text-left lg:text-center">
                  <Link to="/service" className="hover:text-white transition">
                    Tech Space
                  </Link>
                </li>

                <li className="text-left lg:text-center">
                  <Link to="/your-next-step" className="hover:text-white transition">
                    Your Next Step
                  </Link>
                </li>

                <li className="text-left lg:text-center">
                  <Link to="/career" className="hover:text-white transition">
                    Careers
                  </Link>
                </li>

                <li className="text-left lg:text-center">
                  <Link to="/course" className="hover:text-white transition">
                    Courses
                  </Link>
                </li>

              </ul>

            </div>

            {/* CONTACT */}
            <div className="flex flex-col items-start lg:items-end justify-start">

              <div className="px-4 lg:px-6 py-2 border border-white/20 rounded-full text-[11px] lg:text-[13px] font-medium text-white mb-5 w-fit">
                Contact
              </div>

              <ul className="space-y-4 text-[13px] text-slate-300 text-left lg:text-right">

                <li>
                  <a
                    href="mailto:info.zentrixtechnology@gmail.com"
                    className="hover:text-white transition break-all"
                  >
                    info.zentrixtechnology@gmail.com
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+919150973003"
                    className="hover:text-white transition whitespace-nowrap"
                  >
                    +91 91509 73003
                  </a>
                </li>

                <li>
                  Nagercoil
                  <br />
                  Tamilnadu
                </li>

              </ul>

            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-8 pt-5 border-t border-white/10">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">

            {/* Left Links */}
            <div className="flex gap-6 text-[13px]">

              <Link
                to="/privacy-policy"
                className="hover:text-purple-300 transition"
              >
                Privacy & Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="hover:text-purple-300 transition"
              >
                Terms & Conditions
              </Link>

            </div>

            {/* Copyright */}
            <div className="text-[13px] text-center">
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