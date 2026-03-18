import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        <div className="col-span-1 sm:col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Scale className="w-8 h-8 text-primary-red" />
            <span className="text-xl md:text-2xl font-extrabold tracking-tighter">
              WAKILI <span className="text-primary-red">SCRIBE</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
            Trusted by 500+ Kenyan Advocates. Elevating courtroom performance through AI-driven intelligence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2.5 bg-white/5 rounded-full hover:bg-primary-red transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-2.5 bg-white/5 rounded-full hover:bg-primary-red transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="p-2.5 bg-white/5 rounded-full hover:bg-primary-red transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg md:mb-6">Product</h4>
          <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm">
            <li><Link to="/features" className="hover:text-primary-red transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-primary-red transition-colors">Pricing</Link></li>
            <li><Link to="/demo" className="hover:text-primary-red transition-colors">Watch Demo</Link></li>
            <li><Link to="/signup" className="hover:text-primary-red transition-colors">Free Trial</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg md:mb-6">Company</h4>
          <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-primary-red transition-colors">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-primary-red transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-primary-red transition-colors">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-primary-red transition-colors">Legal Blog</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold text-lg md:mb-6">Legal</h4>
          <ul className="space-y-3 md:space-y-4 text-gray-400 text-sm">
            <li><Link to="/privacy" className="hover:text-primary-red transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary-red transition-colors">Terms of Service</Link></li>
            <li><Link to="/security" className="hover:text-primary-red transition-colors">Security</Link></li>
            <li className="pt-4 text-xs italic text-gray-500">Nairobi, Kenya</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-[10px] md:text-xs">
        <p>© {new Date().getFullYear()} Wakili Scribe. All rights reserved. Built for Kenyan Advocates.</p>
      </div>
    </footer>
  );
}
