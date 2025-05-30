import { NextResponse } from 'next/server';
import { projects } from '@/utils/constants/dev.constants';

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newProject = {
    id: projects.length + 1,
    ...body,
    taskIds: [],
    meta: {
      createdBy: body.createdBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };

  projects.push(newProject);
  return NextResponse.json(newProject, { status: 201 });
}
