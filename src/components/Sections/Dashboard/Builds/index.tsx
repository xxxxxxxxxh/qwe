import type { Build } from '@/interfaces';
import { AnimationContainer, BuildCardSkeleton, BuildCard } from '@/components';
import { fetcher } from '@/lib';
import { useId } from 'react';
import useSWR from 'swr';

export const Builds = () => {
  const { data, error } = useSWR('/api/builds', fetcher);
  const builds = data ? data : null;
  const id = useId();

  return (
    <>
      <div className="py-4 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
          {!builds || error ? (
            <>
              {Array.from({ length: 3 }).map(() => (
                <BuildCardSkeleton key={id} />
              ))}
            </>
          ) : (
            builds.map((data: Build) => (
              <AnimationContainer key={id}>
                <BuildCard {...data} />
              </AnimationContainer>
            ))
          )}
        </div>
      </div>
    </>
  );
};
