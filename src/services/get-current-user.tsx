import { User } from '@/types/user';
import { UserResponse } from '@/types/user-response';
import process from 'process';

export async function getCurrentUser(): Promise<User> {
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/random/user?seed='11'`);

  if (!userResponse.ok) {
    throw new Error('Erro ao buscar usuário atual');
  }

  const userData: UserResponse = await userResponse.json();

  const user: User = userData.user;

  return user;
}
