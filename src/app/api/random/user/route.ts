import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { User } from '@/types/user';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedParam = searchParams.get('seed');
  if (seedParam) faker.seed(parseInt(seedParam, 10));

  const user: User = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    created_at: Date.now().toString(),
    updated_at: Date.now().toString(),
  };

  return NextResponse.json({ user });
}
