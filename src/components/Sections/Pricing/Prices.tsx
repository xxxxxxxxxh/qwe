import { Prices } from '@/components';
import { useTranslation } from 'next-i18next';

export const Pricing = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <section className="dark:bg-gradient-to-b from-black to-transparent">
        <div className="flex flex-col w-full max-w-[1160px] ml-auto mr-auto p-6 lg:p-10">
          <div className="flex flex-col items-center mt-[64px] text-center">
            <h1 className="text-black dark:text-white font-bold text-3xl">{t('prices.title')}</h1>
            <p className="text-black dark:text-white text-opacity-50 text-xl font-medium">{t('prices.description')}</p>
          </div>
          <div className="relative">
            <Prices />
          </div>
        </div>
      </section>
    </>
  );
};
