import type { GetStaticPathsResult, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from '../../_app';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { VictimSection } from '@/components';
import { Dashboard } from '@/layout/Dashboard';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  };
};

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

const VictimIndex: NextPageWithLayout = () => {
  return (
    <>
      <VictimSection />
    </>
  );
};

VictimIndex.getLayout = function getLayout(page: ReactElement) {
  return <Dashboard title="Lovver | Victim">{page}</Dashboard>;
};

export default VictimIndex;
