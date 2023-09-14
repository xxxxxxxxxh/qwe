import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getPasswords, mongo } from '@/server';
import type { User } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let { id } = req.query as { id?: string };
    const session = await getSession({ req });
    const user = session?.user as User | undefined;
    if (!user) throw Error('User is not logged in.');
    if (!user?.subscription?.key && !user.isAdmin)
      throw Error('You do not have a paid membership to perform this action!');
    if (!id || id.length < 3) throw Error('This ID is invalid!');
    const db = await mongo();
    const passwords = await getPasswords(db, user.id, id);

    res.status(200).json(passwords);
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
