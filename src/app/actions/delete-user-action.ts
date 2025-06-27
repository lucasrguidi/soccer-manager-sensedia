'use server';

import { revalidatePath } from 'next/cache';

export async function deleteUserAction(userId: string) {
  const res = await fetch(`${process.env.API_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Falha ao deletar usuário');
  }

  revalidatePath('/users');
}
