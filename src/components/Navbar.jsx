import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { pathname } = useLocation();

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

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
      className={`sticky top-0 z-[100] w-full px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-[#0a0514]/90 backdrop-blur-md border-b border-purple-500/20 py-3 md:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      {/* Logo */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <Link to="/">
          <img
            src="/logo5_transparent.png"
            alt="Zentrix"
            className="h-8 md:h-12 lg:h-14 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center Nav Links - Spanning Full Available Width */}
      <div className="hidden md:flex flex-1 items-center justify-around ml-8 lg:ml-16 mr-4 border border-white/20 rounded-full px-6 py-3.5 bg-black/40 backdrop-blur-md">
        {links.map((link) => {
          const isActive = pathname === link.path || (link.dropdown && link.dropdown.some(d => pathname === d.path));
          
          return link.dropdown ? (
            <div key={link.name} className="relative group flex flex-col justify-center h-full">
              <Link to={link.path} className={`relative flex items-center gap-1 text-[13px] font-semibold transition-colors uppercase tracking-widest pb-1 ${isActive ? 'text-purple-400' : 'text-slate-300 hover:text-white'}`}>
                {link.name}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    className="absolute left-0 right-0 -bottom-1 h-[3px] bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 hidden group-hover:block">
                <div className="bg-black/90 border border-white/20 rounded-2xl py-2 w-56 shadow-2xl flex flex-col backdrop-blur-lg">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.name}
                      to={sublink.path}
                      className={`px-6 py-3 text-xs font-semibold transition-colors uppercase tracking-widest ${pathname === sublink.path ? 'text-purple-400 bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div key={link.name} className="relative flex flex-col justify-center h-full">
              <Link to={link.path} className={`relative text-[13px] font-semibold transition-colors uppercase tracking-widest pb-1 flex items-center h-full ${isActive ? 'text-purple-400' : 'text-slate-300 hover:text-white'}`}>
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    className="absolute left-0 right-0 -bottom-1 h-[3px] bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </div>
          )
        })}
      </div>

      {/* Action Button - Corner */}
      <Link
        to="/your-next-step"
        className={`hidden md:flex items-center gap-1 select-none whitespace-nowrap bg-white text-black px-6 py-2.5 rounded-full font-bold text-[12px] uppercase tracking-widest transition-all duration-300 hover:scale-105 border-2 ${
          pathname === '/your-next-step' 
            ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]' 
            : 'border-transparent shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]'
        }`}
      >
        Your Next Step <ArrowUpRight className="w-4 h-4 ml-1" />
      </Link>

      {/* Mobile Hamburger Menu Button */}
      <button
        className="md:hidden text-white hover:text-purple-400 transition-colors ml-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-2xl md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] py-4' : 'max-h-0 py-0 border-transparent'}`}>
        <div className="flex flex-col px-6 gap-1">
          {links.map((link) => (
            <div key={link.name}>
              <Link
                to={link.path}
                onClick={() => !link.dropdown && setIsOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex justify-between items-center py-2 uppercase tracking-widest"
              >
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="pl-4 flex flex-col mt-2 border-l border-white/10">
                  {link.dropdown.map(sublink => (
                    <Link
                      key={sublink.name}
                      to={sublink.path}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors block py-3 uppercase tracking-widest"
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Your Next Step - Mobile Only Link */}
          <div className="mt-1 pt-3 border-t border-white/10">
            <Link
              to="/your-next-step"
              onClick={() => setIsOpen(false)}
              className={`text-sm font-bold flex items-center justify-between py-2 uppercase tracking-widest transition-colors ${
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
