'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WaitlistCTA } from './WaitlistCTA';

interface Jersey {
  id: string;
  name: string;
  club: string;
  season: string;
  type: string;
  category: string;
  price?: number;
  composition?: string;
  technology?: string;
  imageFront?: string;
  imageBack?: string;
  imageDetail?: string;
  isFeatured?: boolean;
}

interface ProductDetailProps {
  jersey: Jersey | null;
  onClose: () => void;
}

export function ProductDetail({ jersey, onClose }: ProductDetailProps) {
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!jersey) return null;

  const currentImage = currentView === 'front' ? jersey.imageFront : jersey.imageBack;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-[#0F1115] border border-white/10"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-square lg:aspect-auto bg-gradient-to-br from-[#1a1f2e] to-[#151820] overflow-hidden">
              {/* Spotlight */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00FF9C]/10 blur-3xl rounded-full" />
              </div>

              {/* Blueprint Grid */}
              <div className="absolute inset-0 blueprint-lines opacity-30" />

              {/* Jersey Image */}
              <div className="relative w-full h-full flex items-center justify-center p-12">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, rotateY: currentView === 'front' ? -90 : 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={jersey.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <svg viewBox="0 0 200 240" className="w-3/4 h-3/4 opacity-60" fill="none">
                      <defs>
                        <linearGradient id="modalJerseyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2a3142" />
                          <stop offset="50%" stopColor="#323a4f" />
                          <stop offset="100%" stopColor="#2a3142" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z"
                        fill="url(#modalJerseyGradient)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </motion.div>
              </div>

              {/* View Toggle */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('front')}
                  className={`text-xs ${currentView === 'front' ? 'text-[#00FF9C] bg-[#00FF9C]/10' : 'text-white/40'}`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Frente
                </Button>
                <div className="w-px h-4 bg-white/10" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView('back')}
                  className={`text-xs ${currentView === 'back' ? 'text-[#00FF9C] bg-[#00FF9C]/10' : 'text-white/40'}`}
                >
                  Verso
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar max-h-[50vh] lg:max-h-[90vh]">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#00FF9C]/10 text-[#00FF9C] border-[#00FF9C]/20">
                  Atual
                </Badge>
                <Badge variant="outline" className="border-white/10 text-white/60">
                  {jersey.type}
                </Badge>
                {jersey.isFeatured && (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                    Destaque
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {jersey.name}
              </h2>
              <p className="text-lg text-white/50 mb-2">
                {jersey.club} • {jersey.season}
              </p>
              {jersey.price && (
                <p className="text-2xl font-bold text-[#00FF9C] mb-6">
                  R$ {jersey.price.toFixed(2).replace('.', ',')}
                </p>
              )}

              {/* Technical Details */}
              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Detalhes Técnicos
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Composição</div>
                    <div className="text-sm text-white">{jersey.composition || '100% Poliéster'}</div>
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Tecnologia</div>
                    <div className="text-sm text-white">{jersey.technology || 'Dri-FIT'}</div>
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Temporada</div>
                    <div className="text-sm text-white">{jersey.season}</div>
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Clube</div>
                    <div className="text-sm text-white">{jersey.club}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Design atual para torcedores modernos. Esta camisa oficial combina tecnologia de ponta com a tradição do clube, oferecendo conforto e estilo tanto dentro quanto fora do estádio.
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3 mb-8">
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  className={`w-full justify-center ${isFavorite ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-white/10 text-white/60'}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Nos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>

              {/* Waitlist CTA */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-sm text-white/50 mb-3">
                  Quer ser avisado sobre novas camisas?
                </p>
                <WaitlistCTA variant="compact" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
