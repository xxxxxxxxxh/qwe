import type { IHistory } from '@/interfaces';
import { FavIcon } from '@/components';
import { fetcher } from '@/lib';
import { useRouter } from 'next/router';
import { AiOutlineHistory } from 'react-icons/ai';
import useSWR from 'swr';

export const History = () => {
  const router = useRouter();
  const { data: history, error } = useSWR(`/api/victims/${router.query.id}/history`, fetcher);

  return (
    <>
      <div className="w-full h-full px-3 py-4">
        <div className="dark:bg-black bg-white border dark:border-[#111] border-gray-300 rounded w-full">
          <div className="flex items-center gap-3 border-b dark:border-[#111] border-gray-300 py-3 px-4">
            <AiOutlineHistory />
            <h2 className="text-[#888]">History</h2>
            <div className="block"></div>
          </div>
          {history && !error ? (
            <>
              {history.map(({ title, time, origin }: IHistory, index: number) => (
                <div
                  key={index}
                  className={`px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] flex items-center sm:justify-between justify-start sm:gap-0 gap-3 ${
                    index === history.length - 1 ? 'border-none' : 'border-b'
                  } dark:border-[#111] border-gray-300`}
                >
                  <p className="sm:text-black sm:dark:text-white text-base text-gray-600">{time}</p>
                  <div className="flex items-center justify-center gap-2 select-none">
                    <div className="w-4 h-4">
                      <FavIcon origin={origin} />
                    </div>
                    <p className="text-black dark:text-white text-base">
                      {title.length > 15 ? title.slice(0, 15).concat('...') : title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-base hidden sm:flex">{new URL(origin).host}</p>
                </div>
              ))}
            </>
          ) : (
            <p className="px-3 py-2">No data</p>
          )}
        </div>
      </div>
    </>
  );
};
