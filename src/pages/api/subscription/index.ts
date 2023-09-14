import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/interfaces';
import { getSubscription } from '@/server';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const user = session?.user as User;
    if (!user) return res.status(403).json({ msg: 'Not authorized!' });
    if (!user?.subscription) return res.status(401).json({ msg: 'You are not premium!' });
    const subscription = await getSubscription(user.id);
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).json({
      msg: 'An unexpected error has occurred!'
    });
  }
}
