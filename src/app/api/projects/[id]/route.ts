import { NextResponse } from 'next/server';
import { projects } from '@/utils/constants/dev.constants';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const project = projects.find(p => p.id === parseInt(params.id));

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const projectIndex = projects.findIndex(p => p.id === parseInt(params.id));

  if (projectIndex === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const updatedProject = {
    ...projects[projectIndex],
    ...body,
    meta: {
      ...projects[projectIndex].meta,
      updatedAt: new Date(),
    },
  };

  projects[projectIndex] = updatedProject;
  return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const projectIndex = projects.findIndex(p => p.id === parseInt(params.id));

  if (projectIndex === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  projects.splice(projectIndex, 1);
  return NextResponse.json({ message: 'Project deleted successfully' });
}