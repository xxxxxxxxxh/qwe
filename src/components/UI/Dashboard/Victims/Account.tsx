import type { IPassword } from '@/interfaces';
import { BiCopy, BiLock, BiUser } from 'react-icons/bi';
import { useCopy } from '@/hooks';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export const AccountSkeleton = () => (
  <>
    <div className="dark:bg-[#040404] bg-white border dark:border-[#111] border-gray-300 rounded-md">
      <div className="text-white flex items-center gap-3 border-b dark:border-[#111] border-gray-300 p-[10px] select-none">
        <div className="animate-pulse rounded-lg w-3 h-3 dark:bg-white/10 bg-black/10"></div>
      </div>
      <div className="py-4 px-2 text-sm">
        <h2 className="flex items-center gap-2 border dark:border-[#111] border-gray-300 rounded p-3">
          <div className="animate-pulse rounded-lg w-10 h-3 dark:bg-white/10 bg-black/10"></div>
        </h2>
        <h2 className="flex items-center gap-2 border dark:border-[#111] border-gray-300 rounded p-3 mt-2">
          <div className="animate-pulse rounded-lg w-6 h-3 dark:bg-white/10 bg-black/10"></div>
        </h2>
      </div>
    </div>
  </>
);

export const Account = ({ origin, username, password }: IPassword) => {
  const [_, copy] = useCopy();
  const onCopy = (text: string) => {
    copy(text);
    toast.success('It has been copied successfully!');
  };
  return (
    <>
      <div className="dark:bg-[#040404] bg-white hover:bg-gray-100 dark:hover:bg-[#0a0a0a] border border-gray-300 dark:border-[#111] rounded-md cursor-pointer">
        <div className="text-black dark:text-white flex justify-between items-center gap-3 border-b border-gray-300 dark:border-[#111] py-2 px-3 select-none">
          <Image
            src={`https://s2.googleusercontent.com/s2/favicons?domain_url=${origin}`}
            alt={origin}
            width={16}
            height={16}
            draggable={false}
          />
          <h2 className="font-semibold text-sm text-gray-800 dark:text-gray-200">{new URL(origin).hostname}</h2>
          <span
            onClick={() => onCopy(`${username}:${password}`)}
            className="rounded-full hover:bg-gray-400 dark:hover:bg-black bg-opacity-25 p-2"
          >
            <BiCopy />
          </span>
        </div>
        <div className="py-4 px-2 text-sm">
          <h2 className="flex items-center gap-2 border border-gray-300 dark:border-[#111] rounded p-3">
            <BiUser />
            {username}
          </h2>
          <h2 className="flex items-center gap-2 border border-gray-300 dark:border-[#111] rounded p-3 mt-2">
            <BiLock />
            {password}
          </h2>
        </div>
      </div>
    </>
  );
};
