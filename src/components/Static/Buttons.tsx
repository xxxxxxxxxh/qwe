import { useTranslation } from 'next-i18next';
import { useSession } from 'next-auth/react';
import { createLogin } from '@/lib';
import { UserMenu } from '@/components';
import { CiBurger } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';
import type { User } from '@/interfaces';

type SetOpenFunction = React.Dispatch<React.SetStateAction<boolean>>;

export const Buttons = ({ open, setOpen }: { open: boolean; setOpen: SetOpenFunction }) => {
  const { t } = useTranslation('login');
  const { data: session } = useSession();

  return (
    <>
      <div className="md:flex flex-1 justify-end items-center hidden">
        {!session?.user ? (
          <button
            className="py-2 px-4 bg-black dark:bg-white text-white dark:text-black font-base select-none text-sm cursor-pointer rounded-md hover:bg-transparent hover:text-black border border-black dark:border-white"
            onClick={() => createLogin(`login`)}
          >
            {t('log_in')}
          </button>
        ) : (
          <UserMenu user={session?.user as User} position={'5px'} />
        )}
      </div>
      <div className="flex items-center justify-end flex-1 md:hidden">
        <button className="select-none cursor-pointer" onClick={() => setOpen(!open)}>
          {!open ? <CiBurger /> : <AiOutlineClose />}
        </button>
      </div>
    </>
  );
};
