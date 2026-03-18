import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Contact() {
  return (
    <div className="bg-black text-white min-h-screen pt-24 md:pt-40 pb-12 md:pb-24 px-6">
        <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-8 uppercase leading-tight"
            >
              Get in <span className="text-primary-red">Touch</span>
            </motion.h1>
            <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-12 leading-relaxed">
              Have questions about how Wakili Scribe can transform your practice? Our team in Nairobi is ready to help.
            </p>

            <div className="space-y-4 sm:space-y-8">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary-red transition-colors shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-500 uppercase text-[10px] md:text-xs tracking-widest mb-0.5 sm:mb-1">Email Us</h4>
                  <p className="text-sm sm:text-base md:text-lg font-bold">hello@wakiliscribe.co.ke</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary-red transition-colors shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-500 uppercase text-[10px] md:text-xs tracking-widest mb-0.5 sm:mb-1">Call Us</h4>
                  <p className="text-sm sm:text-base md:text-lg font-bold">+254 700 000 000</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-primary-red transition-colors shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-500 uppercase text-[10px] md:text-xs tracking-widest mb-0.5 sm:mb-1">Visit Us</h4>
                  <p className="text-sm sm:text-base md:text-lg font-bold">Westlands Business Park, Nairobi</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-card p-6 md:p-12 transition-colors duration-500 shadow-xl"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 md:mb-8 uppercase tracking-tight">Send a Message</h2>
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-bold uppercase text-gray-400">First Name</label>
                  <input type="text" className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-button px-4 py-2 md:py-3 focus:outline-none focus:border-primary-red dark:text-white text-sm sm:text-base" />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label className="text-[10px] md:text-xs font-bold uppercase text-gray-400">Last Name</label>
                  <input type="text" className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-button px-4 py-2 md:py-3 focus:outline-none focus:border-primary-red dark:text-white text-sm sm:text-base" />
                </div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase text-gray-400">Email Address</label>
                <input type="email" className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-button px-4 py-2 md:py-3 focus:outline-none focus:border-primary-red dark:text-white text-sm sm:text-base" />
              </div>
              <div className="space-y-1 md:space-y-2">
                <label className="text-[10px] md:text-xs font-bold uppercase text-gray-400">Message</label>
                <textarea rows={4} className="w-full bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-button px-4 py-2 md:py-3 focus:outline-none focus:border-primary-red resize-none dark:text-white text-sm sm:text-base" />
              </div>
              <button className="w-full btn-primary py-3 md:py-4 flex items-center justify-center gap-2 text-base md:text-lg">
                Send Message
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
