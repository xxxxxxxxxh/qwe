import type { IDiscord } from '@/interfaces';
import { fetcher } from '@/lib';
import { AnimationContainer } from '@/components';
import { DiscordOverview, DiscordOverviewSkeleton } from '@/components';
import { useId } from 'react';
import useSWR from 'swr';

interface Discord extends IDiscord {
  id: string;
  index: number;
}
export const Discords = () => {
  const { data, error } = useSWR('/api/victims/recent', fetcher);
  const discords = data ? data : null;
  const id = useId();

  return (
    <>
      <div className="py-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
        {!discords || error ? (
          <>
            {Array.from({ length: 3 }).map(() => (
              <DiscordOverviewSkeleton key={id} />
            ))}
          </>
        ) : (
          discords.map((data: Discord) => (
            <AnimationContainer key={id}>
              <DiscordOverview {...data} />
            </AnimationContainer>
          ))
        )}
      </div>
    </>
  );
};
