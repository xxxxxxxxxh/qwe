import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Victims } from '@/components';
import { Dashboard } from '@/layout/Dashboard';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

const VictimsList: NextPageWithLayout = () => {
  return (
    <>
      <Victims />
    </>
  );
};

VictimsList.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard title="Lovver | Victims">{page}</Dashboard>;
};

export default VictimsList;
