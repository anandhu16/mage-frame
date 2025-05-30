import { NextResponse } from 'next/server';
import { users } from '@/utils/constants/dev.constants';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users.find(u => u.id === parseInt(params.id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const userIndex = users.findIndex(u => u.id === parseInt(params.id));

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const updatedUser = {
    ...users[userIndex],
    ...body,
  };

  users[userIndex] = updatedUser;
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userIndex = users.findIndex(u => u.id === parseInt(params.id));

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users.splice(userIndex, 1);
  return NextResponse.json({ message: 'User deleted successfully' });
}