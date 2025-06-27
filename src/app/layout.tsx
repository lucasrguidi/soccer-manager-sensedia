import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import TopBar from '@/components/top-bar';
import UserSummary from '@/components/user-summary';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Soccer Manager',
  description: 'Gerenciador para treinadores de futebol',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable}  antialiased`}>
        <Header />
        <TopBar />
        <UserSummary />
        {children}
      </body>
    </html>
  );
}
