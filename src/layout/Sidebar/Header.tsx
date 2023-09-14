import { useStore } from '@/lib';
import { useSession } from 'next-auth/react';
import { UserMenu } from '@/components';
import { AiOutlineRight } from 'react-icons/ai';
import type { User } from '@/interfaces';

const Header = () => {
  const { data: session } = useSession();
  const isOpen = useStore((state) => state.isOpen);
  const setOpen = useStore((state) => state.setOpen);

  if (!session?.user) return null;
  return (
    <>
      <header
        className={`${
          isOpen ? 'lg:flex hidden' : ''
        } backdrop-blur-md bg-transparent border-b border-gray-300 dark:border-[#222222] flex items-center h-[80px] px-6 lg:px-10 sticky z-30 top-0 right-0`}
      >
        {!isOpen && (
          <div>
            <button
              className="flex items-center justify-start w-full text-gray-300 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              onClick={() => setOpen(!isOpen)}
            >
              <AiOutlineRight />
            </button>
          </div>
        )}
        <div className="flex flex-1"></div>
        <div className="flex items-center">
          <div className="relative z-10 ml-6">
            <UserMenu user={session.user as User} position={'-1rem'} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
