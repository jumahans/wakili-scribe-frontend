import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
export default function About() {
  return (
    <div className="bg-black text-white">
        <Navbar />
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-40 pb-12 md:pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://picsum.photos/seed/nairobi/1920/1080?grayscale" 
            alt="Nairobi Skyline" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-8 uppercase leading-tight"
          >
            Built for <span className="text-primary-red">Kenyan Lawyers</span>, By Kenyan Lawyers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-2xl text-gray-400 leading-relaxed px-4"
          >
            Wakili Scribe was born in the heat of Nairobi courtrooms. We saw brilliant advocates struggling with manual note-taking while opponents used technology. Now every lawyer can have an edge.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-32 px-6 bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter mb-4 sm:mb-8 uppercase leading-tight">
              Our <span className="text-primary-red">Mission</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6 sm:mb-8">
              To level the playing field in Kenyan courts. Every advocate deserves access to cutting-edge legal technology, not just the biggest firms. We believe that justice is served best when lawyers can focus on strategy and advocacy, not administrative burdens.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-8">
              <div className="p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                <div className="text-2xl md:text-3xl font-black text-primary-red mb-1 md:mb-2">500+</div>
                <div className="text-[10px] md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kenyan Lawyers</div>
              </div>
              <div className="p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                <div className="text-2xl md:text-3xl font-black text-primary-red mb-1 md:mb-2">98%</div>
                <div className="text-[10px] md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Case Success</div>
              </div>
              <div className="p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
                <div className="text-2xl md:text-3xl font-black text-primary-red mb-1 md:mb-2">24/7</div>
                <div className="text-[10px] md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nairobi Support</div>
              </div>
            </div>
          </div>
          <div className="relative order-1 md:order-2">
            <div className="absolute -inset-4 bg-primary-red rounded-card blur-2xl opacity-20 animate-pulse" />
            <img 
              src="https://picsum.photos/seed/justice/800/1000" 
              alt="Justice Scale" 
              className="relative rounded-card shadow-2xl w-full object-cover aspect-[4/5] sm:aspect-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-32 px-6 bg-gray-50 dark:bg-zinc-900 text-black dark:text-white transition-colors duration-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-6 sm:mb-12 uppercase leading-tight">The Wakili Scribe Story</h2>
          <div className="space-y-4 md:space-y-8 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-left px-2">
            <p>
              It started in 2023, during a particularly grueling commercial litigation at the Milimani Law Courts. Our founders, a team of advocates and software engineers, realized that the bottleneck in Kenyan litigation wasn't legal knowledge—it was information management.
            </p>
            <p>
              Advocates were spending 70% of their time scribbling notes, missing critical witness contradictions, and spending nights manually drafting proceedings. We decided to change that.
            </p>
            <p>
              Today, Wakili Scribe is the leading AI courtroom intelligence platform in East Africa, helping advocates from Mombasa to Kisumu win more cases through superior data and instant documentation.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
