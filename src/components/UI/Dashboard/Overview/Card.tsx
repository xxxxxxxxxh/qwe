import type { IDiscord } from '@/interfaces';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export const DiscordOverviewSkeleton = () => <></>;

interface Discord extends IDiscord {
  id: string;
  index: number;
}

export const DiscordOverview = ({ id, index, username, discriminator, avatar, badges }: Discord) => {
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

  return (
    <>
      <Link href={`/@me/victims/${id}?index=${index}`} key={id}>
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
            <Image src={image} alt={`${username} - Avatar`} width={60} height={60} className="rounded-full mx-auto" />
            <h1 className="text-center px-[5px] pt-[5px] font-semibold">
              {username}
              <span className="text-gray-500">
                {discriminator && discriminator.length > 1 ? `#${discriminator}` : ''}
              </span>
            </h1>
          </div>
        </div>
      </Link>
    </>
  );
};
