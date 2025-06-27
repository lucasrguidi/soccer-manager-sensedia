import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { ALL_DAYS } from '@/constants/all-days';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seedParam = searchParams.get('seed');
  if (seedParam) faker.seed(parseInt(seedParam, 10));

  const allOrTwo = faker.datatype.boolean();

  let weekDays: string;
  if (!allOrTwo) {
    weekDays = faker.helpers.shuffle(ALL_DAYS).slice(0, 2).join(', ');
    return NextResponse.json({ weekDays });
  }

  weekDays = ALL_DAYS.join(', ');
  return NextResponse.json({ weekDays });
}
