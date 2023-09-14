import type { IPremium } from '@/interfaces';
import { BsClock } from 'react-icons/bs';
import { calculateProgress } from '@/lib';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Boost = ({ actual, next_up, next_date, time }: IPremium) => {
  const [progress, setProgress] = useState<string>('0px');
  
  useEffect(() => {
    if (time && next_date) {
      const value = calculateProgress(time, next_date);
      setProgress(value);
    }
  }, [time, next_date]);
  
  return (
    <>
      <div className="py-3 px-2 mb-3 w-full lg:w-[330px] bg-white dark:bg-black border dark:border-[#111] border-gray-300 rounded-md">
        <div className="flex items-center gap-3">
          <div className="dark:bg-black bg-gray-50 border dark:border-[#111] border-gray-300 rounded">
            {actual && (
              <Image
                src={`https://cdn.discordapp.com/badge-icons/${actual.icon}.png`}
                alt={actual.name}
                width={24}
                height={24}
              />
            )}
          </div>
          <div className="w-full">
            <div className="w-full h-2 bg-gray-100 rounded-md border dark:border-[#111] border-gray-300"></div>
            <div className="w-full flex -mt-2">
              <div
                style={{ width: progress }}
                className="relative h-2 bg-pink-500 rounded-md border dark:border-[#111] border-gray-300"
              ></div>
            </div>
          </div>
          <div className="dark:bg-black bg-gray-50 border dark:border-[#111] border-gray-300 rounded">
            {next_up && (
              <Image
                src={`https://cdn.discordapp.com/badge-icons/${next_up.icon}.png`}
                alt={next_up.name}
                width={24}
                height={24}
              />
            )}
          </div>
        </div>
      </div>
      <div className="py-3 px-2 mb-3 w-full lg:w-[330px] bg-white dark:bg-black border dark:border-[#111] border-gray-300 rounded-md">
        <div className="flex items-center gap-3">
          <div className="grid grid-cols-2 gap-[1rem] w-full">
            <div>
              <h3 className="text-center uppercase font-semibold text-gray-400 text-xs">Next Tier</h3>
              <p className="flex items-center justify-center text-xs pt-2">
                {next_up && (
                  <Image
                    src={`https://cdn.discordapp.com/badge-icons/${next_up.icon}.png`}
                    alt={next_up.name}
                    width={24}
                    height={24}
                  />
                )}
              </p>
            </div>
            <div>
              <h3 className="text-center uppercase font-semibold text-gray-400 text-xs">Next Tier Date</h3>
              <p className="flex items-center gap-2 justify-center text-xs pt-2 font-mono">
                <BsClock />
                {new Date(next_date || new Date()).toLocaleString(navigator.language || 'en')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
