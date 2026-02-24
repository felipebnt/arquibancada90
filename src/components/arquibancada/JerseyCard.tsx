'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface JerseyCardProps {
  id: string;
  name: string;
  club: string;
  season: string;
  type: string;
  price?: number;
  imageFront?: string;
  isFeatured?: boolean;
  onClick: () => void;
  index?: number;
}

export function JerseyCard({
  name,
  club,
  season,
  type,
  price,
  imageFront,
  isFeatured,
  onClick,
  index = 0,
}: JerseyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative">
        {/* Card Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-[#1a1f2e] to-[#151820] border border-white/5 group-hover:border-[#00FF9C]/20 transition-all duration-500">
          {/* Spotlight Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-[#00FF9C]/5 blur-3xl" />
          </div>
          
          {/* Jersey Image */}
          <div className="absolute inset-4 flex items-center justify-center">
            {imageFront ? (
              <motion.img
                src={imageFront}
                alt={name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  viewBox="0 0 200 240"
                  className="w-full h-full max-w-[120px] opacity-60"
                  fill="none"
                >
                  <path
                    d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z"
                    fill="url(#cardJerseyGradient)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="cardJerseyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2a3142" />
                      <stop offset="50%" stopColor="#323a4f" />
                      <stop offset="100%" stopColor="#2a3142" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
          </div>

          {/* Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00FF9C]/20 to-transparent transform rotate-45 translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
          </div>
        </div>

        {/* Info Overlay - Shows on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="glass rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm truncate">{name}</h3>
              {isFeatured && (
                <Badge className="bg-[#00FF9C]/20 text-[#00FF9C] border-[#00FF9C]/30 text-xs">
                  Destaque
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span>{club}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>{season}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs border-white/10 text-white/70">
                {type}
              </Badge>
              {price && (
                <span className="text-xs font-bold text-[#00FF9C]">
                  R$ {price.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Compact variant for lists
export function JerseyCardCompact({
  name,
  club,
  season,
  type,
  imageFront,
  onClick,
}: JerseyCardProps) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="group flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors duration-300"
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-20 rounded overflow-hidden bg-[#1a1f2e] flex-shrink-0">
        {imageFront ? (
          <img src={imageFront} alt={name} className="w-full h-full object-contain p-2" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            <svg viewBox="0 0 200 240" className="w-10 h-12" fill="currentColor">
              <path d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white truncate group-hover:text-[#00FF9C] transition-colors">
          {name}
        </h4>
        <p className="text-sm text-white/50 truncate">{club} • {season}</p>
      </div>

      {/* Badge */}
      <Badge variant="outline" className="text-xs border-white/10 text-white/60">
        {type}
      </Badge>
    </motion.div>
  );
}
