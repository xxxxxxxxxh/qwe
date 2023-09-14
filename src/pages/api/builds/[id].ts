import type { User } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getBuildId, mongo } from '@/server';
import { createReadStream, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
const path = resolve(__dirname, '/', 'home', 'fifix', 'xannax');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { id } = req.query as { id?: string };
  const session = await getSession({ req });
  const user = session?.user as User | undefined;
  if (!user) throw Error('User is not logged in.');
  if (!user?.subscription?.key && !user.isAdmin)
    throw Error('You do not have a paid membership to perform this action!');
  if (!id || id.length < 3) throw Error('This ID is invalid!');
  const db = await mongo();
  const build = await getBuildId(db, id, user.id);
  if (!build) res.status(404).json({ msg: 'Build invalid!' });

  if (req.method === 'PUT') {
    try {
      const { webhook } = req.body;
      const url = /https:\/\/(canary\.|ptb\.)?discord\.com\/api\/webhooks\/[0-9]{17,19}\/([a-zA-Z0-9-_]+)/g;
      if (!webhook) return res.status(400).json({ msg: 'Invalid body!' });
      if (!url.test(webhook)) return res.status(400).json({ msg: 'Invalid webhook URL!' });
      const collection = db.collection('builds');
      await collection.findOneAndUpdate(
        { id: `${build.id}` },
        {
          $set: {
            webhook
          }
        }
      );
      return res.status(200).json({ msg: 'Webhook updated!' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'An unexpected error has occurred!' });
    }
  }
  if (req.method === 'DELETE') {
    try {
      const collection = db.collection('builds');
      await collection.findOneAndDelete({ id: `${build.id}` });
      if (!existsSync(`${path}/builds/${build.id}/${build.name}.exe`))
        return res.status(404).json({ msg: 'File not found!' });
      rmSync(`${path}/builds/${build.id}/`, { recursive: true, force: true });
      return res.json({ msg: 'File deleted!' });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ msg: 'An unexpected error has occurred!' });
    }
  } else {
    try {
      if (!existsSync(path))
        return res.status(404).json({
          statusCode: 404,
          message: 'File not found'
        });

      const file = createReadStream(`${path}/builds/${build.id}/${build.name}.exe`);
      file.on('open', () => {
        res.setHeader('Content-Disposition', `attachment; filename=${build.name}.exe`);
        res.setHeader('Content-Type', 'application/octet-stream');
        file.pipe(res);
      });
      file.on('error', () => {
        res.status(500).json({
          statusCode: 500,
          message: 'Error download!'
        });
      });
    } catch (err: any) {
      res.status(500).json({
        statusCode: 500,
        message: err.message
      });
    }
  }
}
