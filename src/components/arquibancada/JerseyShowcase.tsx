'use client';

import { motion } from 'framer-motion';
import { JerseyCard } from './JerseyCard';

interface Jersey {
  id: string;
  name: string;
  club: string;
  season: string;
  type: string;
  category: string;
  price?: number;
  imageFront?: string;
  isFeatured?: boolean;
}

interface JerseyShowcaseProps {
  jerseys: Jersey[];
  onJerseyClick: (jersey: Jersey) => void;
}

// SectionTitle component defined outside to avoid lint error
function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[#00FF9C] rounded-full" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-white/40 ml-4">{subtitle}</p>
    </div>
  );
}

export function JerseyShowcase({ jerseys, onJerseyClick }: JerseyShowcaseProps) {
  // Group jerseys by category
  const lancamentos = jerseys.filter(j => j.category === 'Lançamentos' || j.isFeatured);
  const nacionais = jerseys.filter(j => j.category === 'Times Nacionais');
  const europeus = jerseys.filter(j => j.category === 'Times Europeus');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Lançamentos */}
        {lancamentos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <SectionTitle 
              title="Lançamentos" 
              subtitle="As novidades mais recentes do mundo das camisas"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {lancamentos.map((jersey, index) => (
                <JerseyCard
                  key={jersey.id}
                  {...jersey}
                  index={index}
                  onClick={() => onJerseyClick(jersey)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Times Nacionais */}
        {nacionais.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <SectionTitle 
              title="Times Nacionais" 
              subtitle="Os grandes clubes do futebol brasileiro"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {nacionais.map((jersey, index) => (
                <JerseyCard
                  key={jersey.id}
                  {...jersey}
                  index={index}
                  onClick={() => onJerseyClick(jersey)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Times Europeus */}
        {europeus.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle 
              title="Times Europeus" 
              subtitle="Os gigantes do futebol europeu"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {europeus.map((jersey, index) => (
                <JerseyCard
                  key={jersey.id}
                  {...jersey}
                  index={index}
                  onClick={() => onJerseyClick(jersey)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {jerseys.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg viewBox="0 0 200 240" className="w-10 h-12 text-white/20" fill="currentColor">
                <path d="M40 60 L40 220 C40 230 50 240 60 240 L140 240 C150 240 160 230 160 220 L160 60 L180 80 L200 60 L160 20 C150 10 130 0 100 0 C70 0 50 10 40 20 L0 60 L20 80 L40 60 Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Nenhuma camisa cadastrada</h3>
            <p className="text-white/40">Novas camisas serão adicionadas em breve.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
