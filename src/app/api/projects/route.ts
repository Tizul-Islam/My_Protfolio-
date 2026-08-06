import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        position: 'asc',
      },
    });

    // Parse the JSON strings back into arrays for the frontend
    const formattedProjects = projects.map((p) => ({
      ...p,
      features: JSON.parse(p.features),
      tags: JSON.parse(p.tags),
    }));

    return NextResponse.json(formattedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
