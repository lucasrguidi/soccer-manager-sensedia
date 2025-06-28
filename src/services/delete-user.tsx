export async function deleteUser(userId: string): Promise<{ response: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar usuário');
  }

  const data = await response.json();

  return data;
}
