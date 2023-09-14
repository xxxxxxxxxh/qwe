import type { NextApiRequest, NextApiResponse } from 'next';
import type { Member } from '@/interfaces';
import { team } from '@/server';
import axios from 'axios';

const getUser = async (id: string): Promise<Member> => {
  try {
    const {
      data: { data }
    } = await axios.get(`https://api.lanyard.rest/v1/users/${id}`);
    return {
      id,
      username: data.discord_user.display_name,
      tag: data.discord_user.discriminator,
      avatar: data.discord_user.avatar,
      status: data.discord_status
    };
  } catch (error) {
    return {
      id,
      username: '',
      tag: '',
      avatar: null,
      status: 'offline'
    };
  }
};

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const members: Member[] = [];

  const data = await Promise.all(team.map(async (id: string) => await getUser(id)));
  data.forEach(({ id, username, tag, avatar, status }: Member) => {
    members.push({
      id,
      username,
      tag,
      avatar,
      status
    });
  });
  res.json(members);
}
