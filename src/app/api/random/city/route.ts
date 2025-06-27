import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedParam = searchParams.get('seed');
  if (seedParam) faker.seed(parseInt(seedParam, 10));

  const city = faker.location.city();
  return NextResponse.json({ city });
}
