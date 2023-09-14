import type { ISubscription } from '@/interfaces';
import { fetcher } from '@/lib';
import useSWR from 'swr';

export const Subscription = () => {
  const { data, error } = useSWR('/api/subscription', fetcher);
  const subscription: ISubscription | undefined = data;

  if (error) return null;
  if (!subscription) return null;
  if (subscription?.name === 'lifetime') return null;
  return (
    <div className="dark:bg-black bg-white border border-[#222] rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">Your current subscription</h2>
      <p className="text-sm dark:text-neutral-300 text-neutral-800">
        I remind you that your subscription expires on{' '}
        <span className="dark:text-white text-black">{new Date(subscription?.expires!).toLocaleDateString()}</span>{' '}
        remember to renew it before that happens.
      </p>
    </div>
  );
};
