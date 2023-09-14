import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Builds } from '@/components';
import { Dashboard } from '@/layout/Dashboard';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const BuildsPage: NextPageWithLayout = () => {
  return (
    <>
      <Builds />
    </>
  );
};

BuildsPage.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard title="Lovver | Builds">{page}</Dashboard>;
};

export default BuildsPage;
