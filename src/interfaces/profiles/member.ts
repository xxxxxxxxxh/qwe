export interface Member {
  id: string;
  username: string;
  tag: string;
  avatar: string | null;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  bio?: string;
}
