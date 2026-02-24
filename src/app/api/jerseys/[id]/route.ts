import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET - Get single jersey
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jersey = await db.jersey.findUnique({
      where: { id },
    });

    if (!jersey) {
      return NextResponse.json(
        { error: 'Jersey not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(jersey);
  } catch (error) {
    console.error('Error fetching jersey:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jersey' },
      { status: 500 }
    );
  }
}

// PUT - Update jersey
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const jersey = await db.jersey.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(jersey);
  } catch (error) {
    console.error('Error updating jersey:', error);
    return NextResponse.json(
      { error: 'Failed to update jersey' },
      { status: 500 }
    );
  }
}

// DELETE - Delete jersey
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.jersey.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting jersey:', error);
    return NextResponse.json(
      { error: 'Failed to delete jersey' },
      { status: 500 }
    );
  }
}
