import type { NextApiRequest, NextApiResponse } from 'next';
import { createBuild, mongo } from '@/server';
import { getSession } from 'next-auth/react';
import type { User } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await getSession({ req });
      const user = session?.user as User | undefined;
      if (!user) throw Error('User is not logged in.');
      if (!user?.subscription?.key && !user.isAdmin)
        throw Error('You do not have a paid membership to perform this action!');
      const db = await mongo();
      const build = await createBuild(db, user.id, req);

      return res.status(200).json(build);
    } catch (err: any) {
      res.status(500).json({
        statusCode: 500,
        message: err.message
      });
    }
  }
}

export const config = {
  api: {
    bodyParser: false
  }
};
