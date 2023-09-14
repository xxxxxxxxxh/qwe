import type { ISubscription } from '@/interfaces';

export interface User {
  id: string;
  username: string;
  discriminator: string;
  image_url?: string;
  banner?: string;
  bio?: string;
  isBan: boolean;
  isAdmin: boolean;
  subscription?: ISubscription;
  accessToken: string;
  created_at: Date;
}
