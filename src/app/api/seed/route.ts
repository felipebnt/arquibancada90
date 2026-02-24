import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Sample jersey data
const sampleJerseys = [
  {
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
    name: 'Camisa Away 2026',
    club: 'Flamengo',
    season: '2026',
    type: 'Away',
    category: 'Times Nacionais',
    composition: '100% Poliéster Reciclado',
    technology: 'Aeroready',
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Camisa Home 2026',
    club: 'Corinthians',
    season: '2026',
    type: 'Home',
    category: 'Times Nacionais',
    composition: '100% Poliéster',
    technology: 'Dri-FIT',
    isFeatured: true,
    isActive: true,
  },
  {
    name: 'Camisa Home 2026',
    club: 'Palmeiras',
    season: '2026',
    type: 'Home',
    category: 'Times Nacionais',
    composition: '100% Poliéster Reciclado',
    technology: 'Aeroready',
    isFeatured: false,
    isActive: true,
  },
  {
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
    name: 'Camisa Away 2025/26',
    club: 'Real Madrid',
    season: '2025/26',
    type: 'Away',
    category: 'Times Europeus',
    composition: '100% Poliéster Reciclado',
    technology: 'Aeroready',
    isFeatured: false,
    isActive: true,
  },
  {
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
  {
    name: 'Camisa Home 2025/26',
    club: 'Manchester City',
    season: '2025/26',
    type: 'Home',
    category: 'Times Europeus',
    composition: '100% Poliéster Reciclado',
    technology: 'Dri-FIT ADV',
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Camisa Home 2025/26',
    club: 'Liverpool',
    season: '2025/26',
    type: 'Home',
    category: 'Times Europeus',
    composition: '100% Poliéster Reciclado',
    technology: 'Dri-FIT',
    isFeatured: false,
    isActive: true,
  },
  {
    name: 'Camisa Home 2026',
    club: 'São Paulo',
    season: '2026',
    type: 'Home',
    category: 'Times Nacionais',
    composition: '100% Poliéster',
    technology: 'Dry-Cell',
    isFeatured: false,
    isActive: true,
  },
];

export async function GET() {
  try {
    // Check if already seeded
    const existing = await db.jersey.count();
    
    if (existing > 0) {
      return NextResponse.json({ 
        message: 'Database already seeded',
        count: existing 
      });
    }

    // Seed the database
    const created = await Promise.all(
      sampleJerseys.map(jersey => 
        db.jersey.create({ data: jersey })
      )
    );

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      count: created.length 
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
