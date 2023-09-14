import type { IVictim } from '@/interfaces';
import Link from 'next/link';
import Image from 'next/image';

export const VictimCardSkeleton = () => (
  <>
    <div className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-[#202020] w-full h-full rounded-md py-[15px]">
      <div className="p-[20px] mb-[1rem] border-b border-gray-300 dark:border-[#202020]">
        <div className="animate-pulse rounded-full w-[60px] h-[60px] bg-black/10 dark:bg-white/10 mx-auto" />
        <div className="my-2 animate-pulse rounded-lg w-[3rem] h-4 bg-black/10 dark:bg-white/10 mx-auto"></div>
        <div className="animate-pulse rounded-lg w-[4rem] h-4 bg-black/10 dark:bg-white/10 mx-auto"></div>
      </div>
      <div className="flex justify-between px-3">
        <div className="animate-pulse rounded-lg w-[4rem] h-6 bg-black/10 dark:bg-white/10"></div>
        <div className="animate-pulse rounded-lg w-[5rem] h-6 bg-black/10 dark:bg-white/10"></div>
      </div>
    </div>
  </>
);

export const VictimCard = ({ id, name, location, ip, icon, price, rarity, badges }: IVictim) => {
  return (
    <>
      <Link href={`/@me/victims/${id}?index=0`} key={id}>
        <div className="bg-gray-50 hover:bg-gray-100 dark:bg-black dark:hover:bg-[#111] border border-gray-300 dark:border-[#202020] w-full h-full rounded-md cursor-pointer py-[15px]">
          <div className="flex justify-end">
            <div className="flex flex-1"></div>
            {badges && badges?.length > 0 && (
              <div className="flex items-center p-[5px] gap-[3px] mt-[-10px] h-[20px] dark:bg-[#161616] bg-gray-200 border dark:border-[#1f1f1f] rounded-sm mx-[5px]">
                {badges.map(({ name, icon }, index: number) => (
                  <Image
                    key={index}
                    src={`https://cdn.discordapp.com/badge-icons/${icon}.png`}
                    alt={name}
                    width={24}
                    height={24}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="p-[20px] mb-[1rem] border-b dark:border-[#202020] border-gray-300">
            <Image src={icon} alt={`${name} - Icon`} width={60} height={60} className="rounded-full mx-auto" />
            <div className="flex justify-center relative -top-3 left-5 -mb-3">
              <span className="h-[20px] w-[20px] block rounded-full bg-[#333] border-[3px] border-gray-50 dark:border-[#111]">
                <Image
                  alt={`${location.country} - Lovver`}
                  src={`https://flagsapi.com/${location.code}/flat/64.png`}
                  className="rounded-full object-none"
                  width={30}
                  height={30}
                  draggable={false}
                />
              </span>
            </div>
            <h1 className="text-center px-[5px] pt-[5px] font-semibold">{name}</h1>
            <p className="text-center text-xs">
              {location.country} ({ip})
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[1rem] w-full text-center">
            <div className="relative">
              <h3 className="uppercase font-semibold text-gray-400 text-xs">Price</h3>
              <p className="font-semibold text-sm">{price < 1 ? 'Free' : `$${price}.00`}</p>
            </div>
            <div className="relative">
              <h3 className="uppercase font-semibold text-gray-400 text-xs">Rarity</h3>
              <p className="font-semibold text-sm capitalize">{rarity}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
