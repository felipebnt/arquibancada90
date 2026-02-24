import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - List all jerseys
export async function GET() {
  try {
    const jerseys = await db.jersey.findMany({
      where: { isActive: true },
      orderBy: [
        { isFeatured: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return NextResponse.json(jerseys);
  } catch (error) {
    console.error('Error fetching jerseys:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jerseys' },
      { status: 500 }
    );
  }
}

// POST - Create new jersey
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      club,
      season,
      type,
      category,
      composition,
      technology,
      imageFront,
      imageBack,
      imageDetail,
      isFeatured,
      isActive,
    } = body;

    const jersey = await db.jersey.create({
      data: {
        name,
        club,
        season,
        type,
        category,
        composition,
        technology,
        imageFront,
        imageBack,
        imageDetail,
        isFeatured: isFeatured ?? false,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(jersey, { status: 201 });
  } catch (error) {
    console.error('Error creating jersey:', error);
    return NextResponse.json(
      { error: 'Failed to create jersey' },
      { status: 500 }
    );
  }
}
