import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserDropdown } from '@/components/user-dropdown';
import * as svc from '@/services/get-current-user';

jest.mock('@/services/get-current-user', () => ({
  getCurrentUser: jest.fn(),
}));

describe('UserDropdown', () => {
  it('renderiza as iniciais do usuário', async () => {
    (svc.getCurrentUser as jest.Mock).mockResolvedValue({
      name: 'Carlos Silva',
      email: 'c@ex.com',
    });

    let dropdownJSX: React.ReactElement;
    await act(async () => {
      dropdownJSX = await UserDropdown();
    });

    render(dropdownJSX!);

    expect(svc.getCurrentUser).toHaveBeenCalled();
    expect(screen.getByText('CS')).toBeInTheDocument();
  });
});
