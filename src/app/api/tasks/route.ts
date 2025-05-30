import { NextResponse } from 'next/server';
import { tasks } from '@/utils/constants/dev.constants';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newTask = {
    id: tasks.length + 1,
    ...body,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}