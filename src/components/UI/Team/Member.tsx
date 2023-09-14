import type { Member as IMember } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';

export const MemberSkeleton = () => (
  <>
    <div className="w-[300px] py-3 px-4 bg-gray-200 dark:bg-gradient-to-r from-[#080808] to-black dark:border border-[#111] rounded-md">
      <div className="animate-pulse mx-auto w-[60px] h-[60px] rounded-full bg-black/10 dark:bg-white/10"></div>
      <div className="block">
        <div className="animate-pulse mx-auto rounded-lg w-[5rem] h-[1rem] my-1 bg-black/10 dark:bg-white/10"></div>
        <div className="animate-pulse mx-auto rounded-lg w-[3rem] h-[1rem] my-1 bg-black/10 dark:bg-white/10"></div>
      </div>
    </div>
  </>
);

export const Member = ({ id, username, tag, avatar, status }: IMember) => {
  const none = `https://cdn.discordapp.com/embed/avatars/${Math.round(Math.random() * 5)}.png`;
  const image = avatar === null ? none : `https://cdn.discordapp.com/avatars/${id}/${avatar}`;

  return (
    <>
      <Link href={`/u/${id}`}>
        <div className="w-full sm:w-[300px] cursor-pointer py-3 px-4 bg-gray-200 dark:bg-gradient-to-r from-[#080808] to-black dark:border border-[#111] rounded-md">
          <Image
            src={image}
            className="rounded-full mx-auto hover:rotate-45 transition-all"
            alt={`${username}'s Lovver Team - Avatar`}
            width={60}
            height={60}
            draggable={false}
          />
          <span
            className={`${
              status === 'online'
                ? 'bg-green-500'
                : status === 'idle'
                ? 'bg-amber-500'
                : status === 'dnd'
                ? 'bg-red-500'
                : 'bg-gray-500'
            } mx-auto w-3 h-3 rounded-full block relative -top-2.5 -right-5`}
          ></span>
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-black dark:text-white font-semibold text-lg">{username}</h2>
            <span className="text-gray-900 dark:text-gray-400">{tag && tag.length > 1 ? `#${tag}` : ''}</span>
          </div>
        </div>
      </Link>
    </>
  );
};
