import { redirect } from 'next/navigation';

export default function NotFound() {
  redirect('/users');
  return <h1>Página não encontrada</h1>;
}
