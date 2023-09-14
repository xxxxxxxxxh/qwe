import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from '@/interfaces';
import { mongo } from '@/server';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const user = session?.user as User | undefined;
    if (!user) throw Error('User is not logged in.');
    if (!user?.subscription?.key && !user.isAdmin)
      throw Error('You do not have a paid membership to perform this action!');
    const db = await mongo();
    const collection = db.collection('builds');
    const builds = ((await collection.find().toArray()) as any[]).filter(({ owner }) => owner.id === user.id);
    if (!builds || !builds.length) throw Error("You don't have any build created!");

    res.status(200).json(builds);
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
