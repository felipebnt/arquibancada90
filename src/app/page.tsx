'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/arquibancada/Header';
import { Hero } from '@/components/arquibancada/Hero';
import { JerseyShowcase } from '@/components/arquibancada/JerseyShowcase';
import { MaterialDetail } from '@/components/arquibancada/MaterialDetail';
import { WaitlistCTA } from '@/components/arquibancada/WaitlistCTA';
import { Footer } from '@/components/arquibancada/Footer';
import { ProductDetail } from '@/components/arquibancada/ProductDetail';

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
  isActive?: boolean;
}

// Fallback sample data for when API fails
const fallbackJerseys: Jersey[] = [
  {
    id: '1',
    name: 'Camisa Home 2026',
    club: 'Flamengo',
    season: '2026',
    type: 'Home',
    category: 'Times Nacionais',
    composition: '100% Poliéster Reciclado',
    technology: 'Aeroready',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '2',
    name: 'Camisa Home 2025/26',
    club: 'Real Madrid',
    season: '2025/26',
    type: 'Home',
    category: 'Times Europeus',
    composition: '100% Poliéster Reciclado',
    technology: 'Aeroready',
    isFeatured: true,
    isActive: true,
  },
  {
    id: '3',
    name: 'Camisa Home 2025/26',
    club: 'Barcelona',
    season: '2025/26',
    type: 'Home',
    category: 'Times Europeus',
    composition: '100% Poliéster Reciclado',
    technology: 'Dri-FIT',
    isFeatured: true,
    isActive: true,
  },
];

export default function Home() {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [selectedJersey, setSelectedJersey] = useState<Jersey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fetch jerseys
  const fetchJerseys = useCallback(async () => {
    try {
      const response = await fetch('/api/jerseys');
      if (!response.ok) {
        throw new Error('Failed to fetch jerseys');
      }
      const data = await response.json();
      setJerseys(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching jerseys:', error);
      // Use fallback data on error
      setJerseys(fallbackJerseys);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Seed database on first load if empty
  const seedDatabase = useCallback(async () => {
    try {
      const response = await fetch('/api/seed');
      if (!response.ok) {
        console.warn('Seed API returned non-OK status');
      }
    } catch (error) {
      console.error('Error seeding database:', error);
    }
    // Always try to fetch jerseys, even if seed fails
    fetchJerseys();
  }, [fetchJerseys]);

  useEffect(() => {
    seedDatabase();
  }, [seedDatabase]);

  // Handle waitlist submission
  const handleWaitlistSubmit = async (email: string) => {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to join waitlist');
  };

  // Navigation handlers
  const handleNavigate = (section: 'home' | 'collection' | 'about') => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get Real Madrid jersey for hero (azul oficial)
  const heroJersey = jerseys.find(j => j.club === 'Real Madrid' && j.type === 'Third');

  return (
    <div className="min-h-screen bg-[#0F1115] flex flex-col">
      {/* Header */}
      <Header
        onWaitlistClick={() => {
          const element = document.getElementById('waitlist');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleNavigate('collection')}
          heroImage={heroJersey?.imageFront}
        />

        {/* Jersey Showcase */}
        <section id="collection">
          {isLoading ? (
            <div className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                {/* Loading skeleton */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] rounded-lg bg-white/5 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <JerseyShowcase
              jerseys={jerseys}
              onJerseyClick={setSelectedJersey}
            />
          )}
        </section>

        {/* Material Detail Section */}
        <MaterialDetail imageDetail={jerseys.find(j => j.club === 'Vasco da Gama')?.imageDetail} />

        {/* About Section */}
        <section id="about" className="py-32 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00FF9C]/50" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Sobre</h2>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#00FF9C]/50" />
              </div>
              <p className="text-lg text-white/50 leading-relaxed mb-8">
                Arquibancada 90 é um mostruário digital premium dedicado às camisas de futebol mais recentes. 
                Nossa curadoria apresenta os lançamentos oficiais dos maiores clubes do Brasil e do mundo, 
                celebrando a identidade e a paixão que cada manto representa.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm text-white/30">
                <div>
                  <span className="text-2xl font-bold text-[#00FF9C]">{jerseys.length}</span>
                  <p className="mt-1">Camisas</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="text-2xl font-bold text-[#00FF9C]">
                    {new Set(jerseys.map(j => j.club)).size}
                  </span>
                  <p className="mt-1">Clubes</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="text-2xl font-bold text-[#00FF9C]">2026</span>
                  <p className="mt-1">Temporada</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <div id="waitlist">
          <WaitlistCTA onSubmit={handleWaitlistSubmit} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedJersey && (
          <ProductDetail
            jersey={selectedJersey}
            onClose={() => setSelectedJersey(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
