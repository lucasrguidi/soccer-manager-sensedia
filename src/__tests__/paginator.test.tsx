import { render, screen, fireEvent } from '@testing-library/react';
import Paginator from '@/app/users/_components/paginator';

describe('Paginator', () => {
  const onPageChange = jest.fn();
  const numbers = ['1', '2', '3', '4'];

  it('renderiza páginas e controles Anterior/Próximo', () => {
    render(
      <Paginator
        currentPage={2}
        totalPages={4}
        onPageChange={onPageChange}
        showPreviousNext={true}
      />,
    );

    const prevBtn = screen.getByRole('button', { name: /Anterior/i });
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');

    const nextEls = screen.getAllByText(/Pr.ximo/i);
    const nextButtons = nextEls
      .map((el) => el.closest('button'))
      .filter(Boolean) as HTMLButtonElement[];
    expect(nextButtons.some((btn) => btn.getAttribute('aria-disabled') === 'false')).toBe(true);

    numbers.forEach((num) => {
      expect(screen.getByText(num)).toBeInTheDocument();
    });
  });

  it('desabilita Anterior na página 1 e Próximo na última', () => {
    render(
      <Paginator
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
        showPreviousNext={true}
      />,
    );
    const prevBtn1 = screen.getByRole('button', { name: /Anterior/i });
    expect(prevBtn1).toHaveAttribute('aria-disabled', 'true');

    render(
      <Paginator
        currentPage={3}
        totalPages={3}
        onPageChange={onPageChange}
        showPreviousNext={true}
      />,
    );
    const nextElsLast = screen.getAllByText(/Pr.ximo/i);
    const nextButtonsLast = nextElsLast
      .map((el) => el.closest('button'))
      .filter(Boolean) as HTMLButtonElement[];
    expect(nextButtonsLast.some((btn) => btn.getAttribute('aria-disabled') === 'true')).toBe(true);
  });

  it('chama onPageChange ao clicar em número de página', () => {
    render(
      <Paginator
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChange}
        showPreviousNext={true}
      />,
    );
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
