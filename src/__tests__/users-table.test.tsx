import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import { usersTableColumns } from '@/app/users/_components/users-table-columns';
import { UsersTable } from '@/app/users/_components/users-table';
import { UserListData } from '@/types/user-list-data';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));

describe('UsersTable', () => {
  const mockData: UserListData[] = [
    {
      id: '1',
      username: 'alice',
      name: 'Alice',
      email: 'alice@example.com',
      city: 'C1',
      posts: 2,
      albums: 1,
      weekDays: 'Segunda,Terça',
    },
    {
      id: '2',
      username: 'bob',
      name: 'Bob',
      email: 'bob@example.com',
      city: 'C2',
      posts: 0,
      albums: 3,
      weekDays: 'Quarta',
    },
  ];
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it('renderiza apenas os headers textuais', () => {
    render(<UsersTable columns={usersTableColumns} data={mockData} />);
    usersTableColumns
      .filter((col) => typeof col.header === 'string')
      .forEach((col) => {
        expect(screen.getByText(col.header as string)).toBeInTheDocument();
      });
  });

  it('exibe as linhas e total corretamente', async () => {
    render(<UsersTable columns={usersTableColumns} data={mockData} />);
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeVisible();
      expect(screen.getByText('Bob')).toBeVisible();
      expect(screen.getByText(/Total 2/i)).toBeInTheDocument();
    });
  });

  it('filtra nomes via SearchInput', async () => {
    render(<UsersTable columns={usersTableColumns} data={mockData} />);
    const input = screen.getByLabelText('Procurar');
    fireEvent.change(input, { target: { value: 'Bob' } });
    await waitFor(() => {
      expect(screen.queryByText('Alice')).toBeNull();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('navega ao clicar na linha', async () => {
    render(<UsersTable columns={usersTableColumns} data={mockData} />);
    fireEvent.click(await screen.findByText('Alice'));
    expect(push).toHaveBeenCalledWith('/users/1');
  });
});
