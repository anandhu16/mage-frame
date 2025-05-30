import { NextResponse } from 'next/server';
import { projects, tasks } from '@/utils/constants/dev.constants';

// GET tasks for a specific project
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const projectId = parseInt(params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Filter tasks that belong to this project
  const projectTasks = tasks.filter(task => task.projectId === projectId);

  return NextResponse.json(projectTasks);
}