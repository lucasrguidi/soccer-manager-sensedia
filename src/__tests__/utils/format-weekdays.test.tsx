import { formatWeekDays } from '@/utils/format-weekdays';
import { ALL_DAYS } from '@/constants/all-days';

describe('formatWeekDays', () => {
  it('retorna Todos os Dias quando raw contém todos os dias', () => {
    const raw = ALL_DAYS.join(',');
    expect(formatWeekDays(raw)).toBe('Todos os Dias');
  });

  it('retorna Fim de Semana para sábado e domingo', () => {
    expect(formatWeekDays('Sábado,Domingo')).toBe('Fim de Semana');
  });

  it('separa outros dias com vírgula e espaço', () => {
    expect(formatWeekDays('Segunda,Quarta')).toBe('Segunda, Quarta');
  });
});
