import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Hero from '@/components/ui/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeDCard from '@/components/ui/ThreeDCard';
import { Mic, FileText, Search, Zap, Swords, Trophy, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: <Mic className="w-5 h-5 sm:w-8 sm:h-8" />,
    title: "Record Hearings",
    description: "Crystal-clear audio capture with automatic speaker detection and noise cancellation.",
    color: "bg-blue-500"
  },
  {
    icon: <FileText className="w-5 h-5 sm:w-8 sm:h-8" />,
    title: "Instant PDF Proceedings",
    description: "Generate professional, KE Judiciary compliant court documents in seconds.",
    color: "bg-green-500"
  },
  {
    icon: <Search className="w-5 h-5 sm:w-8 sm:h-8" />,
    title: "Analyze Testimony",
    description: "AI-powered analysis of witness statements, arguments, and evidence correlation.",
    color: "bg-purple-500"
  },
  {
    icon: <Swords className="w-5 h-5 sm:w-8 sm:h-8" />,
    title: "Cross-Examination",
    description: "Get real-time suggestions and key points to strengthen your questioning live.",
    color: "bg-orange-500"
  },
  {
    icon: <Trophy className="w-5 h-5 sm:w-8 sm:h-8" />,
    title: "Powerful Submissions",
    description: "Auto-generate compelling closing arguments based on the entire hearing history.",
    color: "bg-primary-red"
  }
];

const steps = [
  {
    number: "01",
    title: "Record the Hearing",
    description: "Simple one-tap recording with automatic speaker tagging and cloud sync."
  },
  {
    number: "02",
    title: "Get Instant Analysis",
    description: "AI processes audio and generates insights, contradictions, and summaries immediately."
  },
  {
    number: "03",
    title: "Win Your Case",
    description: "Use live insights and generated documents to dominate the courtroom and win."
  }
];

export default function Home() {
  return (
    <div className="bg-black">
        <Navbar />  
      <Hero />

      {/* Features Section */}
      <section className="py-16 md:py-32 px-6 bg-white dark:bg-zinc-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 px-4 dark:text-white leading-tight uppercase"
            >
              EVERYTHING YOU NEED TO <span className="text-primary-red">DOMINATE COURT</span>
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
              Wakili Scribe provides a complete courtroom intelligence platform designed specifically for the Kenyan legal context.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                {/* Mobile View: 3D Rectangular List Item */}
                <div className="flex sm:hidden items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-[0_4px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-none transition-all">
                  <div className={cn("p-2.5 rounded-xl text-white shadow-sm", feature.color)}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-black text-black dark:text-white uppercase tracking-tight">{feature.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>

                {/* Desktop View: Horizontal Card (Existing refined) */}
                <div className="hidden sm:flex flex-row items-center justify-between p-8 border border-primary-red/30 rounded-xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-primary-red transition-all">
                  <div className="text-left">
                    <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tight mb-2">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-primary-red">
                    <div className={cn("p-4 rounded-xl text-white shadow-glow transition-transform duration-300 group-hover:scale-110", feature.color)}>
                      {feature.icon}
                    </div>
                    <div className="flex items-center gap-3 opacity-20 group-hover:opacity-60 transition-opacity duration-300">
                      <Zap className="w-5 h-5" />
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-32 px-6 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary-red rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary-red rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase px-4">
              How <span className="text-primary-red">Wakili Scribe</span> Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="text-6xl sm:text-7xl md:text-8xl font-black text-white/5 absolute -top-6 md:-top-10 -left-2 md:-left-6 select-none">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <div className="w-12 md:w-16 h-12 md:h-16 bg-primary-red rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold mb-6 md:mb-8 shadow-glow">
                    {step.number}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                    {step.description}
                  </p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-gradient-to-r from-primary-red to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6 bg-primary-red">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white tracking-tighter mb-6 md:mb-8 uppercase leading-tight">
            Ready to gain the <span className="text-black">Advocate's Edge?</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 md:mb-12 font-medium px-4">
            Join 500+ Kenyan lawyers who are already winning more cases with Wakili Scribe.
          </p>
          <Link to="/signup" className="w-full sm:w-auto inline-block bg-black text-white px-8 md:px-10 py-4 md:py-5 rounded-button font-bold text-lg md:text-xl hover:scale-105 transition-transform shadow-2xl">
            Start Your 1 day free trial
          </Link>
          <p className="mt-6 text-white/70 text-xs sm:text-sm font-medium">No credit card required. Cancel anytime.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
