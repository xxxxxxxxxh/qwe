import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '@/layout';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const NotFound: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className="flex items-center justify-center py-14 w-full">
        <div className="py-6 px-3 w-full max-w-xl">
          <h1 className="text-black dark:text-white font-semibold text-2xl text-center">{t('not_found.title')}</h1>
          <p className="text-gray-600 text-center">{t('not_found.desc')}</p>
        </div>
      </div>
    </>
  );
};

NotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Lovver | 404" description="Page not found!">
      {page}
    </Layout>
  );
};

export default NotFound;
