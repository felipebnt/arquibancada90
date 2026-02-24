'use client';

import { motion } from 'framer-motion';

interface MaterialDetailProps {
  imageDetail?: string;
}

export function MaterialDetail({ imageDetail }: MaterialDetailProps) {
  const technicalPoints = [
    { label: 'Tecido', value: 'Poliéster Premium', position: 'top-1/4 left-1/4' },
    { label: 'Tecnologia', value: 'Dri-FIT', position: 'top-1/3 right-1/4' },
    { label: 'Costuras', value: 'Termossoldadas', position: 'bottom-1/3 left-1/3' },
    { label: 'Escudo', value: 'Bordado 3D', position: 'bottom-1/4 right-1/3' },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F1115]" />
      <div className="absolute inset-0 blueprint-lines opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F1115] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Jersey Detail Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Spotlight */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-[#00FF9C]/10 rounded-full blur-3xl" />
            </div>

            {/* Main Image Container */}
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Technical Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
                {/* Vertical lines */}
                <line x1="100" y1="0" x2="100" y2="400" stroke="rgba(0,255,156,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(0,255,156,0.05)" strokeWidth="1" />
                <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(0,255,156,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Horizontal lines */}
                <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(0,255,156,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(0,255,156,0.05)" strokeWidth="1" />
                <line x1="0" y1="300" x2="400" y2="300" stroke="rgba(0,255,156,0.1)" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Center crosshair */}
                <circle cx="200" cy="200" r="20" stroke="rgba(0,255,156,0.3)" strokeWidth="1" fill="none" />
                <circle cx="200" cy="200" r="40" stroke="rgba(0,255,156,0.15)" strokeWidth="1" fill="none" />
              </svg>

              {/* Jersey Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                {imageDetail ? (
                  <motion.img
                    src={imageDetail}
                    alt="Detalhes do material"
                    className="w-4/5 h-4/5 object-contain"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                ) : (
                  <div className="relative w-3/4 h-3/4">
                    {/* Placeholder with detail indicators */}
                    <svg viewBox="0 0 200 240" className="w-full h-full" fill="none">
                      <defs>
                        <linearGradient id="detailJerseyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1a1f2e" />
                          <stop offset="50%" stopColor="#252b3d" />
                          <stop offset="100%" stopColor="#1a1f2e" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z"
                        fill="url(#detailJerseyGradient)"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                      />
                      
                      {/* Collar detail */}
                      <path
                        d="M70 0 C80 20 120 20 130 0"
                        fill="none"
                        stroke="rgba(0,255,156,0.5)"
                        strokeWidth="2"
                      />
                      
                      {/* Badge area */}
                      <rect x="50" y="80" width="40" height="50" stroke="rgba(0,255,156,0.3)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
                      
                      {/* Fabric texture lines */}
                      <line x1="60" y1="150" x2="140" y2="150" stroke="rgba(0,255,156,0.2)" strokeWidth="1" />
                      <line x1="60" y1="170" x2="140" y2="170" stroke="rgba(0,255,156,0.2)" strokeWidth="1" />
                      <line x1="60" y1="190" x2="140" y2="190" stroke="rgba(0,255,156,0.2)" strokeWidth="1" />
                    </svg>

                    {/* Detail Pointers */}
                    {technicalPoints.map((point, index) => (
                      <motion.div
                        key={point.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className={`absolute ${point.position} flex items-center gap-2`}
                      >
                        <div className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
                        <div className="text-xs text-white/60">
                          <span className="text-[#00FF9C]">{point.label}:</span> {point.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-1 bg-[#00FF9C] rounded-full mb-6"
              />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Tecnologia atual.
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00FF9C]">
                Identidade eterna.
              </h2>
            </div>

            <p className="text-lg text-white/50 leading-relaxed">
              Cada detalhe é pensado para oferecer o máximo em conforto e performance. 
              Tecidos de alta tecnologia encontram o design tradicional dos grandes clubes.
            </p>

            {/* Technical Specs */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Composição', value: '100% Poliéster' },
                { label: 'Tecnologia', value: 'Dri-FIT PRO' },
                { label: 'Ajuste', value: 'Athletic Fit' },
                { label: 'Origem', value: 'Oficial' },
              ].map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-lg border border-white/5 bg-white/[0.02]"
                >
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">
                    {spec.label}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {spec.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
