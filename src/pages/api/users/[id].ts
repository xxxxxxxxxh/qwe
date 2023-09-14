import type { User } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';
import { mongo, lookupUser } from '@/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ message: 'This id does not valid!' });
    const db = await mongo();
    const collection = db.collection('users');
    const user = (await collection.findOne({ id })) as User | null;
    if (!user || user.isBan) return res.status(404).json({ message: 'This user does not exist!' });

    let image_url = (await lookupUser(user.id))?.avatarURL() || user.image_url;
    res.status(200).json({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
      image_url,
      banner: user.banner,
      isAdmin: user.isAdmin,
      subscription: {
        key: user?.subscription?.key ? true : false
      },
      bio: user.bio
    });
  } catch (err: any) {
    res.status(500).json({
      statusCode: 500,
      message: err.message
    });
  }
}
