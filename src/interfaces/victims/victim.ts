import type { IBadge, Rarity } from '@/interfaces';

export interface IVictim {
  id: string;
  name: string;
  icon: string;
  location: {
    country: string;
    code: string;
  };
  ip: string;
  price: number;
  rarity: Rarity;
  badges: IBadge[] | null;
  created_at: Date;
}
