'use server';

import { CreateUserParams } from '@/types/create-user-params';
import { User } from '@/types/user';
import { faker } from '@faker-js/faker';
import { revalidatePath } from 'next/cache';

export async function createUserAction(values: CreateUserParams): Promise<User | null> {
  const body = JSON.stringify({
    email: values.email,
    name: values.name,
    password: faker.internet.password(),
  });

  const res = await fetch(`${process.env.API_URL}/users/create`, {
    method: 'POST',
    body,
  });

  if (!res.ok) {
    throw new Error('Falha ao criar usuário');
  }

  const newUser: User = await res.json();

  revalidatePath('/users');

  return newUser;
}
