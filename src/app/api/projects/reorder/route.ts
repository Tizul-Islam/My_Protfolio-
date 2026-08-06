import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    
    // Expecting body to be an array of objects with id and position
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Run the updates in a transaction
    const updatePromises = body.map((item: { id: string; position: number }) => {
      return prisma.project.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    });

    await prisma.$transaction(updatePromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering projects:', error);
    return NextResponse.json({ error: 'Failed to reorder projects' }, { status: 500 });
  }
}
