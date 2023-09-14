import type { IBadge } from '@/interfaces';

export interface IPremium {
  actual: IBadge | undefined;
  time: Date | undefined;
  next_up: IBadge | undefined;
  next_date: Date | undefined;
}
