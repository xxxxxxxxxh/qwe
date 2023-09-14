import { useTranslation } from 'next-i18next';
import { signIn, useSession } from 'next-auth/react';
import { AnimationContainer } from '@/components';
import Link from 'next/link';

export const Hero = () => {
  const { data: session } = useSession();
  let { t } = useTranslation(['home', 'common', 'login']);

  return (
    <>
      <AnimationContainer className="pt-14 border-b border-gray-300 dark:border-[#0e0e0e] dark:bg-gradient-to-bl from-[#0e0e0e] to-transparent">
        <div className="py-20 px-4 mb-40 max-w-2xl mx-auto">
          <h1 className="sm:text-5xl text-3xl font-extrabold text-center text-black dark:text-white">
            {t('home:hero.title')}
          </h1>
          <p className="font-medium text-[#666] dark:text-[#888] text-xl text-center mt-5">{t('home:hero.subtitle')}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4">
            <button
              onClick={() => (!session?.user ? signIn() : null)}
              className="select-none shadow-lg shadow-zinc-600/20 rounded-lg py-3 font-medium px-10 dark:text-black dark:bg-white text-white bg-black hover:bg-black/60 dark:hover:bg-zinc-300 transition duration-200"
            >
              {!session?.user ? t('login:log_in') : <Link href="/@me">Dashboard</Link>}
            </button>
            <div className="block md:hidden my-5"></div>
            <a
              className="select-none font-medium md:ml-5 text-black dark:text-white hover:underline"
              href="https://discord.gg/zgBsB9x95P"
              rel="noreferrer"
              target="_blank"
            >
              {t('common:support')}
            </a>
          </div>
        </div>
      </AnimationContainer>
    </>
  );
};
