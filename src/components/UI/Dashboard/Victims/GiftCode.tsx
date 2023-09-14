import type { IGift } from '@/interfaces';
import { GiftNitro } from '@/components';
import { useCopy } from '@/hooks';
import { toast } from 'react-hot-toast';

export const GiftCodeSkeleton = () => {
  return (
    <>
      <div className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-[#111] rounded-md w-full px-3 py-4">
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <div className="animate-pulse w-[50px] h-[50px] rounded-lg bg-black/10 dark:bg-[#0a0a0a]"></div>
          <div className="block">
            <div className="animate-pulse rounded-lg w-[5rem] h-[1rem] my-1 bg-black/10 dark:bg-white/10"></div>
            <div className="animate-pulse rounded-lg w-[3rem] h-[1rem] my-1 bg-black/10 dark:bg-white/10"></div>
          </div>
        </div>
        <div className="p-[5px] flex items-center text-gray-400 border border-gray-300 dark:border-[#111] rounded-sm">
          <div className="animate-pulse rounded-lg w-full h-[1.5rem] bg-black/10 dark:bg-white/10"></div>
        </div>
      </div>
    </>
  );
};

export const GiftCode = ({ name, code, expires }: IGift) => {
  const [_, copy] = useCopy();
  const onCopy = (text: string) => {
    copy(text);
    toast.success('It has been copied successfully!');
  };
  return (
    <>
      <div className="bg-gray-50 dark:bg-black border border-gray-300 dark:border-[#111] rounded-md w-full px-3 py-4">
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center bg-gray-300 bg-gradient-to-br from-fuchsia-400 to-purple-400">
            <GiftNitro />
          </div>
          <div className="block">
            <h2 className="font-medium">{name}</h2>
            <p className="text-white/40 font-mono text-xs">
              Expires in {new Date(expires || new Date()).toISOString()}
            </p>
          </div>
        </div>
        <div
          onClick={() => onCopy(code)}
          className="p-[5px] flex items-center text-gray-400 border border-gray-300 dark:border-[#111] rounded-sm"
        >
          <p className="font-mono text-sm px-1">{code}</p>
        </div>
      </div>
    </>
  );
};
