import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { name: 'Orbit', path: '/' },
    { name: 'Meet Zentrix', path: '/about' },
    {
      name: 'Tech Space',
      path: '/service',
      dropdown: [
        { name: 'Our Products', path: '/ourproducts' },
        { name: 'Our Portfolio', path: '/ourporfolio' }
      ]
    },
    { name: 'Courses', path: '/course' },
    { name: 'Careers', path: '/career' },
  ];

  return (
    <nav
      className={`sticky top-0 z-[100] w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-300 transform-gpu ${
        scrolled ? 'bg-[#0a0514]/90 backdrop-blur-md py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-4 md:py-5'
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <Link to="/">
          <img
            src="/logo5_transparent.png"
            alt="Zentrix"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center Nav Links Pill Container - Desktop (Spacious & Non-Overlapping) */}
      <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 mx-auto border border-white/20 rounded-full px-6 xl:px-8 py-2.5 xl:py-3 bg-black/40 backdrop-blur-md shadow-lg">
        {links.map((link) => {
          const isActive = pathname === link.path || (link.dropdown && link.dropdown.some(d => pathname === d.path));
          
          return link.dropdown ? (
            <div key={link.name} className="relative group flex flex-col justify-center h-full">
              <Link
                to={link.path}
                className={`relative flex items-center gap-1.5 text-xs xl:text-[13px] font-semibold transition-colors uppercase tracking-wider xl:tracking-widest whitespace-nowrap pb-0.5 ${
                  isActive ? 'text-purple-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    className="absolute left-0 right-0 -bottom-1 h-[2.5px] bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block z-50">
                <div className="bg-black/95 border border-white/20 rounded-2xl py-2 w-52 shadow-2xl flex flex-col backdrop-blur-lg">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.name}
                      to={sublink.path}
                      className={`px-5 py-2.5 text-xs font-semibold transition-colors uppercase tracking-wider whitespace-nowrap ${
                        pathname === sublink.path ? 'text-purple-400 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div key={link.name} className="relative flex flex-col justify-center h-full">
              <Link
                to={link.path}
                className={`relative text-xs xl:text-[13px] font-semibold transition-colors uppercase tracking-wider xl:tracking-widest whitespace-nowrap pb-0.5 flex items-center h-full ${
                  isActive ? 'text-purple-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    className="absolute left-0 right-0 -bottom-1 h-[2.5px] bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Action Button - Desktop Corner */}
      <Link
        to="/your-next-step"
        className={`hidden lg:flex items-center gap-1 select-none whitespace-nowrap bg-white text-black px-5 xl:px-6 py-2.5 rounded-full font-bold text-[11px] xl:text-[12px] uppercase tracking-wider xl:tracking-widest transition-all duration-300 hover:scale-105 border-2 ${
          pathname === '/your-next-step' 
            ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]' 
            : 'border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]'
        }`}
      >
        Your Next Step <ArrowUpRight className="w-4 h-4 ml-1 shrink-0" />
      </Link>

      {/* Mobile & Tablet Hamburger Menu Button */}
      <button
        className="lg:hidden text-white hover:text-purple-400 transition-colors ml-auto p-1.5 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Mobile & Tablet Dropdown Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl shadow-2xl lg:hidden overflow-hidden transition-all duration-300 z-50 ${
          isOpen ? 'max-h-[500px] py-5 border-b border-white/10' : 'max-h-0 py-0 border-transparent'
        }`}
      >
        <div className="flex flex-col px-6 gap-2">
          {links.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                onClick={() => !link.dropdown && setIsOpen(false)}
                className={`text-sm font-semibold transition-colors flex justify-between items-center py-2.5 uppercase tracking-wider ${
                  pathname === link.path ? 'text-purple-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="pl-4 flex flex-col mt-1 mb-2 border-l border-white/10 gap-1">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.name}
                      to={sublink.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-xs font-medium transition-colors block py-2 uppercase tracking-wider ${
                        pathname === sublink.path ? 'text-purple-400' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Your Next Step - Mobile & Tablet Only Link */}
          <div className="mt-2 pt-4 border-t border-white/10">
            <Link
              to="/your-next-step"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold flex items-center justify-between py-2.5 uppercase tracking-wider transition-colors ${
                pathname === '/your-next-step' ? 'text-pink-400' : 'text-slate-200 hover:text-white'
              }`}
            >
              Your Next Step <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
