import type { IBadge, IDiscord } from '@/interfaces';
import { AnimationContainer } from '@/components';
import Image from 'next/image';

export const Discord = ({ ...user }: IDiscord) => {
  const { username, discriminator, badges, avatar }: IDiscord = user;
  return (
    <>
      <div className="px-3 py-4">
        <AnimationContainer>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-black dark:to-transparent border border-gray-300 dark:border-[#202020] lg:w-[400px] w-full h-full rounded-md py-[15px]">
            <div className="flex justify-end">
              <div className="flex flex-1"></div>
              {badges && badges?.length > 0 && (
                <div className="flex items-center p-2 gap-[3px] mt-[-10px] h-[20px] dark:bg-black bg-gray-200 border dark:border-[#1f1f1f] rounded-sm mx-[5px]">
                  {badges.map(({ name, icon }: IBadge, index: number) => (
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
              <Image
                src={avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                alt={`${username} - Avatar`}
                width={60}
                height={60}
                className="rounded-full mx-auto"
              />
              <h1 className="text-center px-[5px] pt-[5px] font-semibold">
                {username}
                <span className="text-gray-500">
                  {discriminator && discriminator.length > 1 ? `#${discriminator}` : ''}
                </span>
              </h1>
            </div>
          </div>
        </AnimationContainer>
        <AnimationContainer>
          <div className="max-w-4xl mt-4 relative w-full z-[3]">
            <div className="relative w-full h-full dark:bg-black bg-white rounded border dark:border-[#111] border-gray-300">
              <div className="px-3 py-2">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Discord Information</h3>
                <h1 className="text-lg font-bold whitespace-pre-line">{username}&apos;s</h1>
              </div>
              <hr className="dark:border-[#111] border-gray-300" />
              <div className="flex p-[10px] items-center gap-[10px] border-b dark:border-[#111] border-gray-300">
                <h2 className="bg-gradient-to-r dark:from-[#161616] from-gray-50 to-transparent text-xs inline p-1 rounded border border-gray-300 dark:border-[#111]">
                  ID
                </h2>
                <p className="text-sm font-mono dark:text-[#c5c4c4] text-black">{user.id}</p>
              </div>
              <div className="flex p-[10px] items-center gap-[10px] border-b dark:border-[#111] border-gray-300">
                <h2 className="bg-gradient-to-r dark:from-[#161616] from-gray-50 to-transparent text-xs inline p-1 rounded border border-gray-300 dark:border-[#111]">
                  Email
                </h2>
                <p className="text-sm font-mono dark:text-[#c5c4c4] text-black">{user?.email ? user.email : 'None'}</p>
              </div>
              <div className="flex p-[10px] items-center gap-[10px] border-b dark:border-[#111] border-gray-300">
                <h2 className="bg-gradient-to-r dark:from-[#161616] from-gray-50 to-transparent text-xs inline p-1 rounded border border-gray-300 dark:border-[#111]">
                  Phone
                </h2>
                <p className="text-sm font-mono dark:text-[#c5c4c4] text-black">{user?.phone ? user.phone : 'None'}</p>
              </div>
              <div className="flex p-[10px] items-center gap-[10px]">
                <h2 className="bg-gradient-to-r dark:from-[#161616] from-gray-50 to-transparent text-xs inline p-1 rounded border border-gray-300 dark:border-[#111]">
                  MFA
                </h2>
                <p className="text-sm font-mono dark:text-[#c5c4c4] text-black">{user.mfa ? 'true' : 'false'}</p>
              </div>
              <div className="flex p-[10px] items-center gap-[10px]">
                <h2 className="bg-gradient-to-r dark:from-[#161616] from-gray-50 to-transparent text-xs inline p-1 rounded border border-gray-300 dark:border-[#111]">
                  Created At
                </h2>
                <p className="text-sm font-mono dark:text-[#c5c4c4] text-black">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'None'}
                </p>
              </div>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </>
  );
};
