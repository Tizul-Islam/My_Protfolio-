import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });

    const body = await req.json();
    const { title, description, features, tags, liveUrl, githubUrl, image } = body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        features: features ? JSON.stringify(features) : undefined,
        tags: tags ? JSON.stringify(tags) : undefined,
        liveUrl,
        githubUrl,
        image,
      },
    });

    return NextResponse.json({
      ...updatedProject,
      features: JSON.parse(updatedProject.features),
      tags: JSON.parse(updatedProject.tags),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
