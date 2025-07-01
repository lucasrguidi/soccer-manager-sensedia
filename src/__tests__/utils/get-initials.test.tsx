import { getInitials } from '@/utils/get-initials';

describe('getInitials', () => {
  it('monta iniciais de nome composto', () => {
    expect(getInitials('Ana Maria')).toBe('AM');
    expect(getInitials('Carlos Silva')).toBe('CS');
  });

  it('funciona com nome único', () => {
    expect(getInitials('Madonna')).toBe('M');
  });
});
