import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.BOT_TOKEN as string;

export const lookupUser = async (id: string) => {
  try {
    await client.login(token);
    let user = await client.users.fetch(id);
    return user || undefined;
  } catch (error) {
    console.log(error);
  }
};
