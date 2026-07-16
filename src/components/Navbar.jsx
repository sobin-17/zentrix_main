import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    { name: 'Career', path: '/career' },
    { name: 'Your Next Step', path: '/contact' },
  ];

  return (
    <nav
      className="relative z-50 w-full px-6 md:px-12 py-4 md:py-6 flex items-center justify-between bg-transparent"
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

      {/* Center Nav Links - Absolute Centered (Desktop) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center gap-8 border border-white/30 rounded-full px-10 py-3 bg-black/40 backdrop-blur-md">
        {links.map((link) => (
          link.dropdown ? (
            <div key={link.name} className="relative group">
              <Link to={link.path} className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors uppercase tracking-widest">
                {link.name}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-5 hidden group-hover:block">
                <div className="bg-black/80 border border-white/20 rounded-2xl py-2 w-48 shadow-2xl flex flex-col backdrop-blur-lg">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.name}
                      to={sublink.path}
                      className="px-6 py-3 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors uppercase tracking-widest"
                    >
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Link key={link.name} to={link.path} className="text-xs font-semibold text-slate-300 hover:text-white transition-colors uppercase tracking-widest">
              {link.name}
            </Link>
          )
        ))}
      </div>

      {/* Desktop CTA */}
      <Link
        to="/get-in-touch"
        className="hidden md:flex items-center gap-1.5 bg-white text-black px-6 py-2.5 rounded-full font-semibold text-[13px] hover:bg-slate-200 transition-colors"
      >
        Get In Touch <ArrowUpRight className="w-4 h-4" />
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
        <div className="flex flex-col px-6 gap-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
