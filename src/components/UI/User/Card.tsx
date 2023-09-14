import type { User } from '@/interfaces';
import Image from 'next/image';

export const UserCard = (user: User) => {
  return (
    <>
      <div className="rounded bg-gradient-to-r from-black to-[#0a0a0a] border dark:border-[#111] border-gray-300 h-56 z-0">
        <div className="flex justify-center items-center">
          <div className="relative top-24">
            <Image
              className="rounded-full w-36 h-36 bg-[#09080c] pointer-events-none"
              src={user.image_url ?? 'https://cdn.discordapp.com/embed/avatars/0.png'}
              alt={`${user?.username}'s Avatar`}
              height={150}
              width={150}
            />
            <h1 className="mt-3 text-center font-bold text-xl text-black dark:text-gray-50">
              {user.username}{' '}
              <span className="text-gray-400">
                {user?.discriminator && user.discriminator.length > 1 ? `#${user.discriminator}` : ''}
              </span>
            </h1>
            <p className="font-light text-sm text-center font-mono italic">{user.bio}</p>
          </div>
        </div>
      </div>
    </>
  );
};
