import { useTranslation } from 'next-i18next';
import { useId } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

export const Nav = () => {
  const { t } = useTranslation('common');
  const id = useId();
  const router = useRouter();

  return (
    <>
      <div className="hidden lg:flex flex-1 justify-center items-center m-0 w-full">
        {routes.map(({ name, link }: RouteType) => (
          <Link
            href={link}
            key={id}
            className={`${
              router.asPath === link ? 'dark:text-white text-black' : 'dark:text-[#888] text-black'
            } px-2 cursor-pointer dark:hover:text-zinc-50 transition-all duration-200 font-medium text-sm`}
          >
            {t(`navbar.${name.toLowerCase()}`)}
          </Link>
        ))}
      </div>
    </>
  );
};
