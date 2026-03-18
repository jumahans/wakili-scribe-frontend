import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, Search, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const detailedFeatures = [
  {
    id: 'recording',
    icon: <Mic className="w-6 h-6" />,
    title: "Hearing Recording",
    description: "State-of-the-art audio capture designed for the unique acoustics of Kenyan courtrooms.",
    points: ["Multi-speaker detection", "Noise cancellation", "Timestamp sync", "Cloud backup", "Offline mode support"]
  },
  {
    id: 'pdf',
    icon: <FileText className="w-6 h-6" />,
    title: "PDF Proceedings",
    description: "Generate court-ready documents that adhere to Kenyan Judiciary standards instantly.",
    points: ["KE Judiciary compliant", "1-click export", "Version history", "Custom branding", "Secure digital signatures"]
  },
  {
    id: 'analysis',
    icon: <Search className="w-6 h-6" />,
    title: "Testimony Analysis",
    description: "Deep AI analysis that uncovers hidden patterns and strengthens your legal arguments.",
    points: ["Sentiment analysis", "Key phrase extraction", "Argument scoring", "Evidence correlation", "Cross-ref with case law"]
  }
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(detailedFeatures[0].id);

  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors duration-500 min-h-screen pt-24 md:pt-40 pb-12 md:pb-24 px-6">
        <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-6 uppercase dark:text-white leading-tight"
          >
            Complete Courtroom <span className="text-primary-red">Intelligence</span>
          </motion.h1>
          <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto px-4">
            From the first tap of the recording to the final submission, Wakili Scribe is your silent partner in every hearing.
          </p>
        </div>

        {/* Tabbed Interface */}
        <div className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible justify-start md:justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 pb-4 md:pb-0 no-scrollbar px-2">
          {detailedFeatures.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={cn(
                "flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold transition-all duration-300 whitespace-nowrap text-sm sm:text-base",
                activeTab === f.id 
                  ? "bg-primary-red text-white shadow-glow scale-105" 
                  : "bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
              )}
            >
              <div className="shrink-0">{f.icon}</div>
              {f.title}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-zinc-900 rounded-card p-6 md:p-16 border border-gray-100 dark:border-zinc-800 shadow-card">
          <AnimatePresence mode="wait">
            {detailedFeatures.map((f) => f.id === activeTab && (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
              >
                <div>
                  <h2 className="text-2xl md:text-4xl font-black mb-4 sm:mb-6 tracking-tight uppercase dark:text-white leading-tight">{f.title}</h2>
                  <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 mb-6 md:mb-10 leading-relaxed">
                    {f.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {f.points.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-red shrink-0" />
                        <span className="font-semibold text-gray-700 dark:text-gray-200 text-xs sm:text-sm md:text-base">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary-red rounded-card blur-3xl opacity-10" />
                  <div className="relative bg-black rounded-card aspect-video flex items-center justify-center overflow-hidden shadow-2xl">
                    <img 
                      src={`https://picsum.photos/seed/${f.id}/800/450`} 
                      alt={f.title} 
                      className="w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary-red rounded-full flex items-center justify-center shadow-glow animate-pulse">
                        <Mic className="text-white w-10 h-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
