import { ALL_DAYS } from '@/constants/all-days';

export function formatWeekDays(raw: string): string {
  const days = raw
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean);

  if (days.length === ALL_DAYS.length) {
    return 'Todos os Dias';
  }

  if (days.length === 2 && days.includes('Sábado') && days.includes('Domingo')) {
    return 'Fim de Semana';
  }

  return days.join(', ');
}
