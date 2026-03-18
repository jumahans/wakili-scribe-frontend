import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const plans = [
  {
    name: "Transcription PDF",
    price: "KSh 500",
    period: "/hearing",
    description: "Perfect for getting a quick, professional transcript of your hearing.",
    features: ["Standard PDF export", "Basic speaker detection", "Email support", "Cloud storage"],
    cta: "Get Started",
    highlight: false
  },
  {
    name: "Full Hearing",
    price: "KSh 1,000",
    period: "/hearing",
    description: "The complete intelligence package for professional litigators.",
    features: ["Unlimited Analysis", "Judiciary-ready PDFs", "Live Contradiction alerts", "Priority Nairobi support", "Cross-examination AI"],
    cta: "Go Pro",
    highlight: true
  },
  {
    name: "Law Firm",
    price: "Custom",
    description: "Enterprise-grade intelligence for large legal teams.",
    features: ["Multi-user collaboration", "Firm-wide case sync", "Dedicated account manager", "Custom API access", "On-site training"],
    cta: "Contact Sales",
    highlight: false
  }
];

export default function Pricing() {
  return (
    <div className="bg-white dark:bg-zinc-950 transition-colors duration-500 pt-24 md:pt-40 pb-12 md:pb-24 px-6">
        <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-20">
          <h1 className="text-2xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-6 uppercase dark:text-white leading-tight">
            Simple, <span className="text-primary-red">Transparent</span> Pricing
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Choose the plan that fits your practice. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={plan.highlight ? "relative" : ""}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-red text-white px-4 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest z-10">
                  Most Popular
                </div>
              )}
              <div className={`h-full p-6 sm:p-8 rounded-card border-2 flex flex-col transition-colors duration-300 ${plan.highlight ? 'border-primary-red shadow-glow bg-white dark:bg-zinc-900' : 'border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50'}`}>
                <h3 className="text-xl sm:text-2xl font-black mb-2 uppercase dark:text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl sm:text-4xl font-black dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 dark:text-gray-400 font-bold text-sm sm:text-base">{plan.period}</span>}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                  {plan.description}
                </p>
                
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary-red shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 sm:py-4 rounded-button font-bold transition-all text-sm sm:text-base ${plan.highlight ? 'btn-primary' : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100'}`}>
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
