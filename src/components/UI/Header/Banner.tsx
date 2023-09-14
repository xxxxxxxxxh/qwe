import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export const Banner = () => {
  const { t } = useTranslation('home');
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    if (typeof localStorage == 'undefined') return;
    const banner = localStorage.getItem('lovver_banner');
    if (!banner) setBanner(true);
  }, []);

  const closeBanner = () => {
    if (typeof localStorage == 'undefined') return;
    localStorage.setItem('lovver_banner', 'true');
    setBanner(false);
  };

  return (
    <>
      {banner && (
        <div
          className={`relative isolate flex items-center gap-x-6 overflow-hidden bg-[#111] py-2.5 px-6 sm:px-3.5 sm:before:flex-1 border-b border-white/10`}
        >
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
            <p className="text-sm leading-6 text-white">
              <strong className="font-semibold">{t('banner.discount')}</strong> {t('banner.text')}
            </p>
            <Link
              href="/pricing"
              className="flex-none rounded-full bg-gray-100 py-1 px-3.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              {t('banner.btn')} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={closeBanner}>
              <span className="sr-only">{t('close')}</span>
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
