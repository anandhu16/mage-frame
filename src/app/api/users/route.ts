import { NextResponse } from 'next/server';
import { users } from '@/utils/constants/dev.constants';

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newUser = {
    id: users.length + 1,
    ...body,
    createdAt: new Date(),
    projectIds: [],
  };

  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}