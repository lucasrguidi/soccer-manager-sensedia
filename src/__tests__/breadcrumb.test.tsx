// src/__tests__/breadcrumb.test.tsx

import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Breadcrumb from '@/components/breadcrumb';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Breadcrumb', () => {
  it('monta crumbs e deixa o último não clicável', () => {
    (usePathname as jest.Mock).mockReturnValue('/users/7');
    render(<Breadcrumb />);

    const link = screen.getByText('Usuários');
    expect(link.closest('a')).toBeInTheDocument();

    const profile = screen.getByText('Perfil de Usuário');
    expect(profile.closest('a')).toBeNull();
    expect(profile.nodeName).toBe('SPAN');
  });
});
