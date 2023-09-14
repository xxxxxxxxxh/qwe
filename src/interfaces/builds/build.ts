import type { User } from '@/interfaces';

export interface Build {
  id: string;
  name: string;
  icon: string;
  description?: string;
  owner: User;
  victims: number;
  webhook?: string;
  metadata: {
    status: boolean;
  };
  created_at: Date;
}
