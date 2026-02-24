'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Loader2, Send } from 'lucide-react';

interface WaitlistCTAProps {
  variant?: 'full' | 'compact';
  onSubmit?: (email: string) => Promise<void>;
}

export function WaitlistCTA({ variant = 'full', onSubmit }: WaitlistCTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      if (onSubmit) {
        await onSubmit(email);
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00FF9C]/50"
          disabled={status === 'loading' || status === 'success'}
        />
        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success' || !email}
          className="bg-[#00FF9C] text-[#0F1115] hover:bg-[#00FF9C]/90 min-w-[100px]"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : status === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            'Entrar'
          )}
        </Button>
      </form>
    );
  }

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0c0f]" />
      
      {/* Ambient Light */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00FF9C]/5 blur-[100px] rounded-full" />
      </div>

      {/* Blueprint Grid */}
      <div className="absolute inset-0 blueprint-lines opacity-20" />

      {/* Floating Jerseys Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <svg viewBox="0 0 200 240" className="w-20 h-24 text-white/10" fill="currentColor">
              <path d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Seja o primeiro a saber sobre{' '}
            <span className="text-[#00FF9C]">novas camisas.</span>
          </h2>

          <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto">
            Entre na lista de espera e receba atualizações exclusivas sobre lançamentos e novidades.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 sm:h-14 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00FF9C]/50 text-base"
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <Button
                type="submit"
                disabled={status === 'loading' || status === 'success' || !email}
                className="h-12 sm:h-14 px-8 bg-[#00FF9C] text-[#0F1115] hover:bg-[#00FF9C]/90 font-semibold neon-glow transition-all duration-300 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === 'success' ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Inscrito!
                  </>
                ) : (
                  <>
                    Entrar na Lista
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
            
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-[#00FF9C] text-sm"
              >
                ✓ Você está na lista! Enviaremos novidades em breve.
              </motion.p>
            )}
            
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-400 text-sm"
              >
                Ocorreu um erro. Tente novamente.
              </motion.p>
            )}
          </form>

          {/* Trust Indicators */}
          <div className="mt-10 flex items-center justify-center gap-6 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00FF9C]" />
              <span>Sem spam</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00FF9C]" />
              <span>Conteúdo exclusivo</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#00FF9C]" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
