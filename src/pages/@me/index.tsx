import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Overview } from '@/components';
import { Dashboard } from '@/layout/Dashboard';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const Panel: NextPageWithLayout = () => {
  return (
    <>
      <Overview />
    </>
  );
};

Panel.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard title="Lovver | Dashboard">{page}</Dashboard>;
};

export default Panel;
