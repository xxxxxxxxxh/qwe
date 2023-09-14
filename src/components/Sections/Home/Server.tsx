import { useTranslation } from 'next-i18next';

export const Server = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <section className="overflow-hidden max-w-lg mt-[3rem] mx-auto w-full py-12 px-6">
        <div className="flex justify-center items-center flex-initial flex-col lg:flex-row gap-4">
          <div className="text-center max-w-md w-full">
            <h3 className="font-semibold dark:text-white text-4xl pb-6">{t('discord_server.title')}</h3>
            <p className="text-[#888] text-xl pb-7">{t('discord_server.desc')}</p>
            <div className="max-w-[200px] w-full mx-auto">
              <a
                className="relative cursor-pointer select-none text-white dark:text-black bg-black dark:bg-white font-semibold px-3 max-w-full flex justify-center items-center text-base h-10 transition-all duration-200"
                rel="noreferrer"
                href="https://discord.gg/zgBsB9x95P"
                target="_blank"
              >
                {t('discord_server.join')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
