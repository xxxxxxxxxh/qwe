import type { User } from '@/interfaces';
import { mongo } from '../mongodb';

export const getSubscription = async (id: string) => {
  try {
    const db = await mongo();
    const collection = db.collection('users');
    const user = (await collection.findOne({ id })) as User | null;
    if (!user) throw Error('User not found!');
    return user.subscription;
  } catch (error) {
    console.log(error);
  }
};
