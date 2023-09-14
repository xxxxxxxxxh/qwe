import type { IDiscord } from '@/interfaces';
import type { Dispatch, SetStateAction } from 'react';
import { Boost } from '@/components';
import { useEffect, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { BiCheck, BiCopy } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import { useCopy } from '@/hooks';
import axios from 'axios';
import Image from 'next/image';

type Props = {
  user: IDiscord;
  setViewer: Dispatch<SetStateAction<boolean>>;
};
export const Main = ({ user, setViewer }: Props) => {
  const { username, avatar, discriminator, badges, boost, token } = user;
  const [value, copy] = useCopy();
  const [image, setImage] = useState<string>('');
  const none: string = `https://cdn.discordapp.com/embed/avatars/${Math.round(Math.random() * 5)}.png`;

  useEffect(() => {
    const checkAvatar = async () => {
      if (avatar === null || !avatar) {
        setImage(none);
      } else {
        try {
          const response = await axios.get(avatar);
          if (response.status === 200) setImage(avatar);
          else setImage(none);
        } catch (error) {
          setImage(none);
        }
      }
    };
    checkAvatar();
  }, [avatar, none]);

  const onCopy = (text: string) => {
    copy(text);
    toast.success('It has been copied successfully!');
  };

  return (
    <>
      <div className="lg:flex py-3 w-full h-full">
        <div className="block h-full">
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-black dark:to-transparent border border-gray-300 dark:border-[#202020] lg:w-[400px] w-full h-full rounded-md py-[15px]">
            <div className="flex justify-end">
              <div className="flex flex-1"></div>
              {badges && badges?.length > 0 && (
                <div className="flex items-center p-2 gap-[3px] mt-[-10px] h-[20px] dark:bg-black bg-gray-200 border dark:border-[#1f1f1f] rounded-sm mx-[5px]">
                  {badges.map(({ name, icon }, index: number) => (
                    <Image
                      key={index}
                      className="py-0.5"
                      src={`https://cdn.discordapp.com/badge-icons/${icon}.png`}
                      alt={name}
                      width={24}
                      height={24}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="p-5">
              <Image src={image} alt={`${username} - Avatar`} width={60} height={60} className="rounded-full mx-auto" />
              <h1 className="text-center px-[5px] pt-[5px] font-semibold">
                {username}
                <span className="text-gray-500">
                  {discriminator && discriminator.length > 1 ? `#${discriminator}` : ''}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => onCopy(token)}
              className="disabled:bg-opacity-60 flex items-center gap-2 font-semibold text-sm cursor-pointer select-none rounded-md py-2 px-4 bg-white hover:bg-gray-200 border border-[#111] text-black transition duration-200"
            >
              {!value ? (
                <>
                  <BiCopy /> Copy Token
                </>
              ) : (
                <>
                  <BiCheck /> Copied
                </>
              )}
            </button>
            <button
              onClick={() => setViewer(true)}
              className="flex items-center gap-2 font-semibold text-sm cursor-pointer select-none rounded-md py-2 px-4 bg-black hover:bg-[#0a0a0a] border border-[#111] text-white transition duration-200"
            >
              <BsEye />
              View Account
            </button>
          </div>
        </div>
        <div className="lg:px-5 lg:mt-0 mt-7">{boost && <Boost {...boost} />}</div>
      </div>
    </>
  );
};
