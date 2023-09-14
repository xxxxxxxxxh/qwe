import type { User } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { HiLanguage } from 'react-icons/hi2';
import { HiOutlineSelector } from 'react-icons/hi';
import { BsSun, BsMoon, BsPerson, BsCurrencyDollar, BsHouse, BsGear, BsArrowReturnLeft } from 'react-icons/bs';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const UserMenu = ({ user, position }: { user: User; position: string }) => {
  const router = useRouter();
  const { t } = useTranslation(['common', 'login']);
  const { resolvedTheme, setTheme } = useTheme();
  const links = [
    {
      name: 'Dashboard',
      link: '/@me',
      icon: BsHouse
    },
    {
      name: 'Settings',
      link: '/account',
      icon: BsGear
    },
    {
      name: 'Profile',
      link: `/u/${user?.id}`,
      icon: BsPerson
    },
    {
      name: 'Subscription',
      link: '/@me',
      icon: BsCurrencyDollar
    }
  ];
  const onToggleLanguage = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      <Menu>
        <Menu.Button className="flex items-center">
          <Image
            className="rounded-full w-7 h-7 cursor-pointer"
            alt={`${user?.username} | Lovver`}
            src={user?.image_url || ''}
            width={128}
            height={128}
          />
        </Menu.Button>
        <Transition as={Fragment}>
          <Menu.Items>
            <div
              className={`h-auto w-[14rem] absolute z-40 border border-[#222222] bg-black/90 rounded-md top-[4rem] backdrop-blur-md`}
              style={{ right: position }}
            >
              <ul>
                {links.map(({ name, link, icon: ItemIcon }, index: number) => (
                  <li className="hover:bg-white/10 rounded-xs cursor-pointer" key={index}>
                    <Link href={link}>
                      <p className="text-gray-100 py-3 px-4 text-xs flex items-center gap-2">
                        <ItemIcon />
                        {t(`common:mobile.${name.toLowerCase()}`)}
                      </p>
                    </Link>
                  </li>
                ))}
                <hr className="border-[#222222]" />
                <li className="py-2 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-100">
                      {resolvedTheme === 'dark' ? <BsMoon /> : <BsSun />}
                      {t('common:theme')}
                    </div>
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
                      <div className="flex items-center gap-1 bg-black rounded text-white text-xs border border-[#222222] focus:ring-white focus:border-white px-3 py-1">
                        {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
                        <HiOutlineSelector className="text-gray-300" />
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-2 px-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-100">
                      <HiLanguage />
                      {t('common:lang')}
                    </div>
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
                      <div className="flex items-center gap-1 bg-black rounded text-white text-xs border border-[#222222] focus:ring-white focus:border-white px-3 py-1">
                        {router.locale === 'es' ? 'Español' : 'English'}
                        <HiOutlineSelector className="text-gray-300" />
                      </div>
                    </div>
                  </div>
                </li>

                <hr className="border-[#222222]" />
                <li className="hover:bg-white/10 rounded-xs cursor-pointer" onClick={() => signOut()}>
                  <p className="font-semibold text-red-400 p-[10px] px-[15px] text-xs flex items-center gap-2">
                    <BsArrowReturnLeft />
                    {t('common:logout')}
                  </p>
                </li>
              </ul>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};
