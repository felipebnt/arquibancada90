'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  heroImage?: string;
}

// Pre-defined particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 15, top: 20, duration: 10, delay: 0 },
  { left: 85, top: 30, duration: 9, delay: 1 },
  { left: 45, top: 60, duration: 11, delay: 2 },
  { left: 70, top: 45, duration: 8, delay: 0.5 },
  { left: 25, top: 75, duration: 12, delay: 1.5 },
  { left: 90, top: 15, duration: 9, delay: 3 },
  { left: 35, top: 40, duration: 10, delay: 2.5 },
  { left: 60, top: 80, duration: 11, delay: 4 },
  { left: 10, top: 55, duration: 8, delay: 1 },
  { left: 80, top: 65, duration: 10, delay: 3.5 },
  { left: 50, top: 25, duration: 9, delay: 0.8 },
  { left: 30, top: 90, duration: 11, delay: 2.2 },
  { left: 75, top: 10, duration: 12, delay: 5 },
  { left: 20, top: 35, duration: 8, delay: 1.8 },
  { left: 95, top: 50, duration: 10, delay: 4.5 },
  { left: 55, top: 70, duration: 9, delay: 2.8 },
  { left: 40, top: 15, duration: 11, delay: 0.3 },
  { left: 65, top: 85, duration: 10, delay: 3.2 },
  { left: 5, top: 45, duration: 12, delay: 1.2 },
  { left: 85, top: 95, duration: 9, delay: 4.8 },
];

export function Hero({ onExploreClick, heroImage }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0F1115]" />
      
      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-lines opacity-50" />
      
      {/* Dynamic Spotlight */}
      <div 
        className="absolute inset-0 spotlight transition-all duration-300"
        style={{ '--x': `${mousePosition.x}%`, '--y': `${mousePosition.y}%` } as React.CSSProperties}
      />
      
      {/* Atmospheric Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_POSITIONS.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Neon Accent Lines */}
      <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-[#00FF9C]/40 to-transparent" />
      <div className="absolute top-0 right-1/3 w-px h-48 bg-gradient-to-b from-[#00FF9C]/20 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-px h-24 bg-gradient-to-t from-[#00FF9C]/30 to-transparent" />

      {/* Content */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Collection Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
          <span className="text-sm text-white/60 tracking-wide">Edição 2026</span>
        </motion.div>

        {/* Hero Image - Floating Jersey */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mb-12"
        >
          <div className="relative w-64 h-72 sm:w-80 sm:h-96 mx-auto">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#00FF9C]/10 blur-3xl rounded-full" />
            
            {/* Jersey Image */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-full h-full"
            >
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Camisa em destaque"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative">
                    {/* Placeholder Jersey Shape */}
                    <svg
                      viewBox="0 0 200 240"
                      className="w-48 h-56 sm:w-56 sm:h-64"
                      fill="none"
                    >
                      {/* Jersey body */}
                      <path
                        d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z"
                        fill="url(#jerseyGradient)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                      />
                      {/* Collar */}
                      <path
                        d="M70 0 C80 20 120 20 130 0"
                        fill="none"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="3"
                      />
                      {/* Gradient */}
                      <defs>
                        <linearGradient id="jerseyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1a1f2e" />
                          <stop offset="50%" stopColor="#252b3d" />
                          <stop offset="100%" stopColor="#1a1f2e" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Neon accent on jersey */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-[#00FF9C]/30 rounded-lg rotate-45 opacity-50" />
                  </div>
                </div>
              )}
              
              {/* Light reflections */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">Camisas que </span>
          <span className="text-[#00FF9C] neon-text-glow">contam histórias.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10"
        >
          Descubra os lançamentos atuais em um mostruário premium.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Button
            onClick={onExploreClick}
            className="bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#00FF9C]/30 transition-all duration-300 px-8 py-6 text-base"
            variant="outline"
          >
            Explorar Coleção
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
