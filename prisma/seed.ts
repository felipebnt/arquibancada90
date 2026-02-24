import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    imageFront: '/hero-jersey.png',
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

async function main() {
  console.log('🌱 Seeding database...');

  // Check if already seeded
  const existing = await prisma.jersey.count();

  if (existing > 0) {
    console.log(`✅ Database already has ${existing} jerseys. Skipping seed.`);
    return;
  }

  // Seed the database
  for (const jersey of sampleJerseys) {
    await prisma.jersey.create({ data: jersey });
    console.log(`✅ Created: ${jersey.club} - ${jersey.name}`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
