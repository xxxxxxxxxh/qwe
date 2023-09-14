import type { IPassword } from '@/interfaces';
import { useCopy } from '@/hooks';
import { toast } from 'react-hot-toast';
import { AiOutlineLink } from 'react-icons/ai';
import { BiCopy, BiLock, BiUser } from 'react-icons/bi';

export const Password = ({ username, origin, password }: IPassword) => {
  const [_, copy] = useCopy();
  const onCopy = (text: string) => {
    copy(text);
    toast.success('It has been copied successfully!');
  };
  return (
    <>
      <div className="dark:bg-black bg-white border border-gray-300 dark:border-[#111] rounded-md cursor-pointer">
        <div className="text-black dark:text-white flex justify-between items-center gap-3 border-b border-gray-300 dark:border-[#111] py-3 px-3 select-none">
          <div className="font-semibold text-sm text-gray-800 dark:text-gray-400 flex items-center gap-2">
            <AiOutlineLink />
            <p
              className="max-w-[11rem] block text-ellipsis overflow-hidden whitespace-nowrap"
              onClick={() => window.open(origin)}
            >
              {origin}
            </p>
          </div>
          <span
            onClick={() => onCopy(`${username}:${password}`)}
            className="rounded-full hover:bg-gray-400 dark:hover:bg-black bg-opacity-25 p-2"
          >
            <BiCopy />
          </span>
        </div>
        <div className="py-4 px-3 text-sm">
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
