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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, features, tags, liveUrl, githubUrl, image } = body;

    if (!title || !description || !liveUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the maximum position to place the new project at the end
    const lastProject = await prisma.project.findFirst({
      orderBy: { position: 'desc' },
    });
    const newPosition = lastProject ? lastProject.position + 1 : 1;

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        features: JSON.stringify(features || []),
        tags: JSON.stringify(tags || []),
        liveUrl,
        githubUrl,
        image,
        position: newPosition,
      },
    });

    return NextResponse.json({
      ...newProject,
      features: JSON.parse(newProject.features),
      tags: JSON.parse(newProject.tags),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
