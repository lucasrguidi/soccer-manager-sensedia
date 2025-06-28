import { User } from '@/types/user';
import { UserResponse } from '@/types/user-response';
import process from 'process';

export async function getUser(userId: string): Promise<User | null> {
  const userResponse = await fetch(`${process.env.API_URL}/users/${userId}`);

  if (!userResponse.ok) {
    throw new Error('Erro ao buscar usuário');
  }

  const contentLength = userResponse.headers.get('content-length');
  if (!contentLength || parseInt(contentLength) === 0) {
    return null;
  }

  const userData: UserResponse = await userResponse.json();

  if (!userData || !userData.user) {
    return null;
  }

  const user: User = userData.user;

  return user;
}
