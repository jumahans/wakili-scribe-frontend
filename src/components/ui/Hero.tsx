import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Background parallax
  const bgX = useTransform(springX, [-0.5, 0.5], ['-2%', '2%']);
  const bgY = useTransform(springY, [-0.5, 0.5], ['-2%', '2%']);
  
  // Subtle content parallax
  const contentX = useTransform(springX, [-0.5, 0.5], ['-10px', '10px']);
  const contentY = useTransform(springY, [-0.5, 0.5], ['-10px', '10px']);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ x: bgX, y: bgY, scale: 1.1 }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://businesstoday.co.ke/wp-content/uploads/2018/11/Kenya-Supreme-Court.jpg"
          alt="Kenya Supreme Court"
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ x: contentX, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-12 sm:py-20 text-center"
      >
        <div className="overflow-hidden mb-4 sm:mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] sm:leading-[1]"
          >
            TRANSFORM COURT HEARINGS INTO <span className="text-primary-red">WINNING STRATEGIES</span>
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium mb-8 md:mb-12 tracking-wide max-w-2xl mx-auto px-4"
        >
          Record. Analyze. <span className="text-primary-red italic">Win.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Link to="/signup" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 group text-base md:text-lg px-8 py-4">
            Start Free Trial
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <button className="w-full sm:w-auto btn-secondary flex items-center justify-center gap-2 text-base md:text-lg px-8 py-4">
            <Play className="w-5 h-5 fill-current" />
            Watch Demo
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-bold">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary-red to-transparent" />
      </div>
    </section>
  );
}
