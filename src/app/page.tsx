import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/users');

  return <h1>Home</h1>;
}
