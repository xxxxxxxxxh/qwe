import type { IVictim } from '@/interfaces';
import { AnimationContainer, VictimCard, VictimCardSkeleton } from '@/components';
import { fetcher } from '@/lib';
import { useEffect, useId, useState } from 'react';
import { CiGrid31, CiSearch } from 'react-icons/ci';

import useSWR from 'swr';

export const Victims = () => {
  const { data, error } = useSWR('/api/victims', fetcher);
  const victims = data ? (data as IVictim[]) : null;
  const id = useId();
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<IVictim[] | null>(victims);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setValue(value);
    if (value.length && victims) {
      const filter: IVictim[] = victims.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
      setResults(filter);
    } else {
      setResults(victims);
    }
  };

  useEffect(() => {
    if (!error && victims) setResults(victims);
  }, [error, victims]);

  return (
    <>
      <div className="py-4 px-5">
        <div className="py-3 px-5">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center w-full">
              <input
                type="text"
                className="w-full px-2 py-3 dark:bg-black bg-gray-100 border dark:border-[#111] border-gray-300 dark:text-white text-black"
                placeholder={`Search a victim...`}
                maxLength={30}
                spellCheck={false}
                autoComplete="off"
                onChange={(event) => onChange(event)}
                value={value}
              />
              <button className="bg-white hover:bg-opacity-80 border dark:border-0 border-gray-300 text-black cursor-pointer p-[15px] select-none">
                <CiSearch className="text-lg" />
              </button>
            </div>
            <button className="dark:bg-black bg-white border dark:border-[#111] border-gray-300 p-[15px] text-gray-400 hover:text-black hover:border-black dark:hover:border-white dark:hover:text-white cursor-pointer select-none">
              <CiGrid31 className="text-lg" />
            </button>
          </div>
        </div>
        <div className="py-3 px-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 base:grid-cols-3 gap-[1rem] lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
          {!results || error ? (
            <>
              {Array.from({ length: 3 }).map(() => (
                <VictimCardSkeleton key={id} />
              ))}
            </>
          ) : (
            results.map((data: IVictim) => (
              <AnimationContainer key={id}>
                <VictimCard {...data} />
              </AnimationContainer>
            ))
          )}
        </div>
      </div>
    </>
  );
};
