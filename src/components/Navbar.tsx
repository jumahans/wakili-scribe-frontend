import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scale, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-black/90 dark:bg-zinc-950/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Scale className="w-8 h-8 text-primary-red transition-transform group-hover:rotate-12" />
          <span className="text-2xl font-extrabold tracking-tighter text-white">
            WAKILI <span className="text-primary-red">SCRIBE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary-red',
                location.pathname === link.path ? 'text-primary-red' : 'text-gray-300'
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <Link to="/signup" className="btn-primary text-sm py-2">
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay for content behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-md md:hidden"
            />
            
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-2xl flex flex-col p-8 md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                  <Scale className="w-8 h-8 text-primary-red" />
                  <span className="text-2xl font-extrabold tracking-tighter text-white">
                    WAKILI <span className="text-primary-red">SCRIBE</span>
                  </span>
                </Link>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white p-4 bg-primary-red rounded-full hover:bg-red-600 active:scale-90 transition-all shadow-xl shadow-primary-red/40 border-2 border-white/20"
                  aria-label="Close menu"
                >
                  <X className="w-10 h-10" strokeWidth={3} />
                </button>
              </div>
            
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-4xl font-black tracking-tighter uppercase transition-colors',
                      location.pathname === link.path ? 'text-primary-red' : 'text-white hover:text-primary-red'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-white/10">
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full text-center text-xl py-5 block"
              >
                Get Started
              </Link>
              <div className="mt-8 text-center text-gray-500 text-sm">
                Trusted by 500+ Kenyan Advocates
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </nav>
  );
}
