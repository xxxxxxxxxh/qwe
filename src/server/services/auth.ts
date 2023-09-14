import type { User } from '@/interfaces';
import { mongo } from '@/server';
import { support, team } from '@/server';
import axios from 'axios';

const joinServer = async (access_token: string, id: string) => {
  try {
    await axios.put(
      `https://discord.com/api/guilds/${support}/members/${id}`,
      { access_token },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${process.env.BOT_TOKEN!}`
        }
      }
    );
  } catch (error: any) {
    throw Error(error);
  }
};

export const logoutUser = async () => {
  const response = await axios.get('/api/auth/csrf');
  await axios.post('/api/auth/signout', {
    csrfToken: response.data.csrfToken
  });
};

export const registerUser = async (user: User | undefined) => {
  try {
    if (!user) throw Error('Error user!');
    const { id, username, discriminator, image_url, banner, accessToken } = user;
    const db = await mongo();
    const collection = db.collection('users');
    const userFind = await collection.findOne({ id });
    await joinServer(accessToken, id);

    if (!userFind)
      return await collection.insertOne({
        id,
        username,
        discriminator,
        image_url,
        banner,
        bio: 'no bio',
        isAdmin: team.includes(id),
        isBan: false,
        accessToken,
        created_at: new Date()
      } as User);

    await collection.updateOne(
      { _id: userFind._id },
      {
        $set: {
          username,
          discriminator,
          image_url,
          banner,
          accessToken
        }
      }
    );

    return userFind;
  } catch (error) {
    console.log(error);
  }
};
