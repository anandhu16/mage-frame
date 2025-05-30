import { NextResponse } from 'next/server';
import { tasks } from '@/utils/constants/dev.constants';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const task = tasks.find(t => t.id === parseInt(params.id));

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  return NextResponse.json(task);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(params.id));

  if (taskIndex === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...body,
    updatedAt: new Date(),
  };

  tasks[taskIndex] = updatedTask;
  return NextResponse.json(updatedTask);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(params.id));

  if (taskIndex === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  tasks.splice(taskIndex, 1);
  return NextResponse.json({ message: 'Task deleted successfully' });
}