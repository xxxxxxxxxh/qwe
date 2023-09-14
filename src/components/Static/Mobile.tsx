import { createLogin } from '@/lib';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useId } from 'react';
import { HiLanguage } from 'react-icons/hi2';
import { HiOutlineSelector } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import type { User } from '@/interfaces';

type RouteType = {
  name: string;
  link: string;
};
const routes: RouteType[] = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Team',
    link: '/team'
  },
  {
    name: 'Pricing',
    link: '/pricing'
  }
];

export const Mobile = ({ open }: { open: boolean }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation(['common', 'login']);
  const { data: session } = useSession();
  const user = session?.user as User;
  const id = useId();
  const router = useRouter();
  const onToggleLanguage = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  if (!open) return null;
  return (
    <>
      <div className="mt-14 fixed z-40 bg-white dark:bg-black w-full h-full lg:hidden">
        <ul className="w-full px-4 overflow-y-scroll">
          {session?.user ? (
            <Link href="/@me">
              <li className="w-full py-3 px-2 cursor-pointer border-b dark:border-[#111] border-gray-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">{user.username}</h3>
                  <Image
                    className="rounded-full w-6 h-6 cursor-pointer"
                    alt={`${user?.username} | Lovver`}
                    src={user?.image_url || ''}
                    width={28}
                    height={28}
                  />
                </div>
              </li>
            </Link>
          ) : (
            <li className="w-full py-3 cursor-pointer border-b dark:border-[#111] border-gray-300">
              <button
                className="py-2 px-4 dark:bg-black bg-white text-gray-800 dark:text-[#888] dark:hover:text-white hover:text-black font-base select-none text-sm cursor-pointer rounded hover:bg-transparent border dark:border-[#111] border-gray-300 w-full"
                onClick={() => createLogin(`login`)}
              >
                {t('login:log_in')}
              </button>
            </li>
          )}
          {routes.map(({ name, link }: RouteType) => (
            <Link href={link} key={id}>
              <li className="w-full py-3 px-2 cursor-pointer border-b dark:border-[#111] border-gray-300 dark:hover:bg-white/5 hover:bg-black/5">
                <p
                  className={`${
                    router.asPath === link ? 'dark:text-white text-black' : 'dark:text-[#888] text-black'
                  } transition-all duration-200 font-medium text-sm`}
                >
                  {t(`common:navbar.${name.toLowerCase()}`)}
                </p>
              </li>
            </Link>
          ))}
          <li className="w-full py-3 px-2 cursor-pointer border-b dark:border-[#111] border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-black dark:text-[#888]">{t('common:theme')}</div>
              <div className="relative inline-block">
                <select
                  onChange={(event) => setTheme(event.target.value)}
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                >
                  <option value="dark" selected={resolvedTheme === 'dark'}>
                    Dark
                  </option>
                  <option value="light" selected={resolvedTheme === 'light'}>
                    Light
                  </option>
                </select>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-black rounded dark:text-white text-black text-xs border dark:border-[#222222] border-gray-300 focus:ring-white focus:border-white px-3 py-1">
                  {resolvedTheme === 'dark' ? <BsMoon /> : <BsSun />}
                  {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
                  <HiOutlineSelector className="text-gray-300" />
                </div>
              </div>
            </div>
          </li>
          <li className="w-full py-3 px-2 cursor-pointer border-b dark:border-[#111] border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-black dark:text-[#888]">{t('common:lang')}</div>
              <div className="relative inline-block">
                <select
                  onChange={(event) => onToggleLanguage(event.target.value)}
                  className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
                >
                  <option value="es" selected={router.locale === 'es'}>
                    Español
                  </option>
                  <option value="en" selected={router.locale === 'en'}>
                    English
                  </option>
                </select>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-black rounded dark:text-white text-black text-xs border dark:border-[#222222] border-gray-300 focus:ring-white focus:border-white px-3 py-1">
                  <HiLanguage />
                  {router.locale === 'es' ? 'Español' : 'English'}
                  <HiOutlineSelector className="text-gray-300" />
                </div>
              </div>
            </div>
          </li>
          {session?.user && (
            <Link href="/">
              <li
                className="w-full py-3 px-2 cursor-pointer border-b dark:border-[#111] border-gray-300 dark:hover:bg-white/5 hover:bg-black/5"
                onClick={() => signOut()}
              >
                <p className="text-red-500 transition-all duration-200 font-medium text-sm">{t('common:logout')}</p>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};
