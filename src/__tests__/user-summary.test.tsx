import { render, screen } from '@testing-library/react';
import UserSummary from '@/components/user-summary';

describe('UserSummary', () => {
  it('renderiza todos os blocos estáticos', () => {
    render(<UserSummary />);
    expect(screen.getByText('Tipo de Quadra')).toBeInTheDocument();
    expect(screen.getByText('Nível')).toBeInTheDocument();
    expect(screen.getByText('Vitórias')).toBeInTheDocument();
  });
});
