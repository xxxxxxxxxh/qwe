import type { Product, User } from '@/interfaces';
import dayjs from 'dayjs';
import axios from 'axios';

const DEFAULT_WEBHOOK_ICON: Readonly<string> =
  'https://cdn.discordapp.com/icons/1110914544974450788/9a8e91e8c3de3e2d0ea6463048043f23.png';
const WEBHOOK_LOGS: string = process.env.WEBHOOK_LOGS || '';

const getExpireDate = (data: Product[]) => {
  let date = dayjs();
  let lifetime: boolean = false;

  data.forEach(({ name }) => {
    if (name.toLowerCase().includes('monthly')) date = date.add(1, 'month');
    if (name.toLowerCase().includes('annual')) date = date.add(1, 'year');
    if (name.toLowerCase().includes('lifetime')) lifetime = true;
  });

  const month = date.month() + 1;
  const year = date.year();
  const day = date.date();
  const expire = dayjs(`${year}-${month}-${day}`);

  return {
    expire: expire.toISOString(),
    lifetime
  };
};

const createPlan = (data: Product[]) => {
  let subscription: string = '';
  let amount: number = 0;
  data.map(({ price }) => {
    amount += Math.round(price);
    if (getExpireDate(data).lifetime) return (subscription = `Plan Lifetime - $${amount} USD`);

    const date = dayjs(getExpireDate(data).expire);
    const month = date.month() + 1 - (dayjs().month() + 1);
    const year = date.year() - dayjs().year();
    let duration = year <= 0 ? `${month} months` : `${year} years`;
    subscription = `Plan ${duration} - $${amount} USD`;
  });
  return subscription;
};

const formatDate = (items: Product[]) => {
  if (getExpireDate(items).lifetime) return 'Never';

  const expire = dayjs(getExpireDate(items).expire);
  const day = expire.date();
  const month = expire.month() + 1;
  const year = expire.year();

  return `${day}/${month}/${year}`;
};

interface LoggerProps {
  items: Product[];
  user: User;
}

export const logger = async ({ items, user }: LoggerProps) => {
  try {
    let date = formatDate(items);

    await axios.post(WEBHOOK_LOGS, {
      embeds: [
        {
          title: 'Payment Completed',
          url: `https://hesychia.live/u/${user.id}`,
          color: 0,
          thumbnail: {
            url: user?.image_url || DEFAULT_WEBHOOK_ICON
          },
          fields: [
            {
              inline: true,
              name: 'Customer',
              value: `[\`${user.username}\`](https://discord.com/channels/@me/${user.id})`
            },
            {
              inline: true,
              name: 'Expire',
              value: `\`${date}\``
            },
            {
              inline: false,
              name: 'Subscription',
              value: `**\`\`\`${createPlan(items)}\`\`\`**`
            }
          ],
          footer: {
            text: `lovver ; ${new Date().toLocaleDateString()}`
          }
        }
      ],
      username: `Lovver | Payments`,
      avatar_url: DEFAULT_WEBHOOK_ICON
    });
  } catch (error) {
    console.log(error);
  }
};
