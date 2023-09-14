import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Logs } from '@/components';
import { Dashboard } from '@/layout/Dashboard';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const LogsPage: NextPageWithLayout = () => {
  return (
    <>
      <Logs />
    </>
  );
};

LogsPage.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard title="Lovver | Logs">{page}</Dashboard>;
};

export default LogsPage;
