import type { IPremium } from '@/interfaces';

export enum Rarity {
  Normal = 'normal',
  Special = 'special',
  Rare = 'rare',
  Legendary = 'legendary'
}

export interface IServer {
  id: string;
  name: string;
  icon: string | null;
  users: number;
}

export interface IFriends {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  badges: IBadge[] | null;
}

export interface IGift {
  name: string;
  code: string;
  expires: Date;
}

export interface IBadge {
  name: string;
  icon: string;
}

export interface IDiscord {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email: string | null;
  phone: string | null;
  mfa: boolean;
  servers: IServer[] | null;
  friends: IFriends[] | null;
  gifts: IGift[] | null;
  badges: IBadge[] | null;
  boost?: IPremium;
  token: string;
  price: number;
  rarity: Rarity;
  created_at: Date;
}
