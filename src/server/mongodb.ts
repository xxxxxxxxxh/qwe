import { MongoClient, Db } from 'mongodb';

let cachedDb: Db | null = null;

export const mongo = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI!);

  const db = client.db('lovverx');
  cachedDb = db;
  return db;
};
