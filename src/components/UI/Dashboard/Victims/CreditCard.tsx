import type { ICreditCard } from '@/interfaces';
import { FcSimCardChip } from 'react-icons/fc';
import { LogoCustom } from '@/components';
import styles from '@/styles/creditcard.module.css';

export const CreditCardSkeleton = () => (
  <>
    <div className="w-full lg:w-[320px] h-[200px]">
      <div className="w-full h-full transition-all">
        <div className={`${styles.card}  bg-gray-50 dark:bg-[#020202] border dark:border-[#111] border-gray-300`}>
          <div className="flex justify-between items-center relative top-[30px] px-[20px]">
            <div className="animate-pulse rounded-lg w-[3rem] h-[1.5rem] bg-black/10 dark:bg-white/10" />
            <div className="logo">
              <div className="animate-pulse rounded-full w-[2rem] h-[2rem] bg-black/10 dark:bg-white/10" />
            </div>
          </div>
          <div className={`${styles.card_number} font-mono`}>
            <div className="animate-pulse rounded-lg w-[3rem] h-[2rem] bg-black/10 dark:bg-white/10"></div>
            <div className="animate-pulse rounded-lg w-[3rem] h-[2rem] bg-black/10 dark:bg-white/10"></div>
            <div className="animate-pulse rounded-lg w-[3rem] h-[2rem] bg-black/10 dark:bg-white/10"></div>
            <div className="animate-pulse rounded-lg w-[3rem] h-[2rem] bg-black/10 dark:bg-white/10"></div>
          </div>
          <div className="px-[25px] py-2">
            <div className="animate-pulse rounded-lg w-full h-[1rem] bg-black/10 dark:bg-white/10"></div>
          </div>
          <div className="px-[25px] py-2">
            <div className="animate-pulse rounded-lg w-12 h-[1rem] bg-black/10 dark:bg-white/10"></div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export const CreditCard = ({ number, expires, name }: ICreditCard) => {
  return (
    <div className="w-full lg:w-[320px] h-auto">
      <div className="w-full h-full transition-all">
        <div className={`${styles.card} bg-gray-50 dark:bg-[#020202] border dark:border-[#111] border-gray-300`}>
          <div className="flex justify-between items-center relative top-[30px] px-[20px]">
            <FcSimCardChip className="text-3xl" />
            <div className="logo">
              <LogoCustom />
            </div>
          </div>
          <div className={`${styles.card_number} font-mono`}>
            {number.match(/\d{4}/g)!.map((group: string, index: number) => (
              <div className="text-black dark:text-white" key={index}>
                {group}
              </div>
            ))}
          </div>
          <h1 className="font-mono px-[25px] mb-[10px] text-md dark:text-white text-black">{name}</h1>
          <div className="pb-3 px-[25px] grid grid-cols-2 gap-[1rem] w-full">
            <div className="font-mono">
              <h3 className="uppercase font-semibold text-gray-800 dark:text-gray-400 text-xs">Exp. Date</h3>
              <p className="font-base text-sm dark:text-white text-black">{expires}</p>
            </div>

            <div className="font-mono">
              <h3 className="uppercase font-semibold text-gray-800 dark:text-gray-400 text-xs">CCV</h3>
              <p className="font-base text-sm dark:text-white text-black">
                {Math.floor(Math.random() * (999 - 100 + 1)) + 100}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
